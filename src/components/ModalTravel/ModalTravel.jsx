import React, { useContext } from "react";
import { AppContext } from "../home/Home";
import ModalCalendar from "../ModalCalendar/ModalCalendar";
import ModalDataList from "../ModalDataList/ModalDataList";
import ModalPasajeros from "../ModalPasajeros/ModalPasajeros";

import "./stylesModalTravel.scss";

const ModalTravel = ({ data = {} }) => {
  const { showModal, hideAnimacion, opModal } = useContext(AppContext);

  return (
    <section
      className={`SecModalTravel ${hideAnimacion ? "fade-in" : "fade-out"} ${
        !showModal ? "hidden" : ""
      }`}
    >
      {opModal === 1 ? (
        <ModalDataList />
      ) : opModal === 3 ? (
        <ModalPasajeros data={data} />
      ) : (
        <ModalCalendar />
      )}
    </section>
  );
};

export default ModalTravel;
