BASE_URL = "http://localhost:3000/api/v1"
ADDRESS_URL = `${BASE_URL}/addresses`
ITEMS_URL = `${BASE_URL}/items`
USERS_URL = `${BASE_URL}/users`
AUTH_URL = `${BASE_URL}/login`

const mainBody = document.querySelector("main");
const addressDiv = document.getElementById("addressButton");
const script = document.createElement('script');
const cancelButton = document.getElementById("cancel-button");
const addAddressButton = document.getElementById("add-button");
const createAddressForm = document.getElementById("create-address-form");
const itemsFormDiv = document.getElementById("items-form");
const editItemsDiv = document.getElementById("edit-items");
const alphaItemsDiv = document.getElementById("alpha-items");
const signup = document.getElementById("signup");
const login = document.getElementById('login');
const logout = document.getElementById('logout');
const signupFormDiv = document.getElementById("signupform");
const loginFormDiv = document.getElementById("loginform");

document.head.appendChild(script);

const stl = { lat: 38.6270, lng: -90.1994 }

document.addEventListener("DOMContentLoaded",() => {

   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCcbWghcM4sSN_J1rPvlFq4kJplEhsD2yc&callback=initialMap`;
   script.src = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCcbWghcM4sSN_J1rPvlFq4kJplEhsD2yc`; 
   itemsFormDiv.style.display="none"; 
   editItemsDiv.style.display="none"; 

   fetch(ADDRESS_URL)
    .then(response => response.json())
    .then(addressesData => {
        addressesData.forEach( (address) => {
        const addressObject = new Address(address);
        addressObject.geocodeLoader()
        })
        
    })

   loadAddressDiv();
})

window.initialMap = function() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map"), {
        center: stl,
        zoom: 13
    });
    const marker = new google.maps.Marker({position: stl, map: map});

};

const reload = () => {
    if (!localStorage.jwt_token == ''){
        localStorage.removeItem('jwt_token');
        // location.replace("file:///Users/azharshah/Development/code/knows-pickers-api/index.html#");
        alert ('You are now logged out.')
    } 
}

logout.addEventListener("click", reload)

const getSignupForm = () => {
    signupFormDiv.style.display="inline-block";
        const form = document.createElement("form")
        form.setAttribute("id", "signup-form");
        form.setAttribute('method',"POST");
        form.setAttribute('action',"#");

        const email = document.createElement("input"); 
        email.setAttribute('type',"email");
        email.setAttribute('name',"email");
        email.setAttribute('placeholder', "Email")
        
        const password = document.createElement("input");
        password.setAttribute('type', 'password')
        password.setAttribute('name','password')
        password.setAttribute('placeholder', 'password')

        const signupButton = document.createElement("button"); 
        signupButton.setAttribute("id","signup-button");
        signupButton.innerHTML = "Sign Up"
        signupButton.addEventListener("click", submitSignup)
        
        form.appendChild(email);
        form.appendChild(password);
        form.appendChild(signupButton);
        signupFormDiv.appendChild(form);
}

const loadSignupForm = () => {
    if (!document.querySelector("#signup-form") && !document.querySelector("#login-form")) {
        getSignupForm();
    } else if (document.querySelector("#login-form")) {
        document.getElementById("login-form").remove();
        getSignupForm();
    } else {
        null
    }
}
signup.addEventListener("click", loadSignupForm)

const getLoginForm = () => {
    loginFormDiv.style.display="inline-block";
        const form = document.createElement("form")
        form.setAttribute("id", "login-form");
        form.setAttribute('method',"POST");
        form.setAttribute('action',"#");

        const email = document.createElement("input"); 
        email.setAttribute('type',"email");
        email.setAttribute('name',"email");
        email.setAttribute('placeholder', "Email")
        
        const password = document.createElement("input");
        password.setAttribute('type', 'password')
        password.setAttribute('name','password')
        password.setAttribute('placeholder', 'password')

        const loginButton = document.createElement("button"); 
        loginButton.setAttribute("id","login-button");
        loginButton.innerHTML = "Log In"
        loginButton.addEventListener("click", submitLogin)
        
        form.appendChild(email);
        form.appendChild(password);
        form.appendChild(loginButton);
        loginFormDiv.appendChild(form);
}

const loadLoginForm = () => {
    if (!document.querySelector("#signup-form") && !document.querySelector("#login-form")) {
        getLoginForm();
    } else if (document.querySelector("#signup-form")){
        document.getElementById("signup-form").remove();
        getLoginForm();
    } else {
        null
    }
}
login.addEventListener("click", loadLoginForm)

const submitLogin = (e) => {
    e.preventDefault();
    fetch(AUTH_URL, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
          },
        body: JSON.stringify({user: {email: e.target.form.elements[0].value, password: e.target.form.elements[1].value}})
    })
    .then(resp => resp.json())
    .then(json => { 
        if (json.error) {
            alert (json.error)
            document.getElementById("login-form").reset();
            }
        else {
            localStorage.setItem('jwt_token', json.jwt)
            document.getElementById("login-form").reset();
            document.getElementById("login-form").remove();
            login.addEventListener("click", loadLoginForm);
            alert ("You are now logged in.")
                if (document.getElementById("signup-form")){
                    document.getElementById("signup-form").remove();
                }
            }    
    })

}


const submitSignup = (e) => {
    e.preventDefault();
    fetch(USERS_URL, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
          },
        body: JSON.stringify({user: {email: e.target.form.elements[0].value, password: e.target.form.elements[1].value}})
    })
    .then(resp => resp.json())
    .then(json => {
        if (json.error) {
            alert (json.error)
            document.getElementById("signup-form").reset();
        }
        else {
        localStorage.setItem('jwt_token', json.jwt )
        document.getElementById("signup-form").reset();
        document.getElementById("signup-form").remove();
        signup.addEventListener("click", loadSignupForm)
        const newUser = new User(json);
        alert ('You are signed up and logged in.')
        }
    })
} 

const loadAddressDiv = () => {
    const h4 = document.createElement("h4");
    const button = document.createElement("button");
    
    h4.innerHTML = "Click the following button if you would like to create the address which will be used to mark the location of the items you are donating.";
    button.setAttribute("id", "create-address")
    button.innerHTML = "Create Address";

    addressDiv.appendChild(h4);
    addressDiv.appendChild(button);
    
    button.addEventListener("click", function () {
        if (!localStorage.jwt_token == ""){
            createAddressForm.style.display="inline-block";
            addressDiv.style.display="none";
            alphaItemsDiv.style.display="none";}
        else {
            alert ('You must be looged in to create an address.')
        }

    })
}

function sortItemsAlphabetically(array) {
    const getItemsObjectsFromAddresses = array.map(address => address.items);
    const flattenItemsArray = getItemsObjectsFromAddresses.flat();
    const itemNames = flattenItemsArray.map(item => item.name)
    const alphabatizedItems = itemNames.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
   
    alphaItemsDiv.style.display="inline-block";
    const ulitems = document.getElementById("ul-items")
    ulitems.innerHTML = '';
    for (const itemName of alphabatizedItems) {
        const itemLi = document.createElement("li"); 
        itemLi.innerHTML = `${itemName}`;
        ulitems.appendChild(itemLi);
    }   
    alphaItemsDiv.appendChild(ulitems); 
          
}

cancelButton.addEventListener("click", function (e) {
    e.preventDefault(); 
    createAddressForm.style.display="none";
    addressDiv.style.display="inline-block";
})

addAddressButton.addEventListener("click", function(e) {
    e.preventDefault();
    fetch(ADDRESS_URL, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
          },
        body: JSON.stringify({address: {street_number: e.target.form.elements[0].value, street_name: e.target.form.elements[1].value, zip_code: e.target.form.elements[2].value  }})
    })
    .then(resp => resp.json())
    .then(json => {
        const newAddress = new Address(json);
        newAddress.checkAddress();
    }) 
})

const loadItemsForm = (address) => {
    createAddressForm.style.display="none"; 
    itemsFormDiv.style.display="inline-block"; 
    
    const form = document.createElement("form");
    const info = document.createElement("h3");

    info.innerHTML = `Items to be left for donation at: <i><p>${address.streetNumber} ${address.streetName}, ${address.zipCode}</p></i>`
    form.setAttribute("data-id", address.id)
    form.setAttribute("id", "address-items-form");
    form.setAttribute("class", "form");
    form.setAttribute('method',"POST");
    form.setAttribute('action',"#");

    const itemInput = document.createElement("input"); 
    itemInput.setAttribute('type',"text");
    itemInput.setAttribute('name',"name");

    const addAnotherItemButton = document.createElement("button"); 
    addAnotherItemButton.setAttribute("id","add-another-button");
    addAnotherItemButton.innerHTML = "Add Another Item"
    addAnotherItemButton.addEventListener("click", addAnotherItem);

    const submitItemsButton = document.createElement("button"); 
    submitItemsButton.setAttribute("id","add-items-button");
    submitItemsButton.innerHTML = "Submit Items"
    submitItemsButton.addEventListener("click", submitItems)
    
    const cancelButton = document.createElement("button"); 
    cancelButton.setAttribute("id","cancel-items-button");
    cancelButton.innerHTML = "Cancel Items"
    cancelButton.addEventListener("click", cancelAddress)

    form.appendChild(info)
    form.appendChild(itemInput);
    form.appendChild(addAnotherItemButton)
    form.appendChild(submitItemsButton);
    form.appendChild(cancelButton);
    itemsFormDiv.appendChild(form);

function cancelAddress(e){
    e.preventDefault();
    createAddressForm.style.display="inline-block"; 
    itemsFormDiv.style.display="none"; 
    document.getElementById("address-items-form").remove();
}

function addAnotherItem(e){
        e.preventDefault();
        const addAnotherItemButton = document.querySelector("add-another-button");
        const form = document.getElementsByClassName("form")[1]; 
        const itemInput = document.createElement("input");
        itemInput.setAttribute('type',"text");
        itemInput.setAttribute('name',"name");
        form.insertBefore(itemInput, form.childNodes[2])
        itemsFormDiv.appendChild(form);
    }
}

async function getAddressWithItems(e) {
    const tempArray = [];
    const array = e.target.form.elements
    const modifiedArrayLength = array.length - 3
    for (let index = 0; index < modifiedArrayLength; index++){
       
           const fetchResponse = await fetch(ITEMS_URL, {
               method: 'POST', 
               headers: {
                   'Content-Type': 'application/json',
                   "Accept": "application/json",
                   Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
               },
               body: JSON.stringify({address_id: e.target.form.dataset.id, name: array[index].value })  
           })
           const data = await fetchResponse.json();
           tempArray.push(data);
    }
       const newAddress = new Address(tempArray[tempArray.length - 1]);
       newAddress.geocodeLoader();     
};

function submitItems(e) {
    e.preventDefault(); 
    getAddressWithItems(e);    
}

function attachContentToMarker(marker, content) {
    const infowindow = new google.maps.InfoWindow({
        content: content
    });
    marker.addListener("mouseover", function() {
        infowindow.open(marker.get("map"), marker)    
    });
    marker.addListener("mouseout", function() {
        infowindow.close(marker.get("map"), marker)    
    });

    marker.addListener("click", function() {
        const pulledAddress = Address.findAddress(infowindow.content.split(">")[0].split("=")[1]);
        pulledAddress.marker.infowindow = infowindow
        pulledAddress.editItemsOnAddress();
        ;
    } )
}

function attachUpdatedContentToMarker(marker, updatedContent) {
    const newInfowindow = marker.infowindow;
    newInfowindow.setContent(updatedContent);
    newInfowindow.open(marker.get("map"), marker)
}








