(function(){
    var article = document.querySelector('article#content');

    var highlight = function(){
        var highlightClass = "";
        if(document.location.hash){
            highlightClass = "highlight-" + document.location.hash.substring(1);
        }

        article.className = highlightClass;
    };


    document.addEventListener('DOMContentLoaded', function(){
        highlight();
        window.addEventListener('hashchange', highlight, false);
    });
})();


