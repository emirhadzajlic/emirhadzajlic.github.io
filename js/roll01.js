function menuToggle(){
    let menu = document.querySelector(".menu").classList;
    if(menu.contains('menu-active')) menu.remove('menu-active')
    else menu.add('menu-active')
}

function manageAccountsWindow(){
    document.querySelector('.manage-accounts').classList.add('manage-accounts-active');
    document.querySelector('.container').classList.remove('container-active');
    menuToggle();
}

function searchWindow(){
    document.querySelector('.manage-accounts').classList.remove('manage-accounts-active');
    document.querySelector('.container').classList.add('container-active');
    menuToggle();
}