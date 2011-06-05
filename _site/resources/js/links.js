(function(){
/* Removes all the mark elements from the page. */
var clearHighlights = function(){
    var marks = document.getElements('mark');
    marks.forEach(function(mark){
        var parent = mark.parentNode;
        
        while (mark.childNodes.length) parent.insertBefore(mark.firstChild, mark);
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
        var treeWalker = document.createTreeWalker($('content'), 
            NodeFilter.SHOW_TEXT,
            { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
	        false
	    );

        var node, textContent;
        while( node = treeWalker.nextNode() ){
            textContent = node.textContent;
            if(node.textContent.contains(text)){
                node = node.splitText(textContent.indexOf(text));
                node.splitText(text.length);
                
                var mark = new Element('mark').wraps(node);
                setTimeout(function(){
                    mark.setStyle('background', 'rgba(175, 214, 175,0.7)');
                }, 1);
                break;
            }
        }
    });
};
    
document.addEventListener('DOMContentLoaded', function(){
    document.getElement('*[href$=do.html]').addEventListener('click',
        highlight.bind(null, ['software engineering', 'be devoted', 'work @ Inkling']), true);
    document.getElement('*[href$=make.html]').addEventListener('click',
        highlight.bind(null, ['web wizardy', 'This website', 'projects']), true);
    document.getElement('*[href$=contact.html]').addEventListener('click',
        highlight.bind(null, ['me@kerryck.com']), true);
}, true);

})()


