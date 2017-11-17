//***** MANAGES MAP *****//
var nyuStern = {lat: 40.7291, lng: -73.9965};
var neighborhoodMarkers = [];
var schoolMarkers = [];
var fireStationMarkers = [];
var nycNeighborhoodData = [];
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

    map = new google.maps.Map(d3.select("#map").node(), {
        center: nyuStern,
        zoom: 14,
        disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: true,
                mapTypeControlOptions: {
                    mapTypeIds: ['roadmap', 'satellite'],
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
            scaleControl: false,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: false,
        styles: nightStyle,
    });

    var nyuMarker = new google.maps.Marker({
          position: nyuStern,
          title: 'NYU Stern School of Business',
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 9,
            strokeColor: '#1effbc'
          },
          map: map
    });

    // Add Support for Transit Views
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    map.data.loadGeoJson('data/nieghborhoods.geojson', null, function (features) {
        // STARTPOINT: https://stackoverflow.com/questions/40904882/clustering-markers-from-geojson-using-google-maps
        neighborhoodMarkers = features.map(function (feature) {
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
        var markerCluster = new MarkerClusterer(map, neighborhoodMarkers, {
            gridSize: 43,
            maxZoom: 15,
            imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
        });

        map.data.setMap(null); // Hide Clustered Markers
    });

    // Load School Markers (and Safety)
    $.ajax({
        type : "GET",
        url : 'https://data.cityofnewyork.us/resource/sm8b-9vim.json',
        success : function(schools) {
            for(var s = 0; s < schools.length; s++) {
                var school = schools[s];
                var slat = parseFloat(school.latitude);
                var slng = parseFloat(school.longitude);
                var schoolMarker = new google.maps.Marker({
                    position: {lat: slat, lng: slng},
                    title: school.locationname,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 3,
                      fillOpacity: 0.7,
                      fillColor: '#DAA520',
                      strokeWeight: 0
                    },
                    map: map
                });
                schoolMarkers.push(schoolMarker);
            }
            console.log('School Markers', schoolMarkers);
        },
        error : function(result) {
            console.log("School Safety Data could not be Loaded.");
        }
    });

    // Load firestation markers
    $.ajax({
        type : "GET",
        url : 'https://data.cityofnewyork.us/resource/byk8-bdfw.json',
        success : function(stations) {
            for(var s = 0; s < stations.length; s++) {
                var station = stations[s];
                var slat = parseFloat(station.latitude);
                var slng = parseFloat(station.longitude);
                var stationMarker = new google.maps.Marker({
                    position: {lat: slat, lng: slng},
                    title: station.facilityname,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 3,
                      fillOpacity: 0.7,
                      fillColor: 'red',
                      strokeWeight: 0
                    },
                    map: map
                });
                fireStationMarkers.push(stationMarker);
            }
            console.log('Fire Station Markers', fireStationMarkers);
            getNeighborhoodData(); // Run Calculations Once Everything is Updated
        },
        error : function(result) {
            console.log("Fire Station Data could not be Loaded.");
        }
    });

}

var circle;
function drawCircle(radius, center) {
    circle = new google.maps.Circle({
        center:center,
        radius: radius,
        fillOpacity: 0.15,
        fillColor: "#1effbc",
        strokeColor: "#1effbc",
        map: map
    });
}
