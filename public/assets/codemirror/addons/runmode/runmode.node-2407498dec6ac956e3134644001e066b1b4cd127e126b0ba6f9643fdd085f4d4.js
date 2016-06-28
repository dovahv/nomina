// CodeMirror, copyright (c) by Marijn Haverbeke and others
function splitLines(t){return t.split(/\r\n?|\n/)}function StringStream(t,e){this.pos=this.start=0,this.string=t,this.tabSize=e||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0}function copyObj(t,e,n){e||(e={});for(var r in t)!t.hasOwnProperty(r)||n===!1&&e.hasOwnProperty(r)||(e[r]=t[r]);return e}var countColumn=function(t,e,n,r,s){null==e&&(e=t.search(/[^\s\u00a0]/),-1==e&&(e=t.length));for(var i=r||0,o=s||0;;){var a=t.indexOf("	",i);if(0>a||a>=e)return o+(e-i);o+=a-i,o+=n-o%n,i=a+1}};StringStream.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return this.pos==this.lineStart},peek:function(){return this.string.charAt(this.pos)||void 0},next:function(){return this.pos<this.string.length?this.string.charAt(this.pos++):void 0},eat:function(t){var e=this.string.charAt(this.pos);if("string"==typeof t)var n=e==t;else var n=e&&(t.test?t.test(e):t(e));return n?(++this.pos,e):void 0},eatWhile:function(t){for(var e=this.pos;this.eat(t););return this.pos>e},eatSpace:function(){for(var t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t},skipToEnd:function(){this.pos=this.string.length},skipTo:function(t){var e=this.string.indexOf(t,this.pos);return e>-1?(this.pos=e,!0):void 0},backUp:function(t){this.pos-=t},column:function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=countColumn(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?countColumn(this.string,this.lineStart,this.tabSize):0)},indentation:function(){return countColumn(this.string,null,this.tabSize)-(this.lineStart?countColumn(this.string,this.lineStart,this.tabSize):0)},match:function(t,e,n){if("string"!=typeof t){var r=this.string.slice(this.pos).match(t);return r&&r.index>0?null:(r&&e!==!1&&(this.pos+=r[0].length),r)}var s=function(t){return n?t.toLowerCase():t},i=this.string.substr(this.pos,t.length);return s(i)==s(t)?(e!==!1&&(this.pos+=t.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(t,e){this.lineStart+=t;try{return e()}finally{this.lineStart-=t}}},exports.StringStream=StringStream,exports.startState=function(t,e,n){return t.startState?t.startState(e,n):!0};var modes=exports.modes={},mimeModes=exports.mimeModes={};exports.defineMode=function(t,e){arguments.length>2&&(e.dependencies=Array.prototype.slice.call(arguments,2)),modes[t]=e},exports.defineMIME=function(t,e){mimeModes[t]=e},exports.defineMode("null",function(){return{token:function(t){t.skipToEnd()}}}),exports.defineMIME("text/plain","null"),exports.resolveMode=function(t){return"string"==typeof t&&mimeModes.hasOwnProperty(t)?t=mimeModes[t]:t&&"string"==typeof t.name&&mimeModes.hasOwnProperty(t.name)&&(t=mimeModes[t.name]),"string"==typeof t?{name:t}:t||{name:"null"}};var modeExtensions=exports.modeExtensions={};exports.extendMode=function(t,e){var n=modeExtensions.hasOwnProperty(t)?modeExtensions[t]:modeExtensions[t]={};copyObj(e,n)},exports.getMode=function(t,e){var e=exports.resolveMode(e),n=modes[e.name];if(!n)return exports.getMode(t,"text/plain");var r=n(t,e);if(modeExtensions.hasOwnProperty(e.name)){var s=modeExtensions[e.name];for(var i in s)s.hasOwnProperty(i)&&(r.hasOwnProperty(i)&&(r["_"+i]=r[i]),r[i]=s[i])}if(r.name=e.name,e.helperType&&(r.helperType=e.helperType),e.modeProps)for(var i in e.modeProps)r[i]=e.modeProps[i];return r},exports.registerHelper=exports.registerGlobalHelper=Math.min,exports.runMode=function(t,e,n,r){for(var s=exports.getMode({indentUnit:2},e),i=splitLines(t),o=r&&r.state||exports.startState(s),a=0,h=i.length;h>a;++a){a&&n("\n");var u=new exports.StringStream(i[a]);for(!u.string&&s.blankLine&&s.blankLine(o);!u.eol();){var l=s.token(u,o);n(u.current(),l,a,u.start,o),u.start=u.pos}}},require.cache[require.resolve("../../lib/codemirror")]=require.cache[require.resolve("./runmode.node")],require.cache[require.resolve("../../addon/runmode/runmode")]=require.cache[require.resolve("./runmode.node")];