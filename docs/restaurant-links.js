'use strict';
window.RestaurantLinks=(()=>{
 // Additional listings matched to the guide's names and addresses on 2026-10-07.
 const additionalListings={
  's01e06-007':'https://tabelog.com/tokyo/A1321/A132104/13191818/',
  's07e10-139':'https://tabelog.com/southkorea/A5301/A530106/53001322/',
  's10e08-180':'https://tabelog.com/toyama/A1601/A160101/16000879/',
  's10e10-183':'https://tabelog.com/kanagawa/A1405/A140504/14009596/',
  's11e04-189':'https://tabelog.com/kanagawa/A1408/A140802/14001938/',
  's11e10-195':'https://tabelog.com/chiba/A1206/A120601/12057951/'
 };
 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const googleMaps=d=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(d.name+' '+d.address);
 function listingUrl(value){
  try{
   const url=new URL(value);
   const path=url.pathname.match(/^\/(?:en\/|cn\/|tw\/|kr\/|th\/)?([a-z]+\/A\d+\/A\d+\/\d+\/)/);
   return url.protocol==='https:'&&url.hostname==='tabelog.com'&&path?'https://tabelog.com/'+path[1]:null;
  }catch{return null;}
 }
 function tabelog(d){
  const candidates=[additionalListings[d.id],d.shopSource,...(d.sources||[]),d.addressSource,d.cuisineSource];
  const directUrl=candidates.map(listingUrl).find(Boolean);
  if(directUrl)return {url:directUrl,direct:true};
  const params=new URLSearchParams({sa:d.area==='韩国'?'韓国':d.area||'',sk:d.name});
  return {url:'https://tabelog.com/rst/rstsearch/?'+params,direct:false};
 }
 function tabelogLink(d,className=''){
  const link=tabelog(d),label=I18N.t(link.direct?'Tabelog':'搜索 Tabelog');
  const description=I18N.t(link.direct?'在 Tabelog 中查看 {name}':'在 Tabelog 中搜索 {name}',{name:d.name});
  return '<a class="tabelog-link '+escape(className)+'" href="'+escape(link.url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+escape(description)+'"'+(link.direct?'':' title="'+escape(I18N.t('尚未确认此店的 Tabelog 页面；点击按店名搜索。'))+'"')+'>'+escape(label)+'</a>';
 }
 return {googleMaps,tabelog,tabelogLink};
})();
