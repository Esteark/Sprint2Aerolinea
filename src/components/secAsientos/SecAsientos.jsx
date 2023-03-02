import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getInfoLocalAsientosRegreso,
  getInfoLocalAsientosSalida,
  getInfoLocalVueloRegreso,
  getInfoLocalVueloSalida,
  goTolocalAsientosRegreso,
  goTolocalAsientosSalida,
} from "../../services/localInfo";
import { VueloContext } from "../infoVuelo/InfoVuelo";

import SeatSections from "./seatsSections/SeatSections";
import "./stylesAsientos.scss";

export const PlaneContext = createContext({});

const SecAsientos = ({ opcionVuelo }) => {
  const {
    currentVuelo,
    currentVueloSalida,
    currentVueloRegreso,
    setReservaVueloSalida,
    setReservaVueloRegreso,
  } = useContext(VueloContext);

  const [vueloOpcion, setVueloOpcion] = useState(opcionVuelo);
  const [numSeats, setNumSeats] = useState(0);
  const [column, setColum] = useState(0);
  const [section, setSection] = useState(0);
  const [click, setClick] = useState([]);
  const [ocupados, setOcupados] = useState(["1C1", "1D1", "1E1", "4D3", "5E2"]);
  const [pasajeros, setPasajeros] = useState(currentVuelo.cantPasajeros);

  const handleClick = ({ target }, vueloOpcion) => {
    if (click.length < pasajeros) {
      setClick([...click, target.id]);
      if (vueloOpcion === 0) {
        let arrayAsientos = [...click, target.id];
        const newReservaSalida = {
          id: currentVueloSalida.id,
          asientosOcupados: arrayAsientos,
          seatsOcupados:
            currentVueloSalida.seatsOcupados + arrayAsientos.length,
          seatsDisponibles:
            currentVueloSalida.seatsDisponibles - arrayAsientos.length,
        };
        goTolocalAsientosSalida(newReservaSalida);
        setReservaVueloSalida(newReservaSalida);
      } else {
        let arrayAsientos = [...click, target.id];
        const newReservaRegreso = {
          id: currentVueloRegreso.id,
          asientosOcupados: arrayAsientos,
          seatsOcupados:
            currentVueloRegreso.seatsOcupados + arrayAsientos.length,
          seatsDisponibles:
            currentVueloRegreso.seatsDisponibles - arrayAsientos.length,
        };
        goTolocalAsientosRegreso(newReservaRegreso);
        setReservaVueloRegreso(newReservaRegreso);
      }
    } else if (target.classList.contains("seleccion")) {
      const indice = click.indexOf(target.id);
      let arrayAsientos = click;
      arrayAsientos.splice(indice, 1, "");
      setClick([...arrayAsientos]);
      if (vueloOpcion === 0) {
        let arraySeats = arrayAsientos;
        const newReservaSalida = {
          id: currentVueloSalida.id,
          asientosOcupados: arraySeats,
          seatsOcupados: currentVueloSalida.seatsOcupados + arraySeats.length,
          seatsDisponibles:
            currentVueloSalida.seatsDisponibles - arraySeats.length,
        };
        goTolocalAsientosSalida(newReservaSalida);
        setReservaVueloSalida(newReservaSalida);
      } else {
        let arraySeats = arrayAsientos;
        const newReservaRegreso = {
          id: currentVueloRegreso.id,
          asientosOcupados: [...arrayAsientos],
          seatsOcupados: currentVueloRegreso.seatsOcupados + arraySeats.length,
          seatsDisponibles:
            currentVueloRegreso.seatsDisponibles - arraySeats.length,
        };
        goTolocalAsientosRegreso(newReservaRegreso);
        setReservaVueloRegreso(newReservaRegreso);
      }
    } else {
      let arrayModificado = click;
      let index = click.indexOf("");
      arrayModificado.splice(index, 1, target.id);
      setClick([...arrayModificado]);
      if (vueloOpcion === 0) {
        let arrayAsientos = arrayModificado;
        const newReservaSalida = {
          id: currentVueloSalida.id,
          asientosOcupados: arrayAsientos,
          seatsOcupados:
            currentVueloSalida.seatsOcupados + arrayAsientos.length,
          seatsDisponibles:
            currentVueloSalida.seatsDisponibles - arrayAsientos.length,
        };
        goTolocalAsientosSalida(newReservaSalida);
        setReservaVueloSalida(newReservaSalida);
      } else {
        let arrayAsientos = arrayModificado;
        const newReservaRegreso = {
          id: currentVueloRegreso.id,
          asientosOcupados: arrayAsientos,
          seatsOcupados:
            currentVueloRegreso.seatsOcupados + arrayAsientos.length,
          seatsDisponibles:
            currentVueloRegreso.seatsDisponibles - arrayAsientos.length,
        };
        goTolocalAsientosRegreso(newReservaRegreso);
        setReservaVueloRegreso(newReservaRegreso);
      }
    }
  };

  const renderSecAsientos = () => {
    if (opcionVuelo === 0) {
      const cVueloSalida = getInfoLocalVueloSalida();
      setNumSeats(cVueloSalida.numSeats);
      setColum(cVueloSalida.columns);
      setSection(cVueloSalida.sectionavion);
      setOcupados(cVueloSalida.asientosOcupados);
      let asientosSalida = getInfoLocalAsientosSalida();
      if (asientosSalida.length !== 0) {
        setClick([...asientosSalida.asientosOcupados]);
        setReservaVueloSalida(asientosSalida);
      }
    } else {
      const cvueloRegreso = getInfoLocalVueloRegreso();
      setNumSeats(cvueloRegreso.numSeats);
      setColum(cvueloRegreso.columns);
      setSection(cvueloRegreso.sectionavion);
      setOcupados(cvueloRegreso.asientosOcupados);
      let asientosRegreso = getInfoLocalAsientosRegreso();
      if (asientosRegreso.length !== 0) {
        setClick([...asientosRegreso.asientosOcupados]);
        setReservaVueloRegreso(asientosRegreso);
      }
    }
  };

  useEffect(() => {
    renderSecAsientos();
  }, []);

  useEffect(() => {
    console.log(click);
  }, [click]);
  const navigate = useNavigate();
  const Navegacion = () => {
    navigate("/");
  };

  return (
    <section className="SecHorarios_flex">
      <section className="SecHorario">
        <article className="SecHorario__texts">
          <h2 className="h2Text1">
            Vuelo de {opcionVuelo === 0 ? "Salida" : "Regreso"}
          </h2>
          <h2 className="h2Text2">
            {opcionVuelo === 0
              ? currentVueloSalida.date
              : currentVueloRegreso.date}
          </h2>
          <p className="pText1">
            {opcionVuelo === 0
              ? `${currentVuelo.placeIn} a ${currentVuelo.placeOut}`
              : `${currentVuelo.placeOut} a ${currentVuelo.placeIn}`}
          </p>
          <p className="pText2">
            Puedes seleccionar hasta {currentVuelo.cantPasajeros} asientos
          </p>
        </article>

        <article className="SecHorario__button">
          <button onClick={Navegacion}>Cambiar vuelo</button>
        </article>
      </section>
      <article className="SecAsientos">
        <PlaneContext.Provider
          value={{
            numSeats,
            column,
            section,
            handleClick,
            click,
            ocupados,
            pasajeros,
            vueloOpcion,
          }}
        >
          <SeatSections />
        </PlaneContext.Provider>
      </article>
    </section>
  );
};

export default SecAsientos;
