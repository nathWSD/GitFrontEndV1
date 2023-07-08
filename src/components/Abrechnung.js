import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import {
  PayPalPayment,
  BankPayment,
  CreditCardPayment,
} from "../services/AdminAccessService";
import AuthService from '../services/auth.service';

const Abrechnung = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  /* -----------Credit card Payment----------- */
  const [cardNumber, setcardNumber] = useState('');
  const [expirationDate, setexpirationDate] = useState('');
  const [cvv, setcvv] = useState('');

  /* ---------Bank Payment------------------ */
  const [bankAccountNumber, setbankAccountNumber] = useState('');
  const [bankCode, setbankCode] = useState('');
  const [accountHolderName, setaccountHolderName] = useState('');


   /* ---------Paypal Payment------------------ */
   const [paypalEmail, setpaypalEmail] = useState('');
   const [paypalPassword, setpaypalPassword] = useState('');
 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reservationId = searchParams.get("reservationId");
  const carId = searchParams.get("carId");
  const price = searchParams.get("price");
  const image =  searchParams.get("image");

  const currentUser = AuthService.getCurrentUser();

  const handlePaymentOptionClick = (option) => {
    setSelectedPaymentOption(option);
  };


  const handleCreditCardPayment = async () => {
    // Handle credit card payment logic and send data to the backend
    console.log("Credit Card Payment");
    const DataCreditCard={cardNumber, expirationDate,cvv};
    try {
      const token = currentUser.token;
      const paid = await CreditCardPayment(DataCreditCard, token);
      // Handle the retrieved user data
    } catch (error) {
      console.error("Error with Bank payment:", error);
    }
  };

  const handleBankTransferPayment = async () => {
    console.log("Bank Transfer Payment");
    const DataBankTransfer={bankAccountNumber, bankCode,accountHolderName};
    try {
      const token = currentUser.token;
      const paid = await BankPayment(DataBankTransfer, token);
      // Handle the retrieved user data
    } catch (error) {
      console.error("Error with Bank payment:", error);
    }
  };

  const handlePayPalPayment = async () => {

    const DataPaypal={paypalEmail, paypalPassword};

    console.log("PayPal Payment");
    try {
      const token = currentUser.token;
      const paid = await PayPalPayment(DataPaypal, token);
      // Handle the retrieved user data
    } catch (error) {
      console.error("Error with paypal payment:", error);
    }
  };


  const handlePaymentSubmit = () => {
    switch (selectedPaymentOption) {
      case "credit_card":
        handleCreditCardPayment();
        break;
      case "bank_transfer":
        handleBankTransferPayment();
        break;
      case "paypal":
        handlePayPalPayment();
        break;
      default:
        // No payment option selected
        console.log("No payment option selected");
        break;
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>

      <div>
     
      <p>Reservation ID: {reservationId}</p>
      <img src={image} alt="Car Image" />
      <p>Car ID: {carId}</p>
      <p>Price: {price} {'\u20AC'}</p>
      {/* Other payment-related components */}
    </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: '1',
            border: selectedPaymentOption === 'credit_card' ? '2px solid green' : 'none',
          }}
        >
          <div>
            <img
              src="https://c8.alamy.com/comp/2B28569/white-bank-credit-card-template-or-mock-up-on-white-background-plastic-credit-card-2B28569.jpg"
              alt="Credit Card"
              onClick={() => handlePaymentOptionClick('credit_card')}
            />
          </div>
          <form style={{ pointerEvents: selectedPaymentOption === 'credit_card' ? 'auto' : 'none' }}>
            {/* Add your form fields and inputs for credit card payment */}
            {/* For example: */}
            <label>
              Card Number:
              <input type="text" 
              name="cardNumber" 
              value ={cardNumber}
              onChange={(e)=>setcardNumber(e.target.value)}
              />
            </label>

            <label>
              Expiration Date:
              <input type="text" 
              name="expirationDate" 
              value={expirationDate}
              onChange={(e)=>setexpirationDate(e.target.value)}
              />
            </label>

            <label>
              CVV:
              <input type="text" 
              name="cvv" 
              value={cvv}
              onChange={(e)=>setcvv(e.target.value)}
              />
            </label>

          </form>
        </div>
        <div
          style={{
            flex: '1',
            border: selectedPaymentOption === 'bank_transfer' ? '2px solid green' : 'none',
          }}
        >
          <div>
            <img
              src="https://nuvei.com/wp-content/uploads/2021/06/regular-bank-transfer.png"
              alt="Bank Transfer"
              onClick={() => handlePaymentOptionClick('bank_transfer')}
            />
          </div>
          <form style={{ pointerEvents: selectedPaymentOption === 'bank_transfer' ? 'auto' : 'none' }}>
            {/* Add your form fields and inputs for bank transfer payment */}
            {/* For example: */}
            <label>
              Bank Account Number:
              <input type="text" 
              name="bankAccountNumber"
              value={bankAccountNumber}
              onChange={(e)=> setbankAccountNumber(e.target.value)}
              />
            </label>
            <label>
              Bank Code:
              <input type="text" 
              name="bankCode" 
              value={bankCode}
              onChange={(e)=> setbankCode(e.target.value)}
              
              />
            </label>
            <label>
              Account Holder Name:
              <input type="text" 
              name="accountHolderName" 
              value={accountHolderName}
              onChange={(e)=> setaccountHolderName(e.target.value)}    
              />
            </label>
          </form>
        </div>
        <div
          style={{
            flex: '1',
            border: selectedPaymentOption === 'paypal' ? '2px solid green' : 'none',
          }}
        >
          <div>
            <img
              src="https://www.mygermanfinances.de/wp-content/uploads/2018/06/PayPal-Account.jpg"
              alt="PayPal"
              onClick={() => handlePaymentOptionClick('paypal')}
            />
          </div>
          <form style={{ pointerEvents: selectedPaymentOption === 'paypal' ? 'auto' : 'none' }}>
            {/* Add your form fields and inputs for PayPal payment */}
            {/* For example: */}
            <label>
              PayPal Email:
              <input type="email" 
              name="paypalEmail" 
              value={paypalEmail}
              onChange={(e)=> setpaypalEmail(e.target.value)}    
              
              />
            </label>
            <label>
              PayPal Password:
              <input type="password" 
              name="paypalPassword" 
              value={paypalPassword}
              onChange={(e)=> setpaypalPassword(e.target.value)}    
              
              />
            </label>
          </form>
        </div>
      </div>
      <button onClick={handlePaymentSubmit}>Submit Payment</button>
    </div>
  );
};

export default Abrechnung;
