import React from "react";
import car from "../../assets/img/car.png";
import bed from "../../assets/img/beed.png";
import box from "../../assets/img/box.png";
import group from "../../assets/img/group.png";
import plane from "../../assets/img/hotel.png";
import "./stylesServices.scss";

const SectionServices = () => {
  return (
    <div className="services">
      <h1>Servicios disponibles</h1>
      <section className="services__container">
        <article>
          <img src={car} alt="car" />
          <h2>Transporte</h2>
          <p>Renta un auto o reserva un shuttle</p>
        </article>
        <article>
          <img src={plane} alt="car" />
          <h2>
            Vuelos + <br /> Hoteles
          </h2>
          <p>Encuentra las mejores ofertas para tu viaje</p>
        </article>
        <article>
          <img src={group} alt="car" />
          <h2>Grupos</h2>
          <p>Obten una cotización para grupos de más de 9 personas.</p>
        </article>
        <article>
          <img src={bed} alt="car" />
          <h2>Hoteles</h2>
          <p>Reserva cualquier habitación en cualquier parte del mundo.</p>
        </article>
        <article>
          <img src={box} alt="car" />
          <h2>Carga</h2>
          <p>Contamos con servicio de carga mensajería.</p>
        </article>
      </section>
    </div>
  );
};

export default SectionServices;
