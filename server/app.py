import datetime
from flask import Flask, request, jsonify
from flask_graphql import GraphQLView
from flask_cors import CORS
import graphene

app = Flask(__name__)
CORS(app)

loans = [
    {
        "id": 1,
        "name": "Tom's Loan",
        "interest_rate": 5.0,
        "principal": 10000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 2,
        "name": "Chris Wailaka",
        "interest_rate": 3.5,
        "principal": 500000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 3,
        "name": "NP Mobile Money",
        "interest_rate": 4.5,
        "principal": 30000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 4,
        "name": "Esther's Autoparts",
        "interest_rate": 1.5,
        "principal": 40000,
        "due_date": datetime.date(2025, 3, 1),
    },
]

loan_payments = [
    {"id": 1, "loan_id": 1, "payment_date": datetime.date(2024, 3, 4)},
    {"id": 2, "loan_id": 2, "payment_date": datetime.date(2024, 3, 15)},
    {"id": 3, "loan_id": 3, "payment_date": datetime.date(2024, 4, 5)},
]


class LoanPayment(graphene.ObjectType):
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.Date()


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


schema = graphene.Schema(query=Query)


app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)


@app.route("/")
def home():
    return "Welcome to the Loan Application API"

@app.route("/payments", methods=["POST"])
def add_payment():
    # Get the JSON data from the request
    new_payment = request.json

    # Validate the incoming payment data
    if not new_payment or 'loan_id' not in new_payment:
        return jsonify({"error": "Invalid payment data"}), 400

    # Generate following ID 
    new_id = len(loan_payments) + 1

    # Create the full payment object
    payment_to_add = {
        "id": new_id,
        "loan_id": new_payment['loan_id'],
        "payment_date": datetime.date.today()
    }

    # Add the new payment to the list
    loan_payments.append(payment_to_add)

    # Return the added payment with 201 Created status
    return jsonify(payment_to_add), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
