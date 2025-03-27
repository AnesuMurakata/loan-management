import AddNewPayment from "../../components/AddPayment/AddPayment";
import LoansList from "../../components/LoansList/LoansList";
import "./Landing.scss";
import { useState } from "react";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("loans");

  return (
    <div className='landing-page-container'>
      {/* Tabs Navigation */}
      <div className='landing-page-container__tabs-navigation'>
        <div
          className={`landing-page-container__tabs-navigation__tab-button ${
            activeTab === "loans"
              ? "landing-page-container__tabs-navigation__tab-button--active"
              : ""
          }`}
          onClick={() => setActiveTab("loans")}
        >
          Loan List
        </div>
        <div
          className={`landing-page-container__tabs-navigation__tab-button ${
            activeTab === "add"
              ? "landing-page-container__tabs-navigation__tab-button--active"
              : ""
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Payment
        </div>
      </div>

      {/* Tab Content */}
      <div className='landing-page-container__tabs-container'>
        {activeTab === "loans" ? <LoansList /> : <AddNewPayment />}
      </div>
    </div>
  );
};

export default LandingPage;
