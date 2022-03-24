import React from "react";
import { connect } from "react-redux";

import Card from "../card/Card";
import { addToCart } from "../../actions";
import "./cardList.css";

class CardList extends React.Component {
  onCartClick = (e, i, arttibutes) => {
    e.stopPropagation();
    const { items, addToCart } = this.props;

    (arttibutes || arttibutes.length < 1) &&
      addToCart(items[i], arttibutes);
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
              key={item.id}
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

export default connect(mapStateToProps, { addToCart })(CardList);
