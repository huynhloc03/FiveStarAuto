import React, { useState, useEffect } from 'react';
import { getCustomerID } from '../api_context/getInfoContext';

const Lease = ({ onPaymentCompleted, personID, orderID }) => {
  const [customerID, setCustomerID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomerID = await getCustomerID(personID);
      setCustomerID(fetchedCustomerID);
    };

    if (personID) {
      fetchData();
    } else {
      console.log("Error");
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
      annualMileLimit: e.target.annualMileLimit.value,
    };
    onPaymentCompleted('Lease', formData);
    e.target.querySelector('.submit-btn').classList.add('clicked');

  };

  return (
    <div className='lease'>
      <p>Lease:</p>
      <form onSubmit={handleSubmit}>
        <span>* Please enter your Term length: </span>
        <input required type="text" placeholder="Term length" name="termLength" />
        <br />
        <span>* Please enter your Down payment: </span>
        <input required type="text" placeholder="Down payment" name="downPayment" />
        <br />
        <span>* Please enter your Annual mileage limit: </span>
        <input required type="text" placeholder="Annual mileage limit" name="annualMileLimit" />
        <br />
        <span>* Please enter your Monthly payment: </span>
        <input required type="text" placeholder="Monthly payment" name="monthlyPayment" />
        <br />
        <button type="submit" className='submit-btn'>Submit</button>
      </form>
    </div>
  );
};

export default Lease;
