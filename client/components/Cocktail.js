import React from 'react';
import { Link } from 'react-router-dom';
import cocktailSeed from '../../script/seedCocktails'
import tagSeed from '../../script/seedTags'

class Cocktail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const cocktail = cocktailSeed[this.props.match.params.id - 1]
    const {name} = cocktail
    const directions = cocktail.directions.split(',')
    const tags = cocktail.tagIds.map((id) => tagSeed[id - 1])
    return (
      <div className="cocktailData">
        <h1>{name}</h1>
        <h3>Ingredients:</h3>
        {directions.map((ingredient, idx) => (
          <h5 key={idx}>{ingredient}</h5>
        ))}
        <div className="tagBox">
          {tags.map((tag) => (
            <div className="tag" key={tag.id}>
              <Link to={`/tags/${tag.id}`}>{tag.tag}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cocktail
