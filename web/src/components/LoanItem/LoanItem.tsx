import "./LoanItem.scss";
import bars from "../../assets/components/LoanItem/bar-chart.png";
import card from "../../assets/components/LoanItem/card.png";
import calendar from "../../assets/components/LoanItem/calendar.png";
import money from "../../assets/components/LoanItem/dollar-symbol.png";

// Define types
interface ILoanPayment {
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  paymentDate: string | null;
  status: string;
}

// Reusable loan item component
const LoanItem = ({
  name,
  principal,
  interestRate,
  dueDate,
  paymentDate,
  status,
}: ILoanPayment) => {
  return (
    <div className='loan-item-container'>
      <div className='loan-item-container__loan-name-row'>
        <div className='loan-item-container__loan-name-row__left-section'>
          <img
            className='loan-item-container__loan-name-row__left-section__icon'
            src={card}
            alt='credit-card'
          />
          <p className='loan-item-container__loan-name-row__left-section__name'>
            {name}
          </p>
        </div>
        <div
          className={`loan-item-container__loan-name-row__status
            loan-item-container__loan-name-row__status--${status.replace(
              /\s/g,
              ""
            )}`}
        >
          {status}
        </div>
      </div>
      <hr />
      <div className='loan-item-container__loan-details'>
        <div className='loan-item-container__loan-details__principal-rate-row'>
          <div className='loan-item-container__loan-details__principal-rate-row__principal'>
            <img
              className='loan-item-container__loan-details__detail-icon'
              src={money}
              alt='money'
            />
            <div className='loan-item-container__loan-details__principal-rate-row__principal__details'>
              <p className='loan-item-container__loan-details__heading'>
                Principal
              </p>
              <p className='loan-item-container__loan-details__normal-text'>
                R{principal.toLocaleString()}
              </p>
            </div>
          </div>
          <div className='loan-item-container__loan-details__principal-rate-row__interest'>
            <img
              className='loan-item-container__loan-details__detail-icon'
              src={bars}
              alt='bars'
            />
            <div className='loan-item-container__loan-details__principal-rate-row__interest__details'>
              <p className='loan-item-container__loan-details__heading'>
                Interest Rate
              </p>
              <p className='loan-item-container__loan-details__normal-text'>
                {interestRate}%
              </p>
            </div>
          </div>
        </div>
        <div className='loan-item-container__loan-details__dates-row'>
          <div className='loan-item-container__loan-details__dates-row__due-date'>
            <img
              className='loan-item-container__loan-details__detail-icon'
              src={calendar}
              alt='money'
            />
            <div className='loan-item-container__loan-details__dates-row__due-date__details'>
              <p className='loan-item-container__loan-details__heading'>
                Due Date
              </p>
              <p className='loan-item-container__loan-details__normal-text'>
                {dueDate}
              </p>
            </div>
          </div>
          <div className='loan-item-container__loan-details__dates-row__payment-date'>
            <img
              className='loan-item-container__loan-details__detail-icon'
              src={calendar}
              alt='bars'
            />
            <div className='loan-item-container__loan-details__dates-row__payment-date__details'>
              <p className='loan-item-container__loan-details__heading'>
                Payment Date
              </p>
              <p className='loan-item-container__loan-details__normal-text'>
                {paymentDate ? paymentDate : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanItem;
