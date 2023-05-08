import React, { useState, useEffect } from 'react';
import { getCustomerID } from '../api_context/getInfoContext';

const Loan = ({ onPaymentCompleted, personID, orderID }) => {
  const [customerID, setCustomerID] = useState(null);

  console.log(orderID)
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomerID = await getCustomerID(personID);
      setCustomerID(fetchedCustomerID);
    };

    if (personID) {
      fetchData();
    } else {
      console.log("Error")
    }
  }, [personID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      orderID: orderID,
      customerID: customerID,
      downPayment: e.target.downPayment.value,
      termLength: e.target.termLength.value,
      monthlyPayment: e.target.monthlyPayment.value,
      interestRate: e.target.interestRate.value,
    };
    onPaymentCompleted('Loan', formData);
    e.target.querySelector('.submit-btn').classList.add('clicked');

  };

  return (
    <div className='Loan'>
      <p>Loan:</p>
      <form onSubmit={handleSubmit}>
        <span>* Please enter your Term length: </span>
        <input required type="text" placeholder="Term length" name="termLength" />
        <br />
        <span>* Please enter your Interest rate: </span>
        <input required type="text" placeholder="Interest rate" name="interestRate" />
        <br />
        <span>* Please enter your Down payment: </span>
        <input required type="text" placeholder="Down payment" name="downPayment" />
        <br />
        <span>* Please enter your Monthly payment: </span>
        <input required type="text" placeholder="Monthly payment" name="monthlyPayment" />
        <br />
        <button type="submit" className='submit-btn'>Submit</button>
      </form>
    </div>
  );
};

export default Loan;
