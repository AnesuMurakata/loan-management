import { gql } from "@apollo/client";

export const CREATE_LOAN = gql`
  mutation CreateLoan(
    $name: String!
    $principal: Float!
    $interestRate: Float!
    $dueDate: Date!
  ) {
    createLoan(
      name: $name
      principal: $principal
      interest_rate: $interestRate
      due_date: $dueDate
    ) {
      loan {
        id
        name
        principal
        interest_rate
        due_date
      }
    }
  }
`;
