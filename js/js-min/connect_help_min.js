function showHelp(f,d,e,c,a){if(!this["beforeHelpRequest"]||beforeHelpRequest(f,d,e,c)){var b=c+"helpservletcontroller?QUESTION="+f+"&namespace="+d+"&controllername="+e;var h=calcWinPopupTop(300,window.event?window.event:a);var g=calcWinPopupLeft(600,window.event?window.event:a);window.open(b,"helpwin","toolbar=no,directories=no,status=yes,scrollbars=yes,resizeable=yes,resize=yes,menubar=no,height=300,width=600,top="+h+",left="+g).focus()}if(this["afterHelpRequest"]){afterHelpRequest(f,d,e,c)}}function calcWinPopupTop(b,a){var c=0;b=parseFloat(b);if((a.screenY+b)>screen.height){c=screen.height-(b+30)}else{c=a.screenY}return c}function calcWinPopupLeft(b,a){var c=0;b=parseFloat(b);if((a.screenX+b)>screen.width){c=screen.width-(b+30)}else{c=a.screenX}return c}function calcPopupPosition(a,i,j){var b=(document.body.parentNode.scrollLeft!=null&&navigator.userAgent.indexOf("AppleWebKit")==-1)?document.body.parentNode.scrollLeft:window.scrollX;var k=calcBrowserWidth();var e=(document.body.parentNode.scrollTop!=null&&navigator.userAgent.indexOf("AppleWebKit")==-1)?document.body.parentNode.scrollTop:window.scrollY;var f=calcBrowserHeight();var c=document.documentElement.dir=="ltr";var d=j.clientX+b;var h;a=parseFloat(a);i=parseFloat(i);if((j.clientX+a)>(screen.left+screen.width)||(j.clientX+a)>k){h=j.clientY+e+20;if((j.clientY+i)>(screen.top+screen.height)||(j.clientY+i)>f){h=h-(i+20)}d=d-(a+20)}else{h=j.clientY+e;if((j.clientY+i)>(screen.top+screen.height)||(j.clientY+i)>f){h=h-(i+20)}}var g=document.documentElement.dir=="rtl";if(g){d=d-a}if(d<0){d=0}if(h<0){h=0}return{x:d,y:h}}function calcBrowserWidth(){return getPageSize()[0]}function calcBrowserHeight(){return getPageSize()[1]}function getPageSize(){var c,a;if(window.innerHeight&&window.scrollMaxY){c=window.innerWidth+window.scrollMaxX;a=window.innerHeight+window.scrollMaxY}else{if(document.body.scrollHeight>document.body.offsetHeight){c=document.body.scrollWidth;a=document.body.scrollHeight}else{c=document.body.offsetWidth;a=document.body.offsetHeight}}var b,d;if(self.innerHeight){if(document.documentElement.clientWidth){b=document.documentElement.clientWidth}else{b=self.innerWidth}d=self.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){b=document.documentElement.clientWidth;d=document.documentElement.clientHeight}else{if(document.body){b=document.body.clientWidth;d=document.body.clientHeight}}}if(a>d){pageHeight=d}else{pageHeight=a}if(c>b){pageWidth=c}else{pageWidth=b}return[pageWidth,pageHeight]}var helpTimeout;function showAjaxHelp(c,d,e,i,b,g,f){if(!this["beforeHelpRequest"]||beforeHelpRequest(c,d,e,i,b)){var a=f!=null&&f.length>0;if(a){setVariable(e,"currentHelpTarget",f);removeHelpContent()}else{if(window.event){g=window.event}if(g){var h=new Object();if(window.event){h.clientX=window.event.clientX;h.clientY=window.event.clientY}else{h.clientX=g.clientX;h.clientY=g.clientY}setVariable(e,"clickEvt",h)}}helpTimeout=setTimeout(function(){ajaxHelp(c,d,e,i,b)},500)}if(this["afterHelpRequest"]){afterHelpRequest(c,d,e,i,b)}}function hideHelpContent(){if(helpTimeout){clearTimeout(helpTimeout);helpTimeout=null}var a=document.getElementById("helpContent");if(a!=null){a.style.display="none"}}function removeHelpContent(){var a=document.getElementById("helpContent");if(a!=null){a.parentNode.removeChild(a)}}function createHelpDiv(a,j,g){var b=getVariable(g,"currentHelpTarget");var d=getVariable(g,"clickEvt");if(b!=null){var c=document.getElementById(b);c.innerHTML=j+c.innerHTML;c.style.display="";var k=document.getElementById("helpContent");k.style.width=c.clientWidth+"px";k.style.height=c.clientHeight+"px";return}var k=document.getElementById("helpDiv");if(k==null){k=createFloatingDiv("helpDiv",document.body)}k.innerHTML=j;k.style.position="absolute";var i=k.firstChild.offsetWidth;var e=k.firstChild.offsetHeight;var f=calcPopupPosition(i,e,d);k.style.left=""+f.x+"px";k.style.top=""+f.y+"px";k.style.display=""}function clickHelpButton(b){if(b&&b.length>0){var a=document.getElementById(b);if(a&&a.onclick){a.onclick()}}}function ecBrowser(){var b,c,a;this.isIE=false;this.isNS=false;this.version=null;b=navigator.userAgent;c="MSIE";if((a=b.indexOf(c))>=0){this.isIE=true;this.version=parseFloat(b.substr(a+c.length));return}c="Netscape6/";if((a=b.indexOf(c))>=0){this.isNS=true;this.version=parseFloat(b.substr(a+c.length));return}c="Gecko";if((a=b.indexOf(c))>=0){this.isNS=true;this.version=6.1;return}}var brwsr=new ecBrowser();var dragObj=new Object();dragObj.zIndex=0;function dragStart(c,e){var b;var a,d;if(e){dragObj.elNode=document.getElementById(e)}else{if(brwsr.isIE){dragObj.elNode=window.event.srcElement}if(brwsr.isNS){dragObj.elNode=c.target}if(dragObj.elNode.nodeType==3){dragObj.elNode=dragObj.elNode.parentNode}}if(brwsr.isIE){a=window.event.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;d=window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop}if(brwsr.isNS){a=c.clientX+window.scrollX;d=c.clientY+window.scrollY}dragObj.cursorStartX=a;dragObj.cursorStartY=d;dragObj.elStartLeft=parseInt(dragObj.elNode.style.left,10);dragObj.elStartTop=parseInt(dragObj.elNode.style.top,10);if(isNaN(dragObj.elStartLeft)){dragObj.elStartLeft=0}if(isNaN(dragObj.elStartTop)){dragObj.elStartTop=0}if(brwsr.isIE){document.attachEvent("onmousemove",dragGo);document.attachEvent("onmouseup",dragStop);window.event.cancelBubble=true;window.event.returnValue=false}if(brwsr.isNS){document.addEventListener("mousemove",dragGo,true);document.addEventListener("mouseup",dragStop,true);c.preventDefault()}}function dragGo(b){var a,c;if(brwsr.isIE){a=window.event.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;c=window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop}if(brwsr.isNS){a=b.clientX+window.scrollX;c=b.clientY+window.scrollY}dragObj.elNode.style.left=(dragObj.elStartLeft+a-dragObj.cursorStartX)+"px";dragObj.elNode.style.top=(dragObj.elStartTop+c-dragObj.cursorStartY)+"px";if(brwsr.isIE){window.event.cancelBubble=true;window.event.returnValue=false}if(brwsr.isNS){b.preventDefault()}}function dragStop(a){if(brwsr.isIE){document.detachEvent("onmousemove",dragGo);document.detachEvent("onmouseup",dragStop)}if(brwsr.isNS){document.removeEventListener("mousemove",dragGo,true);document.removeEventListener("mouseup",dragStop,true)}};