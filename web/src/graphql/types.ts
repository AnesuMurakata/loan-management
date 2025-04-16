export type Loan = {
  id: number;
  name: string;
  principal: number;
  interest_rate: number;
  due_date: string;
};

export type LoanPayment = {
  id: number;
  loan_id: number | null;
};

export type CreateLoanMutationVariables = {
  name: string;
  principal: number;
  interestRate: number;
  dueDate: string;
};

export type CreateLoanMutationResponse = {
  createLoan: {
    loan: Loan;
  };
};

export type CreateLoanPaymentMutationVariables = {
  loanId: number | null;
};

export type CreateLoanPaymentMutationResponse = {
  createLoanPayment: {
    payment: LoanPayment;
  };
};
