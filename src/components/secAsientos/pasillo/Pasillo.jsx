import React, { useContext, useState } from "react";
import Asiento from "../asiento/Asiento";
import { PlaneContext } from "../SecAsientos";
import "./stylesPasillo.scss";

const Pasillo = ({ vocals, sec, tipo }) => {
  const { numSeats, click, ocupados, pasajeros } = useContext(PlaneContext);
  const [countsets, setCountsets] = useState(0);

  const handlePlus = () => {
    setCountsets(countsets + 1);
  };

  const handleAvaiable = (seccion, id1, id2) => {
    if (seccion === 1 && ocupados.includes(id1)) {
      return "ocupado";
    } else {
      if (seccion !== 1 && ocupados.includes(id2)) {
        return "ocupado";
      } else {
        return "disponible";
      }
    }
  };

  return (
    <section className="SecPasillo">
      <section className="SecPasillo__Header">
        {sec === 1 ? (
          <Asiento tipo="headerFilas">{sec === 1 ? vocals : ""}</Asiento>
        ) : (
          ""
        )}
      </section>
      <section className="SecPasillo__pasillo">
        {[...Array(numSeats)].map((_, index) =>
          tipo !== "pasillo" ? (
            <Asiento
              key={index}
              id={
                sec === 1
                  ? `${index}${vocals}1`
                  : `${index + numSeats + 1}${vocals}2`
              }
              tipo={handleAvaiable(
                sec,
                `${index}${vocals}1`,
                `${index + (numSeats + 1)}${vocals}2`
              )}
            />
          ) : sec === 1 ? (
            <Asiento tipo="headerFilas" key={index}>
              {index + 1}
            </Asiento>
          ) : (
            <Asiento tipo="headerFilas" key={index}>
              {index + (numSeats + 1)}
            </Asiento>
          )
        )}
      </section>
    </section>
  );
};

export default Pasillo;
