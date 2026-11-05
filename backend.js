/* Ustozbek: hisoblar, kodlar va natijalar.
   firebase-config.js to'ldirilgan bo'lsa Firebase (haqiqiy server), aks holda demo rejim (faqat shu qurilmada). */
(function(){
"use strict";
var cfg=window.FIREBASE_CONFIG||{};
var FB=!!(cfg.apiKey&&String(cfg.apiKey).indexOf("PASTE")<0&&cfg.projectId&&String(cfg.projectId).indexOf("PASTE")<0);
var DOMAIN="@ustozbek.uz";
var CODE_ALPHA="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
var PASS_ALPHA="abcdefghjkmnpqrstuvwxyz23456789";
var listeners=[],current=null,busy=false;

function rndStr(n,alpha){var a=new Uint32Array(n);crypto.getRandomValues(a);var s="";for(var i=0;i<n;i++)s+=alpha.charAt(a[i]%alpha.length);return s}
var CYR={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"j","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"x","ц":"s","ч":"ch","ш":"sh","щ":"sh","ъ":"","ы":"i","ь":"","э":"e","ю":"yu","я":"ya","ў":"o","қ":"q","ғ":"g","ҳ":"h"};
function slug(s){
  s=String(s||"").toLowerCase();
  s=s.replace(/[а-яёўқғҳ]/g,function(c){return CYR[c]!==undefined?CYR[c]:""});
  return s.replace(/[^a-z0-9]/g,"");
}
function makeLogin(ism,fam){return (slug(ism)||"user")+"."+(slug(fam)||"x")+rndStr(3,"0123456789")}
function makePass(){return rndStr(8,PASS_ALPHA)}
function normCode(c){return String(c||"").toUpperCase().replace(/[^A-Z0-9]/g,"")}
function normLogin(l){return String(l||"").trim().toLowerCase().replace(/[^a-z0-9._]/g,"")}
function emit(){listeners.forEach(function(f){try{f(current)}catch(e){}})}
function setCur(u){current=u;emit()}
function need(f,msg){if(!String(f||"").trim())throw new Error(msg)}
function checkForm(f){
  need(f.ism,"Ismingizni kiriting");need(f.familiya,"Familiyangizni kiriting");need(f.maktab,"Maktabingizni kiriting");
  var g=+f.sinf;if(!(g>=1&&g<=11))throw new Error("Sinfni tanlang");
  need(f.code,"Tasdiqlash kodini kiriting");
}
function cleanProfile(f,login,code){
  return {role:"student",ism:f.ism.trim().slice(0,60),familiya:f.familiya.trim().slice(0,60),maktab:f.maktab.trim().slice(0,100),grade:+f.sinf,login:login,code:code,progress:{}};
}

/* ================= Firebase ================= */
var auth,db,ready=null;
function loadScript(src){return new Promise(function(res,rej){var s=document.createElement("script");s.src=src;s.onload=res;s.onerror=function(){rej(new Error("Server bilan aloqa o‘rnatilmadi. Internetni tekshiring."))};document.head.appendChild(s)})}
function init(){
  if(ready)return ready;
  var base="https://www.gstatic.com/firebasejs/10.12.2/";
  ready=loadScript(base+"firebase-app-compat.js").then(function(){return loadScript(base+"firebase-auth-compat.js")})
    .then(function(){return loadScript(base+"firebase-firestore-compat.js")})
    .then(function(){firebase.initializeApp(cfg);auth=firebase.auth();db=firebase.firestore()})
    .catch(function(e){ready=null;throw e});
  return ready;
}
function ts(){return firebase.firestore.FieldValue.serverTimestamp()}
function millis(v){return v&&v.toMillis?v.toMillis():(typeof v==="number"?v:0)}
async function fbIsTeacher(){try{await db.collection("codes").limit(1).get();return true}catch(e){return false}}
async function fbResolve(u){
  if(!u)return null;
  var google=(u.providerData||[]).some(function(p){return p.providerId==="google.com"});
  if(google){
    if(await fbIsTeacher())return {uid:u.uid,role:"teacher",name:u.displayName||u.email||"O‘qituvchi"};
    await auth.signOut();return null;
  }
  var snap=await db.collection("users").doc(u.uid).get();
  if(!snap.exists){await auth.signOut();return null}
  return {uid:u.uid,role:"student",profile:snap.data()};
}
function fbAuthErr(e){
  var c=e&&e.code||"";
  if(c==="auth/network-request-failed")return new Error("Internet yo‘q yoki server javob bermadi");
  if(c==="auth/too-many-requests")return new Error("Juda ko‘p urinish. Birozdan keyin qayta urinib ko‘ring");
  if(c==="auth/popup-closed-by-user"||c==="auth/cancelled-popup-request")return new Error("Kirish bekor qilindi");
  return new Error("Login yoki parol noto‘g‘ri");
}
var fbApi={
  onAuth:function(cb){
    listeners.push(cb);
    init().then(function(){
      auth.onAuthStateChanged(function(u){
        if(busy)return;
        fbResolve(u).then(setCur,function(){setCur(null)});
      });
    }).catch(function(){setCur(null)});
  },
  checkCode:async function(code){
    await init();var c=normCode(code);if(c.length<4)throw new Error("Kodni to‘liq kiriting");
    var s;try{s=await db.collection("codes").doc(c).get()}catch(e){throw new Error("Kodni tekshirib bo‘lmadi")}
    if(!s.exists)throw new Error("Kod noto‘g‘ri");
    var d=s.data();if(d.used)throw new Error("Bu kod ishlatilgan");
    return {grade:d.grade,code:c};
  },
  register:async function(f){
    checkForm(f);await init();
    var info=await fbApi.checkCode(f.code);
    if(+info.grade!==+f.sinf)throw new Error("Bu kod "+info.grade+"-sinf uchun berilgan");
    busy=true;
    try{
      var password=makePass(),login,user=null;
      for(var i=0;i<6&&!user;i++){
        login=makeLogin(f.ism,f.familiya);
        try{user=(await auth.createUserWithEmailAndPassword(login+DOMAIN,password)).user}
        catch(e){if(e.code!=="auth/email-already-in-use")throw fbRegErr(e)}
      }
      if(!user)throw new Error("Login yaratib bo‘lmadi, qayta urinib ko‘ring");
      var profile=cleanProfile(f,login,info.code);
      var batch=db.batch();
      batch.update(db.collection("codes").doc(info.code),{used:true,usedBy:user.uid,usedAt:ts()});
      var doc=Object.assign({},profile,{createdAt:ts(),lastSeen:ts()});
      batch.set(db.collection("users").doc(user.uid),doc);
      try{await batch.commit()}
      catch(e){try{await user.delete()}catch(_){}throw new Error("Kodni tasdiqlab bo‘lmadi. Kod boshqa o‘quvchiga ishlatilgan bo‘lishi mumkin.")}
      var me={uid:user.uid,role:"student",profile:profile};
      current=me;
      return {login:login,password:password,me:me};
    }finally{busy=false;emit()}
  },
  login:async function(login,pass){
    await init();login=normLogin(login);
    if(!login||!pass)throw new Error("Login va parolni kiriting");
    try{await auth.signInWithEmailAndPassword(login+DOMAIN,pass)}catch(e){throw fbAuthErr(e)}
    var me=await fbResolve(auth.currentUser);
    if(!me)throw new Error("Hisob topilmadi");
    setCur(me);return me;
  },
  teacherLogin:async function(){
    await init();
    var prov=new firebase.auth.GoogleAuthProvider();
    try{await auth.signInWithPopup(prov)}
    catch(e){
      if(e.code==="auth/popup-blocked"||e.code==="auth/operation-not-supported-in-this-environment"){await auth.signInWithRedirect(prov);return null}
      throw fbAuthErr(e);
    }
    var me=await fbResolve(auth.currentUser);
    if(!me)throw new Error("Bu hisob o‘qituvchi sifatida tasdiqlanmagan");
    setCur(me);return me;
  },
  logout:async function(){await init();await auth.signOut();setCur(null)},
  saveProgress:async function(progress,key){
    if(!current||current.role!=="student")return;
    var ref=db.collection("users").doc(current.uid);
    if(key&&progress[key])await ref.update(new firebase.firestore.FieldPath("progress",key),progress[key],"lastSeen",ts());
    else await ref.update({progress:progress,lastSeen:ts()});
  },
  unlockTopic:async function(uid,key){
    await db.collection("users").doc(uid).update(new firebase.firestore.FieldPath("progress",key),{read:true,passed:true,byTeacher:true},"lastSeen",ts());
  },
  createCodes:async function(grade,n,note){
    n=Math.max(1,Math.min(50,+n||1));
    for(var attempt=0;attempt<4;attempt++){
      var codes=[],seen={};
      while(codes.length<n){var c=rndStr(6,CODE_ALPHA);if(!seen[c]){seen[c]=1;codes.push(c)}}
      var batch=db.batch();
      codes.forEach(function(c){batch.set(db.collection("codes").doc(c),{grade:+grade,used:false,note:String(note||"").slice(0,80),createdAt:ts()})});
      try{await batch.commit();return codes}catch(e){if(attempt===3)throw new Error("Kodlarni yaratib bo‘lmadi")}
    }
  },
  listCodes:async function(){
    var s=await db.collection("codes").orderBy("createdAt","desc").limit(500).get();
    return s.docs.map(function(d){var x=d.data();return {code:d.id,grade:x.grade,used:!!x.used,usedBy:x.usedBy||"",note:x.note||"",createdAt:millis(x.createdAt)}});
  },
  deleteCode:async function(code){await db.collection("codes").doc(code).delete()},
  listStudents:async function(){
    var s=await db.collection("users").limit(2000).get();
    return s.docs.map(function(d){var x=d.data();return {uid:d.id,ism:x.ism,familiya:x.familiya,maktab:x.maktab,grade:x.grade,login:x.login,progress:x.progress||{},lastSeen:millis(x.lastSeen),createdAt:millis(x.createdAt)}});
  }
};
function fbRegErr(e){
  var c=e&&e.code||"";
  if(c==="auth/network-request-failed")return new Error("Internet yo‘q yoki server javob bermadi");
  if(c==="auth/operation-not-allowed")return new Error("Server sozlanmagan: Email/Parol kirish yoqilmagan");
  return new Error("Ro‘yxatdan o‘tib bo‘lmadi. Qayta urinib ko‘ring");
}

/* ================= Demo (faqat shu qurilmada) ================= */
var KEY="ustozbek-demo-v1";
function dload(){try{return JSON.parse(localStorage.getItem(KEY))||{codes:{},users:{},session:null}}catch(e){return {codes:{},users:{},session:null}}}
function dsave(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}}
function dresolve(d){
  if(!d.session)return null;
  if(d.session==="__teacher__")return {uid:"teacher",role:"teacher",name:"Demo o‘qituvchi"};
  var u=d.users[d.session];return u?{uid:d.session,role:"student",profile:u.profile}:null;
}
var demoApi={
  onAuth:function(cb){listeners.push(cb);setTimeout(function(){current=dresolve(dload());cb(current)},0)},
  checkCode:async function(code){
    var c=normCode(code),d=dload();if(c.length<4)throw new Error("Kodni to‘liq kiriting");
    var x=d.codes[c];if(!x)throw new Error("Kod noto‘g‘ri");if(x.used)throw new Error("Bu kod ishlatilgan");
    return {grade:x.grade,code:c};
  },
  register:async function(f){
    checkForm(f);var info=await demoApi.checkCode(f.code);
    if(+info.grade!==+f.sinf)throw new Error("Bu kod "+info.grade+"-sinf uchun berilgan");
    var d=dload(),login;
    do{login=makeLogin(f.ism,f.familiya)}while(d.users[login]);
    var password=makePass(),profile=cleanProfile(f,login,info.code);
    profile.createdAt=Date.now();profile.lastSeen=Date.now();
    d.users[login]={password:password,profile:profile};
    d.codes[info.code].used=true;d.codes[info.code].usedBy=login;
    d.session=login;dsave(d);
    var me=dresolve(d);current=me;emit();
    return {login:login,password:password,me:me};
  },
  login:async function(login,pass){
    var d=dload();login=normLogin(login);
    if(!login||!pass)throw new Error("Login va parolni kiriting");
    var u=d.users[login];if(!u||u.password!==pass)throw new Error("Login yoki parol noto‘g‘ri");
    d.session=login;dsave(d);var me=dresolve(d);setCur(me);return me;
  },
  teacherLogin:async function(){var d=dload();d.session="__teacher__";dsave(d);var me=dresolve(d);setCur(me);return me},
  logout:async function(){var d=dload();d.session=null;dsave(d);setCur(null)},
  saveProgress:async function(progress,key){
    var d=dload();if(!d.session||!d.users[d.session])return;
    var pr=d.users[d.session].profile;
    if(key&&progress[key]){pr.progress=pr.progress||{};pr.progress[key]=progress[key]}else pr.progress=progress;
    pr.lastSeen=Date.now();dsave(d);
  },
  unlockTopic:async function(uid,key){
    var d=dload();if(!d.users[uid])return;var pr=d.users[uid].profile;
    pr.progress=pr.progress||{};pr.progress[key]={read:true,passed:true,byTeacher:true};dsave(d);
  },
  createCodes:async function(grade,n,note){
    n=Math.max(1,Math.min(50,+n||1));var d=dload(),out=[];
    while(out.length<n){var c=rndStr(6,CODE_ALPHA);if(!d.codes[c]){d.codes[c]={grade:+grade,used:false,usedBy:"",note:String(note||"").slice(0,80),createdAt:Date.now()+out.length};out.push(c)}}
    dsave(d);return out;
  },
  listCodes:async function(){
    var d=dload();return Object.keys(d.codes).map(function(c){var x=d.codes[c];return {code:c,grade:x.grade,used:!!x.used,usedBy:x.usedBy||"",note:x.note||"",createdAt:x.createdAt||0}}).sort(function(a,b){return b.createdAt-a.createdAt});
  },
  deleteCode:async function(code){var d=dload();delete d.codes[code];dsave(d)},
  listStudents:async function(){
    var d=dload();return Object.keys(d.users).map(function(l){var p=d.users[l].profile;return {uid:l,ism:p.ism,familiya:p.familiya,maktab:p.maktab,grade:p.grade,login:p.login,progress:p.progress||{},lastSeen:p.lastSeen||0,createdAt:p.createdAt||0}});
  }
};

var api=FB?fbApi:demoApi;
window.UB={mode:FB?"firebase":"demo",
  onAuth:api.onAuth,checkCode:api.checkCode,register:api.register,login:api.login,teacherLogin:api.teacherLogin,logout:api.logout,
  saveProgress:api.saveProgress,unlockTopic:api.unlockTopic,createCodes:api.createCodes,listCodes:api.listCodes,deleteCode:api.deleteCode,listStudents:api.listStudents,
  user:function(){return current}};
})();
