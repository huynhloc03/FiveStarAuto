import React from 'react';
import Credit from '../pages/Credit.jsx';
import Lease from '../pages/Lease.jsx';
import Loan from '../pages/Loan.jsx';
import axios from 'axios';

export default function Payment({ onPaymentOptionSelected, onPaymentCompleted, personID, orderID, cartTotal }) {
  const [payment, setPayment] = React.useState('SelectPayment');
  const [credit, setCredit] = React.useState(false);
  const [lease, setLease] = React.useState(false);
  const [loan, setLoan] = React.useState(false);

  const handlePayment = (e) => {
    setPayment(e.target.value);
    if (onPaymentOptionSelected) {
      setTimeout(() => {
        onPaymentOptionSelected(e.target.value);
      }, 0);
    }
  };
  

  React.useEffect(() => {
    payment === 'Credit/Debit'
      ? setCredit(true)
      : setCredit(false);
    payment === 'Lease'
      ? setLease(true)
      : setLease(false);
    payment === 'Loan'
      ? setLoan(true)
      : setLoan(false);
  }, [payment]);

  const handlePaymentCompletion = async (paymentOption, formData) => {
    try {
      console.log("This is formdata:", formData)
      let apiRoute = '';

      if (paymentOption === 'Loan') {
        apiRoute = '/payment/loan';
      } else if (paymentOption === 'Lease') {
        apiRoute = '/payment/lease';
      }else if (paymentOption==='Credit/Debit'){
        apiRoute = '/payment/cashCustomer';
      }else {
        console.log('Error: Unsupported payment option');
        return;
      }

      const response = await axios.post(apiRoute, formData);

      if (response.status === 200) {
        onPaymentCompleted(payment);
        console.log('Successfully created.');
      } else {
        console.log('Error: Request failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
    
  };

  return (
    <div className="purchase">
      <label htmlFor="payment-title">Choose your payment option: </label>
      <select
        className="payment-btn"
        id="payments"
        value={payment}
        onChange={handlePayment}
      >
        <option className = "payment-options" value="SelectPayment">Please select one of the options</option>
        <option className = "payment-options" value="Credit/Debit">Credit/Debit</option>
        <option className = "payment-options" value="Lease">Lease</option>
        <option className = "payment-options" value="Loan">Loan</option>
      </select>
      {credit && <Credit onPaymentCompleted={handlePaymentCompletion} personID={personID} orderID={orderID} cartTotal={cartTotal} paymentOption={payment} />}
      {lease && <Lease onPaymentCompleted={handlePaymentCompletion} personID={personID} orderID={orderID} paymentOption={payment} />}
      {loan && <Loan onPaymentCompleted={handlePaymentCompletion} personID={personID} orderID={orderID} paymentOption={payment} />}


    </div>
  );
}
