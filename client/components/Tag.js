/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { alterLike, alterDislike, likeTag, dislikeTag} from '../store/bartender'
import cocktailSeed from '../../script/seedCocktails'

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt) {
    const id = this.props.match.params.id
    const {selection} = this.props.tags[id]
    const nextState = evt.target.id
    switch (selection) {
      case 'likes':
        this.props.alterLike(id, nextState)
        break;
      case 'dislikes':
        this.props.alterDislike(id, nextState)
        break;
      default:
        if (nextState === 'likes') {
          this.props.likeTag(id)
        } else {
          this.props.dislikeTag(id)
        }
        break;
    }
  }
  render() {
    const id = this.props.match.params.id
    const tag = this.props.tags[id]
    let cocktails = [];
    cocktailSeed.forEach(cocktail => {
      if (cocktail.tags[id]) cocktails.push(cocktail)
    })
    const {selection} = tag
    return (
      <div>
        <div className="tag_header">
          <div>
            <h3 className="tag_name">{tag.tag}</h3>
          </div>
          <div
            className={selection === 'likes' ? 'thumb activeThumb' : 'thumb'}
          >
            <i
              className="fas fa-thumbs-up"
              id={selection === 'likes' ? 'none' : 'likes'}
              onClick={this.handleClick}
            />
          </div>
          <div
            className={
              selection === 'dislikes' ? 'thumb activeThumb' : 'thumb'
            }
          >
            <i
              className="fas fa-thumbs-down"
              id={selection === 'dislikes' ? 'none' : 'dislikes'}
              onClick={this.handleClick}
            />
          </div>
        </div>
        <div className="cocktailBox">
          {cocktails.map((cocktail) => (
            <div className="cocktail" key={cocktail.id}>
              <Link to={`/cocktails/${cocktail.id}`}>{cocktail.name}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  tags: state.tags,
});

const mapDispatch = (dispatch) => ({
  alterLike: (id, nextState) => dispatch(alterLike(id, nextState)),
  alterDislike: (id, nextState) => dispatch(alterDislike(id, nextState)),
  likeTag: (id) => dispatch(likeTag(id)),
  dislikeTag: (id) => dispatch(dislikeTag(id))
});

export default connect(mapState, mapDispatch)(Tag);
