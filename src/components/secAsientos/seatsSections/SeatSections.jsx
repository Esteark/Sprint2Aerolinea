import React, { useContext } from "react";
import Pasillo from "../pasillo/Pasillo";
import { PlaneContext } from "../SecAsientos";
import "./stylesSeatSection.scss";

const SeatSections = () => {
  const { column, section } = useContext(PlaneContext);

  const letras = ["A", "B", "C", "", "D", "E", "F"];
  return (
    <section>
      {[...Array(section)].map((_, ind) => (
        <section className="secBlock" key={ind}>
          {letras.map((letters, index) =>
            index < column ? (
              <Pasillo vocals={letters} sec={ind + 1} key={index} />
            ) : index === column ? (
              <Pasillo tipo="pasillo" sec={ind + 1} key={index} />
            ) : (
              <Pasillo vocals={letters} sec={ind + 1} key={index} />
            )
          )}
        </section>
      ))}
    </section>
  );
};

export default SeatSections;
