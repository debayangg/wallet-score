// VisitorCount.jsx
import React, { useEffect, useState } from 'react';
import './VisitorCount.css';

export default function VisitorCount() {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Mock API call to fetch unique visitor count
        async function fetchVisitorCount() {
            const response = await fetch('https://whale-app-6i8c4.ondigitalocean.app/visit/'); // Replace with your API
            const data = await response.json();
            setVisitorCount(data.count || 0); // Assuming API returns { count: number }
        }
        fetchVisitorCount();
    }, []);

    return (
        <div className="visitor-count">
            <p>Unique Visitors: {visitorCount}</p>
        </div>
    );
}
