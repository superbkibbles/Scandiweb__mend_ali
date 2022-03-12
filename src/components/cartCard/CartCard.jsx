import React from "react";
import { connect } from "react-redux";

import {
  changeArtibutes,
  incrementCount,
  decrementCount,
  removeProduct,
} from "../../actions";
import "./cartCard.css";

class CartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImages: {},
    };
  }
  onAttributeClick = (productID, id, attributeID) => {
    this.props.changeArtibutes({ productID, id, attributeID });
  };

  handleLeftArrow = (id, length) => {
    if (!this.state.activeImages[id])
      return this.setState((prevState) => {
        return {
          ...prevState,
          activeImages: { ...prevState.activeImages, [id]: length - 1 },
        };
      });

    if (this.state.activeImages[id] < 1) {
      return this.setState((prevState) => {
        return {
          ...prevState,
          activeImages: {
            ...prevState.activeImages,
            [id]: length - 1,
          },
        };
      });
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        activeImages: {
          ...prevState.activeImages,
          [id]: this.state.activeImages[id] - 1,
        },
      };
    });

  };

  handleRightArrow = (id, length) => {
    if (!this.state.activeImages[id])
      return this.setState((prevState) => {
        return {
          ...prevState,
          activeImages: { ...prevState.activeImages, [id]: 1 },
        };
      });

    if (this.state.activeImages[id] > length - 2) {
      return this.setState((prevState) => {
        return {
          ...prevState,
          activeImages: {
            ...prevState.activeImages,
            [id]: 0,
          },
        };
      });
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        activeImages: {
          ...prevState.activeImages,
          [id]: this.state.activeImages[id] + 1,
        },
      };
    });
  };

  _renderArrtibutes(attributes, selectedArtibutes, productID) {
    return (
      attributes?.length > 0 &&
      attributes.map((attribute) => {
        return (
          <div key={attribute.id} className="cart-page__sizes">
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
                  className={`cart-page__size ${
                    selectedArtibutes[attribute.id] === el.id &&
                    "cart-page__activeSize"
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
      removeProduct,
    } = this.props;
    const count = cart.products[i].count;

    return (
      <div className="cart-page__card">
        <div
          style={{ top: 0, right: 0, position: "absolute", cursor: "pointer" }}
          onClick={() => removeProduct(id)}
        >
          x
        </div>
        <div className="cart-page__details">
          <div className="cart-page__title">{title}</div>
          <div className="cart-page__price">
            {price.currency.symbol}
            {Number(price.amount * count).toFixed(2)}
          </div>
          {this._renderArrtibutes(attributes, selectedArtibutes, id)}
        </div>
        <div className="cart-page__items">
          <div className="cart-page__increments">
            <div
              className="cart-page__plus"
              onClick={() => incrementCount(id, count)}
            />
            <div className="cart-page__count">{count}</div>
            <div
              className="cart-page__minus"
              onClick={() => count > 1 && decrementCount(id, count)}
            />
          </div>
          <div
            style={{ position: "relative", height: "185px", width: "141px" }}
          >
            <div
              className="left-arrow"
              onClick={() => this.handleLeftArrow(id, img.length)}
            />
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              src={img[this.state.activeImages[id]] ?? img[0]}
              alt="prod"
            />
            <div
              className="right-arrow"
              onClick={() => this.handleRightArrow(id, img.length)}
            />
          </div>
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
  changeArtibutes,
  incrementCount,
  decrementCount,
  removeProduct,
})(CartCard);
