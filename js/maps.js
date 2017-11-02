var nyuStern = {lat: 40.7291, lng: -73.9965};
var nightStyle = [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}];

/* Google Maps Functions */
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: nyuStern,
        zoom: 14,
        styles: nightStyle
    });

    var schoolMarker = new google.maps.Marker({
          position: nyuStern,
          animation: google.maps.Animation.DROP,
          map: map
    });

    // Add Support for Transit Views
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    updateData();

}

/* Data Functions */

var quandlApiKey = 'DuYURBziJDiFLYygufyL';

function updateData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.quandl.com/api/v3/datasets/ZILLOW/N15797_MLP2B.json?api_key="+quandlApiKey, false);
    // Add your code below!
    xhr.send();
    console.log(xhr.status);
    var json = JSON.parse(xhr.responseText);
    console.log(json.dataset.data[0]);
}
