(function(){
/* Removes all the mark elements from the page. */
var clearHighlights = function(){
    var marks = document.querySelectorAll('mark');
    marks = Array.prototype.slice.call(marks);

    marks.forEach(function(mark){
        var parent = mark.parentNode;

        while (mark.childNodes.length) {
            parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
    });
};

/* Adds a mark element around the first occurance of each highlight. Then sets
 * the background.
 */
var highlight = function(listToHighlight, event){
    if(event){
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
    }
    clearHighlights();

    listToHighlight.forEach(function(text){
        var treeWalker = document.createTreeWalker(document.querySelector('#content'),
            NodeFilter.SHOW_TEXT,
            { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
	        false
	    );

        var node, textContent;
        while( (node = treeWalker.nextNode()) ){
            textContent = node.textContent;
            if(node.textContent.indexOf(text) !== -1){
                node = node.splitText(textContent.indexOf(text));
                node.splitText(text.length);

                var mark = document.createElement('mark');
                mark.innerHTML = node.textContent;
                node.parentElement.replaceChild(mark, node);
                setTimeout(function(){
                    mark.style['background-color'] = 'rgba(175, 214, 175,0.7)';
                }, 1);
                break;
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('[href$="do.html"]').addEventListener('click',
        highlight.bind(null, ['software engineering', 'be devoted', 'Exciting stuff!']), true);
    document.querySelector('[href$="make.html"]').addEventListener('click',
        highlight.bind(null, ['javascript wizardry', 'This website', 'projects']), true);
    document.querySelector('[href$="contact.html"]').addEventListener('click',
        highlight.bind(null, ['me@kerryck.com']), true);
}, true);

})();


