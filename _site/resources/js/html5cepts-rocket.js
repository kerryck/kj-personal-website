// see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
(function(){
    // chrome shipped without the time arg in m10
    var timeundefined = false;
    if (window.webkitRequestAnimationFrame){
        webkitRequestAnimationFrame(function(time){
            timeundefined = (time == undefined);
        });
    }
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              (window.webkitRequestAnimationFrame && !timeundefined) || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(function(){
                    callback(+new Date);
                }, 1000 / 60);
              };
    })();
})();


