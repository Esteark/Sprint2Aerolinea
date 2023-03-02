import { DateTime } from "luxon";
import React, { useContext, useEffect } from "react";
import icon from "../../assets/img/IconRuta.jpeg";
import IconEquipaje from "../iconEquipaje/IconEquipaje";
import { VueloContext } from "../infoVuelo/InfoVuelo";
import "./stylesCard.scss";

const CardHorario = ({
  horaSalida,
  horaLLegada,
  escala,
  tipoVuelo,
  horario,
  infoVuelo,
}) => {
  const { equipaje } = useContext(VueloContext);

  return (
    <article className="SecHour">
      <section className="SecHour__time">
        <h2>{horaSalida}</h2>
        <div>
          <p>1h 57min</p>
          <img src={icon} alt="" />
          <p>{escala ? "Con escalas" : "Sin escalas"}</p>
        </div>
        <h2>{horaLLegada}</h2>
      </section>
      <section className="SecHour__icons">
        {equipaje.map((item, index) => (
          <IconEquipaje
            type={item.type}
            price={item.price}
            key={index}
            id={`${index}${tipoVuelo}${horario}`}
            tipovuelo={tipoVuelo}
            horario={horario}
            infoVuelo={infoVuelo}
          />
        ))}
      </section>
    </article>
  );
};

export default CardHorario;
