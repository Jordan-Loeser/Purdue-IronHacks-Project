var nyuStern = {lat: 40.7291, lng: -73.9965};
var neighborhoodMarkers = [];
var nycNeighbohoodData = [];
var failedNeighborhoodCodes = [];
var map;

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

    map = new google.maps.Map(document.getElementById('map'), {
        center: nyuStern,
        zoom: 14,
        styles: nightStyle
    });

    var schoolMarker = new google.maps.Marker({
          position: nyuStern,
          title: 'NYU Stern School of Business',
          //animation: google.maps.Animation.BOUNCE,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            strokeColor: '#1effbc'
          },
          map: map
    });



    // Add Support for Transit Views
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    map.data.loadGeoJson('data/nieghborhoods.geojson', null, function (features) {
        // STARTPOINT: https://stackoverflow.com/questions/40904882/clustering-markers-from-geojson-using-google-maps
        markers = features.map(function (feature) {
            var g = feature.getGeometry();
            var marker = new google.maps.Marker({
                'position': g.get(0),
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 6,
                  fillOpacity: 0,
                  fillColor: '#1effbc',
                  strokeWeight: 5,
                  strokeColor: 'white'
                },
                'title': feature.f.name
            });
            return marker;
        });
        var markerCluster = new MarkerClusterer(map, markers, {
            gridSize: 43,
            maxZoom: 15,
            imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
        });
        map.data.setMap(null); // Hide Clustered Markers
    });

    markNeighborhoodPrices();
}
