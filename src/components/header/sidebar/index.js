import React, { Component } from 'react';

import MenuContainer from './menu_container';


export default class Sidebar extends Component {

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <a href="#">
            <div className="pull-left image">
              <i className=" fa fa-user-circle-o fa-3x" ></i>
            </div>
          </a>
            <div className="pull-left info">
              <p>Name Goes Here</p>
            </div>
          </div>
          <ul className="sidebar-menu">
            <li className="header">MAIN MENU</li>
            <MenuContainer name="Dashboard" icon="fa-tachometer" Link="/"/>
            <MenuContainer name="Recipe" icon="fa-book" children={[{name: "Child 1", link: "#"}, {name: "Child 2", link: "#"}]}/>
            <MenuContainer name="Ingredients" icon="fa-balance-scale" link="#"/>
            <MenuContainer name="Fermenter" icon="fa-industry" children={[{name: "Child 1", link: "#"}, {name: "Child 2", link: "#"}]}/>
            <MenuContainer name="Kegerator" icon="fa-beer" link="#"/>
            <MenuContainer name="Devices" icon="fa-microchip" link="#"/>
            <MenuContainer name="Alerts" icon='fa-exclamation-triangle' link="/alerts" />
          </ul>
        </section>
      </aside>

    );
  }
}
