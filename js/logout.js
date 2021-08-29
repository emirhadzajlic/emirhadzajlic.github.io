function deleteToken(){
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  
  function logout(){
    fetch(/*"https://realbauback.herokuapp.com/logout"*/"http://localhost:8080/logout", {
      method:"GET",
      headers:{
        'authorization':getCookie('token'),
      }
    })
    .then(e => e.json())
    .then(data => {
      deleteToken();
      window.location.href = window.location.origin + '/html/login.html'
    })
  }