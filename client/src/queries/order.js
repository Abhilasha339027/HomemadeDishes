const { gql } = require("@apollo/client");

export const ADD_ORDER = gql`
  mutation AddOrder(
    # $id: String!
    $phone: String!
    $items: [OrderItemInput!]!
    $deliveryDate: String!
    # $deliveryOption: String!
    $streetAddress: String!
    $deliveryInstructions: String!
    $name: String!
    $addressLine2: String!
  ) {
    addOrder(
      orderInput: {
        # id: $id
        items: $items
        phone: $phone
        # deliveryOption: $deliveryOption
        deliveryDate: $deliveryDate
        streetAddress: $streetAddress
        deliveryInstructions: $deliveryInstructions
        name: $name
        addressLine2: $addressLine2
      }
    )
  }
`;

export const GET_ORDERS = gql`
  query {
    getOrders {
      id
      fullName
      items {
        item {
          id
          name
          price
        }
        quantity
      }

      chef {
        id
        handle
        firstName
        lastName
      }

      status
      totalPrice
    }
  }
`;

export const GET_ORDERS_CHEF = gql`
  query {
    getAllMyOrdersChef {
      id
      fullName
      items {
        item {
          id
          name
          price
        }
        quantity
      }

      chef {
        id
        handle
      }
      status
      totalPrice
    }
  }
`;

export const ADD_MARK_AS_DELIVERING = gql`
  mutation AddMarkAsDelivering($id: ID!) {
    addMarkAsDelivering(id: $id) {
      id
      fullName
      items {
        id
        name
        price
      }

      chef {
        id
        handle
      }
      status
      totalPrice
    }
  }
`;

export const ADD_MARK_AS_DELIVERED = gql`
  mutation AddMarkAsDelivered($id: ID!) {
    addMarkAsDelivered(id: $id) {
      id
      fullName
      items {
        id
        name
        price
      }

      chef {
        id
        handle
      }
      status
      totalPrice
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;
