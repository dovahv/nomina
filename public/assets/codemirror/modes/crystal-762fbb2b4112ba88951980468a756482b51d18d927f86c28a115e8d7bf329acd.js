// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("crystal",function(e){function t(e,t){return new RegExp((t?"":"^")+"(?:"+e.join("|")+")"+(t?"$":"\\b"))}function n(e,t,n){return n.tokenize.push(e),e(t,n)}function r(e,t){if(e.eatSpace())return null;if("\\"!=t.lastToken&&e.match("{%",!1))return n(u("%","%"),e,t);if("\\"!=t.lastToken&&e.match("{{",!1))return n(u("{","}"),e,t);if("#"==e.peek())return e.skipToEnd(),"comment";var r;if(e.match(d))return e.eat(/[?!]/),r=e.current(),e.eat(":")?"atom":"."==t.lastToken?"property":k.test(r)?("abstract"!=t.lastToken&&z.test(r)?"fun"==r&&t.blocks.indexOf("lib")>=0||(t.blocks.push(r),t.currentIndent+=1):x.test(r)&&(t.blocks.pop(),t.currentIndent-=1),v.hasOwnProperty(r)&&t.tokenize.push(v[r]),"keyword"):F.test(r)?"atom":"variable";if(e.eat("@"))return"["==e.peek()?n(a("[","]","meta"),e,t):(e.eat("@"),e.match(d)||e.match(p),"variable-2");if(e.eat("$"))return e.eat(/[0-9]+|\?/)||e.match(d)||e.match(p),"variable-3";if(e.match(p))return"tag";if(e.eat(":"))return e.eat('"')?n(f('"',"atom",!1),e,t):e.match(d)||e.match(p)||e.match(s)||e.match(m)||e.match(l)?"atom":(e.eat(":"),"operator");if(e.eat('"'))return n(f('"',"string",!0),e,t);if("%"==e.peek()){var i,o="string",c=!0;if(e.match("%r"))o="string-2",i=e.next();else if(e.match("%w"))c=!1,i=e.next();else{if(!(i=e.match(/^%([^\w\s=])/)))return e.match(/^%[a-zA-Z0-9_\u009F-\uFFFF]*/)?"meta":"operator";i=i[1]}return g.hasOwnProperty(i)&&(i=g[i]),n(f(i,o,c),e,t)}return e.eat("'")?(e.match(/^(?:[^']|\\(?:[befnrtv0'"]|[0-7]{3}|u(?:[0-9a-fA-F]{4}|\{[0-9a-fA-F]{1,6}\})))/),e.eat("'"),"atom"):e.eat("0")?(e.eat("x")?e.match(/^[0-9a-fA-F]+/):e.eat("o")?e.match(/^[0-7]+/):e.eat("b")&&e.match(/^[01]+/),"number"):e.eat(/\d/)?(e.match(/^\d*(?:\.\d+)?(?:[eE][+-]?\d+)?/),"number"):e.match(s)?(e.eat("="),"operator"):e.match(m)||e.match(h)?"operator":(r=e.match(/[({[]/,!1))?(r=r[0],n(a(r,g[r],null),e,t)):e.eat("\\")?(e.next(),"meta"):(e.next(),null)}function a(e,t,n,u){return function(i,o){if(!u&&i.match(e))return o.tokenize[o.tokenize.length-1]=a(e,t,n,!0),o.currentIndent+=1,n;var c=r(i,o);return i.current()===t&&(o.tokenize.pop(),o.currentIndent-=1,c=n),c}}function u(e,t,n){return function(a,i){return!n&&a.match("{"+e)?(i.currentIndent+=1,i.tokenize[i.tokenize.length-1]=u(e,t,!0),"meta"):a.match(t+"}")?(i.currentIndent-=1,i.tokenize.pop(),"meta"):r(a,i)}}function i(e,t){if(e.eatSpace())return null;var n;if(n=e.match(d)){if("def"==n)return"keyword";e.eat(/[?!]/)}return t.tokenize.pop(),"def"}function o(e,t){return e.eatSpace()?null:(e.match(d)?e.eat(/[!?]/):e.match(s)||e.match(m)||e.match(l),t.tokenize.pop(),"def")}function c(e,t){return e.eatSpace()?null:(e.match(p),t.tokenize.pop(),"def")}function f(e,t,n){return function(r,i){for(var o=!1;r.peek();)if(o)r.next(),o=!1;else{if(r.match("{%",!1))return i.tokenize.push(u("%","%")),t;if(r.match("{{",!1))return i.tokenize.push(u("{","}")),t;if(n&&r.match("#{",!1))return i.tokenize.push(a("#{","}","meta")),t;var c=r.next();if(c==e)return i.tokenize.pop(),t;o="\\"==c}return t}}var s=/^(?:[-+/%|&^]|\*\*?|[<>]{2})/,m=/^(?:[=!]~|===|<=>|[<>=!]=?|[|&]{2}|~)/,l=/^(?:\[\][?=]?)/,h=/^(?:\.(?:\.{2})?|->|[?:])/,d=/^[a-z_\u009F-\uFFFF][a-zA-Z0-9_\u009F-\uFFFF]*/,p=/^[A-Z_\u009F-\uFFFF][a-zA-Z0-9_\u009F-\uFFFF]*/,k=t(["abstract","alias","as","asm","begin","break","case","class","def","do","else","elsif","end","ensure","enum","extend","for","fun","if","ifdef","include","instance_sizeof","lib","macro","module","next","of","out","pointerof","private","protected","rescue","return","require","sizeof","struct","super","then","type","typeof","union","unless","until","when","while","with","yield","__DIR__","__FILE__","__LINE__"]),F=t(["true","false","nil","self"]),b=["def","fun","macro","class","module","struct","lib","enum","union","if","unless","case","while","until","begin","then","do","for","ifdef"],z=t(b),_=["end","else","elsif","rescue","ensure"],x=t(_),y=["\\)","\\}","\\]"],I=new RegExp("^(?:"+y.join("|")+")$"),v={def:o,fun:o,macro:i,"class":c,module:c,struct:c,lib:c,"enum":c,union:c},g={"[":"]","{":"}","(":")","<":">"};return{startState:function(){return{tokenize:[r],currentIndent:0,lastToken:null,blocks:[]}},token:function(e,t){var n=t.tokenize[t.tokenize.length-1](e,t),r=e.current();return n&&"comment"!=n&&(t.lastToken=r),n},indent:function(t,n){return n=n.replace(/^\s*(?:\{%)?\s*|\s*(?:%\})?\s*$/g,""),x.test(n)||I.test(n)?e.indentUnit*(t.currentIndent-1):e.indentUnit*t.currentIndent},fold:"indent",electricInput:t(y.concat(_),!0),lineComment:"#"}}),e.defineMIME("text/x-crystal","crystal")});