"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[75],{69367:function(t,e,n){n.d(e,{j:function(){return D}});var r,u=n(45699),a=n(37246),l=n(29711),o=n(62035),s=n(81645);let i=(t,e,n)=>{let r=e-t;return((n-t)%r+r)%r+t};var f=n(81477);function c(t,e){return(0,f.N)(t)?t[i(0,t.length,e)]:t}var p=n(46261),h=n(98650),y=n(23999);function g(t){return"object"==typeof t&&!Array.isArray(t)}function d(t,e,n,r){return"string"==typeof t&&g(e)?(0,u.IG)(t,n,r):t instanceof NodeList?Array.from(t):Array.isArray(t)?t:[t]}function m(t,e,n,r){var u;return"number"==typeof e?e:e.startsWith("-")||e.startsWith("+")?Math.max(0,t+parseFloat(e)):"<"===e?n:null!==(u=r.get(e))&&void 0!==u?u:t}var v=n(69013),A=n(96781);function b(t,e){return t.at!==e.at?t.at-e.at:null===t.value?1:null===e.value?-1:0}function x(t,e){return e.has(t)||e.set(t,{}),e.get(t)}function S(t,e){return e[t]||(e[t]=[]),e[t]}let w=t=>"number"==typeof t,k=t=>t.every(w);var R=n(37003),E=n(60871),O=n(94239),I=n(23482),M=n(59282),N=n(96674),j=n(84426);class C extends j.l{constructor(){super(...arguments),this.type="object"}readValueFromInstance(t,e){if(e in t){let n=t[e];if("string"==typeof n||"number"==typeof n)return n}}getBaseTargetFromProps(){}removeValueFromRenderState(t,e){delete e.output[t]}measureInstanceViewportBox(){return(0,N.dO)()}build(t,e){Object.assign(t.output,e)}renderInstance(t,{output:e}){Object.assign(t,e)}sortInstanceNodePosition(){return 0}}function V(t){let e={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},n=(0,O.v)(t)?new I.e(e):new M.W(e);n.mount(t),R.R.set(t,n)}function _(t){let e=new C({presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}});e.mount(t),R.R.set(t,e)}var F=n(82993);function W(t,e,n,r){let u=[];if((0,y.i)(t)||"number"==typeof t||"string"==typeof t&&!g(e))u.push((0,F.D)(t,g(e)&&e.default||e,n&&n.default||n));else{let a=d(t,e,r),l=a.length;(0,o.k)(!!l,"No valid elements provided.");for(let t=0;t<l;t++){let r=a[t],o=r instanceof Element?V:_;R.R.has(r)||o(r);let s=R.R.get(r),i={...n};"delay"in i&&"function"==typeof i.delay&&(i.delay=i.delay(t,l)),u.push(...(0,E.w)(s,{...e,transition:i},{}))}}return u}let D=function(t,e,n){let i=[];i=Array.isArray(t)&&t.some(Array.isArray)?function(t,e,n){let r=[];return(function(t,{defaultTransition:e={},...n}={},r,a){let i=e.duration||.3,f=new Map,g=new Map,w={},R=new Map,E=0,O=0,I=0;for(let n=0;n<t.length;n++){let s=t[n];if("string"==typeof s){R.set(s,O);continue}if(!Array.isArray(s)){R.set(s.name,m(O,s.at,E,R));continue}let[f,b,M={}]=s;void 0!==M.at&&(O=m(O,M.at,E,R));let N=0,j=(t,n,r,s=0,f=0)=>{let y=Array.isArray(t)?t:[t],{delay:g=0,times:d=(0,p.Y)(y),type:m="keyframes",repeat:b,repeatType:x,repeatDelay:S=0,...w}=n,{ease:R=e.ease||"easeOut",duration:E}=n,M="function"==typeof g?g(s,f):g,j=y.length,C=(0,u.xD)(m)?m:null==a?void 0:a[m];if(j<=2&&C){let t=100;2===j&&k(y)&&(t=Math.abs(y[1]-y[0]));let e={...w};void 0!==E&&(e.duration=(0,l.w)(E));let n=(0,u.S9)(e,t,C);R=n.ease,E=n.duration}null!=E||(E=i);let V=O+M;1===d.length&&0===d[0]&&(d[1]=1);let _=d.length-y.length;if(_>0&&(0,h.c)(d,_),1===y.length&&y.unshift(null),b){(0,o.k)(b<20,"Repeat count too high, must be less than 20"),E*=b+1;let t=[...y],e=[...d],n=[...R=Array.isArray(R)?[...R]:[R]];for(let r=0;r<b;r++){y.push(...t);for(let u=0;u<t.length;u++)d.push(e[u]+(r+1)),R.push(0===u?"linear":c(n,u-1))}!function(t,e){for(let n=0;n<t.length;n++)t[n]=t[n]/(e+1)}(d,b)}let F=V+E;(function(t,e,n,r,u,a){!function(t,e,n){for(let r=0;r<t.length;r++){let u=t[r];u.at>e&&u.at<n&&((0,v.cl)(t,u),r--)}}(t,u,a);for(let l=0;l<e.length;l++)t.push({value:e[l],at:(0,A.t)(u,a,r[l]),easing:c(n,l)})})(r,y,R,d,V,F),N=Math.max(M+E,N),I=Math.max(F,I)};if((0,y.i)(f))j(b,M,S("default",x(f,g)));else{let t=d(f,b,r,w),e=t.length;for(let n=0;n<e;n++){let r=x(t[n],g);for(let t in b)j(b[t],M&&M[t]?{...M,...M[t]}:{...M},S(t,r),n,e)}}E=O,O+=N}return g.forEach((t,r)=>{for(let u in t){let a=t[u];a.sort(b);let l=[],o=[],i=[];for(let t=0;t<a.length;t++){let{at:e,value:n,easing:r}=a[t];l.push(n),o.push((0,s.Y)(0,I,e)),i.push(r||"easeOut")}0!==o[0]&&(o.unshift(0),l.unshift(l[0]),i.unshift("easeInOut")),1!==o[o.length-1]&&(o.push(1),l.push(null)),f.has(r)||f.set(r,{keyframes:{},transition:{}});let c=f.get(r);c.keyframes[u]=l,c.transition[u]={...e,duration:I,ease:i,times:o,...n}}}),f})(t,e,n,{spring:a.S}).forEach(({keyframes:t,transition:e},n)=>{r.push(...W(n,t,e))}),r}(t,e,void 0):W(t,e,n,r);let f=new u.sP(i);return r&&r.animations.push(f),f}},81906:function(t,e,n){n.d(e,{c:function(){return o}});var r=n(2265),u=n(3078),a=n(45750),l=n(53576);function o(t){let e=(0,l.h)(()=>(0,u.BX)(t)),{isStatic:n}=(0,r.useContext)(a._);if(n){let[,n]=(0,r.useState)(t);(0,r.useEffect)(()=>e.on("change",n),[])}return e}},85318:function(t,e,n){n.d(e,{q:function(){return c}});var r=n(2265),u=n(42840),a=n(45750),l=n(11534),o=n(81906),s=n(23999),i=n(45414);function f(t){return"number"==typeof t?t:parseFloat(t)}function c(t,e={}){let{isStatic:n}=(0,r.useContext)(a._),c=(0,r.useRef)(null),p=(0,o.c)((0,s.i)(t)?f(t.get()):t),h=(0,r.useRef)(p.get()),y=(0,r.useRef)(()=>{}),g=()=>{let t=c.current;t&&0===t.time&&t.sample(i.frameData.delta),d(),c.current=(0,u.y)({keyframes:[p.get(),h.current],velocity:p.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...e,onUpdate:y.current})},d=()=>{c.current&&c.current.stop()};return(0,r.useInsertionEffect)(()=>p.attach((t,e)=>n?e(t):(h.current=t,y.current=e,i.Wi.update(g),p.get()),d),[JSON.stringify(e)]),(0,l.L)(()=>{if((0,s.i)(t))return t.on("change",t=>p.set(f(t)))},[p]),p}},13812:function(t,e,n){n.d(e,{H:function(){return p}});var r=n(88843);let u=t=>t&&"object"==typeof t&&t.mix,a=t=>u(t)?t.mix:void 0;var l=n(81906),o=n(11534),s=n(45414);function i(t,e){let n=(0,l.c)(e()),r=()=>n.set(e());return r(),(0,o.L)(()=>{let e=()=>s.Wi.preRender(r,!1,!0),n=t.map(t=>t.on("change",e));return()=>{n.forEach(t=>t()),(0,s.Pn)(r)}}),n}var f=n(53576),c=n(3078);function p(t,e,n,u){if("function"==typeof t)return function(t){c.S1.current=[],t();let e=i(c.S1.current,t);return c.S1.current=void 0,e}(t);let l="function"==typeof e?e:function(...t){let e=!Array.isArray(t[0]),n=e?0:-1,u=t[0+n],l=t[1+n],o=t[2+n],s=t[3+n],i=(0,r.s)(l,o,{mixer:a(o[0]),...s});return e?i(u):i}(e,n,u);return Array.isArray(t)?h(t,l):h([t],([t])=>l(t))}function h(t,e){let n=(0,f.h)(()=>[]);return i(t,()=>{n.length=0;let r=t.length;for(let e=0;e<r;e++)n[e]=t[e].get();return e(n)})}}}]);