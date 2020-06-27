BASE_URL = "http://localhost:3000"
ADDRESS_URL = `${BASE_URL}/addresses`

const mainBody = document.querySelector("main")
const address = document.getElementById("addressButton");
const script = document.createElement('script');
const cancelButton = document.getElementById("cancel-button");
const addButton = document.getElementById("add-button")
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
    
    h4.innerHTML = "Click the following button if you would like to create the address which will be used to marke the location of donated items.";
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
        body: JSON.stringify({street_number: e.target.form.elements[0].value, city: e.target.form.elements[1].value, state: e.target.form.elements[2].value, zip_code: e.target.form.elements[3].value  })
    })
    .then(resp => resp.json())
    .then(json => {
        console.log("hello")
    })

})


         

   