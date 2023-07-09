import React from "react";
import "../tarif.css";

const Tarif = () => {
  return (
    <div class="tarif-container">
      <h1>
        <b>Unsere Tarife</b>
      </h1>
      <hr />
      <ul>
        <li style={{ color: "turquoise" }}>
          <b>Basis</b>
        </li>
        <p style={{ color: "turquoise" }}>
          <b>You only pay when you drive. No basic fee.</b>
        </p>
        <hr />

        <li style={{ color: "turquoise" }}>
          <b>Normal</b>
        </li>
        <p style={{ color: "turquoise" }}>
          <b>for almost everyone</b>
        </p>
        <p style={{ color: "turquoise" }}>
          <b>optional for 60-250km per month. Whether shopping or a short trip</b>
        </p>
        <hr />

        <li style={{ color: "turquoise" }}>
          <b>exclusiv</b>
        </li>
        <p style={{ color: "turquoise" }}>
          <b>For very active driving</b>
        </p>
        <p style={{ color: "turquoise" }}>
          <b>  </b>
        </p>
      </ul>
    </div>
  );
};

export default Tarif;
