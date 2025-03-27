import "./App.css";
import LoanItem from "./components/LoanItem/LoanItem";

interface ILoanPayment {
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  paymentDate: string | null;
  status: string;
}

const dummyData: ILoanPayment = {
  name: "John",
  interestRate: 3,
  principal: 20000,
  dueDate: "2025-03-01",
  paymentDate: "2025-03-05",
  status: "On Time",
};

const AddNewPayment = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p>
          <label>Payment Loan Id</label>
          <input name='loan-id' onChange={() => {}} />
        </p>

        <p>
          <label>Payment Amount</label>
          <input name='payment-amount' type='number' onChange={() => {}} />
        </p>
        <p>
          <button type='submit'>Add Payment</button>
        </p>
      </form>
    </div>
  );
};

function App() {
  return (
    <>
      <div>
        <h1>Existing Loans & Payments</h1>
        <ul></ul>
        <LoanItem
          name={dummyData.name}
          interestRate={dummyData.interestRate}
          principal={dummyData.principal}
          dueDate={dummyData.dueDate}
          paymentDate={dummyData.paymentDate}
          status={dummyData.status}
        />

        <h1>Add New Payment</h1>
        <AddNewPayment />
      </div>
    </>
  );
}

export default App;
