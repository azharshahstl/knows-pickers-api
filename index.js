BASE_URL = "http://localhost:3000"
ADDRESS_URL = `${BASE_URL}/addresses`
ITEMS_URL = `${BASE_URL}/items`

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

   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB0vn_sUDcekAhSN54M5itcNSl9o-SKiRs&callback=initialMap`;
   script.src = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0vn_sUDcekAhSN54M5itcNSl9o-SKiRs`; 
   document.getElementById("item-form").style.display="none"; 
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
        body: JSON.stringify({street_number: e.target.form.elements[0].value, street_name: e.target.form.elements[1].value, zip_code: e.target.form.elements[2].value  })
    })
    .then(resp => resp.json())
    .then(json => {
        const newAddress = new Address(json);
        newAddress.newAddressGeocodeLoader();
    }) 
})

const loadItemsForm = (address) => {
    document.getElementById("create-address-form").style.display="none"; 
    document.getElementById("item-form").style.display="inline-block"; 
    var itemForm = document.getElementById("item-form");

    const form = document.createElement("form");
    const info = document.createElement("h3");

    info.innerHTML = `Items to be left for donation at: <i><p>${address.street_number} ${address.street_name}, ${address.zip_code}</p></i>`
    form.setAttribute("id", address.id)
    form.setAttribute("class", "form");
    form.setAttribute('method',"POST");
    form.setAttribute('action',"#");

    const itemInput = document.createElement("input"); 
    itemInput.setAttribute('type',"text");
    itemInput.setAttribute('name',"name");

    const addAnotherItemButton = document.createElement("button"); 
    addAnotherItemButton.setAttribute("id","add-another-button");
    addAnotherItemButton.innerHTML = "Add Another Item"
    addAnotherItemButton.addEventListener("click", addAnotherItem);

    const submitItemsButton = document.createElement("button"); 
    submitItemsButton.setAttribute("id","add-items-button");
    submitItemsButton.innerHTML = "Submit Items"
    submitItemsButton.addEventListener("click", submitItems)

    const cancelButton = document.createElement("button"); 
    cancelButton.setAttribute("id","cancel-items-button");
    cancelButton.innerHTML = "Cancel Items"
    cancelButton.addEventListener("click", function(e){
        document.getElementById("create-address-form").style.display="inline-block"; 
        document.getElementById("item-form").style.display="none"; 
    })

    form.appendChild(info)
    form.appendChild(itemInput);
    form.appendChild(addAnotherItemButton)
    form.appendChild(submitItemsButton);
    form.appendChild(cancelButton);
    itemForm.appendChild(form);

function addAnotherItem(e){
        e.preventDefault();
        const addAnotherItemButton = document.querySelector("add-another-button");
        const form = document.getElementsByClassName("form")[1]; 
        const itemInput = document.createElement("input");
        itemInput.setAttribute('type',"text");
        itemInput.setAttribute('name',"name");
        form.insertBefore(itemInput, form.childNodes[1])
        itemForm.appendChild(form);
    }

    

}

function submitItems(e){
    e.preventDefault(); 
    const itemObject = {address_id: e.target.form.id};
    const array = e.target.form.elements
        for (let index = 0; index < array.length-3; indexx++){
            itemObject.push(`name: ${array[index]}`);
            fetch(ITEMS_URL, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify(itemObject)
            })
            .then(response => response.json())
            .then(json => {
                const item = new Item(json);
                item.addItemToMarker();
            })
        }
}






