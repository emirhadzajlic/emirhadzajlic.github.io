// let url = "https://realbauback.herokuapp.com";

function search(){
	let dataToSend = {};
	dataToSend.FIRSTNAME = document.querySelector('input[name="FirstName"]').value;
  dataToSend.NAME = document.querySelector('input[name="Surname"]').value;
  dataToSend.CO_ID = document.querySelector('input[name="CoId"]').value;
  dataToSend.CITY = document.querySelector('input[name="City"]').value;
  dataToSend.STREET = document.querySelector('input[name="Street"]').value;
  dataToSend.HAUSNUMMER = document.querySelector('input[name="number"]').value;
  dataToSend.DP = document.querySelector('input[name="DpNo"]').value;
  // dataToSend.STATUS = document.querySelector('input[name="Status"]').value;
  dataToSend.PHONE = document.querySelector('input[name="Tel"]').value;
  dataToSend.AREAPOP = document.querySelector('input[name="AreaPop"]').value;
  dataToSend.TZIP = document.querySelector('input[name="Tzip"]').value;
  dataToSend.EMAIL = document.querySelector('input[name="Email"]').value;
  dataToSend.HBVOM = document.querySelector('input[name="HbVom"]').value;
  dataToSend.TFVOM = document.querySelector('input[name="TfbVom"]').value;
  dataToSend.FVOM = document.querySelector('input[name="FazaVom"]').value;
  dataToSend.DPGVom = document.querySelector('input[name="DpgVom"]').value;
  dataToSend.POPVom = document.querySelector('input[name="PopVom"]').value;
  dataToSend.MVOM = document.querySelector('input[name="MVom"]').value;
  dataToSend.AVOM = document.querySelector('input[name="AVom"]').value;

  if(document.getElementById('hb_finish_yes').checked || document.getElementById('hb_finish_no').checked) {
    dataToSend.HBFinish = document.querySelector('input[name="hbfinish"]:checked').value
  }
  if(document.getElementById('dp_finish_yes').checked || document.getElementById('dp_finish_no').checked) {
    dataToSend.DPFinish = document.querySelector('input[name="dpfinish"]:checked').value;
  }
  if(document.getElementById('pop_finish_yes').checked || document.getElementById('pop_finish_no').checked) {
    dataToSend.POPFinish = document.querySelector('input[name="popfinish"]:checked').value;
  }
  if(document.getElementById('tfb_finish_yes').checked || document.getElementById('tfb_finish_no').checked) {
    dataToSend.TIEFBAUFINISH = document.querySelector('input[name="tfbfinish"]:checked').value;
  }
  if(document.getElementById('faza_finish_yes').checked || document.getElementById('faza_finish_no').checked) {
    dataToSend.FFINISH = document.querySelector('input[name="fazafinish"]:checked').value;
  }
  if(document.getElementById('m_finish_yes').checked || document.getElementById('m_finish_no').checked) {
    dataToSend.MFINISH = document.querySelector('input[name="mfinish"]:checked').value;
  }
  if(document.getElementById('akt_finish_yes').checked || document.getElementById('akt_finish_no').checked) {
    dataToSend.AKTIVIRUNGFINISH = document.querySelector('input[name="aktfinish"]:checked').value;
  }
  if(document.getElementById('ver_finish_yes').checked || document.getElementById('ver_finish_no').checked) {
    dataToSend.VermessungFinish = document.querySelector('input[name="verfinish"]:checked').value;
  }
  
  fetch(/*"https://realbauback.herokuapp.com/proba"*/"http://localhost:8080/proba", {
	  method: 'POST',
	  headers: {
		  'Content-Type': 'application/json',
      'authorization':getCookie("token"),
	  },
	  body: JSON.stringify(dataToSend)
    }).then(e => e.json())
    .then(data => {
      let tableText = ""
      data.forEach((user) => {
        tableText += "<tr>";
        for (const column in user){
          if(column.toLowerCase().indexOf('finish') > -1){
            if(user[column] == "DA"){
              tableText += "<td style='color:green'><span style='display:none'>DA</span><img class='yesIcon' src='../background/cor1.png'></td>";
            } else {
              tableText += "<td style='color:red'><span style='display:none'>NE</span><img style='opacity:0.8;' class='noIcon' src='../background/iks3.png'></td>";
            }

          } else {
            if(column == "STREET" || column == "HAUSNUMMER" || column == "ZUSAT" || column == "CITY") {
              tableText += '<td class="for-phone">' + user[column] + "</td>"
            } else {
              tableText += '<td>' + user[column] + "</td>"
            }
          }
        }
      tableText += `<td class="for-phone"><button onclick="displayForm(this)" class="bttn"><img src="../background/editIcon.png"></button></td>`;
      tableText += "</tr>";
      // console.log(user);
      });
      document.getElementById("tablebodylol").innerHTML = tableText;
    })
    
.catch(err => console.log(err))
}

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

let url2 = "http://localhost:8080/tableAll";

fetch(/*"https://realbauback.herokuapp.com/tableAll"*/"http://localhost:8080/tableAll",{
  method:"POST",
  headers:{
    'authorization':getCookie("token")
  }
})
.then(e => e.json())
  .then((response) => {
    let tableText = "";
    response.forEach((user) => {
      tableText += "<tr>";
      for (const column in user){
        if(column.toLowerCase().indexOf('finish') > -1){
          if(user[column] == "DA"){
            tableText += "<td style='color:green'><span style='display:none'>DA</span><img class='yesIcon' src='../background/cor1.png'></td>";
          } else {
            tableText += "<td style='color:red'><span style='display:none'>NE</span><img style='opacity:0.8;' class='noIcon' src='../background/iks3.png'></td>";
          }

        } else {
          if(column == "STREET" || column == "HAUSNUMMER" || column == "ZUSAT" || column == "CITY") {
            tableText += '<td class="for-phone">' + user[column] + "</td>"
          } else {
            tableText += '<td>' + user[column] + "</td>"
          }
        }
      }
      tableText += `<td class="for-phone"><button onclick="displayForm(this)" class="bttn"><img src="../background/editIcon.png"></button></td>`;
      tableText += "</tr>";
      // console.log(user);
    });

    document.getElementById("tablebodylol").innerHTML = tableText;
  })
  .catch(function (error) {
    console.log(error);
  })

  function displayForm(e){
    console.log(e.parentNode.parentNode.children[2].innerHTML)
    document.getElementById("inpName").innerHTML=e.parentNode.parentNode.children[0].innerHTML+" "+e.parentNode.parentNode.children[1].innerHTML;
    // document.getElementById("inputsContainer").style.display="none";
    // document.getElementById("inputsContainer").style.marginLeft="0";
    // document.getElementById("inputsContainer").style.display="block";
    document.getElementById("manageDataCont").style.opacity="1";
    document.getElementById("manageDataCont").style.marginLeft="-200%";
    // document.getElementById("inputsContainer").style.transition="1s";
  }
  function removeInp(){
    document.getElementById("manageDataCont").style.opacity="0";
    document.getElementById("manageDataCont").style.marginLeft="0%";
  }
  // function opacityHover(){
  //   document.getElementById("manageDataCont").style.opacity="1";
  // }
  // function opacityLeave(){
  //   document.getElementById("manageDataCont").style.opacity="0.5";
  // }

function updateData(){

  let dataToSend = {};

  dataToSend.FIRSTNAME = document.getElementById("inpName").innerHTML.split(" ")[0];
  dataToSend.NAME = document.getElementById("inpName").innerHTML.split(" ")[1];
  
  dataToSend.HBDatum = document.getElementById("hb_datum").value;
  dataToSend.HBTermin = document.getElementById("hb_termin").value;
  dataToSend.HBFinish = document.getElementById("hb_finish").value;
  dataToSend.HBVOM = document.getElementById("hb_vom").value;
  dataToSend.HBCALLDATE = document.getElementById("hb_call").value;
  dataToSend.TIEFBAUDatum = document.getElementById("tfb_datum").value;
  dataToSend.TIEFBAUFINISH = document.getElementById("tfb_finish").value;
  dataToSend.METER = document.getElementById("tfb_meter").value;
  dataToSend.TFVOM = document.getElementById("tfb_vom").value;
  dataToSend.FASERDatum = document.getElementById("faser_datum").value;
  dataToSend.FFINISH = document.getElementById("faser_finish").value;
  dataToSend.FVOM = document.getElementById("faser_vom").value;
  dataToSend.MDATUM = document.getElementById("montage_datum").value;
  dataToSend.MTERMIN = document.getElementById("montage_termin").value;
  dataToSend.CAllMDate = document.getElementById("montage_call").value;
  dataToSend.MFINISH = document.getElementById("montage_finish").value;
  dataToSend.MVOM = document.getElementById("montage_vom").value;
  dataToSend.ADATUM = document.getElementById("akt_datum").value;
  dataToSend.AKTIVIRUNGTERMIN = document.getElementById("akt_termin").value;
  dataToSend.AKTIVIRUNGFINISH = document.getElementById("akt_finish").value;
  dataToSend.AVOM = document.getElementById("akt_vom").value;
  dataToSend.VermessungDatum = document.getElementById("ver_datum").value;
  dataToSend.VermessungFinish = document.getElementById("ver_finish").value;
  dataToSend.VermessungVom = document.getElementById("ver_vom").value;
  dataToSend.TICKETDATUM = document.getElementById("ticket_datum").value;
  dataToSend.TICKETTERMIN = document.getElementById("ticket_termin").value;
  dataToSend.TICKETFINISH = document.getElementById("ticket_finish").value;
  dataToSend.COMMENT = document.getElementById("comment").value;
  
  fetch(/*"https://realbauback.herokuapp.com/updateData"*/"http://localhost:8080/updateData", {
	  method: 'POST',
	  headers:{
      'Content-Type': 'application/json',
      'authorization':getCookie("token"),
    },
	  body: JSON.stringify(dataToSend)
  })
  .then(
    document.getElementById("hb_datum").value = "",
    document.getElementById("hb_termin").value = "",
    document.getElementById("hb_finish").value = "",
    document.getElementById("hb_vom").value = "",
    document.getElementById("hb_call").value = "",
    document.getElementById("tfb_datum").value = "",
    document.getElementById("tfb_finish").value = "",
    document.getElementById("tfb_meter").value = "",
    document.getElementById("tfb_vom").value = "",
    document.getElementById("faser_datum").value = "",
    document.getElementById("faser_finish").value = "",
    document.getElementById("faser_vom").value = "",
    document.getElementById("montage_datum").value = "",
    document.getElementById("montage_termin").value = "",
    document.getElementById("montage_call").value = "",
    document.getElementById("montage_finish").value = "",
    document.getElementById("montage_vom").value = "",
    document.getElementById("akt_datum").value = "",
    document.getElementById("akt_termin").value = "",
    document.getElementById("akt_finish").value = "",
    document.getElementById("akt_vom").value = "",
    document.getElementById("ver_datum").value = "",
    document.getElementById("ver_finish").value = "",
    document.getElementById("ver_vom").value = "",
    document.getElementById("ticket_datum").value = "",
    document.getElementById("ticket_termin").value = "",
    document.getElementById("ticket_finish").value = "",
    document.getElementById("comment").value = "",
  )
  .catch(err => console.log(err))
}


mybutton = document.getElementById("myBtn");

// When the user scrolls down 1300px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

// function scrollFunction() {
//   if (
//     document.body.scrollTop > 1250 ||
//     document.documentElement.scrollTop > 1250
//   ) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }
// function topFunction() {
//     //   document.body.scrollTop = 1200;
//       document.documentElement.scrollTop = 1180;
// }

let i = 0
function displayMoreFilters(){
  if(i%2===0) document.getElementById("moreInputs").style.display="block";
  else document.getElementById("moreInputs").style.display="none";
  i++;
} 

function fnExcelReport()
{
  var tab_text="<table border='1px'><tr height='30px' width='100px' style='color:white;font-size:18px;' bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('tblStocks'); // id of table

    for(j = 0; j < tab.rows.length; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, ""); 
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    // var ua = window.navigator.userAgent;
    // var msie = ua.indexOf("MSIE "); 

    // if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    // {
    //     txtArea1.document.open("txt/html","replace");
    //     txtArea1.document.write(tab_text);
    //     txtArea1.document.close();
    //     txtArea1.focus(); 
    //     sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    // }   
        sa = window.location.assign('data:application/vnd.ms-excel; charset=utf-8,' + encodeURIComponent(tab_text));

    return (sa);
}