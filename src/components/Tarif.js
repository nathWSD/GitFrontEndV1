import React from "react";
import "../tarif.css";

const Tarif = () => {
  return (
    <div className="tarif-container">
      <h1>
        <b>Unsere Tarife</b>
      </h1>
      <hr />
      <ul>
        <li style={{ color: "turquoise" }}>
          <b> <strong>Basis</strong></b>
        </li>
        <p style={{ color: "turquoise" }}>
          <b>You only pay when you drive. No basic fee. Average price per hour 20{"\u20AC"}</b>
        </p>
        <hr />

        <li style={{ color: "turquoise" }}>
          <b><strong>Normal</strong></b>
        </li>
        <p style={{ color: "turquoise" }}>
          <b>for almost everyone. Average price per hour 15{"\u20AC"}</b>
        </p>
        <p style={{ color: "turquoise" }}>
          <b>optional for 60-250km per month. Whether shopping or a short trip. </b>
        </p>
        <hr />

        <li style={{ color: "turquoise" }}>
          <b><strong>exclusiv</strong></b>
        </li>
        <p style={{ color: "turquoise" }}>
          <b>For very active driving. Average price per hour 10{"\u20AC"}</b>
        </p>
        <p style={{ color: "turquoise" }}>
          <b>  </b>
        </p>
      </ul>
    </div>
  );
};

export default Tarif;
