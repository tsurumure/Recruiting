// Cordova
function addScript(src, call){
  var head= document.getElementsByTagName('head')[0], script= document.createElement('script');  
  script.type= 'text/javascript';  
  script.onload = script.onreadystatechange = function() {
    if (!this.readyState || this.readyState === "loaded" ||    this.readyState === "complete" ) { 
      call(); script.onload = script.onreadystatechange = null;
    }
  };
  script.src= src; head.appendChild(script);
}
var u = navigator.userAgent;
if(u.indexOf('dgb') > -1){
  addScript("/Content/Phone/js/cordova/cordova.js");
  addScript("/Content/Phone/js/cordova/js/index.js");
}