$(document).ready(function(){
    const e = React.createElement;

    class Neighborhood extends React.Component {
        render() {
            const hood = this.props.neighborhood;
            const name = hood.area[0]
            return e('div', null, `Hood: ${name}`);
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

        console.log(rows);

        return (rows);
      }
    }

    ReactDOM.render(
      e(NeighborhoodList, {neighborhoods: nycNeighbohoodData}, null),
      document.getElementById('c-search-results')
    );

});
