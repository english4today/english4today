(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["course_$courseName"],{

/***/ "../../node_modules/dayjs/dayjs.min.js":
/*!****************************************************************************************!*\
  !*** /home/trucnx/FPT/english/english4today.github.io/node_modules/dayjs/dayjs.min.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},$={s:d,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+d(r,2,"0")+":"+d(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},l={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},y="en",M={};M[y]=l;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=$;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var S=function(){function d(t){this.$L=this.$L||D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v});


/***/ }),

/***/ "./src/components/SkillCard/index.svelte":
/*!***********************************************!*\
  !*** ./src/components/SkillCard/index.svelte ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _db_live__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../db/live */ "./src/db/live.js");
/* harmony import */ var _db_skill_getSkillStats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../db/skill/getSkillStats */ "./src/db/skill/getSkillStats.js");
/* harmony import */ var lluis_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lluis/Icon */ "../lluis/Icon.svelte");
/* harmony import */ var lluis_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lluis/Button */ "../lluis/Button.svelte");
/* src/components/SkillCard/index.svelte generated by Svelte v3.25.0 */







const file = "src/components/SkillCard/index.svelte";

function add_css() {
	var style = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("style");
	style.id = "svelte-srzcqu-style";
	style.textContent = "@keyframes svelte-srzcqu-spinAround{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}.image-set.svelte-srzcqu.svelte-srzcqu{position:relative;overflow:hidden}.image-set.svelte-srzcqu img.svelte-srzcqu{left:15%;top:15%;width:70%;position:absolute}.image-set.svelte-srzcqu img.svelte-srzcqu:first-child{position:absolute;left:0;top:0}.image-set.svelte-srzcqu img.svelte-srzcqu:last-child{position:absolute;left:30%;top:30%}.card-content.svelte-srzcqu.svelte-srzcqu{height:147px}.clamp.svelte-srzcqu.svelte-srzcqu{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.card.svelte-srzcqu.svelte-srzcqu{background:white}.card[data-completed=\"true\"].svelte-srzcqu.svelte-srzcqu{background-color:#b2ca93}.card[data-completed=\"true\"][data-stale=\"true\"].svelte-srzcqu.svelte-srzcqu{background-color:#afb2ab}.card[data-completed=\"true\"][data-stale=\"true\"].svelte-srzcqu>.icon.svelte-srzcqu{position:absolute;right:1em;top:0.5em}.card[data-completed=\"true\"].svelte-srzcqu .title.svelte-srzcqu,.card[data-completed=\"true\"].svelte-srzcqu .media-content.svelte-srzcqu,.card[data-completed=\"true\"].svelte-srzcqu .icon.svelte-srzcqu{color:white}.card[data-completed=\"true\"].svelte-srzcqu .media-left.svelte-srzcqu{mix-blend-mode:screen}.card[data-completed=\"true\"].svelte-srzcqu .media-left .image-set.svelte-srzcqu{filter:saturate(0)}.card[data-completed=\"true\"].svelte-srzcqu .media-left .image-set img.svelte-srzcqu{box-sizing:border-box;border:1px solid rgba(255, 255, 255, 0.3)}.card.svelte-srzcqu>.icon.svelte-srzcqu{position:absolute;right:0.5em;top:0.5em}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3ZlbHRlIiwic291cmNlcyI6WyJpbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25EZXN0cm95LCBvbk1vdW50IH0gZnJvbSBcInN2ZWx0ZVwiXG5cbiAgaW1wb3J0IGxpdmUgZnJvbSBcIi4uLy4uL2RiL2xpdmVcIlxuICBpbXBvcnQgZ2V0U2tpbGxTdGF0cyBmcm9tIFwiLi4vLi4vZGIvc2tpbGwvZ2V0U2tpbGxTdGF0c1wiXG4gIGltcG9ydCBJY29uIGZyb20gXCJsbHVpcy9JY29uXCJcbiAgaW1wb3J0IEJ1dHRvbiBmcm9tIFwibGx1aXMvQnV0dG9uXCJcblxuICBleHBvcnQgbGV0IHRpdGxlXG4gIGV4cG9ydCBsZXQgbGV2ZWxzXG4gIGV4cG9ydCBsZXQgcHJhY3RpY2VIcmVmXG4gIGV4cG9ydCBsZXQgaWRcbiAgZXhwb3J0IGxldCBpbWFnZVNldCA9IFtdXG4gIGV4cG9ydCBsZXQgc3VtbWFyeVxuXG4gIGxldCBjb21wbGV0ZWQgPSBudWxsXG4gIGxldCBzdGFydGVkID0gbnVsbFxuICBsZXQgc3RhbGUgPSBudWxsXG4gIGxldCBwcm9ncmVzcyA9IG51bGxcblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBsaXZlKChkYikgPT5cbiAgICAgIGdldFNraWxsU3RhdHMoZGIsIHsgaWQgfSlcbiAgICAgICAgLnRoZW4oKHN0YXRzKSA9PiB7XG4gICAgICAgICAgY29tcGxldGVkID0gc3RhdHMucHJvZ3Jlc3MgPj0gbGV2ZWxzXG4gICAgICAgICAgcHJvZ3Jlc3MgPSBzdGF0cy5wcm9ncmVzc1xuICAgICAgICAgIHN0YXJ0ZWQgPSBzdGF0cy5zdGFydGVkXG4gICAgICAgICAgc3RhbGUgPSBzdGF0cy5zdGFsZVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pXG4gICAgKVxuICB9KVxuPC9zY3JpcHQ+XG5cbjxkaXZcbiAgY2xhc3M9XCJjYXJkXCJcbiAgZGF0YS10ZXN0PVwic2tpbGwgY2FyZFwiXG4gIGRhdGEtc3RhcnRlZD1cIntzdGFydGVkfVwiXG4gIGRhdGEtY29tcGxldGVkPVwie2NvbXBsZXRlZH1cIlxuICBkYXRhLXN0YWxlPVwie3N0YWxlfVwiPlxuICB7I2lmIGNvbXBsZXRlZH1cbiAgICB7I2lmIHN0YWxlfVxuICAgICAgPHNwYW4gY2xhc3M9XCJpY29uXCI+XG4gICAgICAgIDxJY29uIGljb249XCJkdW1iYmVsbFwiIHNpemU9XCJsYXJnZVwiIC8+XG4gICAgICA8L3NwYW4+XG4gICAgezplbHNlfVxuICAgICAgPHNwYW4gY2xhc3M9XCJpY29uXCI+XG4gICAgICAgIDxJY29uIGljb249XCJjaGVjay1zcXVhcmVcIiBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgPC9zcGFuPlxuICAgIHsvaWZ9XG4gIHsvaWZ9XG4gIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWVkaWFcIj5cbiAgICAgIHsjaWYgaW1hZ2VTZXQgJiYgaW1hZ2VTZXQubGVuZ3RofVxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtbGVmdFwiPlxuICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJpbWFnZSBpbWFnZS1zZXQgaXMtOTZ4OTZcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwie2BpbWFnZXMvJHtpbWFnZVNldFswXX1fdGluaWVyLmpwZ2B9XCIgYWx0PVwiXCIgLz5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwie2BpbWFnZXMvJHtpbWFnZVNldFsxXX1fdGluaWVyLmpwZ2B9XCIgYWx0PVwiXCIgLz5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwie2BpbWFnZXMvJHtpbWFnZVNldFsyXX1fdGlueS5qcGdgfVwiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgey9pZn1cbiAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1jb250ZW50XCI+XG4gICAgICAgIDxwIGNsYXNzPVwidGl0bGUgaXMtNFwiPnt0aXRsZX08L3A+XG4gICAgICAgIHsjaWYgY29tcGxldGVkIHx8ICFzdGFydGVkfVxuICAgICAgICAgIDxwIGNsYXNzPVwiaXMtNiBjbGFtcFwiPkxlYXJuOiB7c3VtbWFyeS5qb2luKCcsICcpfTwvcD5cbiAgICAgICAgey9pZn1cbiAgICAgICAgeyNpZiAhY29tcGxldGVkICYmIHN0YXJ0ZWR9XG4gICAgICAgICAgPHByb2dyZXNzXG4gICAgICAgICAgICBjbGFzcz1cInByb2dyZXNzXCJcbiAgICAgICAgICAgIHZhbHVlPVwie3Byb2dyZXNzfVwiXG4gICAgICAgICAgICBtYXg9XCJ7bGV2ZWxzfVwiPjwvcHJvZ3Jlc3M+XG4gICAgICAgIHsvaWZ9XG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGZvb3RlciBjbGFzcz1cImNhcmQtZm9vdGVyXCI+XG4gICAgPGRpdiBocmVmPVwie3ByYWN0aWNlSHJlZn1cIiBjbGFzcz1cImNhcmQtZm9vdGVyLWl0ZW1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgIHsjaWYgY29tcGxldGVkfVxuICAgICAgICAgIDxCdXR0b24gcHJpbWFyeSBocmVmPVwie3ByYWN0aWNlSHJlZn1cIj5QcmFjdGljZSB7dGl0bGV9PC9CdXR0b24+XG4gICAgICAgIHs6ZWxzZSBpZiBzdGFydGVkfVxuICAgICAgICAgIDxCdXR0b24gcHJpbWFyeSBocmVmPVwie3ByYWN0aWNlSHJlZn1cIj5Db250aW51ZSB7dGl0bGV9PC9CdXR0b24+XG4gICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICA8QnV0dG9uIHByaW1hcnkgaHJlZj1cIntwcmFjdGljZUhyZWZ9XCI+TGVhcm4ge3RpdGxlfTwvQnV0dG9uPlxuICAgICAgICB7L2lmfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZm9vdGVyPlxuPC9kaXY+XG5cbjxzdHlsZT5Aa2V5ZnJhbWVzIHNwaW5Bcm91bmQge1xuICBmcm9tIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICB0byB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTsgfSB9XG5cbi5pbWFnZS1zZXQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47IH1cblxuLmltYWdlLXNldCBpbWcge1xuICBsZWZ0OiAxNSU7XG4gIHRvcDogMTUlO1xuICB3aWR0aDogNzAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7IH1cblxuLmltYWdlLXNldCBpbWc6Zmlyc3QtY2hpbGQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDsgfVxuXG4uaW1hZ2Utc2V0IGltZzpsYXN0LWNoaWxkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAzMCU7XG4gIHRvcDogMzAlOyB9XG5cbi5jYXJkLWNvbnRlbnQge1xuICBoZWlnaHQ6IDE0N3B4OyB9XG5cbi5jbGFtcCB7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG4gIG92ZXJmbG93OiBoaWRkZW47IH1cblxuLmNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTsgfVxuICAuY2FyZFtkYXRhLWNvbXBsZXRlZD1cInRydWVcIl0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNiMmNhOTM7IH1cbiAgICAuY2FyZFtkYXRhLWNvbXBsZXRlZD1cInRydWVcIl1bZGF0YS1zdGFsZT1cInRydWVcIl0ge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2FmYjJhYjsgfVxuICAgICAgLmNhcmRbZGF0YS1jb21wbGV0ZWQ9XCJ0cnVlXCJdW2RhdGEtc3RhbGU9XCJ0cnVlXCJdID4gLmljb24ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAxZW07XG4gICAgICAgIHRvcDogMC41ZW07IH1cbiAgICAuY2FyZFtkYXRhLWNvbXBsZXRlZD1cInRydWVcIl0gLnRpdGxlLFxuICAgIC5jYXJkW2RhdGEtY29tcGxldGVkPVwidHJ1ZVwiXSAubWVkaWEtY29udGVudCxcbiAgICAuY2FyZFtkYXRhLWNvbXBsZXRlZD1cInRydWVcIl0gLmljb24ge1xuICAgICAgY29sb3I6IHdoaXRlOyB9XG4gICAgLmNhcmRbZGF0YS1jb21wbGV0ZWQ9XCJ0cnVlXCJdIC5tZWRpYS1sZWZ0IHtcbiAgICAgIG1peC1ibGVuZC1tb2RlOiBzY3JlZW47IH1cbiAgICAgIC5jYXJkW2RhdGEtY29tcGxldGVkPVwidHJ1ZVwiXSAubWVkaWEtbGVmdCAuaW1hZ2Utc2V0IHtcbiAgICAgICAgZmlsdGVyOiBzYXR1cmF0ZSgwKTsgfVxuICAgICAgICAuY2FyZFtkYXRhLWNvbXBsZXRlZD1cInRydWVcIl0gLm1lZGlhLWxlZnQgLmltYWdlLXNldCBpbWcge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpOyB9XG4gIC5jYXJkID4gLmljb24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMC41ZW07XG4gICAgdG9wOiAwLjVlbTsgfVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0Rk8sV0FBVyx3QkFBVyxDQUFDLEFBQzVCLElBQUksQUFBQyxDQUFDLEFBQ0osU0FBUyxDQUFFLE9BQU8sSUFBSSxDQUFDLEFBQUUsQ0FBQyxBQUM1QixFQUFFLEFBQUMsQ0FBQyxBQUNGLFNBQVMsQ0FBRSxPQUFPLE1BQU0sQ0FBQyxBQUFFLENBQUMsQUFBQyxDQUFDLEFBRWxDLFVBQVUsNEJBQUMsQ0FBQyxBQUNWLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLFFBQVEsQ0FBRSxNQUFNLEFBQUUsQ0FBQyxBQUVyQix3QkFBVSxDQUFDLEdBQUcsY0FBQyxDQUFDLEFBQ2QsSUFBSSxDQUFFLEdBQUcsQ0FDVCxHQUFHLENBQUUsR0FBRyxDQUNSLEtBQUssQ0FBRSxHQUFHLENBQ1YsUUFBUSxDQUFFLFFBQVEsQUFBRSxDQUFDLEFBRXZCLHdCQUFVLENBQUMsaUJBQUcsWUFBWSxBQUFDLENBQUMsQUFDMUIsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsSUFBSSxDQUFFLENBQUMsQ0FDUCxHQUFHLENBQUUsQ0FBQyxBQUFFLENBQUMsQUFFWCx3QkFBVSxDQUFDLGlCQUFHLFdBQVcsQUFBQyxDQUFDLEFBQ3pCLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLElBQUksQ0FBRSxHQUFHLENBQ1QsR0FBRyxDQUFFLEdBQUcsQUFBRSxDQUFDLEFBRWIsYUFBYSw0QkFBQyxDQUFDLEFBQ2IsTUFBTSxDQUFFLEtBQUssQUFBRSxDQUFDLEFBRWxCLE1BQU0sNEJBQUMsQ0FBQyxBQUNOLE9BQU8sQ0FBRSxXQUFXLENBQ3BCLGtCQUFrQixDQUFFLFFBQVEsQ0FDNUIsa0JBQWtCLENBQUUsQ0FBQyxDQUNyQixRQUFRLENBQUUsTUFBTSxBQUFFLENBQUMsQUFFckIsS0FBSyw0QkFBQyxDQUFDLEFBQ0wsVUFBVSxDQUFFLEtBQUssQUFBRSxDQUFDLEFBQ3BCLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLDRCQUFDLENBQUMsQUFDNUIsZ0JBQWdCLENBQUUsT0FBTyxBQUFFLENBQUMsQUFDNUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLDRCQUFDLENBQUMsQUFDL0MsZ0JBQWdCLENBQUUsT0FBTyxBQUFFLENBQUMsQUFDNUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxlQUFDLENBQUcsS0FBSyxjQUFDLENBQUMsQUFDdkQsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsS0FBSyxDQUFFLEdBQUcsQ0FDVixHQUFHLENBQUUsS0FBSyxBQUFFLENBQUMsQUFDakIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLGVBQUMsQ0FBQyxvQkFBTSxDQUNuQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sZUFBQyxDQUFDLDRCQUFjLENBQzNDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxlQUFDLENBQUMsS0FBSyxjQUFDLENBQUMsQUFDbEMsS0FBSyxDQUFFLEtBQUssQUFBRSxDQUFDLEFBQ2pCLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxlQUFDLENBQUMsV0FBVyxjQUFDLENBQUMsQUFDeEMsY0FBYyxDQUFFLE1BQU0sQUFBRSxDQUFDLEFBQ3pCLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxlQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsY0FBQyxDQUFDLEFBQ25ELE1BQU0sQ0FBRSxTQUFTLENBQUMsQ0FBQyxBQUFFLENBQUMsQUFDdEIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLGVBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBQyxDQUFDLEFBQ3ZELFVBQVUsQ0FBRSxVQUFVLENBQ3RCLE1BQU0sQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEFBQUUsQ0FBQyxBQUNyRCxtQkFBSyxDQUFHLEtBQUssY0FBQyxDQUFDLEFBQ2IsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsS0FBSyxDQUFFLEtBQUssQ0FDWixHQUFHLENBQUUsS0FBSyxBQUFFLENBQUMifQ== */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

// (41:2) {#if completed}
function create_if_block_5(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_6, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*stale*/ ctx[7]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index !== previous_block_index) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(41:2) {#if completed}",
		ctx
	});

	return block;
}

// (46:4) {:else}
function create_else_block_1(ctx) {
	let span;
	let icon;
	let current;

	icon = new lluis_Icon__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: { icon: "check-square", size: "large" },
			$$inline: true
		});

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SPAN", { class: true });
			var span_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(icon.$$.fragment, span_nodes);
			span_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", "icon svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 46, 6, 999);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, span, null);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(46:4) {:else}",
		ctx
	});

	return block;
}

// (42:4) {#if stale}
function create_if_block_6(ctx) {
	let span;
	let icon;
	let current;

	icon = new lluis_Icon__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: { icon: "dumbbell", size: "large" },
			$$inline: true
		});

	const block = {
		c: function create() {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SPAN", { class: true });
			var span_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(icon.$$.fragment, span_nodes);
			span_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", "icon svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 42, 6, 901);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, span, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(icon, span, null);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(icon);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(42:4) {#if stale}",
		ctx
	});

	return block;
}

// (54:6) {#if imageSet && imageSet.length}
function create_if_block_4(ctx) {
	let div;
	let figure;
	let img0;
	let img0_src_value;
	let t0;
	let img1;
	let img1_src_value;
	let t1;
	let img2;
	let img2_src_value;

	const block = {
		c: function create() {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			figure = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("figure");
			img0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			img1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			img2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			this.h();
		},
		l: function claim(nodes) {
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			figure = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "FIGURE", { class: true });
			var figure_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(figure);
			img0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(figure_nodes, "IMG", { src: true, alt: true, class: true });
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(figure_nodes);
			img1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(figure_nodes, "IMG", { src: true, alt: true, class: true });
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(figure_nodes);
			img2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(figure_nodes, "IMG", { src: true, alt: true, class: true });
			figure_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			if (img0.src !== (img0_src_value = `images/${/*imageSet*/ ctx[3][0]}_tinier.jpg`)) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img0, "src", img0_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img0, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img0, "class", "svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img0, file, 56, 12, 1291);
			if (img1.src !== (img1_src_value = `images/${/*imageSet*/ ctx[3][1]}_tinier.jpg`)) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img1, "src", img1_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img1, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img1, "class", "svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img1, file, 57, 12, 1361);
			if (img2.src !== (img2_src_value = `images/${/*imageSet*/ ctx[3][2]}_tiny.jpg`)) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img2, "src", img2_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img2, "alt", "");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img2, "class", "svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img2, file, 58, 12, 1431);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(figure, "class", "image image-set is-96x96 svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(figure, file, 55, 10, 1237);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "media-left svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 54, 8, 1202);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, figure);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(figure, img0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(figure, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(figure, img1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(figure, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(figure, img2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*imageSet*/ 8 && img0.src !== (img0_src_value = `images/${/*imageSet*/ ctx[3][0]}_tinier.jpg`)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img0, "src", img0_src_value);
			}

			if (dirty & /*imageSet*/ 8 && img1.src !== (img1_src_value = `images/${/*imageSet*/ ctx[3][1]}_tinier.jpg`)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img1, "src", img1_src_value);
			}

			if (dirty & /*imageSet*/ 8 && img2.src !== (img2_src_value = `images/${/*imageSet*/ ctx[3][2]}_tiny.jpg`)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img2, "src", img2_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(54:6) {#if imageSet && imageSet.length}",
		ctx
	});

	return block;
}

// (65:8) {#if completed || !started}
function create_if_block_3(ctx) {
	let p;
	let t0;
	let t1_value = /*summary*/ ctx[4].join(", ") + "";
	let t1;

	const block = {
		c: function create() {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Learn: ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "P", { class: true });
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, "Learn: ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, t1_value);
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(p, "class", "is-6 clamp svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 65, 10, 1656);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*summary*/ 16 && t1_value !== (t1_value = /*summary*/ ctx[4].join(", ") + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(p);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(65:8) {#if completed || !started}",
		ctx
	});

	return block;
}

// (68:8) {#if !completed && started}
function create_if_block_2(ctx) {
	let progress_1;

	const block = {
		c: function create() {
			progress_1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("progress");
			this.h();
		},
		l: function claim(nodes) {
			progress_1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "PROGRESS", { class: true, value: true, max: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(progress_1).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(progress_1, "class", "progress");
			progress_1.value = /*progress*/ ctx[8];
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(progress_1, "max", /*levels*/ ctx[1]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(progress_1, file, 68, 10, 1770);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, progress_1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*progress*/ 256) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["prop_dev"])(progress_1, "value", /*progress*/ ctx[8]);
			}

			if (dirty & /*levels*/ 2) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(progress_1, "max", /*levels*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(progress_1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(68:8) {#if !completed && started}",
		ctx
	});

	return block;
}

// (85:8) {:else}
function create_else_block(ctx) {
	let button;
	let current;

	button = new lluis_Button__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				primary: true,
				href: /*practiceHref*/ ctx[2],
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(button.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const button_changes = {};
			if (dirty & /*practiceHref*/ 4) button_changes.href = /*practiceHref*/ ctx[2];

			if (dirty & /*$$scope, title*/ 1025) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(85:8) {:else}",
		ctx
	});

	return block;
}

// (83:26) 
function create_if_block_1(ctx) {
	let button;
	let current;

	button = new lluis_Button__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				primary: true,
				href: /*practiceHref*/ ctx[2],
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(button.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const button_changes = {};
			if (dirty & /*practiceHref*/ 4) button_changes.href = /*practiceHref*/ ctx[2];

			if (dirty & /*$$scope, title*/ 1025) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(83:26) ",
		ctx
	});

	return block;
}

// (81:8) {#if completed}
function create_if_block(ctx) {
	let button;
	let current;

	button = new lluis_Button__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				primary: true,
				href: /*practiceHref*/ ctx[2],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(button.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(button.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(button, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const button_changes = {};
			if (dirty & /*practiceHref*/ 4) button_changes.href = /*practiceHref*/ ctx[2];

			if (dirty & /*$$scope, title*/ 1025) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(button, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(81:8) {#if completed}",
		ctx
	});

	return block;
}

// (86:10) <Button primary href="{practiceHref}">
function create_default_slot_2(ctx) {
	let t0;
	let t1;

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Learn ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*title*/ ctx[0]);
		},
		l: function claim(nodes) {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "Learn ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, /*title*/ ctx[0]);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t1, /*title*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(86:10) <Button primary href=\\\"{practiceHref}\\\">",
		ctx
	});

	return block;
}

// (84:10) <Button primary href="{practiceHref}">
function create_default_slot_1(ctx) {
	let t0;
	let t1;

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Continue ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*title*/ ctx[0]);
		},
		l: function claim(nodes) {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "Continue ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, /*title*/ ctx[0]);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t1, /*title*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(84:10) <Button primary href=\\\"{practiceHref}\\\">",
		ctx
	});

	return block;
}

// (82:10) <Button primary href="{practiceHref}">
function create_default_slot(ctx) {
	let t0;
	let t1;

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Practice ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*title*/ ctx[0]);
		},
		l: function claim(nodes) {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "Practice ");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, /*title*/ ctx[0]);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t1, /*title*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(82:10) <Button primary href=\\\"{practiceHref}\\\">",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div5;
	let t0;
	let div2;
	let div1;
	let t1;
	let div0;
	let p;
	let t2;
	let t3;
	let t4;
	let t5;
	let footer;
	let div4;
	let div3;
	let current_block_type_index;
	let if_block4;
	let current;
	let if_block0 = /*completed*/ ctx[5] && create_if_block_5(ctx);
	let if_block1 = /*imageSet*/ ctx[3] && /*imageSet*/ ctx[3].length && create_if_block_4(ctx);
	let if_block2 = (/*completed*/ ctx[5] || !/*started*/ ctx[6]) && create_if_block_3(ctx);
	let if_block3 = !/*completed*/ ctx[5] && /*started*/ ctx[6] && create_if_block_2(ctx);
	const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*completed*/ ctx[5]) return 0;
		if (/*started*/ ctx[6]) return 1;
		return 2;
	}

	current_block_type_index = select_block_type_1(ctx, -1);
	if_block4 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block0) if_block0.c();
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if (if_block1) if_block1.c();
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*title*/ ctx[0]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block2) if_block2.c();
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block3) if_block3.c();
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("footer");
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if_block4.c();
			this.h();
		},
		l: function claim(nodes) {
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", {
				class: true,
				"data-test": true,
				"data-started": true,
				"data-completed": true,
				"data-stale": true
			});

			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			if (if_block0) if_block0.l(div5_nodes);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			if (if_block1) if_block1.l(div1_nodes);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "P", { class: true });
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, /*title*/ ctx[0]);
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			if (if_block2) if_block2.l(div0_nodes);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			if (if_block3) if_block3.l(div0_nodes);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div5_nodes);
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "FOOTER", { class: true });
			var footer_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(footer);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(footer_nodes, "DIV", { href: true, class: true });
			var div4_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div4_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			if_block4.l(div3_nodes);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div4_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			footer_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(p, "class", "title is-4 svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 63, 8, 1576);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "media-content svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 62, 6, 1540);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "media");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 52, 4, 1134);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "card-content svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 51, 2, 1103);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "button-container");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 79, 6, 2021);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "href", /*practiceHref*/ ctx[2]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "card-footer-item");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 78, 4, 1962);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(footer, "class", "card-footer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(footer, file, 77, 2, 1929);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "card svelte-srzcqu");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "data-test", "skill card");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "data-started", /*started*/ ctx[6]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "data-completed", /*completed*/ ctx[5]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "data-stale", /*stale*/ ctx[7]);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 34, 0, 734);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, div5, anchor);
			if (if_block0) if_block0.m(div5, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div2, div1);
			if (if_block1) if_block1.m(div1, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t3);
			if (if_block2) if_block2.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div0, t4);
			if (if_block3) if_block3.m(div0, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div5, footer);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(footer, div4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div4, div3);
			if_blocks[current_block_type_index].m(div3, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*completed*/ ctx[5]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*completed*/ 32) {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0, 1);
					if_block0.m(div5, t0);
				}
			} else if (if_block0) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			if (/*imageSet*/ ctx[3] && /*imageSet*/ ctx[3].length) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_4(ctx);
					if_block1.c();
					if_block1.m(div1, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*title*/ 1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t2, /*title*/ ctx[0]);

			if (/*completed*/ ctx[5] || !/*started*/ ctx[6]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_3(ctx);
					if_block2.c();
					if_block2.m(div0, t4);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!/*completed*/ ctx[5] && /*started*/ ctx[6]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_2(ctx);
					if_block3.c();
					if_block3.m(div0, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				if_block4 = if_blocks[current_block_type_index];

				if (!if_block4) {
					if_block4 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block4.c();
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block4, 1);
				if_block4.m(div3, null);
			}

			if (!current || dirty & /*practiceHref*/ 4) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "href", /*practiceHref*/ ctx[2]);
			}

			if (!current || dirty & /*started*/ 64) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "data-started", /*started*/ ctx[6]);
			}

			if (!current || dirty & /*completed*/ 32) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "data-completed", /*completed*/ ctx[5]);
			}

			if (!current || dirty & /*stale*/ 128) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "data-stale", /*stale*/ ctx[7]);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block4);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block4);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div5);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if_blocks[current_block_type_index].d();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("SkillCard", slots, []);
	let { title } = $$props;
	let { levels } = $$props;
	let { practiceHref } = $$props;
	let { id } = $$props;
	let { imageSet = [] } = $$props;
	let { summary } = $$props;
	let completed = null;
	let started = null;
	let stale = null;
	let progress = null;

	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"])(() => {
		Object(_db_live__WEBPACK_IMPORTED_MODULE_2__["default"])(db => Object(_db_skill_getSkillStats__WEBPACK_IMPORTED_MODULE_3__["default"])(db, { id }).then(stats => {
			$$invalidate(5, completed = stats.progress >= levels);
			$$invalidate(8, progress = stats.progress);
			$$invalidate(6, started = stats.started);
			$$invalidate(7, stale = stats.stale);
		}).catch(() => {
			
		}));
	});

	const writable_props = ["title", "levels", "practiceHref", "id", "imageSet", "summary"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SkillCard> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("levels" in $$props) $$invalidate(1, levels = $$props.levels);
		if ("practiceHref" in $$props) $$invalidate(2, practiceHref = $$props.practiceHref);
		if ("id" in $$props) $$invalidate(9, id = $$props.id);
		if ("imageSet" in $$props) $$invalidate(3, imageSet = $$props.imageSet);
		if ("summary" in $$props) $$invalidate(4, summary = $$props.summary);
	};

	$$self.$capture_state = () => ({
		onDestroy: svelte__WEBPACK_IMPORTED_MODULE_1__["onDestroy"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__["onMount"],
		live: _db_live__WEBPACK_IMPORTED_MODULE_2__["default"],
		getSkillStats: _db_skill_getSkillStats__WEBPACK_IMPORTED_MODULE_3__["default"],
		Icon: lluis_Icon__WEBPACK_IMPORTED_MODULE_4__["default"],
		Button: lluis_Button__WEBPACK_IMPORTED_MODULE_5__["default"],
		title,
		levels,
		practiceHref,
		id,
		imageSet,
		summary,
		completed,
		started,
		stale,
		progress
	});

	$$self.$inject_state = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("levels" in $$props) $$invalidate(1, levels = $$props.levels);
		if ("practiceHref" in $$props) $$invalidate(2, practiceHref = $$props.practiceHref);
		if ("id" in $$props) $$invalidate(9, id = $$props.id);
		if ("imageSet" in $$props) $$invalidate(3, imageSet = $$props.imageSet);
		if ("summary" in $$props) $$invalidate(4, summary = $$props.summary);
		if ("completed" in $$props) $$invalidate(5, completed = $$props.completed);
		if ("started" in $$props) $$invalidate(6, started = $$props.started);
		if ("stale" in $$props) $$invalidate(7, stale = $$props.stale);
		if ("progress" in $$props) $$invalidate(8, progress = $$props.progress);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		title,
		levels,
		practiceHref,
		imageSet,
		summary,
		completed,
		started,
		stale,
		progress,
		id
	];
}

class SkillCard extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-srzcqu-style")) add_css();

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {
			title: 0,
			levels: 1,
			practiceHref: 2,
			id: 9,
			imageSet: 3,
			summary: 4
		});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "SkillCard",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
			console.warn("<SkillCard> was created without expected prop 'title'");
		}

		if (/*levels*/ ctx[1] === undefined && !("levels" in props)) {
			console.warn("<SkillCard> was created without expected prop 'levels'");
		}

		if (/*practiceHref*/ ctx[2] === undefined && !("practiceHref" in props)) {
			console.warn("<SkillCard> was created without expected prop 'practiceHref'");
		}

		if (/*id*/ ctx[9] === undefined && !("id" in props)) {
			console.warn("<SkillCard> was created without expected prop 'id'");
		}

		if (/*summary*/ ctx[4] === undefined && !("summary" in props)) {
			console.warn("<SkillCard> was created without expected prop 'summary'");
		}
	}

	get title() {
		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get levels() {
		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set levels(value) {
		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get practiceHref() {
		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set practiceHref(value) {
		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get imageSet() {
		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set imageSet(value) {
		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get summary() {
		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set summary(value) {
		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* harmony default export */ __webpack_exports__["default"] = (SkillCard);

/***/ }),

/***/ "./src/courses lazy recursive ^\\.\\/.*\\/courseData\\.json$":
/*!**********************************************************************!*\
  !*** ./src/courses lazy ^\.\/.*\/courseData\.json$ namespace object ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./english-from-vietnamese/courseData.json": [
		"./src/courses/english-from-vietnamese/courseData.json",
		9
	],
	"./spanish-from-english/courseData.json": [
		"./src/courses/spanish-from-english/courseData.json",
		25
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__.t(id, 3);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/courses lazy recursive ^\\.\\/.*\\/courseData\\.json$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/db/db.js":
/*!**********************!*\
  !*** ./src/db/db.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _getUserDbName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getUserDbName */ "./src/db/getUserDbName.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ "../../node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);




let db
let remoteDB
let syncHandler

const createLocalPouchDb = (dbName) => {
    const PouchDB =
    process.env.JEST_WORKER_ID !== undefined
        ? __webpack_require__(/*! pouchdb */ "../../node_modules/pouchdb/lib/index-browser.es.js")
        : __webpack_require__(/*! pouchdb */ "../../node_modules/pouchdb/lib/index-browser.es.js").default
    const newDb = new PouchDB(dbName).setMaxListeners(
        _settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.maxNumberOfListeners
    )

    newDb
        .changes({
            since: "now",
            live: true,
            include_docs: true,
        })
        .on("change", () => {
            if (process.env.JEST_WORKER_ID !== undefined) {
                return
            }
            const authStore = __webpack_require__(/*! ../auth */ "./src/auth.js").default
            authStore.update((value) => ({
                ...value,
                dbUpdatedAt: Date.now(),
            }))
        })

    return newDb
}

if (true) {
    const authStore = __webpack_require__(/*! ../auth */ "./src/auth.js").default
    const PouchDB = __webpack_require__(/*! pouchdb */ "../../node_modules/pouchdb/lib/index-browser.es.js").default

    // Connect to remote database
    remoteDB = new PouchDB(
        `${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/${js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get("loginDb")}`,
        { skip_setup: true, live: true }
    )

    // Connect to local database
    db = createLocalPouchDb(_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.local)
    window._DB = db

    // Detect fake user session
    if (js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get("loginDb") === Object(_getUserDbName__WEBPACK_IMPORTED_MODULE_1__["default"])("---fakeUser")) {
        authStore.update((value) => ({
            ...value,
            user: { name: "---fakeUser" },
            online: true,
        }))
    }

    // Detect existing user session
    if (js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get("loginDb") && _settings__WEBPACK_IMPORTED_MODULE_0__["default"].features.authEnabled) {
        fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/_session`, { credentials: "include" })
            .then((data) => data.json())
            .then((user) => {
                if (user.userCtx.name === null) {
                    return
                }
                authStore.update((value) => ({
                    ...value,
                    user: { name: user.userCtx.name },
                }))
                startSync()
            })
    } else {
    // Without a sessios, there is no sync
        authStore.update((value) => ({
            ...value,
            online: false,
        }))
    }

    // Fake login for testing purposes
    window._fakeLogin = () => {
        js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.set("loginDb", Object(_getUserDbName__WEBPACK_IMPORTED_MODULE_1__["default"])("---fakeUser"), {
            expires: _settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.auth.expireDays,
        })
        window.location.href = "/course/spanish-from-english/"
    }

    // Add login function
    window._Login = async (username, password) => {
        if (window._test_credentials_correct === false) {
            throw new Error("Incorrect username or password")
        }

        if (window._test_credentials_correct === true) {
            return window._fakeLogin()
        }

        const response = await (
            await fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/_session`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
        ).json()

        if (response.error) {
            if (response.error === "unauthorized") {
                throw new Error("Username or password is incorrect")
            }
            throw new Error("Couldn't log in. Please try again later")
        }

        authStore.update((value) => ({
            ...value,
            online: null,
        }))
        js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.set("loginDb", Object(_getUserDbName__WEBPACK_IMPORTED_MODULE_1__["default"])(username), {
            expires: _settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.auth.expireDays,
        })
        window.location.reload(false)
        window.location.href = "/course/spanish-from-english/"
    }

    // Logout
    window._Logout = async () => {
        try {
            if (syncHandler) {
                await syncHandler.cancel()
                await fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.remote}/_session`, {
                    method: "delete",
                })
            }
        } finally {
            js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.remove("loginDb")
            authStore.update((value) => ({
                ...value,
                user: null,
                online: null,
            }))
            await db.destroy()
            window.location.reload(false)
        }
    }

    // Keep databases in sync
    const startSync = () => {
        syncHandler = db
            .sync(remoteDB)
            .on("complete", function () {
                authStore.update((value) => ({ ...value, online: true }))
            })
            .on("error", function () {
                authStore.update((value) => ({ ...value, online: false }))
            })
    }
}

if (process.env.JEST_WORKER_ID !== undefined) {
    // This is a test database for Jest tests that can reset itself
    db = createLocalPouchDb(_settings__WEBPACK_IMPORTED_MODULE_0__["default"].database.local)
    db.__reset = async () => {
        const allDocs = await db.allDocs()
        await Promise.all(
            allDocs.rows.map(function (row) {
                return db.remove(row.id, row.value.rev)
            })
        )
    }
}

/* harmony default export */ __webpack_exports__["default"] = (db);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "./src/db/getUserDbName.js":
/*!*********************************!*\
  !*** ./src/db/getUserDbName.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const hashUsername = (username) =>
    username
        .split("")
        .map((c) => c.charCodeAt(0).toString(16))
        .join("")

/* harmony default export */ __webpack_exports__["default"] = ((username) => `userdb-${hashUsername(username)}`);


/***/ }),

/***/ "./src/db/live.js":
/*!************************!*\
  !*** ./src/db/live.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ "./src/db/db.js");


/* harmony default export */ __webpack_exports__["default"] = ((listener) => {
    listener(_db__WEBPACK_IMPORTED_MODULE_0__["default"])
    if ( true && process.env.JEST_WORKER_ID === undefined) {
        const authStore = __webpack_require__(/*! ../auth */ "./src/auth.js").default
        authStore.subscribe(() => listener(_db__WEBPACK_IMPORTED_MODULE_0__["default"]))
    }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "./src/db/skill/_logic.js":
/*!********************************!*\
  !*** ./src/db/skill/_logic.js ***!
  \********************************/
/*! exports provided: daysUntilNextPractice, getLastPractice, wouldBeStale, isStale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daysUntilNextPractice", function() { return daysUntilNextPractice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLastPractice", function() { return getLastPractice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wouldBeStale", function() { return wouldBeStale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStale", function() { return isStale; });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "../../node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);


const fib = n => (n > 1 ? fib(n - 1) + fib(n - 2) : 1)

const daysUntilNextPractice = ({ practicesSoFar }) => fib(practicesSoFar)

const getLastPractice = practices =>
    [...practices].sort((a, b) => (dayjs__WEBPACK_IMPORTED_MODULE_0___default()(a.at).isAfter(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(b.at)) ? -1 : 1))[0]
        .at

const wouldBeStale = ({ lastPractice, practicesSoFar }) => {
    const shouldBeStaleAt = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(lastPractice).add(
        daysUntilNextPractice({ practicesSoFar }),
        "day"
    )

    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()().isAfter(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(shouldBeStaleAt).subtract(1, "second")))
}

const isStale = ({ practices }) =>
    wouldBeStale({
        practicesSoFar: practices.length,
        lastPractice: getLastPractice(practices)
    })


/***/ }),

/***/ "./src/db/skill/getSkillStats.js":
/*!***************************************!*\
  !*** ./src/db/skill/getSkillStats.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_logic */ "./src/db/skill/_logic.js");


/* harmony default export */ __webpack_exports__["default"] = (async (db, { id }) => {
    if (!db) return null

    try {
        const { practiced } = await db.get(`skills/${id}`)
        const validPractices = practiced.filter(
            ({ correct }) => correct === undefined || correct > 0
        )

        if (validPractices.length === 0) {
            return { started: false, stale: null, progress: 0 }
        }

        const progress = validPractices.reduce(
            (acc, { correct, skipped }) =>
                acc + (correct || 1) / ((correct || 1) + (skipped || 0)),
            0
        )

        return {
            started: validPractices.length >= 1,
            stale: Object(_logic__WEBPACK_IMPORTED_MODULE_0__["isStale"])({ practices: practiced }),
            progress,
        }
    } catch {
        return { started: false, stale: null, progress: 0 }
    }
});


/***/ }),

/***/ "./src/routes/course/[courseName]/index.svelte":
/*!*****************************************************!*\
  !*** ./src/routes/course/[courseName]/index.svelte ***!
  \*****************************************************/
/*! exports provided: default, preload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preload", function() { return preload; });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _components_SkillCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/SkillCard */ "./src/components/SkillCard/index.svelte");
/* harmony import */ var _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/NavBar.svelte */ "./src/components/NavBar.svelte");
/* harmony import */ var lluis_Column_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lluis/Column.svelte */ "../lluis/Column.svelte");
/* harmony import */ var lluis_Columns_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lluis/Columns.svelte */ "../lluis/Columns.svelte");
/* src/routes/course/[courseName]/index.svelte generated by Svelte v3.25.0 */






const file = "src/routes/course/[courseName]/index.svelte";

function add_css() {
	var style = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("style");
	style.id = "svelte-1rsvn2t-style";
	style.textContent = "@keyframes svelte-1rsvn2t-spinAround{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}.container.svelte-1rsvn2t{padding-right:20px;padding-left:20px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3ZlbHRlIiwic291cmNlcyI6WyJpbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHBhZ2UsIHNlc3Npb24pIHtcbiAgICBjb25zdCB7IGNvdXJzZU5hbWUgfSA9IHBhZ2UucGFyYW1zXG4gICAgY29uc3QgeyBtb2R1bGVzLCBsYW5ndWFnZU5hbWUgfSA9IGF3YWl0IGltcG9ydChcbiAgICAgIGAuLi8uLi8uLi9jb3Vyc2VzLyR7Y291cnNlTmFtZX0vY291cnNlRGF0YS5qc29uYFxuICAgIClcblxuICAgIHJldHVybiB7IGNvdXJzZU5hbWUsIG1vZHVsZXMsIGxhbmd1YWdlTmFtZSB9XG4gIH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgU2tpbGxDYXJkIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL1NraWxsQ2FyZFwiXG4gIGltcG9ydCBOYXZCYXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvTmF2QmFyLnN2ZWx0ZVwiXG4gIGltcG9ydCBDb2x1bW4gZnJvbSBcImxsdWlzL0NvbHVtbi5zdmVsdGVcIlxuICBpbXBvcnQgQ29sdW1ucyBmcm9tIFwibGx1aXMvQ29sdW1ucy5zdmVsdGVcIlxuXG4gIGV4cG9ydCBsZXQgY291cnNlTmFtZSA9IG51bGxcbiAgZXhwb3J0IGxldCBtb2R1bGVzID0gbnVsbFxuICBleHBvcnQgbGV0IGxhbmd1YWdlTmFtZSA9IG51bGxcbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmhlYWQ+XG4gIDx0aXRsZT5MaWJyZUxpbmdvIC0gbGVhcm4ge2xhbmd1YWdlTmFtZX0gZm9yIGZyZWU8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPE5hdkJhciBkYXJrIGhhc0F1dGggLz5cblxueyNlYWNoIG1vZHVsZXMgYXMgeyB0aXRsZSwgc2tpbGxzIH19XG4gIDxzZWN0aW9uIGNsYXNzPVwic2VjdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgIDxoMiBjbGFzcz1cImlzLXNpemUtMlwiPnt0aXRsZX08L2gyPlxuICAgICAgPENvbHVtbnMgbXVsdGlsaW5lPlxuICAgICAgICB7I2VhY2ggc2tpbGxzIGFzIHNraWxsfVxuICAgICAgICAgIDxDb2x1bW4gc2l6ZURlc2t0b3A9XCIxLzNcIiBzaXplVGFibGV0PVwiMS8yXCI+XG5cbiAgICAgICAgICAgIDxTa2lsbENhcmRcbiAgICAgICAgICAgICAgey4uLnsgLi4uc2tpbGwgfX1cbiAgICAgICAgICAgICAgcHJhY3RpY2VIcmVmPVwie2AvY291cnNlLyR7Y291cnNlTmFtZX0vc2tpbGwvJHtza2lsbC5wcmFjdGljZUhyZWZ9YH1cIiAvPlxuICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICB7L2VhY2h9XG4gICAgICA8L0NvbHVtbnM+XG4gICAgPC9kaXY+XG4gIDwvc2VjdGlvbj5cbnsvZWFjaH1cblxuPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPlxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgIDxDb2x1bW5zPlxuICAgICAgPENvbHVtbj5cbiAgICAgICAgPHN0cm9uZz5MaWJyZUxpbmdvPC9zdHJvbmc+XG4gICAgICAgIGJ5XG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20va2FudG9yZFwiPkTDoW5pZWwgS8OhbnRvcjwvYT5cbiAgICAgICAgYW5kXG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20va2FudG9yZC9MaWJyZUxpbmdvI2NvbnRyaWJ1dG9ycy1cIj5cbiAgICAgICAgICB2YXJpb3VzIGNvbnRyaWJ1dG9yc1xuICAgICAgICA8L2E+XG4gICAgICAgIC5cbiAgICAgIDwvQ29sdW1uPlxuICAgICAgPENvbHVtbj5cbiAgICAgICAgVGhlIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkXG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wXCI+QUdQTC0zLjAuPC9hPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9rYW50b3JkL0xpYnJlTGluZ29cIj5cbiAgICAgICAgICBTb3VyY2UgY29kZSBhdmFpbGFibGUgb24gR2l0SHViLlxuICAgICAgICA8L2E+XG4gICAgICA8L0NvbHVtbj5cbiAgICAgIDxDb2x1bW4gLz5cbiAgICA8L0NvbHVtbnM+XG4gICAgPHA+PC9wPlxuICA8L2Rpdj5cbjwvZm9vdGVyPlxuXG48c3R5bGU+QGtleWZyYW1lcyBzcGluQXJvdW5kIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7IH0gfVxuXG4uY29udGFpbmVyIHtcbiAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4OyB9XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlFTyxXQUFXLHlCQUFXLENBQUMsQUFDNUIsSUFBSSxBQUFDLENBQUMsQUFDSixTQUFTLENBQUUsT0FBTyxJQUFJLENBQUMsQUFBRSxDQUFDLEFBQzVCLEVBQUUsQUFBQyxDQUFDLEFBQ0YsU0FBUyxDQUFFLE9BQU8sTUFBTSxDQUFDLEFBQUUsQ0FBQyxBQUFDLENBQUMsQUFFbEMsVUFBVSxlQUFDLENBQUMsQUFDVixhQUFhLENBQUUsSUFBSSxDQUNuQixZQUFZLENBQUUsSUFBSSxBQUFFLENBQUMifQ== */";
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(document.head, style);
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i].title;
	child_ctx[4] = list[i].skills;
	return child_ctx;
}

// (35:10) <Column sizeDesktop="1/3" sizeTablet="1/2">
function create_default_slot_4(ctx) {
	let skillcard;
	let current;

	const skillcard_spread_levels = [
		{ .../*skill*/ ctx[7] },
		{
			practiceHref: `/course/${/*courseName*/ ctx[0]}/skill/${/*skill*/ ctx[7].practiceHref}`
		}
	];

	let skillcard_props = {};

	for (let i = 0; i < skillcard_spread_levels.length; i += 1) {
		skillcard_props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(skillcard_props, skillcard_spread_levels[i]);
	}

	skillcard = new _components_SkillCard__WEBPACK_IMPORTED_MODULE_1__["default"]({ props: skillcard_props, $$inline: true });

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(skillcard.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(skillcard.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(skillcard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const skillcard_changes = (dirty & /*modules, courseName*/ 3)
			? Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_spread_update"])(skillcard_spread_levels, [
					dirty & /*modules*/ 2 && { .../*skill*/ ctx[7] },
					{
						practiceHref: `/course/${/*courseName*/ ctx[0]}/skill/${/*skill*/ ctx[7].practiceHref}`
					}
				])
			: {};

			skillcard.$set(skillcard_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(skillcard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(skillcard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(skillcard, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4.name,
		type: "slot",
		source: "(35:10) <Column sizeDesktop=\\\"1/3\\\" sizeTablet=\\\"1/2\\\">",
		ctx
	});

	return block;
}

// (34:8) {#each skills as skill}
function create_each_block_1(ctx) {
	let column;
	let current;

	column = new lluis_Column_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				sizeDesktop: "1/3",
				sizeTablet: "1/2",
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const column_changes = {};

			if (dirty & /*$$scope, modules, courseName*/ 1027) {
				column_changes.$$scope = { dirty, ctx };
			}

			column.$set(column_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(34:8) {#each skills as skill}",
		ctx
	});

	return block;
}

// (33:6) <Columns multiline>
function create_default_slot_3(ctx) {
	let each_1_anchor;
	let current;
	let each_value_1 = /*skills*/ ctx[4];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*modules, courseName*/ 3) {
				each_value_1 = /*skills*/ ctx[4];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(each_1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3.name,
		type: "slot",
		source: "(33:6) <Columns multiline>",
		ctx
	});

	return block;
}

// (29:0) {#each modules as { title, skills }}
function create_each_block(ctx) {
	let section;
	let div;
	let h2;
	let t0_value = /*title*/ ctx[3] + "";
	let t0;
	let t1;
	let columns;
	let current;

	columns = new lluis_Columns_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				multiline: true,
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("section");
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h2");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(columns.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			section = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "SECTION", { class: true });
			var section_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(section);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(section_nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			h2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "H2", { class: true });
			var h2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h2);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h2_nodes, t0_value);
			h2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(columns.$$.fragment, div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			section_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(h2, "class", "is-size-2");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h2, file, 31, 6, 820);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "container svelte-1rsvn2t");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 30, 4, 790);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(section, "class", "section");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(section, file, 29, 2, 760);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, section, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(section, div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, h2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h2, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(columns, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*modules*/ 2) && t0_value !== (t0_value = /*title*/ ctx[3] + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);
			const columns_changes = {};

			if (dirty & /*$$scope, modules, courseName*/ 1027) {
				columns_changes.$$scope = { dirty, ctx };
			}

			columns.$set(columns_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(columns.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(columns.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(section);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(columns);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(29:0) {#each modules as { title, skills }}",
		ctx
	});

	return block;
}

// (50:6) <Column>
function create_default_slot_2(ctx) {
	let strong;
	let t0;
	let t1;
	let a0;
	let t2;
	let t3;
	let a1;
	let t4;
	let t5;

	const block = {
		c: function create() {
			strong = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("strong");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("LibreLingo");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("\n        by\n        ");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Dániel Kántor");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("\n        and\n        ");
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("various contributors");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("\n        .");
			this.h();
		},
		l: function claim(nodes) {
			strong = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "STRONG", {});
			var strong_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(strong);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(strong_nodes, "LibreLingo");
			strong_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "\n        by\n        ");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "A", { href: true });
			var a0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a0);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a0_nodes, "Dániel Kántor");
			a0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "\n        and\n        ");
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "A", { href: true });
			var a1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a1);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a1_nodes, "various contributors");
			a1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "\n        .");
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(strong, file, 50, 8, 1280);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "href", "https://github.com/kantord");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a0, file, 52, 8, 1327);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "href", "https://github.com/kantord/LibreLingo#contributors-");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a1, file, 54, 8, 1402);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, strong, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(strong, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, a0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, a1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t5, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(strong);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(a0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(a1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t5);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(50:6) <Column>",
		ctx
	});

	return block;
}

// (60:6) <Column>
function create_default_slot_1(ctx) {
	let t0;
	let a0;
	let t1;
	let t2;
	let br;
	let t3;
	let a1;
	let t4;

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("The source code is licensed\n        ");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("AGPL-3.0.");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			br = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("br");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Source code available on GitHub.");
			this.h();
		},
		l: function claim(nodes) {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(nodes, "The source code is licensed\n        ");
			a0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "A", { href: true });
			var a0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a0);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a0_nodes, "AGPL-3.0.");
			a0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			br = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "BR", {});
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			a1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "A", { href: true });
			var a1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a1);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a1_nodes, "Source code available on GitHub.");
			a1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a0, "href", "https://opensource.org/licenses/AGPL-3.0");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a0, file, 61, 8, 1594);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(br, file, 62, 8, 1667);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a1, "href", "https://github.com/kantord/LibreLingo");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a1, file, 63, 8, 1682);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, a0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, br, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, a1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(a1, t4);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(a0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(br);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t3);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(a1);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(60:6) <Column>",
		ctx
	});

	return block;
}

// (49:4) <Columns>
function create_default_slot(ctx) {
	let column0;
	let t0;
	let column1;
	let t1;
	let column2;
	let current;

	column0 = new lluis_Column_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column1 = new lluis_Column_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	column2 = new lluis_Column_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column0.$$.fragment);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column1.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(column2.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column0.$$.fragment, nodes);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column1.$$.fragment, nodes);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(column2.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column0, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column1, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(column2, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const column0_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				column0_changes.$$scope = { dirty, ctx };
			}

			column0.$set(column0_changes);
			const column1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				column1_changes.$$scope = { dirty, ctx };
			}

			column1.$set(column1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(column2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column0.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column1.$$.fragment, local);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(column2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column0, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column1, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(column2, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(49:4) <Columns>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let title_value;
	let t0;
	let navbar;
	let t1;
	let t2;
	let footer;
	let div;
	let columns;
	let t3;
	let p;
	let current;
	document.title = title_value = "LibreLingo - learn " + /*languageName*/ ctx[2] + " for free";

	navbar = new _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { dark: true, hasAuth: true },
			$$inline: true
		});

	let each_value = /*modules*/ ctx[1];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	columns = new lluis_Columns_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(navbar.$$.fragment);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("footer");
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(columns.$$.fragment);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["query_selector_all"])("[data-svelte=\"svelte-1xdlk4p\"]", document.head);
			head_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(navbar.$$.fragment, nodes);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			footer = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "FOOTER", { class: true });
			var footer_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(footer);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(footer_nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(columns.$$.fragment, div_nodes);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div_nodes);
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div_nodes, "P", {});
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			footer_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 69, 4, 1839);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "content");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 47, 2, 1221);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(footer, "class", "footer");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(footer, file, 46, 0, 1195);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(navbar, target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t2, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, footer, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(footer, div);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(columns, div, null);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(div, p);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*languageName*/ 4) && title_value !== (title_value = "LibreLingo - learn " + /*languageName*/ ctx[2] + " for free")) {
				document.title = title_value;
			}

			if (dirty & /*modules, courseName*/ 3) {
				each_value = /*modules*/ ctx[1];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i], 1);
						each_blocks[i].m(t2.parentNode, t2);
					}
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
			}

			const columns_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				columns_changes.$$scope = { dirty, ctx };
			}

			columns.$set(columns_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(navbar.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(each_blocks[i]);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(columns.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(navbar.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(each_blocks[i]);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(columns.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(navbar, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_each"])(each_blocks, detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t2);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(footer);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(columns);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload(page, session) {
	const { courseName } = page.params;
	const { modules, languageName } = await __webpack_require__("./src/courses lazy recursive ^\\.\\/.*\\/courseData\\.json$")(`./${courseName}/courseData.json`);
	return { courseName, modules, languageName };
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("U5BcourseNameu5D", slots, []);
	let { courseName = null } = $$props;
	let { modules = null } = $$props;
	let { languageName = null } = $$props;
	const writable_props = ["courseName", "modules", "languageName"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5BcourseNameu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("courseName" in $$props) $$invalidate(0, courseName = $$props.courseName);
		if ("modules" in $$props) $$invalidate(1, modules = $$props.modules);
		if ("languageName" in $$props) $$invalidate(2, languageName = $$props.languageName);
	};

	$$self.$capture_state = () => ({
		preload,
		SkillCard: _components_SkillCard__WEBPACK_IMPORTED_MODULE_1__["default"],
		NavBar: _components_NavBar_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Column: lluis_Column_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Columns: lluis_Columns_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		courseName,
		modules,
		languageName
	});

	$$self.$inject_state = $$props => {
		if ("courseName" in $$props) $$invalidate(0, courseName = $$props.courseName);
		if ("modules" in $$props) $$invalidate(1, modules = $$props.modules);
		if ("languageName" in $$props) $$invalidate(2, languageName = $$props.languageName);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [courseName, modules, languageName];
}

class U5BcourseNameu5D extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1rsvn2t-style")) add_css();

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {
			courseName: 0,
			modules: 1,
			languageName: 2
		});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "U5BcourseNameu5D",
			options,
			id: create_fragment.name
		});
	}

	get courseName() {
		throw new Error("<U5BcourseNameu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set courseName(value) {
		throw new Error("<U5BcourseNameu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get modules() {
		throw new Error("<U5BcourseNameu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set modules(value) {
		throw new Error("<U5BcourseNameu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get languageName() {
		throw new Error("<U5BcourseNameu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set languageName(value) {
		throw new Error("<U5BcourseNameu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* harmony default export */ __webpack_exports__["default"] = (U5BcourseNameu5D);


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** ./nextTick (ignored) ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vL2hvbWUvdHJ1Y254L0ZQVC9lbmdsaXNoL2VuZ2xpc2g0dG9kYXkuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9kYXlqcy9kYXlqcy5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU2tpbGxDYXJkL2luZGV4LnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY291cnNlcyBsYXp5IF5cXC5cXC8uKlxcL2NvdXJzZURhdGFcXC5qc29uJCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9kYi9kYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvZ2V0VXNlckRiTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvc2tpbGwvX2xvZ2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9kYi9za2lsbC9nZXRTa2lsbFN0YXRzLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvY291cnNlL1tjb3Vyc2VOYW1lXS9pbmRleC5zdmVsdGUiLCJ3ZWJwYWNrOi8vLy4vbmV4dFRpY2sgKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGVBQWUsS0FBb0Qsb0JBQW9CLFNBQTJELENBQUMsaUJBQWlCLGFBQWEsb0hBQW9ILEVBQUUsVUFBVSxJQUFJLFdBQVcsSUFBSSxZQUFZLElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSw4QkFBOEIsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLE9BQU8sSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLHlCQUF5QixnQkFBZ0IseURBQXlELElBQUksa0JBQWtCLDZEQUE2RCwrQ0FBK0MsbUJBQW1CLG1DQUFtQyw4R0FBOEcsbUNBQW1DLGVBQWUseUNBQXlDLGVBQWUsT0FBTyx5Q0FBeUMsa0RBQWtELGVBQWUsbUJBQW1CLElBQUksbU1BQW1NLGFBQWEsT0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lFQVJMLEdBQVk7Ozs7Ozs7OEJBS2xDLEdBQU87Ozs7Z0NBQVosTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkhBTHVCLEdBQVk7Ozs7OzZCQUtsQyxHQUFPOzs7OytCQUFaLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBQUosTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FBSixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBM0JrQixPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU87U0FDakMsVUFBVSxLQUFLLElBQUksQ0FBQyxNQUFNO1NBQzFCLE9BQU8sRUFBRSxZQUFZLFdBQVcsbUZBQU8sS0FDekIsVUFBVSxDQUFDLGlCQUFpQjtVQUd6QyxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVk7Ozs7OztPQVVqQyxVQUFVLEdBQUcsSUFBSTtPQUNqQixPQUFPLEdBQUcsSUFBSTtPQUNkLFlBQVksR0FBRyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQmhDLGUiLCJmaWxlIjoiYWViZTlmMGYyZjEwODY1YmY0YmQvY291cnNlXyRjb3Vyc2VOYW1lLmNvdXJzZV8kY291cnNlTmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOnQuZGF5anM9ZSgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9XCJtaWxsaXNlY29uZFwiLGU9XCJzZWNvbmRcIixuPVwibWludXRlXCIscj1cImhvdXJcIixpPVwiZGF5XCIscz1cIndlZWtcIix1PVwibW9udGhcIixhPVwicXVhcnRlclwiLG89XCJ5ZWFyXCIsZj1cImRhdGVcIixoPS9eKFxcZHs0fSlbLS9dPyhcXGR7MSwyfSk/Wy0vXT8oXFxkezAsMn0pW14wLTldKihcXGR7MSwyfSk/Oj8oXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT8uPyhcXGQrKT8kLyxjPS9cXFsoW15cXF1dKyldfFl7Miw0fXxNezEsNH18RHsxLDJ9fGR7MSw0fXxIezEsMn18aHsxLDJ9fGF8QXxtezEsMn18c3sxLDJ9fFp7MSwyfXxTU1MvZyxkPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1TdHJpbmcodCk7cmV0dXJuIXJ8fHIubGVuZ3RoPj1lP3Q6XCJcIitBcnJheShlKzEtci5sZW5ndGgpLmpvaW4obikrdH0sJD17czpkLHo6ZnVuY3Rpb24odCl7dmFyIGU9LXQudXRjT2Zmc2V0KCksbj1NYXRoLmFicyhlKSxyPU1hdGguZmxvb3Iobi82MCksaT1uJTYwO3JldHVybihlPD0wP1wiK1wiOlwiLVwiKStkKHIsMixcIjBcIikrXCI6XCIrZChpLDIsXCIwXCIpfSxtOmZ1bmN0aW9uIHQoZSxuKXtpZihlLmRhdGUoKTxuLmRhdGUoKSlyZXR1cm4tdChuLGUpO3ZhciByPTEyKihuLnllYXIoKS1lLnllYXIoKSkrKG4ubW9udGgoKS1lLm1vbnRoKCkpLGk9ZS5jbG9uZSgpLmFkZChyLHUpLHM9bi1pPDAsYT1lLmNsb25lKCkuYWRkKHIrKHM/LTE6MSksdSk7cmV0dXJuKygtKHIrKG4taSkvKHM/aS1hOmEtaSkpfHwwKX0sYTpmdW5jdGlvbih0KXtyZXR1cm4gdDwwP01hdGguY2VpbCh0KXx8MDpNYXRoLmZsb29yKHQpfSxwOmZ1bmN0aW9uKGgpe3JldHVybntNOnUseTpvLHc6cyxkOmksRDpmLGg6cixtOm4sczplLG1zOnQsUTphfVtoXXx8U3RyaW5nKGh8fFwiXCIpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvcyQvLFwiXCIpfSx1OmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10fX0sbD17bmFtZTpcImVuXCIsd2Vla2RheXM6XCJTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheVwiLnNwbGl0KFwiX1wiKSxtb250aHM6XCJKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyXCIuc3BsaXQoXCJfXCIpfSx5PVwiZW5cIixNPXt9O01beV09bDt2YXIgbT1mdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIFN9LEQ9ZnVuY3Rpb24odCxlLG4pe3ZhciByO2lmKCF0KXJldHVybiB5O2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KU1bdF0mJihyPXQpLGUmJihNW3RdPWUscj10KTtlbHNle3ZhciBpPXQubmFtZTtNW2ldPXQscj1pfXJldHVybiFuJiZyJiYoeT1yKSxyfHwhbiYmeX0sdj1mdW5jdGlvbih0LGUpe2lmKG0odCkpcmV0dXJuIHQuY2xvbmUoKTt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2YgZT9lOnt9O3JldHVybiBuLmRhdGU9dCxuLmFyZ3M9YXJndW1lbnRzLG5ldyBTKG4pfSxnPSQ7Zy5sPUQsZy5pPW0sZy53PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHYodCx7bG9jYWxlOmUuJEwsdXRjOmUuJHUsJG9mZnNldDplLiRvZmZzZXR9KX07dmFyIFM9ZnVuY3Rpb24oKXtmdW5jdGlvbiBkKHQpe3RoaXMuJEw9dGhpcy4kTHx8RCh0LmxvY2FsZSxudWxsLCEwKSx0aGlzLnBhcnNlKHQpfXZhciAkPWQucHJvdG90eXBlO3JldHVybiAkLnBhcnNlPWZ1bmN0aW9uKHQpe3RoaXMuJGQ9ZnVuY3Rpb24odCl7dmFyIGU9dC5kYXRlLG49dC51dGM7aWYobnVsbD09PWUpcmV0dXJuIG5ldyBEYXRlKE5hTik7aWYoZy51KGUpKXJldHVybiBuZXcgRGF0ZTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gbmV3IERhdGUoZSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUmJiEvWiQvaS50ZXN0KGUpKXt2YXIgcj1lLm1hdGNoKGgpO2lmKHIpe3ZhciBpPXJbMl0tMXx8MCxzPShyWzddfHxcIjBcIikuc3Vic3RyaW5nKDAsMyk7cmV0dXJuIG4/bmV3IERhdGUoRGF0ZS5VVEMoclsxXSxpLHJbM118fDEscls0XXx8MCxyWzVdfHwwLHJbNl18fDAscykpOm5ldyBEYXRlKHJbMV0saSxyWzNdfHwxLHJbNF18fDAscls1XXx8MCxyWzZdfHwwLHMpfX1yZXR1cm4gbmV3IERhdGUoZSl9KHQpLHRoaXMuaW5pdCgpfSwkLmluaXQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiRkO3RoaXMuJHk9dC5nZXRGdWxsWWVhcigpLHRoaXMuJE09dC5nZXRNb250aCgpLHRoaXMuJEQ9dC5nZXREYXRlKCksdGhpcy4kVz10LmdldERheSgpLHRoaXMuJEg9dC5nZXRIb3VycygpLHRoaXMuJG09dC5nZXRNaW51dGVzKCksdGhpcy4kcz10LmdldFNlY29uZHMoKSx0aGlzLiRtcz10LmdldE1pbGxpc2Vjb25kcygpfSwkLiR1dGlscz1mdW5jdGlvbigpe3JldHVybiBnfSwkLmlzVmFsaWQ9ZnVuY3Rpb24oKXtyZXR1cm4hKFwiSW52YWxpZCBEYXRlXCI9PT10aGlzLiRkLnRvU3RyaW5nKCkpfSwkLmlzU2FtZT1mdW5jdGlvbih0LGUpe3ZhciBuPXYodCk7cmV0dXJuIHRoaXMuc3RhcnRPZihlKTw9biYmbjw9dGhpcy5lbmRPZihlKX0sJC5pc0FmdGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHYodCk8dGhpcy5zdGFydE9mKGUpfSwkLmlzQmVmb3JlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuZW5kT2YoZSk8dih0KX0sJC4kZz1mdW5jdGlvbih0LGUsbil7cmV0dXJuIGcudSh0KT90aGlzW2VdOnRoaXMuc2V0KG4sdCl9LCQudW5peD1mdW5jdGlvbigpe3JldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpLzFlMyl9LCQudmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLmdldFRpbWUoKX0sJC5zdGFydE9mPWZ1bmN0aW9uKHQsYSl7dmFyIGg9dGhpcyxjPSEhZy51KGEpfHxhLGQ9Zy5wKHQpLCQ9ZnVuY3Rpb24odCxlKXt2YXIgbj1nLncoaC4kdT9EYXRlLlVUQyhoLiR5LGUsdCk6bmV3IERhdGUoaC4keSxlLHQpLGgpO3JldHVybiBjP246bi5lbmRPZihpKX0sbD1mdW5jdGlvbih0LGUpe3JldHVybiBnLncoaC50b0RhdGUoKVt0XS5hcHBseShoLnRvRGF0ZShcInNcIiksKGM/WzAsMCwwLDBdOlsyMyw1OSw1OSw5OTldKS5zbGljZShlKSksaCl9LHk9dGhpcy4kVyxNPXRoaXMuJE0sbT10aGlzLiRELEQ9XCJzZXRcIisodGhpcy4kdT9cIlVUQ1wiOlwiXCIpO3N3aXRjaChkKXtjYXNlIG86cmV0dXJuIGM/JCgxLDApOiQoMzEsMTEpO2Nhc2UgdTpyZXR1cm4gYz8kKDEsTSk6JCgwLE0rMSk7Y2FzZSBzOnZhciB2PXRoaXMuJGxvY2FsZSgpLndlZWtTdGFydHx8MCxTPSh5PHY/eSs3OnkpLXY7cmV0dXJuICQoYz9tLVM6bSsoNi1TKSxNKTtjYXNlIGk6Y2FzZSBmOnJldHVybiBsKEQrXCJIb3Vyc1wiLDApO2Nhc2UgcjpyZXR1cm4gbChEK1wiTWludXRlc1wiLDEpO2Nhc2UgbjpyZXR1cm4gbChEK1wiU2Vjb25kc1wiLDIpO2Nhc2UgZTpyZXR1cm4gbChEK1wiTWlsbGlzZWNvbmRzXCIsMyk7ZGVmYXVsdDpyZXR1cm4gdGhpcy5jbG9uZSgpfX0sJC5lbmRPZj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5zdGFydE9mKHQsITEpfSwkLiRzZXQ9ZnVuY3Rpb24ocyxhKXt2YXIgaCxjPWcucChzKSxkPVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKSwkPShoPXt9LGhbaV09ZCtcIkRhdGVcIixoW2ZdPWQrXCJEYXRlXCIsaFt1XT1kK1wiTW9udGhcIixoW29dPWQrXCJGdWxsWWVhclwiLGhbcl09ZCtcIkhvdXJzXCIsaFtuXT1kK1wiTWludXRlc1wiLGhbZV09ZCtcIlNlY29uZHNcIixoW3RdPWQrXCJNaWxsaXNlY29uZHNcIixoKVtjXSxsPWM9PT1pP3RoaXMuJEQrKGEtdGhpcy4kVyk6YTtpZihjPT09dXx8Yz09PW8pe3ZhciB5PXRoaXMuY2xvbmUoKS5zZXQoZiwxKTt5LiRkWyRdKGwpLHkuaW5pdCgpLHRoaXMuJGQ9eS5zZXQoZixNYXRoLm1pbih0aGlzLiRELHkuZGF5c0luTW9udGgoKSkpLiRkfWVsc2UgJCYmdGhpcy4kZFskXShsKTtyZXR1cm4gdGhpcy5pbml0KCksdGhpc30sJC5zZXQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5jbG9uZSgpLiRzZXQodCxlKX0sJC5nZXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXNbZy5wKHQpXSgpfSwkLmFkZD1mdW5jdGlvbih0LGEpe3ZhciBmLGg9dGhpczt0PU51bWJlcih0KTt2YXIgYz1nLnAoYSksZD1mdW5jdGlvbihlKXt2YXIgbj12KGgpO3JldHVybiBnLncobi5kYXRlKG4uZGF0ZSgpK01hdGgucm91bmQoZSp0KSksaCl9O2lmKGM9PT11KXJldHVybiB0aGlzLnNldCh1LHRoaXMuJE0rdCk7aWYoYz09PW8pcmV0dXJuIHRoaXMuc2V0KG8sdGhpcy4keSt0KTtpZihjPT09aSlyZXR1cm4gZCgxKTtpZihjPT09cylyZXR1cm4gZCg3KTt2YXIgJD0oZj17fSxmW25dPTZlNCxmW3JdPTM2ZTUsZltlXT0xZTMsZilbY118fDEsbD10aGlzLiRkLmdldFRpbWUoKSt0KiQ7cmV0dXJuIGcudyhsLHRoaXMpfSwkLnN1YnRyYWN0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuYWRkKC0xKnQsZSl9LCQuZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7aWYoIXRoaXMuaXNWYWxpZCgpKXJldHVyblwiSW52YWxpZCBEYXRlXCI7dmFyIG49dHx8XCJZWVlZLU1NLUREVEhIOm1tOnNzWlwiLHI9Zy56KHRoaXMpLGk9dGhpcy4kbG9jYWxlKCkscz10aGlzLiRILHU9dGhpcy4kbSxhPXRoaXMuJE0sbz1pLndlZWtkYXlzLGY9aS5tb250aHMsaD1mdW5jdGlvbih0LHIsaSxzKXtyZXR1cm4gdCYmKHRbcl18fHQoZSxuKSl8fGlbcl0uc3Vic3RyKDAscyl9LGQ9ZnVuY3Rpb24odCl7cmV0dXJuIGcucyhzJTEyfHwxMix0LFwiMFwiKX0sJD1pLm1lcmlkaWVtfHxmdW5jdGlvbih0LGUsbil7dmFyIHI9dDwxMj9cIkFNXCI6XCJQTVwiO3JldHVybiBuP3IudG9Mb3dlckNhc2UoKTpyfSxsPXtZWTpTdHJpbmcodGhpcy4keSkuc2xpY2UoLTIpLFlZWVk6dGhpcy4keSxNOmErMSxNTTpnLnMoYSsxLDIsXCIwXCIpLE1NTTpoKGkubW9udGhzU2hvcnQsYSxmLDMpLE1NTU06aChmLGEpLEQ6dGhpcy4kRCxERDpnLnModGhpcy4kRCwyLFwiMFwiKSxkOlN0cmluZyh0aGlzLiRXKSxkZDpoKGkud2Vla2RheXNNaW4sdGhpcy4kVyxvLDIpLGRkZDpoKGkud2Vla2RheXNTaG9ydCx0aGlzLiRXLG8sMyksZGRkZDpvW3RoaXMuJFddLEg6U3RyaW5nKHMpLEhIOmcucyhzLDIsXCIwXCIpLGg6ZCgxKSxoaDpkKDIpLGE6JChzLHUsITApLEE6JChzLHUsITEpLG06U3RyaW5nKHUpLG1tOmcucyh1LDIsXCIwXCIpLHM6U3RyaW5nKHRoaXMuJHMpLHNzOmcucyh0aGlzLiRzLDIsXCIwXCIpLFNTUzpnLnModGhpcy4kbXMsMyxcIjBcIiksWjpyfTtyZXR1cm4gbi5yZXBsYWNlKGMsZnVuY3Rpb24odCxlKXtyZXR1cm4gZXx8bFt0XXx8ci5yZXBsYWNlKFwiOlwiLFwiXCIpfSl9LCQudXRjT2Zmc2V0PWZ1bmN0aW9uKCl7cmV0dXJuIDE1Ki1NYXRoLnJvdW5kKHRoaXMuJGQuZ2V0VGltZXpvbmVPZmZzZXQoKS8xNSl9LCQuZGlmZj1mdW5jdGlvbih0LGYsaCl7dmFyIGMsZD1nLnAoZiksJD12KHQpLGw9NmU0KigkLnV0Y09mZnNldCgpLXRoaXMudXRjT2Zmc2V0KCkpLHk9dGhpcy0kLE09Zy5tKHRoaXMsJCk7cmV0dXJuIE09KGM9e30sY1tvXT1NLzEyLGNbdV09TSxjW2FdPU0vMyxjW3NdPSh5LWwpLzYwNDhlNSxjW2ldPSh5LWwpLzg2NGU1LGNbcl09eS8zNmU1LGNbbl09eS82ZTQsY1tlXT15LzFlMyxjKVtkXXx8eSxoP006Zy5hKE0pfSwkLmRheXNJbk1vbnRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5kT2YodSkuJER9LCQuJGxvY2FsZT1mdW5jdGlvbigpe3JldHVybiBNW3RoaXMuJExdfSwkLmxvY2FsZT1mdW5jdGlvbih0LGUpe2lmKCF0KXJldHVybiB0aGlzLiRMO3ZhciBuPXRoaXMuY2xvbmUoKSxyPUQodCxlLCEwKTtyZXR1cm4gciYmKG4uJEw9ciksbn0sJC5jbG9uZT1mdW5jdGlvbigpe3JldHVybiBnLncodGhpcy4kZCx0aGlzKX0sJC50b0RhdGU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpfSwkLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmlzVmFsaWQoKT90aGlzLnRvSVNPU3RyaW5nKCk6bnVsbH0sJC50b0lTT1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvSVNPU3RyaW5nKCl9LCQudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b1VUQ1N0cmluZygpfSxkfSgpLHA9Uy5wcm90b3R5cGU7cmV0dXJuIHYucHJvdG90eXBlPXAsW1tcIiRtc1wiLHRdLFtcIiRzXCIsZV0sW1wiJG1cIixuXSxbXCIkSFwiLHJdLFtcIiRXXCIsaV0sW1wiJE1cIix1XSxbXCIkeVwiLG9dLFtcIiREXCIsZl1dLmZvckVhY2goZnVuY3Rpb24odCl7cFt0WzFdXT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy4kZyhlLHRbMF0sdFsxXSl9fSksdi5leHRlbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdChlLFMsdiksdn0sdi5sb2NhbGU9RCx2LmlzRGF5anM9bSx2LnVuaXg9ZnVuY3Rpb24odCl7cmV0dXJuIHYoMWUzKnQpfSx2LmVuPU1beV0sdi5Mcz1NLHZ9KTtcbiIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uRGVzdHJveSwgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIlxuXG4gIGltcG9ydCBsaXZlIGZyb20gXCIuLi8uLi9kYi9saXZlXCJcbiAgaW1wb3J0IGdldFNraWxsU3RhdHMgZnJvbSBcIi4uLy4uL2RiL3NraWxsL2dldFNraWxsU3RhdHNcIlxuICBpbXBvcnQgSWNvbiBmcm9tIFwibGx1aXMvSWNvblwiXG4gIGltcG9ydCBCdXR0b24gZnJvbSBcImxsdWlzL0J1dHRvblwiXG5cbiAgZXhwb3J0IGxldCB0aXRsZVxuICBleHBvcnQgbGV0IGxldmVsc1xuICBleHBvcnQgbGV0IHByYWN0aWNlSHJlZlxuICBleHBvcnQgbGV0IGlkXG4gIGV4cG9ydCBsZXQgaW1hZ2VTZXQgPSBbXVxuICBleHBvcnQgbGV0IHN1bW1hcnlcblxuICBsZXQgY29tcGxldGVkID0gbnVsbFxuICBsZXQgc3RhcnRlZCA9IG51bGxcbiAgbGV0IHN0YWxlID0gbnVsbFxuICBsZXQgcHJvZ3Jlc3MgPSBudWxsXG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgbGl2ZSgoZGIpID0+XG4gICAgICBnZXRTa2lsbFN0YXRzKGRiLCB7IGlkIH0pXG4gICAgICAgIC50aGVuKChzdGF0cykgPT4ge1xuICAgICAgICAgIGNvbXBsZXRlZCA9IHN0YXRzLnByb2dyZXNzID49IGxldmVsc1xuICAgICAgICAgIHByb2dyZXNzID0gc3RhdHMucHJvZ3Jlc3NcbiAgICAgICAgICBzdGFydGVkID0gc3RhdHMuc3RhcnRlZFxuICAgICAgICAgIHN0YWxlID0gc3RhdHMuc3RhbGVcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KVxuICAgIClcbiAgfSlcbjwvc2NyaXB0PlxuXG48ZGl2XG4gIGNsYXNzPVwiY2FyZFwiXG4gIGRhdGEtdGVzdD1cInNraWxsIGNhcmRcIlxuICBkYXRhLXN0YXJ0ZWQ9XCJ7c3RhcnRlZH1cIlxuICBkYXRhLWNvbXBsZXRlZD1cIntjb21wbGV0ZWR9XCJcbiAgZGF0YS1zdGFsZT1cIntzdGFsZX1cIj5cbiAgeyNpZiBjb21wbGV0ZWR9XG4gICAgeyNpZiBzdGFsZX1cbiAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICA8SWNvbiBpY29uPVwiZHVtYmJlbGxcIiBzaXplPVwibGFyZ2VcIiAvPlxuICAgICAgPC9zcGFuPlxuICAgIHs6ZWxzZX1cbiAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICA8SWNvbiBpY29uPVwiY2hlY2stc3F1YXJlXCIgc2l6ZT1cImxhcmdlXCIgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICB7L2lmfVxuICB7L2lmfVxuICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cIm1lZGlhXCI+XG4gICAgICB7I2lmIGltYWdlU2V0ICYmIGltYWdlU2V0Lmxlbmd0aH1cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWxlZnRcIj5cbiAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiaW1hZ2UgaW1hZ2Utc2V0IGlzLTk2eDk2XCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIntgaW1hZ2VzLyR7aW1hZ2VTZXRbMF19X3Rpbmllci5qcGdgfVwiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIntgaW1hZ2VzLyR7aW1hZ2VTZXRbMV19X3Rpbmllci5qcGdgfVwiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIntgaW1hZ2VzLyR7aW1hZ2VTZXRbMl19X3RpbnkuanBnYH1cIiBhbHQ9XCJcIiAvPlxuICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIHsvaWZ9XG4gICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtY29udGVudFwiPlxuICAgICAgICA8cCBjbGFzcz1cInRpdGxlIGlzLTRcIj57dGl0bGV9PC9wPlxuICAgICAgICB7I2lmIGNvbXBsZXRlZCB8fCAhc3RhcnRlZH1cbiAgICAgICAgICA8cCBjbGFzcz1cImlzLTYgY2xhbXBcIj5MZWFybjoge3N1bW1hcnkuam9pbignLCAnKX08L3A+XG4gICAgICAgIHsvaWZ9XG4gICAgICAgIHsjaWYgIWNvbXBsZXRlZCAmJiBzdGFydGVkfVxuICAgICAgICAgIDxwcm9ncmVzc1xuICAgICAgICAgICAgY2xhc3M9XCJwcm9ncmVzc1wiXG4gICAgICAgICAgICB2YWx1ZT1cIntwcm9ncmVzc31cIlxuICAgICAgICAgICAgbWF4PVwie2xldmVsc31cIj48L3Byb2dyZXNzPlxuICAgICAgICB7L2lmfVxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxmb290ZXIgY2xhc3M9XCJjYXJkLWZvb3RlclwiPlxuICAgIDxkaXYgaHJlZj1cIntwcmFjdGljZUhyZWZ9XCIgY2xhc3M9XCJjYXJkLWZvb3Rlci1pdGVtXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICB7I2lmIGNvbXBsZXRlZH1cbiAgICAgICAgICA8QnV0dG9uIHByaW1hcnkgaHJlZj1cIntwcmFjdGljZUhyZWZ9XCI+UHJhY3RpY2Uge3RpdGxlfTwvQnV0dG9uPlxuICAgICAgICB7OmVsc2UgaWYgc3RhcnRlZH1cbiAgICAgICAgICA8QnV0dG9uIHByaW1hcnkgaHJlZj1cIntwcmFjdGljZUhyZWZ9XCI+Q29udGludWUge3RpdGxlfTwvQnV0dG9uPlxuICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgPEJ1dHRvbiBwcmltYXJ5IGhyZWY9XCJ7cHJhY3RpY2VIcmVmfVwiPkxlYXJuIHt0aXRsZX08L0J1dHRvbj5cbiAgICAgICAgey9pZn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Zvb3Rlcj5cbjwvZGl2PlxuXG48c3R5bGU+QGtleWZyYW1lcyBzcGluQXJvdW5kIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7IH0gfVxuXG4uaW1hZ2Utc2V0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbi5pbWFnZS1zZXQgaW1nIHtcbiAgbGVmdDogMTUlO1xuICB0b3A6IDE1JTtcbiAgd2lkdGg6IDcwJTtcbiAgcG9zaXRpb246IGFic29sdXRlOyB9XG5cbi5pbWFnZS1zZXQgaW1nOmZpcnN0LWNoaWxkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7IH1cblxuLmltYWdlLXNldCBpbWc6bGFzdC1jaGlsZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMzAlO1xuICB0b3A6IDMwJTsgfVxuXG4uY2FyZC1jb250ZW50IHtcbiAgaGVpZ2h0OiAxNDdweDsgfVxuXG4uY2xhbXAge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbi5jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7IH1cbiAgLmNhcmRbZGF0YS1jb21wbGV0ZWQ9XCJ0cnVlXCJdIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjJjYTkzOyB9XG4gICAgLmNhcmRbZGF0YS1jb21wbGV0ZWQ9XCJ0cnVlXCJdW2RhdGEtc3RhbGU9XCJ0cnVlXCJdIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmIyYWI7IH1cbiAgICAgIC5jYXJkW2RhdGEtY29tcGxldGVkPVwidHJ1ZVwiXVtkYXRhLXN0YWxlPVwidHJ1ZVwiXSA+IC5pY29uIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogMWVtO1xuICAgICAgICB0b3A6IDAuNWVtOyB9XG4gICAgLmNhcmRbZGF0YS1jb21wbGV0ZWQ9XCJ0cnVlXCJdIC50aXRsZSxcbiAgICAuY2FyZFtkYXRhLWNvbXBsZXRlZD1cInRydWVcIl0gLm1lZGlhLWNvbnRlbnQsXG4gICAgLmNhcmRbZGF0YS1jb21wbGV0ZWQ9XCJ0cnVlXCJdIC5pY29uIHtcbiAgICAgIGNvbG9yOiB3aGl0ZTsgfVxuICAgIC5jYXJkW2RhdGEtY29tcGxldGVkPVwidHJ1ZVwiXSAubWVkaWEtbGVmdCB7XG4gICAgICBtaXgtYmxlbmQtbW9kZTogc2NyZWVuOyB9XG4gICAgICAuY2FyZFtkYXRhLWNvbXBsZXRlZD1cInRydWVcIl0gLm1lZGlhLWxlZnQgLmltYWdlLXNldCB7XG4gICAgICAgIGZpbHRlcjogc2F0dXJhdGUoMCk7IH1cbiAgICAgICAgLmNhcmRbZGF0YS1jb21wbGV0ZWQ9XCJ0cnVlXCJdIC5tZWRpYS1sZWZ0IC5pbWFnZS1zZXQgaW1nIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTsgfVxuICAuY2FyZCA+IC5pY29uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDAuNWVtO1xuICAgIHRvcDogMC41ZW07IH1cbjwvc3R5bGU+XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vZW5nbGlzaC1mcm9tLXZpZXRuYW1lc2UvY291cnNlRGF0YS5qc29uXCI6IFtcblx0XHRcIi4vc3JjL2NvdXJzZXMvZW5nbGlzaC1mcm9tLXZpZXRuYW1lc2UvY291cnNlRGF0YS5qc29uXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vc3BhbmlzaC1mcm9tLWVuZ2xpc2gvY291cnNlRGF0YS5qc29uXCI6IFtcblx0XHRcIi4vc3JjL2NvdXJzZXMvc3BhbmlzaC1mcm9tLWVuZ2xpc2gvY291cnNlRGF0YS5qc29uXCIsXG5cdFx0MjVcblx0XVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHQocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGlkcyA9IG1hcFtyZXFdLCBpZCA9IGlkc1swXTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShpZHNbMV0pLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udChpZCwgMyk7XG5cdH0pO1xufVxud2VicGFja0FzeW5jQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tBc3luY0NvbnRleHQuaWQgPSBcIi4vc3JjL2NvdXJzZXMgbGF6eSByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKlxcXFwvY291cnNlRGF0YVxcXFwuanNvbiRcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0FzeW5jQ29udGV4dDsiLCJpbXBvcnQgc2V0dGluZ3MgZnJvbSBcIi4uL3NldHRpbmdzXCJcbmltcG9ydCBnZXRVc2VyRGJOYW1lIGZyb20gXCIuL2dldFVzZXJEYk5hbWVcIlxuaW1wb3J0IENvb2tpZXMgZnJvbSBcImpzLWNvb2tpZVwiXG5cbmxldCBkYlxubGV0IHJlbW90ZURCXG5sZXQgc3luY0hhbmRsZXJcblxuY29uc3QgY3JlYXRlTG9jYWxQb3VjaERiID0gKGRiTmFtZSkgPT4ge1xuICAgIGNvbnN0IFBvdWNoREIgPVxuICAgIHByb2Nlc3MuZW52LkpFU1RfV09SS0VSX0lEICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyByZXF1aXJlKFwicG91Y2hkYlwiKVxuICAgICAgICA6IHJlcXVpcmUoXCJwb3VjaGRiXCIpLmRlZmF1bHRcbiAgICBjb25zdCBuZXdEYiA9IG5ldyBQb3VjaERCKGRiTmFtZSkuc2V0TWF4TGlzdGVuZXJzKFxuICAgICAgICBzZXR0aW5ncy5kYXRhYmFzZS5tYXhOdW1iZXJPZkxpc3RlbmVyc1xuICAgIClcblxuICAgIG5ld0RiXG4gICAgICAgIC5jaGFuZ2VzKHtcbiAgICAgICAgICAgIHNpbmNlOiBcIm5vd1wiLFxuICAgICAgICAgICAgbGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGluY2x1ZGVfZG9jczogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5KRVNUX1dPUktFUl9JRCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhdXRoU3RvcmUgPSByZXF1aXJlKFwiLi4vYXV0aFwiKS5kZWZhdWx0XG4gICAgICAgICAgICBhdXRoU3RvcmUudXBkYXRlKCh2YWx1ZSkgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgICAgICAgICBkYlVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9KVxuXG4gICAgcmV0dXJuIG5ld0RiXG59XG5cbmlmIChwcm9jZXNzLmJyb3dzZXIgPT09IHRydWUpIHtcbiAgICBjb25zdCBhdXRoU3RvcmUgPSByZXF1aXJlKFwiLi4vYXV0aFwiKS5kZWZhdWx0XG4gICAgY29uc3QgUG91Y2hEQiA9IHJlcXVpcmUoXCJwb3VjaGRiXCIpLmRlZmF1bHRcblxuICAgIC8vIENvbm5lY3QgdG8gcmVtb3RlIGRhdGFiYXNlXG4gICAgcmVtb3RlREIgPSBuZXcgUG91Y2hEQihcbiAgICAgICAgYCR7c2V0dGluZ3MuZGF0YWJhc2UucmVtb3RlfS8ke0Nvb2tpZXMuZ2V0KFwibG9naW5EYlwiKX1gLFxuICAgICAgICB7IHNraXBfc2V0dXA6IHRydWUsIGxpdmU6IHRydWUgfVxuICAgIClcblxuICAgIC8vIENvbm5lY3QgdG8gbG9jYWwgZGF0YWJhc2VcbiAgICBkYiA9IGNyZWF0ZUxvY2FsUG91Y2hEYihzZXR0aW5ncy5kYXRhYmFzZS5sb2NhbClcbiAgICB3aW5kb3cuX0RCID0gZGJcblxuICAgIC8vIERldGVjdCBmYWtlIHVzZXIgc2Vzc2lvblxuICAgIGlmIChDb29raWVzLmdldChcImxvZ2luRGJcIikgPT09IGdldFVzZXJEYk5hbWUoXCItLS1mYWtlVXNlclwiKSkge1xuICAgICAgICBhdXRoU3RvcmUudXBkYXRlKCh2YWx1ZSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnZhbHVlLFxuICAgICAgICAgICAgdXNlcjogeyBuYW1lOiBcIi0tLWZha2VVc2VyXCIgfSxcbiAgICAgICAgICAgIG9ubGluZTogdHJ1ZSxcbiAgICAgICAgfSkpXG4gICAgfVxuXG4gICAgLy8gRGV0ZWN0IGV4aXN0aW5nIHVzZXIgc2Vzc2lvblxuICAgIGlmIChDb29raWVzLmdldChcImxvZ2luRGJcIikgJiYgc2V0dGluZ3MuZmVhdHVyZXMuYXV0aEVuYWJsZWQpIHtcbiAgICAgICAgZmV0Y2goYCR7c2V0dGluZ3MuZGF0YWJhc2UucmVtb3RlfS9fc2Vzc2lvbmAsIHsgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiIH0pXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLnVzZXJDdHgubmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXV0aFN0b3JlLnVwZGF0ZSgodmFsdWUpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiB7IG5hbWU6IHVzZXIudXNlckN0eC5uYW1lIH0sXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgc3RhcnRTeW5jKClcbiAgICAgICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAvLyBXaXRob3V0IGEgc2Vzc2lvcywgdGhlcmUgaXMgbm8gc3luY1xuICAgICAgICBhdXRoU3RvcmUudXBkYXRlKCh2YWx1ZSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnZhbHVlLFxuICAgICAgICAgICAgb25saW5lOiBmYWxzZSxcbiAgICAgICAgfSkpXG4gICAgfVxuXG4gICAgLy8gRmFrZSBsb2dpbiBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAgIHdpbmRvdy5fZmFrZUxvZ2luID0gKCkgPT4ge1xuICAgICAgICBDb29raWVzLnNldChcImxvZ2luRGJcIiwgZ2V0VXNlckRiTmFtZShcIi0tLWZha2VVc2VyXCIpLCB7XG4gICAgICAgICAgICBleHBpcmVzOiBzZXR0aW5ncy5kYXRhYmFzZS5hdXRoLmV4cGlyZURheXMsXG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY291cnNlL3NwYW5pc2gtZnJvbS1lbmdsaXNoL1wiXG4gICAgfVxuXG4gICAgLy8gQWRkIGxvZ2luIGZ1bmN0aW9uXG4gICAgd2luZG93Ll9Mb2dpbiA9IGFzeW5jICh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy5fdGVzdF9jcmVkZW50aWFsc19jb3JyZWN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2luZG93Ll90ZXN0X2NyZWRlbnRpYWxzX2NvcnJlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuX2Zha2VMb2dpbigpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IChcbiAgICAgICAgICAgIGF3YWl0IGZldGNoKGAke3NldHRpbmdzLmRhdGFiYXNlLnJlbW90ZX0vX3Nlc3Npb25gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5qc29uKClcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvciA9PT0gXCJ1bmF1dGhvcml6ZWRcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXJuYW1lIG9yIHBhc3N3b3JkIGlzIGluY29ycmVjdFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgbG9nIGluLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIpXG4gICAgICAgIH1cblxuICAgICAgICBhdXRoU3RvcmUudXBkYXRlKCh2YWx1ZSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnZhbHVlLFxuICAgICAgICAgICAgb25saW5lOiBudWxsLFxuICAgICAgICB9KSlcbiAgICAgICAgQ29va2llcy5zZXQoXCJsb2dpbkRiXCIsIGdldFVzZXJEYk5hbWUodXNlcm5hbWUpLCB7XG4gICAgICAgICAgICBleHBpcmVzOiBzZXR0aW5ncy5kYXRhYmFzZS5hdXRoLmV4cGlyZURheXMsXG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoZmFsc2UpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY291cnNlL3NwYW5pc2gtZnJvbS1lbmdsaXNoL1wiXG4gICAgfVxuXG4gICAgLy8gTG9nb3V0XG4gICAgd2luZG93Ll9Mb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoc3luY0hhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzeW5jSGFuZGxlci5jYW5jZWwoKVxuICAgICAgICAgICAgICAgIGF3YWl0IGZldGNoKGAke3NldHRpbmdzLmRhdGFiYXNlLnJlbW90ZX0vX3Nlc3Npb25gLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJkZWxldGVcIixcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgQ29va2llcy5yZW1vdmUoXCJsb2dpbkRiXCIpXG4gICAgICAgICAgICBhdXRoU3RvcmUudXBkYXRlKCh2YWx1ZSkgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgICAgICAgICB1c2VyOiBudWxsLFxuICAgICAgICAgICAgICAgIG9ubGluZTogbnVsbCxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgYXdhaXQgZGIuZGVzdHJveSgpXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gS2VlcCBkYXRhYmFzZXMgaW4gc3luY1xuICAgIGNvbnN0IHN0YXJ0U3luYyA9ICgpID0+IHtcbiAgICAgICAgc3luY0hhbmRsZXIgPSBkYlxuICAgICAgICAgICAgLnN5bmMocmVtb3RlREIpXG4gICAgICAgICAgICAub24oXCJjb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXV0aFN0b3JlLnVwZGF0ZSgodmFsdWUpID0+ICh7IC4uLnZhbHVlLCBvbmxpbmU6IHRydWUgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGF1dGhTdG9yZS51cGRhdGUoKHZhbHVlKSA9PiAoeyAuLi52YWx1ZSwgb25saW5lOiBmYWxzZSB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxufVxuXG5pZiAocHJvY2Vzcy5lbnYuSkVTVF9XT1JLRVJfSUQgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIFRoaXMgaXMgYSB0ZXN0IGRhdGFiYXNlIGZvciBKZXN0IHRlc3RzIHRoYXQgY2FuIHJlc2V0IGl0c2VsZlxuICAgIGRiID0gY3JlYXRlTG9jYWxQb3VjaERiKHNldHRpbmdzLmRhdGFiYXNlLmxvY2FsKVxuICAgIGRiLl9fcmVzZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbERvY3MgPSBhd2FpdCBkYi5hbGxEb2NzKClcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBhbGxEb2NzLnJvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGIucmVtb3ZlKHJvdy5pZCwgcm93LnZhbHVlLnJldilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRiXG4iLCJjb25zdCBoYXNoVXNlcm5hbWUgPSAodXNlcm5hbWUpID0+XG4gICAgdXNlcm5hbWVcbiAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgIC5tYXAoKGMpID0+IGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpXG4gICAgICAgIC5qb2luKFwiXCIpXG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VybmFtZSkgPT4gYHVzZXJkYi0ke2hhc2hVc2VybmFtZSh1c2VybmFtZSl9YFxuIiwiaW1wb3J0IGRiIGZyb20gXCIuL2RiXCJcblxuZXhwb3J0IGRlZmF1bHQgKGxpc3RlbmVyKSA9PiB7XG4gICAgbGlzdGVuZXIoZGIpXG4gICAgaWYgKHByb2Nlc3MuYnJvd3NlciA9PT0gdHJ1ZSAmJiBwcm9jZXNzLmVudi5KRVNUX1dPUktFUl9JRCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGF1dGhTdG9yZSA9IHJlcXVpcmUoXCIuLi9hdXRoXCIpLmRlZmF1bHRcbiAgICAgICAgYXV0aFN0b3JlLnN1YnNjcmliZSgoKSA9PiBsaXN0ZW5lcihkYikpXG4gICAgfVxufVxuIiwiaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiXG5cbmNvbnN0IGZpYiA9IG4gPT4gKG4gPiAxID8gZmliKG4gLSAxKSArIGZpYihuIC0gMikgOiAxKVxuXG5leHBvcnQgY29uc3QgZGF5c1VudGlsTmV4dFByYWN0aWNlID0gKHsgcHJhY3RpY2VzU29GYXIgfSkgPT4gZmliKHByYWN0aWNlc1NvRmFyKVxuXG5leHBvcnQgY29uc3QgZ2V0TGFzdFByYWN0aWNlID0gcHJhY3RpY2VzID0+XG4gICAgWy4uLnByYWN0aWNlc10uc29ydCgoYSwgYikgPT4gKGRheWpzKGEuYXQpLmlzQWZ0ZXIoZGF5anMoYi5hdCkpID8gLTEgOiAxKSlbMF1cbiAgICAgICAgLmF0XG5cbmV4cG9ydCBjb25zdCB3b3VsZEJlU3RhbGUgPSAoeyBsYXN0UHJhY3RpY2UsIHByYWN0aWNlc1NvRmFyIH0pID0+IHtcbiAgICBjb25zdCBzaG91bGRCZVN0YWxlQXQgPSBkYXlqcyhsYXN0UHJhY3RpY2UpLmFkZChcbiAgICAgICAgZGF5c1VudGlsTmV4dFByYWN0aWNlKHsgcHJhY3RpY2VzU29GYXIgfSksXG4gICAgICAgIFwiZGF5XCJcbiAgICApXG5cbiAgICByZXR1cm4gZGF5anMoKS5pc0FmdGVyKGRheWpzKGRheWpzKHNob3VsZEJlU3RhbGVBdCkuc3VidHJhY3QoMSwgXCJzZWNvbmRcIikpKVxufVxuXG5leHBvcnQgY29uc3QgaXNTdGFsZSA9ICh7IHByYWN0aWNlcyB9KSA9PlxuICAgIHdvdWxkQmVTdGFsZSh7XG4gICAgICAgIHByYWN0aWNlc1NvRmFyOiBwcmFjdGljZXMubGVuZ3RoLFxuICAgICAgICBsYXN0UHJhY3RpY2U6IGdldExhc3RQcmFjdGljZShwcmFjdGljZXMpXG4gICAgfSlcbiIsImltcG9ydCB7IGlzU3RhbGUgfSBmcm9tIFwiLi9fbG9naWNcIlxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGIsIHsgaWQgfSkgPT4ge1xuICAgIGlmICghZGIpIHJldHVybiBudWxsXG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHByYWN0aWNlZCB9ID0gYXdhaXQgZGIuZ2V0KGBza2lsbHMvJHtpZH1gKVxuICAgICAgICBjb25zdCB2YWxpZFByYWN0aWNlcyA9IHByYWN0aWNlZC5maWx0ZXIoXG4gICAgICAgICAgICAoeyBjb3JyZWN0IH0pID0+IGNvcnJlY3QgPT09IHVuZGVmaW5lZCB8fCBjb3JyZWN0ID4gMFxuICAgICAgICApXG5cbiAgICAgICAgaWYgKHZhbGlkUHJhY3RpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnRlZDogZmFsc2UsIHN0YWxlOiBudWxsLCBwcm9ncmVzczogMCB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IHZhbGlkUHJhY3RpY2VzLnJlZHVjZShcbiAgICAgICAgICAgIChhY2MsIHsgY29ycmVjdCwgc2tpcHBlZCB9KSA9PlxuICAgICAgICAgICAgICAgIGFjYyArIChjb3JyZWN0IHx8IDEpIC8gKChjb3JyZWN0IHx8IDEpICsgKHNraXBwZWQgfHwgMCkpLFxuICAgICAgICAgICAgMFxuICAgICAgICApXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IHZhbGlkUHJhY3RpY2VzLmxlbmd0aCA+PSAxLFxuICAgICAgICAgICAgc3RhbGU6IGlzU3RhbGUoeyBwcmFjdGljZXM6IHByYWN0aWNlZCB9KSxcbiAgICAgICAgICAgIHByb2dyZXNzLFxuICAgICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0ZWQ6IGZhbHNlLCBzdGFsZTogbnVsbCwgcHJvZ3Jlc3M6IDAgfVxuICAgIH1cbn1cbiIsIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZChwYWdlLCBzZXNzaW9uKSB7XG4gICAgY29uc3QgeyBjb3Vyc2VOYW1lIH0gPSBwYWdlLnBhcmFtc1xuICAgIGNvbnN0IHsgbW9kdWxlcywgbGFuZ3VhZ2VOYW1lIH0gPSBhd2FpdCBpbXBvcnQoXG4gICAgICBgLi4vLi4vLi4vY291cnNlcy8ke2NvdXJzZU5hbWV9L2NvdXJzZURhdGEuanNvbmBcbiAgICApXG5cbiAgICByZXR1cm4geyBjb3Vyc2VOYW1lLCBtb2R1bGVzLCBsYW5ndWFnZU5hbWUgfVxuICB9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IFNraWxsQ2FyZCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9Ta2lsbENhcmRcIlxuICBpbXBvcnQgTmF2QmFyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL05hdkJhci5zdmVsdGVcIlxuICBpbXBvcnQgQ29sdW1uIGZyb20gXCJsbHVpcy9Db2x1bW4uc3ZlbHRlXCJcbiAgaW1wb3J0IENvbHVtbnMgZnJvbSBcImxsdWlzL0NvbHVtbnMuc3ZlbHRlXCJcblxuICBleHBvcnQgbGV0IGNvdXJzZU5hbWUgPSBudWxsXG4gIGV4cG9ydCBsZXQgbW9kdWxlcyA9IG51bGxcbiAgZXhwb3J0IGxldCBsYW5ndWFnZU5hbWUgPSBudWxsXG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+TGlicmVMaW5nbyAtIGxlYXJuIHtsYW5ndWFnZU5hbWV9IGZvciBmcmVlPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxOYXZCYXIgZGFyayBoYXNBdXRoIC8+XG5cbnsjZWFjaCBtb2R1bGVzIGFzIHsgdGl0bGUsIHNraWxscyB9fVxuICA8c2VjdGlvbiBjbGFzcz1cInNlY3Rpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICA8aDIgY2xhc3M9XCJpcy1zaXplLTJcIj57dGl0bGV9PC9oMj5cbiAgICAgIDxDb2x1bW5zIG11bHRpbGluZT5cbiAgICAgICAgeyNlYWNoIHNraWxscyBhcyBza2lsbH1cbiAgICAgICAgICA8Q29sdW1uIHNpemVEZXNrdG9wPVwiMS8zXCIgc2l6ZVRhYmxldD1cIjEvMlwiPlxuXG4gICAgICAgICAgICA8U2tpbGxDYXJkXG4gICAgICAgICAgICAgIHsuLi57IC4uLnNraWxsIH19XG4gICAgICAgICAgICAgIHByYWN0aWNlSHJlZj1cIntgL2NvdXJzZS8ke2NvdXJzZU5hbWV9L3NraWxsLyR7c2tpbGwucHJhY3RpY2VIcmVmfWB9XCIgLz5cbiAgICAgICAgICA8L0NvbHVtbj5cbiAgICAgICAgey9lYWNofVxuICAgICAgPC9Db2x1bW5zPlxuICAgIDwvZGl2PlxuICA8L3NlY3Rpb24+XG57L2VhY2h9XG5cbjxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj5cbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICA8Q29sdW1ucz5cbiAgICAgIDxDb2x1bW4+XG4gICAgICAgIDxzdHJvbmc+TGlicmVMaW5nbzwvc3Ryb25nPlxuICAgICAgICBieVxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2thbnRvcmRcIj5Ew6FuaWVsIEvDoW50b3I8L2E+XG4gICAgICAgIGFuZFxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2thbnRvcmQvTGlicmVMaW5nbyNjb250cmlidXRvcnMtXCI+XG4gICAgICAgICAgdmFyaW91cyBjb250cmlidXRvcnNcbiAgICAgICAgPC9hPlxuICAgICAgICAuXG4gICAgICA8L0NvbHVtbj5cbiAgICAgIDxDb2x1bW4+XG4gICAgICAgIFRoZSBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZFxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMFwiPkFHUEwtMy4wLjwvYT5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20va2FudG9yZC9MaWJyZUxpbmdvXCI+XG4gICAgICAgICAgU291cmNlIGNvZGUgYXZhaWxhYmxlIG9uIEdpdEh1Yi5cbiAgICAgICAgPC9hPlxuICAgICAgPC9Db2x1bW4+XG4gICAgICA8Q29sdW1uIC8+XG4gICAgPC9Db2x1bW5zPlxuICAgIDxwPjwvcD5cbiAgPC9kaXY+XG48L2Zvb3Rlcj5cblxuPHN0eWxlPkBrZXlmcmFtZXMgc3BpbkFyb3VuZCB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpOyB9IH1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gIHBhZGRpbmctbGVmdDogMjBweDsgfVxuPC9zdHlsZT5cbiIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=