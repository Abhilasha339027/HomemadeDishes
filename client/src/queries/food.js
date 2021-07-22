import { gql } from "@apollo/client";

export const GET_FOODITEMS_BY_CHEFID = gql`
  query($chefId: ID!) {
    getFoodByChef(chefId: $chefId) {
      id
      name

      description
      price
      image

      chef {
        id
        firstName
        lastName
        reviews {
          text
          rating
        }
        avatar
        handle
        deliveryOption
        deliveryDays
        deliveryFee
        pickupFee
        bio
        placeId
        ratings
        cuisine
      }

      ingredients
      serving
      allergyWarning
    }
  }
`;

export const GET_FOODITEMS_BY_HANDLE = gql`
  query GetFoodByHandle($handle: String!) {
    getFoodByHandle(handle: $handle) {
      id
      name

      description
      price
      image

      chef {
        id
        firstName
        lastName
        handle
        reviews {
          text
          rating
        }
        avatar
        deliveryOption
        deliveryDays
        deliveryFee
        pickupFee
        bio
        placeId
        ratings
        cuisine
      }
      ingredients
      serving
      allergyWarning
    }
  }
`;

export const GET_FOOD_ITEM_BY_ID = gql`
  query GetFoodItemById($id: ID!) {
    getFoodItemById(id: $id) {
      id
      name

      description
      price
      image
      chef {
        firstName
        lastName
        avatar

        deliveryOption
        deliveryDays
        deliveryFee
        pickupFee

        bio
        ratings
        cuisine
      }
      ingredients
      serving
      allergyWarning
    }
  }
`;

export const GET_ALL_MY_FOOD_ITEMS = gql`
  query {
    getAllMyFoodItems {
      id
      name

      description
      price
      image
      orders
      isAvailable
      chef {
        firstName
        lastName
        avatar
        bio

        deliveryOption
        deliveryFee
        pickupFee

        ratings
        cuisine
      }
      ingredients
      serving
      allergyWarning
    }
  }
`;

export const DELETE_FOOD_ITEM = gql`
  mutation DeleteFoodItem($id: ID!) {
    deleteFoodItem(id: $id)
  }
`;

export const CHANGE_AVAILABILITY = gql`
  mutation ChangeAvailability($id: ID!) {
    changeAvailability(id: $id) {
      id
      name

      description
      price
      image

      deliveryOption
      deliveryFee
      pickupFee

      ingredients
      allergyWarning
      serving
      isAvailable
    }
  }
`;

export const UPDATE_FOOD_ITEM = gql`
  mutation UpdateFoodItem(
    $id: ID!
    $name: String!
    $description: String!
    $price: Float!
    $image: String!
    $ingredients: [String!]!
    $allergyWarning: String
    $serving: Float!
    $isAvailable: Boolean!
  ) {
    updateFoodItem(
      updateFoodItemInput: {
        id: $id
        name: $name
        description: $description
        price: $price
        image: $image
        ingredients: $ingredients
        allergyWarning: $allergyWarning
        serving: $serving
        isAvailable: $isAvailable
      }
    ) {
      id
      name
      image
      allergyWarning
      description
      serving
      ingredients
      price
      isAvailable
    }
  }
`;

export const GET_ALL_FOODITEMS = gql`
  query {
    getAllFoodItems {
      id
      name

      description
      price
      image
      ingredients
      allergyWarning
      serving
      isAvailable
    }
  }
`;
