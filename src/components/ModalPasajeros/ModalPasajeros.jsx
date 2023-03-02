import React, { useContext, useState } from "react";
import { AppContext } from "../home/Home";
import "./stylesModalPasajero.scss";

const ModalPasajeros = ({ data = {} }) => {
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);
  const [bb, setBb] = useState(0);

  const { ChangeDataForm, hideAnimacion, ChangeShowModal } =
    useContext(AppContext);

  const actionAdultos = (action) => {
    let cantAdultos;
    if (action === "+") {
      cantAdultos = adultos + 1;
      setAdultos(cantAdultos);
      cambioCadenaestado(data, "Adultos", cantAdultos);
    } else {
      cantAdultos = adultos - 1;
      if (cantAdultos > 0) {
        setAdultos(cantAdultos);
        cambioCadenaestado(data, "Adultos", cantAdultos);
      } else {
        setAdultos(0);
        cambioCadenaestado(data, "Adultos", 0);
      }
    }
  };
  const actionNinos = (action) => {
    let cantNinos;

    if (action === "+") {
      cantNinos = ninos + 1;
      setNinos(cantNinos);
      cambioCadenaestado(data, "Niños", cantNinos);
    } else {
      cantNinos = ninos - 1;
      if (cantNinos > 0) {
        setNinos(cantNinos);
        cambioCadenaestado(data, "Niños", cantNinos);
      } else {
        setNinos(0);
        cambioCadenaestado(data, "Niños", 0);
      }
    }
  };
  const actionBb = (action) => {
    let cantBbs;
    if (action === "+") {
      cantBbs = bb + 1;
      setBb(cantBbs);
      cambioCadenaestado(data, "Bebes", cantBbs);
    } else {
      cantBbs = bb - 1;
      if (cantBbs > 0) {
        setBb(cantBbs);
        cambioCadenaestado(data, "Bebes", cantBbs);
      } else {
        setBb(0);
        cambioCadenaestado(data, "Bebes", 0);
      }
    }
  };

  const cambioCadenaestado = (data, opcion, cant) => {
    let cadenaEstado;

    let adul = "";
    let niño = "";
    let bbs = "";
    let cantadultos = 0;
    let cantNiños = 0;
    let cantBbs = 0;
    let totalpasajeros = 0;
    if (opcion === "Adultos") {
      adul = cant !== 0 ? ` Adultos ${cant} ` : "";
      cantadultos = cant;
    } else if (adultos !== 0) {
      adul = ` Adultos ${adultos} `;
      cantadultos = adultos;
    }

    if (opcion === "Niños") {
      niño = cant !== 0 ? ` Niños ${cant} ` : "";
      cantNiños = cant;
    } else if (ninos !== 0) {
      niño = ` Niños ${ninos} `;
      cantNiños = ninos;
    }

    if (opcion === "Bebes") {
      bbs = cant !== 0 ? ` Bebes ${cant} ` : "";
      cantBbs = cant;
    } else if (bb !== 0) {
      bbs = ` Bebes ${bb} `;
      cantBbs = bb;
    }

    cadenaEstado = adul + niño + bbs;
    totalpasajeros = cantadultos + cantNiños + cantBbs;
    data.pasajeros = cadenaEstado.trim();
    ChangeDataForm({ name: "pasajeros", value: data.pasajeros });
    ChangeDataForm({ name: "cantPasajeros", value: totalpasajeros });
  };

  return (
    <article
      className={`ModalPasajeros ${
        hideAnimacion ? "scale-in-top" : "scale-out-top"
      } `}
    >
      <figure>
        <span className="material-symbols-outlined" onClick={ChangeShowModal}>
          close
        </span>
      </figure>
      <section className="dflexSec">
        <div className="SecAdultos">
          <h3 className="textTitles">Adultos</h3>
          <p className="textDescription">(13 + años)</p>
        </div>
        <div className="Secbuttons">
          <button
            onClick={() => {
              actionAdultos("-");
            }}
          >
            -
          </button>
          <p>{adultos}</p>
          <button
            onClick={() => {
              actionAdultos("+");
            }}
          >
            +
          </button>
        </div>
      </section>
      <section className="dflexSec">
        <div className="SecNiños">
          <h3 className="textTitles">Niños</h3>
          <p className="textDescription">(2 - 12 años)</p>
        </div>
        <div className="Secbuttons">
          <button
            onClick={() => {
              actionNinos("-");
            }}
          >
            -
          </button>
          <p>{ninos}</p>
          <button
            onClick={() => {
              actionNinos("+");
            }}
          >
            +
          </button>
        </div>
      </section>
      <section className="dflexSec">
        <div className="Secbb">
          <h3 className="textTitles">Bebés</h3>
          <p className="textDescription">(0 - 1 años)</p>
        </div>
        <div className="Secbuttons">
          <button
            onClick={() => {
              actionBb("-");
            }}
          >
            -
          </button>
          <p>{bb}</p>
          <button
            onClick={() => {
              actionBb("+");
            }}
          >
            +
          </button>
        </div>
      </section>
    </article>
  );
};

export default ModalPasajeros;
