import React from "react";
import { connect } from "react-redux";

import MiniCart from "../components/MiniCart/MiniCart";
import Nav from "../components/nav/Nav";
import { getCurrencies } from "../actions";
import { openCloseDropdown } from "../actions";
import "./layout.css";

class TheLayout extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }
  render() {
    const { children, openCloseDropdown } = this.props;
    return (
      <div className="main">
        <MiniCart />
        <div onClick={() => openCloseDropdown(false)} className="main">
          <div onClick={(e) => e.stopPropagation()}>
            <Nav />
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(null, { openCloseDropdown, getCurrencies })(TheLayout);
