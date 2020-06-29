class Address {

    constructor(addressDataObject) {
        this.id = addressDataObject.id
        this.street_number = addressDataObject.street_number
        this.street_name = addressDataObject.street_name
        this.city = addressDataObject.city 
        this.state = addressDataObject.state
        this.zip_code = addressDataObject.zip_code

    }
}