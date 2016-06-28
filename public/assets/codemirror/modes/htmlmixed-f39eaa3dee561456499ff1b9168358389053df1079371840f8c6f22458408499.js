// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript"),require("../css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],t):t(CodeMirror)}(function(t){"use strict";function e(t,e,a){var n=t.current(),l=n.search(e);return l>-1?t.backUp(n.length-l):n.match(/<\/?$/)&&(t.backUp(n.length),t.match(e,!1)||t.match(n)),a}function a(t){var e=i[t];return e?e:i[t]=new RegExp("\\s+"+t+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")}function n(t,e){for(var n,l=t.pos;l>=0&&"<"!==t.string.charAt(l);)l--;return 0>l?l:(n=t.string.slice(l,t.pos).match(a(e)))?n[2]:""}function l(t,e){return new RegExp((e?"^":"")+"</s*"+t+"s*>","i")}function r(t,e){for(var a in t)for(var n=e[a]||(e[a]=[]),l=t[a],r=l.length-1;r>=0;r--)n.unshift(l[r])}function o(t,e){for(var a=0;a<t.length;a++){var l=t[a];if(!l[0]||l[1].test(n(e,l[0])))return l[2]}}var c={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],[null,null,"css"]]},i={};t.defineMode("htmlmixed",function(a,n){function i(n,r){var c,m=r.htmlState.tagName&&r.htmlState.tagName.toLowerCase(),d=m&&u.hasOwnProperty(m)&&u[m],p=s.token(n,r.htmlState);if(d&&/\btag\b/.test(p)&&">"===n.current()&&(c=o(d,n))){var f=t.getMode(a,c),h=l(m,!0),v=l(m,!1);r.token=function(t,a){return t.match(h,!1)?(a.token=i,a.localState=a.localMode=null,null):e(t,v,a.localMode.token(t,a.localState))},r.localMode=f,r.localState=t.startState(f,s.indent(r.htmlState,""))}return p}var s=t.getMode(a,{name:"xml",htmlMode:!0,multilineTagIndentFactor:n.multilineTagIndentFactor,multilineTagIndentPastTag:n.multilineTagIndentPastTag}),u={},m=n&&n.tags,d=n&&n.scriptTypes;if(r(c,u),m&&r(m,u),d)for(var p=d.length-1;p>=0;p--)u.script.unshift(["type",d[p].matches,d[p].mode]);return{startState:function(){var t=s.startState();return{token:i,localMode:null,localState:null,htmlState:t}},copyState:function(e){var a;return e.localState&&(a=t.copyState(e.localMode,e.localState)),{token:e.token,localMode:e.localMode,localState:a,htmlState:t.copyState(s,e.htmlState)}},token:function(t,e){return e.token(t,e)},indent:function(e,a){return!e.localMode||/^\s*<\//.test(a)?s.indent(e.htmlState,a):e.localMode.indent?e.localMode.indent(e.localState,a):t.Pass},innerMode:function(t){return{state:t.localState||t.htmlState,mode:t.localMode||s}}}},"xml","javascript","css"),t.defineMIME("text/html","htmlmixed")});