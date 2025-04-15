import graphene
from models.mutations.loan_payment import CreateLoanPayment
from models.mutations.loan import CreateLoan

class Mutation(graphene.ObjectType):
    create_loan = CreateLoan.Field()
    create_loan_payment = CreateLoanPayment.Field()
    