import React, { useContext } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { AppContext } from "../home/Home";
import "./stylesCalendar.scss";

const ModalCalendar = () => {
  const {
    ChangeDataForm,
    changeDateOut,
    hideAnimacion,
    ChangeShowModal,
    opTravel,
  } = useContext(AppContext);

  const handleSelect = (date) => {
    console.log(opTravel);
    if (opTravel === 0) {
      ChangeDataForm({
        name: "dateIn",
        value: date.toLocaleDateString("es-ES", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });
    } else {
      ChangeDataForm({
        name: "dateOut",
        value: date.toLocaleDateString("es-ES", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });
      changeDateOut(
        date.toLocaleDateString("es-ES", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    }
    ChangeShowModal();
  };

  return (
    <article
      className={`ModalCalendar ${
        hideAnimacion ? "scale-in-top" : "scale-out-top"
      }`}
    >
      <figure>
        <h3>Selecciona tus fechas</h3>
        <span className="material-symbols-outlined" onClick={ChangeShowModal}>
          close
        </span>
      </figure>
      <p>{opTravel === 0 ? "Fecha de salida" : "Fecha de regreso"}</p>
      <Calendar date={new Date()} onChange={handleSelect} />
    </article>
  );
};

export default ModalCalendar;
