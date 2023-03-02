import React, { useContext } from "react";
import { PlaneContext } from "../SecAsientos";
import "./styles.scss";

const Asiento = ({ tipo, children, id }) => {
  const { handleClick, click, vueloOpcion } = useContext(PlaneContext);
  const handleVerification = (e) => {
    if (tipo !== "headerFilas" && tipo !== "ocupado") {
      handleClick(e, vueloOpcion);
    }
  };

  const handleSelect = (id) => {
    if (click.includes(id)) {
      return "seleccion";
    }
  };

  return (
    <figure
      id={id}
      className={`icon__Asiento ${tipo} ${handleSelect(id)}`}
      onClick={(e) => {
        handleVerification(e);
      }}
    >
      {children
        ? children
        : handleSelect(id) === "seleccion"
        ? click.indexOf(id) + 1
        : ""}
    </figure>
  );
};

export default Asiento;
