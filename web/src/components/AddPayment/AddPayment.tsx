import axios from "axios";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

const AddNewPayment = () => {
  const [submittingData, setSubmittingData] = useState<boolean>(false);
  const [paymentLoanId, setPaymentLoanId] = useState<number | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);

  const submitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Give user feedback that form is being submitted
    setSubmittingData(true);
    axios({
      method: "POST",
      url: "http://localhost:2024/payments",
      data: { loan_id: paymentLoanId, amount: paymentAmount },
    })
      .then(() => {
        //Handle success
        console.log("Zvaita");
        setSubmittingData(false);
      })
      .catch(() => {
        // Handle error
        console.log("Zvaramba");
        setSubmittingData(false);
      });
  };

  return (
    <div>
      <h1>Add New Payment</h1>
      {submittingData && <PulseLoader color='#fff' />}
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
