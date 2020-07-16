BASE_URL = "http://localhost:3000"
ADDRESS_URL = `${BASE_URL}/addresses`
ITEMS_URL = `${BASE_URL}/items`

const mainBody = document.querySelector("main");
const addressDiv = document.getElementById("addressButton");
const script = document.createElement('script');
const cancelButton = document.getElementById("cancel-button");
const addAddressButton = document.getElementById("add-button");
const createAddressForm = document.getElementById("create-address-form");
const itemsFormDiv = document.getElementById("items-form");
const editItemsDiv = document.getElementById("edit-items")

// const editItemsForm = document.createElement("form");


document.head.appendChild(script);

const stl = { lat: 38.6270, lng: -90.1994 }

document.addEventListener("DOMContentLoaded",() => {

   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB0vn_sUDcekAhSN54M5itcNSl9o-SKiRs&callback=initialMap`;
   script.src = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0vn_sUDcekAhSN54M5itcNSl9o-SKiRs`; 
   itemsFormDiv.style.display="none"; 
   editItemsDiv.style.display="none"; 
   loadAddressDiv();
})

window.initialMap = function() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map"), {
        center: stl,
        zoom: 13
    });
    const marker = new google.maps.Marker({position: stl, map: map});

};

// fetch(ADDRESS_URL)
// .then(response => response.json())
// .then(addressData => {
//     addressData.forEach( (address) => {
//         const seedObject = new Address(address);
//         seedObject.checkAddress();
//     })
// })

const loadAddressDiv= () => {
    const h4 = document.createElement("h4");
    const button = document.createElement("button");
    
    h4.innerHTML = "Click the following button if you would like to create the address which will be used to mark the location of the items you are donating.";
    button.setAttribute("id", "create-address")
    button.innerHTML = "Create Address";

    addressDiv.appendChild(h4);
    addressDiv.appendChild(button);
    
    button.addEventListener("click", function () {
        createAddressForm.style.display="inline-block";
        addressDiv.style.display="none";
    })
}

cancelButton.addEventListener("click", function (e) {
    e.preventDefault(); 
    createAddressForm.style.display="none";
    addressDiv.style.display="inline-block";
})

addAddressButton.addEventListener("click", function(e) {
    e.preventDefault();
    fetch(ADDRESS_URL, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
          },
        body: JSON.stringify({address: {street_number: e.target.form.elements[0].value, street_name: e.target.form.elements[1].value, zip_code: e.target.form.elements[2].value  }})
    })
    .then(resp => resp.json())
    .then(json => {
        const newAddress = new Address(json);
        newAddress.checkAddress();
    }) 
})

const loadItemsForm = (address) => {
    createAddressForm.style.display="none"; 
    itemsFormDiv.style.display="inline-block"; 
    
    const form = document.createElement("form");
    const info = document.createElement("h3");

    info.innerHTML = `Items to be left for donation at: <i><p>${address.street_number} ${address.street_name}, ${address.zip_code}</p></i>`
    form.setAttribute("data-id", address.id)
    form.setAttribute("id", "address-items-form");
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
    cancelButton.addEventListener("click", cancelAddress)

    form.appendChild(info)
    form.appendChild(itemInput);
    form.appendChild(addAnotherItemButton)
    form.appendChild(submitItemsButton);
    form.appendChild(cancelButton);
    itemsFormDiv.appendChild(form);

function cancelAddress(e){
    e.preventDefault();
    createAddressForm.style.display="inline-block"; 
    itemsFormDiv.style.display="none"; 
    document.getElementById("address-items-form").remove();
}

function addAnotherItem(e){
        e.preventDefault();
        const addAnotherItemButton = document.querySelector("add-another-button");
        const form = document.getElementsByClassName("form")[1]; 
        const itemInput = document.createElement("input");
        itemInput.setAttribute('type',"text");
        itemInput.setAttribute('name',"name");
        form.insertBefore(itemInput, form.childNodes[2])
        itemsFormDiv.appendChild(form);
    }

    

}

// function submitItems(e){
//     e.preventDefault(); 
//     const array = e.target.form.elements
//         for (let index = 0; index < array.length-3; index++){
            // fetch(ITEMS_URL, {
            //     method: 'POST', 
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Accept": "application/json"
            //     },
            //     body: JSON.stringify({address_id: e.target.form.dataset.id, name: array[index].value })
            // })
//             .then(response => response.json())
//             .then(json => {
//                 // const addressObject = new Address(json)
//                 // console.log(Address.allAddresses)             
//             })
            
            
//         } 
        
// }

async function getAddressWithItems(e) {
    const tempArray = [];
    const array = e.target.form.elements
    for (let index = 0; index < array.length-3; index++){
       
           const fetchResponse = await fetch(ITEMS_URL, {
               method: 'POST', 
               headers: {
                   'Content-Type': 'application/json',
                   "Accept": "application/json"
               },
               body: JSON.stringify({address_id: e.target.form.dataset.id, name: array[index].value })  
           })
           const data = await fetchResponse.json();
           tempArray.push(data);
    }
       const newAddress = new Address(tempArray[tempArray.length - 1]);
       newAddress.geocodeLoader();     
};

function submitItems(e) {
    e.preventDefault(); 
    getAddressWithItems(e);    
}

function attachContentToMarker(marker, content) {
    const infowindow = new google.maps.InfoWindow({
        content: content
    });
    marker.addListener("mouseover", function() {
        infowindow.open(marker.get("map"), marker)    
    });
    marker.addListener("mouseout", function() {
        infowindow.close(marker.get("map"), marker)    
    });

    marker.addListener("click", function() {
        const pulledAddress = Address.findAddress(infowindow.content.split(">")[0].split("=")[1]);
        pulledAddress.marker.infowindow = infowindow
        pulledAddress.editItemsOnAddress();
        ;
    } )
}

function attachUpdatedContentToMarker(marker, updatedContent) {
    const newInfowindow = marker.infowindow;
    newInfowindow.setContent(updatedContent);
    newInfowindow.open(marker.get("map"), marker)
}








