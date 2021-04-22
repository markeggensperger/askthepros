import React from 'react';
import { connect } from 'react-redux';
// import { select, removeSelection, reset } from '../store/selections';
import { likeTag, alterLike, alterDislike, reset} from '../store/bartender'

class AllTags extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleClick(tag) {
    switch (tag.selection) {
      case 'likes':
        this.props.alterLike(tag.id);
        break;
      case 'dislikes':
        this.props.alterDislike(tag.id);
        break;
      default:
        this.props.likeTag(tag.id);
        break;
    }
  }
  reset() {
    this.props.reset();
  }
  toggleResults() {
    const cocktails = Object.values(this.props.cocktails)
    const count = cocktails.length;
    const idx = Math.floor(Math.random() * count);
    this.props.history.push('/cocktails/' + cocktails[idx].id);
  }
  render() {
    const tags = Object.values(this.props.tags);
    const cocktailCount = Object.keys(this.props.cocktails).length
    return (
      <div>
        <div id="allTags">
          {tags.map((tag) => (
            <div className={`tag_header ${tag.selection}`} key={tag.id}>
              <p className="tag_name" onClick={() => this.handleClick(tag)}>
                {tag.tag}
              </p>
            </div>
          ))}
        </div>
        <div>
          {cocktailCount < 5 && cocktailCount > 0 ? (
            <img
              src="/media/thirsty.svg"
              onClick={this.toggleResults}
              id="results"
            />
          ) : (
            ''
          )}
          {cocktailCount === 0 ? (
            <img
              src="/media/invalid combo.svg"
              onClick={this.reset}
              id="results"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  tags: state.tags,
  selections: state.selections,
  cocktails: state.cocktails,
});
const mapDispatch = (dispatch) => ({
  reset: () => dispatch(reset()),
  likeTag: (id) => dispatch(likeTag(id)),
  alterLike: (id) => dispatch(alterLike(id, 'dislikes')),
  alterDislike: (id) => dispatch(alterDislike(id, 'none')),
});
export default connect(mapState, mapDispatch)(AllTags);
