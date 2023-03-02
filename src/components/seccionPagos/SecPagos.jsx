import React from "react";
import "./stylesPay.scss";

const SecPagos = () => {
  return (
    <section className="SecMainPagos">
      <h2>Pago seguro</h2>
      <section className="SecPagos">
        <article className="Sec1Pay">
          <p>Tarjeta de crédito, tarjeta débito y pago electrónico</p>
          <div className="Sec1Pay__icons">
            {[...Array(4)].map((_, index) => (
              <figure
                className={`Sec1Pay__icon${index + 1} dimensionIcon`}
                key={index}
              ></figure>
            ))}
          </div>
        </article>
        <article className="Sec2Pay">
          <p>Efectivo en cualquier de las sucursales participantes</p>
          <div className="Sec2Pay__icons">
            {[...Array(4)].map((_, index) => (
              <figure
                className={`Sec2Pay__icon${index + 1} dimensionIcon`}
                key={index}
              ></figure>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
};

export default SecPagos;
