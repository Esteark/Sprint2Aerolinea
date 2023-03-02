import React, { createContext, useEffect, useState } from "react";
import {
  getInfoLocal,
  getInfoLocalOpTravel,
  goTolocalOpTravel,
} from "../../services/localInfo";
import FormMain from "../Form/FormMain";
import ImgHeader from "../imgHeader/ImgHeader";
import ModalTravel from "../ModalTravel/ModalTravel";
import SecPagos from "../seccionPagos/SecPagos";
import SectionServices from "../Sectionservices/SectionServices";
import "./stylesHome.scss";

export const AppContext = createContext({});

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [opModal, setOpModal] = useState(0);
  const [travelOpcion, setTravelOpcion] = useState(0);
  const [hideAnimacion, setHideAnimacion] = useState(false);
  const [dateOut, setDateOut] = useState("");
  const [opTravel, setOpTravel] = useState(0);
  const [opPlace, setOpPlace] = useState(0);
  const [formData, setFormData] = useState({
    placeIn: "",
    placeOut: "",
    dateIn: "",
    dateOut: "",
    pasajeros: "",
    cantPasajeros: 0,
    codprom: "",
  });
  const [positionForm, setpositionForm] = useState("positionForm");

  const changeOpcionTravel = (op) => {
    setTravelOpcion(op);
    goTolocalOpTravel(op);
  };
  const ChangeDataForm = (target) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const ChangeShowModal = () => {
    setHideAnimacion(!hideAnimacion);
    setTimeout(
      () => {
        setShowModal(!showModal);
      },
      showModal ? 900 : 300
    );
  };
  const changeOpCalendar = (opcion) => {
    setOpTravel(opcion);
  };
  const changeOplace = (opcion) => {
    setOpPlace(opcion);
  };
  const OpcionModal = (opcion) => {
    setOpModal(opcion);
    setHideAnimacion(false);
    ChangeShowModal();
  };
  const changeDateOut = (date) => {
    setDateOut(date);
  };

  useEffect(() => {
    const infoVuelo = getInfoLocal();
    if (Object.entries(infoVuelo).length !== 0) {
      setFormData(infoVuelo);
    }
    const opcion = Number(getInfoLocalOpTravel());
    setTravelOpcion(opcion);
  }, []);

  //Use effect para corroborar información
  useEffect(() => {
    console.log(hideAnimacion);
  }, [opTravel, opPlace, formData, showModal]);

  return (
    <AppContext.Provider
      value={{
        showModal,
        opModal,
        hideAnimacion,
        opTravel,
        opPlace,
        ChangeShowModal,
        ChangeDataForm,
        formData,
        changeDateOut,
        positionForm,
        opModal,
        changeOpCalendar,
        changeOplace,
        changeOpcionTravel,
        travelOpcion,
        dateOut,
        OpcionModal,
      }}
    >
      <ModalTravel data={formData} />
      <main className="SecMainHeader">
        <section className="SecMainHeader__form">
          <FormMain data={formData} />
        </section>
        <ImgHeader classHidden={"hiddenImage"} />
      </main>
      <section className="secInformationLanding">
        <SecPagos />
        <SectionServices />
      </section>
    </AppContext.Provider>
  );
};

export default Home;
