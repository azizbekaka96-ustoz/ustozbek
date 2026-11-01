/* Ustozbek mazmuni. Yangi mavzu qo'shish: tegishli sinf ro'yxatiga {t, lesson, quiz} qo'shing.
   t - mavzu nomi (saytdagi mavzular ro'yxati bilan bir xil), lesson - dars matni (HTML),
   quiz - savollar: {q, o:[variantlar], a:to'g'ri javob raqami (0 dan), e:izoh}. */
window.CONTENT={
ict:{
5:[
{t:"Axborot turlari",
lesson:`<p><b>Axborot</b> — bizni o‘rab turgan dunyo, undagi narsalar va voqealar haqidagi ma’lumotlardir. Masalan, ob-havo ma’lumoti, dars jadvali, do‘stingizning xabari — bularning hammasi axborot.</p>
<h4>Axborotni qanday qabul qilamiz</h4>
<p>Axborotni sezgi a’zolarimiz orqali qabul qilamiz:</p>
<ul><li>ko‘rish (ko‘z): rasm, matn, rang</li><li>eshitish (quloq): ovoz, musiqa, nutq</li><li>hid bilish (burun): gul hidi</li><li>ta’m bilish (til): shirin, nordon</li><li>sezish (teri): issiq, sovuq</li></ul>
<h4>Axborot turlari</h4>
<div class="tw"><table><tr><th>Tur</th><th>Misol</th></tr>
<tr><td>Matnli</td><td>kitob, xabar, e’lon</td></tr>
<tr><td>Sonli</td><td>harorat, narx, baho</td></tr>
<tr><td>Grafik</td><td>rasm, chizma, xarita</td></tr>
<tr><td>Tovushli</td><td>musiqa, ovoz, qo‘ng‘iroq</td></tr>
<tr><td>Video</td><td>multfilm, film</td></tr></table></div>
<h4>Axborot bilan amallar</h4>
<ol><li>Olish (qabul qilish)</li><li>Saqlash</li><li>Qayta ishlash</li><li>Uzatish</li></ol>
<div class="ex"><b>Misol.</b> Siz darslikdan matn o‘qidingiz (olish), daftarga yozib oldingiz (saqlash), qisqartirdingiz (qayta ishlash) va do‘stingizga aytib berdingiz (uzatish).</div>
<h4>Axborot tashuvchilar</h4>
<p>Axborot saqlanadigan narsa <b>tashuvchi</b> deyiladi: qog‘oz, flesh-xotira, disk, kompyuter xotirasi.</p>`,
quiz:[
{q:"Axborot nima?",o:["Faqat kompyuterdagi fayllar","Atrofimizdagi dunyo haqidagi ma’lumotlar","Faqat kitoblardagi matn","Faqat televizor ko‘rsatuvlari"],a:1,e:"Axborot — dunyo, narsa va voqealar haqidagi ma’lumot."},
{q:"Quyidagilardan qaysi biri quloq orqali qabul qilinadi?",o:["Rasm","Musiqa","Gul hidi","Harorat"],a:1,e:"Musiqa eshitish orqali qabul qilinadi."},
{q:"Rasm, chizma va xarita qaysi axborot turiga kiradi?",o:["Matnli","Tovushli","Grafik","Sonli"],a:2,e:"Tasvirlar grafik axborot hisoblanadi."},
{q:"Haroratni o‘lchash natijasi (masalan, 18 daraja) qaysi axborot turiga eng yaqin?",o:["Sonli","Tovushli","Video","Grafik"],a:0,e:"Raqam bilan ifodalangan axborot sonli axborotdir."},
{q:"Qaysi biri axborot bilan bajariladigan amal emas?",o:["Saqlash","Uzatish","Qayta ishlash","Bo‘yash"],a:3,e:"Asosiy amallar: olish, saqlash, qayta ishlash, uzatish."},
{q:"Flesh-xotira qanday vazifani bajaradi?",o:["Axborotni saqlaydi","Tovushni chiqaradi","Rasmni chop etadi","Matnni tahrirlaydi"],a:0,e:"Flesh-xotira axborot tashuvchi vositadir."},
{q:"Do‘stingizga xabar yuborish axborot bilan qaysi amalga mos?",o:["Saqlash","Uzatish","Olish","O‘chirish"],a:1,e:"Xabar yuborish axborotni uzatishdir."},
{q:"Multfilm qaysi axborot turiga kiradi?",o:["Video","Sonli","Matnli","Hid"],a:0,e:"Harakatlanuvchi tasvir va tovush video axborotdir."}
]},
{t:"Fayl va papkalar",
lesson:`<p><b>Fayl</b> — kompyuterda nom bilan saqlanadigan axborot: matn, rasm, qo‘shiq yoki dastur.</p>
<h4>Fayl nomi va kengaytmasi</h4>
<p>Fayl nomi nuqta orqali kengaytmadan ajraladi. Kengaytma fayl turini bildiradi.</p>
<div class="ex"><b>Referat.docx</b> faylida «Referat» — nomi, «docx» — kengaytmasi.</div>
<div class="tw"><table><tr><th>Kengaytma</th><th>Fayl turi</th></tr>
<tr><td>.txt</td><td>oddiy matn</td></tr>
<tr><td>.docx</td><td>Word hujjati</td></tr>
<tr><td>.jpg, .png</td><td>rasm</td></tr>
<tr><td>.mp3</td><td>audio</td></tr>
<tr><td>.mp4</td><td>video</td></tr></table></div>
<h4>Papka</h4>
<p><b>Papka</b> fayllarni guruhlab saqlash uchun kerak. Papka ichida boshqa papka ham bo‘lishi mumkin.</p>
<div class="ex"><b>Misol.</b> «Maktab» papkasi ichida «5-sinf» papkasi, uning ichida «Informatika» papkasi.</div>
<h4>Fayl manzili</h4>
<p>Faylning joylashuvi yo‘l (manzil) bilan yoziladi:</p>
<div class="ex">C:&#92;Maktab&#92;5-sinf&#92;Rasm.jpg</div>
<h4>Fayl bilan amallar</h4>
<ul><li>Yaratish</li><li>Nusxa olish: <code>Ctrl + C</code>, qo‘yish: <code>Ctrl + V</code></li><li>Ko‘chirish: <code>Ctrl + X</code>, keyin <code>Ctrl + V</code></li><li>Nomini o‘zgartirish: <code>F2</code></li><li>O‘chirish: <code>Delete</code> (fayl «Savat»ga tushadi)</li></ul>
<h4>Tartib uchun maslahat</h4>
<p>Fayllarga tushunarli nom bering (masalan, «Matematika_uy_vazifasi») va ularni mavzu bo‘yicha papkalarga joylang.</p>`,
quiz:[
{q:"Fayl nima?",o:["Kompyuterda nom bilan saqlanadigan axborot","Kompyuter ekrani","Klaviatura tugmasi","Faqat rasm"],a:0,e:"Fayl — nomi bor, saqlangan axborot."},
{q:"Referat.docx faylida kengaytma qaysi?",o:["Referat","docx","Referat.docx","Nuqta"],a:1,e:"Kengaytma nuqtadan keyin yoziladi."},
{q:".jpg kengaytmali fayl odatda nima bo‘ladi?",o:["Qo‘shiq","Matn hujjati","Rasm","Elektron jadval"],a:2,e:".jpg rasm fayllarining kengaytmasi."},
{q:"Fayllarni guruhlab saqlash uchun nima ishlatiladi?",o:["Papka","Sichqoncha","Monitor","Kengaytma"],a:0,e:"Papka fayllarni tartib bilan saqlashga yordam beradi."},
{q:"Faylni nusxalash uchun qaysi tugmalar birikmasi ishlatiladi?",o:["Ctrl + V","Ctrl + C","Ctrl + X","Ctrl + S"],a:1,e:"Ctrl + C nusxa oladi, Ctrl + V qo‘yadi."},
{q:"Faylni boshqa joyga ko‘chirish uchun avval qaysi birikma bosiladi?",o:["Ctrl + X","Ctrl + C","Ctrl + Z","Ctrl + P"],a:0,e:"Ctrl + X kesib oladi, keyin Ctrl + V bilan yangi joyga qo‘yiladi."},
{q:"Windows’da fayl nomini o‘zgartirish uchun qaysi tugma ishlatiladi?",o:["F1","F2","F5","Esc"],a:1,e:"Belgilangan faylning nomini F2 bilan o‘zgartirish mumkin."},
{q:"Papka ichida boshqa papka bo‘lishi mumkinmi?",o:["Yo‘q, bo‘lmaydi","Ha, bo‘lishi mumkin","Faqat flesh-xotirada","Faqat rasmlar uchun"],a:1,e:"Papka ichida boshqa papkalar ham bo‘lishi mumkin."}
]},
{t:"Matn muharriri",
lesson:`<p><b>Matn muharriri</b> — matn yozish, tahrirlash va saqlash uchun dastur. Oddiy matn muharriri — Bloknot, imkoniyati keng muharrir — Word.</p>
<h4>Asosiy tugmalar</h4>
<div class="tw"><table><tr><th>Tugma</th><th>Vazifasi</th></tr>
<tr><td>Enter</td><td>yangi abzatsga o‘tadi</td></tr>
<tr><td>Backspace</td><td>kursordan chapdagi belgini o‘chiradi</td></tr>
<tr><td>Delete</td><td>kursordan o‘ngdagi belgini o‘chiradi</td></tr>
<tr><td>Shift</td><td>bosib turilganda bosh harf yoziladi</td></tr>
<tr><td>Caps Lock</td><td>hamma harflar bosh harfda yoziladi</td></tr>
<tr><td>Probel (Space)</td><td>so‘zlar orasida bo‘sh joy qoldiradi</td></tr></table></div>
<h4>Kursor</h4>
<p><b>Kursor</b> — ekranda yonib-o‘chib turadigan chiziq. Yozilgan belgi shu joyga tushadi.</p>
<h4>Matnni belgilash va formatlash</h4>
<p>Matn ustida amal bajarish uchun avval uni belgilash kerak. <b>Formatlash</b> — matn ko‘rinishini o‘zgartirish: shrift, o‘lcham, rang.</p>
<ul><li>qalin: <code>Ctrl + B</code></li><li>kursiv: <code>Ctrl + I</code></li><li>tagiga chizilgan: <code>Ctrl + U</code></li></ul>
<h4>Hujjatni saqlash</h4>
<p>Ish yo‘qolmasligi uchun hujjat <code>Ctrl + S</code> bilan saqlanadi. Fayl nomi va saqlanadigan papka tanlanadi.</p>
<div class="ex">Yozayotganda vaqti-vaqti bilan <code>Ctrl + S</code> bosib turing.</div>`,
quiz:[
{q:"Matn muharriri nima uchun kerak?",o:["Matn yozish va tahrirlash uchun","Rasm chop etish uchun","Tovush yozish uchun","Internetga ulanish uchun"],a:0,e:"Matn muharriri matn bilan ishlash dasturidir."},
{q:"Kursordan chapdagi belgini o‘chiradigan tugma qaysi?",o:["Delete","Backspace","Enter","Tab"],a:1,e:"Backspace chapdagi belgini o‘chiradi."},
{q:"Kursordan o‘ngdagi belgini o‘chiradigan tugma qaysi?",o:["Delete","Backspace","Shift","Caps Lock"],a:0,e:"Delete o‘ngdagi belgini o‘chiradi."},
{q:"Yangi abzatsga o‘tish uchun qaysi tugma bosiladi?",o:["Space","Shift","Enter","Esc"],a:2,e:"Enter yangi abzats boshlaydi."},
{q:"Matnni qalin qilish uchun qaysi birikma ishlatiladi?",o:["Ctrl + I","Ctrl + U","Ctrl + B","Ctrl + S"],a:2,e:"Ctrl + B qalin (Bold) qiladi."},
{q:"Hujjatni saqlash uchun qaysi birikma bosiladi?",o:["Ctrl + S","Ctrl + B","Ctrl + V","Ctrl + Z"],a:0,e:"Ctrl + S saqlaydi (Save)."},
{q:"Caps Lock yoqilganda nima bo‘ladi?",o:["Hamma harflar bosh harfda yoziladi","Matn o‘chadi","Hujjat saqlanadi","Kursor yo‘qoladi"],a:0,e:"Caps Lock bosh harflarni doimiy yoqadi."},
{q:"Quyidagilardan qaysi biri matn muharriri?",o:["Sichqoncha","Bloknot","Printer","Monitor"],a:1,e:"Bloknot — oddiy matn muharriri."}
]},
{t:"Scratch loyihasi",
lesson:`<p><b>Scratch</b> — bloklarni ulab dastur tuziladigan vizual dasturlash muhiti. U Massachusets texnologiya institutida (MIT) yaratilgan va bolalar uchun mo‘ljallangan.</p>
<h4>Scratch oynasi</h4>
<ul><li><b>Sahna</b> — loyiha ishlaydigan joy</li><li><b>Sprayt</b> — sahnadagi qahramon (masalan, mushuk)</li><li><b>Bloklar palitrasi</b> — tayyor buyruqlar</li><li><b>Kod maydoni</b> — bloklar ulanadigan joy</li></ul>
<h4>Bloklar turlari</h4>
<div class="tw"><table><tr><th>Tur</th><th>Nima qiladi</th></tr>
<tr><td>Harakat</td><td>spraytni yurgizadi, aylantiradi</td></tr>
<tr><td>Ko‘rinish</td><td>gapirtiradi, o‘lchamini o‘zgartiradi</td></tr>
<tr><td>Tovush</td><td>ovoz va musiqa chiqaradi</td></tr>
<tr><td>Hodisalar</td><td>dastur qachon boshlanishini belgilaydi</td></tr>
<tr><td>Boshqaruv</td><td>takrorlash va shartlar</td></tr></table></div>
<h4>Birinchi dastur</h4>
<ol><li>«Hodisalar» dan «yashil bayroq bosilganda» blokini oling.</li><li>«Harakat» dan «10 qadam yur» blokini uning ostiga ulang.</li><li>«Ko‘rinish» dan «Salom! 2 soniya ayt» blokini ulang.</li><li>Yashil bayroqni bosing va natijani ko‘ring.</li></ol>
<h4>Sikl</h4>
<p>Bir xil amalni bir necha marta bajartirish uchun «takrorla» bloki ishlatiladi.</p>
<div class="ex"><b>Misol.</b> «10 marta takrorla: 10 qadam yur» — mushuk jami 100 qadam yuradi.</div>
<h4>Algoritm</h4>
<p>Scratch dasturi — <b>algoritm</b>, ya’ni amallarning aniq ketma-ketligi.</p>`,
quiz:[
{q:"Scratch nima?",o:["Vizual dasturlash muhiti","Matn muharriri","Brauzer","Antivirus"],a:0,e:"Scratch’da dastur bloklarni ulab tuziladi."},
{q:"Scratch’da qahramon nima deyiladi?",o:["Sahna","Sprayt","Blok","Kursor"],a:1,e:"Sahnadagi qahramon sprayt deyiladi."},
{q:"Dastur ishga tushishini boshlaydigan blok qaysi turga kiradi?",o:["Tovush","Harakat","Hodisalar","Ko‘rinish"],a:2,e:"«Yashil bayroq bosilganda» bloki Hodisalar turiga kiradi."},
{q:"Spraytni yurgizadigan bloklar qaysi turda?",o:["Harakat","Tovush","Hodisalar","Boshqaruv"],a:0,e:"Yurish va aylanish bloklari Harakat turida."},
{q:"Amalni bir necha marta bajartirish uchun qaysi blok ishlatiladi?",o:["Ayt","Qadam yur","Takrorla","Tovush chiqar"],a:2,e:"Takrorlash uchun sikl bloki ishlatiladi."},
{q:"«10 marta takrorla: 10 qadam yur» dasturi spraytni jami necha qadam yurgizadi?",o:["10","20","100","1000"],a:2,e:"10 × 10 = 100 qadam."},
{q:"Algoritm nima?",o:["Amallarning aniq ketma-ketligi","Kompyuter qismi","Rasm turi","Fayl kengaytmasi"],a:0,e:"Algoritm — masalani yechish uchun aniq tartibdagi amallar."},
{q:"Scratch’da dasturni ishga tushirish uchun nima bosiladi?",o:["Qizil kvadrat","Yashil bayroq","Sariq doira","Ko‘k strelka"],a:1,e:"Yashil bayroq dasturni boshlaydi, qizil belgi to‘xtatadi."}
]}
]
},
math:{}
};
