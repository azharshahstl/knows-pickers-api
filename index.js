BASE_URL = "http://localhost:3000"
ADDRESS_URL = `${BASE_URL}/addresses`

const mainBody = document.querySelector("main")
const address = document.getElementById("addressButton");
const script = document.createElement('script');
const cancelButton = document.getElementById("cancel-button");
const addButton = document.getElementById("add-button")
document.head.appendChild(script);



var map;
var geocoder;

const stl = { lat: 38.6270, lng: -90.1994 }

document.addEventListener("DOMContentLoaded",() => {

   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDv1pvIpepwVhFH7hFDoyKFg1dDBbCne_8&callback=initialMap`;
   script.src = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDv1pvIpepwVhFH7hFDoyKFg1dDBbCne_8`; 
   loadAddressButton();
})

window.initialMap = function() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map"), {
        center: stl,
        zoom: 13
    });
    const marker = new google.maps.Marker({position: stl, map: map});

};

fetch(ADDRESS_URL)
.then(response => response.json())
.then(addressData => {
    addressData.forEach( (address) => {
        const seedObject = new Address(address);
        seedObject.geocodeLoader();
    })
    
})

const loadAddressButton = () => {
    const h4 = document.createElement("h4");
    const button = document.createElement("button");
    
    h4.innerHTML = "Click the following button if you would like to create the address which will be used to marke the location of the items you are donating.";
    button.setAttribute("Id", "create-address")
    button.innerHTML = "Create Address";
    button.addEventListener("click", function () {
        document.getElementById("create-address-form").style.display="inline-block";
        document.getElementById("addressButton").style.display="none";
    })

    address.appendChild(h4);
    address.appendChild(button);
}

cancelButton.addEventListener("click", function (e) {
    e.preventDefault(); 
    document.getElementById("create-address-form").style.display="none";
    document.getElementById("addressButton").style.display="inline-block";
})

addButton.addEventListener("click", function(e) {
    e.preventDefault();
    fetch(ADDRESS_URL, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
          },
        body: JSON.stringify({street_number: e.target.form.elements[0].value, street_name: e.target.form.elements[1].value, zip_code: e.target.form.elements[4].value  })
    })
    .then(resp => resp.json())
    .then(json => {
        const newAddress = new Address(json);
        newAddress.geocodeLoader();
    }) 
})

