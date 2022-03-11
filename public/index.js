/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
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

//getting the radio button value
function displayRadiovalue(){
    const ele = document.getElementsByName('housedescription');
    ele.forEach(descr=>{
        if(descr.checked){
    // document.getElementById("houseresult").innerHTML = descr.value;
        }
    })
}

function initMap(){
    //location of greenfarm
    const greenfarm = {lat:-0.5813753 , lng: 37.2982014};
    const map = new google.maps.Map(
        document.getElementById("map"),
        {
          zoom: 4,
          center:greenfarm,
        }
      );
        // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: greenfarm,
    map: map,
  });
};
