var nyuStern = {lat: 40.7291, lng: -73.9965};
var nightStyle = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0d14a3"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": "-26"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            },
            {
                "color": "#0e1bae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4ebfdc"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
];

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

    //markNeighborhoodPrices();
    markNeighborhoods();
}

/* Data Functions */
function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
}

function markNeighborhoods() {
    var neighborhoods = readJSON('../data/neighborhoods.json');
    console.log(neighborhoods);
}

/*
function markNeighborhoodPrices() {
    var prices = getRecentNeighborhoodPriceData("9");
}

function getRecentNeighborhoodPriceData(neighborhoodNum) {
    var quandlApiKey = 'DuYURBziJDiFLYygufyL';
    $.ajax({
       type : "GET",
       url : "https://www.quandl.com/api/v3/datasets/ZILLOW/N"+neighborhoodNum+"_MRP1B.json?api_key="+quandlApiKey,
       success : function(result) {
           var priceData = result.dataset.data;
           console.log(priceData[0]);
           return priceData[0];
       },
       error : function(result) {
           console.log("Could not access pricing data.");
           console.log(result);
       }
     });

}
*/
