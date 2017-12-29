module.exports = [
    // INFORMACION GENERAL
    {
        "nombre":"HORIZODERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "HORIZODERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numPeriodos": { "type": "number",	"editable": false, "nullable": false },
                "duracionMinuto": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "numPeriodos", "title": "Número Periodos", "sortable": true, "filterable": false},
			{ "field": "duracionMinuto", "title": "Duración Minuto", "sortable": true, "filterable": false}
		]
    },
    {
        "nombre":"AUSUBSIS_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "AUSUBSIS_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numero": { "type": "number",	"editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "estado": { "type": "number", "editable": false, "nullable": false },
                "nodoReferencia": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "numero", "title": "Número", "sortable": true, "filterable": false},
			{ "field": "nombre", "title": "Nombre", "sortable": true, "filterable": true},
            { "field": "estado", "title": "Estado", "sortable": true, "filterable": false},
            { "field": "nodoReferencia", "title": "Nodo Referencia", "sortable": true, "filterable": true}
		]
    },
    {
        "nombre":"AREAS_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "AREAS_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "clave": { "type": "string",	"editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "subsistema": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "clave", "title": "Clave Área", "sortable": true, "filterable": false},
			{ "field": "nombre", "title": "Nombre Área", "sortable": true, "filterable": true},
            { "field": "subsistema", "title": "Subsistema", "sortable": true, "filterable": false}
		]
    },
    {
        "nombre":"ZONAS_CARGA.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "ZONAS_CARGA",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "indiceZonaCarga": { "type": "number",	"editable": false, "nullable": false },
                "subsistema": { "type": "string", "editable": false, "nullable": false },
                "nombreZc": { "type": "string", "editable": false, "nullable": false },
                "indiceEmsZc": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "indiceZonaCarga", "title": "Índice Zona Carga", "sortable": true, "filterable": false},
			{ "field": "subsistema", "title": "Subsistema", "sortable": true, "filterable": true},
            { "field": "nombreZc", "title": "Nombre ZC", "sortable": true, "filterable": false},
            { "field": "indiceEmsZc", "title": "Indice EMS ZC", "sortable": true, "filterable": true}
		]
    },
    {
        "nombre":"ZONASRES_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "ZONASRES_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numero": { "type": "number",	"editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "subsistema": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "numero", "title": "Número", "sortable": true, "filterable": false},
			{ "field": "nombre", "title": "Nombre", "sortable": true, "filterable": true},
            { "field": "subsistema", "title": "Subsistema", "sortable": true, "filterable": true}
		]
    },
    {
        "nombre":"PRETOPEPISO.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "PRETOPEPISO",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "precioMaximo": { "type": "number",	"editable": false, "nullable": false },
                "precioMinimo": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "precioMaximo", "title": "Precio Máximo", "sortable": true, "filterable": false},
			{ "field": "precioMinimo", "title": "Precio Mínimo", "sortable": true, "filterable": false}
		]
    },
    {
        "nombre":"REGIONPRECIOS_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "REGIONPRECIOS_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "indiceRegion": { "type": "number",	"editable": false, "nullable": false },
                "nombreLargo": { "type": "string", "editable": false, "nullable": false },
                "nombreCorto": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "indiceRegion", "title": "Índice Región", "sortable": true, "filterable": true},
			{ "field": "nombreLargo", "title": "Nombre Largo", "sortable": true, "filterable": true},
            { "field": "nombreCorto", "title": "Nombre Corto", "sortable": true, "filterable": true}
		]
    },
    {
        "nombre":"NODOSP.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "NODOSP",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numeroNodo": { "type": "number",	"editable": false, "nullable": false },
                "numeroNodoEms": { "type": "number", "editable": false, "nullable": false },
                "nombreNodo": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "numeroNodo", "title": "Número Nodo", "sortable": true, "filterable": true},
			{ "field": "numeroNodoEms", "title": "Número Nodo EMS", "sortable": true, "filterable": true},
            { "field": "nombreNodo", "title": "Nombre Nodo", "sortable": true, "filterable": true}
		]
    },
    {
        "nombre":"DERSPRMTS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "DERSPRMTS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "banderaParam": { "type": "number",	"editable": false, "nullable": false },
                "descripcion": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "banderaParam", "title": "Número Nodo", "sortable": true, "filterable": true},
			{ "field": "descripcion", "title": "Número Nodo EMS", "sortable": true, "filterable": true}
		]
    },
    // RED Y ENLACES
    {
        "nombre":"NODOSDERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
        	"id": "NODOSDERS",
        	"fields": {
        		"numFila": { "type": "number",	"editable": false, "nullable": false },
        		"numBus": { "type": "number", "editable": true, "nullable": false },
        		"nombreBus": { "type": "string", "editable": true, "nullable": false },
        		"nombreBusAbrev": { "type": "string", "editable": false, "nullable": false },
        		"numArea": { "type": "number", "editable": false, "nullable": false },
        		"nombreArea": { "type": "string", "editable": false, "nullable": false },
        		"nombreAreaAbrev": { "type": "string", "editable": false, "nullable": false },
        		"tensionNominal": { "type": "number", "editable": true, "nullable": false },
        		"subsistemaElectrico": { "type": "string", "editable": false, "nullable": false },
        		"nombreRegionPrecios": { "type": "string", "editable": false, "nullable": false },
        		"nombreRegionPreciosAbrev": { "type": "string", "editable": false, "nullable": false },
        		"numRegPrecios": { "type": "number", "editable": true, "nullable": false },
        		"disponibilidadIniNodo": { "type": "number", "editable": false, "nullable": false },
        		"zonaCarga": { "type": "number", "editable": false, "nullable": false },
        		"nodoP": { "type": "number", "editable": false, "nullable": false }
        	}
        },
        "columnas": [
    		{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw" },
    		{ "field": "numBus", "title": "Número Bus", "sortable": true, "filterable": false, "width": "5vw" },
    		{ "field": "nombreBus", "title": "Nombre Bus", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreBusAbrev", "title": "Bus Abreviado", "sortable": true, "filterable": false, "width": "8vw" },
    		{ "field": "numArea", "title": "Área", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreArea", "title": "Nombre Área", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreAreaAbrev", "title": "Área Abreviada", "sortable": true, "filterable": false, "width": "10vw" },
    		{ "field": "tensionNominal", "title": "Tensión Nominal", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "subsistemaElectrico", "title": "Subsistema Eléctrico", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreRegionPrecios", "title": "Región Precios", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreRegionPreciosAbrev", "title": "Región Precios Abreviada", "sortable": true, "filterable": false, "width": "10vw" },
    		{ "field": "numRegPrecios", "title": "Número Región Precios", "sortable": true, "filterable": false, "width": "10vw" },
    		{ "field": "disponibilidadIniNodo", "title": "Disponibilidad Inicial", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "zonaCarga", "title": "Zona Carga", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nodoP", "title": "Nodo P", "sortable": true, "filterable": false, "width": "5vw" }
    	]
    },
    {
        "nombre":"NODOSDERSD.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
        	"id": "NODOSDERSD",
        	"fields": {
        		"numFila": { "type": "number",	"editable": false, "nullable": false },
        		"numBus": { "type": "number", "editable": true, "nullable": false },
        		"nombreBus": { "type": "string", "editable": true, "nullable": false },
        		"nombreBusAbrev": { "type": "string", "editable": false, "nullable": false },
        		"numArea": { "type": "number", "editable": false, "nullable": false },
        		"nombreArea": { "type": "string", "editable": false, "nullable": false },
        		"nombreAreaAbrev": { "type": "string", "editable": false, "nullable": false },
        		"tensionNominal": { "type": "number", "editable": true, "nullable": false },
        		"subsistemaElectrico": { "type": "string", "editable": false, "nullable": false },
        		"nombreRegionPrecios": { "type": "string", "editable": false, "nullable": false },
        		"nombreRegionPreciosAbrev": { "type": "string", "editable": false, "nullable": false },
        		"numRegPrecios": { "type": "number", "editable": true, "nullable": false },
        		"disponibilidadIniNodo": { "type": "number", "editable": false, "nullable": false },
        		"zonaCarga": { "type": "number", "editable": false, "nullable": false },
        		"nodoP": { "type": "number", "editable": false, "nullable": false }
        	}
        },
        "columnas": [
    		{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw" },
    		{ "field": "numBus", "title": "Número Bus", "sortable": true, "filterable": false, "width": "5vw" },
    		{ "field": "nombreBus", "title": "Nombre Bus", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreBusAbrev", "title": "Bus Abreviado", "sortable": true, "filterable": false, "width": "8vw" },
    		{ "field": "numArea", "title": "Área", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreArea", "title": "Nombre Área", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreAreaAbrev", "title": "Área Abreviada", "sortable": true, "filterable": false, "width": "10vw" },
    		{ "field": "tensionNominal", "title": "Tensión Nominal", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "subsistemaElectrico", "title": "Subsistema Eléctrico", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreRegionPrecios", "title": "Región Precios", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreRegionPreciosAbrev", "title": "Región Precios Abreviada", "sortable": true, "filterable": false, "width": "10vw" },
    		{ "field": "numRegPrecios", "title": "Número Región Precios", "sortable": true, "filterable": false, "width": "10vw" },
    		{ "field": "disponibilidadIniNodo", "title": "Disponibilidad Inicial", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "zonaCarga", "title": "Zona Carga", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nodoP", "title": "Nodo P", "sortable": true, "filterable": false, "width": "5vw" }
    	]
    },
    {
        "nombre": "RAMAS_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "RAMAS_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numRama": { "type": "number",	"editable": false, "nullable": false },
                "nombreRama": { "type": "string",	"editable": false, "nullable": false },
                "indiceNodoOrigen": { "type": "number",	"editable": false, "nullable": false },
                "nombreNodoOrigen": { "type": "string", "editable": false, "nullable": false },
                "indiceNodoDestino": { "type": "number",	"editable": false, "nullable": false },
                "nombreNodoDestino": { "type": "string", "editable": false, "nullable": false },
                "resistencia": { "type": "number",	"editable": false, "nullable": false },
                "reactancia": { "type": "number",	"editable": false, "nullable": false },
                "tipoRama": { "type": "number",	"editable": false, "nullable": false },
                "disponibilidadInicial": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw" },
            { "field": "numRama", "title": "Número Rama", "sortable": true, "filterable": true, "width": "10vw" },
			{ "field": "nombreRama", "title": "Nombre Rama", "sortable": true, "filterable": true, "width": "10vw" },
            { "field": "indiceNodoOrigen", "title": "Índice Nodo Origen", "sortable": true, "filterable": false, "width": "10vw" },
            { "field": "nombreNodoOrigen", "title": "Nombre Nodo Origen", "sortable": true, "filterable": true, "width": "15vw" },
			{ "field": "indiceNodoDestino", "title": "Índice Nodo Destino", "sortable": true, "filterable": false, "width": "10vw" },
            { "field": "nombreNodoDestino", "title": "Nombre Nodo Destino", "sortable": true, "filterable": false, "width": "15vw" },
            { "field": "resistencia", "title": "Resistencia", "sortable": true, "filterable": false, "width": "5vw" },
			{ "field": "reactancia", "title": "Reactancia", "sortable": true, "filterable": false, "width": "5vw" },
            { "field": "tipoRama", "title": "Tipo Rama", "sortable": true, "filterable": true, "width": "8vw" },
            { "field": "disponibilidadInicial", "title": "Disponibilidad Inicial", "sortable": true, "filterable": true, "width": "10vw" }
		]
    },
    {
        "nombre":"RAMASD_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "RAMASD_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numRama": { "type": "number",	"editable": false, "nullable": false },
                "nombreRama": { "type": "string",	"editable": false, "nullable": false },
                "intervaloCambioDisp": { "type": "number",	"editable": false, "nullable": false },
                "disponibilidadRama": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "numRama", "title": "Número Rama", "sortable": true, "filterable": true},
			{ "field": "nombreRama", "title": "Nombre Rama", "sortable": true, "filterable": true},
            { "field": "intervaloCambioDisp", "title": "Intervalo Cambio Disponibilidad", "sortable": true, "filterable": false},
            { "field": "disponibilidadRama", "title": "Disponibilidad", "sortable": true, "filterable": false}
		]
    },
    {
        "nombre":"GRUPOSRAMAS_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "GRUPOSRAMAS_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numGrupoRamas": { "type": "number",	"editable": false, "nullable": false },
                "nombreGrupoRamas": { "type": "string",	"editable": false, "nullable": false },
                "bandera": { "type": "number",	"editable": false, "nullable": false },
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false},
            { "field": "numGrupoRamas", "title": "Número Grupo Ramas", "sortable": true, "filterable": true},
			{ "field": "nombreGrupoRamas", "title": "Nombre Grupo Ramas", "sortable": true, "filterable": true},
            { "field": "bandera", "title": "Bandera", "sortable": true, "filterable": false},
		]
    },
    {
        "nombre":"GRUPOSRAMASLIM_DERS.csv",
        "editable": true,
        "algDep": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "GRUPOSRAMASLIM_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt1": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt1": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt2": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt2": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt3": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt3": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt4": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt4": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt5": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt5": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt6": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt6": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt7": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt7": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt8": { "type": "number",	"editable": false, "nullable": false },
                "flujoMaxGpoInt8": { "type": "number",	"editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "flujoMinGpoInt1", "title": "Flujo Mín Int 1", "sortable": true, "filterable": true, "width": "10vw", "intervalo":1 },
			{ "field": "flujoMaxGpoInt1", "title": "Flujo Max Int 1", "sortable": true, "filterable": true, "width": "10vw", "intervalo":1 },
            { "field": "flujoMinGpoInt2", "title": "Flujo Mín Int 2", "sortable": true, "filterable": true, "width": "10vw", "intervalo":2 },
			{ "field": "flujoMaxGpoInt2", "title": "Flujo Max Int 2", "sortable": true, "filterable": true, "width": "10vw", "intervalo":2 },
            { "field": "flujoMinGpoInt3", "title": "Flujo Mín Int 3", "sortable": true, "filterable": true, "width": "10vw", "intervalo":3 },
			{ "field": "flujoMaxGpoInt3", "title": "Flujo Max Int 3", "sortable": true, "filterable": true, "width": "10vw", "intervalo":3 },
            { "field": "flujoMinGpoInt4", "title": "Flujo Mín Int 4", "sortable": true, "filterable": true, "width": "10vw", "intervalo":4 },
			{ "field": "flujoMaxGpoInt4", "title": "Flujo Max Int 4", "sortable": true, "filterable": true, "width": "10vw", "intervalo":4 },
            { "field": "flujoMinGpoInt5", "title": "Flujo Mín Int 5", "sortable": true, "filterable": true, "width": "10vw", "intervalo":5 },
			{ "field": "flujoMaxGpoInt5", "title": "Flujo Max Int 5", "sortable": true, "filterable": true, "width": "10vw", "intervalo":5 },
            { "field": "flujoMinGpoInt6", "title": "Flujo Mín Int 6", "sortable": true, "filterable": true, "width": "10vw", "intervalo":6 },
			{ "field": "flujoMaxGpoInt6", "title": "Flujo Max Int 6", "sortable": true, "filterable": true, "width": "10vw", "intervalo":6 },
            { "field": "flujoMinGpoInt7", "title": "Flujo Mín Int 7", "sortable": true, "filterable": true, "width": "10vw", "intervalo":7 },
			{ "field": "flujoMaxGpoInt7", "title": "Flujo Max Int 7", "sortable": true, "filterable": true, "width": "10vw", "intervalo":7 },
            { "field": "flujoMinGpoInt8", "title": "Flujo Mín Int 8", "sortable": true, "filterable": true, "width": "10vw", "intervalo":8 },
			{ "field": "flujoMaxGpoInt8", "title": "Flujo Max Int 8", "sortable": true, "filterable": true, "width": "10vw", "intervalo":8 },
		]
    },
    {
        "nombre":"ELEGRURAM_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "ELEGRURAM_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombreElem": { "type": "string", "editable": false, "nullable": false },
                "indiceRama": { "type": "number", "editable": false, "nullable": false },
                "nombreNodoOrigenRama": { "type": "string",	"editable": false, "nullable": false },
                "indiceNodoOrigenRama": { "type": "number",	"editable": false, "nullable": false },
                "nombreNodoDestinoRama": { "type": "string", "editable": false, "nullable": false },
                "indiceNodoDestinoRama": { "type": "number", "editable": false, "nullable": false },
                "nombreGrupoRamaRest": { "type": "string",	"editable": false, "nullable": false },
                "indiceGrupoRamaRest": { "type": "number",	"editable": false, "nullable": false },
                "sentidoAportacion": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombreElem", "title": "Nombre Elemento", "sortable": true, "filterable": true, "width": "12vw"},
			{ "field": "indiceRama", "title": "Índice Rama", "sortable": true, "filterable": false, "width": "8vw"},
            { "field": "nombreNodoOrigenRama", "title": "Nombre Nodo Origen", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "indiceNodoOrigenRama", "title": "Índice Nodo Origen", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "nombreNodoDestinoRama", "title": "Nombre Nodo Destino", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "indiceNodoDestinoRama", "title": "Índice Nodo Destino", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "nombreGrupoRamaRest", "title": "Nombre Grupo Rama", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "indiceGrupoRamaRest", "title": "Índice Grupo Rama Rest", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "sentidoAportacion", "title": "Sentido Aportación", "sortable": true, "filterable": true, "width": "15vw"}
		]
    },

    // DEMANDA
    {
        "nombre":"CARGAS_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "CARGAS_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombreCp": { "type": "string", "editable": false, "nullable": false },
                "propiedad": { "type": "string", "editable": false, "nullable": false },
                "tipo": { "type": "string",	"editable": false, "nullable": false },
                "numeroNodoAsoc": { "type": "number",	"editable": false, "nullable": false },
                "banderaNodoDis": { "type": "number", "editable": false, "nullable": false },
                "indiceDisCarga": { "type": "number", "editable": false, "nullable": false },
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombreCp", "title": "Nombre Carga", "sortable": true, "filterable": true, "width": "12vw"},
			{ "field": "propiedad", "title": "Propiedad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "tipo", "title": "Tipo", "sortable": true, "filterable": true, "width": "8vw"},
            { "field": "numeroNodoAsoc", "title": "Número Nodo Asociado", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "banderaNodoDis", "title": "Bandera Nodo Distribución", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "indiceDisCarga", "title": "Índice de factor de distribución de carga", "sortable": true, "filterable": true, "width": "15vw"},
		]
    },
    {
        "nombre":"NODOSCAR_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "NODOSCAR_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P1": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P2": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P3": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P4": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P5": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P6": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P7": { "type": "number", "editable": false, "nullable": false },
                "NODO_CARGA_P8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P1", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 1},
			{ "field": "NODO_CARGA_P1", "title": "Nodo Carga P2", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 2},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P3", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 3},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P4", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 4},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P5", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 5},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P6", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 6},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P7", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 7},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P8", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 8}
		]
    },
    {
        "nombre":"PRODEM_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "PRODEM_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "prodemP1": { "type": "number", "editable": true, "nullable": false },
                "prodemP2": { "type": "number", "editable": true, "nullable": false },
                "prodemP3": { "type": "number", "editable": true, "nullable": false },
                "prodemP4": { "type": "number", "editable": true, "nullable": false },
                "prodemP5": { "type": "number", "editable": true, "nullable": false },
                "prodemP6": { "type": "number", "editable": true, "nullable": false },
                "prodemP7": { "type": "number", "editable": true, "nullable": false },
                "prodemP8": { "type": "number", "editable": true, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "prodemP1", "title": "Pronóstico P1", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 1},
			{ "field": "prodemP2", "title": "Pronóstico P2", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 2},
            { "field": "prodemP3", "title": "Pronóstico P3", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 3},
            { "field": "prodemP4", "title": "Pronóstico P4", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 4},
            { "field": "prodemP5", "title": "Pronóstico P5", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 5},
            { "field": "prodemP6", "title": "Pronóstico P6", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 6},
            { "field": "prodemP7", "title": "Pronóstico P7", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 7},
            { "field": "prodemP8", "title": "Pronóstico P8", "sortable": true, "filterable": true, "width": "15vw", "intervalo": 8}
		]
    },

    // RANGO CONTINUO

    {
        "nombre":"UNITRC_DERS.csv",
        "editable": false,
        "unidades": true,
        "campos": [
            {"nombre":"NOMBRE_UNIDAD", "tipo":"TEXT"},
            {"nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            {"nombre":"PROPIEDAD", "tipo":"TEXT"},
            {"nombre":"PARTICIPANTE", "tipo":"TEXT"},
            {"nombre":"NODO_ASOCIADO", "tipo":"REAL"},
            {"nombre":"AREA", "tipo":"REAL"},
            {"nombre":"BANDERA_NODO_DIST", "tipo":"REAL"},
            {"nombre":"INDICE_ARCHIVO_FDG", "tipo":"REAL"},
            {"nombre":"NUM_COMP", "tipo":"REAL"},
            {"nombre":"NUM_MAX_PAROS", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"CGMRC_DERS.csv",
        "editable": true,
        "campos":[
            {"nombre":"COSTO_GENMIN_P1", "tipo":"REAL"},
            {"nombre":"COSTO_GENMIN_P2", "tipo":"REAL"},
            {"nombre":"COSTO_GENMIN_P3", "tipo":"REAL"},
            {"nombre":"COSTO_GENMIN_P4", "tipo":"REAL"},
            {"nombre":"COSTO_GENMIN_P5", "tipo":"REAL"},
            {"nombre":"COSTO_GENMIN_P6", "tipo":"REAL"},
            {"nombre":"COSTO_GENMIN_P7", "tipo":"REAL"},
            {"nombre":"COSTO_GENMIN_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"POTVERC_DERS.csv",
        "editable": true,
        "campos":[
            {"nombre":"POT_VENTA_P1", "tipo":"REAL"},
            {"nombre":"POT_VENTA_P2", "tipo":"REAL"},
            {"nombre":"POT_VENTA_P3", "tipo":"REAL"},
            {"nombre":"POT_VENTA_P4", "tipo":"REAL"},
            {"nombre":"POT_VENTA_P5", "tipo":"REAL"},
            {"nombre":"POT_VENTA_P6", "tipo":"REAL"},
            {"nombre":"POT_VENTA_P7", "tipo":"REAL"},
            {"nombre":"POT_VENTA_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv",
         "segmentos_unidades":11
    },
    {
        "nombre":"PREVERC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_VENTA_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTA_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTA_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTA_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTA_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTA_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTA_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTA_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv",
         "segmentos_unidades":11
    },
    {
        "nombre":"LIUNITRC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_INFERIOR_P1", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P2", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P3", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P4", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P5", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P6", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P7", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"LSUNITRC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_SUPERIOR_P1", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPERIOR_P2", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPERIOR_P3", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPERIOR_P4", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPERIOR_P5", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPERIOR_P6", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPERIOR_P7", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPERIOR_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"PLNOPRDERS.csv",
        "unidades": true,
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_UNIDAD", "tipo":"REAL"},
            { "nombre":"TIPO_UNIDAD", "tipo":"REAL"},
            { "nombre":"PROPIEDAD", "tipo":"REAL"},
            { "nombre":"PARTICIPANTE", "tipo":"REAL"},
            { "nombre":"NUMERO_NODO", "tipo":"TEXT"},
            { "nombre":"BANDERA_NODO_DIST", "tipo":"TEXT"},
            { "nombre":"INDICE_ARCHIVO_FDG", "tipo":"TEXT"},
            { "nombre":"NUM_COMP", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"POTPLNOPR_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POTENCIA_P1", "tipo":"TEXT"},
            { "nombre":"POTENCIA_P2", "tipo":"TEXT"},
            { "nombre":"POTENCIA_P3", "tipo":"TEXT"},
            { "nombre":"POTENCIA_P4", "tipo":"TEXT"},
            { "nombre":"POTENCIA_P5", "tipo":"TEXT"},
            { "nombre":"POTENCIA_P6", "tipo":"TEXT"},
            { "nombre":"POTENCIA_P7", "tipo":"TEXT"},
            { "nombre":"POTENCIA_P8", "tipo":"TEXT"}
        ],
        "origen_unidades":"PLNOPRDERS.csv"
    },
    {
        "nombre":"UNITRCCI_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ESTADO", "tipo":"REAL"},
            { "nombre":"NUM_PERIODOS_CONDINI", "tipo":"REAL"},
            { "nombre":"GENERACION_CONDINI", "tipo":"REAL"},
            { "nombre":"NUMPAROS_AL_DIA", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"OPPARORC_DERS.csv",
        "editable": true,
        "origen_unidades":"UNITRC_DERS.csv"
        // NO EXISTE BD
    },
    {
        "nombre":"ASIGNRC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIG_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"ARRARC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_SINC_MW", "tipo":"REAL"},
            { "nombre":"POT_SINC_RNR10M_MW", "tipo":"REAL"},
            { "nombre":"POT_SINC_RNRS_MW", "tipo":"REAL"},
            { "nombre":"RAM_SUBIDA", "tipo":"REAL"},
            { "nombre":"NUM_PERIODOS", "tipo":"REAL"},
            { "nombre":"COSTO_ARRANQUE_UNICO", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"RAMPASRC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"RAMPA_SUBIDA_OP", "tipo":"REAL"},
            { "nombre":"RAMPA_BAJADA_OP", "tipo":"REAL"},
            { "nombre":"RAMPA_EMERGENCIA", "tipo":"REAL"},
            { "nombre":"RAMPA_REGULACION", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP1", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP1", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP2", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP2", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP3", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP3", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP4", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP4", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"POTRESRO10RC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_ROD_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"PRERESRO10RC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_ROD_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"POTRESNR10RC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NROD_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"PRERESNR10RC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NROD_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"POTRESROSURC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_RODSUP_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"PRERESROSURC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_RODSUP_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"POTRESNRSURC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"PRERESNRSURC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"POTRESRESERC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"PRERESRESERC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_REGSEC_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"ZONASRESURC_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"UNIDAD_ZONA1", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA2", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA3", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA4", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA5", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA6", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA7", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA8", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA9", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA10", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"RRERO10Z_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RESROD10M_P1", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10M_P2", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10M_P3", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10M_P4", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10M_P5", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10M_P6", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10M_P7", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10M_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRERO10Z_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RESROD10M_P1", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P2", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P3", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P4", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P5", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P6", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P7", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RRE10Z_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RES10M_P1", "tipo":"TEXT"},
            { "nombre":"REQ_RES10M_P2", "tipo":"TEXT"},
            { "nombre":"REQ_RES10M_P3", "tipo":"TEXT"},
            { "nombre":"REQ_RES10M_P4", "tipo":"TEXT"},
            { "nombre":"REQ_RES10M_P5", "tipo":"TEXT"},
            { "nombre":"REQ_RES10M_P6", "tipo":"TEXT"},
            { "nombre":"REQ_RES10M_P7", "tipo":"TEXT"},
            { "nombre":"REQ_RES10M_P8", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"PRE10Z_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RES10M_P1", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P2", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P3", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P4", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P5", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P6", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P7", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RRESUZ_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RESSUP_P1", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P2", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P3", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P4", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P5", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P6", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P7", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRESUZ_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RESSUP_P1", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P2", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P3", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P4", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P5", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P6", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P7", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RRERESEZ_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RESREGSEC_P1", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P2", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P3", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P4", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P5", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P6", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P7", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRERESEZ_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RESREGSEC_P1", "tipo":"REAL"},
            { "nombre":"PRE_RESREGSEC_P2", "tipo":"REAL"},
            { "nombre":"PRE_RESREGSEC_P3", "tipo":"REAL"},
            { "nombre":"PRE_RESREGSEC_P4", "tipo":"REAL"},
            { "nombre":"PRE_RESREGSEC_P5", "tipo":"REAL"},
            { "nombre":"PRE_RESREGSEC_P6", "tipo":"REAL"},
            { "nombre":"PRE_RESREGSEC_P7", "tipo":"REAL"},
            { "nombre":"PRE_RESREGSEC_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RRERO10S_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RESROD10MIN_P1", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10MIN_P2", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10MIN_P3", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10MIN_P4", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10MIN_P5", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10MIN_P6", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10MIN_P7", "tipo":"REAL"},
            { "nombre":"REQ_RESROD10MIN_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRERO10S_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RESROD10M_P1", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P2", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P3", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P4", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P5", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P6", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P7", "tipo":"REAL"},
            { "nombre":"PRE_RESROD10M_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RRE10S_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RES10M_P1", "tipo":"REAL"},
            { "nombre":"REQ_RES10M_P2", "tipo":"REAL"},
            { "nombre":"REQ_RES10M_P3", "tipo":"REAL"},
            { "nombre":"REQ_RES10M_P4", "tipo":"REAL"},
            { "nombre":"REQ_RES10M_P5", "tipo":"REAL"},
            { "nombre":"REQ_RES10M_P6", "tipo":"REAL"},
            { "nombre":"REQ_RES10M_P7", "tipo":"REAL"},
            { "nombre":"REQ_RES10M_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRE10S_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RES10M_P1", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P2", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P3", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P4", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P5", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P6", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P7", "tipo":"REAL"},
            { "nombre":"PRE_RES10M_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RRESUS_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RESSUP_P1", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P2", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P3", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P4", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P5", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P6", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P7", "tipo":"REAL"},
            { "nombre":"REQ_RESSUP_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRESUS_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RESSUP_P1", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P2", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P3", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P4", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P5", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P6", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P7", "tipo":"REAL"},
            { "nombre":"PRE_RESSUP_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RRERESES_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"REQ_RESREGSEC_P1", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P2", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P3", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P4", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P5", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P6", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P7", "tipo":"REAL"},
            { "nombre":"REQ_RESREGSEC_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRERESES_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRE_RESREGSEC_P1", "tipo":"TEXT"},
            { "nombre":"PRE_RESREGSEC_P2", "tipo":"TEXT"},
            { "nombre":"PRE_RESREGSEC_P3", "tipo":"TEXT"},
            { "nombre":"PRE_RESREGSEC_P4", "tipo":"TEXT"},
            { "nombre":"PRE_RESREGSEC_P5", "tipo":"TEXT"},
            { "nombre":"PRE_RESREGSEC_P6", "tipo":"TEXT"},
            { "nombre":"PRE_RESREGSEC_P7", "tipo":"TEXT"},
            { "nombre":"PRE_RESREGSEC_P8", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"NOINPADERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NOD_INTERCAMBIO", "tipo":"REAL"},
            { "nombre":"POT_ACT_P1", "tipo":"REAL"},
            { "nombre":"POT_ACT_P2", "tipo":"REAL"},
            { "nombre":"POT_ACT_P3", "tipo":"REAL"},
            { "nombre":"POT_ACT_P4", "tipo":"REAL"},
            { "nombre":"POT_ACT_P5", "tipo":"REAL"},
            { "nombre":"POT_ACT_P6", "tipo":"REAL"},
            { "nombre":"POT_ACT_P7", "tipo":"REAL"},
            { "nombre":"POT_ACT_P8", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"EMBALSES_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_EMBALSE", "tipo":"TEXT"},
            { "nombre":"NIVEL", "tipo":"REAL"},
            { "nombre":"NAMINO", "tipo":"REAL"},
            { "nombre":"NUM_VIAS_DIVERGENTES", "tipo":"TEXT"},
            { "nombre":"NUM_VIAS_CONVERGENTES", "tipo":"TEXT"},
            { "nombre":"VOLUMEN", "tipo":"REAL"},
            { "nombre":"ELEVACION", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PLAHDERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_PLANTA", "tipo":"TEXT"},
            { "nombre":"NUMERO_VIA_AGUA", "tipo":"TEXT"},
            { "nombre":"NUMERO_EMBALSE", "tipo":"TEXT"},
            { "nombre":"NUMERO_UNIDADES", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"UNIHDERS.csv",
        "unidades": true,
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_UNIDAD", "tipo":"TEXT"},
            { "nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            { "nombre":"MODELO", "tipo":"TEXT"},
            { "nombre":"PROPIEDAD", "tipo":"TEXT"},
            { "nombre":"DUEÑO", "tipo":"TEXT"},
            { "nombre":"NUMERO_NODO_ASOC", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"LIUNIH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIM_INF_P1", "tipo":"REAL"},
            { "nombre":"LIM_INF_P2", "tipo":"REAL"},
            { "nombre":"LIM_INF_P3", "tipo":"REAL"},
            { "nombre":"LIM_INF_P4", "tipo":"REAL"},
            { "nombre":"LIM_INF_P5", "tipo":"REAL"},
            { "nombre":"LIM_INF_P6", "tipo":"REAL"},
            { "nombre":"LIM_INF_P7", "tipo":"REAL"},
            { "nombre":"LIM_INF_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"LSUNIH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIM_SUP_P1", "tipo":"REAL"},
            { "nombre":"LIM_SUP_P2", "tipo":"REAL"},
            { "nombre":"LIM_SUP_P3", "tipo":"REAL"},
            { "nombre":"LIM_SUP_P4", "tipo":"REAL"},
            { "nombre":"LIM_SUP_P5", "tipo":"REAL"},
            { "nombre":"LIM_SUP_P6", "tipo":"REAL"},
            { "nombre":"LIM_SUP_P7", "tipo":"REAL"},
            { "nombre":"LIM_SUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"ASIGNH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIG_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"UNIHCI_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ESTADO", "tipo":"REAL"},
            { "nombre":"NUM_PERIODOS_CONDINI", "tipo":"REAL"},
            { "nombre":"GENERACION_CONDINI", "tipo":"REAL"},
            { "nombre":"X", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"RAMPASH.csv",
        "editable": true,
        "campos":[
            { "nombre":"RAMPA_EMERGENCIA", "tipo":"REAL"},
            { "nombre":"RAMPA_REGULACION", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP1", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP1", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP2", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP2", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP3", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP3", "tipo":"REAL"},
            { "nombre":"LIM_MIN_ZONAP4", "tipo":"REAL"},
            { "nombre":"LIM_MAX_ZONAP4", "tipo":"REAL"}
        ]

    },
    {
        "nombre":"COSTOPHID_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"COSTO_OP_P1", "tipo":"REAL"},
            { "nombre":"COSTO_OP_P2", "tipo":"REAL"},
            { "nombre":"COSTO_OP_P3", "tipo":"REAL"},
            { "nombre":"COSTO_OP_P4", "tipo":"REAL"},
            { "nombre":"COSTO_OP_P5", "tipo":"REAL"},
            { "nombre":"COSTO_OP_P6", "tipo":"REAL"},
            { "nombre":"COSTO_OP_P7", "tipo":"REAL"},
            { "nombre":"COSTO_OP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESRO10H_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_ROD_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESRO10H_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_ROD_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESROSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_RODSUP_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESROSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_RODSUP_P1", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_RODSUP_P2", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_RODSUP_P3", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_RODSUP_P4", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_RODSUP_P5", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_RODSUP_P6", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_RODSUP_P7", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_RODSUP_P8", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESRESEH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_REGSEC_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_REGSEC_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_REGSEC_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_REGSEC_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_REGSEC_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_REGSEC_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_REGSEC_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_REGSEC_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESRESEH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_REGSEC_P1", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_REGSEC_P2", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_REGSEC_P3", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_REGSEC_P4", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_REGSEC_P5", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_REGSEC_P6", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_REGSEC_P7", "tipo":"TEXT"},
            { "nombre":"PRECIO_RES_REGSEC_P8", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESNR10H_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NROD_P1", "tipo":"TEXT"},
            { "nombre":"POT_RES_NROD_P2", "tipo":"TEXT"},
            { "nombre":"POT_RES_NROD_P3", "tipo":"TEXT"},
            { "nombre":"POT_RES_NROD_P4", "tipo":"TEXT"},
            { "nombre":"POT_RES_NROD_P5", "tipo":"TEXT"},
            { "nombre":"POT_RES_NROD_P6", "tipo":"TEXT"},
            { "nombre":"POT_RES_NROD_P7", "tipo":"TEXT"},
            { "nombre":"POT_RES_NROD_P8", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESNR10H_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NROD_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESNRSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESNRSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"LIMENEREMB_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIM_MIN_EN", "tipo":"REAL"},
            { "nombre":"LIM_MAX_EN", "tipo":"REAL"},
            { "nombre":"RESTRICCION", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"ZONASRESUH_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"UNIDAD_ZONA1", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA2", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA3", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA4", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA5", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA6", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA7", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA8", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA9", "tipo":"REAL"},
            { "nombre":"UNIDAD_ZONA10", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"UNITRD_DERS.csv",
        "unidades": true,
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_UNIDAD", "tipo":"TEXT"},
            { "nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            { "nombre":"PROPIEDAD", "tipo":"TEXT"},
            { "nombre":"PARTICIPANTE", "tipo":"TEXT"},
            { "nombre":"NUMERO_COMPONENTES", "tipo":"REAL"},
            { "nombre":"NUM_COMP1", "tipo":"REAL"},
            { "nombre":"NUM_COMP2", "tipo":"REAL"},
            { "nombre":"NUM_COMP3", "tipo":"REAL"},
            { "nombre":"NUM_COMP4", "tipo":"REAL"},
            { "nombre":"NUM_COMP5", "tipo":"REAL"},
            { "nombre":"NUM_COMP6", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"COMPOURD_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_COMP", "tipo":"TEXT"},
            { "nombre":"TIPO_COMP", "tipo":"TEXT"},
            { "nombre":"NODO_ASOC", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"TRANSRD_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"MODO_OP1", "tipo":"TEXT"},
            { "nombre":"MODO_OP2", "tipo":"TEXT"},
            { "nombre":"MODO_OP3", "tipo":"TEXT"},
            { "nombre":"MODO_OP4", "tipo":"TEXT"},
            { "nombre":"MODO_OP5", "tipo":"TEXT"},
            { "nombre":"MODO_OP6", "tipo":"TEXT"},
            { "nombre":"MODO_OP7", "tipo":"TEXT"},
            { "nombre":"MODO_OP8", "tipo":"TEXT"},
            { "nombre":"MODO_OP9", "tipo":"TEXT"},
            { "nombre":"MODO_OP10", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"CGMRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"COSTO_GENMINMOD_P1", "tipo":"REAL"},
            { "nombre":"COSTO_GENMINMOD_P2", "tipo":"REAL"},
            { "nombre":"COSTO_GENMINMOD_P3", "tipo":"REAL"},
            { "nombre":"COSTO_GENMINMOD_P4", "tipo":"REAL"},
            { "nombre":"COSTO_GENMINMOD_P5", "tipo":"REAL"},
            { "nombre":"COSTO_GENMINMOD_P6", "tipo":"REAL"},
            { "nombre":"COSTO_GENMINMOD_P7", "tipo":"REAL"},
            { "nombre":"COSTO_GENMINMOD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"POTVERD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_VENTASEGMOD_P1", "tipo":"REAL"},
            { "nombre":"POT_VENTASEGMOD_P2", "tipo":"REAL"},
            { "nombre":"POT_VENTASEGMOD_P3", "tipo":"REAL"},
            { "nombre":"POT_VENTASEGMOD_P4", "tipo":"REAL"},
            { "nombre":"POT_VENTASEGMOD_P5", "tipo":"REAL"},
            { "nombre":"POT_VENTASEGMOD_P6", "tipo":"REAL"},
            { "nombre":"POT_VENTASEGMOD_P7", "tipo":"REAL"},
            { "nombre":"POT_VENTASEGMOD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv",
        "segmentos_unidades": 3
    },
    {
        "nombre":"PREVERD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_VENTASEGMOD_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTASEGMOD_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTASEGMOD_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTASEGMOD_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTASEGMOD_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTASEGMOD_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTASEGMOD_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_VENTASEGMOD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv",
        "segmentos_unidades": 3
    },
    {
        "nombre":"LIUNITRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_INFGENMOD_P1", "tipo":"REAL"},
            { "nombre":"LIMITE_INFGENMOD_P2", "tipo":"REAL"},
            { "nombre":"LIMITE_INFGENMOD_P3", "tipo":"REAL"},
            { "nombre":"LIMITE_INFGENMOD_P4", "tipo":"REAL"},
            { "nombre":"LIMITE_INFGENMOD_P5", "tipo":"REAL"},
            { "nombre":"LIMITE_INFGENMOD_P6", "tipo":"REAL"},
            { "nombre":"LIMITE_INFGENMOD_P7", "tipo":"REAL"},
            { "nombre":"LIMITE_INFGENMOD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"LSUNITRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_SUPGENMOD_P1", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPGENMOD_P2", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPGENMOD_P3", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPGENMOD_P4", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPGENMOD_P5", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPGENMOD_P6", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPGENMOD_P7", "tipo":"REAL"},
            { "nombre":"LIMITE_SUPGENMOD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"UNITRDCI_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"NOMBRE_UNIDAD", "tipo":"TEXT"},
            { "nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            { "nombre":"PROPIEDAD", "tipo":"TEXT"},
            { "nombre":"PARTICIPANTE", "tipo":"TEXT"},
            { "nombre":"NUMERO_COMPONENTES", "tipo":"REAL"},
            { "nombre":"NUM_COMP1", "tipo":"REAL"},
            { "nombre":"NUM_COMP2", "tipo":"REAL"},
            { "nombre":"NUM_COMP3", "tipo":"REAL"},
            { "nombre":"NUM_COMP4", "tipo":"REAL"},
            { "nombre":"NUM_COMP5", "tipo":"REAL"},
            { "nombre":"NUM_COMP6", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"ARRARD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_SINC_MW", "tipo":"REAL"},
            { "nombre":"POT_SINC_RNRS_MW", "tipo":"REAL"},
            { "nombre":"POT_SINC_RNR10M_MW", "tipo":"REAL"},
            { "nombre":"RAMPA_SUB_SINC", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"TMINMODRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"TIEMPO_MIN_OP1", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP2", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP3", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP4", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP5", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP6", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP7", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP8", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP9", "tipo":"REAL"},
            { "nombre":"TIEMPO_MIN_OP10", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"TIETRANSRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"TIEMPO_TRMODO1", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO2", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO3", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO4", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO5", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO6", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO7", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO8", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO9", "tipo":"REAL"},
            { "nombre":"TIEMPO_TRMODO10", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"COSTRANSRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"COSTO_TRANS_MOD1", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO2", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO3", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO4", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO5", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO6", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO7", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO8", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO9", "tipo":"TEXT"},
            { "nombre":"COSTO_ARRANQUE_MODO10", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"ASIGNRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIGMOD_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"ASIGMOD_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"ASIGMOD_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"ASIGMOD_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"ASIGMOD_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"ASIGMOD_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"ASIGMOD_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"ASIGMOD_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"RAMPASRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"RAMPA_SUBIDA_OP", "tipo":"REAL"},
            { "nombre":"RAMPA_BAJADA_OP", "tipo":"REAL"},
            { "nombre":"RAMPA_EMERGENCIA", "tipo":"REAL"},
            { "nombre":"RAMPA_REGULACION", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },

    {
        "nombre":"POTRESRO10RD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_ROD_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_ROD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"PRERESRO10RD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_ROD_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_ROD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"POTRESROSURD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_RODSUP_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_RODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"PRERESROSURD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_RODSUP_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_RODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"POTRESRESERD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"PRERESRESERD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_REGSEC_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_REGSEC_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"POTRESNR10RD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NROD_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_NROD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"PRERESNR10RD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NROD_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NROD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"POTRESNRSURD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"POT_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"PRERESNRSURD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NRODSUP_P1", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P2", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P3", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P4", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P5", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P6", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P7", "tipo":"REAL"},
            { "nombre":"PRECIO_RES_NRODSUP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"ZONASRESURD_DERS.csv",
        "editable": false,
        "origen_unidades":"UNITRD_DERS.csv"
        // FALTA TABLA BD
    },
    {
        "nombre":"COMPXMODO_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"COMP_XMODO_OP1", "tipo":"REAL"},
            { "nombre":"COMP_XMODO_OP2", "tipo":"REAL"},
            { "nombre":"COMP_XMODO_OP3", "tipo":"REAL"},
            { "nombre":"COMP_XMODO_OP4", "tipo":"REAL"},
            { "nombre":"COMP_XMODO_OP5", "tipo":"REAL"},
            { "nombre":"COMP_XMODO_OP6", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"GECOXMOD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"FRAC_GEN_OP1", "tipo":"REAL"},
            { "nombre":"FRAC_GEN_OP2", "tipo":"REAL"},
            { "nombre":"FRAC_GEN_OP3", "tipo":"REAL"},
            { "nombre":"FRAC_GEN_OP4", "tipo":"REAL"},
            { "nombre":"FRAC_GEN_OP5", "tipo":"REAL"},
            { "nombre":"FRAC_GEN_OP6", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"UNITRE_DERS.csv",
        "unidades": true,
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_UNIDAD", "tipo":"TEXT"},
            { "nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            { "nombre":"PROPIEDAD", "tipo":"TEXT"},
            { "nombre":"PROPIETARIO", "tipo":"TEXT"},
            { "nombre":"NUMERO_NODO", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"POTVERE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_VENTA_P1", "tipo":"REAL"},
            { "nombre":"POT_VENTA_P2", "tipo":"REAL"},
            { "nombre":"POT_VENTA_P3", "tipo":"REAL"},
            { "nombre":"POT_VENTA_P4", "tipo":"REAL"},
            { "nombre":"POT_VENTA_P5", "tipo":"REAL"},
            { "nombre":"POT_VENTA_P6", "tipo":"REAL"},
            { "nombre":"POT_VENTA_P7", "tipo":"REAL"},
            { "nombre":"POT_VENTA_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv",
        "segmentos_unidades":3
    },
    {
        "nombre":"PREVERE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_VENTA_P1", "tipo":"TEXT"},
            { "nombre":"PRECIO_VENTA_P2", "tipo":"TEXT"},
            { "nombre":"PRECIO_VENTA_P3", "tipo":"TEXT"},
            { "nombre":"PRECIO_VENTA_P4", "tipo":"TEXT"},
            { "nombre":"PRECIO_VENTA_P5", "tipo":"TEXT"},
            { "nombre":"PRECIO_VENTA_P6", "tipo":"TEXT"},
            { "nombre":"PRECIO_VENTA_P7", "tipo":"TEXT"},
            { "nombre":"PRECIO_VENTA_P8", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNITRE_DERS.csv",
        "segmentos_unidades":3
    },
    {
        "nombre":"LIUNITRE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_INFERIOR_P1", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P2", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P3", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P4", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P5", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P6", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P7", "tipo":"REAL"},
            { "nombre":"LIMITE_INFERIOR_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
    },
    {
        "nombre":"LSUNITRE_DERS.csv",
        "editable": true,
        "origen_unidades":"UNITRE_DERS.csv"
        // FALTA TABLA BD
    },
    {
        "nombre":"ASIGNRE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIG_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"ASIG_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
    },
    {
        "nombre":"GPOUTER_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NUM_GRUPO", "tipo":"REAL"},
            { "nombre":"NOMBRE_GRUPO", "tipo":"TEXT"},
            { "nombre":"LIM_INF_GRUPO", "tipo":"REAL"},
            { "nombre":"LIM_SUP_GRUPO", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"GPORC_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"UNIDAD_GRUPO1", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO2", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO3", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO4", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO5", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO6", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO7", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO8", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO9", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO10", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO11", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO12", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO13", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO14", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO15", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO16", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO17", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO18", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO19", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO20", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO21", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO22", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO23", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO24", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO25", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO26", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO27", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO28", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO29", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO30", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO31", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO32", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO33", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO34", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO35", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO36", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO37", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO38", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO39", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO40", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO41", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO42", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO43", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO44", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO45", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO46", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO47", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO48", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO49", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO50", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO51", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO52", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO53", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO54", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO55", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO56", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO57", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO58", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO59", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO60", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"GPORD_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"UNIDAD_GRUPO1", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO2", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO3", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO4", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO5", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO6", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO7", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO8", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO9", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO10", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO11", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO12", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO13", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO14", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO15", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO16", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO17", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO18", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO19", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO20", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO21", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO22", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO23", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO24", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO25", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO26", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO27", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO28", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO29", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO30", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO31", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO32", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO33", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO34", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO35", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO36", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO37", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO38", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO39", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO40", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO41", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO42", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO43", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO44", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO45", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO46", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO47", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO48", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO49", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO50", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO51", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO52", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO53", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO54", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO55", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO56", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO57", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO58", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO59", "tipo":"REAL"},
            { "nombre":"UNIDAD_GRUPO60", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"RAMAS_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NUMERO", "tipo":"REAL"},
            { "nombre":"NOMBRE_RAMA", "tipo":"TEXT"},
            { "nombre":"INDICE_NODO_ORIGEN", "tipo":"REAL"},
            { "nombre":"NOMBRE_NODO_ORIGEN", "tipo":"TEXT"},
            { "nombre":"INDICE_NODO_DESTINO", "tipo":"REAL"},
            { "nombre":"NOMBRE_NODO_DESTINO", "tipo":"TEXT"},
            { "nombre":"RESISTENCIA", "tipo":"REAL"},
            { "nombre":"REACTANCIA", "tipo":"REAL"},
            { "nombre":"TIPO_RAMA", "tipo":"REAL"},
            { "nombre":"DISPONIBILIDAD_INICIAL", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"LMP_DERS_1.csv",
        "editable": true,
        // FALTA BD TABLA
    },
    {
        "nombre":"LMPGEN_DERS_1.csv",
        "editable": true,
        // FALTA BD TABLA
    },
    {
        "nombre":"LMPPER_DERS_1.csv",
        "editable": true,
        // FALTA BD TABLA
    },
    {
        "nombre":"LMPCON_DERS_1.csv",
        "editable": true,
        // FALTA BD TABLA
    },
    {
        "nombre":"PMR_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"PMRGEN_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"PMRPER_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"PMRCON_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"GRUPOSRAMASRES_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRERO10Z_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRE10Z_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRESUZ_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRERESEZ_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRESSIS_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESGEN_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESMODO_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESCSTOPARR_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRERO10U_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRENRO10U_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESREROSUU_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRENROSUU_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRERESEU_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESCARGAS_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"NODOSRC_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_UNIDAD_P1", "tipo":"TEXT"},
            { "nombre":"NODO_UNIDAD_P2", "tipo":"TEXT"},
            { "nombre":"NODO_UNIDAD_P3", "tipo":"TEXT"},
            { "nombre":"NODO_UNIDAD_P4", "tipo":"TEXT"},
            { "nombre":"NODO_UNIDAD_P5", "tipo":"TEXT"},
            { "nombre":"NODO_UNIDAD_P6", "tipo":"TEXT"},
            { "nombre":"NODO_UNIDAD_P7", "tipo":"TEXT"},
            { "nombre":"NODO_UNIDAD_P8", "tipo":"TEXT"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"NODOSPLNOPR_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_UNP_P1", "tipo":"REAL"},
            { "nombre":"NODO_UNP_P2", "tipo":"REAL"},
            { "nombre":"NODO_UNP_P3", "tipo":"REAL"},
            { "nombre":"NODO_UNP_P4", "tipo":"REAL"},
            { "nombre":"NODO_UNP_P5", "tipo":"REAL"},
            { "nombre":"NODO_UNP_P6", "tipo":"REAL"},
            { "nombre":"NODO_UNP_P7", "tipo":"REAL"},
            { "nombre":"NODO_UNP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"PLNOPRDERS.csv"
    },
    {
        "nombre":"NODOSINPA_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_INT1", "tipo":"REAL"},
            { "nombre":"NODO_INT2", "tipo":"REAL"},
            { "nombre":"NODO_INT3", "tipo":"REAL"},
            { "nombre":"NODO_INT4", "tipo":"REAL"},
            { "nombre":"NODO_INT5", "tipo":"REAL"},
            { "nombre":"NODO_INT6", "tipo":"REAL"},
            { "nombre":"NODO_INT7", "tipo":"REAL"},
            { "nombre":"NODO_INT8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"NODOSH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"NODO_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"NODOSCOMPOURD_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_COMP_P1", "tipo":"REAL"},
            { "nombre":"NODO_COMP_P2", "tipo":"REAL"},
            { "nombre":"NODO_COMP_P3", "tipo":"REAL"},
            { "nombre":"NODO_COMP_P4", "tipo":"REAL"},
            { "nombre":"NODO_COMP_P5", "tipo":"REAL"},
            { "nombre":"NODO_COMP_P6", "tipo":"REAL"},
            { "nombre":"NODO_COMP_P7", "tipo":"REAL"},
            { "nombre":"NODO_COMP_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"NODOSRE_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"NODO_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
    },
    {
        "nombre":"SEMAFOROSDERS.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"NODDISGEN.csv",
        "editable": false,
        "campos":[
            { "nombre":"INDICE", "tipo":"REAL"},
            { "nombre":"INDICE_NUMERADO", "tipo":"REAL"},
            { "nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            { "nombre":"CLV_UNIDAD", "tipo":"TEXT"},
            { "nombre":"NODDISGEN_P1", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P2", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P3", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P4", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P5", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P6", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P7", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"FACDISGEN.csv",
        "editable": false,
        "campos":[
            { "nombre":"INDICE", "tipo":"REAL"},
            { "nombre":"INDICE_NUMERADO", "tipo":"REAL"},
            { "nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            { "nombre":"CLV_UNIDAD", "tipo":"TEXT"},
            { "nombre":"NODDISGEN_P1", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P2", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P3", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P4", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P5", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P6", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P7", "tipo":"REAL"},
            { "nombre":"NODDISGEN_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"NODDISCAR1.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODDISCAR_P1", "tipo":"REAL"},
            { "nombre":"NODDISCAR_P2", "tipo":"REAL"},
            { "nombre":"NODDISCAR_P3", "tipo":"REAL"},
            { "nombre":"NODDISCAR_P4", "tipo":"REAL"},
            { "nombre":"NODDISCAR_P5", "tipo":"REAL"},
            { "nombre":"NODDISCAR_P6", "tipo":"REAL"},
            { "nombre":"NODDISCAR_P7", "tipo":"REAL"},
            { "nombre":"NODDISCAR_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"FACDISCAR1.csv",
        "editable": false,
        "campos":[
            { "nombre":"FACDISCAR_P1", "tipo":"REAL"},
            { "nombre":"FACDISCAR_P2", "tipo":"REAL"},
            { "nombre":"FACDISCAR_P3", "tipo":"REAL"},
            { "nombre":"FACDISCAR_P4", "tipo":"REAL"},
            { "nombre":"FACDISCAR_P5", "tipo":"REAL"},
            { "nombre":"FACDISCAR_P6", "tipo":"REAL"},
            { "nombre":"FACDISCAR_P7", "tipo":"REAL"},
            { "nombre":"FACDISCAR_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"ASIGN_AUTR_RC.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"DISPO_AUTR_RC.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"LSUNIT_AUTR_RC.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"LIUNIT_AUTR_RC.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"ASIGN_AUTR_RD.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"DISPO_AUTR_RD.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"LSUNIT_AUTR_RD.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"LIUNIT_AUTR_RD.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"ASIGN_AUTR_H.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"DISPO_AUTR_H.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"ASIGN_AUTR_RE.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"DISPO_AUTR_RE.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"UNIMARG_1.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"DERS_MI_TOTALES_1.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_ZONAS_RESERVA_SIN.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_SISTEMA_RESERVA_SIN.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_ENLACES_SIN.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_RAMAS_ENL_SIN.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_UNIDADES_SIN.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_REGIONES_SIN.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_NODOS_SIN.csv",
        "editable": false
        // FALTA TABLA BD
    },
    {
        "nombre":"COORDRC.csv",
        "editable": true,
        "campos":[
            { "nombre":"COORD_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"COORDRD.csv",
        "editable": true,
        "campos":[
            { "nombre":"COORD_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"COORDH.csv",
        "editable": true,
        "campos":[
            { "nombre":"COORD_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"COORD_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"DISPORC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P8", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"DISPOH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"DISPORD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
        // RENOMBRAR COLUMNAS EN BD
    },
    {
        "nombre":"DISPORE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P2", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P3", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P4", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P5", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P6", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P7", "tipo":"REAL"},
            { "nombre":"DISP_UNIDAD_P8", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
    },
    {
        "nombre":"RESUMEN_EJECUCION.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"RESUMEN_UNIDADES.csv",
        "editable": false
        // FALTA TABLA BD
    }
];
