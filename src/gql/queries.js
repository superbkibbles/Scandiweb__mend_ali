import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  {
    category {
      products {
        id
        brand
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductByID($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      description
      gallery
      brand
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query GetAllCurrencies {
    currencies {
      symbol
      label
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductByCategoryName($categoryid: String!) {
    category(input: { title: $categoryid }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;
