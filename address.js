class Address {

    constructor(addressDataObject) {
        this.id = addressDataObject.id
        this.street_number = addressDataObject.street_number
        this.street_name = addressDataObject.street_name
        this.zip_code = addressDataObject.zip_code
        this.items = addressDataObject.items
        Address.allAddresses.push(this)
        
    }

    geocodeLoader() {
        var marker;
        const mapAddress = `${this.street_number} + ${this.street_name}  + ${this.zip_code}`;
        const addressId = this.id
        const address = this
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': mapAddress}, function(results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    makeMarker(results[0].geometry.location, address);
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

    renderMarkerContent() {
        return `Hello World`
    }
    
}
Address.tempAddressArray = [];
Address.allAddresses = []
