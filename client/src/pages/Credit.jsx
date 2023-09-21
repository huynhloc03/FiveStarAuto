import React, { useState } from 'react';
import axios from 'axios';

const Credit = ({ onPaymentCompleted, personID, orderID, cartTotal }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert('Invalid card number. Please enter a 16-digit credit card number.');
      return;
    }

    if (paymentAmount !== cartTotal) {
      alert(`Invalid payment amount. The total amount should be $${cartTotal}.`);
      return;
    }

    const paymentData = {
      customerID: personID,
      orderID: orderID,
      creditCard: cardNumber,
      paymentAmount: paymentAmount,
    };

    try {
      await axios.post('/payment/cashCustomer', paymentData);
      onPaymentCompleted('Credit/Debit', paymentData);
      
      e.target.querySelector('.submit-btn').classList.add('clicked');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(parseInt(e.target.value));
  };

  return (
    <div className='credit'>
      <form onSubmit={handleSubmit}>
        <span>* Please enter your Card number: </span>
        <input
          required
          type="text"
          maxLength="16"
          minLength="16"
          pattern="\d{16}"
          placeholder="Card number"
          name="numbCard"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        <br />
        <span>* Please enter the Payment Amount: </span>
        <input
          required
          type="number"
          placeholder="Payment amount"
          name="paymentAmount"
          value={paymentAmount}
          onChange={handlePaymentAmountChange}
        />
        <br />
        <button type="submit" className='submit-btn'>Submit</button>
      </form>
    </div>
  );
};

export default Credit;
