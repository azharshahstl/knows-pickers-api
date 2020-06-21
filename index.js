
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA99nF4WLsPeygHrRoJOTRH1Bk5DBJjoyg&callback=initMap';
script.defer = true;
script.async = true;

const stl = { lat: 38.6270, lng: -90.1994 }
var map;


window.initMap = function() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: stl,
        zoom: 8
      });
      const marker = new google.maps.Marker({position: stl, map: map});
  
};


document.head.appendChild(script);
         

   