import axios from "axios";
import "./AddPayment.scss";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const AddNewPayment = () => {
  const [submittingData, setSubmittingData] = useState<boolean>(false);
  const [paymentLoanId, setPaymentLoanId] = useState<number | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);

  // use env var for backend url to make it easier to switch between backends eg staging & prod
  const apiEndpoint = import.meta.env.VITE_BACKEND_URL;

  const submitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Give user feedback that form is being submitted
    setSubmittingData(true);
    axios({
      method: "POST",
      url: apiEndpoint + "payments",
      data: { loan_id: paymentLoanId, amount: paymentAmount },
    })
      .then(() => {
        //Handle success
        setSubmittingData(false);
      })
      .catch(() => {
        // Handle error
        toast.error("Oh no, something went wrong :(", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        setSubmittingData(false);
      });
  };

  return (
    <div>
      <ToastContainer />
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
