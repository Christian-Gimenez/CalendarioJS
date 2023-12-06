"use strict";
import * as Vista from "./vistaCalendario.js";
import * as Modelo from "./modeloCalendario.js";

/*MAIN */
// document.addEventListener("DOMContentLoaded", () => {

let fechaMostrada = mesActual();
const cabecera = [...Modelo.CABECERA_SEMANA];
iniciar();
let calendarioActual = document.getElementsByTagName("table")[0].parentElement;


//Evento Boton -1 Año
const btn1AnioMenos = document.querySelector("div div button:first-child");
btn1AnioMenos.addEventListener("click", function(){
  fechaMostrada = decrementarAnio();
  cambiarCalendario(fechaMostrada);
});

//Evento Boton -1 Mes
const btn1MesMenos = document.querySelector("div div button:nth-of-type(2)");
btn1MesMenos.addEventListener("click", function() {
  fechaMostrada = decrementarMes();
  cambiarCalendario(fechaMostrada);
});

//Evento Boton Mes Actual
const btnFechaActual = document.querySelector("div div button:nth-of-type(3)");
btnFechaActual.addEventListener("click", function() {
  const nuevaFecha = mesActual();
  if(!fechasIguales(fechaMostrada, nuevaFecha)) {
    fechaMostrada = nuevaFecha;
    cambiarCalendario(fechaMostrada);
  }
});

//Evento Boton +1 Mes
const btn1MesMas = document.querySelector("div div button:nth-last-child(2)");
btn1MesMas.addEventListener("click", function() {
  fechaMostrada = incrementarMes();
  cambiarCalendario(fechaMostrada);
})

//Evento Boton +1 Año
const btn1AnioMas = document.querySelector("div div button:last-child");
btn1AnioMas.addEventListener("click", function() {
  fechaMostrada = incrementarAnio();
  cambiarCalendario(fechaMostrada);
});


/*Funciones control de calendario */
function fechasIguales(fecha1, fecha2) {
  return (
    fecha1.getFullYear() === fecha2.getFullYear() &&
    fecha1.getMonth() === fecha2.getMonth() &&
    fecha1.getDate() === fecha2.getDate()
  );
}

function cambiarCalendario(fecha) {
  const nuevaFechaObj = Modelo.fechaAObjeto(fecha);
  let nuevaTabla;
  if(fechasIguales(fecha, new Date())) {
    nuevaTabla = Vista.crearTabla(nuevaFechaObj, cabecera, new Date());
  } else {
    nuevaTabla = Vista.crearTabla(nuevaFechaObj, cabecera);
  }
  const antiguaTabla = calendarioActual.firstChild;
  calendarioActual.insertBefore(nuevaTabla, antiguaTabla);
  calendarioActual.removeChild(antiguaTabla);
}

export function iniciar() {
  const fechaObj = Modelo.fechaAObjeto(fechaMostrada);
  if(fechasIguales(fechaMostrada, new Date())) {
    Vista.mostrarCalendario(fechaObj, cabecera, fechaMostrada);
  } else {
    Vista.mostrarCalendario(fechaObj, cabecera);
  }
  
}

export function mesActual() {
  const fecha = new Date();
  return fecha;
}

export function incrementarMes() {
  const unMesMas = new Date(fechaMostrada);
  unMesMas.setMonth(unMesMas.getMonth() + 1);
  return unMesMas;
}

export function decrementarMes() {
  const unMesMenos = new Date(fechaMostrada);
  unMesMenos.setMonth(unMesMenos.getMonth() - 1);
  return unMesMenos;
}

export function incrementarAnio() {
  const unAnioMas = new Date(fechaMostrada);
  unAnioMas.setFullYear(unAnioMas.getFullYear() + 1);
  return unAnioMas;
}

export function decrementarAnio() {
  const unAnioMenos = new Date(fechaMostrada);
  unAnioMenos.setFullYear(unAnioMenos.getFullYear() - 1);
  return unAnioMenos;
}
