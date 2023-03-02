export const goTolocal = (data) => {
  localStorage.setItem("infoVuelo", JSON.stringify(data));
};
export const goTolocalCurrentVueloSalida = (data) => {
  localStorage.setItem("currentVueloSalida", JSON.stringify(data));
};
export const goTolocalCurrentVueloRegreso = (data) => {
  localStorage.setItem("currentVueloRegreso", JSON.stringify(data));
};
export const goTolocalAsientosSalida = (data) => {
  localStorage.setItem("asientosSalida", JSON.stringify(data));
};
export const goTolocalAsientosRegreso = (data) => {
  localStorage.setItem("asientosRegreso", JSON.stringify(data));
};

export const getInfoLocal = () => {
  return JSON.parse(localStorage.getItem("infoVuelo")) || {};
};
export const getInfoLocalVueloSalida = () => {
  return JSON.parse(localStorage.getItem("currentVueloSalida")) || {};
};
export const getInfoLocalVueloRegreso = () => {
  return JSON.parse(localStorage.getItem("currentVueloRegreso")) || {};
};

export const goToLocalCurrentEquipaje = (data) => {
  localStorage.setItem("currentEquipaje", JSON.stringify(data));
};

export const getInfoLocalEquipaje = () => {
  return JSON.parse(localStorage.getItem("currentEquipaje")) || {};
};

export const goTolocalOpTravel = (op) => {
  localStorage.setItem("currentTravel", op);
};

export const getInfoLocalOpTravel = () => {
  return JSON.parse(localStorage.getItem("currentTravel")) || "0";
};

export const getInfoLocalAsientosSalida = () => {
  return JSON.parse(localStorage.getItem("asientosSalida")) || [];
};

export const getInfoLocalAsientosRegreso = () => {
  return JSON.parse(localStorage.getItem("asientosRegreso")) || [];
};

export const cleanLocal = () => {
  localStorage.clear();
};

export const cleanLocalAsientoSalida = () => {
  localStorage.removeItem("asientosSalida");
};
export const cleanLocalAsientoRegreso = () => {
  localStorage.removeItem("asientosRegreso");
};
