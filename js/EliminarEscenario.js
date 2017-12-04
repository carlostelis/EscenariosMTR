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
        b.disabled = false;
    });

    boton.disabled = true;
}
