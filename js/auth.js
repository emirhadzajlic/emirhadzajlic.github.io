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
function goToPage(page){
  if(page == "index"){
    window.location.href = window.location.origin + "/index.html";
  } else {
    window.location.href = window.location.origin + `/html/${page}.html`;
  }
  
}

function toPage(data){
  if(data.role !== "ad") {
    if(data.role == "cc") {
      goToPage('callCentar');
    } else {
      goToPage("index");
    }
  }
} 
fetch(/*"https://realbauback.herokuapp.com/auth"*/"http://localhost:8080/auth", {
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
        toPage(data);
      }
      else if(window.location.href.indexOf("callCentar.html") > -1){
        if(data.role != "cc" && data.role != "ad"){
          goToPage("index");
        }
      } else if(window.location.href.indexOf("addAcc.html") > -1){
        toPage(data);
      } else if(window.location.href.indexOf("manageData.html") > -1){
        toPage(data);
      } else if(window.location.href.indexOf("index.html") > -1) {
        if(data.role == "ad") {
          goToPage("admin");
        } else if(data.role == "cc"){
          goToPage("callCentar");
        }
      }
      if(data.role !== "cc" && data.role !== "ad"){
        var radiosWindow = document.querySelector('.basic-radios');
        var newContainer = radiosWindow.cloneNode(true)
        let node;
        let container = false;
        let nodeCount = 0;
        data.columns.split(", ").forEach(e => {
          if(e.toLowerCase().indexOf('finish') > -1) {
            if(nodeCount == 2){
              radiosWindow.parentElement.append(newContainer);
              radiosWindow = newContainer;
              nodeCount = 0;  
            }
            node = document.querySelector(`.${e}`);
            if(container && container !== node.parentElement){
              node.parentElement.append(container.firstElementChild);
              container.remove()
            }
            if(node !== null) {
              container = node.parentElement;
              radiosWindow.appendChild(node);
            }
            nodeCount++;
          }
        })
      }
      if(data.role !== "ad"){
        var toDelete = document.querySelectorAll('.admin-only');
        if(toDelete !== null) {
          for(var i = 0; i < toDelete.length; i++){
            toDelete[i].remove()
          }
        }
      }
      var tableHead = document.querySelector('.styled-table');
      console.log(tableHead)
      if(tableHead !== null){
        tableHead = tableHead.firstElementChild.firstElementChild;
        data.columns.split(", ").forEach(e => {
          let node = document.createElement("th");
          let text = document.createTextNode(e)
          if(data.role !== "cc" && data.role !=="ad"){
            if(e == "STREET" || e == "HAUSNUMMER" || e == "ZUSAT" || e.toLowerCase().indexOf("finish") > -1){
              node.classList.add("for-phone");
            }
          } else if(data.role == "cc") {
            if(e == "STREET" || e == "HAUSNUMMER" || e == "ZUSAT" || e == "CITY"){
              node.classList.add("for-phone");
            }
          } else {
            if(e == "STREET" || e == "HAUSNUMMER" || e == "ZUSAT" || e == "CITY"){
              node.classList.add("for-phone");
            }
          }
          node.appendChild(text)
          tableHead.appendChild(node);
        })
      }
      if(data.role == "cc") {
        tableHead.innerHTML += '<th class="for-phone">EDIT</th>';
      }
      document.querySelector('.userDataMenu').children[0].innerHTML = data.ime + " " + data.prezime
    } else {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = window.location.origin + '/html/login.html';
    }
  })