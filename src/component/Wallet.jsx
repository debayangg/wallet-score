import React, { useState } from "react";
import "./Wallet.css";

const WalletInputPage = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(null);
    const [category, setCategory] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleInputChange = (event) => {
        setWalletAddress(event.target.value);
    };

    const categorizeScore = (score) => {
        if (score >= 76) {
            return { category: "Excellent", color: "green" };
        } else if (score >= 51) {
            return { category: "Good", color: "blue" };
        } else if (score >= 30) {
            return { category: "Bad", color: "orange" };
        } else {
            return { category: "Poor", color: "red" };
        }
    };

    const pollBackend = async () => {
        try {
            const response = await fetch(
                "https://monkfish-app-vu7h2.ondigitalocean.app/address/process_eth_address",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: walletAddress }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data; // Expected response format: { score: number, calculated: boolean }
        } catch (error) {
            console.error("Error while polling backend:", error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (walletAddress.trim() === "") {
            alert("Please enter a valid wallet address.");
            return;
        }

        setLoading(true);
        setScore(null);
        setCategory("");

        while (true) {
            const result = await pollBackend();
            if (result) {
                if (result.calculated) {
                    const roundedScore = parseFloat(result.score).toFixed(2);
                    const { category, color } = categorizeScore(roundedScore);
                    setScore(roundedScore);
                    setCategory({ text: category, color: color });
                    break;
                }
            } else {
                alert("Error occurred while polling the backend. Please try again.");
                break;
            }
            await delay(5000);
        }

        setLoading(false);
    };

    return (
        <div className="wallet-container">
            <h2>Wallet Address Score Checker</h2>
            <p>
                Enter your Ethereum wallet address below to get its score. Knowing the score helps you make safer and more
                informed crypto transactions.
            </p>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Enter wallet address"
                    value={walletAddress}
                    onChange={handleInputChange}
                    className="input"
                />
                <button type="submit" className="button" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
            {loading && <div className="spinner"></div>}
            {score !== null && (
                <div className="response">
                    <strong>Score:</strong> {score}
                    <p
                        style={{
                            color: category.color,
                            fontWeight: "bold",
                            marginTop: "10px",
                        }}
                    >
                        {category.text}
                    </p>
                </div>
            )}
        </div>
    );
};

export default WalletInputPage;
