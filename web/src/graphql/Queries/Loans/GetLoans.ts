import { gql } from "@apollo/client";

export const GET_LOANS = gql`
  query GetLoans {
    loans {
      id
      name
      interestRate
      principal
      dueDate
      payments {
        id
        loanId
        paymentDate
      }
    }
  }
`;

export const GET_LOAN_PAYMENTS = gql`
  query GetLoanPayments {
    loanPayments {
      id
      loanId
      paymentDate
    }
  }
`;
