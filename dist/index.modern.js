const e=(e,n)=>t(n).format(e),t=e=>new Intl.DateTimeFormat(e.language,{weekday:"long",month:"long",day:"numeric"}),n=(e,t)=>i(t).format(e),i=e=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"}),r=(e,t)=>a(t).format(e),a=e=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric"}),o=(e,t)=>u(t).format(e),u=e=>new Intl.DateTimeFormat(e.language,{day:"numeric",month:"short"}),c=(e,t)=>s(t).format(e),s=e=>new Intl.DateTimeFormat(e.language,{month:"long",year:"numeric"}),m=(e,t)=>l(t).format(e),l=e=>new Intl.DateTimeFormat(e.language,{month:"long"}),d=(e,t)=>g(t).format(e),g=e=>new Intl.DateTimeFormat(e.language,{year:"numeric"});var h,f;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(h||(h={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(f||(f={}));const p=e=>{if(e.time_format===f.language||e.time_format===f.system){const t=e.time_format===f.language?e.language:void 0,n=(new Date).toLocaleString(t);return n.includes("AM")||n.includes("PM")}return e.time_format===f.am_pm},b=(e,t)=>y(t).format(e),y=e=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:p(e)?"numeric":"2-digit",minute:"2-digit",hour12:p(e)}),_=(e,t)=>w(t).format(e),w=e=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:p(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:p(e)}),v=(e,t)=>k(t).format(e),k=e=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:p(e)}),x=(e,t)=>D(t).format(e),D=e=>new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:p(e)}),S=(e,t)=>F(t).format(e),F=e=>new Intl.DateTimeFormat(e.language,{hour:p(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:p(e)}),M=(e,t)=>T(t).format(e),T=e=>new Intl.DateTimeFormat(e.language,{hour:p(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:p(e)});function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}const $={second:45,minute:45,hour:22,day:5},N=(e,t,n,i=!0)=>{const r=function(e,t=Date.now(),n={}){const i=I({},$,n||{}),r=(+e-+t)/1e3;if(Math.abs(r)<i.second)return{value:Math.round(r),unit:"second"};const a=r/60;if(Math.abs(a)<i.minute)return{value:Math.round(a),unit:"minute"};const o=r/3600;if(Math.abs(o)<i.hour)return{value:Math.round(o),unit:"hour"};const u=r/86400;if(Math.abs(u)<i.day)return{value:Math.round(u),unit:"day"};const c=new Date(e),s=new Date(t),m=c.getFullYear()-s.getFullYear();if(Math.round(Math.abs(m))>0)return{value:Math.round(m),unit:"year"};const l=12*m+c.getMonth()-s.getMonth();return Math.round(Math.abs(l))>0?{value:Math.round(l),unit:"month"}:{value:Math.round(r/604800),unit:"week"}}(e,n);return i?(e=>new Intl.RelativeTimeFormat(e.language,{numeric:"auto"}))(t).format(r.value,r.unit):Intl.NumberFormat(t.language,{style:"unit",unit:r.unit,unitDisplay:"long"}).format(Math.abs(r.value))};function q(e){let t=function(e){const t=e.split(":").map(Number);return 3600*t[0]+60*t[1]+t[2]}(e.attributes.remaining);if("active"===e.state){const n=(new Date).getTime(),i=new Date(e.last_changed).getTime();t=Math.max(t-(n-i)/1e3,0)}return t}const C=(e,t,n,i=!1)=>{e._themes||(e._themes={});let r=t.default_theme;("default"===n||n&&t.themes[n])&&(r=n);const a=I({},e._themes);if("default"!==r){const n=t.themes[r];Object.keys(n).forEach(t=>{const i="--"+t;e._themes[i]="",a[i]=n[t]})}if(e.updateStyles?e.updateStyles(a):window.ShadyCSS&&window.ShadyCSS.styleSubtree(e,a),!i)return;const o=document.querySelector("meta[name=theme-color]");if(o){o.hasAttribute("default-content")||o.setAttribute("default-content",o.getAttribute("content"));const e=a["--primary-color"]||o.getAttribute("default-content");o.setAttribute("content",e)}},O=e=>"function"==typeof e.getCardSize?e.getCardSize():4;function A(e){return e.substr(0,e.indexOf("."))}function E(e){return e.substr(e.indexOf(".")+1)}function j(e){var t;const n=(null==e||null==(t=e.locale)?void 0:t.language)||"en";return e.translationMetadata.translations[n]&&e.translationMetadata.translations[n].isRTL||!1}function R(e){return j(e)?"rtl":"ltr"}function z(e){return A(e.entity_id)}const L=e=>!!e.attributes.unit_of_measurement||!!e.attributes.state_class,P=e=>{switch(e.number_format){case h.comma_decimal:return["en-US","en"];case h.decimal_comma:return["de","es","it"];case h.space_comma:return["fr","sv","cs"];case h.system:return;default:return e.language}},U=(e,t=2)=>Math.round(e*10**t)/10**t,Y=(e,t,n)=>{const i=t?P(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==h.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(i,B(e,n)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,B(e,n)).format(Number(e))}return"string"==typeof e?e:`${U(e,null==n?void 0:n.maximumFractionDigits).toString()}${"currency"===(null==n?void 0:n.style)?` ${n.currency}`:""}`},B=(e,t)=>{const n=I({maximumFractionDigits:2},t);if("string"!=typeof e)return n;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){const t=e.indexOf(".")>-1?e.split(".")[1].length:0;n.minimumFractionDigits=t,n.maximumFractionDigits=t}return n},H=(e,t,i,r)=>{const a=void 0!==r?r:t.state;if("unknown"===a||"unavailable"===a)return e(`state.default.${a}`);if(L(t)){if("monetary"===t.attributes.device_class)try{return Y(a,i,{style:"currency",currency:t.attributes.unit_of_measurement})}catch(e){}return`${Y(a,i)}${t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:""}`}const o=z(t);if("input_datetime"===o){if(void 0===r){let e;return t.attributes.has_date&&t.attributes.has_time?(e=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),b(e,i)):t.attributes.has_date?(e=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),n(e,i)):t.attributes.has_time?(e=new Date,e.setHours(t.attributes.hour,t.attributes.minute),x(e,i)):t.state}try{const e=r.split(" ");if(2===e.length)return b(new Date(e.join("T")),i);if(1===e.length){if(r.includes("-"))return n(new Date(`${r}T00:00`),i);if(r.includes(":")){const e=new Date;return x(new Date(`${e.toISOString().split("T")[0]}T${r}`),i)}}return r}catch(e){return r}}return"humidifier"===o&&"on"===a&&t.attributes.humidity?`${t.attributes.humidity} %`:"counter"===o||"number"===o||"input_number"===o?Y(a,i):t.attributes.device_class&&e(`component.${o}.state.${t.attributes.device_class}.${a}`)||e(`component.${o}.state._.${a}`)||a},V="mdi:bookmark",W="lovelace",G=["climate","cover","configurator","input_select","input_number","input_text","lock","media_player","scene","script","timer","vacuum","water_heater","weblink"],J=["alarm_control_panel","automation","camera","climate","configurator","cover","fan","group","history_graph","input_datetime","light","lock","media_player","script","sun","updater","vacuum","water_heater","weather"],K=["input_number","input_select","input_text","scene","weblink"],Q=["camera","configurator","history_graph","scene"],X=["closed","locked","off"],Z=new Set(["fan","input_boolean","light","switch","group","automation"]),ee="°C",te="°F",ne="group.default_view",ie=(e,t,n,i)=>{i=i||{},n=null==n?{}:n;const r=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=n,e.dispatchEvent(r),r},re=new Set(["call-service","divider","section","weblink","cast","select"]),ae={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},oe=(e,t=!1)=>{const n=(e,t)=>i("hui-error-card",{type:"error",error:e,config:t}),i=(e,t)=>{const i=window.document.createElement(e);try{if(!i.setConfig)return;i.setConfig(t)}catch(i){return console.error(e,i),n(i.message,t)}return i};if(!e||"object"!=typeof e||!t&&!e.type)return n("No type defined",e);let r=e.type;if(r&&r.startsWith("custom:"))r=r.substr("custom:".length);else if(t)if(re.has(r))r=`hui-${r}-row`;else{if(!e.entity)return n("Invalid config given.",e);const t=e.entity.split(".",1)[0];r=`hui-${ae[t]||"text"}-entity-row`}else r=`hui-${r}-card`;if(customElements.get(r))return i(r,e);const a=n(`Custom element doesn't exist: ${e.type}.`,e);a.style.display="None";const o=setTimeout(()=>{a.style.display=""},2e3);return customElements.whenDefined(e.type).then(()=>{clearTimeout(o),ie(a,"ll-rebuild",{},a)}),a},ue=(e,t,n=!1)=>{let i;return function(...r){const a=this,o=n&&!i;clearTimeout(i),i=setTimeout(()=>{i=null,n||e.apply(a,r)},t),o&&e.apply(a,r)}},ce={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function se(e,t){if(e in ce)return ce[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}const me=(e,t)=>{const n=t.value||t,i=t.attribute?e.attributes[t.attribute]:e.state;switch(t.operator||"=="){case"==":return i===n;case"<=":return i<=n;case"<":return i<n;case">=":return i>=n;case">":return i>n;case"!=":return i!==n;case"regex":return i.match(n);default:return!1}},le=e=>{ie(window,"haptic",e)},de=(e,t,n=!1)=>{n?history.replaceState(null,"",t):history.pushState(null,"",t),ie(window,"location-changed",{replace:n})},ge=(e,t,n=!0)=>{const i=A(t),r="group"===i?"homeassistant":i;let a;switch(i){case"lock":a=n?"unlock":"lock";break;case"cover":a=n?"open_cover":"close_cover";break;default:a=n?"turn_on":"turn_off"}return e.callService(r,a,{entity_id:t})},he=(e,t)=>{const n=X.includes(e.states[t].state);return ge(e,t,n)},fe=(e,t,n,i)=>{if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(e=>e.user===t.user.id)||(le("warning"),confirm(i.confirmation.text||`Are you sure you want to ${i.action}?`)))switch(i.action){case"more-info":(n.entity||n.camera_image)&&ie(e,"hass-more-info",{entityId:n.entity?n.entity:n.camera_image});break;case"navigate":i.navigation_path&&de(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":n.entity&&(he(t,n.entity),le("success"));break;case"call-service":{if(!i.service)return void le("failure");const[e,n]=i.service.split(".",2);t.callService(e,n,i.service_data,i.target),le("success");break}case"fire-dom-event":ie(e,"ll-custom",i)}},pe=(e,t,n,i)=>{let r;"double_tap"===i&&n.double_tap_action?r=n.double_tap_action:"hold"===i&&n.hold_action?r=n.hold_action:"tap"===i&&n.tap_action&&(r=n.tap_action),fe(e,t,n,r)},be=(e,t,n,i,r)=>{let a;if(r&&n.double_tap_action?a=n.double_tap_action:i&&n.hold_action?a=n.hold_action:!i&&n.tap_action&&(a=n.tap_action),a||(a={action:"more-info"}),!a.confirmation||a.confirmation.exemptions&&a.confirmation.exemptions.some(e=>e.user===t.user.id)||confirm(a.confirmation.text||`Are you sure you want to ${a.action}?`))switch(a.action){case"more-info":(a.entity||n.entity||n.camera_image)&&(ie(e,"hass-more-info",{entityId:a.entity?a.entity:n.entity?n.entity:n.camera_image}),a.haptic&&le(a.haptic));break;case"navigate":a.navigation_path&&(de(0,a.navigation_path),a.haptic&&le(a.haptic));break;case"url":a.url_path&&window.open(a.url_path),a.haptic&&le(a.haptic);break;case"toggle":n.entity&&(he(t,n.entity),a.haptic&&le(a.haptic));break;case"call-service":{if(!a.service)return;const[e,i]=a.service.split(".",2),r=I({},a.service_data);"entity"===r.entity_id&&(r.entity_id=n.entity),t.callService(e,i,r,a.target),a.haptic&&le(a.haptic);break}case"fire-dom-event":ie(e,"ll-custom",a),a.haptic&&le(a.haptic)}};function ye(e){return void 0!==e&&"none"!==e.action}function _e(e,t,n){if(t.has("config")||n)return!0;if(e.config.entity){const n=t.get("hass");return!n||n.states[e.config.entity]!==e.hass.states[e.config.entity]}return!1}function we(e){return void 0!==e&&"none"!==e.action}const ve=(e,t,n=!0)=>{const i={};t.forEach(t=>{if(X.includes(e.states[t].state)===n){const e=A(t),n=["cover","lock"].includes(e)?e:"homeassistant";n in i||(i[n]=[]),i[n].push(t)}}),Object.keys(i).forEach(t=>{let r;switch(t){case"lock":r=n?"unlock":"lock";break;case"cover":r=n?"open_cover":"close_cover";break;default:r=n?"turn_on":"turn_off"}e.callService(t,r,{entity_id:i[t]})})},ke=()=>{let e=document.querySelector("home-assistant");if(e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("ha-drawer"),e=e&&e.querySelector("partial-panel-resolver"),e=e&&e.shadowRoot||e,e=e&&e.querySelector("ha-panel-lovelace"),e=e&&e.shadowRoot,e=e&&e.querySelector("hui-root"),e){const t=e.lovelace;return t.current_view=e.___curView,t}return null},xe={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},De={binary_sensor:(e,t)=>{const n="off"===e;switch(null==t?void 0:t.attributes.device_class){case"battery":return n?"mdi:battery":"mdi:battery-outline";case"battery_charging":return n?"mdi:battery":"mdi:battery-charging";case"cold":return n?"mdi:thermometer":"mdi:snowflake";case"connectivity":return n?"mdi:server-network-off":"mdi:server-network";case"door":return n?"mdi:door-closed":"mdi:door-open";case"garage_door":return n?"mdi:garage":"mdi:garage-open";case"power":return n?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return n?"mdi:check-circle":"mdi:alert-circle";case"smoke":return n?"mdi:check-circle":"mdi:smoke";case"heat":return n?"mdi:thermometer":"mdi:fire";case"light":return n?"mdi:brightness-5":"mdi:brightness-7";case"lock":return n?"mdi:lock":"mdi:lock-open";case"moisture":return n?"mdi:water-off":"mdi:water";case"motion":return n?"mdi:walk":"mdi:run";case"occupancy":return n?"mdi:home-outline":"mdi:home";case"opening":return n?"mdi:square":"mdi:square-outline";case"plug":return n?"mdi:power-plug-off":"mdi:power-plug";case"presence":return n?"mdi:home-outline":"mdi:home";case"running":return n?"mdi:stop":"mdi:play";case"sound":return n?"mdi:music-note-off":"mdi:music-note";case"update":return n?"mdi:package":"mdi:package-up";case"vibration":return n?"mdi:crop-portrait":"mdi:vibrate";case"window":return n?"mdi:window-closed":"mdi:window-open";default:return n?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:e=>{const t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"mdi:garage-open":"mdi:garage";case"door":return t?"mdi:door-open":"mdi:door-closed";case"shutter":return t?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return t?"mdi:blinds-open":"mdi:blinds";case"window":return t?"mdi:window-open":"mdi:window-closed";default:return se("cover",e.state)}},sensor:e=>{const t=e.attributes.device_class;if(t&&t in xe)return xe[t];if("battery"===t){const t=Number(e.state);if(isNaN(t))return"mdi:battery-unknown";const n=10*Math.round(t/10);return n>=100?"mdi:battery":n<=0?"mdi:battery-alert":`hass:battery-${n}`}const n=e.attributes.unit_of_measurement;return"°C"===n||"°F"===n?"mdi:thermometer":se("sensor")},input_datetime:e=>e.attributes.has_date?e.attributes.has_time?se("input_datetime"):"mdi:calendar":"mdi:clock"},Se=e=>{if(!e)return"mdi:bookmark";if(e.attributes.icon)return e.attributes.icon;const t=A(e.entity_id);return t in De?De[t](e):se(t,e.state)};export{V as DEFAULT_DOMAIN_ICON,W as DEFAULT_PANEL,ne as DEFAULT_VIEW_ENTITY_ID,K as DOMAINS_HIDE_MORE_INFO,Q as DOMAINS_MORE_INFO_NO_HISTORY,Z as DOMAINS_TOGGLE,G as DOMAINS_WITH_CARD,J as DOMAINS_WITH_MORE_INFO,h as NumberFormat,X as STATES_OFF,f as TimeFormat,ee as UNIT_C,te as UNIT_F,C as applyThemesOnElement,O as computeCardSize,A as computeDomain,E as computeEntity,j as computeRTL,R as computeRTLDirection,H as computeStateDisplay,z as computeStateDomain,oe as createThing,ue as debounce,se as domainIcon,me as evaluateFilter,ie as fireEvent,ce as fixedIcons,n as formatDate,m as formatDateMonth,c as formatDateMonthYear,r as formatDateNumeric,o as formatDateShort,b as formatDateTime,v as formatDateTimeNumeric,_ as formatDateTimeWithSeconds,e as formatDateWeekday,d as formatDateYear,Y as formatNumber,x as formatTime,M as formatTimeWeekday,S as formatTimeWithSeconds,le as forwardHaptic,ke as getLovelace,pe as handleAction,fe as handleActionConfig,be as handleClick,ye as hasAction,_e as hasConfigOrEntityChanged,we as hasDoubleClick,L as isNumericState,de as navigate,P as numberFormatToLocale,N as relativeTime,U as round,Se as stateIcon,q as timerTimeRemaining,he as toggleEntity,ve as turnOnOffEntities,ge as turnOnOffEntity};
//# sourceMappingURL=index.modern.js.map
