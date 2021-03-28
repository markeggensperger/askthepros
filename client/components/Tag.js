/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { connect } from 'react-redux';
import { getTag } from '../store/singleTag';
import { Link } from 'react-router-dom';
import { select, removeSelection } from '../store/selections';
import { updateTags } from '../store/tags';
import { updateCocktails } from '../store/cocktails';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      await this.props.getTag(id);
    } catch (err) {
      console.error(err);
    }
  }
  async handleClick(evt) {
    try {
      const preference = evt.target.id;
      const tag = this.props.tag;
      if (preference === 'remove') {
        this.props.removeSelection(tag);
      } else {
        this.props.makeSelection(tag, preference);
      }
      await this.props.updateCocktails();
      await this.props.updateTags();
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    let tag = '';
    let cocktails = [];
    let preference = '';
    if (this.props.tag.id) {
      tag = this.props.tag.tag;
      cocktails = this.props.tag.cocktails;
      const { all } = this.props.selections;
      if (all.length) {
        const tagFromAll = all.find(
          (selection) => selection.id === this.props.tag.id
        );
        preference = tagFromAll ? tagFromAll.preference : '';
      }
    }

    return (
      <div>
        <div className='tag_header'>
          <div>
            <h3 className='tag_name'>{tag}</h3>
          </div>
          <div
            className={preference === 'likes' ? 'thumb activeThumb' : 'thumb'}
          >
            <i
              className='fas fa-thumbs-up'
              id={preference === 'likes' ? 'remove' : 'likes'}
              onClick={this.handleClick}
            />
          </div>
          <div
            className={
              preference === 'dislikes' ? 'thumb activeThumb' : 'thumb'
            }
          >
            <i
              className='fas fa-thumbs-down'
              id={preference === 'dislikes' ? 'remove' : 'dislikes'}
              onClick={this.handleClick}
            />
          </div>
        </div>
        <div className='cocktailBox'>
          {cocktails.map((cocktail) => (
            <div className='cocktail' key={cocktail.id}>
              <Link to={`/cocktails/${cocktail.id}`}>{cocktail.name}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  tag: state.singleTag,
  selections: state.selections,
});

const mapDispatch = (dispatch) => ({
  getTag: (id) => dispatch(getTag(id)),
  makeSelection: (tag, preference) => dispatch(select(tag, preference)),
  updateTags: () => dispatch(updateTags()),
  updateCocktails: () => dispatch(updateCocktails()),
  removeSelection: (tag) => dispatch(removeSelection(tag)),
});

export default connect(mapState, mapDispatch)(Tag);
