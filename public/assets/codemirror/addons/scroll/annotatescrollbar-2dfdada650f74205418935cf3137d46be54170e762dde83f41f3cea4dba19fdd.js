// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";function e(t,e){function i(t){clearTimeout(n.doRedraw),n.doRedraw=setTimeout(function(){n.redraw()},t)}this.cm=t,this.options=e,this.buttonHeight=e.scrollButtonHeight||t.getOption("scrollButtonHeight"),this.annotations=[],this.doRedraw=this.doUpdate=null,this.div=t.getWrapperElement().appendChild(document.createElement("div")),this.div.style.cssText="position: absolute; right: 0; top: 0; z-index: 7; pointer-events: none",this.computeScale();var n=this;t.on("refresh",this.resizeHandler=function(){clearTimeout(n.doUpdate),n.doUpdate=setTimeout(function(){n.computeScale()&&i(20)},100)}),t.on("markerAdded",this.resizeHandler),t.on("markerCleared",this.resizeHandler),e.listenForChanges!==!1&&t.on("change",this.changeHandler=function(){i(250)})}t.defineExtension("annotateScrollbar",function(t){return"string"==typeof t&&(t={className:t}),new e(this,t)}),t.defineOption("scrollButtonHeight",0),e.prototype.computeScale=function(){var t=this.cm,e=(t.getWrapperElement().clientHeight-t.display.barHeight-2*this.buttonHeight)/t.getScrollerElement().scrollHeight;return e!=this.hScale?(this.hScale=e,!0):void 0},e.prototype.update=function(t){this.annotations=t,this.redraw()},e.prototype.redraw=function(t){function e(t,e){if(h!=t.line&&(h=t.line,d=i.getLineHandle(h)),a&&d.height>s)return i.charCoords(t,"local")[e?"top":"bottom"];var n=i.heightAtLine(d,"local");return n+(e?0:d.height)}t!==!1&&this.computeScale();var i=this.cm,n=this.hScale,o=document.createDocumentFragment(),r=this.annotations,a=i.getOption("lineWrapping"),s=a&&1.5*i.defaultTextHeight(),h=null,d=null;if(i.display.barWidth)for(var l,c=0;c<r.length;c++){for(var p=r[c],u=l||e(p.from,!0)*n,f=e(p.to,!1)*n;c<r.length-1&&(l=e(r[c+1].from,!0)*n,!(l>f+.9));)p=r[++c],f=e(p.to,!1)*n;if(f!=u){var m=Math.max(f-u,3),g=o.appendChild(document.createElement("div"));g.style.cssText="position: absolute; right: 0px; width: "+Math.max(i.display.barWidth-1,2)+"px; top: "+(u+this.buttonHeight)+"px; height: "+m+"px",g.className=this.options.className,p.id&&g.setAttribute("annotation-id",p.id)}}this.div.textContent="",this.div.appendChild(o)},e.prototype.clear=function(){this.cm.off("refresh",this.resizeHandler),this.cm.off("markerAdded",this.resizeHandler),this.cm.off("markerCleared",this.resizeHandler),this.changeHandler&&this.cm.off("change",this.changeHandler),this.div.parentNode.removeChild(this.div)}});