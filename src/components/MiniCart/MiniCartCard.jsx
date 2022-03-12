import React, { memo } from "react";

import "./miniCartCard.css";
import { incrementCount, decrementCount, changeArtibutes, removeProduct } from "../../actions";
import { connect } from "react-redux";

class MiniCartCard extends React.Component {
  onAttributeClick = (productID, id, attributeID) => {
    this.props.changeArtibutes({ productID, id, attributeID });
  };

  _renderArrtibutes(attributes, selectedArtibutes, productID) {
    return (
      attributes?.length > 0 &&
      attributes.map((attribute) => {
        return (
          <div key={attribute.id} className="sizes">
            {attribute.items.map((el) => {
              if (attribute.type === "swatch")
                return (
                  <div
                    onClick={() =>
                      this.onAttributeClick(productID, el.id, attribute.id)
                    }
                    key={el.id}
                    style={{
                      backgroundColor: el.value,
                    }}
                    className={`swatch ${
                      selectedArtibutes[attribute.id] === el.id
                        ? "swatch__active"
                        : ""
                    }`}
                  />
                );
              return (
                <div
                  onClick={() =>
                    this.onAttributeClick(productID, el.id, attribute.id)
                  }
                  key={el.id}
                  className={`size ${
                    selectedArtibutes[attribute.id] === el.id && "activeSize"
                  }`}
                >
                  {el.value}
                </div>
              );
            })}
          </div>
        );
      })
    );
  }

  render() {
    const {
      title,
      price,
      img,
      attributes,
      selectedArtibutes,
      incrementCount,
      decrementCount,
      id,
      i,
      cart,
      removeProduct
    } = this.props;
    const count = cart.products[i].count;
    return (
      <div className="mini-cart__card">
        <div style={{position: 'absolute', right: 0, top: 0, cursor: 'pointer'}} onClick={() => removeProduct(id)}>x</div>
        <div className="details">
          <div className="title">{title}</div>
          <div className="price">
            {price.currency.symbol}
            {Number(price.amount * count).toFixed(2)}
          </div>
          {this._renderArrtibutes(attributes, selectedArtibutes, id)}
        </div>
        <div className="items">
          <div className="increments">
            <div className="plus" onClick={() => incrementCount(id, count)} />
            <div className="count">{count}</div>
            <div
              className="minus"
              onClick={() => count > 1 && decrementCount(id, count)}
            />
          </div>
          <img
            src={img}
            alt="product"
            style={{ height: "137px", width: "105px", objectFit: "contain" }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, {
  incrementCount,
  decrementCount,
  changeArtibutes,
  removeProduct
})(memo(MiniCartCard));
