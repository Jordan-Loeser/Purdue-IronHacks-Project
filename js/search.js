//***** MANAGES SEARCH FILTERING *****//

$(window).on("load", function(){

    const e = React.createElement;

    class Neighborhood extends React.Component {

        constructor(props) {
          super(props);
          this.state = {
              name: this.props.neighborhood.area[0],
              price: this.props.neighborhood.price[0][1],
              safety: this.props.neighborhood.safetyScore,
              distance: Math.round((this.props.neighborhood.distance / 1609.34) * 10 ) / 10
          };
          // This binding is necessary to make `this` work in the callback
          this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            //alert(JSON.stringify(this.props.neighborhood.coordinate));
            navigateOnMap(this.props.neighborhood.coordinate);
        }

        render() {
            var price = null;
            var safety = null;
            var distance = null;
            //console.log(hood);
            if(this.state.price) {
                price = e('p', null, `$${this.state.price}`);
            }
            else {
                price = e('p', null, `Price: No Price Available`);
            }

            if(this.state.safety) {
                safety = e('p', null, `Safety Score: ${this.state.safety}`);
            }
            else {
                safety = e('p', null, `Safety: No Score Available`);
            }

            if(this.state.distance) {
                distance = e('p', null, `Distance: ${this.state.distance} mi`);
            }
            else {
                distance = e('p', null, `Distance: No Distance Available`);
            }

            return e('div', { className: 'o-neighborhood-listing', onClick: this.handleClick },
                e('h4', null, `Hood: ${this.state.name}`),
                price,
                safety,
                distance
            );

        }
    }

    class NeighborhoodList extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                currentResults: []
            };
        }

        render() {
            const rows = [];
            const sorted = this.props.neighborhoods;

            // Sort the Results
            if(this.props.sortBy == 'sortByPrice') {
                console.log('sorting', "by price");
                sorted.sort(function(a, b) {
                    return parseFloat(a.price[0][1]) - parseFloat(b.price[0][1]);
                });
            }
            if(this.props.sortBy == 'sortBySafety') {
                console.log('sorting', "by safety");
                sorted.sort(function(a, b) {
                    if(a.safetyScore == b.safetyScore) {
                        return parseFloat(a.price[0][1]) - parseFloat(b.price[0][1]);
                    }
                    return parseFloat(b.safetyScore) - parseFloat(a.safetyScore);
                });
            }
            console.log('sorted', sorted);

            sorted.forEach((hood) => {
                if( (hood.distance / 1609.340) <= this.props.distance) {
                    rows.push(
                        e(Neighborhood, {neighborhood: hood, key: Math.random()}, null)
                    );
                }
            });

            return e('div', null,
                e('div', {className: 'result-count'}, `Matches: ${rows.length}`),
                e('div', {className: 'result-listings'}, rows)
            );
        }
    }

    class FilterForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                distance: '1',
                sortingType: 'sortByPrice',
                filteredResults: nycNeighborhoodData
            };
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleButtonClick = this.handleButtonClick.bind(this);
        }

        handleInputChange(event) {
            const target = event.target;e
            const value = target.value;
            const name = target.name;

            if(name == 'distance') {
                filterCircle.setRadius(value * 1609.34);
                map.fitBounds(filterCircle.getBounds());
            }

            this.setState({
              [name]: value
            });
        }

        handleButtonClick(e) {
            e.preventDefault();
            if(this.state.sortingType == 'sortByPrice') {
                this.setState({
                  ['sortingType']: 'sortBySafety'
                });
            }
            else {
                this.setState({
                  ['sortingType']: 'sortByPrice'
                });
            }
        }

        render() {
            return e('div', null,
                e('form', {onSubmit: this.handleSubmit},
                    e('div', null,
                        e('div', {className: 'hidden'},
                            e('input', {type: 'radio', name: 'sortingType', value: 'sortByPrice', onChange: this.handleInputChange, checked: this.state.sortingType === 'sortByPrice'}, null),
                            e('input', {type: 'radio', name: 'sortingType', value: 'sortBySafety', onChange: this.handleInputChange, checked: this.state.sortingType === 'sortBySafety'}, null)
                        ),
                        e('div', {className: this.state.sortingType},
                            e('div', {className: 'priceSort', name: 'sortingType', value: 'sortByPrice', onClick: this.handleButtonClick}, 'Price'),
                            e('div', {className: 'safetySort', name: 'sortingType', value: 'sortBySafety', onClick: this.handleButtonClick}, 'Safety')
                        )
                    ),
                    e('div', null,
                        e('input', {type: 'range', min: 1, max: 50, name: 'distance', value: this.state.distance, onChange: this.handleInputChange}),
                        e('div', {className: 'distance-input'}, `Distance: ${this.state.distance} mi`)
                    )
                ),
                e('div', {className: 'c-search-results'},
                    e(NeighborhoodList, {neighborhoods: this.state.filteredResults, distance: this.state.distance, sortBy: this.state.sortingType}, null)
                )
            );
        }
    }

    ReactDOM.render(
      e(FilterForm, null, null),
      document.getElementById('c-search-filters')
    );

});
