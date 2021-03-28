import React from 'react';
import { connect } from 'react-redux';
import { getCocktail } from '../store/singleCocktail';
import { Link } from 'react-router-dom';

class Cocktail extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      await this.props.getCocktail(id);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    let name = '';
    let directions = [];
    let tags = [];
    if (this.props.cocktail.id) {
      name = this.props.cocktail.name;
      directions = this.props.cocktail.directions.split(',');
      tags = this.props.cocktail.tags;
    }
    return (
      <div className='cocktailData'>
        <h1>{name}</h1>
        <h3>Ingredients:</h3>
        {directions.map((ingredient, idx) => (
          <h5 key={idx}>{ingredient}</h5>
        ))}
        <div className='tagBox'>
          {tags.map((tag) => (
            <div className='tag' key={tag.id}>
              <Link to={`/tags/${tag.id}`}>{tag.tag}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cocktail: state.singleCocktail,
});

const mapDispatch = (dispatch) => ({
  getCocktail: (id) => dispatch(getCocktail(id)),
});

export default connect(mapState, mapDispatch)(Cocktail);
