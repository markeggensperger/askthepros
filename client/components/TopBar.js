import React from 'react';
import SideBar from './SideBar';


class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      userMenu: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleUserMenu = this.toggleUserMenu.bind(this);
  }
  toggleMenu() {
    const menu = !this.state.menu;
    this.setState({ menu });
  }
  toggleUserMenu() {
    const userMenu = !this.state.userMenu;
    this.setState({ userMenu });
  }
  render() {
    const { menu, userMenu } = this.state;
    return (
      <div id="top_bar_holder">
        <div id="top_bar">
          <div className="menu_button">
            {menu ? (
              <i className="fas fa-minus-square" onClick={this.toggleMenu} />
            ) : (
              <i className="fas fa-bars" onClick={this.toggleMenu} />
            )}
          </div>
          <div className="menu_button">
            {/* <i className="fas fa-user" onClick={this.toggleUserMenu} /> */}
          </div>
        </div>
        {menu ? (
          <SideBar toggleMenu={this.toggleMenu} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default TopBar;
