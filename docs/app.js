'use strict';
const DATA=window.RESTAURANTS;
const PAGE_SIZE=36;
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=u=>/^https:\/\//.test(u||'')?u:'#';
const mapsUrl=d=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(d.name+' '+d.address);
const normalize=s=>String(s).normalize('NFKC').toLowerCase().replace(/\s+/g,'').replace(/[东爱鸟叶冈县]/g,c=>({'东':'東','爱':'愛','鸟':'鳥','叶':'葉','冈':'岡','县':'県'}[c]));
let favorites=new Set();let storageWorks=true;
try{const raw=JSON.parse(localStorage.getItem('kodoku-favorites-v1')||'[]');favorites=new Set(Array.isArray(raw)?raw.filter(id=>DATA.some(d=>d.id===id)):[]);}catch{storageWorks=false;}
const params=new URLSearchParams(location.search);
const seasonParam=Number(params.get('season'));
const state={season:seasonParam>=1&&seasonParam<=11?seasonParam:0,q:params.get('q')||'',cuisine:params.get('cuisine')||'',region:params.get('region')||'',favorites:params.get('favorites')==='1',sort:'episode',page:1};
let matched=[];let toastTimer;
function notify(s){$('toast').textContent=s;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),1900);}
function saveFavorites(){try{localStorage.setItem('kodoku-favorites-v1',JSON.stringify([...favorites]));}catch{storageWorks=false;}}
function optionList(id,items){$(id).innerHTML='<option value="">全部'+(id==='region'?'地区':'菜系')+'</option>'+items.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('');}
optionList('region',[...new Set(DATA.map(d=>d.area))].sort((a,b)=>a.localeCompare(b,'zh-CN')));
optionList('cuisine',[...new Set(DATA.flatMap(d=>d.cuisines))].sort((a,b)=>a.localeCompare(b,'zh-CN')));
if(![...$('region').options].some(o=>o.value===state.region))state.region='';
if(![...$('cuisine').options].some(o=>o.value===state.cuisine))state.cuisine='';
$('search').value=state.q;$('region').value=state.region;$('cuisine').value=state.cuisine;
function nav(){
 $('seasonNav').innerHTML=Array.from({length:12},(_,s)=>{const n=s?DATA.filter(d=>d.season===s).length:DATA.length;return '<button type="button" class="season-button '+(state.season===s&&!state.favorites?'active':'')+'" data-season="'+s+'" aria-pressed="'+(state.season===s&&!state.favorites)+'"><span class="season-number">'+(s?String(s).padStart(2,'0'):'ALL')+'</span><span>'+(s?'第 '+s+' 季':'全部餐厅')+'</span><span class="nav-count">'+n+'</span></button>';}).join('');
 $('favoriteNav').classList.toggle('active',state.favorites);$('favoriteNav').setAttribute('aria-pressed',String(state.favorites));$('favoriteCount').textContent=favorites.size;
}
function syncUrl(){const p=new URLSearchParams();if(state.season)p.set('season',state.season);if(state.q)p.set('q',state.q);if(state.cuisine)p.set('cuisine',state.cuisine);if(state.region)p.set('region',state.region);if(state.favorites)p.set('favorites','1');try{history.replaceState(null,'',location.pathname+(p.size?'?'+p:'')+location.hash);}catch{}}
function applyFilters(records,s){const terms=s.q.trim().split(/[\s，,]+/).filter(Boolean).map(normalize);return records.filter(d=>(!s.season||d.season===s.season)&&(!s.favorites||favorites.has(d.id))&&(!s.region||d.area===s.region)&&(!s.cuisine||d.cuisines.includes(s.cuisine))&&terms.every(t=>normalize([d.name,d.address,d.area,d.region,d.dish,d.cuisineRaw,...d.cuisines].join(' ')).includes(t)));}
function render(){
 matched=applyFilters(DATA,state).sort((a,b)=>state.sort==='name'?a.name.localeCompare(b.name,'ja'):state.sort==='region'?a.area.localeCompare(b.area,'zh-CN')||a.season-b.season||a.episode-b.episode:a.season-b.season||a.episode-b.episode||a.order-b.order);
 const pages=Math.max(1,Math.ceil(matched.length/PAGE_SIZE));state.page=Math.min(state.page,pages);
 const current=matched.slice((state.page-1)*PAGE_SIZE,state.page*PAGE_SIZE);const episodes=new Set(matched.map(d=>d.season+'-'+d.episode)).size;
 $('listTitle').textContent=state.favorites?'我的收藏':state.season?'第 '+state.season+' 季的餐厅':'全部餐厅';
 $('resultCount').textContent=matched.length+' 条餐厅记录 · '+episodes+' 集';
 $('restaurantRows').innerHTML=current.length?current.map(d=>'<tr><td class="episode-cell">S'+String(d.season).padStart(2,'0')+'<span>第 '+String(d.episode).padStart(2,'0')+' 集</span></td><td class="shop-cell"><a class="shop-link" href="'+mapsUrl(d)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(d.name)+'，在 Google Maps 中查看">'+esc(d.name)+'<span class="external" aria-hidden="true">↗</span></a>'+(d.dish?'<div class="dish">本集主题 · '+esc(d.dish)+'</div>':'')+(d.status?'<span class="status">'+esc(d.status)+'</span>':'')+(d.addressAlternatives.length?'<span class="status conflict">地址需核对</span>':'')+'</td><td class="cuisine-cell">'+d.cuisines.map(c=>'<span class="cuisine-tag">'+esc(c)+'</span>').join('')+'</td><td class="address-cell"><div class="address">'+esc(d.address||'详细地址待确认')+'</div><div class="area-label">'+esc(d.area)+(Number.isFinite(d.lat)?' · <button type="button" class="locate-link" data-locate="'+d.id+'" aria-label="在地图上定位 '+esc(d.name)+'">'+(d.coordPrecision==='approx'?'约略位置':'地图定位')+'</button>':' · 位置待确认')+'</div></td><td class="actions-cell"><div class="row-actions"><button type="button" class="icon-button '+(favorites.has(d.id)?'saved':'')+'" data-favorite="'+d.id+'" aria-label="'+(favorites.has(d.id)?'取消收藏 ':'收藏 ')+esc(d.name)+'" aria-pressed="'+favorites.has(d.id)+'">'+(favorites.has(d.id)?'★':'☆')+'</button><button type="button" class="icon-button detail-button" data-detail="'+d.id+'" aria-label="查看 '+esc(d.name)+' 的详情和来源">⋯</button></div></td></tr>').join(''):'<tr><td class="empty" colspan="5"><strong>'+(state.favorites?'这里还没有收藏的餐厅':'没有找到符合条件的餐厅')+'</strong><p>'+(state.favorites?'点击店铺旁的 ☆，把想去的店留在这里。':'试试其他关键词，或清除筛选条件。')+'</p><button type="button" class="quiet-button" data-clear>查看全部餐厅</button></td></tr>';
 $('pageInfo').textContent=matched.length?((state.page-1)*PAGE_SIZE+1)+'—'+Math.min(state.page*PAGE_SIZE,matched.length)+' / '+matched.length+' 条':'0 条记录';$('prevPage').disabled=state.page<=1;$('nextPage').disabled=state.page>=pages;
 nav();syncUrl();window.RestaurantMap.update(matched,$('listTitle').textContent);
}
function reset(){Object.assign(state,{season:0,q:'',cuisine:'',region:'',favorites:false,page:1,sort:'episode'});$('search').value='';$('region').value='';$('cuisine').value='';$('sort').value='episode';render();}
function change(){state.page=1;render();}
$('seasonNav').addEventListener('click',e=>{const b=e.target.closest('[data-season]');if(b){state.season=Number(b.dataset.season);state.favorites=false;change();}});
$('favoriteNav').addEventListener('click',()=>{state.favorites=!state.favorites;state.season=0;change();});
$('search').addEventListener('input',e=>{state.q=e.target.value;change();});
['region','cuisine','sort'].forEach(id=>$(id).addEventListener('change',e=>{state[id]=e.target.value;change();}));
$('resetButton').addEventListener('click',reset);
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();reset();window.scrollTo({top:0,behavior:'smooth'});});
$('restaurantRows').addEventListener('click',e=>{
 const f=e.target.closest('[data-favorite]');const detail=e.target.closest('[data-detail]');
 if(f){const id=f.dataset.favorite;const was=favorites.has(id);was?favorites.delete(id):favorites.add(id);saveFavorites();render();notify(was?'已取消收藏':storageWorks?'已加入收藏':'已收藏；当前浏览器无法保存到下次访问');}
 if(detail)showDetail(DATA.find(d=>d.id===detail.dataset.detail));const locate=e.target.closest('[data-locate]');if(locate)window.RestaurantMap.locate(locate.dataset.locate);if(e.target.closest('[data-clear]'))reset();
});
 $('restaurantMap').addEventListener('click',e=>{const b=e.target.closest('[data-map-detail]');if(b)showDetail(DATA.find(d=>d.id===b.dataset.mapDetail));});
function sourceName(u){try{const host=new URL(u).hostname;return host==='msearch.gsi.go.jp'?'国土地理院地址定位':host==='nominatim.openstreetmap.org'?'OpenStreetMap 地址查询':host==='tabelog.com'?'食べログ':host==='wow-japan.com'?'窝日本':host==='matutika.com'?'まつこの部屋':host==='2tsumuws.com'?'放送店舗一覧':host==='mapshelf.app'?'MapShelf':host==='www.tv-tokyo.co.jp'?'东京电视台':host;}catch{return '查看来源';}}
const sourceLink=u=>'<a href="'+esc(safeUrl(u))+'" target="_blank" rel="noopener noreferrer">'+esc(sourceName(u))+' ↗</a>';
function showDetail(d){
 $('dialogEyebrow').textContent='SEASON '+String(d.season).padStart(2,'0')+' / 第 '+d.episode+' 集';
 $('dialogContent').innerHTML='<h2>'+esc(d.name)+'</h2><dl class="detail-grid"><dt>地址</dt><dd>'+esc(d.address||'详细地址待确认')+'<br>'+sourceLink(d.addressSource)+'</dd>'+(Number.isFinite(d.lat)?'<dt>地图位置'+(d.coordPrecision==='approx'?' · 约略定位':'')+'</dt><dd>'+esc(d.coordAddress)+'<br>'+sourceLink(d.coordSource)+'</dd>':'<dt>地图位置</dt><dd>固定位置待确认，暂不放置地图标记。</dd>')+'<dt>菜系</dt><dd>'+esc(d.cuisines.join(' / '))+(d.cuisineRaw?'<br><span class="source-note">来源分类：'+esc(d.cuisineRaw)+'</span>':'')+'<br>'+(d.cuisineSource?sourceLink(d.cuisineSource):'<span class="source-note">料理归类 · 按店铺类型或本集主题整理</span>')+'</dd><dt>本集主题</dt><dd>'+esc(d.dish||'来源未列出')+'</dd>'+(d.status?'<dt>来源所载状态</dt><dd>'+esc(d.status)+'（出发前请再次确认）</dd>':'')+(d.addressAlternatives.length?'<dt>其他地址记录 · 请核对搬迁情况</dt><dd>'+d.addressAlternatives.map(a=>esc(a.address)+'<br>'+sourceLink(a.source)).join('<br><br>')+'</dd>':'')+'</dl><a class="dialog-map" href="'+mapsUrl(d)+'" target="_blank" rel="noopener noreferrer">在 Google Maps 中查看 ↗</a><h3>相关资料</h3><ul class="source-list">'+[...new Set([...d.sources,d.shopSource].filter(Boolean))].map(u=>'<li>'+sourceLink(u)+'</li>').join('')+'</ul>';
 $('detailDialog').showModal();
}
document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}));
$('sourceButton').addEventListener('click',()=>$('sourceDialog').showModal());
const mobileSource=document.createElement('button');mobileSource.type='button';mobileSource.className='text-button';mobileSource.textContent='数据来源与收录范围 ↗';mobileSource.addEventListener('click',()=>$('sourceDialog').showModal());document.querySelector('footer').append(mobileSource);
$('coverage').innerHTML='<div class="coverage-list">'+Array.from({length:11},(_,i)=>{const s=i+1;const e=new Set(DATA.filter(d=>d.season===s).map(d=>d.episode)).size;return '<span>第 '+s+' 季 · '+e+'/12 集</span>';}).join('')+'</div>';
function turnPage(delta){state.page+=delta;render();$('results').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
$('prevPage').addEventListener('click',()=>turnPage(-1));$('nextPage').addEventListener('click',()=>turnPage(1));
const csvCell=v=>'"'+String(/^[=+@\-]/.test(String(v))?'\''+v:v??'').replace(/"/g,'""')+'"';
$('exportButton').addEventListener('click',()=>{const rows=[['季','集','店名','地址','菜系','Google Maps','本集主题','来源状态','地址来源'],...matched.map(d=>[d.season,d.episode,d.name,d.address,d.cuisines.join(' / '),mapsUrl(d),d.dish,d.status,d.addressSource])];const blob=new Blob(['\ufeff'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8;'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='孤独的美食家-'+(state.season?'第'+state.season+'季':'餐厅列表')+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);notify('已导出 '+matched.length+' 条记录');});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='/'){e.preventDefault();$('search').focus();}});
render();
