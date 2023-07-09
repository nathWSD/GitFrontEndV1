import React from "react";
import "../kontakt.css";

export const Kontakt = () => {
  return (
    <div className="kontakt-container">
      <h3 className="font-extrabold mp-4 text-3xl">Wir Sind für Sie da...</h3>
      <p>
      We are there for you every day of the week. You can reach us
        by phone between 8 a.m. and 8 p.m. on <b>+49 421 085624</b> </p>
      <p style={{ textAlign: "center" }}>
      You can also contact us by email at the following address. </p>
      <p style={{ color: "darkblue" }}>
        <b>
          <u>Email:</u> kontakt@lendmove.dev
        </b>
      </p>

      <form>
        <div>
          <label className="block" htmlFor="betreff">
          subject of the mail
          </label>
          <input
            className="border"
            type="betreff"
            name="betreff"
            id="betreff"
            placeholder="Sie Ihren Text"
          />
        </div>

        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="border"
            type="email"
            name="email"
            id="email"
            placeholder="Ihre E-Mail-Adresse"
          />
        </div>

        <div>
          <label className="block" htmlFor="nachricht">
            Message
          </label>
          <textarea
            rows={10}
            className="border resize-none"
            name="nachricht"
            id="nachricht"
            placeholder="geben Sie Ihre Mitteilung ein"
          />
        </div>

        <input
          type="submit"
          className="block bg-[purple] text-[white] py-3 px-3 hover:bg-[gray]"
        />
      </form>
    </div>
  );
};

export default Kontakt;
