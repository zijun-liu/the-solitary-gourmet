'use strict';
window.I18N=(()=>{
 const en={
  '餐厅手帖':'Restaurant guide','页内导航':'On this page','地图':'Map','餐厅列表':'Restaurants',
  '按季寻找五郎去过的店，在地图上选好下一顿。':'Explore the places Goro visited, season by season. Find your next meal on the map.',
  '点击数字展开餐厅，点击标记查看详情。':'Select a number to expand places, or a pin for details.',
  '搜索店名、地点或菜系…':'Search restaurants, places, cuisines…',
  '关于这份手帖':'About this guide',

  '孤独的美食家 · 餐厅手帖':'The Solitary Gourmet · Restaurant Guide',
  '孤独的美食家':'The Solitary Gourmet','餐厅手帖 / RESTAURANT NOTES':'RESTAURANT NOTES',
  '跳到餐厅列表':'Skip to restaurants','餐厅手帖首页':'Restaurant guide home',
  '跟着五郎，按季寻找':'Follow Goro, season by season','选择季数':'Choose a season',
  '全部餐厅':'All restaurants','第 {season} 季':'Season {season}',
  '第 {season} 季的餐厅':'Season {season} restaurants','我的收藏':'My favorites',
  '第 1—11 季 · 正片全季':'Seasons 1–11 · Regular episodes',
  '数据来源与收录范围 ↗':'Sources & coverage','数据来源与收录范围':'Sources & coverage',
  '井之头五郎的美食足迹':'Goro’s food trail','导出当前列表':'Export list',
  '语言':'Language','「腹が、減った。」':'“I’m hungry.”',
  '下一顿，跟着五郎吃。':'Your next meal, with Goro.',
  '先在地图上看看餐厅在哪里，再找到下一顿的灵感。':'Find the restaurants on the map and get inspired for your next meal.',
  '点击餐厅名字，在 Google Maps 中查看。':'Click a restaurant name to open Google Maps.',
  '一店，一集，一顿好饭。':'One episode. One great meal.',
  '先看位置，再选下一顿':'Find a place for your next meal',
  '全部餐厅地图':'Restaurant map','{title}地图':'{title} map',
  '显示全部地点':'Show all places','全屏查看餐厅地图':'View restaurant map fullscreen',
  '全屏':'Fullscreen','退出全屏':'Exit fullscreen','快速查看地图地区':'Explore map regions',
  '互动餐厅位置地图':'Interactive restaurant map','当前筛选没有可定位的餐厅。':'No mapped restaurants match these filters.',
  '地图底图暂未能加载。':'The map could not load.','重新加载地图':'Reload map',
  '点击数字展开附近的店 · 点击标记查看餐厅':'Click a number to expand nearby places · Click a marker for restaurant details',
  '底图加载中…':'Loading map…',
  '底图：OpenFreeMap · Google Maps 用于店铺详情与导航':'Map: OpenFreeMap · Google Maps for restaurant details and directions',
  '搜索和筛选餐厅':'Search and filter restaurants',
  '搜索店名、地址、菜系或本集主题':'Search names, addresses, cuisines, or episode dishes',
  '搜索店名、地址、菜系或本集主题…':'Search names, addresses, cuisines, or episode dishes…',
  '地区':'Region','菜系':'Cuisine','排序':'Sort','全部地区':'All regions','全部菜系':'All cuisines',
  '按季 / 集数':'Season / episode','按店名':'Restaurant name','按地区':'Region',
  '清除筛选':'Clear filters','店名链接到 Google Maps':'Names link to Google Maps',
  '季 / 集数':'Season / episode','餐厅与本集主题':'Restaurant & episode dishes',
  '地址':'Address','收藏与详情':'Favorites and details','上一页':'Previous','下一页':'Next',
  '地址按资料来源收录。营业状态可能变化，出发前请在 Google Maps 或店铺官网确认。':'Addresses follow the listed sources. Opening status may change; check Google Maps or the restaurant before visiting.',
  '整理于 2026.10.04':'Compiled October 4, 2026','本站为非官方餐厅索引':'An unofficial restaurant guide',
  '关闭详情':'Close details','关闭数据说明':'Close source notes',
  '收录正片第 1—11 季，共 132 集。部分集数包含多家餐厅、咖啡店或小吃店，各店分别记录。特别篇、衍生剧及电影暂未收录。':'Covers all 132 regular episodes of seasons 1–11. Episodes featuring multiple restaurants, cafés, or food shops have separate records for each place. Specials, spin-offs, and the film are not included.',
  '可核对的资料':'Reference sources',
  'まつこの部屋 · 全季逐集店名汇总 ↗':'Matutika · Restaurants by season and episode ↗',
  '窝日本 · 第 1—9 季地址与菜系 ↗':'Wow Japan · Seasons 1–9 addresses and cuisines ↗',
  '放送店舗一覧 · 店铺地址总表 ↗':'Broadcast restaurant list · Addresses ↗',
  'MapShelf · 餐厅地址与菜系 ↗':'MapShelf · Restaurant addresses and cuisines ↗',
  '东京电视台 · 第 11 季官方店铺名单 ↗':'TV Tokyo · Official season 11 restaurant list ↗',
  '来源说明':'Every restaurant has links to its address and cuisine sources. Where no cuisine is provided, the classification is based on the shop type or episode theme and is labeled accordingly. Conflicting addresses are retained for comparison. Closure and relocation labels reflect source reports, not a current check of every restaurant. Google Maps links search by name and address and may not identify a unique listing.',
  '地图资料说明':'Compiled October 4, 2026. Restaurant data is available offline; map tiles, Google Maps, and external sources require internet access. Coordinates come from MapShelf and Japan’s Geospatial Information Authority, with additional sources linked in restaurant details. Approximate positions use dashed markers; unverified fixed locations, such as a mobile food truck, have no marker.',
  '翻译说明':'Restaurant names and addresses stay in their original form for lookup. Episode dishes are translated for readability; the original source wording is available in the details.',
  '请启用 JavaScript 以搜索和查看餐厅列表。':'Enable JavaScript to search and view the restaurant list.',
  '{n} 条餐厅记录 · {episodes} 集':'Records: {n} · Episodes: {episodes}',
  '第 {episode} 集':'Episode {episode}','第 {season} 季 · 第 {episode} 集':'Season {season} · Episode {episode}',
  '本集主题 · {dish}':'Episode dishes: {dish}',
  '{name}，在 Google Maps 中查看':'Open {name} in Google Maps',
  '地址需核对':'Address needs checking','详细地址待确认':'Detailed address unconfirmed',
  '地图定位':'Locate on map','约略位置':'Approximate location','位置待确认':'Location unconfirmed',
  '在地图上定位 {name}':'Locate {name} on the map','收藏 {name}':'Save {name}',
  '取消收藏 {name}':'Remove {name} from favorites','查看 {name} 的详情和来源':'View details and sources for {name}',
  '这里还没有收藏的餐厅':'No favorites yet','没有找到符合条件的餐厅':'No matching restaurants',
  '点击店铺旁的 ☆，把想去的店留在这里。':'Click ☆ beside a restaurant to save it here.',
  '试试其他关键词，或清除筛选条件。':'Try another search or clear your filters.',
  '查看全部餐厅':'View all restaurants','{start}—{end} / {n} 条':'{start}–{end} of {n} records',
  '0 条记录':'0 records','已取消收藏':'Removed from favorites','已加入收藏':'Saved to favorites',
  '已收藏；当前浏览器无法保存到下次访问':'Saved for this session; your browser cannot retain favorites for the next visit',
  '国土地理院地址定位':'Geospatial Information Authority of Japan',
  'OpenStreetMap 地址查询':'OpenStreetMap address lookup','食べログ':'Tabelog',
  '窝日本':'Wow Japan','东京电视台':'TV Tokyo','查看来源':'View source',
  '地图位置':'Map location','地图位置 · 约略定位':'Map location · Approximate',
  '固定位置待确认，暂不放置地图标记。':'No confirmed fixed location; no map marker is shown.',
  '来源分类：{cuisine}':'Original source classification: {cuisine}',
  '料理归类 · 按店铺类型或本集主题整理':'Cuisine classification · Based on shop type or episode dishes',
  '本集主题':'Episode dishes','来源原文':'Original episode theme','来源未列出':'Not listed by the source',
  '来源所载状态':'Reported status','{status}（出发前请再次确认）':'{status} (check again before visiting)',
  '其他地址记录 · 请核对搬迁情况':'Other reported addresses · Check for relocation',
  '在 Google Maps 中查看 ↗':'Open in Google Maps ↗','相关资料':'Related sources',
  '搜索 Tabelog':'Search Tabelog','在 Tabelog 中查看 {name}':'Open {name} on Tabelog',
  '在 Tabelog 中搜索 {name}':'Search Tabelog for {name}',
  '尚未确认此店的 Tabelog 页面；点击按店名搜索。':'No matching Tabelog listing has been confirmed; this link searches by restaurant name.',
  'Tabelog 链接类型':'Tabelog link type','店铺页面':'Restaurant listing','店名搜索':'Name search',
  '也可通过 Tabelog 链接查看餐厅资料与评价。':'Use the Tabelog links for restaurant information and reviews.',
  'Tabelog 链接优先打开已收录或按店名、地址匹配的店铺页面；未确认店铺页面的条目标为「搜索 Tabelog」。':'Tabelog links open a listing from the sources or one matched by name and address. Entries without a confirmed listing are labeled “Search Tabelog.”',
  '第 {season} 季 · {n}/12 集':'Season {season} · {n}/12 episodes',
  '季':'Season','集':'Episode','店名':'Restaurant','来源状态':'Reported status','地址来源':'Address source',
  '已导出 {n} 条记录':'Exported {n} records',
  '全部地点':'All places','东京周边':'Tokyo area','日本其他地区':'Elsewhere in Japan','台湾':'Taiwan','韩国':'South Korea',
  '约略位置 · 请用 Google Maps 核对具体店址':'Approximate location · Check the exact address in Google Maps',
  '详情与来源':'Details & sources',
  '浏览器暂不支持地图显示。餐厅仍可通过店名在 Google Maps 中查看。':'The map is unavailable in this browser. Open a restaurant name in Google Maps to view its location.',
  '地图底图暂未完整加载，请检查网络并重试。餐厅标记和 Google Maps 链接仍可使用。':'The map has not fully loaded. Check your connection and retry; restaurant markers and Google Maps links are still available.',
  '地图显示已暂停，点击「重新加载地图」可重试。':'The map display is paused. Click “Reload map” to retry.',
  '地图加载较慢，请检查网络或重新加载。也可通过店名打开 Google Maps。':'The map is taking longer to load. Check your connection or reload it. Restaurant names also open Google Maps.',
  '地图暂未能启动，点击「重新加载地图」可重试。也可通过店名打开 Google Maps。':'The map could not start. Click “Reload map” to retry, or open a restaurant name in Google Maps.',
  '互动地图暂不可用。请通过下方店名打开 Google Maps。':'The interactive map is unavailable. Open a restaurant name below in Google Maps.',
  '{known} / {total} 条记录已显示':'{known} / {total} records on map',
  ' · {n} 处为约略位置':' · Approximate: {n}',' · {n} 处位置待确认':' · Unconfirmed: {n}',
  '{n} 家餐厅的位置待确认':'Unconfirmed restaurant locations: {n}',
  '韩国首尔（移动餐车，固定地址未查证）':'Seoul, South Korea (mobile food truck; fixed address unconfirmed)',
  '{n} 条店铺记录，点击展开':'{n} restaurant records; click to expand',
  '放大':'Zoom in','缩小':'Zoom out','关闭地图弹窗':'Close map popup',
  '固定地址待确认':'Fixed address unconfirmed','已搬迁':'Reported relocated','已闭店':'Reported closed',
  '暂时休业':'Reported temporarily closed','营业状态待确认':'Opening status unconfirmed'
 };
 const cuisines={
  '不丹料理':'Bhutanese','中餐':'Chinese','乌冬与荞麦面':'Udon & soba','亚洲料理':'Asian',
  '印尼料理':'Indonesian','印度料理':'Indian','台湾料理':'Taiwanese','咖啡与甜点':'Café & desserts',
  '咖喱':'Curry','墨西哥料理':'Mexican','夏威夷料理':'Hawaiian','大阪烧与铁板烧':'Okonomiyaki & teppanyaki',
  '天妇罗':'Tempura','寿司':'Sushi','小吃与熟食':'Snacks & deli','居酒屋':'Izakaya',
  '川菜':'Sichuan','巴西料理':'Brazilian','希腊料理':'Greek','德国料理':'German',
  '意大利料理':'Italian','拉面':'Ramen','日式定食':'Japanese set meals','日式海鲜':'Japanese seafood',
  '日本料理':'Japanese','汤咖喱':'Soup curry','泰餐':'Thai','洋食':'Japanese Western-style',
  '火锅':'Hot pot','炸猪排':'Tonkatsu','烤羊肉':'Grilled lamb','烤肉':'Yakiniku / BBQ',
  '烧鸟与串烧':'Yakitori & skewers','章鱼烧':'Takoyaki','粤菜':'Cantonese','缅甸料理':'Burmese',
  '蒙古料理':'Mongolian','西班牙料理':'Spanish','越南料理':'Vietnamese','非洲料理':'African',
  '面包与甜点':'Bakery & sweets','韩餐':'Korean','鳗鱼料理':'Eel'
 };
 const areas={'千葉県':'Chiba','台湾':'Taiwan','埼玉県':'Saitama','大阪府':'Osaka','富山県':'Toyama','岐阜県':'Gifu','愛知県':'Aichi','新潟県':'Niigata','東京都':'Tokyo','栃木県':'Tochigi','神奈川県':'Kanagawa','福島県':'Fukushima','群馬県':'Gunma','茨城県':'Ibaraki','静岡県':'Shizuoka','韩国':'South Korea','鳥取県':'Tottori'};
 // Each pair is [English, Chinese]; source wording stays in data.js and details.
 const themes=[
  [
   ['Yakitori and fried rice','烧鸟与炒饭'],['Simmered fish set meal','炖鱼定食'],['Brothless dan dan noodles','担担拌面'],['Shizuoka-style oden','静冈关东煮'],['Chicken-and-egg rice bowl and stir-fried udon','亲子丼与炒乌冬'],['Garlic-grilled pork loin','蒜香烤猪里脊'],['Café-style Napolitan spaghetti','咖啡店的拿坡里意面'],['Solo yakiniku','一人烤肉'],['Hiroshima-style okonomiyaki','广岛风大阪烧'],['Ginger pork and fried-egg rice bowl','姜烧猪肉煎蛋丼'],['Extra-spicy curry rice at a bar','酒馆的特辣咖喱饭'],['Okinawan pork-rib soba and salt-grilled Agu pork','冲绳猪肋排荞麦面与盐烤阿古猪肉']
  ],[
   ['Stir-fried meat with scallions','葱炒肉'],['Dark-sauce tempura rice bowl','黑酱天妇罗丼'],['Wasabi short ribs and rice with raw egg','山葵牛肋肉与生鸡蛋拌饭'],['Brazilian cuisine','巴西料理'],['Garlic-grilled pork and onions','蒜香猪肉与洋葱'],['Extra-spicy Sichuan food','特辣四川料理'],['Minced Pacific saury and sake-steamed clams','秋刀鱼鱼肉泥与酒蒸蛤蜊'],['Solo chanko hot pot','一人相扑火锅'],['Shopping-street snacks and a meal at the office','逛银座商店街后的办公室用餐'],['Smoked mackerel and sweet omelet','烟熏鲭鱼与甜玉子烧'],['Thai curry and dry chicken noodles','泰式咖喱与鸡肉拌面'],['Homemade croquettes and yellowtail with daikon','家常可乐饼与鰤鱼炖萝卜']
  ],[
   ['Guinea fowl and eel rice bowl','珍珠鸡与鳗鱼丼'],['Chito and Patan','チート与パタン'],['Fresh-wasabi rice bowl','鲜山葵丼'],['Saikyo-miso grilled sablefish','西京味噌烤银鳕鱼'],['Iron-pot lamb and laghman noodles','铁锅羊肉与拉格曼面'],['Yakiniku and grilled offal','烤肉与烤内脏'],['Garlic mushrooms and oyster gratin','蒜香蘑菇与焗牡蛎'],['Avocado mince cutlet and chicken hot-pot rice','牛油果肉饼与鸡肉锅饭'],['Roast-pork sandwich breakfast','烤猪肉三明治早餐'],['Flaming sake hot pot and barley rice with grated yam','火焰酒锅与山药泥麦饭'],['Stewed beef and mixed-ingredient pot rice','炖牛肉与五目釜饭'],['Sardine yukhoe and kabayaki sardines','沙丁鱼生拌与蒲烧沙丁鱼']
  ],[
   ['Spicy stir-fried bean sprouts and meat','微辣豆芽炒肉'],['Korean-style tempura and samgyetang ramen','韩式天妇罗与参鸡汤拉面'],['Steak rice bowl','牛排丼'],['Tenderloin short ribs and sukiyaki-style loin','嫩肋肉与寿喜烧风里脊'],['Whitebait tempura and octopus rice','银鱼天妇罗与章鱼饭'],['Cheese kulcha and lamb-mint curry','芝士库尔查饼与薄荷羊肉咖喱'],['Mentaiko cream pasta and pork-cutlet sandwich','明太子奶油意面与炸猪排三明治'],['Oxtail soup and açaí bowl','牛尾汤与巴西莓碗'],['Mao-style spare ribs and black fried rice','毛泽东排骨与黑炒饭'],['Ham-and-egg set meal and a cutlet platter','火腿煎蛋定食与猪排盘'],['Fresh shrimp spring rolls and chicken sticky rice','鲜虾春卷与鸡肉糯米饭'],['Shrimp dumplings and grilled rice balls','虾肉丸与烤饭团']
  ],[
   ['Garlic skirt steak and samgyeopsal','蒜香横膈膜肉与韩式烤五花肉'],['Spinach with bacon and smoked saury sashimi','培根菠菜与烟熏秋刀鱼刺身'],['Lamb hamburger steak and vegetable couscous','羊肉汉堡排与蔬菜库斯库斯'],['Stir-fried pork with Sanxing scallions and red-yeast pork','三星葱炒肉与红糟炸猪肉'],['Chicken rice and dry noodles','鸡肉饭与干拌面'],['Kue set meal and cold tea rice with minced fish','九绘定食与鱼肉泥冷茶泡饭'],['Lamb shoulder loin and lamb chops','羊肩里脊与羊排'],['Ema datshi and phaksha pa','不丹芝士辣椒与猪肉料理'],['Salt-grilled pork with rice and assorted fried food','盐烤猪肉饭与炸物拼盘'],['Stir-fried liver rice bowl','纯肝丼'],['Pan-fried oysters and omurice with American sauce','香煎牡蛎与美式酱蛋包饭'],['Solo sukiyaki','一人寿喜烧']
  ],[
   ['Okonomiyaki set meal and Hirano kushikatsu','大阪烧定食与平野炸串'],['Ginger pork-belly set meal','姜烧五花肉定食'],['Herbal chicken-and-vegetable soup curry','鸡肉蔬菜药膳汤咖喱'],['Salt-grilled beef tongue and kainomi','盐烤牛舌与贝身肉'],['Conveyor-belt sushi','回转寿司'],['Shan-style pork with pickled greens and beef noodle soup','掸式猪肉炒腌菜与牛肉汤面'],['Crispy sara udon and spring rolls','皿乌冬与春卷'],['Lamb with leeks and spare ribs','大葱炒羊肉与排骨'],['Zarzuela seafood stew and squid-ink paella','西班牙海鲜锅与墨鱼汁海鲜饭'],['Fried horse-mackerel set meal','炸竹荚鱼定食'],['Cold dan dan noodles and twice-cooked pork','冷担担面与回锅肉'],['Fried corn and beef rice','炸玉米与牛肉饭']
  ],[
   ['Pork shoulder-loin cutlet set meal','炸猪肩里脊定食'],['Solo buffet','一人自助餐'],['Chorizo queso fundido and chicken pipián verde','辣香肠芝士锅与绿酱鸡肉'],['Tanmen noodle soup and pork sukiyaki','蔬菜汤面与猪肉寿喜烧'],['Green and red mapo tofu','绿麻婆豆腐与红麻婆豆腐'],['Dark-sauce simmered sablefish set meal','浓黑酱炖银鳕鱼定食'],['Natto pizza and spicy pasta','纳豆披萨与辣意面'],['Chicken nanban and local chicken skewers','南蛮鸡与地鸡腿肉串'],['Natto jjigae and DIY bibimbap','纳豆锅与自拌石锅饭'],['Bone-in pork ribs and assorted side dishes','带骨猪肋排与小菜'],['House garlic soup and butter-fried salmon','特制蒜汤与黄油煎三文鱼'],['Garlic-chive omelet rice and chili shrimp','韭菜鸡蛋饭与辣酱虾']
  ],[
   ['Chinese-style pot rice and shrimp wonton noodles','中华釜饭与鲜虾云吞面'],['Beef-tongue steak and Meat Patra','牛舌排与米特帕特拉'],['Stuffed cabbage-roll set meal','卷心菜肉卷定食'],['Udon with meat broth and castella pancakes','肉汁乌冬与长崎蛋糕松饼'],['Solo tabletop-roaster yakiniku','一人烤炉烤肉'],['Roast-pork salad and chim chum hot pot','烤猪肉沙拉与泰式陶锅'],['German-style smoked mackerel and spare ribs','德式烟熏鲭鱼与排骨'],['Okaku barbecue and offal soba','横膈膜烤肉与内脏荞麦面'],['South Indian curry set and garlic-cheese dosa','南印度咖喱定食与蒜香芝士多萨'],['Teriyaki yellowtail and cream croquettes','照烧鰤鱼与奶油可乐饼'],['Solo jingisukan lamb barbecue','一人成吉思汗烤羊肉'],['Pork-cutlet rice bowl and cold mapo noodles','炸猪排丼与冷麻婆面']
  ],[
   ['Pork tenderloin cutlet set and seafood cream croquettes','炸猪里脊定食与海鲜奶油可乐饼'],['Simmered splendid alfonsino and Goro’s own parfait','炖金目鲷与五郎自制芭菲'],['Moussaka and dolmades','穆萨卡与葡萄叶饭卷'],['Kabayaki eel fried rice and spicy oysters with chives','蒲烧鳗鱼炒饭与香辣牡蛎炒韭菜'],['Thin-sliced grilled beef and pork','烤牛肉片与烤猪肉片'],['Soy-sauce meat-and-eggplant set and fried chicken','酱油肉炒茄子定食与炸鸡'],['Guizhou-style twice-cooked pork and natto hot pot','贵州家常回锅肉与纳豆火锅'],['Rice balls and salt-grilled sweetfish','饭团与盐烤香鱼'],['Yakiniku set meal','烤肉定食'],['Stewed offal and ham cutlets','炖内脏与炸火腿排'],['Chansan makh and lamb zhajiang noodles','蒙古手把肉与羊肉炸酱面'],['Cheese hamburger steak and ginger beef tenderloin','芝士汉堡排与姜烧牛里脊']
  ],[
   ['Hearty beef stir-fry and scallion omelet','元气牛肉炒与葱蛋'],['Rendang and nasi goreng','仁当炖肉与印尼炒饭'],['Sautéed sea bream with aurora sauce and tuna yukhoe rice','欧若拉酱煎真鲷与生拌金枪鱼丼'],['Provençal turban shell and mushrooms, and beef-tongue stew omurice','普罗旺斯风海螺蘑菇与牛舌炖菜蛋包饭'],['Stir-fried liver with scallions and chicken-skin gyoza','葱炒肝与鸡皮饺子'],['Tonchan and keichan','猪肉炒与鸡肉炒'],['Fu chanpuru and tomato-curry dipping soba','麸炒什锦与番茄咖喱蘸汁荞麦面'],['Crab-stuffed shell oden and seafood rice with grated yam','蟹面关东煮与山药泥海鲜丼'],['Sweet-and-sour pork and chamcha noodles','咕咾肉与双拼面'],['Pork rice-noodle rolls and wonton noodles','猪肉肠粉与云吞面'],['Pork-loin sauté with salt and wasabi','盐与山葵煎猪里脊'],['Meatloaf at an Italian diner','意大利食堂的肉饼']
  ],[
   ['Mirin-seasoned mackerel and pork miso soup','味醂鲭鱼与猪肉味噌汤'],['Chicken and mutton','鸡肉与羊肉'],['Spicy lamb shoulder with fermented greens, and pork belly with cucumber in garlic sauce','发酵菜香辣炒羊肩肉与蒜汁五花肉黄瓜'],['Bagna cauda and spleen panini','意式热蘸酱与脾脏帕尼尼'],['Bún thịt nướng and chả giò','越式烤肉米粉与炸春卷'],['Thin-sliced pork teppanyaki','薄切猪肉铁板烧'],['Pan-fried marlin with spinach cream sauce','菠菜奶油酱香煎旗鱼'],['Taiwan-style ramen and boiled dumplings','台湾拉面与水饺'],['Liver steak set meal','肝排定食'],['Fried horse mackerel and striped bonito','炸竹荚鱼与炸齿鲣'],['Garlic-grilled tuna set meal','蒜香烤金枪鱼定食'],['Simmered pork-cutlet set meal','煮猪排定食']
  ]
 ];
 const zh={
  '数据来源与收录范围 ↗':'数据来源与收录范围','本集主题 · {dish}':'本集主题：{dish}',
  '来源说明':'每家店的详情中另列地址及菜系来源。来源未直接给出菜系时，按店铺类型或本集主题归类，并标为「料理归类」。地址冲突会保留另一版本供核对；「已闭店」「已搬迁」表示来源中的记录，未经逐店实时核实。地图链接使用店名与地址搜索，未保证唯一店铺匹配。',
  '地图资料说明':'采集日期：2026 年 10 月 4 日。餐厅资料可离线查看；互动地图底图、Google Maps 和外部来源需要联网。地图坐标来自 MapShelf 和日本国土地理院地址定位，其他来源列于店铺详情。约略位置以虚线标记；移动餐车等固定位置未查证的店铺暂不放置标记。',
  '翻译说明':'店名与地址保留原文，方便查询与导航。本集主题提供中文及英文翻译；资料来源的原文可在详情中查看。'
 };
 const key='kodoku-language-v1';
 const requested=new URLSearchParams(location.search).get('lang');
 let saved;try{saved=localStorage.getItem(key);}catch{}
 let language=['en','zh'].includes(requested)?requested:['en','zh'].includes(saved)?saved:(navigator.language||'en').toLowerCase().startsWith('zh')?'zh':'en';
 function t(value,vars={},lang=language){const translated=lang==='en'?(en[value]??value):(zh[value]??value);return translated.replace(/\{(\w+)\}/g,(_,name)=>String(vars[name]??'{'+name+'}'));}
 function cuisine(value,lang=language){return lang==='en'?(cuisines[value]??value):value;}
 function area(value,lang=language){return lang==='en'?(areas[value]??value):value;}
 function theme(record,lang=language){return themes[record.season-1]?.[record.episode-1]?.[lang==='en'?0:1]||record.dish;}
 function apply(){
  document.documentElement.lang=language==='en'?'en':'zh-CN';
  document.title=t('孤独的美食家 · 餐厅手帖');
  document.querySelectorAll('[data-i18n]').forEach(node=>{node.textContent=t(node.dataset.i18n);});
  for(const [selector,attribute,dataset] of [['[data-i18n-label]','aria-label','i18nLabel'],['[data-i18n-placeholder]','placeholder','i18nPlaceholder']])document.querySelectorAll(selector).forEach(node=>node.setAttribute(attribute,t(node.dataset[dataset])));
  document.querySelectorAll('[data-language]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.language===language));});
 }
 function set(value){if(!['en','zh'].includes(value))return;try{localStorage.setItem(key,value);}catch{}if(value===language)return;language=value;apply();window.dispatchEvent(new Event('languagechange'));}
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>set(button.dataset.language)));
 apply();
 return {get lang(){return language;},t,cuisine,area,theme,set,apply};
})();
