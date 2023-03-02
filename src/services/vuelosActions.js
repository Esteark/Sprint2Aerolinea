import axios from "axios";
import endpoints from "./endpoints";

export const getInfoVuelos = async () => {
  const { data } = await axios.get(endpoints.vuelos);
  return data;
};

export const getInfoVuelo = async (id) => {
  const { data } = await axios.get(`${endpoints.vuelos}?id=${id}`);
  console.log(data);
  return data;
};
