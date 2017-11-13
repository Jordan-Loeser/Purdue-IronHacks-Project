/* Data Functions */
function markNeighborhoodPrices() {
    // Check if Data has Been Updated in the Past Month
    var currentDate = new Date();
    if (localStorage) { // Check if local data is supported
        var lastUpdated = new Date(localStorage.getItem("lastUpdated"));
        var localData = JSON.parse(localStorage.getItem("localNeighboroodData"));
        // See if Data Has been Stored Previously & If it is over a month old
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
            console.log(failedNeighborhoodCodes);
            stopLoader();
        },
        error : function(result) {
            console.log("Could not access neighborhood code data.");
            console.log(result);
        }
     });
}

function getRecentNeighborhoodPriceData(neighborhoodNum, index, callback) {
    var quandlApiKey = 'DuYURBziJDiFLYygufyL';
    // Collect Price Data
    var xhr = new XMLHttpRequest();
    var url = "https://www.quandl.com/api/v3/datasets/ZILLOW/N"+neighborhoodNum+"_ZRIAH.json?api_key="+quandlApiKey;
    xhr.onload = function() {
        var json = JSON.parse(this.responseText);
        if(this.status == 200) {
            callback([json.dataset.data[0], json.dataset.data[1]], index, "price");
        }
        else {
            failedNeighborhoodCodes.push(neighborhoodNum);
        }
    }
    xhr.open("GET", url, false);
    xhr.send();
}

function addToNeighborhoodData(data, index, key) {
    nycNeighbohoodData[index][key] = data;
}

function stopLoader() {
    document.body.className = document.body.className.replace("loading","loaded");
    console.log("Loader Stopped!");
}
