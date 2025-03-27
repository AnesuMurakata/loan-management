import "./LoansList.scss";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import LoanItem from "../LoanItem/LoanItem";
import { PulseLoader } from "react-spinners";
import { GET_LOANS } from "../../graphql/Queries/Loans/GetLoans";

// Define Types
interface ILoanPayment {
  id: number;
  loanId: number;
  paymentDate: string;
}

interface ILoan {
  id: number;
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  payments: ILoanPayment[];
}

interface IProcessedPayment {
  id: number;
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  paymentDate: string | null;
  status: "On Time" | "Late" | "Defaulted" | "Unpaid";
}

const LoansList = () => {
  const { loading, error, data } = useQuery(GET_LOANS);

  const processLoanData = (loans: ILoan[]): IProcessedPayment[] => {
    const processedPayments: IProcessedPayment[] = [];

    // use nested for loops instead of maps as maps will return a 2D array
    for (let i = 0; i < loans.length; i++) {
      // If no payments, return Unpaid status
      if (loans[i].payments.length === 0) {
        processedPayments.push({
          id: loans[i].id,
          name: loans[i].name,
          interestRate: loans[i].interestRate,
          principal: loans[i].principal,
          dueDate: loans[i].dueDate,
          paymentDate: null,
          status: "Unpaid",
        });
      }

      // Process each payment
      for (let y = 0; y < loans[i].payments.length; y++) {
        const dueDate = new Date(loans[i].dueDate);
        const paymentDate = new Date(loans[i].payments[y].paymentDate);

        // Calculate the difference in days
        const daysDifference = Math.floor(
          (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Determine status based on days difference
        let status: IProcessedPayment["status"];
        if (daysDifference <= 5) {
          status = "On Time";
        } else if (daysDifference > 5 && daysDifference <= 30) {
          status = "Late";
        } else {
          status = "Defaulted";
        }

        processedPayments.push({
          id: loans[i].id,
          name: loans[i].name,
          interestRate: loans[i].interestRate,
          principal: loans[i].principal,
          dueDate: loans[i].dueDate,
          paymentDate: paymentDate.toISOString().split("T")[0],
          status: status,
        });
      }
    }

    return processedPayments;
  };

  // Process loans when data changes
  const processedLoans = useMemo(() => {
    if (data?.loans) {
      return processLoanData(data.loans);
    }
    return [];
  }, [data]);

  if (loading) return <PulseLoader color='#fff' />;
  if (error) return <p>Error loading loans: {error.message}</p>;

  return (
    <div className='loans-container'>
      <h1>Existing Loans & Payments</h1>
      {processedLoans.map((loan: IProcessedPayment, index) => (
        <LoanItem
          key={index}
          name={loan.name}
          dueDate={loan.dueDate}
          principal={loan.principal}
          interestRate={loan.interestRate}
          paymentDate={loan.paymentDate}
          status={loan.status}
        />
      ))}
    </div>
  );
};

export default LoansList;
