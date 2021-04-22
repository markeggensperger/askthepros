import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {reset} from '../store/bartender'

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.selectTag = this.selectTag.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
    this.reset = this.reset.bind(this);
  }
  selectTag(evt) {
    const id = evt.target.id;
    this.props.history.push('/tags/' + id);
    this.props.toggleMenu();
  }
  reset() {
    this.props.reset();
    this.props.toggleMenu();
  }
  toggleResults() {
    const cocktails = Object.values(this.props.cocktails)
    const count = cocktails.length;
    const idx = Math.floor(Math.random() * count);
    this.props.history.push('/cocktails/' + cocktails[idx].id);
    this.props.toggleMenu();
  }
  render() {
    const count = Object.keys(this.props.cocktails).length
    const selectionList = this.props.selections.all;
    const close = this.props.toggleMenu;
    return (
      <div id="sidebar">
        <div id="side_navigation">
          <h3>
            <Link to="/" onClick={() => close()}>
              Talk to the bartenders
            </Link>
          </h3>
          <h3>
            <Link to="/tags" onClick={() => close()}>
              All cocktail tags
            </Link>
          </h3>
        </div>
        <div id="side_results">
          <h5>Found {count} cocktails</h5>
          <h5>with selections:</h5>
          {selectionList.map((tag) => (
            <h6 key={tag.id}>
              <a id={tag.id} onClick={this.selectTag}>
                {tag.tag} ({tag.selection})
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
  reset: () => dispatch(reset()),
});

export default connect(mapState, mapDispatch)(withRouter(Sidebar))
