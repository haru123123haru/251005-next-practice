"use client"
import { useState } from "react";

export default function InteractiveCounter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>カウンター</button>
            <p>{count}</p>
        </div>
    );
}