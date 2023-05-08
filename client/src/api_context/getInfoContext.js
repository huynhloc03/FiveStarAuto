import axios from 'axios';

export const getCustomerID = async (personID) => {
  try {
    const res = await axios.get(`/customer/${personID}`);
    return res.data.customerID;
  } catch (error) {
    console.error('Error fetching customer ID:', error);
    return null;
  }
};

export const getOrderID = async () => {
  try {
    const res = await axios.get('/order');
    return res.data.orderID;
  } catch (error) {
    console.error('Error fetching order ID:', error);
    return null;
  }
};
