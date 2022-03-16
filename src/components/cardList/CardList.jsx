import React from "react";
import { connect } from "react-redux";

import Card from "../card/Card";
import { addToCart, changeProductsAttribute } from "../../actions";
import "./cardList.css";

class CardList extends React.Component {
  onCartClick = (e, i) => {
    const { items } = this.props;

    e.stopPropagation();
    const { addToCart } = this.props;
    addToCart(items[i], items[i].selectedArtibutes);
  };

  onAttributeClick = (productID, id, attributeID) => {
    this.props.changeProductsAttribute({ productID, id, attributeID });
  };

  render() {
    const { title, items, currency } = this.props;
    return (
      <div className="card-list__container">
        <h1 className="card-list__head">{title}</h1>
        <div className="card-list__wrapper">
          {items?.map((item, i) => (
            <Card
              category={title}
              onAttributeClick={this.onAttributeClick}
              key={item.id}
              selectedArtibutes={item?.selectedArtibutes}
              i={i}
              onCartClick={this.onCartClick}
              id={item.id}
              title={item.name}
              price={
                item.prices.filter(
                  (el) => el.currency.symbol === currency?.activeCurrency
                )[0]
              }
              inactive={!item.inStock}
              img={item.gallery[0]}
              attributes={item.attributes}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

export default connect(mapStateToProps, { addToCart, changeProductsAttribute })(
  CardList
);
