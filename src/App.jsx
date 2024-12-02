import './App.css';
import Wallet from './component/Wallet';

export default function App() {
    return (
        <main className="app">
            <div className="header">
                <h1>Welcome to Wallet Score Checker</h1>
                <p>
                    Our Wallet Score Checker helps you evaluate the reliability and security of Ethereum wallet addresses.
                    Use this tool to make informed decisions about transactions and partnerships.
                </p>
            </div>
            <Wallet />
            <footer className="footer">
                <p>© 2024 Wallet Score Checker | Built with care for crypto enthusiasts</p>
            </footer>
        </main>
    );
}
