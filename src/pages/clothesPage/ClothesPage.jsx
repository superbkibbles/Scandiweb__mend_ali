import React from "react";

import CardList from "../../components/cardList/CardList";
import client from "../../client";
import { GET_PRODUCTS_BY_CATEGORY } from "../../gql/queries";

class ClothesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
    };
  }
  async componentDidMount() {
    try {
      const { data } = await client.query({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: { categoryid: "clothes" },
      });
      this.setState({ category: data.category });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { name, products } = this.state.category;
    return <CardList items={products} title={name} />;
  }
}

export default ClothesPage;
