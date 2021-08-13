document.addEventListener("DOMContentLoaded",()=>{
    const sideNav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sideNav, {});
}
)
const toolTip = document.querySelectorAll(".tooltipped");
M.Tooltip.init(toolTip, {});
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
indicators:false,
height:500,
width:0,
transition:500,
interval:6000,
});
const autCom = document.querySelector(".autocomplete")
M.Autocomplete.init(autCom,{
    data:{
        "Nyeri":null,
        "Kiambu":null,
        "Nyandarua":null,
    }
});
const sc = document.querySelectorAll(".scrollspy");
M.ScrollSpy.init(sc, {});
const mb = document.querySelectorAll(".materialboxed");
console.log(mb);
M.Materialbox.init(mb, {});
const items = document.querySelectorAll('.collapsible');
M.Collapsible.init(items);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    console.log(elems);
     M.Modal.init(elems);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
 M.Parallax.init(elems);
  });
  //datepicker and timepicker
  const dp = document.querySelector(".datepicker");
  M.Datepicker.init(dp);
  const tp = document.querySelector(".timepicker");
  M.Timepicker.init(tp);

//firebase getting document
db.collection("Travel").get().then((snapshot) =>{
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    });
})
//pushing data to firebase collection form content
let form = document.querySelector(".content");
console.log(form);
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("my page");
    db.collection("Travel").add({
        name: form.name.value,
        phonenumber: form.phonenumber.value,
        issue:form.issue.value
    })
   form.name.value = "";
    form.phonenumber.value = "";
    form.issue.value = "";
})
console.log(form.name);
//pushing data to firebase collection form content
let dk = document.querySelector(".doctor");
console.log(dk);    
dk.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("My about page");
db.collection("Nutrition").add({
    name:dk.name.value,
    phonenumber:dk.number.value,
    email:dk.email.value,
    issue:dk.issue.value,
    date:dk.date.value,
    // date:dk.time.valiue
})
dk.name.value = "";
dk.number.value = "";
dk.email.value = "";
dk.issue.value = "";
dk.date.value = "";
//  dk.time.value = "";
console.log(dk.name);
}
)
//userauthenication
let admy = document.querySelector(".Admy");
console.log(admy);
admy.addEventListener("submit",(e)=>{
    e.preventDefault();
    const signup_email = admy["signup_email"].value
    console.log(signup_email);
    const signup_password = admy["signup_password"].value
    console.log(signup_password);
auth.createUserWithEmailAndPassword(signup_email, signup_password)
.then(cred=>
    {
        console.log(cred.user);
        const md = document.querySelector("#modal1");
        M.Modal.getInstance(md).close();
        admy.reset();
    })
})




// let rep = document.querySelector(".Repeats");
// console.log(rep);