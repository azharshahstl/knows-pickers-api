class Address {

    constructor(addressDataObject) {
        this.id = addressDataObject.id
        this.street_number = addressDataObject.street_number
        this.street_name = addressDataObject.street_name
        this.zip_code = addressDataObject.zip_code
        Address.allAddresses.push(this)
        
    }

    geocodeLoader() {
        const mapAddress = `${this.street_number} + ${this.street_name}  + ${this.zip_code}`;
        const addressId = this.id
        // console.log(this)
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': mapAddress}, function(results, status) {
                // console.log(results)
                // debugger
                if (status == 'OK') {
                    // debugger
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                document.getElementById("create-address-form").style.display="none"; 
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
        return Address.allAddresses   
    }
    
}

Address.allAddresses = []