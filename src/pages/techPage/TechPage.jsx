import React from "react";

import CardList from "../../components/cardList/CardList";
import { getProductsByCategory } from "../../actions";

import { connect } from "react-redux";

class TechPage extends React.Component {
  async componentDidMount() {
    const { getProductsByCategory } = this.props;

    getProductsByCategory("tech");
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

export default connect(mapStateToProps, { getProductsByCategory })(TechPage);
