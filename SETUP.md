# How to run the application?

Navigate to the `server` directory by running `cd server` from this directory.

## Run the server only

Run `docker compose up --build server`

## Run tests only

Run `docker compose up --build test`

## Run both tests and the server

Run `docker compose up --build`

## Run the frontend

In another terminal, navigate to the `web` directory by running `cd web` from this directory.

Then run the below commands:

```
npm install      // only run it the first time to install dependencies
npm run dev      // start the frontend app
```

## Additional Information

I changed the `loan_payments` list to have 2025 dates as they were set to 2024 initially. This was resulting in all dates being before the due date which I assumed wasn't the desired outcome for the status codes.

## Additional Suggestions or Improvements

Given more time, the application would benefit from having:

### Feature Improvements

- An `AddLoan` endpoint in the backend as well as a corresponding frontend component in a tab.
- A database to persist data saved across different sessions.
- Modify `AddPayment` endpoint to allow for partial payments.

    - This presents an opportunity to charge an additional `X%` on any outstanding amount `X` days after the due date.
    
### Error Handling Improvements

- E2E testing with cypress.
- Check if add payment form has been filled before attempting to submit form.

### UI/UX Improvements

- New payments reflect without having to refresh the `LoanList` tab.
- Display loans as cards that have a dropdown extension feature that'll then show all payments that have been made to repay that loan. 

### Analytics Improvements

- Display totals for the 4 different payment statuses to easily see how much was collected `"On Time"`, `"Late"`, `"Defaulted"` as well as the total `"Unpaid"` amount.
- Using these totals display percentage values for each category to easily compare.

    - Percentage values should have a toggle to display percentages based off the total monetary value and number of loans to prevent a bias.
    - A possible bias could be a month where 10 payments of R1,000 were paid `"On Time"` but one payment of R10,000 was paid `"Late"` or `"Defaulted"`. From a monetary POV this would mean 50% defaulted and might pressure policy makers to review their criteria whereas the number of loans that were `"On Time"` vs `"Defaulted"` suggests the criteria is alright but maybe the max loan amount should be reviewed.
    
- Record percentage values for every month so we can plot a graph to see how they change over time. Policy makers will benefit from checking this graph regularly to make sure the line for late and defaulted doesn’t go up. 


