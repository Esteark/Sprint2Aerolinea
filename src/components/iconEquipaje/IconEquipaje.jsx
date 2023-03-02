import React, { useContext, useState } from "react";
import {
  cleanLocalAsientoRegreso,
  cleanLocalAsientoSalida,
  goTolocalCurrentVueloRegreso,
  goTolocalCurrentVueloSalida,
} from "../../services/localInfo";
import { VueloContext } from "../infoVuelo/InfoVuelo";
import "./stylesIconEquipaje.scss";

const IconEquipaje = ({ type, price, id, tipovuelo, infoVuelo }) => {
  const {
    tipoEquipaje,
    ChangeEquipaje,
    setcurrentVueloSalida,
    setcurrentVueloRegreso,
    formatterPeso,
    setReservaVueloSalida,
    setReservaVueloRegreso,
  } = useContext(VueloContext);

  const clickVuelo = (vuelo, op) => {
    if (op === 1) {
      setcurrentVueloRegreso(vuelo);
      goTolocalCurrentVueloRegreso(vuelo);
      cleanLocalAsientoRegreso();
      setReservaVueloRegreso({});
    } else {
      setcurrentVueloSalida(vuelo);
      goTolocalCurrentVueloSalida(vuelo);
      cleanLocalAsientoSalida();
      setReservaVueloSalida({});
    }
  };
  return (
    <figure
      id={id}
      className={`IconEquipaje ${
        tipovuelo === 0
          ? tipoEquipaje.salida === id
            ? "active"
            : ""
          : tipoEquipaje.regreso === id
          ? "active"
          : ""
      }`}
      onClick={(e) => {
        ChangeEquipaje(tipovuelo, e);
        clickVuelo(infoVuelo, tipovuelo);
      }}
    >
      <span className="material-symbols-outlined icon">cases</span>
      <figcaption>
        <p>
          {type === 0
            ? "1 objeto personal"
            : type === 1
            ? "Equipaje de mano"
            : "Equipaje 25kg"}
        </p>
        <h4>{formatterPeso.format(price)}</h4>
      </figcaption>
    </figure>
  );
};

export default IconEquipaje;
