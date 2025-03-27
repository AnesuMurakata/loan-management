import { useEffect, useState } from "react";

interface IInterestTerms {
  principal: number;
  rate: number;
  months: number;
}

// SECTION 4 Debugging & Code Refactoring
export const LoanCalculator = ({ principal, rate, months }: IInterestTerms) => {
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    setInterest((principal * rate * months) / (100 * 12));
  }, []);

  return (
    <div>
      <h3>Loan Interest: {interest}</h3>
    </div>
  );
};
