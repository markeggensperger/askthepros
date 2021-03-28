import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCocktail } from '../store/singleCocktail';
import { getTag } from '../store/singleTag';
import { updateTags } from '../store/tags';
import { updateCocktails } from '../store/cocktails';
import { reset } from '../store/selections';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.selectTag = this.selectTag.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
    this.reset = this.reset.bind(this);
  }
  async selectTag(evt) {
    try {
      const id = evt.target.id;
      await this.props.getTag(id);
      this.props.history.push('/tags/' + id);
      this.props.toggleMenu();
    } catch (err) {
      console.error(err);
    }
  }
  async reset() {
    try {
      this.props.reset();
      await this.props.updateCocktails();
      await this.props.updateTags();
      this.props.toggleMenu();
    } catch (err) {
      console.error(err);
    }
  }
  async toggleResults() {
    try {
      const { cocktails } = this.props;
      const count = cocktails.length;
      const id = cocktails[Math.floor(Math.random() * count)].id;
      await this.props.getCocktail(id);
      this.props.history.push('/cocktails/' + id);
      this.props.toggleMenu();
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const count = this.props.cocktails.length || 0;
    const selectionList = this.props.selections.all || [];
    const close = this.props.toggleMenu;
    return (
      <div id='sidebar'>
        <div id='side_navigation'>
          <h3>
            <Link to='/' onClick={() => close()}>
              Talk to the bartenders
            </Link>
          </h3>
          <h3>
            <Link to='/tags' onClick={() => close()}>
              All cocktail tags
            </Link>
          </h3>
        </div>
        <div id='side_results'>
          <h5>Found {count} cocktails</h5>
          <h5>with seleections:</h5>
          {selectionList.map((selection) => (
            <h6 key={selection.id}>
              <a id={selection.id} onClick={this.selectTag}>
                {selection.tag} ({selection.preference})
              </a>
            </h6>
          ))}
        </div>
        {count < 5 && count > 0 ? (
          <a onClick={this.toggleResults}>Enough!! I'm Thirsty!!</a>
        ) : (
          ''
        )}
        <br />
        <br />
        <a onClick={this.reset}>Reset Selections</a>
      </div>
    );
  }
}

const mapState = (state) => ({
  selections: state.selections,
  cocktails: state.cocktails,
});
const mapDispatch = (dispatch) => ({
  getTag: (id) => dispatch(getTag(id)),
  getCocktail: (id) => dispatch(getCocktail(id)),
  updateTags: () => dispatch(updateTags()),
  updateCocktails: () => dispatch(updateCocktails()),
  reset: () => dispatch(reset()),
});

export default connect(mapState, mapDispatch)(Sidebar);
