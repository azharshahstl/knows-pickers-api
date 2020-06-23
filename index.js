const mainBody = document.querySelector("main")
const address = document.getElementById("addressButton");
const script = document.createElement('script');
document.head.appendChild(script);

const stl = { lat: 38.6270, lng: -90.1994 }

document.addEventListener("DOMContentLoaded",() => {
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA99nF4WLsPeygHrRoJOTRH1Bk5DBJjoyg&callback=initialMap';
    loadAddressButton();
})
// var script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA99nF4WLsPeygHrRoJOTRH1Bk5DBJjoyg&callback=initMap';
// script.defer = true;
// script.async = true;

window.initialMap = function() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: stl,
        zoom: 13
    });
    const marker = new google.maps.Marker({position: stl, map: map});

};

const loadAddressButton = () => {
    const h4 = document.createElement("h4");
    const button = document.createElement("button");

    h4.innerHTML = "Click this button if you would like to create your address which will be used as a marker to place donated items.";
    button.innerHTML = "Create Address";
    button.addEventListener("click", loadAddressForm())

    address.appendChild(h4);
    address.appendChild(button);
}

const loadAddressForm = () => {
    console.log("form")
}


         

   