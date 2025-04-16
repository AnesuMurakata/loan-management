import { gql } from "@apollo/client";

export const CREATE_LOAN_PAYMENT = gql`
  mutation CreateLoanPayment($loanId: Int!) {
    createLoanPayment(loanId: $loanId) {
      payment {
        loanId
      }
    }
  }
`;
