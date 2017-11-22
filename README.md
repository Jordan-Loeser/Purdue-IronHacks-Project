**Author:** Jordan Loeser, Purdue University Electrical Engineering 2020

**Keywords:** Civic Hacking, Open Data, Google Maps, Web App, JavaScript

**Description:** A map tool to help students searching for rental properties near NYU Stern School of Business, created as a part of the Purdue Golden IronHacks competition.

### In Phase 5
* :white_check_mark: Added Help Window
* :white_check_mark: Added Marker Visibility Toggling
* :white_check_mark: Added Result Sorting (Distance, Safety, and Price)
* :white_check_mark: Calculated Safety Score using Fire & School Data (See Help Window in App)
* :white_check_mark: Added Temperature Reading
* :white_check_mark: Cleaned up Visualizations

### Previous Phases
* :white_check_mark: Added Marker Clustering (Zoom Out to See)
* :white_check_mark: Added Local Data Storage for Pricing Data
* :white_check_mark: Used GeoJSON to Map NYC Neighborhoods
* :white_check_mark: Added Loading Animation


## Developer Experience
* This project uses [BEMIT naming conventions](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) which help organize the code into a readable and modular structure.
* This project uses a RESTful API structure to optimize server interfacing.

### Tools Used
* :white_check_mark: Google Maps API
* :white_check_mark: SASS
* :white_check_mark: D3.js
* :white_check_mark: React.js

### Datasets Used
* [Fire Station Data](https://data.cityofnewyork.us/resource/byk8-bdfw.json)
* [School Safety Data](https://data.cityofnewyork.us/resource/sm8b-9vim.json)
* [Climate Data](https://www.ncdc.noaa.gov/cdo-web/webservices/v2) -> [Documentation](https://www1.ncdc.noaa.gov/pub/data/cdo/documentation/NORMAL_MLY_documentation.pdf)
* [Zillow Median Rental Price - One Bedroom](https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=ny) (1 set Per Neighborhood/ZIP Code)
