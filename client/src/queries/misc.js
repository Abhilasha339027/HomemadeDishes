import { gql } from "@apollo/client";

export const GET_MISC = gql`
  query {
    getMisc {
      tax
      serviceFee
      featuredDishes {
        image
        headline
      }
    }
  }
`;

export const ADD_MISC = gql`
  mutation AddMisc($tax: Int!, $serviceFee: Int!) {
    addMisc(miscInput: { tax: $tax, serviceFee: $serviceFee }) {
      tax
      serviceFee
      featuredDishes {
        image
        headline
      }
    }
  }
`;

export const ADD_FEATURED_DISH = gql`
  mutation AddFeaturedDish($headline: String!, $image: String!, $index: Int!) {
    addFeaturedDish(headline: $headline, image: $image, index: $index) {
      tax
      serviceFee
      featuredDishes {
        image
        headline
      }
    }
  }
`;
