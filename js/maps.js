var nyuStern = {lat: 40.7291, lng: -73.9965};
var neighborhoodMarkers = [];
var nycNeighbohoodData = [];
var failedNums = [];
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
          animation: google.maps.Animation.BOUNCE,
          map: map
    });

    // Add Support for Transit Views
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    map.data.loadGeoJson('data/nieghborhoods.geojson', null, function (features) {
        // STARTPOINT: https://stackoverflow.com/questions/40904882/clustering-markers-from-geojson-using-google-maps
         markers = features.map(function (feature) {
            var g = feature.getGeometry();
            var marker = new google.maps.Marker({'position': g.get(0), 'title': feature.f.name });
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

/* Data Functions */
function markNeighborhoodPrices() {
    // Check if Data has Been Updated in the Past Month
    var currentDate = new Date();
    if (localStorage) { // Check if local data is supported
        var lastUpdated = new Date(localStorage.getItem("lastUpdated"));
        var localData = JSON.parse(localStorage.getItem("localNeighboroodData"));
        if (localStorage.getItem("lastUpdated") != null && lastUpdated.getMonth() >= currentDate.getMonth()) {
            console.log("Data was updated on " + localStorage.getItem("lastUpdated") + ". Not updating Data.");
            nycNeighbohoodData = localData;
            console.log("Stored Data:\n");
            console.log(nycNeighbohoodData);
            stopLoader();
        } else {
            console.log("Data was updated on " + localStorage.getItem("lastUpdated") + ". Data will be updated.");
            updatePriceData();
        }
    }
    else {
        console.log("Local storage not found. Gathering live data.");
        updatePriceData();
    }
}

function updatePriceData() {
    $.ajax({
        type : "GET",
        url : "https://cdn.rawgit.com/Jordan-Loeser/Purdue-IronHacks-Project/d100f235/data/quandl-neighborhoods-ny.json",
        success : function(result) {
            for(var k in result) {
               code = result[k].code.toString();
               nycNeighbohoodData.push(result[k]); // Add Quandl Code to master data
               getRecentNeighborhoodPriceData(code, k, addToNeighborhoodData); // Add price data to master data
            }
            // Store the Data Locally
            if (localStorage) {
                var dateUpdated = new Date();
                localStorage.setItem("lastUpdated", dateUpdated);
                localStorage.setItem("localNeighboroodData", JSON.stringify(nycNeighbohoodData));
            } else {
                console.log("Local storage is not available.");
            }
            console.log("Updated Data:\n")
            console.log(nycNeighbohoodData);

            // Which codes are failing?
            console.log(failedNums);
            stopLoader();
        },
        error : function(result) {
            console.log("Could not access neighborhood code data.");
            console.log(result);
        }
     });
}

function addToNeighborhoodData(data, index, key) {
    nycNeighbohoodData[index][key] = data;
}

function getRecentNeighborhoodPriceData(neighborhoodNum, index, callback) {
    var quandlApiKey = 'DuYURBziJDiFLYygufyL';
        // Collect Price Data
        var xhr = new XMLHttpRequest();
        var url = "https://www.quandl.com/api/v3/datasets/ZILLOW/N"+neighborhoodNum+"_ZRIAH.json?api_key="+quandlApiKey;
        xhr.open("GET", url, false);
        xhr.send();
        var json = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
            callback([json.dataset.data[0], json.dataset.data[1]], index, "price");
        }
        else {
            failedNums.push(neighborhoodNum);
        }
}

function stopLoader() {
    document.body.className = document.body.className.replace("loading","loaded");
    console.log("Loader Stopped!");
}
