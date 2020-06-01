function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"7wo0":function(t,e,n){"use strict";n.r(e),n.d(e,"SettingsModule",(function(){return G}));var i=n("ofXK"),r=n("3Pt+"),o=n("37S3"),a=n("UmVK"),c=n("tyNb"),s=n("dq+2"),l=n("1G5W"),b=n("Pk+l"),f=n("/H4Z"),u=n("XNiG"),d=n("XXX7"),g=n("fXoL"),m=n("kt0X"),p=n("fLG7"),h=n("Ymxs"),y=n("kmnG"),v=n("qFsG"),w=n("bTqV"),D=n("Frqi");function k(t,e){1&t&&(g.Wb(0,"mat-error"),g.Ec(1," Please enter only numerical values. "),g.Vb())}function V(t,e){1&t&&(g.Wb(0,"mat-error"),g.Ec(1," Field is "),g.Wb(2,"strong"),g.Ec(3,"required"),g.Vb(),g.Vb())}function C(t,e){1&t&&(g.Wb(0,"div",18),g.Ec(1," Please fix your invalid values. "),g.Vb())}function W(t,e){1&t&&(g.Wb(0,"div",19),g.Ec(1," Updating... "),g.Vb())}function E(t,e){if(1&t){var n=g.Xb();g.Wb(0,"form",10),g.Wb(1,"mat-form-field",11),g.Wb(2,"mat-label"),g.Ec(3),g.Vb(),g.Rb(4,"input",12),g.Cc(5,k,2,0,"mat-error",13),g.Cc(6,V,4,0,"mat-error",13),g.Vb(),g.Cc(7,C,2,0,"div",14),g.Wb(8,"div",15),g.Cc(9,W,2,0,"div",16),g.Wb(10,"button",17),g.ec("click",(function(){return g.vc(n),g.ic().updateConfig()})),g.Ec(11,"Update"),g.Vb(),g.Vb(),g.Vb()}if(2&t){var i=g.ic();g.oc("formGroup",i.configFg),g.Db(3),g.Fc(i.workingDayLabel),g.Db(2),g.oc("ngIf",i.workingDaysFc.hasError("numbersOnly")&&!i.workingDaysFc.hasError("required")),g.Db(1),g.oc("ngIf",i.workingDaysFc.hasError("required")),g.Db(1),g.oc("ngIf",!i.formValid),g.Db(2),g.oc("ngIf",i.updateLoading),g.Db(1),g.oc("disabled",i.updateLoading)}}function F(t,e){1&t&&g.Rb(0,"app-shared-loading")}var I,L,O,P=[{path:"",component:(I=function(){function t(e,n,i,r){var o=this;_classCallCheck(this,t),this.store=e,this.fb=n,this.afs=i,this.ts=r,this.formValid=!0,this.compDest$=new u.a,this.workingDayLabel="Total number of work days per year (DOES NOT INCLUDE HOLIDAYS)",this.store.select("settings").pipe(Object(l.a)(this.compDest$)).subscribe((function(t){o.dataLoading=t.loading,o.updateLoading=t.updateLoading,o.currentSettingData=t.settingsConfig,o.error=t.error,o.errorMsg=t.errorMsg,o.currentSettingData&&o.buildConfigFg(o.currentSettingData)}))}return _createClass(t,[{key:"ngOnInit",value:function(){this.store.dispatch(d.c())}},{key:"getUserConfigData",value:function(){return this.afs.getDocByPath("settings")}},{key:"buildConfigFg",value:function(t){this.configFg=this.fb.group({workDays:b.a(null==t?void 0:t.workDays,!1,[r.p.required,f.a])})}},{key:"updateConfig",value:function(){this.formValid=this.configFg.valid,this.configFg.valid&&this.store.dispatch(d.f({settingsVal:this.configFg.value}))}},{key:"ngOnDestroy",value:function(){this.compDest$.next(),this.compDest$.complete(),this.ts.clearAll()}},{key:"workingDaysFc",get:function(){return this.configFg.get("workDays")}}]),t}(),I.\u0275fac=function(t){return new(t||I)(g.Qb(m.h),g.Qb(r.c),g.Qb(p.a),g.Qb(h.a))},I.\u0275cmp=g.Kb({type:I,selectors:[["app-settings"]],decls:29,vars:2,consts:[[1,"container","mb-3"],[1,"row","mb-3","secfont","text-center","mt-3"],[1,"col-sm-12"],[1,"row","mb-2","mt-2"],[1,"col-lg-6","col-md-6","col-sm-12"],["role","alert",1,"alert","alert-primary"],[1,"col-sm-12","sub-title"],[1,"row","mb-3","mt-2"],["class","full-w",3,"formGroup",4,"ngIf","ngIfElse"],["loading",""],[1,"full-w",3,"formGroup"],[1,"full-w"],["matInput","","formControlName","workDays"],[4,"ngIf"],["class","alert alert-danger","role","alert",4,"ngIf"],[1,"mt-3"],["class","mt-2 mb-2",4,"ngIf"],["mat-flat-button","","color","primary","type","button",3,"disabled","click"],["role","alert",1,"alert","alert-danger"],[1,"mt-2","mb-2"]],template:function(t,e){if(1&t&&(g.Wb(0,"div",0),g.Wb(1,"div",1),g.Wb(2,"div",2),g.Wb(3,"h2"),g.Ec(4,"Milestone Configurations"),g.Vb(),g.Vb(),g.Vb(),g.Wb(5,"div",3),g.Wb(6,"div",4),g.Wb(7,"div",5),g.Ec(8," General info for 2020:"),g.Rb(9,"br"),g.Ec(10," Days in 2020 From Wednesday, January 1, 2020, to Wednesday, December 31, 2020, there are: "),g.Rb(11,"br"),g.Wb(12,"ul"),g.Wb(13,"li"),g.Ec(14," 366 days "),g.Vb(),g.Wb(15,"li"),g.Ec(16," 252 working days "),g.Vb(),g.Wb(17,"li"),g.Ec(18," 104 weekend days "),g.Vb(),g.Wb(19,"li"),g.Ec(20," 10 public holidays "),g.Vb(),g.Vb(),g.Vb(),g.Vb(),g.Vb(),g.Wb(21,"div",3),g.Wb(22,"div",6),g.Ec(23," Overall Configurations "),g.Vb(),g.Vb(),g.Wb(24,"div",7),g.Wb(25,"div",4),g.Cc(26,E,12,7,"form",8),g.Cc(27,F,1,0,"ng-template",null,9,g.Dc),g.Vb(),g.Vb(),g.Vb()),2&t){var n=g.tc(28);g.Db(26),g.oc("ngIf",!e.dataLoading&&e.configFg)("ngIfElse",n)}},directives:[i.k,r.q,r.m,r.f,y.c,y.g,v.b,r.b,r.l,r.e,w.a,y.b,D.a],styles:[".sub-title[_ngcontent-%COMP%]{font-weight:800}"]}),I),canActivate:[s.a]}],_=((L=function t(){_classCallCheck(this,t)}).\u0275mod=g.Ob({type:L}),L.\u0275inj=g.Nb({factory:function(t){return new(t||L)},imports:[[c.e.forChild(P)],c.e]}),L),q=n("UPf0"),G=((O=function t(){_classCallCheck(this,t)}).\u0275mod=g.Ob({type:O}),O.\u0275inj=g.Nb({factory:function(t){return new(t||O)},providers:[],imports:[[i.c,r.h,r.o,a.a,o.a,q.a,_]]}),O)}}]);