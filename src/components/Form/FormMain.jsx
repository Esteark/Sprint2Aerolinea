import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StartToastifyInstance from "toastify-js";
import "toastify-js/src/toastify.css";
import {
  cleanLocal,
  cleanLocalAsientoRegreso,
  cleanLocalAsientoSalida,
  getInfoLocal,
  goTolocal,
} from "../../services/localInfo";
import { AppContext } from "../home/Home";
import "./stylesForm.scss";

const FormMain = ({ data = {} }) => {
  const {
    positionForm,
    OpcionModal,
    changeOpCalendar,
    ChangeDataForm,
    changeOplace,
    dateOut,
    changeDateOut,
    changeOpcionTravel,
    travelOpcion,
  } = useContext(AppContext);
  const DateOut = (date) => {
    if (travelOpcion) {
      if (date.length !== 0) {
        changeDateOut(date);
      }
      ChangeDataForm({ name: "dateOut", value: dateOut });
    } else {
      ChangeDataForm({ name: "dateOut", value: "" });
    }
  };

  const validate = () => {
    if (!travelOpcion) {
      if (
        data.placeIn.length !== 0 &&
        data.placeOut.length !== 0 &&
        data.dateIn.length !== 0 &&
        data.dateOut.length !== 0 &&
        data.pasajeros.length !== 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        data.placeIn.length !== 0 &&
        data.placeOut.length !== 0 &&
        data.dateIn.length !== 0 &&
        data.pasajeros.length !== 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const navigate = useNavigate();

  const sendForm = () => {
    if (!validate()) {
      StartToastifyInstance({
        text: "Completa por favor todos los campos para poder buscar su vuelo",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #a32881, #FF2525)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } else {
      const local = getInfoLocal();
      if (Object.entries(local).length !== 0) {
        if (
          local.placeIn !== data.placeIn ||
          local.placeOut !== data.placeOut
        ) {
          cleanLocal();
        } else if (local.cantPasajeros !== data.cantPasajeros) {
          cleanLocalAsientoSalida();
          cleanLocalAsientoRegreso();
        }
      }
      goTolocal(data);
      navigate(`/vuelo/vuelos`);
    }
  };

  return (
    <>
      <section className={`formTravel ${positionForm}`}>
        <h2 className="titleForm">
          Busca un nuevo destino y <br /> comienza la aventura.
        </h2>
        <p className="subtitleForm">
          descubre vuelos al mejor precio y perfectos para cualquier viaje
        </p>
        <section className="Form__SecButtons borderInputs">
          <span
            onClick={() => {
              changeOpcionTravel(0);
              DateOut(data.dateOut);
            }}
            className={travelOpcion == 0 ? "activeSpan" : ""}
          >
            Viaje rendondo
          </span>
          <span
            onClick={() => {
              changeOpcionTravel(1);
              DateOut(data.dateOut);
            }}
            className={travelOpcion == 1 ? "activeSpan" : ""}
          >
            Viaje sencillo
          </span>
        </section>
        <section className="Form__SecInputs">
          <section className="d-flexSec">
            <div
              className="SecTravel borderInputs"
              onClick={() => {
                OpcionModal(1);
                changeOplace(0);
              }}
            >
              <input
                type="text"
                placeholder="Ciudad de México"
                name="placeIn"
                className="inputForm"
                readOnly
                defaultValue={data.placeIn ? data.placeIn : ""}
              />
              <p className="textinfo">Origen</p>
            </div>
            <div
              className="SecTravel borderInputs"
              onClick={() => {
                OpcionModal(1);
                changeOplace(1);
              }}
            >
              <input
                type="text"
                placeholder="---"
                name="placeOut"
                className="inputForm"
                readOnly
                defaultValue={data.placeOut ? data.placeOut : ""}
              />
              <p className="textinfo">Selecciona un destino</p>
            </div>
          </section>
          <section className="d-flexSec">
            <div className="SecDate borderInputs">
              <span className="material-symbols-outlined">calendar_month</span>
              <div
                className="SecDate__texts"
                onClick={() => {
                  OpcionModal(2);
                  changeOpCalendar(0);
                }}
              >
                <p className="textinfo">Salida</p>
                <input
                  type="text"
                  placeholder="Mar,4,Ene,2023"
                  className="inputForm inputformDate"
                  name="dateIn"
                  defaultValue={data.dateIn ? data.dateIn : ""}
                  readOnly
                />
              </div>
            </div>
            <div
              className={`SecDate borderInputs ${
                travelOpcion ? "hidden anchoInput" : ""
              }`}
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <div
                className="SecDate__texts"
                onClick={() => {
                  OpcionModal(2);
                  changeOpCalendar(1);
                }}
              >
                <p className="textinfo">Regreso</p>
                <input
                  type="text"
                  placeholder="Mar,4,Ene,2023"
                  className="inputForm inputformDate"
                  name="dateOut"
                  defaultValue={data.dateOut ? data.dateOut : ""}
                  readOnly
                />
              </div>
            </div>
          </section>
          <section className="d-flexSec">
            <div
              className="SecDataFlight borderInputs"
              onClick={() => {
                OpcionModal(3);
              }}
            >
              <p className="textinfo">Pasajeros</p>
              <input
                type="text"
                placeholder="1 adulto"
                className="inputForm inputFormFlight"
                name="pasajeros"
                defaultValue={data.pasajeros ? data.pasajeros : ""}
                readOnly
              />
            </div>
            <div className="SecDataFlight borderInputs">
              <p className="textinfo">¿Tienes un código de promoción?</p>
              <input
                type="text"
                placeholder="---"
                name="codprom"
                className="inputForm inputFormFlight"
                defaultValue={data.codprom ? data.codprom : ""}
                maxLength={10}
                onChange={(e) => {
                  ChangeDataForm({
                    name: "codprom",
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </section>
        </section>
        <button className="btnSendFormFlight" onClick={sendForm}>
          <span className="material-symbols-outlined">flight</span>
          Buscar vuelos
        </button>
      </section>
    </>
  );
};

export default FormMain;
