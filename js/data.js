/* Data Functions */
function getNeighborhoodData() {
    // Check if Data has Been Updated in the Past Month
    var currentDate = new Date();
    if (localStorage) { // Check if local data is supported
        var lastUpdated = new Date(localStorage.getItem("lastUpdated"));
        var localData = JSON.parse(localStorage.getItem("localNeighboroodData"));
        // See if Data Has been Stored Previously & If it is over a month old
        if (localStorage.getItem("lastUpdated") != null && lastUpdated.getMonth() >= currentDate.getMonth()) {
            console.log("Data was last updated on " + localStorage.getItem("lastUpdated") + ". Not updating Data.");
            nycNeighborhoodData = localData;
            console.log('Stored Data:', nycNeighborhoodData);
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
        url : "https://raw.githubusercontent.com/Jordan-Loeser/Purdue-IronHacks-Project/master/data/quandl-neighborhoods-ny.json",
        success : function(result) {

            nycNeighborhoodData = JSON.parse(result);

            // Update Price Data
            for(var k in nycNeighborhoodData) {
               code = nycNeighborhoodData[k].code.toString();
               getRecentNeighborhoodPriceData(code, k, addToNeighborhoodData); // Add price data to master datan
            }

            // Store the Data Locally
            if (localStorage) {
                var dateUpdated = new Date();
                localStorage.setItem("lastUpdated", dateUpdated);
                localStorage.setItem("localNeighboroodData", JSON.stringify(nycNeighborhoodData));
            } else {
                console.log("Local storage is not available.");
            }
            console.log('Updated Data:', nycNeighborhoodData);
            stopLoader();
        },
        error : function(result) {
            console.log("Could not access neighborhood code data.");
            console.log(result);
        }
     });
}

function getNeighborhoodLocation(neighborhood, index, processFunc) {

    name = neighborhood.toLowerCase();
    for (var i = 0; i < neighborhoodMarkers.length ; i++)
    {
        marker = neighborhoodMarkers[i];
        if (marker.title.toLowerCase() === name) {
            processFunc(marker.getPosition().toJSON(), index, "coordinate");
            return;
        }
    }
    console.log("Error`getNeighborhoodLocation()`: No Location Found: " + neighborhood);
}

function getRecentNeighborhoodPriceData(neighborhoodNum, index, processFunc) {
    var quandlApiKey = 'DuYURBziJDiFLYygufyL';
    // Collect Price Data
    var xhr = new XMLHttpRequest();
    var url = "https://www.quandl.com/api/v3/datasets/ZILLOW/N"+neighborhoodNum+"_ZRIAH.json?api_key="+quandlApiKey;
    xhr.onload = function() {
        var json = JSON.parse(this.responseText);
        if(this.status == 200) {
            processFunc([json.dataset.data[0], json.dataset.data[1]], index, "price");
        }
        if(this.status == 404) {
            failedNeighborhoodCodes.push(neighborhoodNum);
        }
    }
    xhr.open("GET", url, false);
    xhr.send();
}

function addToNeighborhoodData(data, index, key) {
    nycNeighborhoodData[index][key] = data;
}

function calculateSafety() {
    //google.maps.geometry.poly.containsLocation(latLng,polygon)

}

function stopLoader() {
    document.body.className = document.body.className.replace("loading","loaded");
    console.log("Loader Stopped!");
}
