import graphene
from data.loan_payments import loan_payments
from models.loan_payment import LoanPayment

class ExistingLoans(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Int()
    due_date = graphene.Date()
    payments = graphene.List(LoanPayment)

    def resolve_payments(self, info):
        # Filter payments for this loan
        return [payment for payment in loan_payments if payment["loan_id"] == self["id"]]
