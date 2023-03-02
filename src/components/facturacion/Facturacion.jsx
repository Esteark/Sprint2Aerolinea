import React, { useContext, useEffect, useState } from "react";
import "./stylesfactura.scss";
import icon from "../../assets/img/minus.svg";
import iconPaypal from "../../assets/img/paypal.png";
import { VueloContext } from "../infoVuelo/InfoVuelo";
import { useNavigate, useParams } from "react-router-dom";

const Facturacion = ({}) => {
  const {
    currentVuelo,
    currentVueloSalida,
    currentVueloRegreso,
    tipoEquipaje,
    formatterPeso,
    opcionViaje,
    reservaVueloSalida,
    reservaVueloRegreso,
  } = useContext(VueloContext);
  const { infoVuelos } = useParams();

  useEffect(() => {}, []);

  const renderButton = () => {
    if (infoVuelos === "vuelos") {
      if (opcionViaje === 0) {
        if (
          Object.entries(currentVueloSalida).length !== 0 &&
          Object.entries(currentVueloRegreso).length !== 0
        ) {
          if (
            tipoEquipaje.salida.length !== 0 &&
            tipoEquipaje.regreso.length !== 0
          ) {
            return (
              <button className="btnActionFactura" onClick={Navegacion}>
                Seleccionar asientos
              </button>
            );
          } else {
            return <></>;
          }
        } else {
          return <></>;
        }
      } else {
        if (
          Object.entries(currentVueloSalida).length !== 0 &&
          tipoEquipaje.salida.length !== 0
        ) {
          return (
            <button className="btnActionFactura" onClick={Navegacion}>
              Seleccionar asientos
            </button>
          );
        } else {
          return <></>;
        }
      }
    } else {
      if (opcionViaje === 0) {
        if (
          Object.entries(reservaVueloSalida).length !== 0 &&
          Object.entries(reservaVueloRegreso).length !== 0
        ) {
          return (
            <button className="btnActionFactura" onClick={Navegacion}>
              <img src={iconPaypal} alt="icono pagar con paypal" /> Pagar con
              Paypal
            </button>
          );
        } else {
          return <></>;
        }
      } else {
        if (Object.entries(reservaVueloSalida).length !== 0) {
          return (
            <button className="btnActionFactura" onClick={Navegacion}>
              <img src={iconPaypal} alt="icono pagar con paypal" /> Pagar con
              Paypal
            </button>
          );
        } else {
          return <></>;
        }
      }
    }
  };
  const [totalSalida, setTotalSalida] = useState(0);
  const [totalRegreso, setTotalRegreso] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [tarifaDescuento, setTarifaDescuesto] = useState(0);
  const [iva, setIva] = useState(0);
  const [totalVuelo, setTotalVuelo] = useState(0);
  const [precioasientos, setPrecioasientos] = useState(0);
  const [precioEquipaje, setPrecioEquipaje] = useState(0);
  const [ivaServicios, setIvaServicios] = useState(0);
  const [totalServicios, setTotalServicios] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);

  const renderFactura = () => {
    setIva(20000);
    setPrecioasientos(50000);
    setIvaServicios(20000);

    if (currentVuelo.codprom) {
      setDescuento(50000);
    }
    let vueloSalida =
      currentVueloSalida.price * currentVuelo.cantPasajeros +
      (currentVueloSalida.scale ? 120000 : 0);

    setTotalSalida(vueloSalida);
    let tarifades = 0;
    if (opcionViaje === 0) {
      console.log("Estoy entrando");
      let VueloRegreso =
        currentVueloRegreso.price * currentVuelo.cantPasajeros +
        (currentVueloRegreso.scale ? 120000 : 0);

      setTotalRegreso(VueloRegreso);
      tarifades = vueloSalida + VueloRegreso - descuento;
    } else {
      tarifades = vueloSalida - descuento;
    }
    setTarifaDescuesto(tarifades);
    let totalV = tarifades + iva;
    setTotalVuelo(totalV);

    let pEquipajeSalida = 0;
    let pEquipajeRegreso = 0;
    let precioTotalEquipaje;
    if (opcionViaje === 0) {
      let precioEquipajeSalida = tipoEquipaje.salida.split("");
      let opEquipaje = Number(precioEquipajeSalida[0]);
      switch (opEquipaje) {
        case 0:
          pEquipajeSalida = 60000;
          break;
        case 1:
          pEquipajeSalida = 90000;
          break;
        case 2:
          pEquipajeSalida = 120000;
      }

      let precioEquipajeRegreso = tipoEquipaje.regreso.split("");
      let opEquipajeRegreso = Number(precioEquipajeRegreso[0]);

      switch (opEquipajeRegreso) {
        case 0:
          pEquipajeRegreso = 60000;
          break;
        case 1:
          pEquipajeRegreso = 90000;
          break;
        case 2:
          pEquipajeRegreso = 120000;
      }
      precioTotalEquipaje = pEquipajeSalida + pEquipajeRegreso;

      setPrecioEquipaje(precioTotalEquipaje);
    } else {
      let precioEquipajeSalida = tipoEquipaje.salida.split("");
      let opEquipaje = Number(precioEquipajeSalida[0]);
      console.log(opEquipaje);
      switch (opEquipaje) {
        case 0:
          pEquipajeSalida = 60000;
          break;
        case 1:
          pEquipajeSalida = 90000;
          break;
        case 2:
          pEquipajeSalida = 120000;
      }

      precioTotalEquipaje = pEquipajeSalida;
      setPrecioEquipaje(precioTotalEquipaje);
    }
    let totalservicios = precioEquipaje + precioasientos + ivaServicios;
    setTotalServicios(totalservicios);
    let totalFINAL = totalVuelo + totalServicios;
    setTotalFinal(totalFINAL);
  };

  useEffect(() => {
    renderFactura();
    console.log(isNaN(totalSalida) ? "esta inde" : "no");
  }, [
    currentVueloSalida,
    currentVueloRegreso,
    tipoEquipaje,
    descuento,
    precioEquipaje,
  ]);

  const navigate = useNavigate();

  const Navegacion = () => {
    switch (infoVuelos) {
      case "vuelos":
        navigate(`/vuelo/asientos`);
        break;
      case "asientos":
        navigate(`/pago/${opcionViaje}`);
        break;
    }
  };

  return (
    <section className="SecFactura">
      <article
        className="SecFactura__reserva"
        style={
          currentVuelo.dateOut ? { minHeight: "320px" } : { minHeight: "200px" }
        }
      >
        <h3>Tu reservación</h3>
        <section className="SecFactura__reserva__padding">
          <div className="SecFactura__pasajero">
            <p>Pasajeros</p>
            <p>{currentVuelo.pasajeros}</p>
          </div>
          <h3 className="textVueloSalida">Vuelo de salida</h3>

          <div className="SecFactura__date">
            <div>
              <h2>
                {currentVuelo.placeIn
                  ? currentVuelo.placeIn.slice(0, 3).toUpperCase()
                  : "SIN"}
              </h2>
              <p>
                {Object.entries(currentVueloSalida.hourBegin).length !== 0
                  ? currentVueloSalida.hourBegin
                  : "0:00"}
              </p>
            </div>

            <figure>
              <img src={icon} alt="" />
            </figure>

            <div>
              <h2>
                {currentVuelo.placeOut
                  ? currentVuelo.placeOut.slice(0, 3).toUpperCase()
                  : "VUELO"}
              </h2>
              <p>
                {Object.entries(currentVueloSalida.hourEnd).length !== 0
                  ? currentVueloSalida.hourEnd
                  : "0:00"}
              </p>
            </div>
          </div>

          <p className="textFooterCardFactura">
            {Object.entries(currentVueloSalida.date)
              ? currentVueloSalida.date
              : "xx/xx/xxxx"}
          </p>

          {currentVuelo.dateOut ? (
            <>
              <h3 className="textVueloSalida">Vuelo de regreso</h3>

              <div className="SecFactura__date">
                <div>
                  <h2>
                    {currentVuelo.placeOut
                      ? currentVuelo.placeOut.slice(0, 3).toUpperCase()
                      : "SIN"}
                  </h2>
                  <p>
                    {Object.entries(currentVueloRegreso.hourBegin).length !== 0
                      ? currentVueloRegreso.hourBegin
                      : "0:00"}
                  </p>
                </div>

                <figure>
                  <img src={icon} alt="" />
                </figure>

                <div>
                  <h2>
                    {currentVuelo.placeIn
                      ? currentVuelo.placeIn.slice(0, 3).toUpperCase()
                      : "VUELO"}
                  </h2>
                  <p>
                    {Object.entries(currentVueloRegreso.hourEnd).length !== 0
                      ? currentVueloRegreso.hourEnd
                      : "0:00"}
                  </p>
                </div>
              </div>
              <p className="textFooterCardFactura textDate">
                {Object.entries(currentVueloRegreso.date)
                  ? currentVueloRegreso.date
                  : "xx/xx/xxxx"}
              </p>
            </>
          ) : (
            <></>
          )}
        </section>
      </article>

      <article
        className="SecFactura__Pago"
        style={
          currentVuelo.dateOut ? { minHeight: "210px" } : { minHeight: "200px" }
        }
      >
        <h3>Costo de vuelo</h3>
        <section className="SecFactura__reserva__padding cardPagosFlex">
          <div className="SecFactura__Pago__flex">
            <p>Tarifa vuelo salida</p>
            <p>{totalSalida ? formatterPeso.format(totalSalida) : `$ ${0}`}</p>
          </div>
          {currentVuelo.dateOut ? (
            <>
              <div className="SecFactura__Pago__flex">
                <p>Tarifa vuelo regreso</p>
                <p>
                  {!isNaN(totalRegreso)
                    ? formatterPeso.format(totalRegreso)
                    : `$ ${0}`}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="SecFactura__Pago__flex">
            <p>Descuento promocional</p>
            <p>
              {descuento ? formatterPeso.format(descuento) : `$ ${descuento}`}
            </p>
          </div>
          <div className="SecFactura__Pago__flex">
            <p>Tarifa total con descuento</p>
            <p>
              {tarifaDescuento
                ? formatterPeso.format(tarifaDescuento)
                : `$ ${0}`}
            </p>
          </div>
          <div className="SecFactura__Pago__flex">
            <p>Iva Tarifa</p>
            <p>{iva ? formatterPeso.format(iva) : `$ ${iva}`}</p>
          </div>
          <div className="SecFactura__Pago__flex">
            <h4>Total</h4>
            <h4>{totalVuelo ? formatterPeso.format(totalVuelo) : `$ ${0}`}</h4>
          </div>
        </section>
      </article>

      <article className="SecFactura__Pago">
        <h3>Costo por servicios </h3>
        <section className="SecFactura__reserva__padding cardPagosFlex">
          <div className="SecFactura__Pago__flex">
            <p>Selecciona tu equipaje</p>
            <p>
              {precioEquipaje
                ? formatterPeso.format(precioEquipaje)
                : `$ ${precioEquipaje}`}
            </p>
          </div>
          <div className="SecFactura__Pago__flex">
            <p>Selecciona tu asiento</p>
            <p>
              {precioasientos
                ? formatterPeso.format(precioasientos)
                : `$ ${precioasientos}`}
            </p>
          </div>

          <div className="SecFactura__Pago__flex">
            <p>Iva Servicios</p>
            <p>
              {ivaServicios
                ? formatterPeso.format(ivaServicios)
                : `$ ${ivaServicios}`}
            </p>
          </div>
          <div className="SecFactura__Pago__flex">
            <h4>Total</h4>
            <h4>
              {totalServicios
                ? formatterPeso.format(totalServicios)
                : `$ ${totalServicios}`}
            </h4>
          </div>
        </section>
      </article>
      <article className="SecFactura__Total">
        <section className="SecFactura__Total__padding ">
          <div className="SecFactura__Pago__flex">
            <h4>Costo Total</h4>
            <h4>{totalFinal ? formatterPeso.format(totalFinal) : `$ ${0}`}</h4>
          </div>
        </section>
      </article>
      {renderButton()}
    </section>
  );
};

export default Facturacion;
