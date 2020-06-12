Classes I will need:  

1. Map (to use with GoogleMaps)
2. User (who will make lists of items)
3. Items (objects on the list to be donated)

Relationships:
1.  A User has many items.  

CRUD actions:
1. Create:  A User will create a list of items which will be pinned to an address on the map.  Next to each item, there will be a Delete button. 
2. Read:  Upon successful loading of the DOM, all pinned locations will be Read and placed on the map.  This will essentially function as my index page, (i.e. When the single page app loads, it will show all available pins.)
3. Delete:  When an item is taken and the associated Delete button is clicked, the item will be destroyed.  There will also be a "Delete All" button at the bottom of the list to make it easier if all the items were taken. 

The above actions will all happen without refreshing the page.

