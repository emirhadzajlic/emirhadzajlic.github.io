var forPhone = function(){
    if (window.innerWidth<600){
       document.querySelectorAll("th, td").forEach(e => {
            if(!e.classList.contains("for-phone")){
                e.style.display = "none";
            }
       })
    } else {
        document.querySelectorAll("th, td").forEach(e => {
            if(!e.classList.contains("for-phone")){
                e.style.display = "";
            }
       })
    }
};


window.addEventListener("resize", forPhone);

export {forPhone};