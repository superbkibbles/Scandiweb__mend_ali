import React, { memo } from "react";
import { connect } from "react-redux";

import "./miniCart.css";
import MiniCartCard from "./MiniCartCard";
import { openCloseCart } from "../../actions";
import RegularButton from "../buttons/regular/RegularButton";
import SuccessButton from "../buttons/success/SuccessButton";
import { useNavigate } from "react-router-dom";

class MiniCart extends React.Component {
  totalPrice = () => {
    const { cart, currency } = this.props;

    let res = 0;
    cart.products.forEach((p) => {
      const price = p.product.prices?.filter(
        (el) => el.currency.symbol === currency?.activeCurrency
      )[0];
      res += price.amount * p.count;
    });
    return res;
  };

  render() {
    const { cart, openCloseCart, currency, navigate } = this.props;
    return (
      <div
        className={`container  ${cart?.isOpen ? "show" : ""}`}
        onClick={() => openCloseCart(false)}
      >
        <div className="mini-cart" onClick={(e) => e.stopPropagation()}>
          {cart.products?.length > 0 ? (
            <div>
              <p style={{ marginBottom: "23px", fontWeight: 500 }}>
                <span style={{ fontWeight: 700 }}>My bag</span>,{" "}
                {cart.products.length} items
              </p>
              {cart.products.map((product, i) => (
                <MiniCartCard
                  key={product.product.id}
                  id={product.product.id}
                  i={i}
                  title={product.product.name}
                  price={
                    product.product.prices?.filter(
                      (el) => el.currency.symbol === currency?.activeCurrency
                    )[0]
                  }
                  attributes={product.product.attributes}
                  selectedArtibutes={product.artibutes}
                  img={product.product.gallery[0]}
                  count={product.count}
                />
              ))}
              <div className="total__container">
                <p>Total</p>
                <p style={{ fontWeight: 700 }}>
                  {currency?.activeCurrency}
                  {this.totalPrice().toFixed(2)}
                </p>
              </div>

              <div className="button__container">
                <RegularButton
                  title="View bag"
                  onClick={() => {
                    openCloseCart(false);
                    navigate("/cart");
                  }}
                />
                <SuccessButton title="CHECK OUT" />
              </div>
            </div>
          ) : (
            <h2>Cart is empty</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
  };
};

export default connect(mapStateToProps, { openCloseCart })(
  memo((props) => {
    const navigate = useNavigate();

    return <MiniCart navigate={navigate} {...props} />;
  })
);
