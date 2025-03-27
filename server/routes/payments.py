import datetime
from data.loan_payments import loan_payments
from flask import Blueprint, request, jsonify

# Define Blueprint
payments_bp = Blueprint("payments", __name__)

@payments_bp.route("/payments", methods=["POST"])
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
    