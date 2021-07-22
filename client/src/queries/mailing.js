import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_MAILS = gql`
  mutation Subscribe($email: String!) {
    SubscribeToMails(email: $email)
  }
`;
