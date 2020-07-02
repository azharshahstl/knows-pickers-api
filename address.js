class Address {

    constructor(addressDataObject) {
        this.id = addressDataObject.id
        this.street_number = addressDataObject.street_number
        this.street_name = addressDataObject.street_name
        // this.city = addressDataObject.city 
        // this.state = addressDataObject.state
        this.zip_code = addressDataObject.zip_code
        Address.allAddresses.push(this)
    }

    geocodeLoader() {
        const mapAddress = `${this.street_number} + ${this.street_name}  + ${this.zip_code}`;
            geocoder.geocode( { 'address': mapAddress}, function(results, status) {
              if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
              } else {
                alert('Unable to find that address for the following reason: ' + status);
              }
            });
            document.getElementById("create-address-form").style.display="none";  
    }
    
}

Address.allAddresses = []