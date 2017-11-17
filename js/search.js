//***** MANAGES SEARCH FILTERING *****//

$(window).on("load", function(){

    const e = React.createElement;

    class Neighborhood extends React.Component {
        render() {
            const hood = this.props.neighborhood;
            const name = hood.area[0]
            var price = null;
            var safety = null;
            //console.log(hood);
            if(hood.price) {
                price = e('p', null, `$${hood.price[0][1]}`);
            }
            if(hood.fireScore) {
                safety = e('p', null, `Safety Score: ${hood.fireScore}`);
            } else {
                safety = e('p', null, `Safety: No Score Available`);
            }
            return e('div', {className: 'o-neighborhood-listing'},
                e('h4', null, `Hood: ${name}`),
                price,
                safety
            );
        }
    }

    class NeighborhoodList extends React.Component {
      render() {
        const rows = [];

        this.props.neighborhoods.forEach((hood) => {
            rows.push(
                e(Neighborhood, {neighborhood: hood}, null)
            );
        });

        //console.log(rows);

        return (rows);
      }
    }

    ReactDOM.render(
      e(NeighborhoodList, {neighborhoods: nycNeighborhoodData}, null),
      document.getElementById('c-search-results')
    );

    class NameForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: ''};

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event) {
            this.setState({value: event.target.value});
        }

        handleSubmit(event) {
            alert('A name was submitted: ' + this.state.value);
            event.preventDefault();
        }

        render() {
            return e('form', {onSubmit: this.handleSubmit},
                e('label', null,
                    e('input', {type: 'text', value: this.state.value, onChange: this.handleChange})
                ),
                e('input', {type: 'submit', value: 'Submit'})
            );
        }
    }

});
