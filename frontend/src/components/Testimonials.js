    import React from "react";
    import "./Testimonials.css";

    const items = [
    { name: "Amy", text: "Gorgeous bouquet and super quick delivery!" },
    { name: "Sam", text: "Exactly like the photos. Will order again." },
    { name: "Rita", text: "Beautiful arrangement for our anniversary." },
    ];

    export default function Testimonials() {
    return (
        <section className="section">
        <div className="section__head"><h2>What customers say</h2></div>
        <div className="tGrid">
            {items.map((t, i) => (
            <div key={i} className="tCard">
                <p>“{t.text}”</p>
                <span>— {t.name}</span>
            </div>
            ))}
        </div>
        </section>
    );
    }
