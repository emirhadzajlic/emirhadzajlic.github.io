function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
    fetch("http://localhost:8080/auth", {
    method:"POST",
    headers:{
      'authorization':getCookie('token'),
    }
  })
  .then(e => e.json())
  .then(data => {
    console.log(data)
    if(data.isAuth) {
      if(window.location.href.indexOf("proba.html") > -1) {
        if(data.role !== "ad") {
          window.location.href = window.location.origin + '/html/main.html';
        }
      }
      document.querySelector('.userDataMenu').children[0].innerHTML = data.ime + " " + data.prezime
    } else {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = window.location.origin + '/html/login.html';
    }
  })