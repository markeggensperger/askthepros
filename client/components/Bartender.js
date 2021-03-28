import React from 'react';
import { connect } from 'react-redux';
import { updateCocktails } from '../store/cocktails';
import { select, reset } from '../store/selections';
import { updateTags } from '../store/tags';
import { getCocktail } from '../store/singleCocktail';
import Like from './like';
import Dislike from './dislike';
import { mainSentence } from './communications';

class Bartender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initial: true };
    this.handleClick = this.handleClick.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    this.update();
  }
  handleClick(preference) {
    this.setState({ initial: false });
    const tag = this.props.tags[0];
    this.props.makeSelection(tag, preference);
    this.update();
  }
  async toggleResults() {
    try {
      const { cocktails } = this.props;
      const count = cocktails.length;
      const id = cocktails[Math.floor(Math.random() * count)].id;
      await this.props.getCocktail(id);
      this.props.history.push('/cocktails/' + id);
    } catch (err) {
      console.error(err);
    }
  }
  async update() {
    try {
      await this.props.updateCocktails();
      await this.props.updateTags();
    } catch (err) {
      console.error(err);
    }
  }
  reset() {
    this.props.reset();
    this.update();
  }
  render() {
    const tag = this.props.tags[0] || { tag: 'Still Loading' };
    const cocktails = this.props.cocktails || Array(6).fill(0);
    const { initial } = this.state;
    const phrase = cocktails.length
      ? mainSentence(tag, initial)
      : `Unfortunately, we don't have any cocktails meeting all those criteria. Please reset.`;
    return (
      <div>
        <div id='prompt_window'>
          <div className='thought'>{phrase}</div>
          <div id='options'>
            <img
              src='/media/heart.png'
              onClick={() => this.handleClick('likes')}
              id='heart'
            />
            <Dislike handleClick={this.handleClick} />
            <img
              src='/media/untitled.png'
              onClick={() => this.handleClick('ignores')}
              id='ignores'
            />
          </div>
        </div>
        {cocktails.length < 6 && cocktails.length > 0 ? (
          <img
            src='/media/thirsty.svg'
            onClick={this.toggleResults}
            id='results'
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
  makeSelection: (tag, preference) => dispatch(select(tag, preference)),
  updateTags: () => dispatch(updateTags()),
  updateCocktails: () => dispatch(updateCocktails()),
  getCocktail: (id) => dispatch(getCocktail(id)),
  reset: () => dispatch(reset()),
});

export default connect(mapState, mapDispatch)(Bartender);
