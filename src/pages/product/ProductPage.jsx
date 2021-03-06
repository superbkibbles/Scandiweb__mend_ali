import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import client from "../../client";
import { addToCart } from "../../actions";
import SizeButton from "../../components/buttons/sizeButton/SizeButton";
import SuccessButton from "../../components/buttons/success/SuccessButton";
import RegularButton from "../../components/buttons/regular/RegularButton";
import { GET_PRODUCT_BY_ID } from "../../gql/queries";

import "./productPage.css";

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

  _renderArrtibutes(attributes, inStock) {
    const { selectedArtibutes } = this.state;

    return (
      attributes?.length > 0 &&
      attributes.map((attribute) => (
        <div key={attribute.id} className={!inStock ? "grayFilter" : ""}>
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
    const { currency } = this.props;
    const { product, activeImg } = this.state;

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
          {this._renderArrtibutes(product?.attributes, product?.inStock)}
          <p className="product-page__text">price:</p>
          <p className="product-page__price">
            {price?.currency.symbol}
            {price?.amount}
          </p>
          {product?.inStock ? (
            <SuccessButton
              onClick={this.handleAddToCart}
              title="ADD TO CART"
              className="btn__success-1"
            />
          ) : (
            <RegularButton className="btn__regular-1" title="Out Of Stock" />
          )}
          <div> {ReactHtmlParser(product.description)} </div>
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
