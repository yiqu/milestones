(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"3iNi":function(e,t,c){"use strict";c.r(t),c.d(t,"MyAccountModule",(function(){return A}));var i=c("ofXK"),o=c("3Pt+"),n=c("UmVK"),r=c("tyNb"),a=c("XNiG"),b=c("Cicx"),s=c("fXoL"),l=c("wZkO"),u=c("NFeN"),d=c("MutI");const m=function(e){return[e]};function p(e,t){if(1&e){const e=s.Xb();s.Wb(0,"a",6,7),s.ec("click",(function(){s.vc(e);const c=t.$implicit;return s.ic().activeLink=c})),s.Wb(2,"mat-icon",8),s.Ec(3),s.Vb(),s.Ec(4),s.Vb()}if(2&e){const e=t.$implicit,c=s.tc(1);s.oc("active",c.isActive)("routerLink",s.qc(4,m,e.url)),s.Db(3),s.Fc(e.iconName),s.Db(1),s.Gc(" ",e.display," ")}}let v=(()=>{class e{constructor(){this.compDest$=new a.a,this.tabLinks=[],this.tabLinks.push(new b.e("view","Overview","view",!1,"account_circle"),new b.e("edit","Update","edit",!1,"edit"))}ngOnInit(){}ngOnDestroy(){this.compDest$.next(),this.compDest$.complete()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Kb({type:e,selectors:[["app-my-account"]],decls:10,vars:2,consts:[[1,"container","mb-3"],[1,"row","mb-3","secfont","text-center","mt-3"],[1,"col-sm-12"],[1,"row","mb-2","mt-2"],["mat-tab-nav-bar","",3,"backgroundColor"],["mat-tab-link","","routerLinkActive","",3,"active","routerLink","click",4,"ngFor","ngForOf"],["mat-tab-link","","routerLinkActive","",3,"active","routerLink","click"],["rla","routerLinkActive"],["mat-list-icon","",1,"mr-1"]],template:function(e,t){1&e&&(s.Wb(0,"div",0),s.Wb(1,"div",1),s.Wb(2,"div",2),s.Wb(3,"h2"),s.Ec(4,"My Account"),s.Vb(),s.Vb(),s.Vb(),s.Wb(5,"div",3),s.Wb(6,"div",2),s.Wb(7,"nav",4),s.Cc(8,p,5,6,"a",5),s.Vb(),s.Vb(),s.Vb(),s.Rb(9,"router-outlet"),s.Vb()),2&e&&(s.Db(7),s.oc("backgroundColor",void 0),s.Db(1),s.oc("ngForOf",t.tabLinks))},directives:[l.e,i.k,r.f,r.d,l.d,r.c,u.a,d.a],styles:[""]}),e})();var f=c("1G5W"),W=c("kt0X"),V=c("Wp6s"),h=c("ugsT"),g=c("B6IJ");function w(e,t){if(1&e&&(s.Wb(0,"div",5),s.Wb(1,"div",6),s.Wb(2,"mat-card",7),s.Wb(3,"mat-card-header"),s.Rb(4,"img",8),s.Wb(5,"mat-card-title"),s.Ec(6),s.Vb(),s.Wb(7,"mat-card-subtitle"),s.Ec(8),s.jc(9,"dateDisplay"),s.Vb(),s.Vb(),s.Wb(10,"mat-card-content"),s.Wb(11,"form"),s.Wb(12,"div",9),s.Wb(13,"div",10),s.Wb(14,"label"),s.Ec(15,"Email"),s.Vb(),s.Rb(16,"input",11),s.Vb(),s.Wb(17,"div",10),s.Wb(18,"label"),s.Ec(19,"Display name"),s.Vb(),s.Rb(20,"input",12),s.Vb(),s.Wb(21,"div",10),s.Wb(22,"label"),s.Ec(23,"Phone number"),s.Vb(),s.Rb(24,"input",12),s.Vb(),s.Vb(),s.Wb(25,"div",13),s.Wb(26,"label"),s.Ec(27,"Photo URL"),s.Vb(),s.Rb(28,"input",12),s.Vb(),s.Wb(29,"div",13),s.Wb(30,"label"),s.Ec(31,"Access Token"),s.Vb(),s.Rb(32,"input",12),s.Vb(),s.Wb(33,"div",13),s.Wb(34,"label"),s.Ec(35,"Token Expire Time"),s.Vb(),s.Rb(36,"input",12),s.jc(37,"dateDisplay"),s.Vb(),s.Vb(),s.Vb(),s.Vb(),s.Vb(),s.Vb()),2&e){const e=s.ic();s.Db(4),s.oc("src",e.user.photoURL?e.user.photoURL:e.defaultAvartarImgSrc,s.xc),s.Db(2),s.Fc(e.user.displayName?e.user.displayName:"No Display Name Entered"),s.Db(2),s.Gc(" Last logged in: ",s.lc(9,9,e.user.lastLoginAt,"FULLANDFROMNOW")," "),s.Db(8),s.oc("value",e.user.email),s.Db(4),s.oc("value",e.user.displayName),s.Db(4),s.oc("value",e.user.phoneNumber),s.Db(4),s.oc("value",e.user.photoURL),s.Db(4),s.oc("value",e.user.stsTokenManager.accessToken),s.Db(4),s.oc("value",s.lc(37,12,e.user.stsTokenManager.expirationTime,"FULLANDFROMNOW"))}}function y(e,t){1&e&&(s.Wb(0,"div",14),s.Ec(1," Loading your profile... "),s.Rb(2,"app-loading-spinner",15),s.Vb()),2&e&&(s.Db(2),s.oc("diameter",30))}let D=(()=>{class e{constructor(e){this.store=e,this.viewSubtext="My account information",this.defaultAvartarImgSrc="assets/banner/milestones-banner.jpg",this.compDest$=new a.a}ngOnInit(){this.store.select("appAuth").pipe(Object(f.a)(this.compDest$)).subscribe(e=>{this.user=e.verifiedUser})}}return e.\u0275fac=function(t){return new(t||e)(s.Qb(W.h))},e.\u0275cmp=s.Kb({type:e,selectors:[["app-account-view"]],decls:7,vars:2,consts:[[1,"row","mt-3","mb-3"],[1,"col-sm-6","offset-md-3"],["id","",1,"order-label","comf","center-align"],["class","row mb-3",4,"ngIf","ngIfElse"],["noUser",""],[1,"row","mb-3"],[1,"col-sm-12","roboto"],[1,"profile-card"],["mat-card-avatar","",3,"src"],[1,"form-row"],[1,"form-group","col-sm-4"],["type","email","placeholder","Email","readonly","",1,"form-control",3,"value"],["type","text","readonly","",1,"form-control",3,"value"],[1,"form-group"],[1,"center-align"],[3,"diameter"]],template:function(e,t){if(1&e&&(s.Wb(0,"div",0),s.Wb(1,"div",1),s.Wb(2,"div",2),s.Ec(3," Account Overview "),s.Vb(),s.Vb(),s.Vb(),s.Cc(4,w,38,15,"div",3),s.Cc(5,y,3,1,"ng-template",null,4,s.Dc)),2&e){const e=s.tc(6);s.Db(4),s.oc("ngIf",t.user)("ngIfElse",e)}},directives:[i.l,V.a,V.e,V.c,V.h,V.g,V.d,o.s,o.m,o.n,h.a],pipes:[g.a],styles:[""]}),e})(),k=(()=>{class e{constructor(){this.updateSubText="Update my profile"}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Kb({type:e,selectors:[["app-account-edit"]],decls:7,vars:1,consts:[[1,"row","mt-3","mb-3"],[1,"col-sm-6","offset-md-3"],["id","",1,"order-label","comf","center-align"],[1,"row","mb-3"],[1,"col-sm-12","roboto"]],template:function(e,t){1&e&&(s.Wb(0,"div",0),s.Wb(1,"div",1),s.Wb(2,"div",2),s.Ec(3," Update Profile "),s.Vb(),s.Vb(),s.Vb(),s.Wb(4,"div",3),s.Wb(5,"div",4),s.Ec(6),s.Vb(),s.Vb()),2&e&&(s.Db(6),s.Gc(" ",t.updateSubText," "))},styles:[""]}),e})();const L=[{path:"",component:v,canActivate:[c("dq+2").a],children:[{path:"",redirectTo:"view",pathMatch:"full"},{path:"view",component:D},{path:"edit",component:k}]}];let E=(()=>{class e{}return e.\u0275mod=s.Ob({type:e}),e.\u0275inj=s.Nb({factory:function(t){return new(t||e)},imports:[[r.e.forChild(L)],r.e]}),e})();var N=c("37S3"),O=c("pqmK");let A=(()=>{class e{}return e.\u0275mod=s.Ob({type:e}),e.\u0275inj=s.Nb({factory:function(t){return new(t||e)},providers:[],imports:[[i.c,o.h,o.q,n.a,N.a,O.a,E]]}),e})()}}]);