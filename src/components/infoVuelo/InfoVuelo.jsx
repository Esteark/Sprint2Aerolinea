import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getInfoLocal,
  getInfoLocalEquipaje,
  getInfoLocalOpTravel,
  getInfoLocalVueloRegreso,
  getInfoLocalVueloSalida,
  goToLocalCurrentEquipaje,
} from "../../services/localInfo";
import { getInfoVuelos } from "../../services/vuelosActions";
import Facturacion from "../facturacion/Facturacion";
import HorariosDisponibles from "../horariosDisponibles/HorariosDisponibles";
import SecAsientos from "../secAsientos/SecAsientos";
import "./stylesInfo.scss";
export const VueloContext = createContext({});

const InfoVuelo = () => {
  const { infoVuelos } = useParams();
  const [currentVuelo, setCurrentVuelo] = useState({});
  const [currentVueloSalida, setcurrentVueloSalida] = useState({
    id: 25,
    nameAerolinea: "LATAM Airlines",
    placeIn: "SIN",
    placeOut: "VUELO",
    hourBegin: "00:00 PM",
    hourEnd: "0:00 AM",
    sectionavion: 2,
    numSeats: 5,
    columns: 3,
    seatsDisponibles: 60,
    date: "xx/xx/xxx",
    scale: true,
  });
  const [currentVueloRegreso, setcurrentVueloRegreso] = useState({
    id: 25,
    nameAerolinea: "LATAM Airlines",
    placeIn: "SIN",
    placeOut: "VUELO",
    hourBegin: "00:00 PM",
    hourEnd: "0:00 AM",
    sectionavion: 2,
    numSeats: 5,
    columns: 3,
    seatsDisponibles: 60,
    date: "xx/xx/xxx",
    scale: true,
  });

  const [reservaVueloSalida, setReservaVueloSalida] = useState({});
  const [reservaVueloRegreso, setReservaVueloRegreso] = useState({});

  const [salidaVuelos, setSalidaVuelos] = useState([]);
  const [regresoVuelos, setRegresoVuelos] = useState([]);
  const [equipaje, setEquipaje] = useState([
    {
      type: 0,
      price: 60000,
    },
    {
      type: 1,
      price: 90000,
    },
    {
      type: 2,
      price: 120000,
    },
  ]);

  const [formatterPeso, setFormatterPeso] = useState(0);
  const [opcionViaje, setOpcionViaje] = useState(0);
  const [tipoEquipaje, setTipoequipaje] = useState({
    salida: "",
    regreso: "",
  });
  const ChangeEquipaje = (name, { target }) => {
    let idTarget = target;
    if (target.nodeName === "FIGURE") {
    } else if (target.parentNode.nodeName === "FIGURE") {
      idTarget = target.parentNode;
    } else if (target.parentNode.parentNode.nodeName === "FIGURE") {
      idTarget = target.parentNode.parentNode;
    }

    const tipoVuelo = name === 0 ? "salida" : "regreso";
    setTipoequipaje({
      ...tipoEquipaje,
      [tipoVuelo]: idTarget.id,
    });
    const newEquipaje = {
      ...tipoEquipaje,
      [tipoVuelo]: idTarget.id,
    };
    goToLocalCurrentEquipaje(newEquipaje);
  };

  useEffect(() => {
    const formato = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    setFormatterPeso(formato);
  }, []);

  const renderInicial = () => {
    const vuelo = getInfoLocal();
    const localOpcionTravel = Number(getInfoLocalOpTravel());
    setOpcionViaje(localOpcionTravel);
    setCurrentVuelo(vuelo);
    const cvueloSalida = getInfoLocalVueloSalida();
    if (cvueloSalida?.placeIn) {
      setcurrentVueloSalida(cvueloSalida);
    }

    const cvueloRegreso = getInfoLocalVueloRegreso();
    if (cvueloRegreso?.placeOut) {
      setcurrentVueloRegreso(cvueloRegreso);
    }
    const currentEquipaje = getInfoLocalEquipaje();
    if (Object.entries(currentEquipaje).length !== 0) {
      localOpcionTravel === 0
        ? setTipoequipaje(currentEquipaje)
        : setTipoequipaje({ ...currentEquipaje, regreso: "" });
    }
    getInfoVuelos().then((res) => {
      let vuelosSalida = res.filter(
        (itemVuelo) =>
          itemVuelo.placeIn === vuelo.placeIn &&
          itemVuelo.placeOut === vuelo.placeOut &&
          itemVuelo.seatsDisponibles >= vuelo.cantPasajeros
      );
      setSalidaVuelos(vuelosSalida);

      if (vuelo.dateOut) {
        let vuelosRegreso = res.filter(
          (itemVuelo) =>
            itemVuelo.placeOut === vuelo.placeIn &&
            itemVuelo.placeIn === vuelo.placeOut &&
            itemVuelo.seatsDisponibles >= vuelo.cantPasajeros
        );
        setRegresoVuelos(vuelosRegreso);
      }
    });
  };

  useEffect(() => {
    renderInicial();
  }, []);

  return (
    <VueloContext.Provider
      value={{
        currentVuelo,
        salidaVuelos,
        regresoVuelos,
        equipaje,
        tipoEquipaje,
        ChangeEquipaje,
        currentVueloSalida,
        setcurrentVueloSalida,
        currentVueloRegreso,
        setcurrentVueloRegreso,
        formatterPeso,
        opcionViaje,
        reservaVueloSalida,
        reservaVueloRegreso,
        setReservaVueloSalida,
        setReservaVueloRegreso,
      }}
    >
      <section className="SecInfoVuelo">
        {infoVuelos === "vuelos" ? (
          <section className="SecInfoVuelo__Vuelos">
            <HorariosDisponibles />
          </section>
        ) : (
          <>
            <section className="SecInfoVuelo__Vuelos">
              <SecAsientos opcionVuelo={0} />
            </section>
            {opcionViaje === 0 ? (
              <section className="SecInfoVuelo__Vuelos">
                <SecAsientos opcionVuelo={1} />
              </section>
            ) : (
              <></>
            )}
          </>
        )}
        <section className="SecInfoVuelo__facturacion">
          <Facturacion />
        </section>
      </section>
    </VueloContext.Provider>
  );
};

export default InfoVuelo;
