import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getCocktail } from '../store/singleCocktail';
import { getTag } from '../store/singleTag';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.selectTag = this.selectTag.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
  }
  async selectTag(evt) {
    try {
      const id = evt.target.id;
      await this.props.getTag(id);
      this.props.history.push('/tags/' + id);
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
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const count = this.props.cocktails.length || 0;
    const selectionList = this.props.selections.all || [];
    return (
      <div id='menu'>
        <div id='menu_navigation'>
          <h3>
            <NavLink to='/'>Talk to the bartenders</NavLink>
          </h3>
          <h3>
            <NavLink to='/tags'>All cocktail tags</NavLink>
          </h3>
        </div>
        <div id='side_results'>
          <h5>Found {count} cocktails</h5>
          {selectionList.map((selection) => (
            <h6 key={selection.id} className={selection.preference}>
              <a id={selection.id} onClick={this.selectTag}>
                {selection.tag} ({selection.preference})
              </a>
            </h6>
          ))}
        </div>
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
});

export default connect(mapState, mapDispatch)(Menu);
