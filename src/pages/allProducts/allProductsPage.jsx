import React from "react";
import { connect } from "react-redux";

import CardList from "../../components/cardList/CardList";
import { getProductsByCategory } from "../../actions";

class AllProductsPage extends React.Component {
  componentDidMount() {
    const { getProductsByCategory } = this.props;

    getProductsByCategory("all");
  }

  render() {
    const { name, products } = this.props.products;
    return <CardList items={products} title={name} />;
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, { getProductsByCategory })(
  AllProductsPage
);
