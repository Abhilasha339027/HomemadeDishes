import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $handle: String!
    $avatar: String
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        handle: $handle
        avatar: $avatar
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
      firstName
      avatar
      lastName
      email
      handle
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      avatar
      firstName
      lastName
      email
      role
      handle
      avatar
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation($tokenId: String!) {
    googleLogin(tokenId: $tokenId) {
      id
      token
      avatar
      firstName
      lastName
      email
      role
      handle
      avatar
    }
  }
`;

export const FACEBOOK_LOGIN = gql`
  mutation($userID: String!, $accessToken: String!) {
    facebookLogin(userID: $userID, accessToken: $accessToken) {
      email
      id
      token
      avatar
      firstName
      lastName
      email
      role
      handle
      avatar
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!) {
    updateProfile(
      profileInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      id
      firstName
      lastName
      email
      handle
    }
  }
`;

export const GET_PROFILE = gql`
  query GetUser {
    getUser {
      id
      firstName
      lastName
      email
      isApplicationDone
      role
      placeId
      bio
      handle
      avatar
    }
  }
`;

export const APPLY_FOR_CHEF = gql`
  mutation ApplyForChef(
    $firstName: String!
    $lastName: String!
    $handle: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $phone: String!
    $zipCode: String!
    $cuisine: [String]!
  ) {
    applyForChef(
      chefApplyInput: {
        firstName: $firstName
        lastName: $lastName
        handle: $handle
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        phone: $phone
        zipCode: $zipCode
        cuisine: $cuisine
      }
    ) {
      id
      token
      firstName
      avatar
      lastName
      email
      handle
    }
  }
`;
