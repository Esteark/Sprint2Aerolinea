import React, { useContext, useEffect, useState } from "react";
import DatalistInput, { useComboboxControls } from "react-datalist-input";
import { listTravel } from "../../services/InfoDataList";
import { AppContext } from "../home/Home";
import "./stylesModalList.scss";

const ModalDataList = () => {
  const list = listTravel;

  const { hideAnimacion, ChangeShowModal, ChangeDataForm, opPlace } =
    useContext(AppContext);

  const { setValue, value } = useComboboxControls({
    initialValue: "",
  });

  const selectOptionList = (item) => {
    opPlace === 0
      ? ChangeDataForm({ name: "placeIn", value: item })
      : ChangeDataForm({ name: "placeOut", value: item });
    ChangeShowModal();
  };

  return (
    <article
      className={`SecTravelList ${
        hideAnimacion ? "scale-in-top" : "scale-out-top"
      } `}
    >
      <div className="SecHeaderModalTravel">
        <h3>¿A donde viajas?</h3>
        <span className="material-symbols-outlined" onClick={ChangeShowModal}>
          close
        </span>
      </div>
      <span className="material-symbols-outlined iconSearch">search</span>
      <DatalistInput
        placeholder="Selecciona tu destino"
        value={value}
        setValue={setValue}
        onSelect={(item) => {
          selectOptionList(item.value);
          setValue("");
        }}
        items={list}
      />
    </article>
  );
};

export default ModalDataList;
