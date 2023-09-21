import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../api_context/cartContext.js';
import { create } from '../api_context/orderContext.js';
import Payment from './Payment.jsx';
import { AuthContext } from '../api_context/authentication.js';

function Purchase() {
  const { cartItems, removeFromCart, clearCart } = useContext(cartContext);
  const { currentUser } = useContext(AuthContext);
  const [orderID, setOrderID] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [createOrder, setCreateOrder] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const navigate = useNavigate();

  const renderCartItems = () => {
    console.log(cartItems);
    return cartItems.map((car) => (
      <div key={car.cars_id} className="cart-item">
        <img src={car.img} alt='' />
        <div className="cart-item-info">
          <h4>{car.cars_info}</h4>
          <p>{car.price}</p>
        </div>
        <button onClick={() => removeFromCart(car)}>Remove</button>
      </div>
    ));
  };

  const handlePaymentCompleted = (paymentOption) => {
    setSelectedPaymentOption(paymentOption);
    setPaymentCompleted(true);
  };

  useEffect(() => {
    if (createOrder && selectedPaymentOption && selectedPaymentOption !== '') {
      setCreateOrder(false);
      goToPayment();
    }
  }, [createOrder, selectedPaymentOption]);
  useEffect(() => {
    if (purchaseCompleted) {
      navigate('/orders');
    }
  }, [purchaseCompleted]);

  const goToPayment = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const vehiclePrice = cartItems.reduce((total, car) => total + parseFloat(car.price.replace(/[^0-9.]/g, '')), 0);
    const customerID = currentUser ? currentUser.person_id : null;

    const orderData = {
      customerID,
      vehiclePrice,
      purchaseDate: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'short' }).split('/').reverse().join('-'),
      paymentOption: selectedPaymentOption,
    };

    const result = await create(orderData);

    if (result) {
      console.log("result.orderID=", result.orderID)
      setOrderID(result.orderID);
      setShowPayment(true);
    } else {
      alert('Error creating order.');
    }
  };

  const completePurchase = () => {
    if (!paymentCompleted) {
      alert('Please fill out the payment information before completing the purchase.');
      return;
    }
    setCreateOrder(true);
    setPurchaseCompleted(true);
  };
  const cartTotal = cartItems.reduce((total, car) => total + parseFloat(car.price.replace(/[^0-9.]/g, '')), 0);

  return (
    <div className="purchase">
      <h1 className="title">Cart</h1>

      {!cartItems || cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {renderCartItems()}
          {showPayment && (
            <Payment
              className="payment-btn"
              personID={currentUser ? currentUser.person_id : null}
              onPaymentOptionSelected={setSelectedPaymentOption}
              orderID={orderID}
              onPaymentCompleted={handlePaymentCompleted}
              cartTotal={cartTotal}
            />
          )}
          <div className="completePurchaseAndPayment">
            {showPayment ? null : <button className="goPayment-btn" onClick={goToPayment}>Continue to payment.</button>}
            {showPayment && <button className="checkout-btn" onClick={completePurchase}>Complete purchase</button>}
          </div>
        </>
      )}
    </div>
  );
}

export default Purchase;