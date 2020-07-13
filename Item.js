class Item {

    constructor(itemObject) {
        this.id = itemObject.id
        this.name = itemObject.name 
        this.address_id = itemObject.address_id 
        Item.allItems.push(this);
    }

} Item.allItems = []