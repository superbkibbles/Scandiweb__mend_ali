import React from "react";
import { useNavigate } from "react-router-dom";

import "./card.css";
import cartIcon from "../../assets/icons/cart-white.png";
import SizeButton from "../buttons/sizeButton/SizeButton";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }
  _renderArrtibutes(attributes, selectedArtibutes, productID) {
    return (
      attributes?.length > 0 &&
      attributes.map((attribute) => {
        return (
          <div key={attribute.id} className="attributes">
            <p className="main-card__price">{attribute.name}</p>
            <div className="main-card__attribute-container">
              {attribute.items.map((el) => {
                if (attribute.type === "swatch")
                  return (
                    <div
                      onClick={() =>
                        this.props.onAttributeClick(
                          productID,
                          el.id,
                          attribute.id
                        )
                      }
                      key={el.id}
                      style={{
                        backgroundColor: el.value,
                      }}
                      className={`swatch ${
                        selectedArtibutes &&
                        selectedArtibutes[attribute.id] === el.id
                          ? "swatch__active"
                          : ""
                      }`}
                    />
                  );
                return (
                  <SizeButton
                    onClick={() =>
                      this.props.onAttributeClick(
                        productID,
                        el.id,
                        attribute.id
                      )
                    }
                    active={
                      selectedArtibutes &&
                      selectedArtibutes[attribute.id] === el.id
                    }
                    key={el.id}
                    notAvailable={false}
                    size={el.value}
                  />
                );
              })}
            </div>
          </div>
        );
      })
    );
  }

  render() {
    const {
      title,
      price,
      inactive,
      img,
      category,
      id,
      attributes,
      navigate,
      onCartClick,
      i,
      selectedArtibutes,
    } = this.props;

    return (
      <div className={`main-card ${inactive ? "main-card__inactive" : ""}`}>
        <div
          className="main-card__container"
          onClick={() => navigate(`/${category}/product/${id}`)}
        >
          <img
            width={"100%"}
            height={"100%"}
            alt="product"
            className="image-contain"
            src={img}
          />
          {inactive && <p className="main-card__out-of-stock">OUT OF STOCK</p>}
          <div
            className="main-card__cart"
            onClick={(e) => {
              e.stopPropagation();
              if (!inactive) {
                if (
                  (!selectedArtibutes ||
                    Object.keys(selectedArtibutes).length !==
                      attributes.length) &&
                  attributes.length > 0
                )
                  return this.setState({
                    error: "Please select all attributes",
                  });
                this.setState({ error: "" });
                onCartClick(e, i);
              }
            }}
          >
            <img src={cartIcon} alt="cart" />
          </div>
        </div>
        <p
          className={`main-card__title ${
            inactive && "main-card__text__inactive"
          } `}
        >
          {title}
        </p>
        <p
          className={`main-card__price ${
            inactive && "main-card__text__inactive"
          }`}
        >
          {price.currency.symbol}
          {price.amount}
        </p>
        {this._renderArrtibutes(attributes, selectedArtibutes, id)}
        <p className="error-message">{this.state.error}</p>
      </div>
    );
  }
}

const CardContainer = (props) => {
  const navigate = useNavigate();
  return <Card navigate={navigate} {...props} />;
};

export default CardContainer;
