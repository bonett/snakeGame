  (function (window, document, draw) {

    var button_start = document.getElementById('button_start');

    button_start.addEventListener("click", function(){
        draw.init();
    });
})(window, document, draw);