// EliminarEscenario.js - Javascript con funciones y eventos asociados a la
// eliminación de escenarios locales y en BD

// Función para cambiar de tipo de eliminación LOCAL o BD
// ${trigger} es la pestaña que activa la función
// ${id_div} es el id del div contenedor a mostrar
function switchTipoEscenario(trigger, id_div) {
    pestanias_eliminar.forEach((pestania) => {
        pestania.classList.add('inactiva');
    });

    trigger.classList.remove('inactiva');

    divs_eliminar.forEach((div) => {
        if (div.id === id_div) {
            div.classList.remove('inactivo');
        } else {
            div.classList.add('inactivo');
        }
    });
}

// Función llada desde cada opción de lista de escenarios; permite seleccionar
// un elemento de la lista y desplegar su información
// ${boton} es el boton que invoca la función
function clickEscenarioBotonListaEliminar(boton) {
    let botones = Array.from(document.getElementsByClassName('boton-lista-eliminar'));

    botones.forEach((b) => {
        if (b.classList.contains(boton.subclase)) {
            b.disabled = false;
        }
    });

    boton.disabled = true;

    // Habilita boton eliminar original
    // Procesa carga de escenario modificado o comentarios
    switch (boton.subclase) {
        case 'ori-local':
            boton_eliminar_ori_local.disabled = false;
            ipcRenderer.send('escenario_modificado_local:leerLista', boton.obj);
            botonOriLocalSel = boton;
            break;
        case 'mod-local':
            boton_eliminar_mod_local.disabled = false;
            // Si ya lo solicitó, no lo vuelve a pedir
            if (typeof boton.obj.infoMod.comentarios === 'undefined') {
                botonModTemp = boton;
                ipcRenderer.send('escenario_modificado_local:leer_comentarios', boton.obj);
            } else {
                div_comentarios_eliminar_local.innerHTML = `<label style="display:block;text-align:center;font-weight:bold;">Comentarios del escenario</label><br>${botonModTemp.obj.infoMod.comentarios.trim() === '' ? 'Sin Comentarios' : botonModTemp.obj.infoMod.comentarios}`;
            }
            botonModLocalSel = boton;
            break;
        case 'ori-db':
            boton_eliminar_ori_db.disabled = false;
            bannerIcono.mostrar();
            div_comentarios_eliminar_db.innerHTML = '';
            console.log(boton.obj);
            botonOriDBSel = boton;
            ipcRenderer.send('escenarios_eliminar_folio_mod:leer', boton.obj.algoritmo, boton.obj.id_original);
            // console.log(boton.obj);
            break;
        case 'mod-db':
            botonModDBSel = boton;
            boton_eliminar_mod_db.disabled = false;
            div_comentarios_eliminar_db.innerHTML = `<label style="display:block;text-align:center;font-weight:bold;">Comentarios del escenario</label><br>${boton.obj.comentarios.trim() === '' ? 'Sin Comentarios' : boton.obj.comentarios}`;
            break;
    }
}

// Función que consulta todos los escenarios originales locales
function consultarOriginalesTodos() {
    ipcRenderer.send('escenario_original_local:leertodos');
}

// Función que borra un escenario original local y todos los escenarios
// modificados asociados
function borrarEscenarioOriginalLocal() {
    if (botonOriLocalSel !== null) {
        banner.trabajando();
        banner.vistaCompacta();
        banner.setMensaje(`Eliminando escenario <font style="text-decoration:underline">${botonOriLocalSel.obj.id}</font>`);
        banner.ocultarBoton();
        banner.mostrar();
        console.log('Borrar', botonOriLocalSel.obj.ruta);
        ipcRenderer.send('escenario_original_local:borrar', botonOriLocalSel.obj.ruta);
    }
}

// Función que borra un escenario modificado local
function borrarEscenarioModificadoLocal() {
    if (botonModLocalSel !== null) {
        banner.trabajando();
        banner.vistaCompacta();
        banner.setMensaje(`Eliminando escenario <font style="text-decoration:underline">${botonOriLocalSel.obj.id}</font>`);
        banner.ocultarBoton();
        banner.mostrar();
        console.log('Borrar', botonModLocalSel.obj.infoMod.ruta);
        ipcRenderer.send('escenario_modificado_local:borrar', botonModLocalSel.obj.infoMod.ruta);
    }
}

// Función que obtiene la lista de años de escenarios originales locales
function consultarAniosOriginalesBD() {
    if (select_eliminar_algoritmo_db.value === 'ninguno') {
        consultarFoliosOriginalesBD_Init();
        return;
    } else {
        ipcRenderer.send('escenarios_eliminar_folio_anios:leer', select_eliminar_algoritmo_db.value);
    }

    bannerIcono.mostrar();
    select_eliminar_anio_db.innerHTML = '';
    select_eliminar_mes_db.innerHTML = '';
    select_eliminar_dia_db.innerHTML = '';
}

// Función que obtiene la lista de meses de escenarios originales locales
function consultarMesesOriginalesBD() {
    if (select_eliminar_anio_db.value === 'ninguno') {
        consultarAniosOriginalesBD();
        return;
    } else {
        ipcRenderer.send('escenarios_eliminar_folio_meses:leer', select_eliminar_algoritmo_db.value, select_eliminar_anio_db.value);
    }

    bannerIcono.mostrar();
    select_eliminar_dia_db.innerHTML = '';
}

// Función que obtiene la lista de días de escenarios originales locales
function consultarDiasOriginalesBD() {
    if (select_eliminar_mes_db.value === 'ninguno') {
        consultarMesesOriginalesBD();
        return;
    } else {
        ipcRenderer.send('escenarios_eliminar_folio_dias:leer', select_eliminar_algoritmo_db.value, select_eliminar_anio_db.value, select_eliminar_mes_db.value);
    }

    bannerIcono.mostrar();
}

// Función que obtiene la lista de identificadores de escenarios originales locales
function consultarFoliosOriginalesBD() {
    bannerIcono.mostrar();
    ipcRenderer.send('escenarios_eliminar_folio:leer', select_eliminar_algoritmo_db.value, select_eliminar_anio_db.value, select_eliminar_mes_db.value, select_eliminar_dia_db.value);
}

// Función que consulta los algoritmos de los escnearios disponibles en BD
// asociados al usuario actual
function consultarFoliosOriginalesBD_Init() {
    bannerIcono.mostrar();
    ipcRenderer.send('escenarios_eliminar_folio:leer', '', '', '', '');
    select_eliminar_anio_db.disabled = true;
    select_eliminar_anio_db.innerHTML = '';
    select_eliminar_mes_db.disabled = true;
    select_eliminar_mes_db.innerHTML = '';
    select_eliminar_dia_db.disabled = true;
    select_eliminar_dia_db.innerHTML = '';
}

// Función que elimina un escenario original de la BD y sus escenarios originales asociados
function borrarEscenarioOriginalBD() {
    if (botonOriDBSel !== null) {
        console.log('Borrar', botonOriDBSel.obj);
        banner.trabajando();
        banner.vistaCompacta();
        banner.setMensaje(`Eliminando escenario <font style="text-decoration:underline">${botonOriDBSel.obj.id_original}</font>`);
        banner.ocultarBoton();
        banner.mostrar();

        let obj = {
            opc: 3,
            folio: botonOriDBSel.obj.id_original,
            usuario: botonOriDBSel.obj.usuario,
            id: botonOriDBSel.obj.id_original,
            algoritmo: botonOriDBSel.obj.algoritmo,
            estado: 4,
            ruta: botonOriDBSel.obj.ruta,
            sistema: SESION.sistema
        };

        console.log(obj);

        ipcRenderer.send('escenario_bd:operacion', obj, 'escenario:eliminar_ori_BD');
    }
}

// Función que elimina un escenario modificado de la BD y su escenario original asociado
function borrarEscenarioModificadoBD() {
    if (botonModDBSel !== null) {
        console.log('Borrar', botonModDBSel.obj.ruta);
        banner.trabajando();
        banner.vistaCompacta();
        banner.setMensaje(`Eliminando escenario <font style="text-decoration:underline">${botonModDBSel.obj.folio}</font>`);
        banner.ocultarBoton();
        banner.mostrar();

        let obj = {
            opc: 3,
            folio: botonModDBSel.obj.folio,
            usuario: botonModDBSel.obj.usuario,
            id: botonModDBSel.obj.id_original,
            algoritmo: botonModDBSel.obj.algoritmo,
            estado: 5,
            ruta: botonModDBSel.obj.ruta,
            sistema: SESION.sistema
        };

        console.log(obj);

        ipcRenderer.send('escenario_bd:operacion', obj, 'escenario:eliminar_mod_BD');
    }
}

// Evento que recibe todos los identificadores de escnearios originales locales
// ${lista} es la lista de escenarios originales locales
ipcRenderer.on('escenario_original_local:leidotodos', (event, lista) => {
    console.log('Recibidos:', lista.length);
    console.log(lista);

    // Guarda la lista
    lista_ori_eliminar = lista;
    // Limpia el contenedor
    lista_ori_local.innerHTML = '';
    lista_ori_local.botones = [];

    div_comentarios_eliminar_local.innerHTML = '';

    // Crea los items en la lista desplegable
    lista_ori_eliminar.forEach((item) => {
        let boton = document.createElement('button');
        boton.classList.add('boton-lista-eliminar');
        boton.classList.add('ori-local');
        boton.obj = item;
        boton.subclase = 'ori-local';
        boton.onclick = function () { clickEscenarioBotonListaEliminar(this); };
        let span = document.createElement('span');
        let i = document.createElement('i');
        i.classList.add('demo-icon');
        i.classList.add('icon-play-1');
        span.appendChild(i);
        boton.innerHTML = `<font style="color:darkgray;">${item.algoritmo.toUpperCase()}</font> <font style="text-decoration:underline;">${item.anio}/${item.mes}/${item.dia}</font> Hora: <b>${item.hora}</b> Int: <b>${item.int}</b> GMT<b>${item.gmt}</b>`;
        boton.appendChild(span);

        lista_ori_local.appendChild(boton);
        lista_ori_local.botones.push(boton);
    });

    // Agrega valores a los filtros
    select_eliminar_algoritmo_local.innerHTML = '';
    crearOption(select_eliminar_algoritmo_local, 'Sin Filtro', 'ninguno');
    select_eliminar_algoritmo_local.lista = [];
    select_eliminar_algoritmo_local.listaObj = [];

    select_eliminar_anio_local.innerHTML = '';
    crearOption(select_eliminar_anio_local, 'Sin Filtro', 'ninguno');
    select_eliminar_anio_local.lista = [];
    select_eliminar_anio_local.listaObj = [];
    select_eliminar_anio_local.disabled = true;

    select_eliminar_mes_local.innerHTML = '';
    crearOption(select_eliminar_mes_local, 'Sin Filtro', 'ninguno');
    select_eliminar_mes_local.lista = [];
    select_eliminar_mes_local.listaObj = [];
    select_eliminar_mes_local.disabled = true;

    select_eliminar_dia_local.innerHTML = '';
    crearOption(select_eliminar_dia_local, 'Sin Filtro', 'ninguno');
    select_eliminar_dia_local.lista = [];
    select_eliminar_dia_local.listaObj = [];
    select_eliminar_dia_local.disabled = true;

    lista_ori_eliminar.forEach((item) => {
        // Carga unicamente los algoritmos
        if (typeof select_eliminar_algoritmo_local.lista.find((alg) => { return alg === item.algoritmo}) === 'undefined') {
            // Agrega a la lista y crea option
            select_eliminar_algoritmo_local.lista.push(item.algoritmo);
            select_eliminar_algoritmo_local.listaObj.push(item);
            crearOption(select_eliminar_algoritmo_local, item.algoritmo.toUpperCase(), item.algoritmo.toLowerCase());
        }
    });
});

// Evento que recibe el contenido del archivo de comentarios de un escenario modificado
ipcRenderer.on('escenario_modificado_local:leido_comentarios', (event, obj_res) => {
    console.log('Recibe comentarios', obj_res);
    if (obj_res.estado === true) {
        botonModTemp.obj.infoMod.comentarios = obj_res.res;
        div_comentarios_eliminar_local.innerHTML = `<label style="display:block;text-align:center;font-weight:bold;">Comentarios del escenario</label><br>${botonModTemp.obj.infoMod.comentarios.trim() === '' ? 'Sin Comentarios' : botonModTemp.obj.infoMod.comentarios}`;
    } else {
        botonModTemp.obj.infoMod.comentarios = '';
        div_comentarios_eliminar_local.innerHTML = `<label style="display:block;text-align:center;font-weight:bold;">Comentarios del escenario</label><br>Sin Comentarios`;
    }
});

// Evento que recibe la lista de escenarios modificados y los procesa en una lista
ipcRenderer.on('escenario_modificado_local:leidaLista', (event, lista) => {
    console.log('Recibidos:', lista.length);
    console.log(lista);

    // Guarda la lista
    lista_mod_eliminar = lista;
    // Limpia el contenedor
    lista_mod_local.innerHTML = '';
    lista_mod_local.botones = [];
    div_comentarios_eliminar_local.innerHTML = '';

    // Crea los items en la lista desplegable
    lista_mod_eliminar.forEach((item) => {
        let boton = document.createElement('button');
        boton.classList.add('boton-lista-eliminar');
        boton.classList.add('mod-local');
        boton.obj = item;
        boton.subclase = 'mod-local';
        boton.onclick = function () { clickEscenarioBotonListaEliminar(this); };
        let span = document.createElement('span');
        let i = document.createElement('i');
        i.classList.add('demo-icon');
        i.classList.add('icon-play-1');
        span.appendChild(i);
        boton.innerHTML = `<font style="color:darkgray;">${item.algoritmo.toUpperCase()}</font> ${item.infoMod.anio}/${item.infoMod.mes}/${item.infoMod.dia} ${item.infoMod.hora}:${item.infoMod.min}`;
        boton.appendChild(span);

        lista_mod_local.appendChild(boton);
        lista_mod_local.botones.push(boton);
    });
});

// Evento que recibe la respuesta del borrado de un escenario original local
// ${res} es un objeto que contiene el estado del proceso
ipcRenderer.on('escenario_original_local:borrado', (event, res) => {
    console.log('Estado: ', res.estado);
    if (res.estado === true) {
        banner.ok();
        banner.setMensaje('Escenario eliminado correctamente');

        // Borra los escenarios modificados asociados
        let indices = [];
        for (let i = 0; i < lista_mod_local.botones.length; i++) {
            let boton = lista_mod_local.botones[i];
            if (boton.obj.ruta === botonOriLocalSel.obj.ruta) {
                lista_mod_local.removeChild(boton);
                indices.push(i);
            }
        }
        indices.forEach((indice) => {
            lista_mod_local.botones.splice(indice, 1);
        });
        indices = [];

        // Borra el elemento original
        lista_ori_local.removeChild(botonOriLocalSel);

        let indice = -1;
        for (let i = 0; i < lista_ori_local.botones.length; i++) {
            if (lista_ori_local.botones[i] === botonOriLocalSel) {
                indice = i;
            }
        }
        lista_ori_local.botones.splice(indice, 1);

        // Desactiva el boton
        boton_eliminar_ori_local.disabled = true;
        // Desactiva el boton de los modificados
        boton_eliminar_mod_local.disabled = true;

        // Limpia el div de comentarios
        div_comentarios_eliminar_local.innerHTML = '';

        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();
    } else {
        banner.error();
        banner.setMensaje(res.mensaje);
        setTimeout(() => {
            banner.ocultar();
        }, 3000);
    }
});

// Evento que recibe la respuesta del borrado de un escenario modificado local
// ${res} es un objeto que contiene el estado del proceso
ipcRenderer.on('escenario_modificado_local:borrado', (event, res) => {
    console.log('Estado: ', res.estado);
    if (res.estado === true) {
        banner.ok();
        banner.setMensaje('Escenario eliminado correctamente');

        // Borra el elemento modificado
        lista_mod_local.removeChild(botonModLocalSel);

        let indice = -1;
        for (let i = 0; i < lista_mod_local.botones.length; i++) {
            if (lista_mod_local.botones[i] === botonOriLocalSel) {
                indice = i;
            }
        }
        lista_mod_local.botones.splice(indice, 1);

        // Desactiva el boton
        boton_eliminar_mod_local.disabled = true;

        // Limpia el div de comentarios
        div_comentarios_eliminar_local.innerHTML = '';

        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();
    } else {
        banner.error();
        banner.setMensaje(res.mensaje);
        setTimeout(() => {
            banner.ocultar();
        }, 3000);
    }
});

// Evento que recibe la lista de algoritmos de escenarios en BD
// ${lista} es la lista de algoritmos de escenarios
ipcRenderer.on('escenarios_eliminar_folio_algoritmos:leidos', (event, lista) => {
    console.log('algoritmos', lista);

    select_eliminar_algoritmo_db.innerHTML = '';
    select_eliminar_algoritmo_db.lista = lista;
    select_eliminar_algoritmo_db.disabled = false;

    // Crea option defecto
    crearOption(select_eliminar_algoritmo_db, 'Sin Filtro', 'ninguno');

    // select_eliminar_anio_db.lista.sort();
    select_eliminar_algoritmo_db.lista.forEach((item) => {
        let alg_label;
        switch (item) {
            case "dersi": alg_label = 'DERS-I'; break;
            case "dersmi": alg_label = 'DERS-MI'; break;
            case "autr": alg_label = 'AUTR'; break;
            break;
        }
        crearOption(select_eliminar_algoritmo_db, alg_label, item);
    });

    select_eliminar_anio_db.disabled = true;
    select_eliminar_mes_db.disabled = true;
    select_eliminar_dia_db.disabled = true;
});

// Evento que recibe la lista de años de escenarios en BD
// ${lista} es la lista de años de escenarios
ipcRenderer.on('escenarios_eliminar_folio_anios:leidos', (event, lista) => {
    console.log('anios', lista);

    select_eliminar_anio_db.innerHTML = '';
    select_eliminar_anio_db.lista = lista;
    select_eliminar_anio_db.disabled = false;

    // Crea option defecto
    crearOption(select_eliminar_anio_db, 'Sin Filtro', 'ninguno');

    // Ordena e inserta
    select_eliminar_anio_db.lista.sort(function(a, b){return a-b});
    // select_eliminar_anio_db.lista.sort();
    select_eliminar_anio_db.lista.forEach((item) => {
        if (`${item}`.length > 1) {
            crearOption(select_eliminar_anio_db, `${item}`, `${item}`);
        } else {
            crearOption(select_eliminar_anio_db, `0${item}`, `0${item}`);
        }
    });

    select_eliminar_mes_db.disabled = true;
    select_eliminar_dia_db.disabled = true;
});

// Evento que recibe la lista de meses de escenarios en BD
// ${lista} es la lista de meses de escenarios
ipcRenderer.on('escenarios_eliminar_folio_meses:leidos', (event, lista) => {
    console.log('meses', lista);

    select_eliminar_mes_db.innerHTML = '';
    select_eliminar_mes_db.lista = lista;
    select_eliminar_mes_db.disabled = false;

    // Crea option defecto
    crearOption(select_eliminar_mes_db, 'Sin Filtro', 'ninguno');

    // Ordena e inserta
    select_eliminar_mes_db.lista.sort(function(a, b){return a-b});
    // select_eliminar_anio_db.lista.sort();
    select_eliminar_mes_db.lista.forEach((item) => {
        if (`${item}`.length > 1) {
            crearOption(select_eliminar_mes_db, `${item}`, `${item}`);
        } else {
            crearOption(select_eliminar_mes_db, `0${item}`, `0${item}`);
        }
    });

    select_eliminar_dia_db.disabled = true;
});

// Evento que recibe la lista de días de escenarios en BD
// ${lista} es la lista de días de escenarios
ipcRenderer.on('escenarios_eliminar_folio_dias:leidos', (event, lista) => {
    console.log('dias', lista);

    select_eliminar_dia_db.innerHTML = '';
    select_eliminar_dia_db.lista = lista;
    select_eliminar_dia_db.disabled = false;

    // Crea option defecto
    crearOption(select_eliminar_dia_db, 'Sin Filtro', 'ninguno');

    // Ordena e inserta
    select_eliminar_dia_db.lista.sort(function(a, b){return a-b});
    // select_eliminar_anio_db.lista.sort();
    select_eliminar_dia_db.lista.forEach((item) => {
        if (`${item}`.length > 1) {
            crearOption(select_eliminar_dia_db, `${item}`, `${item}`);
        } else {
            crearOption(select_eliminar_dia_db, `0${item}`, `0${item}`);
        }
    });
});

// Evento que recibe la lista de folios originales de escenarios en BD
// ${lista} es la lista de folios originales de escenarios
ipcRenderer.on('escenarios_eliminar_folio:leidos', (event, lista) => {
    console.log('folios', lista);

    // Guarda la lista
    lista_ori_eliminar_bd = lista;
    // Limpia el contenedor
    lista_ori_bd.innerHTML = '';
    lista_ori_bd.botones = [];

    lista_mod_bd.innerHTML = '';
    lista_mod_bd.botones = [];

    // Crea los items en la lista desplegable
    lista_ori_eliminar_bd.forEach((item) => {
        let boton = document.createElement('button');
        boton.classList.add('boton-lista-eliminar');
        boton.classList.add('ori-db');
        boton.obj = item;
        boton.subclase = 'ori-db';
        boton.onclick = function () { clickEscenarioBotonListaEliminar(this); };
        let span = document.createElement('span');
        let i = document.createElement('i');
        i.classList.add('demo-icon');
        i.classList.add('icon-play-1');
        span.appendChild(i);
        boton.innerHTML = `<font style="color:darkgray;">${item.algoritmo.toUpperCase()}</font> <font style="text-decoration:underline;">${item.anio}/${item.mes}/${item.dia}</font> Hora: <b>${item.hora}</b> Int: <b>${item.int}</b> GMT<b>${item.gmt}</b>`;
        boton.appendChild(span);

        lista_ori_bd.appendChild(boton);
        lista_ori_bd.botones.push(boton);
    });

    bannerIcono.ocultar();
});

// Evento que recibe la lista de folios de escenarios en BD
// ${lista} es la lista de folios de escenarios
ipcRenderer.on('escenarios_eliminar_folio_mod:leidos', (event, lista) => {
    console.log('folios mod', lista);

    // Guarda la lista
    lista_mod_eliminar_bd = lista;
    // Limpia el contenedor
    lista_mod_bd.innerHTML = '';
    lista_mod_bd.botones = [];

    // Crea los items en la lista desplegable
    lista_mod_eliminar_bd.forEach((item) => {
        let boton = document.createElement('button');
        boton.classList.add('boton-lista-eliminar');
        boton.classList.add('mod-db');
        boton.obj = item; console.log('Folio', item.folio);
        boton.subclase = 'mod-db';
        boton.onclick = function () { clickEscenarioBotonListaEliminar(this); };
        let span = document.createElement('span');
        let i = document.createElement('i');
        i.classList.add('demo-icon');
        i.classList.add('icon-play-1');
        span.appendChild(i);
        boton.innerHTML = `<font style="color:darkgray;">${item.algoritmo.toUpperCase()}</font> ${item.anio}/${item.mes}/${item.dia} ${item.hora}:${item.min}`;
        boton.appendChild(span);

        lista_mod_bd.appendChild(boton);
        lista_mod_bd.botones.push(boton);
    });

    bannerIcono.ocultar();
});

// Evento que recibe la respuesta de eliminación de un escenario original de BD
// ${res} es un objeto que contiene la respuesta del proceso
ipcRenderer.on('escenario:eliminar_ori_BD', (event, res) => {
    if (res.estado === true) {
        banner.ok();
        banner.setMensaje('Registro eliminado correctamente');
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();

        // Remueve el boton de la lista
        lista_ori_bd.removeChild(botonOriDBSel);
        // Vacía la lista de modificados
        lista_mod_bd.innerHTML = '';
        // Limpia comentarios
        div_comentarios_eliminar_db.innerHTML = '';
    } else {
        banner.error();
        banner.setMensaje(`Error: ${res.mensaje}`);
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();
    }
});

// Evento que recibe la respuesta de eliminación de un escenario modificado de BD
// ${res} es un objeto que contiene la respuesta del proceso
ipcRenderer.on('escenario:eliminar_mod_BD', (event, res) => {
    if (res.estado === true) {
        banner.ok();
        banner.setMensaje('Registro eliminado correctamente');
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();

        // Remueve el boton de la lista
        lista_mod_bd.removeChild(botonModDBSel);
        // Limpia comentarios
        div_comentarios_eliminar_db.innerHTML = '';
    } else {
        banner.error();
        banner.setMensaje(`Error: ${res.mensaje}`);
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();
    }
});
