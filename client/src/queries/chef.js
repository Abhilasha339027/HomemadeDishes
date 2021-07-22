import { gql } from "@apollo/client";

export const GET_CHEFS_BY_ZIP = gql`
  query($zipCode: String!) {
    getChefsByAreaCode(zipCode: $zipCode) {
      id
      firstName
      reviews {
        text
        rating
      }
      orders
      avatar
      cuisine
      zipCode
      handle
      description
      bio
      deliveryDays
      isAvailable
      foodItems {
        name
        id
        image
        price
      }
    }
  }
`;

export const GET_CHEF = gql`
  query GetChef {
    getChef {
      id
      firstName
      lastName
      placeId
      reviews {
        text
        rating
      }
      foodCertificate
      avatar
      cuisine
      zipCode
      handle
      email
      dietary
      stripeConnected
      phone
      tags
      bio
      deliveryDays
      deliveryOption
      deliveryFee
      isAvailable
      foodItems {
        name
        id
        image
        price
      }
    }
  }
`;

export const GET_CHEFS_BY_HANDLE = gql`
  query($handle: Int!) {
    getChefsByHandle(handle: $handle) {
      id
      firstName
      reviews {
        text
        rating
      }
      avatar
      cuisine
      zipCode
      description
      bio
      deliveryDays
      isAvailable
      foodItems {
        name
        id
        image
        price
      }
    }
  }
`;

export const GET_CHEFS_BY_ID = gql`
  query($id: ID!) {
    getChefsByAreaCode(id: $id) {
      id
      firstName
      avatar
      cuisine
      zipCode
      description
      deliveryDays
      handle
      bio
      isAvailable
      foodItems {
        name
        id
        image
        price
      }
    }
  }
`;

export const ADVANCED_SEARCH = gql`
  query AdvancedSearch(
    $zipCode: String!
    $deliveryDays: [String]!
    $diet: [String]!
    $cuisine: String
    $deliveryOption: String
  ) {
    advancedSearch(
      zipCode: $zipCode
      deliveryDays: $deliveryDays
      diet: $diet
      deliveryOption: $deliveryOption
      cuisine: $cuisine
    ) {
      id
      firstName
      avatar
      cuisine
      zipCode
      description
      deliveryOption
      deliveryFee
      pickupFee
      handle
      bio
      deliveryDays
      isAvailable
      foodItems {
        name
        id
        image
        price
      }
    }
  }
`;

export const SEARCH_FOR_ALL = gql`
  query($option: String!, $zip: Int!) {
    getBySearch(option: $option, zip: $zip) {
      dishes {
        id
        name
        description
        price
        chef {
          id
        }
        image
        ingredients
        serving
        allergyWarning
      }

      chefs {
        id
        firstName
        lastName
        avatar
        cuisine
        handle
        deliveryOption
        deliveryFee
        pickupFee

        zipCode
        description
        bio
        isAvailable
      }
    }
  }
`;

export const GET_CHEFS_BY_CUISINE = gql`
  query($cuisine: String!, $zipCode: String!) {
    getChefByCuisine(cuisine: $cuisine, zipCode: $zipCode) {
      firstName
      cuisine
      id
      isAvailable
      handle
      deliveryOption
      deliveryFee
      pickupFee

      zipCode
      avatar
      foodItems {
        name
        id
        image
        price
      }
    }
  }
`;

export const ADD_FOOD_ITEM = gql`
  mutation(
    $name: String!
    $description: String!
    $allergyWarning: String!
    $price: Float!
    $category: String!
    $serving: Float!
    $ingredients: [String!]!
    # $availableDay: [String!]!
    $image: String!
    $isAvailable: Boolean!
  ) {
    addFoodItem(
      foodItemInput: {
        name: $name
        description: $description
        price: $price
        # availableDay: $availableDay
        category: $category
        image: $image
        ingredients: $ingredients
        allergyWarning: $allergyWarning
        serving: $serving
        isAvailable: $isAvailable
      }
    ) {
      id
      name
      # image
      # allergyWarning
      # description
      # serving
      # ingredients
      # price
      # isAvailable
      # availableDay
    }
  }
`;

export const GET_ALL_CHEFS = gql`
  query {
    getAllChefs {
      id
      firstName
      lastName
      email
      createdAt
      avatar
      orders
      deliveryOption
      deliveryFee
      pickupFee
      isVerified
      foodItems {
        id
        name
        serving
        image
        allergyWarning
      }
    }
  }
`;

export const DELETE_CHEF = gql`
  mutation DeleteChef($id: ID!) {
    deleteChef(id: $id)
  }
`;

export const ADD_CHEF_INFO = gql`
  mutation AddChefInfo(
    $firstName: String!
    $lastName: String!
    $email: String!
    $handle: String!
    $avatar: String
    $isAvailable: Boolean!
    $placeId: String!
    $foodCertificate: String
    $dietary: [String]!
    $deliveryDays: [String]!
    $deliveryOption: String!
    $deliveryFee: Int!
    $phone: String!
    $cuisine: [String]!
    $zipCode: String!
    $bio: String!
  ) {
    addChefInfo(
      addChefInfoInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        foodCertificate: $foodCertificate
        isAvailable: $isAvailable
        handle: $handle
        avatar: $avatar
        placeId: $placeId
        dietary: $dietary
        deliveryDays: $deliveryDays
        deliveryFee: $deliveryFee
        cuisine: $cuisine
        zipCode: $zipCode
        bio: $bio
        deliveryOption: $deliveryOption
      }
    ) {
      id
      firstName
      lastName
      placeId
      reviews {
        text
        rating
      }
      avatar
      cuisine
      zipCode
      tags
      handle
      email
      dietary
      deliveryOption
      deliveryFee
      bio
      deliveryDays
      isAvailable
      foodItems {
        name
        id
        image
        price
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($id: ID!, $text: String!, $rating: Int!) {
    addReview(reviewInput: { id: $id, text: $text, rating: $rating })
  }
`;

export const GET_CHEF_SETTINGS = gql`
  query {
    getChefSettings {
      deliveryFee
      deliveryOption
      pickupFee
    }
  }
`;

export const CHANGE_CHEF_SETTINGS = gql`
  mutation ChangeChefSettings(
    $deliveryOption: String!
    $deliveryFee: Int!
    $pickupFee: Int!
  ) {
    changeChefSettings(
      deliveryOption: $deliveryOption
      deliveryFee: $deliveryFee
      pickupFee: $pickupFee
    ) {
      deliveryOption
      deliveryFee
      pickupFee
    }
  }
`;

export const VERIFY_CHEF = gql`
  mutation VerifyChef($id: ID!) {
    verifyChef(id: $id) {
      id
      firstName
      lastName
      email
      createdAt
      avatar
      orders
      deliveryOption
      deliveryFee
      isVerified
      foodItems {
        id
        name
        serving
        image
        allergyWarning
      }
    }
  }
`;

export const CHEF_APPLICATION_COMPLETE = gql`
  mutation ChefApplicationComplete {
    chefApplicationComplete
  }
`;
