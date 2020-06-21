## Classes I will need:  

1. Address (which will make lists of items)
2. Items (objects on the list to be donated)

## Relationships:
1.  An address has many items.  

## CRUD actions:
1. Create:  An address will create a list of items which will be pinned to an address on the map.  Next to each item, there will be a Delete button. 
2. Read:  Upon successful loading of the DOM, all pinned locations will be Read and placed on the map.  This will essentially function as my index page, (i.e. When the single page app loads, it will show all available pins.)
3. Delete:  When an item is taken and the associated Delete button is clicked, the item will be destroyed.  There will also be a "Delete All" button at the bottom of the list to make it easier if all the items were taken. 

The above actions will all happen without refreshing the page.

# Reach Goals
1. Create a Users class which will have an address associated with them and this will be necessary in order to list items and receive notifications.  Users will have to sign in and be verified. The Address Class will no longer be necessary and that property will become part of the User Classs. 
2. Include a filter so Users who are looking for items to pick up can filter markers to only include ones with the type of items they are looking for.   
3. Twenty-four hour automatic delete of all items, however,  the User who listed the items will be able to relist the items using a "relist" button.
4. The App will allow for notifcations to appear (the App will open and display the marker) when a User is near a an object they are looking for.