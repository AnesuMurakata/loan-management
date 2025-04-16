import graphene
from data.loans import loans
from models.existing_loans import ExistingLoans

class CreateLoan(graphene.Mutation):
    class Arguments:
        # Define the input arguments for the mutation
        name = graphene.String(required=True)
        principal = graphene.Float(required=True)
        interest_rate = graphene.Float(required=True)
        due_date = graphene.Date(required=True)

    # Define the output fields of the mutation
    loan = graphene.Field(ExistingLoans)

    def mutate(self, info, name, principal, interest_rate, due_date, **kwargs):
        # Implement the logic to create a new loan
        new_loan = {
            "id": len(loans) + 1,  # Example: generate a new ID
            "name": name,
            "principal": principal,
            "interest_rate": interest_rate,
            "due_date": due_date
        }
        loans.append(new_loan)  
        return CreateLoan(loan=new_loan)
