import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardHorario from "../cardHorario/CardHorario";
import { VueloContext } from "../infoVuelo/InfoVuelo";
import "./stylesHorarios.scss";

const HorariosDisponibles = () => {
  const {
    currentVuelo,
    salidaVuelos,
    regresoVuelos,
    setcurrentVueloSalida,
    setcurrentVueloRegreso,
  } = useContext(VueloContext);

  const navigate = useNavigate();
  const cambioVueloInfo = () => {
    navigate(-1);
  };

  return (
    <section className="secInfoVuelos">
      <section className="SecHorarios_flex">
        <section className="SecHorario">
          <article className="SecHorario__texts">
            <h2 className="h2Text1">Vuelo de Salida</h2>
            <h2 className="h2Text2">
              {currentVuelo.dateIn ? currentVuelo.dateIn : ""}
            </h2>
            <p className="pText1">{`${currentVuelo.placeIn} a ${currentVuelo.placeOut}`}</p>
            <p className="pText2">Selección de horarios y equipajes</p>
          </article>

          <article className="SecHorario__button">
            <button onClick={cambioVueloInfo}>Cambiar vuelo</button>
          </article>
        </section>

        <section className="SecVuelosSalida">
          {salidaVuelos.map((item, index) => (
            <CardHorario
              key={index}
              horaSalida={item.hourBegin}
              horaLLegada={item.hourEnd}
              escala={item.scale}
              tipoVuelo={0}
              horario={index}
              infoVuelo={item}
            />
          ))}
        </section>
      </section>
      {currentVuelo.dateOut ? (
        <section className="SecHorarios_flex">
          <section className="SecHorario">
            <article className="SecHorario__texts">
              <h2 className="h2Text1">Vuelo de Regreso</h2>
              <h2 className="h2Text2">
                {currentVuelo.dateOut ? currentVuelo.dateOut : ""}
              </h2>
              <p className="pText1">{`${currentVuelo.placeOut} a ${currentVuelo.placeIn}`}</p>
              <p className="pText2">Selección de horarios y equipajes</p>
            </article>

            <article className="SecHorario__button">
              <button onClick={cambioVueloInfo}>Cambiar vuelo</button>
            </article>
          </section>

          <section className="SecVuelosSalida">
            {regresoVuelos.map((item, index) => (
              <CardHorario
                key={index}
                horaSalida={item.hourBegin}
                horaLLegada={item.hourEnd}
                escala={item.scale}
                tipoVuelo={1}
                horario={index}
                infoVuelo={item}
              />
            ))}
          </section>
        </section>
      ) : (
        <></>
      )}
    </section>
  );
};

export default HorariosDisponibles;
