"use strict";(self.webpackChunkodin_todo=self.webpackChunkodin_todo||[]).push([[307],{307:(t,e,n)=>{function a(t){return function(t){if(Array.isArray(t))return c(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}n.r(e),n.d(e,{renderPage:()=>It});var i=function(t,e){return e.forEach((function(e){return t.appendChild(e)}))},r=function(t,e){return Object.keys(e).forEach((function(n){return t.setAttribute(n,e[n])}))},o=function(t){var e=document.createElement("ul");return e.classList.add(t),e},s=function(t,e,n){var c,r=document.createElement("li");r.id="list-item-".concat(t.type,"-").concat(t.id),(c=r.classList).add.apply(c,a(e));var o=n(t);return i(r,o),r},d=function(t,e){return t.find((function(t){return t.id===e}))},l=function(t){return document.querySelector(t)},u=function(t){return document.querySelectorAll(t)},p=function(t){return t.replaceChildren()},m=function(t){t.preventDefault(),13===t.keyCode&&t.target.blur()};function f(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var v=function(t,e,n,a){var c,i=document.createElement("button");return r(i,{type:"button",id:"new"!==e||"task"!==t.type&&"list"!==t.type?"".concat(e,"-").concat(t.type,"-").concat(t.id,"-btn"):"".concat(e,"-").concat(t.type,"-btn"),"aria-label":"".concat(a),"data-btn":"".concat(e)}),"new"===e&&(i.setAttribute("data-type","".concat(e,"-").concat(t.type)),"checklist"===t.type&&i.setAttribute("data-number",t.id),i.textContent="+"),"title"===e&&(r(i,{"data-number":"".concat(t.id),"data-name":"".concat(t.title.toLowerCase().trim().replace(" ","-"))}),i.textContent="".concat(t.title)),"edit"!==e&&"delete"!==e&&"expand"!==e||(r(i,{"data-number":"".concat(t.id),"data-type":"".concat(t.type)}),"edit"===e&&(i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="'.concat(t.id,'" data-type="').concat(t.type,'" data-btn="').concat(e,'"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z" data-number="').concat(t.id,'" data-type="').concat(t.type,'" data-btn="').concat(e,'"/></svg>')),"delete"===e&&(i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="'.concat(t.id,'" data-type="').concat(t.type,'" data-btn="').concat(e,'"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z" data-number="').concat(t.id,'" data-type="').concat(t.type,'" data-btn="').concat(e,'" /></svg>')),"expand"===e&&(i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="svg-expand" data-number="'.concat(t.id,'" data-btn="').concat(e,'" data-type="').concat(t.type,'"><path d="m12 16.35-7-7 2.4-2.375 4.6 4.6 4.6-4.6L19 9.35Z" data-number="').concat(t.id,'" data-btn="').concat(e,'" data-type="').concat(t.type,'"/></svg>'))),(c=i.classList).add.apply(c,f(n)),i},y=function(){var t=document.createElement("div");return t.classList.add("nav-logo"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f59e0b" d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z" /></svg>',t},b=function(){var t=document.createElement("h1");return t.classList.add("titles"),t.textContent="ToDo",t},w=n(767),g=n(694),k=n(699),x=n(90),E=n(313);function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function T(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&C(t,e)}function C(t,e){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},C(t,e)}function L(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=D(t);if(e){var c=D(this).constructor;n=Reflect.construct(a,arguments,c)}else n=a.apply(this,arguments);return O(this,n)}}function O(t,e){if(e&&("object"===S(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function D(t){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},D(t)}function A(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function I(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function M(t,e,n){return e&&I(t.prototype,e),n&&I(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var j=function(){function t(e,n,a,c,i){A(this,t),this.type="task",this.constructor.incrementId(),this.id=this.constructor.id,this.title=e,this.description=n,this.dueDate=a,this.expanded=!1,this.complete=!1,this.tags=["inbox"],this.updateTime(),this.priority=c,this.checklist=i}return M(t,[{key:"addTag",value:function(t){this.tags.push(t)}},{key:"deleteTag",value:function(t){var e=this.tags.findIndex((function(e){return e===t}));-1!==e&&this.tags.splice(e,1)}},{key:"updateTag",value:function(t,e){var n=this.tags.findIndex((function(e){return e===t}));-1!==n&&this.tags.splice(n,1,e)}},{key:"updateTime",value:function(){(0,w.Z)(this.dueDate)&&!this.tags.find((function(t){return"today"===t}))&&this.addTag("today"),(0,g.Z)(this.dueDate,{weekStartsOn:1})&&!this.tags.find((function(t){return"this-week"===t}))&&this.addTag("this-week"),!(0,k.Z)(this.dueDate,(0,x.Z)(new Date,{weekStartsOn:1}))&&this.dueDate||this.tags.find((function(t){return"anytime"===t}))||this.addTag("anytime"),(0,E.Z)(this.dueDate,new Date)&&this.dueDate&&!this.tags.find((function(t){return"late"===t||"today"===t}))&&this.addTag("late")}},{key:"deleteTimeTags",value:function(){this.tags.includes("today")&&this.deleteTag("today"),this.tags.includes("this-week")&&this.deleteTag("this-week"),this.tags.includes("anytime")&&this.deleteTag("anytime"),this.tags.includes("late")&&this.deleteTag("late")}}]),t}(),H=M((function t(e){A(this,t),this.constructor.incrementId(),this.type="list",this.id=this.constructor.id,this.title=e,this.tags=["list"]})),P=M((function t(e,n){A(this,t),this.constructor.incrementId(),this.type="checklist",this.id=this.constructor.id,this.taskId=e,this.title=n,this.complete=!1})),Z=function(t){var e,n,a,c;return e=function(t){T(n,t);var e=L(n);function n(){return A(this,n),e.apply(this,arguments)}return M(n,[{key:"add",value:function(t){t.push(this)}},{key:"update",value:function(t,e){return t in this&&(this[t]=e)}},{key:"delete",value:function(t){var e=t.indexOf(this);t.splice(e,1)}}],[{key:"incrementId",value:function(){this.id++}}]),n}(t),c=0,(a="id")in(n=e)?Object.defineProperty(n,a,{value:c,enumerable:!0,configurable:!0,writable:!0}):n[a]=c,e},q=function(t){T(n,t);var e=L(n);function n(){A(this,n);for(var t=arguments.length,a=new Array(t),c=0;c<t;c++)a[c]=arguments[c];return e.call.apply(e,[this].concat(a))}return M(n)}(Z(H)),N=function(t){T(n,t);var e=L(n);function n(){A(this,n);for(var t=arguments.length,a=new Array(t),c=0;c<t;c++)a[c]=arguments[c];return e.call.apply(e,[this].concat(a))}return M(n)}(Z(j)),_=function(t){T(n,t);var e=L(n);function n(){A(this,n);for(var t=arguments.length,a=new Array(t),c=0;c<t;c++)a[c]=arguments[c];return e.call.apply(e,[this].concat(a))}return M(n)}(Z(P)),V=M((function t(e,n){A(this,t),this.id=e,this.type="menu",this.title=n,this.tags=["menu"]})),R=n(760),B=function(t,e,n){var a=document.createElement("input");r(a,{type:"checkbox",id:"".concat(e,"-").concat(t.type,"-").concat(t.id),class:"".concat(t.type,"s-").concat(e),name:"".concat(t.type,"-").concat(e,"-").concat(t.id),"aria-label":"".concat(n),"data-number":"".concat(t.id),"data-type":"".concat(e,"-state"),"data-btn":"".concat(e)});var c=document.createElement("label");return r(c,{for:"".concat(e,"-").concat(t.type,"-").concat(t.id),class:"".concat(t.type,"-").concat(e,"-labels"),"data-number":"".concat(t.id)}),function(t,e,n){t.title?n.textContent="".concat(t.title):n.textContent="",t.complete?e.checked=!0:e.checked=!1}(t,a,c),[a,c]},U=function(t,e,n,a){var c=document.createElement("input");if(r(c,{type:"text",id:"description"===e?"".concat(t.type,"-").concat(e,"-").concat(t.id):"".concat(t.type,"-").concat(e),class:"input-text",maxLength:"".concat(a),"data-number":"".concat(t.id),"data-type":"".concat(e)}),"description"===e&&function(t,e){t.description&&(e.value=t.description)}(t,c),n){var i=document.createElement("label");return r(i,{for:"".concat(t.type,"-").concat(e,"-").concat(t.id),class:"".concat(t.type,"-").concat(e,"-label")}),i.textContent="".concat(e.charAt(0).toUpperCase()+e.slice(1),": "),[i,c]}return c},Q=function(t,e,n,a){var c=l(t),i=l(e);return i?i.replaceChild(n,c):c.appendChild(n),n.focus(),a?(n.value=c.textContent,{node:n,id:c.dataset.number}):n},J=function(t,e,n){t.checklist.map((function(a){G(t,a,e,n)}))},G=function(t,e,n,a){a||(a=l("#checklist-wrapper-".concat(t.id)));var c=document.createElement("div");r(c,{id:"".concat(n,"-item-wrapper-").concat(t.id,"-").concat(e.id),class:"".concat(n,"-item-wrapper")});var o=B({id:"".concat(t.id,"-").concat(e.id),type:"item",title:e.title,complete:e.complete},"checklist","Checklist item done or not done");i(c,o);var s=document.createElement("span");r(s,{id:"".concat(e.type,"-btns-wrapper-").concat(t.id,"-").concat(e.id),class:"".concat(e.type,"-btns-wrapper")});var d=v({id:"".concat(t.id,"-").concat(e.id),type:"".concat(e.type)},"edit",["btns","checklist-edit-btn","svg-btns"],"Edit this checklist item"),u=v({id:"".concat(t.id,"-").concat(e.id),type:"".concat(e.type)},"delete",["btns","checklist-delete-btn","svg-btns"],"Delete this checklist item");i(s,[d,u]),c.appendChild(s),a.appendChild(c)},$=function(t,e,n){if(n&&(e=l(e)),e.querySelector("#low-priority-".concat(t.id))&&e.querySelector("#low-priority-".concat(t.id)).remove(),e.querySelector("#high-priority-".concat(t.id))&&e.querySelector("#high-priority-".concat(t.id)).remove(),"low"===t.priority){var a=document.createElement("span");r(a,{id:"low-priority-".concat(t.id),class:"low-priority"}),a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7.725 21.75 5.85 19.9l1.25-1.225Q4.325 18.6 2.337 16.5.35 14.4.35 11.45q0-3 2.125-5.113Q4.6 4.225 7.6 4.225h4.575v3.4H7.6q-1.625 0-2.737 1.113Q3.75 9.85 3.75 11.45q0 1.525.963 2.612Q5.675 15.15 7 15.3h.025L5.85 14.125l1.875-1.85 4.725 4.75Zm6.45-3.05v-3.4h9.45v3.4Zm0-5.525v-3.4h9.45v3.4Zm0-5.55v-3.4h9.45v3.4Z"/></svg>',e.appendChild(a)}if("high"===t.priority){var c=document.createElement("span");r(c,{id:"high-priority-".concat(t.id),class:"high-priority"}),c.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 22.8q-1.25 0-2.137-.887-.888-.888-.888-2.138t.888-2.138q.887-.887 2.137-.887t2.137.9q.888.9.888 2.15t-.888 2.125Q13.25 22.8 12 22.8Zm-2.675-8.1V1.4h5.35v13.3Z"/></svg>',e.appendChild(c)}},W=["inbox"],z=function(t,e,n){e?F(t,e,n):(e=u(".task-tags-labels")).forEach((function(t){var e=t.dataset.number,n=d(nt,Number(e));F(n,t,"List:")}))},F=function(t,e,n){e.textContent="";var a=t.tags.map((function(t){return t.charAt(0).toUpperCase()+t.slice(1).replace("-"," ")})).join(" - ");e.textContent="".concat(n," ").concat(a)},K=function(t){t?X(t):(t=u("select[name='tags']")).forEach((function(t){return X(t)}))},X=function(t){for(;t.options.length>0;)t.remove(0);t&&(t.options.add(new Option("--Choose List--","")),Tt.map((function(e){Array.from(t.options).map((function(t){return t.text})).includes(e.title)||t.options.add(new Option(e.title,e.title))})))},Y=function(t,e){at();var n=l("#desk"),a=o("tasks");nt.map((function(e){if(e.tags.includes(t)){var n=s(e,["task-item","items"],tt);a.appendChild(n)}})),p(n),n.appendChild(a),e||(wt(mt),ht())},tt=function(t){var e=document.createElement("span");r(e,{id:"checkbox-wrapper-".concat(t.id),class:"checkbox-wrapper"});var n=B(t,"checkbox","Task done or not done"),a=v(t,"expand",["btns","expand-btn","svg-btns"],"Show task details");i(e,n),e.appendChild(a);var c=document.createElement("span");if(r(c,{id:"due-date-wrapper-".concat(t.id),class:"due-date-wrapper","data-number":"".concat(t.id)}),t.dueDate){var o=v({id:t.id,type:"due-date"},"delete",["btns","due-date-delete-btn","svg-btns"],"Delete date");c.appendChild(o)}else{var s=v({id:t.id,type:"due-date"},"edit",["btns","due-date-edit-btn","svg-btns"],"Edit date");c.appendChild(s)}var d=document.createElement("span");r(d,{id:"task-".concat(t.id,"-due-date"),class:"task-due-date","data-number":"".concat(t.id),"data-type":"due-date","data-btn":"edit"}),t.dueDate||(t.dueDate=null),"string"==typeof t.dueDate&&(t.dueDate=Date.parse(t.dueDate)),d.textContent=t.dueDate?(0,R.Z)(t.dueDate,"dd-MM-yyyy"):"",c.appendChild(d);var l=document.createElement("span");if(r(l,{id:"task-msg-wrapper-".concat(t.id),class:"task-msg-wrapper"}),t.tags.find((function(t){return"late"===t}))&&!1===t.complete){d.classList.add("late-color");var u=document.createElement("span");r(u,{id:"late-msg-".concat(t.id),class:"late-msg"}),u.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M-.225 21.825 12 .7l12.225 21.125ZM12 18.175q.525 0 .887-.363.363-.362.363-.887 0-.5-.363-.863-.362-.362-.887-.362-.5 0-.875.362-.375.363-.375.863 0 .525.375.887.375.363.875.363Zm-1.125-3.125h2.25v-4.775h-2.25Z"/></svg>',l.appendChild(u)}$(t,l,!1);var p=document.createElement("span");r(p,{id:"task-btn-wrapper-".concat(t.id),class:"task-btn-wrapper"});var m=v(t,"edit",["btns","task-edit-btn","svg-btns"],"Edit task: ".concat(t.title)),f=v(t,"delete",["btns","task-delete-btn","svg-btns"],"Delete task: ".concat(t.title));return i(p,[m,f]),[e,c,l,p]},et=function(t){var e=document.createElement("div");r(e,{id:"expand-wrapper-".concat(t.id),class:"expand-wrapper wrappers-".concat(t.id," items")});var n=document.createElement("div");r(n,{id:"task-description-wrapper-".concat(t.id),class:"task-description-wrapper"});var a=U(t,"description",!0,40);i(n,a);var c=document.createElement("div");r(c,{id:"priority-wrapper-".concat(t.id),class:"priority-wrapper"});var o=function(t,e,n,a){var c=document.createElement("fieldset");r(c,{id:"".concat(e,"-fieldset-").concat(t.id),class:"".concat(e,"-fieldset")});var o=document.createElement("legend");o.textContent=n;var s=document.createElement("div");return r(s,{id:"".concat(e,"s-wrapper-").concat(t.id),class:"".concat(e,"s-wrapper")}),a.map((function(n,a){var c=document.createElement("div");r(c,{id:"".concat(e,"-wrapper-").concat(t.id,"-").concat(a),class:"".concat(e,"-wrapper")});var o=document.createElement("input");r(o,{type:"radio",id:"".concat(e,"-").concat(t.id,"-").concat(a),name:"priority-".concat(t.id),value:"".concat(n),"aria-label":"".concat(n," radio button"),"data-number":"".concat(t.id),"data-type":"".concat(e,"-state"),"data-btn":"".concat(e)});var d=document.createElement("label");r(d,{for:"".concat(e,"-").concat(t.id,"-").concat(a),class:"".concat(e,"-labels"),"data-number":"".concat(t.id)}),d.textContent="".concat(n.charAt(0).toUpperCase()+n.slice(1)),function(t,e,n){t.priority?t.priority===e&&(n.checked=!0):"medium"===e&&(n.checked=!0)}(t,n,o),i(c,[o,d]),s.appendChild(c)})),i(c,[o,s]),c}(t,"radio","Priority: ",["low","medium","high"]);c.appendChild(o);var s=document.createElement("div");r(s,{id:"tags-wrapper-".concat(t.id),class:"tags-wrapper"});var d=function(t,e,n){var a=document.createElement("label");r(a,{for:"".concat(t.type,"-").concat(e,"-").concat(t.id),class:"".concat(t.type,"-").concat(e,"-labels"),"data-number":"".concat(t.id)}),z(t,a,n);var c=document.createElement("select");return r(c,{id:"".concat(t.type,"-").concat(e,"-").concat(t.id),class:"".concat(t.type,"-").concat(e),name:"".concat(e),"data-number":"".concat(t.id),"data-type":"".concat(e)}),K(c),[a,c]}(t,"tags","Lists:");i(s,d);var l=document.createElement("div");l.classList.add("checklist-wrapper");var u=v({id:t.id,type:"checklist"},"new",["btns","round-btns","round-btns-small"],"Add new item to checklist"),p=function(t,e){var n=document.createElement("fieldset");r(n,{id:"".concat(e,"-fieldset-").concat(t.id),class:"".concat(e,"-fieldset")});var a=document.createElement("legend");a.textContent="".concat(e.charAt(0).toUpperCase()+e.slice(1),": ");var c=document.createElement("div");return r(c,{id:"".concat(e,"-wrapper-").concat(t.id),class:"".concat(e,"s-wrapper")}),t.checklist&&J(t,e,c),i(n,[a,c]),n}(t,"checklist");return i(l,[u,p]),i(e,[n,c,s,l]),{wrapper:e,description:n,priority:c,tags:s,checklist:l}},nt=[],at=function(){return nt.sort((function(t,e){return new Date(t.dueDate)-new Date(e.dueDate)||e.id-t.id}))},ct=function(t){var e;try{e=window[t];var n="__storage_test__";return e.setItem(n,n),e.removeItem(n),!0}catch(t){return t instanceof DOMException&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}},it=function(t,e){localStorage.removeItem(t),localStorage.setItem(t,JSON.stringify(e))},rt=function(t){t.stopPropagation();var e=t.target.dataset.btn,n=t.target.dataset.type,a=t.target.dataset.number,c=t.target.value,i=t.target.dataset.name;if("delete"===e&&dt(t,a,n),"title"===e&&(!function(t){W.splice(0),W.push(t)}(i),Y(W[0],!1)),"checkbox"!==e&&"checklist"!==e||lt(a,n,e,c,i),"expand"===e&&function(t){var e=d(nt,Number(t));e.expanded=!e.expanded;var n=l("#list-item-task-".concat(t));if(e.expanded){n.classList.remove("expand-btn-down"),n.classList.add("expand-btn-up");var a=et(e);e.checklist||(e.checklist=[]),n.appendChild(a.wrapper),vt(t)}else{n.classList.remove("expand-btn-up"),n.classList.add("expand-btn-down");var c=l("#expand-wrapper-".concat(t));c&&c.remove()}}(a),"new"===e){var r=ut(t,n,a);r&&ot(r,n)}if("edit"===e){var o=pt(a,n);o&&ot(o,n)}if("radio"===e){var s=d(nt,Number(a));s.update("priority",String(c)),$(s,"#task-msg-wrapper-".concat(a),!0),ct("localStorage")&&it("tasks",nt)}if("description"===n){var u={instance:d(nt,Number(a)),value:String(c)};st(u,n)}"tags"===n&&function(t,e,n){var a=d(nt,Number(e)),c=String(n).toLocaleLowerCase().trim(),i=t.target;a.tags.includes(c)?a.deleteTag(c):a.addTag(c),Y(W[0],!1),z(null,null,null),i.selectedIndex=0,i.blur()}(t,a,c)},ot=function(t,e){"due-date"===e?t.node.addEventListener("change",(function(){return st(t,e)})):(t.node.addEventListener("focusout",(function(){return st(t,e)})),t.node.addEventListener("keyup",m))},st=function(t,e){if(("new-task"===e||"task"===e||"due-date"===e)&&("new-task"===e&&(t.instance.add(nt),t.instance.update("title",t.node.value),t.instance.tags.includes(W[0])||t.instance.addTag(String(W[0])),"today"===W[0]&&(t.instance.deleteTimeTags(),t.instance.update("dueDate",new Date),t.instance.updateTime()),Y(W[0],!1)),"task"===e||"due-date"===e)){var n=d(nt,Number(t.id));"task"===e?n.update("title",String(t.node.value)):(n.deleteTimeTags(),n.update("dueDate",new Date(t.node.value)),n.updateTime()),Y(W[0],!1)}if("new-checklist"===e||"checklist"===e){var a="new-checklist"===e?t.instance.taskId:t.id.split("-"),c=d(nt,Number("new-checklist"===e?a:a[0]));if("new-checklist"===e&&(t.instance.add(c.checklist),t.instance.update("title",String(t.node.value))),"checklist"===e)d(c.checklist,Number(a[1])).update("title",String(t.node.value));l("#checklist-wrapper-".concat(c.id)).innerHTML="",J(c,"checklist",null),wt(ft),vt(c.id)}if("description"===e&&t.instance.update("description",t.value),"new-list"===e||"list"===e){var i=Ct(t);if(i){if("new-list"===e&&(t.instance.add(Tt),t.instance.update("title",String(i))),"list"===e){var r=d(Tt,Number(t.id));nt.map((function(t){t.tags.includes(String(r.title.toLowerCase().trim()))&&t.updateTag(r.title.toLowerCase().trim(),String(i).toLocaleLowerCase().trim())})),r.update("title",String(i))}K(null),z(null,null,null),gt(!1)}}ct("localStorage")&&(it("tasks",nt),it("lists",Tt))},dt=function(t,e,n){t.stopPropagation();var a="list"===n?Tt:nt;e="checklist"===n?e.split("-"):e;var c=d(a,Number("checklist"===n?e[0]:e));("task"!==n&&"list"!==n||c.delete(a),"due-date"===n&&(c.update("dueDate",null),c.deleteTimeTags(),c.updateTime()),"checklist"===n)&&d(c.checklist,Number(e[1])).delete(c.checklist);("list"===n&&(nt.map((function(t){t.tags.includes(String(c.title.toLowerCase().trim()))&&t.deleteTag(c.title.toLowerCase().trim())})),K(null),z(null,null,null),gt(!1)),"task"!==n&&"due-date"!==n||Y(W[0],!1),"checklist"===n)&&(l("#checklist-wrapper-".concat(e[0])).innerHTML="",J(c,"checklist",null),wt(ft),vt(Number(e[0])));ct("localStorage")&&(it("tasks",nt),it("lists",Tt))},lt=function(t,e,n){var a=l("#".concat(n,"-").concat("checkbox"===n?"task":"item","-").concat(t)),c=!!a.checked;t="checkbox-state"===e?t:t.split("-");var i="checkbox-state"===e?d(nt,Number(t)):d(d(nt,Number(t[0])).checklist,Number(t[1]));i.update("complete",c),"checkbox-state"===e&&(c?i.tags.includes("complete")||(i.addTag("complete"),i.deleteTag("inbox"),i.deleteTimeTags()):(i.deleteTag("complete"),i.addTag("inbox"),i.updateTime()),setTimeout((function(){return Y(W[0],!1)}),1e3)),ct("localStorage")&&it("tasks",nt),a.blur()},ut=function(t,e,n){t.stopPropagation();var a="new-task"===e?new N:"new-list"===e?new q:new _(n,null);return{node:"new-task"===e?function(t){var e=s(t,["task-item","items"],tt);l(".tasks").prepend(e);var n=U(t,"new",!1,40);return Q("#checkbox-wrapper-".concat(t.id," > label"),"#checkbox-wrapper-".concat(t.id),n,!1),n}(a):"new-list"===e?St(a):function(t,e,n,a){G(t,e,n,a);var c=U(e,"new",!1,30);return Q("#checklist-item-wrapper-".concat(t.id,"-").concat(e.id," > label"),"#checklist-item-wrapper-".concat(t.id,"-").concat(e.id),c,!1),c}({id:n},a,"checklist",null),instance:a}},pt=function(t,e){var n,a="task"===e?U({type:e,id:t},"edit",!1,40):"list"===e?U({type:e},"edit",!1,15):"checklist"===e?U({type:e,id:t},"edit",!1,20):function(t){var e=document.createElement("input");return r(e,{type:"date",id:"new-due-date-".concat(t.id),class:"new-due-date input-text","data-number":"".concat(t.id)}),e}({id:t}),c="task"===e?Q("#checkbox-wrapper-".concat(t," > label"),"#checkbox-wrapper-".concat(t),a,!0):"list"===e?Q("#title-list-".concat(t,"-btn"),"#list-item-list-".concat(t),a,!0):"checklist"===e?Q("#checklist-item-wrapper-".concat(t," > label"),"#checklist-item-wrapper-".concat(t),a,!0):Q("#task-".concat(t,"-due-date"),"#due-date-wrapper-".concat(t),a,!0);("list"===e&&(n="#btns-lists-".concat(t),document.querySelector(n).remove()),"task"===e)&&l("#edit-".concat(e,"-").concat(t,"-btn")).classList.add("svg-active");return c},mt=[],ft=[],ht=function(){bt(mt,"#new-task-btn","click",rt),yt(mt,".menu-btns","click",rt),yt(mt,".lists-btns","click",rt),yt(mt,".svg-btns-delete","click",rt),yt(mt,".svg-btns-edit","click",rt),bt(mt,"#new-list-btn","click",rt),yt(mt,".tasks-checkbox","change",rt),yt(mt,".expand-btn","click",rt),yt(mt,".task-due-date","click",rt),yt(mt,".due-date-delete-btn","click",rt),yt(mt,".due-date-edit-btn","click",rt),yt(mt,".task-edit-btn","click",rt),yt(mt,".task-delete-btn","click",rt)},vt=function(t){bt(ft,"#task-description-".concat(t),"focusout",rt),bt(ft,"#task-description-".concat(t),"keyup",m),yt(ft,"input[type='radio'][name='priority-".concat(t,"']"),"change",rt),bt(ft,"#task-tags-".concat(t),"change",rt),yt(ft,".items-checklist","change",rt),bt(ft,"#new-checklist-".concat(t,"-btn"),"click",rt),yt(ft,".checklist-edit-btn","click",rt),yt(ft,".checklist-delete-btn","click",rt)},yt=function(t,e,n,a){document.querySelectorAll(e).forEach((function(c){c.addEventListener(n,a);var i={node:c,selector:e,eventType:n,callback:a};t.push(i)}))},bt=function(t,e,n,a){var c=document.querySelector(e);c.addEventListener(n,a);var i={node:c,selector:e,eventType:n,callback:a};t.push(i)},wt=function(t){t.forEach((function(t){t.node.removeEventListener(t.eventType,t.callback)})),t.splice(0)},gt=function(t){var e=l("#section-lists"),n=kt(),a=o("menu");Tt.map((function(t){var e=s(t,["lists-items","items"],Et);a.appendChild(e)})),p(e),i(e,[n,a]),t||(wt(mt),ht())},kt=function(){var t=document.createElement("header");t.classList.add("headers");var e=xt(),n=v({type:"list"},"new",["btns","round-btns","round-btns-big"],"Add new list");return i(t,[n,e]),t},xt=function(){var t=document.createElement("h2");return t.classList.add("titles"),t.textContent="Lists",t},Et=function(t){var e=v(t,"title",["btns","lists-btns","text-btns"],"List title button: ".concat(t.title)),n=document.createElement("span");r(n,{id:"btns-lists-".concat(t.id),class:"btns-lists"});var a=v(t,"edit",["btns","svg-btns","svg-btns-edit"],"Edit list: ".concat(t.title)),c=v(t,"delete",["btns","svg-btns","svg-btns-delete"],"Delete list: ".concat(t.title));return i(n,[a,c]),[e,n]},St=function(t){var e=U(t,"new",!1,15);return Q("#section-lists",null,e,!1),e},Tt=[],Ct=function(t){if(""===String(t.node.value))return gt(!1),!1;var e,n,a=new q(String(t.node.value)),c=(e=Tt,n=String(t.node.value),e.find((function(t){return"list"===t.type?t.title.toLowerCase().trim()===n.toLowerCase().trim():t.toLowerCase().trim()===n.toLowerCase().trim()})));return void 0!==c&&c.title.toLowerCase().trim()===a.title.toLowerCase().trim()||"Already exists"===a.title?(Lt(t.node),t.node.focus(),!1):String(t.node.value)},Lt=function(t){t.value="Already exists",t.classList.add("input-text-lists-error"),t.addEventListener("keydown",(function e(){t.value="",t.removeEventListener("keydown",e),t.classList.remove("input-text-lists-error")}))},Ot=function(t){return[v(t,"title",["btns","menu-btns","text-btns"],"Menu button: ".concat(t.title))]};function Dt(t){return function(t){if(Array.isArray(t))return At(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return At(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return At(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function At(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var It=function(){var t,e,n,a,c,r,d,u,p;if(Mt(),t=l("#nav-header"),e=y(),n=v({type:"task"},"new",["btns","round-btns","round-btns-big"],"Add new task"),a=b(),i(t,[e,n,a]),c=l("#nav-menu"),r=[new V(1,"Inbox"),new V(2,"Today"),new V(3,"This Week"),new V(4,"Anytime"),new V(5,"Complete")],d=o("menu"),r.map((function(t){var e=s(t,["menu-items"],Ot);d.appendChild(e)})),c.appendChild(d),u=new q("Life"),p=new q("Work"),u.add(Tt),p.add(Tt),function(){var t=new N("Go to market","Buy fruit and vegetables",new Date("2022-11-04"),"low",[new _(1,"Bananas"),new _(1,"Apples"),new _(1,"Oranges"),new _(1,"Tomatoes"),new _(1,"Potatos"),new _(1,"Salad"),new _(1,"Carrots"),new _(1,"Onions")]);t.addTag("life"),t.add(nt);var e=new N("Organize Meeting","Introduce new teammate",new Date("2022-11-10"),"medium",[new _(2,"Send invitations"),new _(2,"Prepare short presentation")]);e.addTag("work"),e.add(nt);var n=new N("Pay Bills","Pay electricity and gas bills",new Date("2022-11-6"),"high",[new _(3,"Electric Bill"),new _(3,"Gas Bill")]);n.addTag("life"),n.add(nt);var a=new N("ToDo App","The Odin Project To Do App",new Date("2023-7-8"),"low",[new _(4,"Code Design"),new _(4,"Classes"),new _(4,"Ui"),new _(4,"Logic"),new _(4,"Set up webpack")]);a.addTag("work"),a.add(nt);var c=new N("Buy chili pepper","Get some spicy taste, sometime",new Date("2022-11-08"),"high",[new _(7,"Take metro")]);c.addTag("life"),c.add(nt);var i=new N("Mail","Send me mail please",new Date("2022-12-08"),"high",[new _(8,"Take metro")]);i.addTag("work"),i.add(nt)}(),nt.map((function(t){return t.updateTime()})),ct("localStorage")){localStorage.getItem("tasks")||localStorage.setItem("tasks",JSON.stringify(nt)),localStorage.getItem("lists")||localStorage.setItem("lists",JSON.stringify(Tt));var m=JSON.parse(localStorage.getItem("tasks"));m.map((function(t){Object.setPrototypeOf(t,N.prototype),t.checklist?t.checklist.map((function(t){Object.setPrototypeOf(t,_.prototype)})):t.checklist=[]})),nt.splice.apply(nt,[0,nt.length].concat(Dt(m)));var f=JSON.parse(localStorage.getItem("lists"));f.map((function(t){return Object.setPrototypeOf(t,q.prototype)})),Tt.splice.apply(Tt,[0,Tt.length].concat(Dt(f)))}gt(!0),Y(W[0],!0),ht()},Mt=function(){var t=document.querySelector("#root"),e=document.createElement("main");e.classList.add("container");var n=Ht(),a=jt();t.appendChild(e),i(e,[n,a])},jt=function(){var t=document.createElement("section");return r(t,{class:"desk",id:"desk"}),t},Ht=function(){var t=document.createElement("section");t.classList.add("navbar");var e=Pt(),n=Zt(),a=qt();return i(t,[e,n,a]),t},Pt=function(){var t=document.createElement("header");return r(t,{class:"headers",id:"nav-header"}),t},Zt=function(){var t=document.createElement("nav");return r(t,{class:"nav-menu",id:"nav-menu"}),t},qt=function(){var t=document.createElement("section");return r(t,{class:"section-lists",id:"section-lists"}),t}}}]);