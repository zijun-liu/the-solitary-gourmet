'use strict';
const DATA=window.RESTAURANTS;
const PAGE_SIZE=36;
const $=id=>document.getElementById(id);
const tr=(key,vars)=>window.I18N.t(key,vars);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=u=>/^https:\/\//.test(u||'')?u:'#';
const mapsUrl=window.RestaurantLinks.googleMaps;
const normalize=s=>String(s).normalize('NFKC').toLowerCase().replace(/\s+/g,'').replace(/[东爱鸟叶冈县]/g,c=>({'东':'東','爱':'愛','鸟':'鳥','叶':'葉','冈':'岡','县':'県'}[c]));
// Search both languages independently of the language currently displayed.
const searchText=new Map(DATA.map(d=>[d.id,normalize([
 d.name,d.address,d.area,d.region,d.dish,d.cuisineRaw,...d.cuisines,
 I18N.area(d.area,'en'),...d.cuisines.map(c=>I18N.cuisine(c,'en')),
 I18N.theme(d,'en'),I18N.theme(d,'zh')
].join(' '))]));
let favorites=new Set();let storageWorks=true;
try{const raw=JSON.parse(localStorage.getItem('kodoku-favorites-v1')||'[]');favorites=new Set(Array.isArray(raw)?raw.filter(id=>DATA.some(d=>d.id===id)):[]);}catch{storageWorks=false;}
const params=new URLSearchParams(location.search);
const seasonParam=Number(params.get('season'));
const state={season:seasonParam>=1&&seasonParam<=11?seasonParam:0,q:params.get('q')||'',cuisine:params.get('cuisine')||'',region:params.get('region')||'',favorites:params.get('favorites')==='1',sort:'episode',page:1};
let matched=[];let toastTimer;let detailId;
function notify(s){$('toast').textContent=s;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),1900);}
function saveFavorites(){try{localStorage.setItem('kodoku-favorites-v1',JSON.stringify([...favorites]));}catch{storageWorks=false;}}
function optionList(id,items,label){
 items.sort((a,b)=>label(a).localeCompare(label(b),I18N.lang==='en'?'en':'zh-CN'));
 $(id).innerHTML='<option value="">'+tr(id==='region'?'全部地区':'全部菜系')+'</option>'+items.map(x=>'<option value="'+esc(x)+'">'+esc(label(x))+'</option>').join('');
 $(id).value=state[id];
}
function populateOptions(){
 optionList('region',[...new Set(DATA.map(d=>d.area))],I18N.area);
 optionList('cuisine',[...new Set(DATA.flatMap(d=>d.cuisines))],I18N.cuisine);
}
if(!DATA.some(d=>d.area===state.region))state.region='';
if(!DATA.some(d=>d.cuisines.includes(state.cuisine)))state.cuisine='';
populateOptions();$('search').value=state.q;
function nav(){
 $('seasonNav').innerHTML=Array.from({length:12},(_,s)=>{
  const n=s?DATA.filter(d=>d.season===s).length:DATA.length;
  const active=state.season===s&&!state.favorites;
  return '<button type="button" class="season-button '+(active?'active':'')+'" data-season="'+s+'" aria-pressed="'+active+'"><span>'+tr(s?'第 {season} 季':'全部餐厅',{season:s})+'</span><span class="nav-count">'+n+'</span></button>';
 }).join('');
 const activeButton=$('seasonNav').querySelector('.active');
 if(activeButton&&$('seasonNav').scrollWidth>$('seasonNav').clientWidth){
  const navBounds=$('seasonNav').getBoundingClientRect(),buttonBounds=activeButton.getBoundingClientRect();
  if(buttonBounds.left<navBounds.left)$('seasonNav').scrollLeft-=navBounds.left-buttonBounds.left;
  else if(buttonBounds.right>navBounds.right)$('seasonNav').scrollLeft+=buttonBounds.right-navBounds.right;
 }
 $('favoriteNav').classList.toggle('active',state.favorites);$('favoriteNav').setAttribute('aria-pressed',String(state.favorites));$('favoriteCount').textContent=favorites.size;
}
function syncUrl(){
 const p=new URLSearchParams();p.set('lang',I18N.lang);
 if(state.season)p.set('season',state.season);if(state.q)p.set('q',state.q);if(state.cuisine)p.set('cuisine',state.cuisine);if(state.region)p.set('region',state.region);if(state.favorites)p.set('favorites','1');
 try{history.replaceState(null,'',location.pathname+'?'+p+location.hash);}catch{}
}
function applyFilters(records,s){
 const terms=s.q.trim().split(/[\s，,]+/).filter(Boolean).map(normalize);
 return records.filter(d=>(!s.season||d.season===s.season)&&(!s.favorites||favorites.has(d.id))&&(!s.region||d.area===s.region)&&(!s.cuisine||d.cuisines.includes(s.cuisine))&&terms.every(t=>searchText.get(d.id).includes(t)));
}
function row(d){
 const dish=I18N.theme(d),saved=favorites.has(d.id);
 return '<tr><td class="episode-cell">S'+String(d.season).padStart(2,'0')+'<span>'+tr('第 {episode} 集',{episode:String(d.episode).padStart(2,'0')})+'</span></td>'+
 '<td class="shop-cell"><a class="shop-link" href="'+mapsUrl(d)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(tr('{name}，在 Google Maps 中查看',{name:d.name}))+'">'+esc(d.name)+'</a>'+
 (dish?'<div class="dish">'+esc(tr('本集主题 · {dish}',{dish}))+'</div>':'')+
 '<div class="restaurant-links"><a href="'+mapsUrl(d)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(tr('{name}，在 Google Maps 中查看',{name:d.name}))+'">Google Maps</a>'+RestaurantLinks.tabelogLink(d)+'</div>'+
 (d.status?'<span class="status">'+esc(tr(d.status))+'</span>':'')+
 (d.addressAlternatives.length?'<span class="status conflict">'+tr('地址需核对')+'</span>':'')+'</td>'+
 '<td class="cuisine-cell">'+d.cuisines.map(c=>'<span class="cuisine-tag">'+esc(I18N.cuisine(c))+'</span>').join('')+'</td>'+
 '<td class="address-cell"><div class="address">'+esc(tr(d.address||'详细地址待确认'))+'</div><div class="area-label">'+esc(I18N.area(d.area))+
 (Number.isFinite(d.lat)?' · <button type="button" class="locate-link" data-locate="'+d.id+'" aria-label="'+esc(tr('在地图上定位 {name}',{name:d.name}))+'">'+tr(d.coordPrecision==='approx'?'约略位置':'地图定位')+'</button>':' · '+tr('位置待确认'))+'</div></td>'+
 '<td class="actions-cell"><div class="row-actions"><button type="button" class="icon-button '+(saved?'saved':'')+'" data-favorite="'+d.id+'" aria-label="'+esc(tr(saved?'取消收藏 {name}':'收藏 {name}',{name:d.name}))+'" aria-pressed="'+saved+'">'+(saved?'★':'☆')+'</button><button type="button" class="icon-button detail-button" data-detail="'+d.id+'" aria-label="'+esc(tr('查看 {name} 的详情和来源',{name:d.name}))+'">⋯</button></div></td></tr>';
}
function render(){
 const focused=document.activeElement;
 const focusKey=focused?.matches('[data-season],[data-favorite],[data-detail]')?['data-season','data-favorite','data-detail'].find(key=>focused.hasAttribute(key)):null;
 const focusValue=focusKey?focused.getAttribute(focusKey):null;
 matched=applyFilters(DATA,state).sort((a,b)=>state.sort==='name'?a.name.localeCompare(b.name,'ja'):state.sort==='region'?I18N.area(a.area).localeCompare(I18N.area(b.area),I18N.lang==='en'?'en':'zh-CN')||a.season-b.season||a.episode-b.episode:a.season-b.season||a.episode-b.episode||a.order-b.order);
 const pages=Math.max(1,Math.ceil(matched.length/PAGE_SIZE));state.page=Math.min(state.page,pages);
 const current=matched.slice((state.page-1)*PAGE_SIZE,state.page*PAGE_SIZE);
 const episodes=new Set(matched.map(d=>d.season+'-'+d.episode)).size;
 $('listTitle').textContent=tr(state.favorites?'我的收藏':state.season?'第 {season} 季的餐厅':'全部餐厅',{season:state.season});
 $('resultCount').textContent=tr('{n} 条餐厅记录 · {episodes} 集',{n:matched.length,episodes});
 $('restaurantRows').innerHTML=current.length?current.map(row).join(''):'<tr><td class="empty" colspan="5"><strong>'+tr(state.favorites?'这里还没有收藏的餐厅':'没有找到符合条件的餐厅')+'</strong><p>'+tr(state.favorites?'点击店铺旁的 ☆，把想去的店留在这里。':'试试其他关键词，或清除筛选条件。')+'</p><button type="button" class="quiet-button" data-clear>'+tr('查看全部餐厅')+'</button></td></tr>';
 $('pageInfo').textContent=matched.length?tr('{start}—{end} / {n} 条',{start:(state.page-1)*PAGE_SIZE+1,end:Math.min(state.page*PAGE_SIZE,matched.length),n:matched.length}):tr('0 条记录');
 $('prevPage').disabled=state.page<=1;$('nextPage').disabled=state.page>=pages;
 nav();syncUrl();window.RestaurantMap.update(matched,$('listTitle').textContent);
 if(focusKey){const replacement=document.querySelector('['+focusKey+'="'+focusValue+'"]');(replacement||$('favoriteNav')).focus({preventScroll:true});}
}
function reset(){Object.assign(state,{season:0,q:'',cuisine:'',region:'',favorites:false,page:1,sort:'episode'});$('search').value='';$('region').value='';$('cuisine').value='';$('sort').value='episode';render();}
function change(){state.page=1;render();}
$('seasonNav').addEventListener('click',e=>{const b=e.target.closest('[data-season]');if(b){state.season=Number(b.dataset.season);state.favorites=false;change();}});
$('favoriteNav').addEventListener('click',()=>{state.favorites=!state.favorites;state.season=0;change();});
$('search').addEventListener('input',e=>{state.q=e.target.value;change();});
['region','cuisine','sort'].forEach(id=>$(id).addEventListener('change',e=>{state[id]=e.target.value;change();}));
$('resetButton').addEventListener('click',reset);
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();reset();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
$('restaurantRows').addEventListener('click',e=>{
 const f=e.target.closest('[data-favorite]'),detail=e.target.closest('[data-detail]'),locate=e.target.closest('[data-locate]');
 if(f){const id=f.dataset.favorite,was=favorites.has(id);was?favorites.delete(id):favorites.add(id);saveFavorites();render();notify(tr(was?'已取消收藏':storageWorks?'已加入收藏':'已收藏；当前浏览器无法保存到下次访问'));}
 if(detail)showDetail(DATA.find(d=>d.id===detail.dataset.detail));
 if(locate)window.RestaurantMap.locate(locate.dataset.locate);
 if(e.target.closest('[data-clear]'))reset();
});
$('restaurantMap').addEventListener('click',e=>{const b=e.target.closest('[data-map-detail]');if(b)showDetail(DATA.find(d=>d.id===b.dataset.mapDetail));});
function sourceName(u){
 try{const host=new URL(u).hostname;return tr(host==='msearch.gsi.go.jp'?'国土地理院地址定位':host==='nominatim.openstreetmap.org'?'OpenStreetMap 地址查询':host==='tabelog.com'?'食べログ':host==='wow-japan.com'?'窝日本':host==='matutika.com'?'まつこの部屋':host==='2tsumuws.com'?'放送店舗一覧':host==='mapshelf.app'?'MapShelf':host==='www.tv-tokyo.co.jp'?'东京电视台':host);}catch{return tr('查看来源');}
}
const sourceLink=u=>'<a href="'+esc(safeUrl(u))+'" target="_blank" rel="noopener noreferrer">'+esc(sourceName(u))+' ↗</a>';
function renderDetail(d){
 $('dialogEyebrow').textContent=tr('第 {season} 季 · 第 {episode} 集',{season:d.season,episode:d.episode});
 $('dialogContent').innerHTML='<h2 id="detailTitle">'+esc(d.name)+'</h2><dl class="detail-grid"><dt>'+tr('地址')+'</dt><dd>'+esc(tr(d.address||'详细地址待确认'))+'<br>'+sourceLink(d.addressSource)+'</dd>'+
 (Number.isFinite(d.lat)?'<dt>'+tr(d.coordPrecision==='approx'?'地图位置 · 约略定位':'地图位置')+'</dt><dd>'+esc(d.coordAddress)+'<br>'+sourceLink(d.coordSource)+'</dd>':'<dt>'+tr('地图位置')+'</dt><dd>'+tr('固定位置待确认，暂不放置地图标记。')+'</dd>')+
 '<dt>'+tr('菜系')+'</dt><dd>'+esc(d.cuisines.map(c=>I18N.cuisine(c)).join(' / '))+(d.cuisineRaw?'<br><span class="source-note">'+esc(tr('来源分类：{cuisine}',{cuisine:d.cuisineRaw}))+'</span>':'')+'<br>'+(d.cuisineSource?sourceLink(d.cuisineSource):'<span class="source-note">'+tr('料理归类 · 按店铺类型或本集主题整理')+'</span>')+'</dd>'+
 '<dt>'+tr('本集主题')+'</dt><dd>'+esc(I18N.theme(d)||tr('来源未列出'))+'</dd>'+(d.dish?'<dt>'+tr('来源原文')+'</dt><dd lang="ja">'+esc(d.dish)+'</dd>':'')+
 (d.status?'<dt>'+tr('来源所载状态')+'</dt><dd>'+esc(tr('{status}（出发前请再次确认）',{status:tr(d.status)}))+'</dd>':'')+
 (d.addressAlternatives.length?'<dt>'+tr('其他地址记录 · 请核对搬迁情况')+'</dt><dd>'+d.addressAlternatives.map(a=>esc(a.address)+'<br>'+sourceLink(a.source)).join('<br><br>')+'</dd>':'')+
 '</dl><div class="dialog-actions"><a class="dialog-map" href="'+mapsUrl(d)+'" target="_blank" rel="noopener noreferrer">'+tr('在 Google Maps 中查看 ↗')+'</a>'+RestaurantLinks.tabelogLink(d,'dialog-map')+'</div>'+
 (!RestaurantLinks.tabelog(d).direct?'<p class="source-note">'+tr('尚未确认此店的 Tabelog 页面；点击按店名搜索。')+'</p>':'')+
 '<h3>'+tr('相关资料')+'</h3><ul class="source-list">'+[...new Set([...d.sources,d.shopSource].filter(Boolean))].map(u=>'<li>'+sourceLink(u)+'</li>').join('')+'</ul>';
}
function showDetail(d){if(!d)return;detailId=d.id;renderDetail(d);if(!$('detailDialog').open)$('detailDialog').showModal();}
document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}));
$('sourceButton').addEventListener('click',()=>$('sourceDialog').showModal());
const mobileSource=document.createElement('button');mobileSource.type='button';mobileSource.className='text-button';mobileSource.dataset.i18n='数据来源与收录范围 ↗';mobileSource.textContent=tr(mobileSource.dataset.i18n);mobileSource.addEventListener('click',()=>$('sourceDialog').showModal());document.querySelector('footer').append(mobileSource);
function renderCoverage(){
 $('coverage').innerHTML='<div class="coverage-list">'+Array.from({length:11},(_,i)=>{const season=i+1,n=new Set(DATA.filter(d=>d.season===season).map(d=>d.episode)).size;return '<span>'+tr('第 {season} 季 · {n}/12 集',{season,n})+'</span>';}).join('')+'</div>';
}
renderCoverage();
function turnPage(delta){state.page+=delta;render();$('results').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
$('prevPage').addEventListener('click',()=>turnPage(-1));$('nextPage').addEventListener('click',()=>turnPage(1));
const csvCell=v=>'"'+String(/^[=+@\-]/.test(String(v))?'\''+v:v??'').replace(/"/g,'""')+'"';
$('exportButton').addEventListener('click',()=>{
 const rows=[['季','集','店名','地址','菜系','Google Maps','Tabelog','Tabelog 链接类型','本集主题','来源状态','地址来源'].map(key=>tr(key)),...matched.map(d=>[d.season,d.episode,d.name,d.address,d.cuisines.map(c=>I18N.cuisine(c)).join(' / '),mapsUrl(d),RestaurantLinks.tabelog(d).url,tr(RestaurantLinks.tabelog(d).direct?'店铺页面':'店名搜索'),I18N.theme(d),tr(d.status),d.addressSource])];
 const blob=new Blob(['\ufeff'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8;'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(I18N.lang==='en'?'kodoku-gourmet-':'孤独的美食家-')+(state.season?'S'+state.season:'restaurants')+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);notify(tr('已导出 {n} 条记录',{n:matched.length}));
});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='/'){e.preventDefault();$('search').focus();}});
window.addEventListener('languagechange',()=>{
 populateOptions();render();renderCoverage();
 if($('detailDialog').open)renderDetail(DATA.find(d=>d.id===detailId));
});
render();
