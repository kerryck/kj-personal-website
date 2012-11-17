(function(){
var KEY_DOWN = 40, KEY_UP = 38;
var pagemarks = [], currIndex = 0;

var findIndex = function(position){
    var low = 0, high = pagemarks.length;
    while(low < high){
        var mid = Math.floor( (low + high) / 2 );
        pagemarks[mid].position > position? high = mid : low = mid + 1;
    }
    return low;
};

/**
 * An event lister that adds a pagemark under under the cursor on a Ctrl+Click.
 *
 * Bug: Current positioning method does not work with tables.
 */
document.addEventListener('click', function(evt){
    if(evt.ctrlKey){
        var clicked = evt.target,
            document = clicked.ownerDocument,
            pagemarkEl = document.createElement('div');
        pagemarkEl.style.position = 'absolute';
        pagemarkEl.style.fontSize = '26px';
        pagemarkEl.style.color = 'black';
        pagemarkEl.style.top = clicked.offsetTop + evt.offsetY - 13 + 'px';
        pagemarkEl.style.left = clicked.offsetLeft + evt.offsetX - 13 + 'px';
        pagemarkEl.innerHTML = '\u2605';

        (clicked.offsetParent || clicked).appendChild(pagemarkEl, clicked);

        var position = clicked.offsetTop + evt.offsetY,
            currIndex = findIndex(position);
        var pagemark = {
            position: position,
            el: pagemarkEl
        };
        pagemarks.splice(currIndex, 0, pagemark);
    }
});

/**
 * An event listener to move to the next/previous page mark when
 * Ctrl+Up/Ctrl+Down is pressed.
 */
document.addEventListener('keydown', function(evt){
    if(evt.ctrlKey){
        if(evt.keyCode === KEY_UP){
            currIndex = (currIndex - 1 + pagemarks.length) % pagemarks.length;
            pagemarks[currIndex].el.scrollIntoViewIfNeeded();
        } else if (evt.keyCode === KEY_DOWN){
            currIndex = (currIndex + 1) % pagemarks.length;
            pagemarks[currIndex].el.scrollIntoViewIfNeeded();
        }
    }
});

})();