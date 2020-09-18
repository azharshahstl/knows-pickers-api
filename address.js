class Address {

    constructor(addressDataObject) {
        this.id = addressDataObject.id
        this.streetNumber = addressDataObject.street_number
        this.streetName = addressDataObject.street_name
        this.zipCode = addressDataObject.zip_code
        this.items = addressDataObject.items   
        
    }

    static findAddress(id) {
        return this.allAddresses.find((address) => address.id == id)
      }

    geocodeLoader() {
        const mapAddress = `${this.streetNumber} + ${this.streetName}  + ${this.zipCode}`;
        const address = this
        const addressId = this.id
        
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': mapAddress}, function(results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    })
                    address.marker = marker;
                    Address.allAddresses.push(address)
                    attachContentToMarker(marker, address.renderMarkerContent());
                    itemsFormDiv.style.display="none";
                    addressDiv.style.display="inline-block";
                    if (document.getElementById("address-items-form")){
                        document.getElementById("address-items-form").remove();
                    }
                    createAddressForm.reset();
                    sortItemsAlphabetically(Address.allAddresses)
              } else {
                alert('Unable to find that address for the following reason: ' + status);
                fetch(`http://localhost:3000/addresses/${addressId}`, {
                    method: "DELETE", 
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                      }
                })
              }
            });
    }

    iterateOverItems(){
        var listedItems = ''
        for(let item of this.items){
           listedItems += `<li>${item.name}</li>`
        }
        return listedItems
    } 

    checkAddress() {
        const mapAddress = `${this.streetNumber} + ${this.streetName}  + ${this.zipCode}`;
        const addressId = this.id
        const address = this
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': mapAddress}, function(results, status) {
                if (status == 'OK') {
                    loadItemsForm(address);      
              } else {
                alert('Unable to find that address for the following reason: ' + status);
                fetch(`http://localhost:3000/addresses/${addressId}`, {
                    method: "DELETE", 
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                      }
                })
              }
            });

    }

    renderMarkerContent() {  
        let content = `<h3 data-set=${this.id}>${this.streetNumber} ${this.streetName}</h3>` + 
        "<ul>" +
        `${this.iterateOverItems()}` +
        "</ul>"
        return content
    }

    editItemsOnAddress() {
        addressDiv.style.display="none"; 
        alphaItemsDiv.style.display="none";
        const editItemsDiv = document.getElementById("edit-items");
        editItemsDiv.style.display="inline-block"
       
        const editItemsForm = document.createElement("form");
        editItemsForm.setAttribute("data-set", this.id);
        editItemsForm.setAttribute("id", "edit-items-form")

        const h4 = document.createElement("h4");
        h4.innerHTML = `Editing items for the following address:
        ${this.streetNumber} ${this.streetName}`

        const ul = document.createElement("ul");
        
        for(const item of this.items){

            const li = document.createElement("li")
            const editItemInput = document.createElement("input");
            editItemInput.setAttribute("type", "text");
            editItemInput.setAttribute("name", "name");
            editItemInput.setAttribute("value", item.name);

            const editItemsButton = document.createElement("button");
            editItemsButton.setAttribute("data-item", item.id);
            editItemsButton.setAttribute("data-address", this.id)
            editItemsButton.setAttribute("id", "delete-item")
            editItemsButton.innerHTML = "Delete Item"
            editItemsButton.addEventListener("click", this.deleteItem)

            li.appendChild(editItemInput);
            li.appendChild(editItemsButton);

            ul.appendChild(li);
            
        }

        const deletMarkerAndItems = document.createElement("button");
        deletMarkerAndItems.setAttribute("data-deleteMarker", this.id)
        deletMarkerAndItems.setAttribute("id", "delete-marker-and-items");
        deletMarkerAndItems.innerHTML = "Delete Marker and Items"
        deletMarkerAndItems.addEventListener("click", this.deleteMarkerandItems)

        const closeEditFormWindow = document.createElement("button");
        closeEditFormWindow.setAttribute("data-closewindow", this.id)
        closeEditFormWindow.setAttribute("id", "close-items-window");
        closeEditFormWindow.innerHTML = "Close this Window"
        closeEditFormWindow.addEventListener("click", this.closeFormWindow)

       
    
        const updateItems = document.createElement("button");
        updateItems.setAttribute("data-address", this.id)
        updateItems.setAttribute("id", "update-items");
        updateItems.setAttribute("value", "submit")
        updateItems.innerHTML = "Update Items"
        updateItems.addEventListener("click", this.updateItemsOnAddress)

        editItemsForm.appendChild(h4)
        editItemsForm.appendChild(ul);
        editItemsForm.appendChild(updateItems);
        editItemsForm.appendChild(closeEditFormWindow)
        editItemsForm.appendChild(deletMarkerAndItems);
        editItemsDiv.appendChild(editItemsForm);
    } 

    closeFormWindow() {
        document.getElementById("edit-items-form").remove();
        editItemsDiv.style.display ="none";
        addressDiv.style.display="inline-block";
    }
    
    deleteItem(e) {
        e.preventDefault()
        if ( !localStorage.jwt_token == ''){
            fetch(`${ITEMS_URL}/${this.dataset.item}`, {
                method: "DELETE", 
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            })
            e.target.parentElement.remove();
        }
        else {
            alert('You must be logged in to delete an item.')
        }
       
        
    } 

    deleteMarkerandItems(e) {
        e.preventDefault();
        if ( !localStorage.jwt_token == ''){
            fetch(`${ADDRESS_URL}/${e.target.dataset.deletemarker}`, {
                        method: "DELETE", 
                        headers: {
                            'Content-Type': 'application/json',
                            "Accept": "application/json",
                            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                        }
            })
            const address = Address.findAddress(e.target.dataset.deletemarker)
            address.marker.setMap(null);
            Address.allAddresses = Address.allAddresses.filter(address => address.id != e.target.dataset.deletemarker)
            sortItemsAlphabetically(Address.allAddresses)
            document.getElementById("edit-items-form").remove();
            editItemsDiv.style.display ="none";
            addressDiv.style.display="inline-block";
        }
        else {
            alert('You must be logged in to delete a marker.')
        }
    }

    updateItemsOnAddress(e) {
        e.preventDefault();
        const foundAddress = Address.findAddress(this.dataset.address);
        const foundAddressMarker = foundAddress.marker; //Grabbing marker from address (which has infowindow as a key)
        Address.allAddresses = Address.allAddresses.filter(address => address.id != this.dataset.address) //Deleting current address from Address array 

        fetch(`${ADDRESS_URL}/${this.dataset.address}`)
        .then(response => response.json())
        .then(addressData => {
                const updatedItemsOnAddress = new Address(addressData); //Creating new address with updated items list
                updatedItemsOnAddress.marker = foundAddressMarker //Attaching marker from previous version of this address to new one
                Address.allAddresses.push(updatedItemsOnAddress);
                console.log(Address.allAddresses)
                sortItemsAlphabetically(Address.allAddresses)
                document.getElementById("edit-items-form").remove();
                editItemsDiv.style.display ="none";
                addressDiv.style.display="inline-block";
                const updatedContent = updatedItemsOnAddress.renderMarkerContent();
                attachUpdatedContentToMarker(updatedItemsOnAddress.marker, updatedContent)
            })
    }
}
Address.allAddresses = []
