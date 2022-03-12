import React from "react";
import { connect } from "react-redux";

import CartCard from "../../components/cartCard/CartCard";

import "./cartPage.css";

class CartPage extends React.Component {
  render() {
    const { cart, currency } = this.props;
    return (
      <div className="cart-page">
        <h1 className="cart-page__head">CART</h1>
        {cart?.products.length > 0 ? (
          <>
            {cart.products.map((product, i) => (
              <CartCard
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
          </>
        ) : (
          <h2>No Item</h2>
        )}
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

export default connect(mapStateToProps)(CartPage);
