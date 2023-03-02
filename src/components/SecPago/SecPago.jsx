import React from "react";
import { useForm } from "react-hook-form";
import "./styles.scss";
import back from "../../assets/img/chevron-left.svg";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import {
  addReservation,
  updateInfoVuelo,
} from "../../services/reservasActions";
import {
  cleanLocal,
  getInfoLocalAsientosRegreso,
  getInfoLocalAsientosSalida,
} from "../../services/localInfo";
import { getInfoVuelo } from "../../services/vuelosActions";

const SecPago = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { opVuelo } = useParams();

  const onsumbit = (data) => {
    Swal.fire({
      title: "Estas a punto de completar tu reserva",
      text: "¿Estas completamente seguro de realizar esta acción?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a32881",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, reservar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = addReservation(data);
        let responseVSalida = 0;
        let responseVRegreso = 0;
        if (response) {
          if (Number(opVuelo) === 0) {
            let currentSalidaReserva = getInfoLocalAsientosSalida();
            if (Object.entries(currentSalidaReserva).length !== 0) {
              let infoVueloSalida = await getInfoVuelo(currentSalidaReserva.id);
              console.log(infoVueloSalida[0].asientosOcupados);
              if (infoVueloSalida[0].asientosOcupados.length !== 0) {
                console.log("ENTREEE");
                currentSalidaReserva.asientosOcupados = [
                  ...infoVueloSalida[0].asientosOcupados,
                  ...currentSalidaReserva.asientosOcupados,
                ];
                console.log(currentSalidaReserva.asientosOcupados);
              }

              responseVSalida = await updateInfoVuelo(currentSalidaReserva);
            }
            let currentRegresoReserva = getInfoLocalAsientosRegreso();

            if (Object.entries(currentRegresoReserva).length !== 0) {
              let infoVueloRegreso = await getInfoVuelo(
                currentRegresoReserva.id
              );
              if (infoVueloRegreso[0].asientosOcupados.length !== 0) {
                currentRegresoReserva.asientosOcupados = [
                  ...infoVueloRegreso[0].asientosOcupados,
                  ...currentRegresoReserva.asientosOcupados,
                ];
              }
              responseVRegreso = await updateInfoVuelo(currentRegresoReserva);
              console.log(responseVSalida, responseVRegreso);
            }
            if (responseVSalida === true && responseVRegreso === true) {
              Swal.fire(
                "Completada!",
                "Su reserva a sido realizada con exíto.",
                "success"
              );
              cleanLocal();
              navigate("/");
            } else {
              Swal.fire(
                "Error!",
                "Ocurrió un Error al intentar procesar su solicitud intentelo nuevamente por favor.",
                "error"
              );
            }
          } else {
            let currentSalidaReserva = getInfoLocalAsientosSalida();
            if (Object.entries(currentSalidaReserva).length !== 0) {
              let infoVueloSalida = await getInfoVuelo(currentSalidaReserva.id);
              if (infoVueloSalida[0].asientosOcupados.length !== 0) {
                console.log("ENTREEE");
                currentSalidaReserva.asientosOcupados = [
                  ...infoVueloSalida[0].asientosOcupados,
                  ...currentSalidaReserva.asientosOcupados,
                ];
                console.log(currentSalidaReserva.asientosOcupados);
              }

              // responseVSalida = await updateInfoVuelo(currentSalidaReserva);
              responseVSalida = await updateInfoVuelo(currentSalidaReserva);
            }
            if (responseVSalida) {
              Swal.fire(
                "Completada!",
                "Su reserva a sido realizada con exíto.",
                "success"
              );
              cleanLocal();
              navigate("/");
            } else {
              Swal.fire(
                "Error!",
                "Ocurrió un Error al intentar procesar su solicitud intentelo nuevamente por favor.",
                "error"
              );
            }
          }
        }
      }
    });
  };

  const navigate = useNavigate();
  const Navegacion = () => {
    navigate("/vuelo/asientos");
  };

  return (
    <section className="SecPagoForm">
      <figure className="imgForm"></figure>

      <form onSubmit={handleSubmit(onsumbit)}>
        <label>Nombre de la persona que reserva</label>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          {...register("nameUser", { required: "No dejes este campo vacío" })}
        />
        {errors.nameUser ? (
          <span className="lblError">{errors.nameUser.message}</span>
        ) : (
          <></>
        )}
        <label>Numero de tarjeta de credito</label>
        <input
          type="number"
          placeholder="Ingrese tu tarjeta de credito"
          {...register("card", { required: "No dejes este campo vacio" })}
        />
        {errors.card ? (
          <span className="lblError">{errors.card.message}</span>
        ) : (
          <></>
        )}
        <button>Pagar</button>
        <figure onClick={Navegacion}>
          <img src={back} alt="" />
          <figcaption>
            <p>Regresar</p>
          </figcaption>
        </figure>
      </form>
    </section>
  );
};

export default SecPago;
