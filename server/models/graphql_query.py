import graphene
from data.loans import loans
from data.loan_payments import loan_payments
from models.loan_payment import LoanPayment
from models.existing_loans import ExistingLoans

class Query(graphene.ObjectType):
    loans = graphene.List(ExistingLoans)
    loan_payments = graphene.List(LoanPayment)
    loan = graphene.Field(ExistingLoans, id=graphene.Int(required=True))

    def resolve_loans(self, info):
        return loans

    def resolve_loan_payments(self, info):
        return loan_payments
        
    def resolve_loan(self, info, id):
        for loan in loans:
            if loan["id"] == id:
                return loan
        return None
