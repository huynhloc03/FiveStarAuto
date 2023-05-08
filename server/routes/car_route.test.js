// Import the necessary dependencies for testing
import { createOrder } from "../control/cart.js";

// Describe the createOrder function
describe("createOrder", () => {
  // Test the function
  it("should create a new order", async () => {
    // Define the required order data
    const orderData = {
      customerID: 29, // Replace this with the actual customer ID
      vehiclePrice: 20000, // Replace this with the actual vehicle price
      purchaseDate: new Date().toISOString().slice(0, 10),
      paymentOption: "Credit/Debit",
    };

    // Call the createOrder function and wait for the result
    const result = await createOrder(orderData);

    // Check that the result is an object with the expected properties
    expect(result).toEqual(
      expect.objectContaining({
        orderID: expect.any(Number),
        customerID: orderData.customerID,
        vehiclePrice: orderData.vehiclePrice,
        purchaseDate: orderData.purchaseDate,
        paymentOption: orderData.paymentOption,
      })
    );
  });
});
