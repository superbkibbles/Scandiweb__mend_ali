import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import "./card.css";
// import pic from "./baby.jpg";
import cartIcon from "../../assets/icons/cart-white.png";
import SizeButton from "../buttons/sizeButton/SizeButton";

class Card extends React.Component {
  _renderArrtibutes(attributes) {
    return (
      attributes?.length > 0 &&
      attributes.map((attribute) => {
        return (
          <div key={attribute.id} className="attributes">
            <p className="main-card__price">{attribute.name}</p>
            <div style={{ display: "flex", gap: "5px" }}>
              {attribute.items.map((el) => {
                if (attribute.type === "swatch")
                  return (
                    <div
                      key={el.id}
                      style={{
                        backgroundColor: el.value,
                      }}
                      className="swatch"
                    />
                  );
                return (
                  <SizeButton
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
    const { title, price, inactive, img, category, id, attributes, navigate } =
      this.props;

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
            style={{
              objectFit: "contain",
            }}
            src={img}
          />
          {inactive && (
            <p
              style={{
                position: "absolute",
                fontSize: "24px",
                color: "var(--color-grey)",
                zIndex: 1,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              OUT OF STOCK
            </p>
          )}
          <div
            className="main-card__cart"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <img src={cartIcon} alt="" />
          </div>
        </div>
        <p
          className={"main-card__title"}
          style={
            inactive
              ? {
                  color: "var(--color-grey)",
                }
              : {}
          }
        >
          {title}
        </p>
        <p
          className={"main-card__price"}
          style={
            inactive
              ? {
                  color: "var(--color-grey)",
                }
              : {}
          }
        >
          {price.currency.symbol}
          {price.amount}
        </p>
        {this._renderArrtibutes(attributes)}
      </div>
    );
  }
}

// export default memo(Card);

export default memo((props) => {
  const navigate = useNavigate();
  return <Card navigate={navigate} {...props} />;
});
