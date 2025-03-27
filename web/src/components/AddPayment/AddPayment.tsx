import axios from "axios";
import { useState } from "react";

const AddNewPayment = () => {
  const [paymentLoanId, setPaymentLoanId] = useState<number | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);

  const submitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:2024/payments",
      data: { loan_id: paymentLoanId, amount: paymentAmount },
    })
      .then(() => {
        //Handle success
        console.log("Zvaita");
      })
      .catch(() => {
        // Handle error
        console.log("Zvaramba");
      });
  };

  return (
    <div>
      <h1>Add New Payment</h1>
      <form onSubmit={submitPayment}>
        <p>
          <label>Payment Loan Id</label>
          <input
            name='loan-id'
            type='number'
            onChange={(e) => setPaymentLoanId(parseInt(e.target.value))}
          />
        </p>

        <p>
          <label>Payment Amount</label>
          <input
            name='payment-amount'
            type='number'
            onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
          />
        </p>
        <p>
          <button type='submit'>Add Payment</button>
        </p>
      </form>
    </div>
  );
};

export default AddNewPayment;
