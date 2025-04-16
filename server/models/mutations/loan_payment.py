import graphene, datetime
from models.loan_payment import LoanPayment
from data.loan_payments import loan_payments

class CreateLoanPayment(graphene.Mutation):
    class Arguments:
        loan_id = graphene.Int(required=True)
        # payment_amount = graphene.Float(required=True)

    payment = graphene.Field(LoanPayment)

    def mutate(self, info, loan_id,  **kwargs):
        # Implement logic to create a loan payment
        new_payment = {
            "id": len(loan_payments) + 1, #example
            "loan_id": loan_id,
            "payment_date": datetime.date.today()
            # "payment_amount": payment_amount,
        }
        
        loan_payments.append(new_payment) 
        return CreateLoanPayment(payment=new_payment)
