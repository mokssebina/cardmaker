import React, {useEffect, useState} from 'react'

const CheckoutPage = () => {
  
    const [paddle, setPaddle] = useState();
  const [credits, setCredits] = useState(0)
  
    return (
      <div>
        <div id="lemon-squeezy-checkout"></div>
        <button onClick={openCheckout}>Checkout</button>
      </div>
    );
  };

export default CheckoutPage