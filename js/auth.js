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
      if(window.location.href.indexOf("admin.html") > -1) {
        if(data.role !== "ad") {
          window.location.href = window.location.origin + '/html/main.html';
        }
      }
      var radiosWindow = document.querySelector('.basic-radios');
      let node;
      let container = false;
      data.columns.split(", ").forEach(e => {
        if(e.toLowerCase().indexOf('finish') > -1) {
          node = document.querySelector(`.${e}`);
          if(container && container !== node.parentElement){
            node.parentElement.appendChild(container.firstElementChild);
            container.remove()
          }
          container = node.parentElement;
          radiosWindow.appendChild(node);
          
          
        }
      })
      console.log(container)
      var tableHead = document.querySelector('.styled-table').firstElementChild.firstElementChild;
      data.columns.split(", ").forEach(e => {
        let node = document.createElement("th");
        let text = document.createTextNode(e)
        node.appendChild(text)
        tableHead.appendChild(node);
      })
      document.querySelector('.userDataMenu').children[0].innerHTML = data.ime + " " + data.prezime
    } else {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = window.location.origin + '/html/login.html';
    }
  })