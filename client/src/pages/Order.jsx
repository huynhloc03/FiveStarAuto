import React, { useState, useEffect, useContext } from 'react';
import { generateOrder } from '../api_context/orderContext.js';
import { AuthContext } from '../api_context/authentication.js'; // Import AuthContext

function Orders() {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (currentUser) {
      (async () => {
        try {
          const fetchedOrders = await generateOrder(currentUser.person_id);
          setOrders(fetchedOrders);
        } catch (error) {
          console.log('Error fetching orders:', error);
        }
      })();
    }
  }, [currentUser]);

  const renderOrders = () => {
    if (!orders || orders.length === 0) {
      return <p>No orders found.</p>;
    }

    return orders.map((order) => (
      <div key={order.orderID} className="order">
        <h3>Order ID: {order.orderID}</h3>
        <p>Vehicle Price: ${order.vehiclePrice.toFixed(2)}</p>
        <p>Purchase Date: {order.purchaseDate}</p>
        <p>Payment Option: {order.paymentOption}</p>
      </div>
    ));
  };

  return (
    <div className="orders">
      <h1>Orders</h1>
      {currentUser ? renderOrders() : <p>Please log in to view your orders.</p>}
    </div>
  );
}

export default Orders;
