import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import client from "../../client";
import { addToCart } from "../../actions";
import SizeButton from "../../components/buttons/sizeButton/SizeButton";
import SuccessButton from "../../components/buttons/success/SuccessButton";
import { GET_PRODUCT_BY_ID } from "../../gql/queries";

import "./productPage.css";
import RegularButton from "../../components/buttons/regular/RegularButton";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      activeImg: 0,
      selectedArtibutes: {},
    };
  }

  async componentDidMount() {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_ID,
      variables: { id: this.props.params?.id },
    });

    this.setDefaultArtibutes(data.product);
    this.setState({ product: data.product });
  }

  setDefaultArtibutes(product) {
    const req = {};
    product.attributes.forEach((attribute) => {
      req[attribute.id] = attribute.items[0].id;
    });
    this.setState({ selectedArtibutes: req });
  }

  onAttributeClick = (attributeID, id) => {
    const { selectedArtibutes } = this.state;

    const req = { ...selectedArtibutes };
    req[attributeID] = id;

    this.setState({ selectedArtibutes: req });
  };

  _renderArrtibutes(attributes) {
    const { selectedArtibutes } = this.state;

    return (
      attributes?.length > 0 &&
      attributes.map((attribute) => (
        <div key={attribute.id}>
          <p className="product-page__text">{attribute.name}</p>
          <div className="product-page__size-container">
            {attribute.items.map((el) => {
              if (attribute.type === "swatch")
                return (
                  <div
                    onClick={() => this.onAttributeClick(attribute.id, el.id)}
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
                <SizeButton
                  active={selectedArtibutes[attribute.id] === el.id}
                  onClick={() => this.onAttributeClick(attribute.id, el.id)}
                  key={el.id}
                  notAvailable={false}
                  size={el.value}
                />
              );
            })}
          </div>
        </div>
      ))
    );
  }

  handleAddToCart = () => {
    const { addToCart } = this.props;
    addToCart(this.state.product, this.state.selectedArtibutes);
  };

  render() {
    const { currency, cart } = this.props;
    const { product, activeImg } = this.state;
    const productIndex = cart.products.findIndex(
      (el) => el.product.id === this.props.params.id
    );
    const price = product.prices?.filter(
      (el) => el.currency.symbol === currency?.activeCurrency
    )[0];
    return (
      <div className="product-page">
        <div className="product-page__images">
          {product.gallery?.map((img, i) => (
            <img
              key={i}
              onClick={() => this.setState({ activeImg: i })}
              src={img}
              alt="products"
              className="product-page__gallery"
            />
          ))}
        </div>

        <img
          className="product-page__main-pic"
          src={product.gallery && product.gallery[activeImg]}
          alt="product"
        />

        <div className="product-page__details">
          <p className="product-page__title">{product.name}</p>
          <p className="product-page__subtitle">{product.brand}</p>

          {this._renderArrtibutes(product?.attributes)}

          <p className="product-page__text">price:</p>
          <p className="product-page__price">
            {price?.currency.symbol}
            {price?.amount}
          </p>

          {productIndex === -1 ? (
            <SuccessButton
              onClick={this.handleAddToCart}
              title="ADD TO CART"
              style={{ width: "100%", padding: "16px 0", marginBottom: "40px" }}
            />
          ) : (
            <RegularButton
              title="ADDED TO CART"
              style={{
                width: "100%",
                padding: "16px 0",
                marginBottom: "40px",
                cursor: "context-menu",
              }}
            />
          )}

          <div
            className="product-page__desc"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart })((props) => {
  const params = useParams();

  return <ProductPage params={params} {...props} />;
});
