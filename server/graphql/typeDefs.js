const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    role: String!
    firstName: String!
    lastName: String!
    email: String!
    token: String!
    cuisine: [String]
    reviews: [Review]
    stripeConnected: Boolean
    isApplicationDone: Boolean
    isVerified: Boolean
    orders: Int
    foodCertificate: String
    placeId: String
    chefLoc: String
    createdAt: String!
    addresses: [Address]!
    tags: [String]
    deliveryOption: String
    deliveryFee: Int
    pickupFee: Int
    avatar: String
    dietary: [String]
    zipCode: String!
    phone: String
    isAvailable: Boolean!
    description: String
    ratings: Int
    handle: String
    deliveryDays: [String]!
    bio: String
    foodItems: [FoodItem]!
  }

  type Review {
    user: User!
    text: String
    rating: Int!
  }

  type FoodItem {
    id: ID!
    name: String!
    chef: User!
    description: String!
    orders: Int
    category: String!
    price: Float!
    image: String!
    ingredients: [String]!
    allergyWarning: String
    serving: Float
    isAvailable: Boolean!
  }

  type OrderItem {
    item: FoodItem!
    quantity: Int!
  }

  type Order {
    id: ID!
    user: User!
    fullName: String!
    emailOfBuyer: String!
    phone: String!
    items: [OrderItem!]!
    deliveryOption: String!
    chef: User!
    totalPrice: Float!
    status: String!
    deliveryDate: String!
    deliveryAddress: String!
  }

  type Address {
    id: ID!
    name: String!
    phone: String!
    streetAddress: String!
    addressLine2: String
    deliveryNotes: String
    createdAt: String!
  }

  type UserSearch {
    chefs: [User]!
    dishes: [FoodItem]!
  }

  type FeaturedDish {
    headline: String!
    image: String!
  }

  type Misc {
    id: ID!
    tax: Int!
    serviceFee: Int!
    featuredDishes: [FeaturedDish]!
  }

  type ChefSettings {
    deliveryOption: String!
    deliveryFee: Int!
    pickupFee: Int!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    handle: String!
    password: String!
    avatar: String
    confirmPassword: String!
  }

  input AddressInput {
    name: String!
    phone: String!
    streetAddress: String!
    addressLine2: String
    deliveryNotes: String
  }

  input OrderItemInput {
    quantity: Int!
    foodId: ID!
  }

  input OrderInput {
    items: [OrderItemInput!]!
    phone: String!
    deliveryDate: String!
    streetAddress: String!
    # deliveryOption: String!
    addressLine2: String!
    name: String!
    deliveryInstructions: String!
  }

  input ProfileInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input ChefApplyInput {
    firstName: String!
    lastName: String!
    email: String!
    handle: String!
    password: String!
    confirmPassword: String!
    zipCode: String!
    phone: String!
    cuisine: [String]!
  }

  input FoodItemInput {
    name: String!
    description: String!
    price: Float!
    image: String!
    category: String!
    ingredients: [String!]!
    allergyWarning: String
    serving: Float!
    isAvailable: Boolean!
  }

  input AddChefInfoInput {
    firstName: String!
    lastName: String!
    email: String!
    handle: String!
    avatar: String
    isAvailable: Boolean!
    deliveryOption: String!
    deliveryDays: [String]!
    deliveryFee: Int!
    placeId: String!
    dietary: [String]!
    cuisine: [String]!
    phone: String!
    tags: [String]!
    # address: String
    zipCode: String
    bio: String!
  }

  input UpdateFoodItemInput {
    id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    ingredients: [String!]!
    allergyWarning: String
    serving: Float!
    isAvailable: Boolean!
  }

  input AddAdminInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input ReviewInput {
    id: ID!
    text: String
    rating: Int!
  }

  input MiscInput {
    tax: Int!
    serviceFee: Int!
  }

  type Query {
    getUser: User!
    getChef: User!
    getOrders: [Order]!
    getOrdersChef: [Order]!
    getAllChefs: [User]!
    getAllMyFoodItems: [FoodItem]!
    getAllFoodItems: [FoodItem]!
    getAllMyOrdersChef: [Order]!
    getFoodItemById(id: ID!): FoodItem!
    getChefsByAreaCode(zipCode: String!): [User]!
    getFoodByChef(chefId: ID!): [FoodItem]!
    verifyStripe: Boolean!
    getChefByCuisine(cuisine: String!, zipCode: String!): [User]!
    getBySearch(option: String!, zip: Int!): UserSearch!
    getMisc: Misc!
    getFoodByHandle(handle: String!): [FoodItem]!
    getChefSettings: ChefSettings!
    advancedSearch(
      zipCode: String!
      diet: [String]
      deliveryDays: [String]
      cuisine: String
      deliveryOption: String
    ): [User]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    googleLogin(tokenId: String!): User!
    facebookLogin(userID: String!, accessToken: String!): User!
    addChefInfo(addChefInfoInput: AddChefInfoInput!): User!
    deleteChef(id: ID!): String
    addAddress(addressInput: AddressInput!): User!
    addMisc(miscInput: MiscInput!): Misc!
    addFoodItem(foodItemInput: FoodItemInput!): FoodItem!
    addMarkAsDelivering(id: ID!): Order!
    addMarkAsDelivered(id: ID!): Order!
    deleteOrder(id: ID!): String
    addReview(reviewInput: ReviewInput): String
    deleteFoodItem(id: ID!): String
    updateFoodItem(updateFoodItemInput: UpdateFoodItemInput): FoodItem!
    updateProfile(profileInput: ProfileInput!): User!
    changeAvailability(id: ID!): FoodItem!
    addProfileImage(avatar: String!): User!
    addOrder(orderInput: OrderInput!): String!
    applyForChef(chefApplyInput: ChefApplyInput!): User!
    chefApplicationComplete: String
    addAdmin(addAdminInput: AddAdminInput): String
    addFeaturedDish(image: String!, headline: String!, index: Int!): Misc!
    addConnectedAccount: String
    loginToStripe: String
    removeBankAccount: String
    verifyChef(id: ID!): User!
    changeChefSettings(
      deliveryOption: String!
      deliveryFee: Int!
      pickupFee: Int!
    ): ChefSettings!

    SubscribeToMails(email: String): Boolean!
  }
`;
