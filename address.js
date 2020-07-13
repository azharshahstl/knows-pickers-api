class Address {

    constructor(addressDataObject) {
        this.id = addressDataObject.id
        this.street_number = addressDataObject.street_number
        this.street_name = addressDataObject.street_name
        this.zip_code = addressDataObject.zip_code
        this.items = addressDataObject.items
        
        
    }

    static findAddress(id) {
        return this.allAddresses.find((address) => address.id == id)
      }

    geocodeLoader() {
        Address.allAddresses.push(this)
        var marker;
        const mapAddress = `${this.street_number} + ${this.street_name}  + ${this.zip_code}`;
        const addressId = this.id
        const address = this
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': mapAddress}, function(results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    })
                    attachContentToMarker(marker, address.renderMarkerContent());
                    itemsFormDiv.style.display="none";
                    addressDiv.style.display="inline-block";
                    document.getElementById("address-items-form").remove();
                    createAddressForm.reset();
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
        var marker;
        const mapAddress = `${this.street_number} + ${this.street_name}  + ${this.zip_code}`;
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
        let content = `<h3 data-set=${this.id}>${this.street_number} ${this.street_name}</h3>` + 
        "<ul>" +
        `${this.iterateOverItems()}` +
        "</ul>"
        return content
    }

    editItemsOnAddress() {
        addressDiv.style.display="none"; 
        const editItemsDiv =document.getElementById("edit-items");
        editItemsDiv.style.display="inline-block"

        const editItemsForm = document.createElement("form");
        editItemsForm.setAttribute("data-set", this.id);
        const editItemsUl = document.createElement("ul");

        for(const item of this.items){
            const editItemsLi = document.createElement("li");

            const editItemInput = document.createElement("input");
            editItemInput.setAttribute("type", "text");
            editItemInput.setAttribute("name", "name");
            editItemInput.setAttribute("value", item.name);

            const editItemsButton = document.createElement("button");
            editItemsButton.setAttribute("data-set", item.id);
            editItemsButton.setAttribute("id", "delete-item")
            editItemsButton.innerHTML = "Delete Item"

            editItemsForm.appendChild(editItemInput);
            editItemsForm.appendChild(editItemsButton);
        }

        const deletMarkerAndItems = document.createElement("button");
        deletMarkerAndItems.setAttribute("id", "delete-marker-and-items");
        deletMarkerAndItems.innerHTML = "Delete Marker and Items"
        deletMarkerAndItems.addEventListener("click", console.log("Hello"))

        editItemsForm.appendChild(deletMarkerAndItems);
    

        const updateItems = document.createElement("button");
        updateItems.setAttribute("id", "update-items");
        updateItems.innerHTML = "Update Items"
        updateItems.addEventListener("click", console.log("Hello2"))

        editItemsForm.appendChild(updateItems);


        editItemsDiv.appendChild(editItemsForm);
        
    }       
    
}
// Address.tempAddressArray = [];
Address.allAddresses = []
