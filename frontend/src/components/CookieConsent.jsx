import React, { useState } from "react";

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(() => {
        return localStorage.getItem("cookieConsent") === null;
    });

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookieConsent", "rejected");
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-5 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
            <h3 className="text-lg font-semibold mb-1">
                🍪 We use cookies
             </h3>

                <p className="text-sm text-gray-300">
                    We use cookies to help keep you signed in and to provide 
                    essential functionality for this website.
                </p>
        </div>
        <div className="flex gap-3">
            <button onClick={handleReject}
                className="px-4 py-2 rounded-md border border-gray-400
            text-gray-200 hover:bg-gray-800"> Reject </button>
            <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-md bg-blue-500
            hover:bg-blue-600 text-white font-medium">Accept</button>
        </div>
    </div>
    </div>
    );
};

export default CookieConsent;