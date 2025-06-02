import React, { useState, useEffect } from 'react';

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext';

//////////////---Paddle imports---////////////////////
import { initializePaddle, Paddle } from '@paddle/paddle-js';



const PaddleCheckout = ({openCheckout, buttonText}) => {
    /*
    const { session, updateUserCredits } = useAuth()

    // Create a local state to store Paddle instance
    const [paddle, setPaddle] = useState();
    const [credits, setCredits] = useState(0)

    useEffect(() => {
        initializePaddle({
            environment: 'sandbox',
            token: "test_b36e3f7a44dee0f62115e593b43"
        }).then(
            (paddleInstance) => {
                if (paddleInstance) {
                    setPaddle(paddleInstance);
                }
            },
        );
    }, []);

    const openCheckout = (priceId, quantity) => {

        closePanel()

        console.log('product quantity: ', quantity)

        if (!paddle) return console.log("Paddle not initialized!")

        var settings = {
            displayMode: "overlay",
            theme: "light",
            locale: "en",
            frameTarget: "checkout-container",
            frameStyle: "min-width: 600px;",
            frameInitialHeight: "450"
        };

        let items = [{ priceId: priceId, quantity: quantity }]

        paddle?.Checkout.open({
            settings: settings,
            items: items,
            customer: {
                email: session?.user.email
            },
            //successCallback: updateUserCredits(quantity)
        });
    };
    */

    return (
        <button onClick={openCheckout}
            className='w-full h-full rounded-lg border-2 border-white hover:border-solid border-dashed line-clamp-1'
        >
            {buttonText}
        </button>
    )
}

export default PaddleCheckout