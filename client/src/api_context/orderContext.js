import axios from 'axios';

export const create = async (orderData) => {
  try {
    
    const response = await axios.post('/order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const generateOrder = async (customerID) => {
  try {
    const response = await axios.get('/order');
    const orders = response.data;

    // Filter orders based on the customerID
    const filteredOrders = orders.filter((order) => order.customerID === customerID);

    return filteredOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
};
