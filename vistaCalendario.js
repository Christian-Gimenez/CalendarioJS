"use strict";
export function mostrarCalendario(fechaObj, cabecera, hoy) {
  const divPrincipal = document.createElement("div");

  const divBotones = crearBotones();

  const divCalendario = document.createElement("div");
  divCalendario.appendChild(crearTabla(fechaObj, cabecera, hoy));

  divPrincipal.appendChild(divBotones);
  divPrincipal.appendChild(divCalendario);

  document.body.appendChild(divPrincipal);
}


export function crearBotones() {
  const boton1AnioMenos = document.createElement("button");
  boton1AnioMenos.innerHTML = "&laquo;";

  const boton1MesMenos = document.createElement("button");
  boton1MesMenos.innerHTML = "&lsaquo;";

  const botonHoy = document.createElement("button");
  botonHoy.innerHTML = "&bull;";

  const boton1MesMas = document.createElement("button");
  boton1MesMas.innerHTML = "&rsaquo;";

  const boton1AnioMas = document.createElement("button");
  boton1AnioMas.innerHTML = "&raquo;";

  const div = document.createElement("div");
  div.appendChild(boton1AnioMenos);
  div.appendChild(boton1MesMenos);
  div.appendChild(botonHoy);
  div.appendChild(boton1MesMas);
  div.appendChild(boton1AnioMas);
  return div;
}

export function crearTabla(fechaObj, cabecera, hoy) {
  const pintarHoy = hoy ? true : false;
  const tabla = document.createElement("table");
  // tabla.setAttribute("border", "1px solid black");

  const tituloTabla = document.createElement("caption");
  tituloTabla.appendChild(document.createTextNode(fechaObj["mes"]));
  tituloTabla.insertAdjacentHTML("beforeend", " " + fechaObj["anio"]);

  const thead = crearTHead();

  const tbody = crearTBody();

  tabla.appendChild(tituloTabla);
  tabla.appendChild(thead);
  tabla.appendChild(tbody);

  return tabla;

  function crearTHead() {
    const thead = document.createElement("thead");

    const tr = document.createElement("tr");

    cabecera.forEach(diaSemana => {
      let th = document.createElement("th");
      th.appendChild(document.createTextNode(diaSemana));
      tr.appendChild(th);
    });

    thead.appendChild(tr);
    return thead;
  }

  function crearTBody() {
    const tbody = document.createElement("tbody");
   
    fechaObj["dias"].forEach(semana => {
      
      let tr = document.createElement("tr");
      semana.forEach((dia, i) => {
        let td = document.createElement("td");
        let dato = dia[cabecera[i]];
        td.appendChild(document.createTextNode(dato));
        if(pintarHoy && dato === hoy.getDate()) td.setAttribute("id", "dia_actual");
        (i === 0)? td.setAttribute("class", "numero_semana") : td.setAttribute("class", "no_del_mes");
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    return tbody;
  }
}

