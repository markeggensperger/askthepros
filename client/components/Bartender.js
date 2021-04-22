import React from 'react';
import { connect } from 'react-redux';
import Dislike from './dislike'
import { likeTag, dislikeTag, ignoreTag, reset} from '../store/bartender';
import { mainSentence } from './communications';

class Bartender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initial: true };
    this.handleClick = this.handleClick.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
    this.reset = this.reset.bind(this);
    this.nextTag = this.nextTag.bind(this)
  }
  nextTag() {
    let n = Object.keys(this.props.cocktails).length
    if (n === 0) return { tag: 'Still Loading' }
    let next = { id: 0, score: n}
    Object.values(this.props.tags).forEach(tag => {
      if (tag.selection === 'none') {
        const score = Math.abs(n / 2 - Object.keys(tag.cocktails).length)
        if (score < next.score) next = {id: tag.id, score}
      }
    })
    return this.props.tags[next.id]
  }
  handleClick(tag, preference) {
    this.setState({ initial: false });
    this.props[preference](tag.id);
  }
  toggleResults() {
    const cocktails = Object.values(this.props.cocktails)
    const count = cocktails.length;
    const idx = Math.floor(Math.random() * count);
    this.props.history.push('/cocktails/' + cocktails[idx].id);
  }
  reset() {
    this.props.reset();
  }
  render() {
    const tag = this.nextTag()
    const cocktailCount = Object.keys(this.props.cocktails).length
    const { initial } = this.state;
    const phrase = cocktailCount
      ? mainSentence(tag, initial)
      : `Unfortunately, we don't have any cocktails meeting all those criteria. Please reset.`;
    return (
      <div>
        <div id="prompt_window">
          <div className="thought">{phrase}</div>
          <div id="options">
            <img
              src="/media/heart.png"
              onClick={() => this.handleClick(tag, 'like')}
              id="heart"
            />
            <Dislike tag = {tag} handleClick={this.handleClick} />
            <img
              src="/media/untitled.png"
              onClick={() => this.handleClick(tag, 'ignore')}
              id="ignores"
            />
          </div>
        </div>
        {cocktailCount < 6 && cocktailCount > 0 ? (
          <img
            src="/media/thirsty.svg"
            onClick={this.toggleResults}
            id="results"
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  selections: state.selections,
  cocktails: state.cocktails,
  tags: state.tags,
});

const mapDispatch = (dispatch) => ({
  like: (tag) => dispatch(likeTag(tag)),
  dislike: (tag) => dispatch(dislikeTag(tag)),
  ignore: (tag) => dispatch(ignoreTag(tag)),
  reset: () => dispatch(reset()),
});

export default connect(mapState, mapDispatch)(Bartender);
