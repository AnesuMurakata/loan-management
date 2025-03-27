import json
from datetime import datetime
import pytest
from app import app

@pytest.fixture
def client():
    """Creates a test client for the Flask app."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_add_payment_success(client):
    """Test adding a valid payment."""
    payload = {"loan_id": 1}

    response = client.post("/payments", data=json.dumps(payload), content_type="application/json")

    assert response.status_code == 201
    data = response.get_json()
    
    assert "id" in data
    assert data["loan_id"] == 1
    assert "payment_date" in data

    # Convert the returned date into a valid py datetime object
    returned_date = datetime.strptime(data["payment_date"], "%a, %d %b %Y %H:%M:%S GMT").date()
    
    assert returned_date == datetime.today().date()

def test_add_payment_invalid(client):
    """Test adding a payment with missing loan_id."""
    payload = {}

    response = client.post("/payments", data=json.dumps(payload), content_type="application/json")

    assert response.status_code == 400
    data = response.get_json()
    
    assert data == {"error": "Invalid payment data"}
