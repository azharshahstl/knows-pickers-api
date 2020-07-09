class Address {

    constructor(addressDataObject) {
        this.id = addressDataObject.id
        this.street_number = addressDataObject.street_number
        this.street_name = addressDataObject.street_name
        this.zip_code = addressDataObject.zip_code
        this.items = addressDataObject.items
        Address.allAddresses.push(this)
        
    }
    

    // addToTempArray() {
    //     Address.tempAddressArray.push(this);
    //     console.log(Address.tempAddressArray);
    //     debugger;
    // }

    geocodeLoader() {
        var marker;
        // console.log(this)
        // debugger
        const mapAddress = `${this.street_number} + ${this.street_name}  + ${this.zip_code}`;
        const addressId = this.id
        const address = this
        // console.log(address)
        // debugger;
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
                })
                var infoWindow = new google.maps.InfoWindow({
                    content: `<h3>Hello World</h3>`
                })
                infoWindow.open(map, marker);
                // console.log(marker);
                document.getElementById("item-form").style.display="none";
                document.getElementById("addressButton").style.display="inline-block";
                // marker.addEventListener("click", function(){
                //     infoWindow.open(map, marker);
                // })
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
        // return Address.allAddresses 
    }

    renderMarkerContent() {
        return `Hello World`
    }
    
}
Address.tempAddressArray = [];
Address.allAddresses = []
