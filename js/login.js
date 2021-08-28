// let url = "https://realbauback.herokuapp.com";

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

function auth(){
  fetch("https://realbauback.herokuapp.com/auth", {
    method:"POST",
    headers:{
      'authorization':getCookie('token'),
    }
  })
  .then(e => e.json())
  .then(data => {
    console.log(data)
    if(data.isAuth) {
      if(data.role !== "ad") {
        window.location.href = window.location.origin + '/index.html';
      } else {
        window.location.href = window.location.origin +'/html/admin.html';
      }
      document.querySelector('.userDataMenu').children[0].innerHTML = data.ime + " " + data.prezime
    } else {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = window.location.origin + '/html/login.html';
    }
  })
}

if(getCookie("token")) {
  auth()
}



function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function login(){
  
    let dataToSend = [];
    dataToSend[0] = document.querySelector('input[name="email"]').value;
    dataToSend[1] = document.querySelector('input[name="password"]').value;
      fetch("https://realbauback.herokuapp.com/login",{
          method:"POST",
          body:JSON.stringify(dataToSend),
          credentials: 'same-origin',
          headers: { 
              'content-type': 'application/json',
              Accept: 'application/json'
        } 
      })
      .then(e => e.json())
      .then(data => {
          console.log(data)
          if(data.token){
              setCookie("token", data.token, 1)
              auth();
          }
        
      })
      .catch(err => console.log(err))
  }


  var a = document.getElementById("femail"),
    b = document.getElementById("fpass"),
    c = document.getElementById("loginBtn");

  a.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        b.focus()
      }
  });
  b.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      c.click()
    }
});