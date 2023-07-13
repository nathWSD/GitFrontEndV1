import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  PayPalPayment,
  BankPayment,
  CreditCardPayment,
} from "../services/AdminAccessService";
import AuthService from "../services/auth.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Abrechnung.css";

const Abrechnung = ({ updatePaymentStatus }) => {
  const [reservations, setReservations] = useState([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  /* -----------Credit card Payment----------- */
  const [cardNumber, setcardNumber] = useState("");
  const [expirationDate, setexpirationDate] = useState("");
  const [cvv, setcvv] = useState("");

  /* ---------Bank Payment------------------ */
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [bankCode, setbankCode] = useState("");
  const [accountHolderName, setaccountHolderName] = useState("");

  /* ---------Paypal Payment------------------ */
  const [paypalEmail, setpaypalEmail] = useState("");
  const [paypalPassword, setpaypalPassword] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("reservationId");
  const carId = searchParams.get("carId");
  const price = searchParams.get("price");
  const image = searchParams.get("image");
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const handlePaymentOptionClick = (option) => {
    setSelectedPaymentOption(option);
  };


  const handleCreditCardPayment = async () => {
    // Handle credit card payment logic and send data to the backend
    console.log("Credit Card Payment");
    const DataCreditCard = { cardNumber, expirationDate, cvv, id };
    try {
      const token = currentUser.token;
      const paid = await CreditCardPayment(DataCreditCard, token);
      showPaymentSuccessToast();
      setTimeout(() => {
        navigateToCurrentUserPage();
      }, 4000); // Delay the navigation by 4000 milliseconds (autoClose time of the toast)
// Handle the retrieved user data
    } catch (error) {
      showPaymentErrorToast();
      console.error("Error with Bank payment:", error);
    }
  };

  const handleBankTransferPayment = async () => {
    console.log("Bank Transfer Payment");
    const DataBankTransfer = {
      bankAccountNumber: bankAccountNumber,
      password: bankCode,
      username: accountHolderName,
      id: id,
    };
    try {
      const token = currentUser.token;
      const paid = await BankPayment(DataBankTransfer, token);
      showPaymentSuccessToast();
      setTimeout(() => {
        navigateToCurrentUserPage();
      }, 4000); 
    } catch (error) {
      showPaymentErrorToast();
      console.error("Error with Bank payment:", error);
    }
  };

  const handlePayPalPayment = async () => {
    const DataPaypal = { email: paypalEmail, 
      password: paypalPassword,
    id : id };

    console.log("PayPal Payment");
    try {
      const token = currentUser.token;
      const paid = await PayPalPayment(DataPaypal, token);
      showPaymentSuccessToast();

      setTimeout(() => {
        navigateToCurrentUserPage();
      }, 4000); 
    } catch (error) {
      showPaymentErrorToast();
      console.error("Error with paypal payment:", error);
    }
  };

  const handlePaymentSubmit = async () => {
    switch (selectedPaymentOption) {
      case "credit_card":
        try {
          await handleCreditCardPayment();
        } catch (error) {
          console.error("Error with Credit Card payment:", error);
          showPaymentErrorToast();
        }
        break;
      case "bank_transfer":
        try {
          await handleBankTransferPayment();
        } catch (error) {
          showPaymentErrorToast();
        }
        break;
      case "paypal":
        try {
          await handlePayPalPayment();
        } catch (error) {
          console.error("Error with PayPal payment:", error);
          showPaymentErrorToast();
        }
        break;
      default:
        // No payment option selected
        showPaymentErrorToast();
        console.log("No payment option selected");
        break;
    }
  };

  const showPaymentSuccessToast = () => {
    toast.success("Payment successful!", { autoClose: 4000 });
  };

  const showPaymentErrorToast = () => {
    toast.error("Payment failed. Please try again.", { autoClose: 4000 });
  };

  const navigateToCurrentUserPage = () => {
    navigate("/BoardUser");
  };


  return (
    <div className="AbrechbungContainer">
      <h1>Payment </h1>

      <div>
        <p>
          <strong>Reservation ID:</strong> {id}
        </p>
        <img className="imgAbrechnung"
        src={image} alt="Car Image" />
        <p>
          {" "}
          <strong>Car ID:</strong> {carId}
        </p>
        <p>
          {" "}
          <strong>Price:</strong> {price} {"\u20AC"}
        </p>
       
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: "1",
            border:
              selectedPaymentOption === "credit_card"
                ? "3px solid green"
                : "none",
          }}
        >
          <div>
            <img
              src="https://c8.alamy.com/comp/2B28569/white-bank-credit-card-template-or-mock-up-on-white-background-plastic-credit-card-2B28569.jpg"
              alt="Credit Card"
              className="ImagePayment"
              onClick={() => handlePaymentOptionClick("credit_card")}
            />
          </div>
          <form
            style={{
              pointerEvents:
                selectedPaymentOption === "credit_card" ? "auto" : "none",
            }}
          >
            <label>
              Card Number:
              <input
                type="text"
                className="form-control"
                name="cardNumber"
                value={cardNumber}
                onChange={(e) => setcardNumber(e.target.value)}
              />
            </label>

            <label>
              Expiration Date:
              <input
                type="text"
                className="form-control"
                name="expirationDate"
                value={expirationDate}
                onChange={(e) => setexpirationDate(e.target.value)}
              />
            </label>

            <label>
              CVV:
              <input
                type="text"
                className="form-control"
                name="cvv"
                value={cvv}
                onChange={(e) => setcvv(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div
          style={{
            flex: "1",
            border:
              selectedPaymentOption === "bank_transfer"
                ? "3px solid green"
                : "none",
          }}
        >
          <div>
            <img
              src="https://nuvei.com/wp-content/uploads/2021/06/regular-bank-transfer.png"
              alt="Bank Transfer"
              onClick={() => handlePaymentOptionClick("bank_transfer")}
            />
          </div>
          <form
            style={{
              pointerEvents:
                selectedPaymentOption === "bank_transfer" ? "auto" : "none",
            }}
          >
           
            <label>
              Bank Account Number:
              <input
                type="number"
                name="bankAccountNumber"
                className="form-control"
                value={bankAccountNumber}
                onChange={(e) => setbankAccountNumber(e.target.value)}
              />
            </label>
            <label>
              Bank Code:
              <input
                type="password"
                name="bankCode"
                className="form-control"
                value={bankCode}
                onChange={(e) => setbankCode(e.target.value)}
              />
            </label>
            <label>
              Account Holder Name:
              <input
                type="text"
                name="accountHolderName"
                className="form-control"
                value={accountHolderName}
                onChange={(e) => setaccountHolderName(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div
          style={{
            flex: "1",
            border:
              selectedPaymentOption === "paypal" ? "3px solid green" : "none",
          }}
        >
          <div>
            <img
              src="https://www.mygermanfinances.de/wp-content/uploads/2018/06/PayPal-Account.jpg"
              alt="PayPal"
              onClick={() => handlePaymentOptionClick("paypal")}
            />
          </div>
          <form
            style={{
              pointerEvents:
                selectedPaymentOption === "paypal" ? "auto" : "none",
            }}
          >
            <label>
              PayPal Email:
              <input
                type="email"
                className="form-control"
                name="paypalEmail"
                value={paypalEmail}
                onChange={(e) => setpaypalEmail(e.target.value)}
              />
            </label>
            <label>
              PayPal Password:
              <input
                type="password"
                className="form-control"
                name="paypalPassword"
                value={paypalPassword}
                onChange={(e) => setpaypalPassword(e.target.value)}
              />
            </label>
          </form>
        </div>
      </div>
      
      <button className="submitPayment" onClick={handlePaymentSubmit}>
        Submit Payment
      </button>
      <ToastContainer />
    </div>
  );
};

export default Abrechnung;
