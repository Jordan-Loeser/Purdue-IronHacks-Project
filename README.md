**Author:** Jordan Loeser, Purdue University Electrical Engineering 2020

**Keywords:** Civic Hacking, Open Data, Google Maps, Web App, JavaScript

**Description:** A map tool to help students searching for rental properties near NYU Stern School of Business, created as a part of the Purdue Golden IronHacks competition.

### In Phase 4
* :white_check_mark: Added Marker Clustering (Zoom Out to See)
* :white_check_mark: Added Local Data Storage for Pricing Data
* :white_check_mark: Used GeoJSON to Map NYC Neighborhoods
* :white_check_mark: Added Loading Animation
* :white_check_mark: Created Safety Algorithm
    * Fire Score = (num Fire Stations w/in 10 mile radius) / (avg. num Fire Stations w/in 10 mile radius)
    * School Score = TBD
    * Total Score = Fire Score + School Score

## Developer Experience
* This project uses [BEMIT naming conventions](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) which help organize the code into a readable and modular structure.
* This project uses a RESTful API structure to optimize server interfacing.

### Tools Used
* :white_check_mark: Google Maps API
* :white_check_mark: SASS

### Features to Build
* Main Map
  * :white_check_mark: Dropping Marker Animation
  * :white_check_mark: Live Import House Listings
  * :white_check_mark: Night Mode Styling
  * :white_check_mark: Simplified UI Buttons
  * :white_check_mark: Marker Clustering
* Result Filtering
  * Individual Listings Information
  * Distance Information
* Responsive Mobile Design (?)
* Export Moving Report
  * Show NYC climate data vs. home climate data
  * Show walking/driving/transit directions from home to school

### Datasets to include
* [Climate Data](https://www.ncdc.noaa.gov/cdo-web/webservices/v2) -> [Documentation](https://www1.ncdc.noaa.gov/pub/data/cdo/documentation/NORMAL_MLY_documentation.pdf)
* [Zillow Median Rental Price - One Bedroom](https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=ny) (1 set Per Neighborhood/ZIP Code)

### Data Visualizations
* Chart of Climate Data over time
  * Give users the option to enter their home location and compare the climate per month in NYC.
* Commute Estimations
* Walking/Transit/Driving Directions
