"use strict";
export const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo",
  "Junio", "Julio", "Agosto", "Septiembre",
  "Octubre", "Noviembre", "Diciembre"];
export const CABECERA_SEMANA = ["Sem", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];


export function fechaAObjeto(fecha) {
  const anioActual = fecha.getFullYear();
  const mesActual = MESES[fecha.getMonth()];
  const diasActuales = matrizDiasDelMes(fecha);
  return {
    anio: anioActual,
    mes: mesActual,
    dias: diasActuales,
    fecha_date: fecha
  }
}

/* const calendario = {
//   mes: "",
//   anio: 2000,
//   dias: [ 5 filas x 8 cols
            [{Sem: 44}, {Lun: x}, {Mar: x}, {Mie: 1}, {Jue: 2}, {Vie: 3}, {Sab: 4}, {Dom: 5}],
            [{Sem: 45}, {Lun: 6}, {Mar: 7}, {Mie: 8}, {Jue: 9}, {Vie: 10}, {Sab: 11}, {Dom: 12}],
            [{Sem: 46}, {Lun: 13}, {Mar: 14}, {Mie: 15}, {Jue: 16}, {Vie: 17}, {Sab: 18}, {Dom: 19}],
            [{Sem: -47}, {Lun: 20}, {Mar: 21}, {Mie: 22}, {Jue: 23}, {Vie: 24}, {Sab: 25}, {Dom: 26}],
            [{Sem: -48}, {Lun: 27}, {Mar: 28}, {Mie: 29}, {Jue: 30}, {Vie: x}, {Sab: x}, {Dom: x}]
                      ]
 };*/
export function matrizDiasDelMes(fecha) {
  //Clonamos la fecha
  const clonFecha = new Date(fecha);

  //Establecemos el dia a 1 para que empiece desde 0
  clonFecha.setDate(1);

  //Averiguamos en que día empieza la semana (Lun, Mar, Mie, Jue, Vie, Sab o Dom)
  const primerDiaDelMes = getDiaSemana(clonFecha.getDay());

  //Obtenemos un array 1D con los dias del mes: [ {Mie: 1}, {Jue: 2}, {Vie: 3}, etc ]
  const arrDias = arrayDiasDelMes();

  //Obtenemos la matriz 2D final por defecto (5 filas x 8 cols):
  const matrizDiasPorDefecto = inicializarMatriz();

  const matrizDiasResultado = meterDatosMatriz([...arrDias]);

  return matrizDiasResultado;

  function meterDatosMatriz(clonArrDias) {
    let indiceInicial = empezarLaMatrizEn();
    if(indiceInicial != 7) matrizDiasPorDefecto.pop();
    let fechaSemana = new Date(fecha);
    fechaSemana.setDate(1 - indiceInicial);
    let indiceArrDias = 0;
    return matrizDiasPorDefecto.map((arrSemana) => {
      return arrSemana.map((objDia, i) => {
        if (indiceArrDias >= indiceInicial && clonArrDias.length > 0) {
          if(i != 0) {
            let objDato = clonArrDias.shift();
            objDia[Object.keys(objDia)[0]] = objDato[Object.keys(objDato)[0]];
          } else {
            fechaSemana.setDate(fechaSemana.getDate() + 7);
            objDia[Object.keys(objDia)[0]] = getNumSemana(fechaSemana);
          }
        }
        if(indiceArrDias == 0) {
          fechaSemana.setDate(fechaSemana.getDate() + 7);
          objDia[Object.keys(objDia)[0]] = getNumSemana(fechaSemana);
        }
        indiceArrDias++;
        return objDia;
      });
    });
  }

  function empezarLaMatrizEn() {
    return matrizDiasPorDefecto[0].findIndex((fila) => {
      return primerDiaDelMes == Object.keys(fila)[0];
    });
  }

  function inicializarMatriz() {
    const matriz = [];
    //Va de 1 a 5 porque son las semanas
    for (let i = 1; i <= 6; i++) {
      matriz.push([]);
      //Va de 0 a 7 para que funcione getDiaSemana() 7 y 0 son Domingo
      for (let j = 0; j < 8; j++) {
        if (j == 0) {
          matriz[i - 1].push({ "Sem": -1 });
        } else {
          matriz[i - 1].push({ [getDiaSemana(j)]: " "} );
        }
      }
    }
    return matriz;
  }

  /*[ {Mie: 1}, {Jue: 2}, {Vie: 3}, {Sab: 4}, {Dom: 5}, {Lun: 6}, {Mar: 7},
      {Mie: 8}, {Jue: 9}, {Vie: 10}, {Sab: 11}, {Dom: 12},{Lun: 13}, {Mar: 14},
      {Mie: 15}, {Jue: 16}, {Vie: 17}, {Sab: 18}, {Dom: 19}, {Lun: 20}, {Mar: 21},
      {Mie: 22}, {Jue: 23}, {Vie: 24}, {Sab: 25}, {Dom: 26}, {Lun: 27}, {Mar: 28}, 
      {Mie: 29}, {Jue: 30}
    ] */
  function arrayDiasDelMes() {
    const arrResultado = [];
    // const clonFecha = new Date(fecha);
    // clonFecha.setDate(1);
    do {
      const diaObj = {} //clonFecha.getDate()
      diaObj[getDiaSemana(clonFecha.getDay())] = clonFecha.getDate();
      arrResultado.push(diaObj);
      clonFecha.setDate(clonFecha.getDate() + 1);
      if (clonFecha.getMonth() != fecha.getMonth()) break;
    } while (true);
    return arrResultado;
  }
}


export function getDiaSemana(dia) {
  let diaSemana = "";
  switch (dia) {
    case 0://Domingo
    case 7://Domingo
      diaSemana = CABECERA_SEMANA[7];
      break;
    case 1://Lunes
    case 2://Martes
    case 3://Miércoles
    case 4://Jueves
    case 5://Viernes
    case 6://Sábado
      diaSemana = CABECERA_SEMANA[dia];
      break;
    default:
      diaSemana = "";
      break;
  }
  return diaSemana;
}

export function getNumSemana(fecha) {
  const fechaClonada = new Date(fecha);
  fechaClonada.setDate(fechaClonada.getDate() + 4 - (fechaClonada.getDay() || 7));
  const principioDeAnio = new Date(fechaClonada.getFullYear(), 0, 1);
  const numSemana = Math.ceil(((fechaClonada - principioDeAnio) / 86400000 + 1) / 7);

  return numSemana;
}


