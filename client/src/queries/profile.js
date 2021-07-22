import { gql } from "@apollo/client";

export const ADD_PROFILE_IMAGE = gql`
  mutation AddProfileImage($avatar: String) {
    addProfileImage(avatar: $avatar) {
      id
      firstName
      avatar
    }
  }
`;
