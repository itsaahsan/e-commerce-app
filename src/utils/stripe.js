import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51S9Stc2WQOTiLQDqWXpSnmabX6qI9kavrq4d9N3dXDcn0phlsLWdEVUEcRYA32YMVUfjx5QVnEhmwJYo69AApcKP00svWy9YmT')

export const processMarketplacePayment = async (cartItems, buyerId) => {
  console.log('Simulating marketplace payment process...');
  console.log('Cart Items:', cartItems);
  console.log('Buyer ID:', buyerId);

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate payment success/failure randomly
  const isPaymentSuccessful = Math.random() > 0.1; // 90% chance of success

  if (isPaymentSuccessful) {
    // Simulate splitting payments to sellers
    const sellerPayouts = {};
    cartItems.forEach(item => {
      if (!sellerPayouts[item.sellerId]) {
        sellerPayouts[item.sellerId] = 0;
      }
      sellerPayouts[item.sellerId] += item.price * item.quantity;
    });

    console.log('Payment successful!');
    console.log('Simulated Seller Payouts:', sellerPayouts);
    return { success: true, message: 'Payment processed successfully!', sellerPayouts };
  } else {
    console.log('Payment failed!');
    return { success: false, message: 'Payment failed. Please try again.' };
  }
};

export default stripePromise;