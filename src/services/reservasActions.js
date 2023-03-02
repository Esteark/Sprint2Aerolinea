import axios from "axios";
import endpoints from "./endpoints";

export const addReservation = async (data) => {
  const { status } = await axios.post(endpoints.reservas, data);
  return status >= 200 && status <= 299 ? true : false;
};

export const updateInfoVuelo = async (data) => {
  const { status } = await axios.patch(`${endpoints.vuelos}/${data.id}`, data);
  return status >= 200 && status <= 299 ? true : false;
};
