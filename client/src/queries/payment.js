import { gql } from "@apollo/client";

export const ADD_CONNECTED_ACCOUNT = gql`
  mutation {
    addConnectedAccount
  }
`;

export const LOGIN_TO_STRIPE = gql`
  mutation {
    loginToStripe
  }
`;

export const REMOVE_CONNECTED_ACCOUNT = gql`
  mutation {
    removeBankAccount
  }
`;

export const VERIFY_STRIPE = gql`
  query {
    verifyStripe
  }
`;
