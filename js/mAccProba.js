// let url = "https://realbauback.herokuapp.com";

const menuBtn = document.querySelector(".menu-btn");

const menu = document.querySelector(".menu");

const menuNav = document.querySelector(".menu-nav");

const navItems = document.querySelectorAll(".nav-item");

// Set the initial state of the menu
let showMenu = false;

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

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");

    navItems.forEach((item) => item.classList.add("show"));
    
    // Reset the menu state
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");

    navItems.forEach((item) => item.classList.remove("show"));

    // Reset the menu state
    showMenu = false;
  }
}

function manageAcc(){
  let dataToSend = {};
  dataToSend.Email = document.querySelector('input[name="changeEmail"]').value;
  dataToSend.Password = document.querySelector('input[name="changePassword"]').value;
  dataToSend.Password2 = document.querySelector('input[name="changePassword2"]').value;
  document.getElementById('pomocni').style.color = 'green'
  if(dataToSend.Password === dataToSend.Password2){
    fetch("https://realbauback.herokuapp.com/manage",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers: { 'content-type': 'application/json' } 
    })
    .then(
      document.getElementById('pomocni').innerText = 'Podaci uspjesno izmijenjeni!'
    )
    .then(
      location.reload()
    )
  } else{
    document.getElementById('pomocni').innerText = 'Sifre se ne poklapaju';
    document.getElementById('pomocni').style.color = 'red';
  }
}

function addAcc(){
  
  let dataToSend = [];
  dataToSend[0] = document.querySelector('input[name="FirstName"]').value;
  dataToSend[1] = document.querySelector('input[name="Surname"]').value;
  dataToSend[2] = document.querySelector('input[name="Email"]').value;
  dataToSend[3] = document.querySelector('select[name="Roll"]').value;
  dataToSend[4] = document.querySelector('input[name="Password"]').value;
  // dataToSend[5] = document.querySelector('input[name="Password2"]').value;
  document.getElementById('pomocni').style.color = 'green'
  if(dataToSend[4] === document.querySelector('input[name="Password2"]').value){
    console.group(dataToSend)
    fetch("https://realbauback.herokuapp.com/register",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers: { 
          'content-type': 'application/json',
          'authorization': getCookie("token")
      } 
    })
    .then(e => e.json())
    .then( data => {
      console.log(data)
      document.getElementById('pomocni').innerText = 'Nalog je uspjesno dodat!'
      //location.reload()
    })
  } else{
    document.getElementById('pomocni').innerText = 'Sifre se ne poklapaju';
    document.getElementById('pomocni').style.color = 'red';
  }
}

var a = document.getElementById("fname"),
    b = document.getElementById("fsurname"),
    c = document.getElementById("femail"),
    d = document.getElementById("fstatus"),
    f = document.getElementById("fpass"),
    g = document.getElementById("fpasss");
//  d.addEventListener("keyup", function(e){
//    if(e.key === 'Enter'){
//     e.preventDefault()
//     f.click()
//    }
//  })
  a.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        b.focus()
      }
  });
  b.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      c.focus()
    }
});
c.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    f.focus()
  }
});
// document.getElementById("fstatus").addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     f.focus()
//   }
// });
f.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    g.focus()
  }
});
g.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    document.getElementById("btn").click()
  }
});

// function login(){
  
//   let dataToSend = {};
//   dataToSend.username = document.querySelector('input[name="email"]').value;
//   dataToSend.password = document.querySelector('input[name="password"]').value;
  
//     fetch('http://localhost:8080/auth',{
//         method:"POST",
//         body:JSON.stringify(dataToSend),
//         headers: { 'content-type': 'application/json' } 
//     })
//     .then(console.log(dataToSend))
//     .then(window.location.replace("http://127.0.0.1:5500/html/proba.html"))
// }