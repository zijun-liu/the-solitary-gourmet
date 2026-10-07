'use strict';
window.RestaurantMap=(()=>{
 let map,clusters,basemapLayer,lastSignature=null,lastLanguage=null,shown=[],loadTimer,errorKey=null;
 const markers=new Map();
 const colors=['#28608a','#557d65','#a2633d','#796492','#316e7e','#7d754a','#a24e69','#477770','#596a9a','#956540','#446c8b'];
 const positioned=d=>Number.isFinite(d.lat)&&Number.isFinite(d.lng);
 const text=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const t=(key,vars)=>I18N.t(key,vars);
 const maps=d=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(d.name+' '+d.address);
 const el=id=>document.getElementById(id);
 function fit(records=shown){const points=records.filter(positioned).map(d=>[d.lat,d.lng]);if(points.length)map.fitBounds(L.latLngBounds(points),{padding:[35,35],maxZoom:15,animate:false});else map.setView([35.68,139.76],9);}
 function country(d){return d.area==='台湾'?'台湾':d.area==='韩国'?'韩国':'日本';}
 function episode(d){return t('第 {season} 季 · 第 {episode} 集',{season:d.season,episode:d.episode});}
 function shortcuts(){
  const groups=[['全部地点',()=>true],['东京周边',d=>['東京都','神奈川県','千葉県','埼玉県'].includes(d.area)],['日本其他地区',d=>country(d)==='日本'&&!['東京都','神奈川県','千葉県','埼玉県'].includes(d.area)],['台湾',d=>country(d)==='台湾'],['韩国',d=>country(d)==='韩国']];
  el('mapShortcuts').replaceChildren();
  groups.forEach(([label,predicate])=>{const rows=shown.filter(predicate);if(!rows.length)return;const b=document.createElement('button');b.type='button';b.className='map-shortcut';b.textContent=t(label)+' · '+rows.length;b.addEventListener('click',()=>fit(rows));el('mapShortcuts').append(b);});
 }
 function popup(d){
  return '<div class="map-popup"><div class="map-popup-episode">'+episode(d)+'</div><a class="map-popup-name" href="'+maps(d)+'" target="_blank" rel="noopener noreferrer">'+text(d.name)+' ↗</a><p>'+text(d.cuisines.map(c=>I18N.cuisine(c)).join(' / '))+'</p><p class="map-popup-address">'+text(d.address)+'</p>'+
  (d.status?'<span class="status">'+text(t(d.status))+'</span>':'')+
  (d.coordPrecision==='approx'?'<p class="map-approx">'+t('约略位置 · 请用 Google Maps 核对具体店址')+'</p>':'')+
  '<div class="map-popup-actions"><a href="'+maps(d)+'" target="_blank" rel="noopener noreferrer">Google Maps ↗</a><button type="button" data-map-detail="'+text(d.id)+'">'+t('详情与来源')+'</button></div></div>';
 }
 function localizeControls(){
  [['.leaflet-control-zoom-in','放大'],['.leaflet-control-zoom-out','缩小'],['.leaflet-popup-close-button','关闭地图弹窗']].forEach(([selector,key])=>{
   el('restaurantMap').querySelectorAll(selector).forEach(button=>{button.title=t(key);button.setAttribute('aria-label',t(key));});
  });
  el('fullscreenMap').textContent='⛶ '+t(document.fullscreenElement?'退出全屏':'全屏');
  if(errorKey)el('tileNoticeText').textContent=t(errorKey);
 }
 function unavailable(key){
  clearTimeout(loadTimer);errorKey=key;el('tileNoticeText').textContent=t(key);el('tileNotice').hidden=false;el('mapLoadStatus').hidden=true;
 }
 function loadBasemap(){
  clearTimeout(loadTimer);errorKey=null;
  if(basemapLayer){map.removeLayer(basemapLayer);basemapLayer=null;}
  el('tileNotice').hidden=true;el('mapLoadStatus').hidden=false;el('mapLoadStatus').textContent=t('底图加载中…');
  if(!window.maplibregl||!L.maplibreGL){unavailable('浏览器暂不支持地图显示。餐厅仍可通过店名在 Google Maps 中查看。');return;}
  try{
   // This public vector provider supports CORS, including local-file origins.
   basemapLayer=L.maplibreGL({style:'https://tiles.openfreemap.org/styles/liberty',attributionControl:{customAttribution:'<a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> · © <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'}}).addTo(map);
   const gl=basemapLayer.getMaplibreMap();let failed=false;
   gl.on('error',()=>{failed=true;unavailable('地图底图暂未完整加载，请检查网络并重试。餐厅标记和 Google Maps 链接仍可使用。');});
   gl.on('idle',()=>{if(!failed&&gl.isStyleLoaded()&&gl.areTilesLoaded()){clearTimeout(loadTimer);errorKey=null;el('mapLoadStatus').hidden=true;el('tileNotice').hidden=true;}});
   gl.on('webglcontextlost',()=>{failed=true;unavailable('地图显示已暂停，点击「重新加载地图」可重试。');});
   loadTimer=setTimeout(()=>unavailable('地图加载较慢，请检查网络或重新加载。也可通过店名打开 Google Maps。'),20000);
  }catch{unavailable('地图暂未能启动，点击「重新加载地图」可重试。也可通过店名打开 Google Maps。');}
 }
 function init(){
  if(!window.L||!L.markerClusterGroup){el('restaurantMap').innerHTML='<p class="map-load-error">'+t('互动地图暂不可用。请通过下方店名打开 Google Maps。')+'</p>';return false;}
  map=L.map('restaurantMap',{scrollWheelZoom:false,maxZoom:19,minZoom:3,maxBounds:[[-85,-Infinity],[85,Infinity]],maxBoundsViscosity:1,zoomAnimation:!matchMedia('(prefers-reduced-motion: reduce)').matches}).setView([35.68,139.76],9);
  loadBasemap();el('retryMap').addEventListener('click',loadBasemap);
  clusters=L.markerClusterGroup({maxClusterRadius:45,showCoverageOnHover:false,animate:!matchMedia('(prefers-reduced-motion: reduce)').matches,spiderfyOnMaxZoom:true,iconCreateFunction:c=>L.divIcon({html:'<span title="'+text(t('{n} 条店铺记录，点击展开',{n:c.getChildCount()}))+'">'+c.getChildCount()+'</span>',className:'restaurant-cluster',iconSize:[42,42]})});
  map.addLayer(clusters);L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);
  el('fitMap').addEventListener('click',()=>fit());
  el('fullscreenMap').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await el('mapSection').requestFullscreen();}catch{el('restaurantMap').focus();}});
  map.on('popupopen',localizeControls);
  document.addEventListener('fullscreenchange',()=>{localizeControls();requestAnimationFrame(()=>{map.invalidateSize();fit();});});
  localizeControls();return true;
 }
 function update(records,title){
  el('mapTitle').textContent=t('{title}地图',{title});
  const known=records.filter(positioned),missing=records.filter(d=>!positioned(d)),approx=known.filter(d=>d.coordPrecision==='approx');
  el('mapCount').textContent=t('{known} / {total} 条记录已显示',{known:known.length,total:records.length})+(approx.length?t(' · {n} 处为约略位置',{n:approx.length}):'')+(missing.length?t(' · {n} 处位置待确认',{n:missing.length}):'');
  el('unmappedNote').hidden=!missing.length;el('unmappedSummary').textContent=t('{n} 家餐厅的位置待确认',{n:missing.length});
  el('unmappedList').innerHTML=missing.map(d=>'<p><a href="'+maps(d)+'" target="_blank" rel="noopener noreferrer">'+text(d.name)+' ↗</a><span>'+episode(d)+' · '+text(d.address)+'</span></p>').join('');
  el('mapEmpty').hidden=!!known.length;
  if(!map&&!init())return;
  const signature=known.map(d=>d.id).sort().join('|'),languageChanged=lastLanguage!==I18N.lang;
  localizeControls();
  if(signature===lastSignature){
   // Keep the current viewport and any open popup when only language changes.
   if(languageChanged){
    shown=known;
    known.forEach(d=>{const marker=markers.get(d.id);marker.setPopupContent(popup(d));marker.options.title=episode(d)+' · '+d.name;const node=marker.getElement();if(node)node.title=marker.options.title;});
    clusters.refreshClusters();shortcuts();localizeControls();
   }
   lastLanguage=I18N.lang;return;
  }
  lastSignature=signature;lastLanguage=I18N.lang;shown=known;
  clusters.clearLayers();markers.clear();
  known.forEach(d=>{
   const icon=L.divIcon({html:'<span style="--pin-color:'+colors[d.season-1]+'" class="restaurant-pin '+(d.coordPrecision==='approx'?'approx':'')+'">'+String(d.episode).padStart(2,'0')+'</span>',className:'restaurant-marker',iconSize:[32,36],iconAnchor:[16,36],popupAnchor:[0,-31]});
   const marker=L.marker([d.lat,d.lng],{icon,title:episode(d)+' · '+d.name,alt:d.name,keyboard:true}).bindPopup(popup(d),{maxWidth:300});
   markers.set(d.id,marker);clusters.addLayer(marker);
  });
  shortcuts();requestAnimationFrame(()=>{map.invalidateSize();fit();});
 }
 function locate(id){const m=markers.get(id);if(!m)return;el('mapSection').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});clusters.zoomToShowLayer(m,()=>{map.setView(m.getLatLng(),Math.max(map.getZoom(),16));m.openPopup();});}
 return {update,locate};
})();
