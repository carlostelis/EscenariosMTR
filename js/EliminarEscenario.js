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
                div_comentarios_eliminar_local.innerHTML = `<font style="text-align:center;font-weight:bold;">Comentarios del escenario</font><br>${boton.obj.infoMod.comentarios}`;
            }
            botonModLocalSel = boton;
            break;
        case 'ori-db': boton_eliminar_ori_db.disabled = false; break;
        case 'mod-db': boton_eliminar_mod_db.disabled = false; break;
    }
}

ipcRenderer.on('escenario_modificado_local:leido_comentarios', (event, obj_res) => {
    console.log('Recibe comentarios', obj_res);
    botonModTemp.obj.infoMod.comentarios = obj_res.res;
    div_comentarios_eliminar_local.innerHTML = `<label style="display:block;text-align:center;font-weight:bold;">Comentarios del escenario</label><br>${botonModTemp.obj.infoMod.comentarios.trim() === '' ? 'Sin Comentarios' : botonModTemp.obj.infoMod.comentarios}`;
});

ipcRenderer.on('escenario_modificado_local:leidaLista', (event, lista) => {
    console.log('Recibidos:', lista.length);
    console.log(lista);

    // Guarda la lista
    lista_mod_eliminar = lista;
    // Limpia el contenedor
    lista_mod_local.innerHTML = '';
    lista_mod_local.botones = [];

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
        boton.innerHTML = `<font style="color:darkgray;">${item.algoritmo.toUpperCase()}</font> ${item.infoMod.anio}/${item.infoMod.mes}/${item.infoMod.dia} ${item.infoMod.hora}${item.infoMod.min}`;
        boton.appendChild(span);

        lista_mod_local.appendChild(boton);
        lista_mod_local.botones.push(boton);
    });
});

function consultarOriginalesTodos() {
    ipcRenderer.send('escenario_original_local:leertodos');
}

ipcRenderer.on('escenario_original_local:leidotodos', (event, lista) => {
    console.log('Recibidos:', lista.length);
    console.log(lista);

    // Guarda la lista
    lista_ori_eliminar = lista;
    // Limpia el contenedor
    lista_ori_local.innerHTML = '';
    lista_ori_local.botones = [];

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

function borrarEscenarioOriginalLocal() {
    if (botonOriLocalSel !== null) {
        banner.trabajando();
        banner.vistaCompacta();
        banner.setMensaje(`Eliminando escenario <font style="text-decoration:underline">${botonOriLocalSel.obj.id}</font>`);
        banner.mostrar();
        console.log('Borrar', botonOriLocalSel.obj.ruta);
        ipcRenderer.send('escenario_original_local:borrar', botonOriLocalSel.obj.ruta);
    }
}

function borrarEscenarioModificadoLocal() {
    if (botonModLocalSel !== null) {
        banner.trabajando();
        banner.vistaCompacta();
        banner.setMensaje(`Eliminando escenario <font style="text-decoration:underline">${botonOriLocalSel.obj.id}</font>`);
        banner.mostrar();
        console.log('Borrar', botonModLocalSel.obj.infoMod.ruta);
        ipcRenderer.send('escenario_modificado_local:borrar', botonModLocalSel.obj.infoMod.ruta);
    }
}

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

        setTimeout(() => {
            banner.ocultar();
        }, 1500);
    } else {
        banner.error();
        banner.setMensaje(res.mensaje);
        setTimeout(() => {
            banner.ocultar();
        }, 3000);
    }
});

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

        setTimeout(() => {
            banner.ocultar();
        }, 1500);
    } else {
        banner.error();
        banner.setMensaje(res.mensaje);
        setTimeout(() => {
            banner.ocultar();
        }, 3000);
    }
});
