import React from "react";
import { connect } from "react-redux";

import Dropdown from "../dropdown/Dropdown";
import {
  openCloseCart,
  openCloseDropdown,
  changeCurrency,
} from "../../actions";
import "./nav.css";
import logo from "../../assets/icons/logo.png";
import cartLogo from "../../assets/icons/cart.png";
import arrow from "../../assets/icons/arrow.png";
import client from "../../client";
import { GET_CATEGORIES } from "../../gql/queries";
import { Link, NavLink } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const { data } = await client.query({
      query: GET_CATEGORIES,
    });
    // console.log(data);
    this.setState({ categories: data.categories });
  }

  onCartClick = () => {
    const { cart, openCloseCart } = this.props;
    openCloseCart(!cart.isOpen);
  };

  render() {
    const { categories } = this.state;
    const { currency, openCloseDropdown, changeCurrency, cart } = this.props;

    return (
      <nav className="nav">
        <div className="nav__container">
          <div className="nav__item">
            <div className="navigations">
              {categories?.map((category, i) => (
                <NavLink
                  className="navigations__item"
                  // to={`${category.name === "all" ? "/" : "/" + category.name}`}
                  to={category.name}
                  key={i}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="nav__item nav__item-logo">
            <Link to={'/all'}>
              <img className="nav__item__logo" src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="nav__item cart">
            <Dropdown
              visible={currency?.isOpen}
              data={currency?.currencies}
              onSelect={(value) => changeCurrency(value)}
            />
            <p
              className="currency"
              onClick={() => {
                openCloseDropdown(!currency?.isOpen);
              }}
            >
              {currency.activeCurrency}
              <img
                src={arrow}
                alt="^"
                style={
                  !currency?.isOpen
                    ? { transform: "scaleY(-1)", marginTop: "5px" }
                    : { marginTop: "5px" }
                }
              />
            </p>
            <div
              style={{ cursor: "pointer", position: "relative" }}
              onClick={this.onCartClick}
            >
              {cart.products.length > 0 && (
                <div className="number-of-items">
                  <p>{cart.products.length}</p>
                </div>
              )}

              <img src={cartLogo} alt="Cart" />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
  };
};

export default connect(mapStateToProps, {
  openCloseCart,
  openCloseDropdown,
  changeCurrency,
})(Nav);
