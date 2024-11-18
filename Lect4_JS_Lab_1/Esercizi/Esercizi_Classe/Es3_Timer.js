function onclick_fn() {
    var button = document.getElementsByTagName("button")[0];
    var para = document.getElementById("para1");
    button.disabled = true;
    var max_sec = sec = 10;
    para.textContent = 0;
    var timer = setInterval(function(){
        para.textContent = max_sec - (--sec);
        if (sec <=0){
            clearInterval(timer);
            button.disabled = false;
        }
    }, 1000);
};

