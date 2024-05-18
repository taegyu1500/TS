import{r as Le,j as ae,R as A}from"./index-BzRYe7T0.js";import{I as St}from"./input-BkKIxgMe.js";import{_ as Et,c as kt,a as pt}from"./button-cc73kDZo.js";import{$ as Ct}from"./index-B17J8msL.js";const Rt=Le.forwardRef((e,s)=>Le.createElement(Ct.label,Et({},e,{ref:s,onMouseDown:t=>{var a;(a=e.onMouseDown)===null||a===void 0||a.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault()}}))),rt=Rt,Lt=pt("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),st=Le.forwardRef(({className:e,...s},t)=>ae.jsx(rt,{ref:t,className:kt(Lt(),e),...s}));st.displayName=rt.displayName;var ce=e=>e.type==="checkbox",ie=e=>e instanceof Date,U=e=>e==null;const it=e=>typeof e=="object";var C=e=>!U(e)&&!Array.isArray(e)&&it(e)&&!ie(e),at=e=>C(e)&&e.target?ce(e.target)?e.target.checked:e.target.value:e,Tt=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,lt=(e,s)=>e.has(Tt(s)),Ut=e=>{const s=e.constructor&&e.constructor.prototype;return C(s)&&s.hasOwnProperty("isPrototypeOf")},Te=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function O(e){let s;const t=Array.isArray(e);if(e instanceof Date)s=new Date(e);else if(e instanceof Set)s=new Set(e);else if(!(Te&&(e instanceof Blob||e instanceof FileList))&&(t||C(e)))if(s=t?[]:{},!t&&!Ut(e))s=e;else for(const a in e)e.hasOwnProperty(a)&&(s[a]=O(e[a]));else return e;return s}var de=e=>Array.isArray(e)?e.filter(Boolean):[],D=e=>e===void 0,f=(e,s,t)=>{if(!s||!C(e))return t;const a=de(s.split(/[,[\].]+?/)).reduce((u,n)=>U(u)?u:u[n],e);return D(a)||a===e?D(e[s])?t:e[s]:a},j=e=>typeof e=="boolean";const be={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},q={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},z={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},ut=A.createContext(null),Ae=()=>A.useContext(ut),Ot=e=>{const{children:s,...t}=e;return A.createElement(ut.Provider,{value:t},s)};var nt=(e,s,t,a=!0)=>{const u={defaultValues:s._defaultValues};for(const n in e)Object.defineProperty(u,n,{get:()=>{const y=n;return s._proxyFormState[y]!==q.all&&(s._proxyFormState[y]=!a||q.all),t&&(t[y]=!0),e[y]}});return u},B=e=>C(e)&&!Object.keys(e).length,ot=(e,s,t,a)=>{t(e);const{name:u,...n}=e;return B(n)||Object.keys(n).length>=Object.keys(s).length||Object.keys(n).find(y=>s[y]===(!a||q.all))},ve=e=>Array.isArray(e)?e:[e],ft=(e,s,t)=>!e||!s||e===s||ve(e).some(a=>a&&(t?a===s:a.startsWith(s)||s.startsWith(a)));function Ue(e){const s=A.useRef(e);s.current=e,A.useEffect(()=>{const t=!e.disabled&&s.current.subject&&s.current.subject.subscribe({next:s.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}function Mt(e){const s=Ae(),{control:t=s.control,disabled:a,name:u,exact:n}=e||{},[y,h]=A.useState(t._formState),w=A.useRef(!0),S=A.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),_=A.useRef(u);return _.current=u,Ue({disabled:a,next:v=>w.current&&ft(_.current,v.name,n)&&ot(v,S.current,t._updateFormState)&&h({...t._formState,...v}),subject:t._subjects.state}),A.useEffect(()=>(w.current=!0,S.current.isValid&&t._updateValid(!0),()=>{w.current=!1}),[t]),nt(y,t,S.current,!1)}var H=e=>typeof e=="string",ct=(e,s,t,a,u)=>H(e)?(a&&s.watch.add(e),f(t,e,u)):Array.isArray(e)?e.map(n=>(a&&s.watch.add(n),f(t,n))):(a&&(s.watchAll=!0),t);function Bt(e){const s=Ae(),{control:t=s.control,name:a,defaultValue:u,disabled:n,exact:y}=e||{},h=A.useRef(a);h.current=a,Ue({disabled:n,subject:t._subjects.values,next:_=>{ft(h.current,_.name,y)&&S(O(ct(h.current,t._names,_.values||t._formValues,!1,u)))}});const[w,S]=A.useState(t._getWatch(a,u));return A.useEffect(()=>t._removeUnmounted()),w}var Oe=e=>/^\w*$/.test(e),dt=e=>de(e.replace(/["|']|\]/g,"").split(/\.|\[/)),x=(e,s,t)=>{let a=-1;const u=Oe(s)?[s]:dt(s),n=u.length,y=n-1;for(;++a<n;){const h=u[a];let w=t;if(a!==y){const S=e[h];w=C(S)||Array.isArray(S)?S:isNaN(+u[a+1])?{}:[]}e[h]=w,e=e[h]}return e};function Nt(e){const s=Ae(),{name:t,disabled:a,control:u=s.control,shouldUnregister:n}=e,y=lt(u._names.array,t),h=Bt({control:u,name:t,defaultValue:f(u._formValues,t,f(u._defaultValues,t,e.defaultValue)),exact:!0}),w=Mt({control:u,name:t}),S=A.useRef(u.register(t,{...e.rules,value:h,...j(e.disabled)?{disabled:e.disabled}:{}}));return A.useEffect(()=>{const _=u._options.shouldUnregister||n,v=(I,W)=>{const L=f(u._fields,I);L&&(L._f.mount=W)};if(v(t,!0),_){const I=O(f(u._options.defaultValues,t));x(u._defaultValues,t,I),D(f(u._formValues,t))&&x(u._formValues,t,I)}return()=>{(y?_&&!u._state.action:_)?u.unregister(t):v(t,!1)}},[t,u,y,n]),A.useEffect(()=>{f(u._fields,t)&&u._updateDisabledField({disabled:a,fields:u._fields,name:t,value:f(u._fields,t)._f.value})},[a,t,u]),{field:{name:t,value:h,...j(a)||w.disabled?{disabled:w.disabled||a}:{},onChange:A.useCallback(_=>S.current.onChange({target:{value:at(_),name:t},type:be.CHANGE}),[t]),onBlur:A.useCallback(()=>S.current.onBlur({target:{value:f(u._formValues,t),name:t},type:be.BLUR}),[t,u]),ref:_=>{const v=f(u._fields,t);v&&_&&(v._f.ref={focus:()=>_.focus(),select:()=>_.select(),setCustomValidity:I=>_.setCustomValidity(I),reportValidity:()=>_.reportValidity()})}},formState:w,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!f(w.errors,t)},isDirty:{enumerable:!0,get:()=>!!f(w.dirtyFields,t)},isTouched:{enumerable:!0,get:()=>!!f(w.touchedFields,t)},isValidating:{enumerable:!0,get:()=>!!f(w.validatingFields,t)},error:{enumerable:!0,get:()=>f(w.errors,t)}})}}const ar=e=>e.render(Nt(e));var Pt=(e,s,t,a,u)=>s?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[a]:u||!0}}:{},ze=e=>({isOnSubmit:!e||e===q.onSubmit,isOnBlur:e===q.onBlur,isOnChange:e===q.onChange,isOnAll:e===q.all,isOnTouch:e===q.onTouched}),Je=(e,s,t)=>!t&&(s.watchAll||s.watch.has(e)||[...s.watch].some(a=>e.startsWith(a)&&/^\.\w+/.test(e.slice(a.length))));const fe=(e,s,t,a)=>{for(const u of t||Object.keys(e)){const n=f(e,u);if(n){const{_f:y,...h}=n;if(y){if(y.refs&&y.refs[0]&&s(y.refs[0],u)&&!a)break;if(y.ref&&s(y.ref,y.name)&&!a)break;fe(h,s)}else C(h)&&fe(h,s)}}};var It=(e,s,t)=>{const a=de(f(e,t));return x(a,"root",s[t]),x(e,t,a),e},Me=e=>e.type==="file",X=e=>typeof e=="function",Ve=e=>{if(!Te)return!1;const s=e?e.ownerDocument:0;return e instanceof(s&&s.defaultView?s.defaultView.HTMLElement:HTMLElement)},_e=e=>H(e),Be=e=>e.type==="radio",Fe=e=>e instanceof RegExp;const Qe={value:!1,isValid:!1},Xe={value:!0,isValid:!0};var yt=e=>{if(Array.isArray(e)){if(e.length>1){const s=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:s,isValid:!!s.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!D(e[0].attributes.value)?D(e[0].value)||e[0].value===""?Xe:{value:e[0].value,isValid:!0}:Xe:Qe}return Qe};const Ye={isValid:!1,value:null};var gt=e=>Array.isArray(e)?e.reduce((s,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:s,Ye):Ye;function Ze(e,s,t="validate"){if(_e(e)||Array.isArray(e)&&e.every(_e)||j(e)&&!e)return{type:t,message:_e(e)?e:"",ref:s}}var se=e=>C(e)&&!Fe(e)?e:{value:e,message:""},et=async(e,s,t,a,u)=>{const{ref:n,refs:y,required:h,maxLength:w,minLength:S,min:_,max:v,pattern:I,validate:W,name:L,valueAsNumber:we,mount:J,disabled:Q}=e._f,V=f(s,L);if(!J||Q)return{};const G=y?y[0]:n,K=b=>{a&&G.reportValidity&&(G.setCustomValidity(j(b)?"":b||""),G.reportValidity())},E={},ee=Be(n),ye=ce(n),Y=ee||ye,te=(we||Me(n))&&D(n.value)&&D(V)||Ve(n)&&n.value===""||V===""||Array.isArray(V)&&!V.length,N=Pt.bind(null,L,t,E),ge=(b,F,k,T=z.maxLength,$=z.minLength)=>{const P=b?F:k;E[L]={type:b?T:$,message:P,ref:n,...N(b?T:$,P)}};if(u?!Array.isArray(V)||!V.length:h&&(!Y&&(te||U(V))||j(V)&&!V||ye&&!yt(y).isValid||ee&&!gt(y).isValid)){const{value:b,message:F}=_e(h)?{value:!!h,message:h}:se(h);if(b&&(E[L]={type:z.required,message:F,ref:G,...N(z.required,F)},!t))return K(F),E}if(!te&&(!U(_)||!U(v))){let b,F;const k=se(v),T=se(_);if(!U(V)&&!isNaN(V)){const $=n.valueAsNumber||V&&+V;U(k.value)||(b=$>k.value),U(T.value)||(F=$<T.value)}else{const $=n.valueAsDate||new Date(V),P=ne=>new Date(new Date().toDateString()+" "+ne),le=n.type=="time",ue=n.type=="week";H(k.value)&&V&&(b=le?P(V)>P(k.value):ue?V>k.value:$>new Date(k.value)),H(T.value)&&V&&(F=le?P(V)<P(T.value):ue?V<T.value:$<new Date(T.value))}if((b||F)&&(ge(!!b,k.message,T.message,z.max,z.min),!t))return K(E[L].message),E}if((w||S)&&!te&&(H(V)||u&&Array.isArray(V))){const b=se(w),F=se(S),k=!U(b.value)&&V.length>+b.value,T=!U(F.value)&&V.length<+F.value;if((k||T)&&(ge(k,b.message,F.message),!t))return K(E[L].message),E}if(I&&!te&&H(V)){const{value:b,message:F}=se(I);if(Fe(b)&&!V.match(b)&&(E[L]={type:z.pattern,message:F,ref:n,...N(z.pattern,F)},!t))return K(F),E}if(W){if(X(W)){const b=await W(V,s),F=Ze(b,G);if(F&&(E[L]={...F,...N(z.validate,F.message)},!t))return K(F.message),E}else if(C(W)){let b={};for(const F in W){if(!B(b)&&!t)break;const k=Ze(await W[F](V,s),G,F);k&&(b={...k,...N(F,k.message)},K(k.message),t&&(E[L]=b))}if(!B(b)&&(E[L]={ref:G,...b},!t))return E}}return K(!0),E};function $t(e,s){const t=s.slice(0,-1).length;let a=0;for(;a<t;)e=D(e)?a++:e[s[a++]];return e}function jt(e){for(const s in e)if(e.hasOwnProperty(s)&&!D(e[s]))return!1;return!0}function p(e,s){const t=Array.isArray(s)?s:Oe(s)?[s]:dt(s),a=t.length===1?e:$t(e,t),u=t.length-1,n=t[u];return a&&delete a[n],u!==0&&(C(a)&&B(a)||Array.isArray(a)&&jt(a))&&p(e,t.slice(0,-1)),e}var pe=()=>{let e=[];return{get observers(){return e},next:u=>{for(const n of e)n.next&&n.next(u)},subscribe:u=>(e.push(u),{unsubscribe:()=>{e=e.filter(n=>n!==u)}}),unsubscribe:()=>{e=[]}}},me=e=>U(e)||!it(e);function Z(e,s){if(me(e)||me(s))return e===s;if(ie(e)&&ie(s))return e.getTime()===s.getTime();const t=Object.keys(e),a=Object.keys(s);if(t.length!==a.length)return!1;for(const u of t){const n=e[u];if(!a.includes(u))return!1;if(u!=="ref"){const y=s[u];if(ie(n)&&ie(y)||C(n)&&C(y)||Array.isArray(n)&&Array.isArray(y)?!Z(n,y):n!==y)return!1}}return!0}var ht=e=>e.type==="select-multiple",qt=e=>Be(e)||ce(e),Ce=e=>Ve(e)&&e.isConnected,vt=e=>{for(const s in e)if(X(e[s]))return!0;return!1};function xe(e,s={}){const t=Array.isArray(e);if(C(e)||t)for(const a in e)Array.isArray(e[a])||C(e[a])&&!vt(e[a])?(s[a]=Array.isArray(e[a])?[]:{},xe(e[a],s[a])):U(e[a])||(s[a]=!0);return s}function _t(e,s,t){const a=Array.isArray(e);if(C(e)||a)for(const u in e)Array.isArray(e[u])||C(e[u])&&!vt(e[u])?D(s)||me(t[u])?t[u]=Array.isArray(e[u])?xe(e[u],[]):{...xe(e[u])}:_t(e[u],U(s)?{}:s[u],t[u]):t[u]=!Z(e[u],s[u]);return t}var he=(e,s)=>_t(e,s,xe(s)),bt=(e,{valueAsNumber:s,valueAsDate:t,setValueAs:a})=>D(e)?e:s?e===""?NaN:e&&+e:t&&H(e)?new Date(e):a?a(e):e;function Re(e){const s=e.ref;if(!(e.refs?e.refs.every(t=>t.disabled):s.disabled))return Me(s)?s.files:Be(s)?gt(e.refs).value:ht(s)?[...s.selectedOptions].map(({value:t})=>t):ce(s)?yt(e.refs).value:bt(D(s.value)?e.ref.value:s.value,e)}var Wt=(e,s,t,a)=>{const u={};for(const n of e){const y=f(s,n);y&&x(u,n,y._f)}return{criteriaMode:t,names:[...e],fields:u,shouldUseNativeValidation:a}},oe=e=>D(e)?e:Fe(e)?e.source:C(e)?Fe(e.value)?e.value.source:e.value:e,Ht=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function tt(e,s,t){const a=f(e,t);if(a||Oe(t))return{error:a,name:t};const u=t.split(".");for(;u.length;){const n=u.join("."),y=f(s,n),h=f(e,n);if(y&&!Array.isArray(y)&&t!==n)return{name:t};if(h&&h.type)return{name:n,error:h};u.pop()}return{name:t}}var Gt=(e,s,t,a,u)=>u.isOnAll?!1:!t&&u.isOnTouch?!(s||e):(t?a.isOnBlur:u.isOnBlur)?!e:(t?a.isOnChange:u.isOnChange)?e:!0,Kt=(e,s)=>!de(f(e,s)).length&&p(e,s);const zt={mode:q.onSubmit,reValidateMode:q.onChange,shouldFocusError:!0};function Jt(e={}){let s={...zt,...e},t={submitCount:0,isDirty:!1,isLoading:X(s.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:s.errors||{},disabled:s.disabled||!1},a={},u=C(s.defaultValues)||C(s.values)?O(s.defaultValues||s.values)||{}:{},n=s.shouldUnregister?{}:O(u),y={action:!1,mount:!1,watch:!1},h={mount:new Set,unMount:new Set,array:new Set,watch:new Set},w,S=0;const _={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={values:pe(),array:pe(),state:pe()},I=ze(s.mode),W=ze(s.reValidateMode),L=s.criteriaMode===q.all,we=r=>i=>{clearTimeout(S),S=setTimeout(r,i)},J=async r=>{if(_.isValid||r){const i=s.resolver?B((await Y()).errors):await N(a,!0);i!==t.isValid&&v.state.next({isValid:i})}},Q=(r,i)=>{(_.isValidating||_.validatingFields)&&((r||Array.from(h.mount)).forEach(l=>{l&&(i?x(t.validatingFields,l,i):p(t.validatingFields,l))}),v.state.next({validatingFields:t.validatingFields,isValidating:!B(t.validatingFields)}))},V=(r,i=[],l,d,c=!0,o=!0)=>{if(d&&l){if(y.action=!0,o&&Array.isArray(f(a,r))){const g=l(f(a,r),d.argA,d.argB);c&&x(a,r,g)}if(o&&Array.isArray(f(t.errors,r))){const g=l(f(t.errors,r),d.argA,d.argB);c&&x(t.errors,r,g),Kt(t.errors,r)}if(_.touchedFields&&o&&Array.isArray(f(t.touchedFields,r))){const g=l(f(t.touchedFields,r),d.argA,d.argB);c&&x(t.touchedFields,r,g)}_.dirtyFields&&(t.dirtyFields=he(u,n)),v.state.next({name:r,isDirty:b(r,i),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else x(n,r,i)},G=(r,i)=>{x(t.errors,r,i),v.state.next({errors:t.errors})},K=r=>{t.errors=r,v.state.next({errors:t.errors,isValid:!1})},E=(r,i,l,d)=>{const c=f(a,r);if(c){const o=f(n,r,D(l)?f(u,r):l);D(o)||d&&d.defaultChecked||i?x(n,r,i?o:Re(c._f)):T(r,o),y.mount&&J()}},ee=(r,i,l,d,c)=>{let o=!1,g=!1;const m={name:r},R=!!(f(a,r)&&f(a,r)._f.disabled);if(!l||d){_.isDirty&&(g=t.isDirty,t.isDirty=m.isDirty=b(),o=g!==m.isDirty);const M=R||Z(f(u,r),i);g=!!(!R&&f(t.dirtyFields,r)),M||R?p(t.dirtyFields,r):x(t.dirtyFields,r,!0),m.dirtyFields=t.dirtyFields,o=o||_.dirtyFields&&g!==!M}if(l){const M=f(t.touchedFields,r);M||(x(t.touchedFields,r,l),m.touchedFields=t.touchedFields,o=o||_.touchedFields&&M!==l)}return o&&c&&v.state.next(m),o?m:{}},ye=(r,i,l,d)=>{const c=f(t.errors,r),o=_.isValid&&j(i)&&t.isValid!==i;if(e.delayError&&l?(w=we(()=>G(r,l)),w(e.delayError)):(clearTimeout(S),w=null,l?x(t.errors,r,l):p(t.errors,r)),(l?!Z(c,l):c)||!B(d)||o){const g={...d,...o&&j(i)?{isValid:i}:{},errors:t.errors,name:r};t={...t,...g},v.state.next(g)}},Y=async r=>{Q(r,!0);const i=await s.resolver(n,s.context,Wt(r||h.mount,a,s.criteriaMode,s.shouldUseNativeValidation));return Q(r),i},te=async r=>{const{errors:i}=await Y(r);if(r)for(const l of r){const d=f(i,l);d?x(t.errors,l,d):p(t.errors,l)}else t.errors=i;return i},N=async(r,i,l={valid:!0})=>{for(const d in r){const c=r[d];if(c){const{_f:o,...g}=c;if(o){const m=h.array.has(o.name);Q([d],!0);const R=await et(c,n,L,s.shouldUseNativeValidation&&!i,m);if(Q([d]),R[o.name]&&(l.valid=!1,i))break;!i&&(f(R,o.name)?m?It(t.errors,R,o.name):x(t.errors,o.name,R[o.name]):p(t.errors,o.name))}g&&await N(g,i,l)}}return l.valid},ge=()=>{for(const r of h.unMount){const i=f(a,r);i&&(i._f.refs?i._f.refs.every(l=>!Ce(l)):!Ce(i._f.ref))&&De(r)}h.unMount=new Set},b=(r,i)=>(r&&i&&x(n,r,i),!Z(Ne(),u)),F=(r,i,l)=>ct(r,h,{...y.mount?n:D(i)?u:H(r)?{[r]:i}:i},l,i),k=r=>de(f(y.mount?n:u,r,e.shouldUnregister?f(u,r,[]):[])),T=(r,i,l={})=>{const d=f(a,r);let c=i;if(d){const o=d._f;o&&(!o.disabled&&x(n,r,bt(i,o)),c=Ve(o.ref)&&U(i)?"":i,ht(o.ref)?[...o.ref.options].forEach(g=>g.selected=c.includes(g.value)):o.refs?ce(o.ref)?o.refs.length>1?o.refs.forEach(g=>(!g.defaultChecked||!g.disabled)&&(g.checked=Array.isArray(c)?!!c.find(m=>m===g.value):c===g.value)):o.refs[0]&&(o.refs[0].checked=!!c):o.refs.forEach(g=>g.checked=g.value===c):Me(o.ref)?o.ref.value="":(o.ref.value=c,o.ref.type||v.values.next({name:r,values:{...n}})))}(l.shouldDirty||l.shouldTouch)&&ee(r,c,l.shouldTouch,l.shouldDirty,!0),l.shouldValidate&&ne(r)},$=(r,i,l)=>{for(const d in i){const c=i[d],o=`${r}.${d}`,g=f(a,o);(h.array.has(r)||!me(c)||g&&!g._f)&&!ie(c)?$(o,c,l):T(o,c,l)}},P=(r,i,l={})=>{const d=f(a,r),c=h.array.has(r),o=O(i);x(n,r,o),c?(v.array.next({name:r,values:{...n}}),(_.isDirty||_.dirtyFields)&&l.shouldDirty&&v.state.next({name:r,dirtyFields:he(u,n),isDirty:b(r,o)})):d&&!d._f&&!U(o)?$(r,o,l):T(r,o,l),Je(r,h)&&v.state.next({...t}),v.values.next({name:y.mount?r:void 0,values:{...n}})},le=async r=>{y.mount=!0;const i=r.target;let l=i.name,d=!0;const c=f(a,l),o=()=>i.type?Re(c._f):at(r),g=m=>{d=Number.isNaN(m)||m===f(n,l,m)};if(c){let m,R;const M=o(),re=r.type===be.BLUR||r.type===be.FOCUS_OUT,At=!Ht(c._f)&&!s.resolver&&!f(t.errors,l)&&!c._f.deps||Gt(re,f(t.touchedFields,l),t.isSubmitted,W,I),Ee=Je(l,h,re);x(n,l,M),re?(c._f.onBlur&&c._f.onBlur(r),w&&w(0)):c._f.onChange&&c._f.onChange(r);const ke=ee(l,M,re,!1),wt=!B(ke)||Ee;if(!re&&v.values.next({name:l,type:r.type,values:{...n}}),At)return _.isValid&&J(),wt&&v.state.next({name:l,...Ee?{}:ke});if(!re&&Ee&&v.state.next({...t}),s.resolver){const{errors:Ge}=await Y([l]);if(g(M),d){const Dt=tt(t.errors,a,l),Ke=tt(Ge,a,Dt.name||l);m=Ke.error,l=Ke.name,R=B(Ge)}}else Q([l],!0),m=(await et(c,n,L,s.shouldUseNativeValidation))[l],Q([l]),g(M),d&&(m?R=!1:_.isValid&&(R=await N(a,!0)));d&&(c._f.deps&&ne(c._f.deps),ye(l,R,m,ke))}},ue=(r,i)=>{if(f(t.errors,i)&&r.focus)return r.focus(),1},ne=async(r,i={})=>{let l,d;const c=ve(r);if(s.resolver){const o=await te(D(r)?r:c);l=B(o),d=r?!c.some(g=>f(o,g)):l}else r?(d=(await Promise.all(c.map(async o=>{const g=f(a,o);return await N(g&&g._f?{[o]:g}:g)}))).every(Boolean),!(!d&&!t.isValid)&&J()):d=l=await N(a);return v.state.next({...!H(r)||_.isValid&&l!==t.isValid?{}:{name:r},...s.resolver||!r?{isValid:l}:{},errors:t.errors}),i.shouldFocus&&!d&&fe(a,ue,r?c:h.mount),d},Ne=r=>{const i={...u,...y.mount?n:{}};return D(r)?i:H(r)?f(i,r):r.map(l=>f(i,l))},Pe=(r,i)=>({invalid:!!f((i||t).errors,r),isDirty:!!f((i||t).dirtyFields,r),isTouched:!!f((i||t).touchedFields,r),isValidating:!!f((i||t).validatingFields,r),error:f((i||t).errors,r)}),Vt=r=>{r&&ve(r).forEach(i=>p(t.errors,i)),v.state.next({errors:r?t.errors:{}})},Ie=(r,i,l)=>{const d=(f(a,r,{_f:{}})._f||{}).ref;x(t.errors,r,{...i,ref:d}),v.state.next({name:r,errors:t.errors,isValid:!1}),l&&l.shouldFocus&&d&&d.focus&&d.focus()},Ft=(r,i)=>X(r)?v.values.subscribe({next:l=>r(F(void 0,i),l)}):F(r,i,!0),De=(r,i={})=>{for(const l of r?ve(r):h.mount)h.mount.delete(l),h.array.delete(l),i.keepValue||(p(a,l),p(n,l)),!i.keepError&&p(t.errors,l),!i.keepDirty&&p(t.dirtyFields,l),!i.keepTouched&&p(t.touchedFields,l),!i.keepIsValidating&&p(t.validatingFields,l),!s.shouldUnregister&&!i.keepDefaultValue&&p(u,l);v.values.next({values:{...n}}),v.state.next({...t,...i.keepDirty?{isDirty:b()}:{}}),!i.keepIsValid&&J()},$e=({disabled:r,name:i,field:l,fields:d,value:c})=>{if(j(r)){const o=r?void 0:D(c)?Re(l?l._f:f(d,i)._f):c;x(n,i,o),ee(i,o,!1,!1,!0)}},Se=(r,i={})=>{let l=f(a,r);const d=j(i.disabled);return x(a,r,{...l||{},_f:{...l&&l._f?l._f:{ref:{name:r}},name:r,mount:!0,...i}}),h.mount.add(r),l?$e({field:l,disabled:i.disabled,name:r,value:i.value}):E(r,!0,i.value),{...d?{disabled:i.disabled}:{},...s.progressive?{required:!!i.required,min:oe(i.min),max:oe(i.max),minLength:oe(i.minLength),maxLength:oe(i.maxLength),pattern:oe(i.pattern)}:{},name:r,onChange:le,onBlur:le,ref:c=>{if(c){Se(r,i),l=f(a,r);const o=D(c.value)&&c.querySelectorAll&&c.querySelectorAll("input,select,textarea")[0]||c,g=qt(o),m=l._f.refs||[];if(g?m.find(R=>R===o):o===l._f.ref)return;x(a,r,{_f:{...l._f,...g?{refs:[...m.filter(Ce),o,...Array.isArray(f(u,r))?[{}]:[]],ref:{type:o.type,name:r}}:{ref:o}}}),E(r,!1,void 0,o)}else l=f(a,r,{}),l._f&&(l._f.mount=!1),(s.shouldUnregister||i.shouldUnregister)&&!(lt(h.array,r)&&y.action)&&h.unMount.add(r)}}},je=()=>s.shouldFocusError&&fe(a,ue,h.mount),mt=r=>{j(r)&&(v.state.next({disabled:r}),fe(a,(i,l)=>{let d=r;const c=f(a,l);c&&j(c._f.disabled)&&(d||(d=c._f.disabled)),i.disabled=d},0,!1))},qe=(r,i)=>async l=>{let d;l&&(l.preventDefault&&l.preventDefault(),l.persist&&l.persist());let c=O(n);if(v.state.next({isSubmitting:!0}),s.resolver){const{errors:o,values:g}=await Y();t.errors=o,c=g}else await N(a);if(p(t.errors,"root"),B(t.errors)){v.state.next({errors:{}});try{await r(c,l)}catch(o){d=o}}else i&&await i({...t.errors},l),je(),setTimeout(je);if(v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:B(t.errors)&&!d,submitCount:t.submitCount+1,errors:t.errors}),d)throw d},xt=(r,i={})=>{f(a,r)&&(D(i.defaultValue)?P(r,O(f(u,r))):(P(r,i.defaultValue),x(u,r,O(i.defaultValue))),i.keepTouched||p(t.touchedFields,r),i.keepDirty||(p(t.dirtyFields,r),t.isDirty=i.defaultValue?b(r,O(f(u,r))):b()),i.keepError||(p(t.errors,r),_.isValid&&J()),v.state.next({...t}))},We=(r,i={})=>{const l=r?O(r):u,d=O(l),c=B(r),o=c?u:d;if(i.keepDefaultValues||(u=l),!i.keepValues){if(i.keepDirtyValues)for(const g of h.mount)f(t.dirtyFields,g)?x(o,g,f(n,g)):P(g,f(o,g));else{if(Te&&D(r))for(const g of h.mount){const m=f(a,g);if(m&&m._f){const R=Array.isArray(m._f.refs)?m._f.refs[0]:m._f.ref;if(Ve(R)){const M=R.closest("form");if(M){M.reset();break}}}}a={}}n=e.shouldUnregister?i.keepDefaultValues?O(u):{}:O(o),v.array.next({values:{...o}}),v.values.next({values:{...o}})}h={mount:i.keepDirtyValues?h.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},y.mount=!_.isValid||!!i.keepIsValid||!!i.keepDirtyValues,y.watch=!!e.shouldUnregister,v.state.next({submitCount:i.keepSubmitCount?t.submitCount:0,isDirty:c?!1:i.keepDirty?t.isDirty:!!(i.keepDefaultValues&&!Z(r,u)),isSubmitted:i.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:c?[]:i.keepDirtyValues?i.keepDefaultValues&&n?he(u,n):t.dirtyFields:i.keepDefaultValues&&r?he(u,r):{},touchedFields:i.keepTouched?t.touchedFields:{},errors:i.keepErrors?t.errors:{},isSubmitSuccessful:i.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},He=(r,i)=>We(X(r)?r(n):r,i);return{control:{register:Se,unregister:De,getFieldState:Pe,handleSubmit:qe,setError:Ie,_executeSchema:Y,_getWatch:F,_getDirty:b,_updateValid:J,_removeUnmounted:ge,_updateFieldArray:V,_updateDisabledField:$e,_getFieldArray:k,_reset:We,_resetDefaultValues:()=>X(s.defaultValues)&&s.defaultValues().then(r=>{He(r,s.resetOptions),v.state.next({isLoading:!1})}),_updateFormState:r=>{t={...t,...r}},_disableForm:mt,_subjects:v,_proxyFormState:_,_setErrors:K,get _fields(){return a},get _formValues(){return n},get _state(){return y},set _state(r){y=r},get _defaultValues(){return u},get _names(){return h},set _names(r){h=r},get _formState(){return t},set _formState(r){t=r},get _options(){return s},set _options(r){s={...s,...r}}},trigger:ne,register:Se,handleSubmit:qe,watch:Ft,setValue:P,getValues:Ne,reset:He,resetField:xt,clearErrors:Vt,unregister:De,setError:Ie,setFocus:(r,i={})=>{const l=f(a,r),d=l&&l._f;if(d){const c=d.refs?d.refs[0]:d.ref;c.focus&&(c.focus(),i.shouldSelect&&c.select())}},getFieldState:Pe}}function Qt(e={}){const s=A.useRef(),t=A.useRef(),[a,u]=A.useState({isDirty:!1,isValidating:!1,isLoading:X(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:X(e.defaultValues)?void 0:e.defaultValues});s.current||(s.current={...Jt(e),formState:a});const n=s.current.control;return n._options=e,Ue({subject:n._subjects.state,next:y=>{ot(y,n._proxyFormState,n._updateFormState,!0)&&u({...n._formState})}}),A.useEffect(()=>n._disableForm(e.disabled),[n,e.disabled]),A.useEffect(()=>{if(n._proxyFormState.isDirty){const y=n._getDirty();y!==a.isDirty&&n._subjects.state.next({isDirty:y})}},[n,a.isDirty]),A.useEffect(()=>{e.values&&!Z(e.values,t.current)?(n._reset(e.values,n._options.resetOptions),t.current=e.values,u(y=>({...y}))):n._resetDefaultValues()},[e.values,n]),A.useEffect(()=>{e.errors&&n._setErrors(e.errors)},[e.errors,n]),A.useEffect(()=>{n._state.mount||(n._updateValid(),n._state.mount=!0),n._state.watch&&(n._state.watch=!1,n._subjects.state.next({...n._formState})),n._removeUnmounted()}),A.useEffect(()=>{e.shouldUnregister&&n._subjects.values.next({values:n._getWatch()})},[e.shouldUnregister,n]),s.current.formState=nt(a,n),s.current}function lr({label:e,id:s,placeholder:t,...a}){const{register:u}=Ae();return ae.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[ae.jsx(st,{htmlFor:s,children:e}),ae.jsx(St,{type:s=="password"?"password":"text",id:s,placeholder:t,...u(s),...a})]})}const Xt=({children:e,onSubmit:s,formOptions:t})=>{const a=Qt(t);return ae.jsx(Ot,{...a,children:ae.jsx("form",{onSubmit:a.handleSubmit(s),children:e})})},ur=Xt;export{ar as C,ur as G,st as L,lr as T,Pt as a,f as g,x as s,Ae as u};
