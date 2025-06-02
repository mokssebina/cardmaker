import React, { useState, useEffect } from 'react';

export const LemonSqueezyCheckout = ({ productUrl, buttonText, closePanel }) => {

    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [scriptError, setScriptError] = useState(null);

    useEffect(() => {
        // Load the Lemon Squeezy script
        const loadLemonSqueezyScript = () => {
            return new Promise((resolve, reject) => {
                // Check if script is already loaded
                if (window.createLemonSqueezy) {
                    console.log("Lemon Squeezy script already loaded");
                    resolve();
                    return;
                }

                console.log("Loading Lemon Squeezy script...");
                // Create and load the script
                const script = document.createElement('script');
                script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    console.log("Lemon Squeezy script loaded successfully");
                    resolve();
                };

                script.onerror = (error) => {
                    console.error("Error loading Lemon Squeezy script:", error);
                    reject(new Error("Failed to load Lemon Squeezy script"));
                };

                document.body.appendChild(script);
            });
        };

        // Function to initialize Lemon Squeezy
        const initializeLemonSqueezy = () => {
            // Safety check to ensure createLemonSqueezy exists
            if (typeof window.createLemonSqueezy === 'function') {
                console.log("Initializing Lemon Squeezy...");
                window.createLemonSqueezy();

                // Ensure lemonsqueezy object was created
                if (window.lemonsqueezy) {
                    console.log("Lemon Squeezy initialized successfully");

                    // Remove any existing event listeners to prevent duplicates
                    window.lemonsqueezy.off('checkout:complete');

                    // Set up event listener for checkout completion
                    window.lemonsqueezy.on('checkout:complete', (data) => {
                        console.log('Checkout completed!', data);
                    });

                    setScriptLoaded(true);
                } else {
                    console.error("window.lemonsqueezy is undefined after initialization");
                    setScriptError("Failed to initialize Lemon Squeezy");
                }
            } else {
                console.error("window.createLemonSqueezy is not a function");
                setScriptError("Lemon Squeezy script loaded incorrectly");
            }
        };

        // Load and initialize with proper error handling and sequence
        const setupLemonSqueezy = async () => {
            try {
                await loadLemonSqueezyScript();
                // Add a small delay to ensure script is fully processed
                setTimeout(() => {
                    initializeLemonSqueezy();
                }, 500);
            } catch (error) {
                console.error("Failed to set up Lemon Squeezy:", error);
                setScriptError(error.message);
            }
        };

        setupLemonSqueezy();

        // Cleanup
        return () => {
            // Remove event listeners if needed
            if (window.lemonsqueezy) {
                window.lemonsqueezy.off('checkout:complete');
            }
        };
    }, []);

    return (
        // This is the key part - using a lemonsqueezy-button class on an anchor tag
        // The href should be your checkout URL from the Lemon Squeezy dashboard
        <a
            href={productUrl}
            className={`${scriptLoaded ? 'lemonsqueezy-button' : ''} w-full h-12 no-underline inline-block`}
        >
            <button onClick={closePanel}
                className='w-full h-full rounded-lg border-2 border-white hover:border-solid border-dashed line-clamp-1'
            >
                {buttonText}
            </button>
        </a>
    );

};