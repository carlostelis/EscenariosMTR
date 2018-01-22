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
                "duracionMinuto": { "type": "number", "editable": false, "nullable": false },
                "tipoEjecucion": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
            { "field": "numPeriodos", "title": "Número Periodos", "sortable": true, "filterable": false},
			{ "field": "duracionMinuto", "title": "Duración Minuto", "sortable": true, "filterable": false},
            { "field": "tipoEjecucion", "title": "Tipo de Ejecución", "sortable": true, "filterable": false}
		]
    },
    {
        "nombre":"AUSUBSIS_DERS.csv",
        "unidades": true,
        "tagUnidad": "Subsistema",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "tieneCopia": true,
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
            { "field": "indiceZonaCarga", "title": "Índice Zona", "sortable": true, "filterable": false},
			{ "field": "subsistema", "title": "Subsistema", "sortable": true, "filterable": true},
            { "field": "nombreZc", "title": "Nombre Zona", "sortable": true, "filterable": false},
            { "field": "indiceEmsZc", "title": "Indice EMS", "sortable": true, "filterable": true}
		]
    },
    {
        "nombre":"ZONASRES_DERS.csv",
        "unidades":true,
        "tagUnidad": "Zona",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "tieneCopia": true,
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
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
                "precioMaximo": { "type": "number",	"editable": true, "nullable": false, "validation": { "format":"c", "decimals": 2, "min": 0, "max": 100000000}},
                "precioMinimo": { "type": "number", "editable": true, "nullable": false, "validation": { "format":"c", "decimals": 2, "min": 0, "max": 100000000}}
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
            { "field": "precioMaximo", "format": "{0:c2}", "title": "Precio Máximo ($/Mwh)", "sortable": true, "filterable": false},
			{ "field": "precioMinimo", "format": "{0:c2}", "title": "Precio Mínimo ($/Mwh)", "sortable": true, "filterable": false}
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
            { "field": "numeroNodo", "title": "Número Nodo", "sortable": true, "filterable": true},
			{ "field": "numeroNodoEms", "title": "Número Nodo EMS", "sortable": true, "filterable": true},
            { "field": "nombreNodo", "title": "Nombre de Nodo", "sortable": true, "filterable": true}
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
                "numFila": { "type": "number",	"editable": true, "nullable": false },
                "banderaParam": { "type": "number",	"editable": true, "nullable": false, "validation": { "format":"n", "decimals": 0, "min": 0, "max": 100000000} },
                "descripcion": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
            { "field": "banderaParam", "title": "Bandera Parámetro", "sortable": true, "filterable": true},
			{ "field": "descripcion", "title": "Descripción", "sortable": true, "filterable": true}
		],
        "registrosExcluir": [
            "Considerar Unidades de Rango Continuo ( 1 = si, 0 = no )",
            "Considerar Unidades de Rango Discontinuo ( 1 = si, 0 = no )",
            "Considerar Unidades Hidro ( 1 = si, 0 = no )",
            "Considerar Unidades Renovables ( 1 = si, 0 = no )",
            "Considerar Ofertas de demanda ( 1 = si, 0 = no )",
            "Considerar Ofertas de reserva ( 1 = si, 0 = no )",
            "Considerar Ofertas de compra de reserva por zona ( 1 = si, 0 = no )",
            "Considerar Ofertas de compra de reserva por sistema ( 1 = si, 0 = no )",
            "Considerar Ofertas de demandas controlables ( 1 = si, 0 = no )",
            "Considerar limitaciones de energia hidro ( 1 = si, 0 = no )",
            "Considerar limitaciones de energia termo ( 1 = si, 0 = no )",
            "Considerar limitaciones de transmision ( 1 = si, 0 = no )",
            "Considerar perdidas en transmision ( 1 = si, 0 = no )",
            "Usar Conjunto Activo para Transmision ( 1 = si, 0 = no )",
            "Considerar cortes de carga ( 1 = si, 0 = no )",
            "Considerar excedentes ( 1 = si, 0 = no )",
            "Considerar artificiales transmision ( 1 = si, 0 = no )",
            "Precio del excedente de energia",
            "Considerar bandas prohibidas ( 1 = si, 0 = no )"
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
        		"numBus": { "type": "number", "editable": false, "nullable": false },
        		"nombreBus": { "type": "string", "editable": false, "nullable": false },
        		"nombreBusAbrev": { "type": "string", "editable": false, "nullable": false },
        		"numArea": { "type": "number", "editable": false, "nullable": false },
        		"nombreArea": { "type": "string", "editable": false, "nullable": false },
        		"nombreAreaAbrev": { "type": "string", "editable": false, "nullable": false },
        		"tensionNominal": { "type": "number", "editable": false, "nullable": false },
        		"subsistemaElectrico": { "type": "string", "editable": false, "nullable": false },
        		"nombreRegionPrecios": { "type": "string", "editable": false, "nullable": false },
        		"nombreRegionPreciosAbrev": { "type": "string", "editable": false, "nullable": false },
        		"numRegPrecios": { "type": "number", "editable": false, "nullable": false },
        		"disponibilidadIniNodo": { "type": "number", "editable": false, "nullable": false },
        		"zonaCarga": { "type": "number", "editable": false, "nullable": false },
        		"nodoP": { "type": "number", "editable": false, "nullable": false }
        	}
        },
        "columnas": [
    		{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw" },
    		{ "field": "numBus", "title": "Número Bus", "sortable": true, "filterable": false, "width": "5vw" },
    		{ "field": "nombreBus", "title": "Nombre Bus", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreBusAbrev", "title": "Bus Abreviado", "sortable": true, "filterable": false, "width": "8vw" },
    		{ "field": "numArea", "title": "Área", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreArea", "title": "Nombre Área", "sortable": true, "filterable": true, "width": "10vw" },
    		{ "field": "nombreAreaAbrev", "title": "Área Abreviada", "sortable": true, "filterable": false, "width": "10vw" },
    		{ "field": "tensionNominal", "title": "Tensión Nominal", "format": "{0:n2}", "sortable": true, "filterable": true, "width": "10vw" },
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
        		"numNodo": { "type": "number", "editable": false, "nullable": false },
        		"nombreNodo": { "type": "string", "editable": false, "nullable": false },
        		"intervaloDis": { "type": "string", "editable": false, "nullable": false },
        		"disponibilidadNodo": { "type": "number", "editable": false, "nullable": false }
        	}
        },
        "columnas": [
    		{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw" },
    		{ "field": "numNodo", "title": "Número Nodo", "sortable": true, "filterable": false},
    		{ "field": "nombreNodo", "title": "Nombre Nodo", "sortable": true, "filterable": true},
    		{ "field": "intervaloDis", "title": "Intervalo Disponibilidad", "sortable": true, "filterable": false},
    		{ "field": "disponibilidadNodo", "title": "Disponibilidad Nodo", "sortable": true, "filterable": true}
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw" },
            { "field": "numRama", "title": "Número Rama", "sortable": true, "filterable": true, "width": "10vw" },
			{ "field": "nombreRama", "title": "Nombre Rama", "sortable": true, "filterable": true, "width": "10vw" },
            { "field": "indiceNodoOrigen", "title": "Índice Nodo Origen", "sortable": true, "filterable": false, "width": "10vw" },
            { "field": "nombreNodoOrigen", "title": "Nombre Nodo Origen", "sortable": true, "filterable": true, "width": "15vw" },
			{ "field": "indiceNodoDestino", "title": "Índice Nodo Destino", "sortable": true, "filterable": false, "width": "10vw" },
            { "field": "nombreNodoDestino", "title": "Nombre Nodo Destino", "sortable": true, "filterable": false, "width": "15vw" },
            { "field": "resistencia", "title": "Resistencia (pu)", "format": "{0:n2}", "sortable": true, "filterable": false, "width": "10vw" },
			{ "field": "reactancia", "title": "Reactancia (pu)", "format": "{0:n2}", "sortable": true, "filterable": false, "width": "10vw" },
            { "field": "tipoRama", "title": "Tipo Rama (1-línea, 2-transformador)", "sortable": true, "filterable": true, "width": "15vw" },
            { "field": "disponibilidadInicial", "title": "Disponibilidad Inicial", "sortable": true, "filterable": true, "width": "10vw" }
		]
    },
    {
        "nombre":"RAMASD_DERS.csv",
        "editable": false,
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
            { "field": "numRama", "title": "Número Rama", "sortable": true, "filterable": true},
			{ "field": "nombreRama", "title": "Nombre Rama", "sortable": true, "filterable": true},
            { "field": "intervaloCambioDisp", "title": "Intervalo Cambio Disponibilidad", "sortable": true, "filterable": false},
            { "field": "disponibilidadRama", "title": "Disponibilidad", "sortable": true, "filterable": false}
		]
    },
    {
        "nombre":"GRUPOSRAMAS_DERS.csv",
        "editable": false,
        "unidades": true,
        "tagUnidad": "Grupo Rama",
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "GRUPOSRAMAS_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "numGrupoRamas": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string",	"editable": false, "nullable": false },
                "bandera": { "type": "number",	"editable": false, "nullable": false},
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false},
            { "field": "numGrupoRamas", "title": "Número Grupo Ramas", "sortable": true, "filterable": true},
			{ "field": "nombre", "title": "Nombre Grupo Ramas", "sortable": true, "filterable": true},
            { "field": "bandera", "title": "Bandera", "sortable": true, "filterable": false},
		]
    },
    {
        "nombre":"GRUPOSRAMASLIM_DERS.csv",
        "editable": true,
        "algDep": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "origen_unidades": "GRUPOSRAMAS_DERS.csv",
        "modelo": {
            "id": "GRUPOSRAMASLIM_DERS",
            "fields": {
                "numFila": { "type": "number",	"editable": false, "nullable": false },
                "flujoMinGpoInt1": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt1": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMinGpoInt2": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt2": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMinGpoInt3": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt3": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMinGpoInt4": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt4": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMinGpoInt5": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt5": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMinGpoInt6": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt6": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMinGpoInt7": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt7": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMinGpoInt8": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "flujoMaxGpoInt8": { "type": "number",	"editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "flujoMinGpoInt1", "title": "Flujo Mín Int 1 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":1 },
			{ "field": "flujoMaxGpoInt1", "title": "Flujo Max Int 1 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":1 },
            { "field": "flujoMinGpoInt2", "title": "Flujo Mín Int 2 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":2 },
			{ "field": "flujoMaxGpoInt2", "title": "Flujo Max Int 2 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":2 },
            { "field": "flujoMinGpoInt3", "title": "Flujo Mín Int 3 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":3 },
			{ "field": "flujoMaxGpoInt3", "title": "Flujo Max Int 3 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":3 },
            { "field": "flujoMinGpoInt4", "title": "Flujo Mín Int 4 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":4 },
			{ "field": "flujoMaxGpoInt4", "title": "Flujo Max Int 4 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":4 },
            { "field": "flujoMinGpoInt5", "title": "Flujo Mín Int 5 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":5 },
			{ "field": "flujoMaxGpoInt5", "title": "Flujo Max Int 5 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":5 },
            { "field": "flujoMinGpoInt6", "title": "Flujo Mín Int 6 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":6 },
			{ "field": "flujoMaxGpoInt6", "title": "Flujo Max Int 6 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":6 },
            { "field": "flujoMinGpoInt7", "title": "Flujo Mín Int 7 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":7 },
			{ "field": "flujoMaxGpoInt7", "title": "Flujo Max Int 7 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":7 },
            { "field": "flujoMinGpoInt8", "title": "Flujo Mín Int 8 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":8 },
			{ "field": "flujoMaxGpoInt8", "title": "Flujo Max Int 8 (Mw)", "format": "{0:n3}", "sortable": true, "filterable": true, "width": "10vw", "periodo":8 },
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombreElem", "title": "Nombre Elemento", "sortable": true, "filterable": true, "width": "12vw"},
			{ "field": "indiceRama", "title": "Índice Rama", "sortable": true, "filterable": false, "width": "8vw"},
            { "field": "nombreNodoOrigenRama", "title": "Nombre Nodo Origen", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "indiceNodoOrigenRama", "title": "Índice Nodo Origen", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "nombreNodoDestinoRama", "title": "Nombre Nodo Destino", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "indiceNodoDestinoRama", "title": "Índice Nodo Destino", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "nombreGrupoRamaRest", "title": "Nombre Grupo Rama Restringida", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "indiceGrupoRamaRest", "title": "Índice Grupo Rama Resttringidas", "sortable": true, "filterable": false, "width": "15vw"},
            { "field": "sentidoAportacion", "title": "Sentido de Aportación", "sortable": true, "filterable": true, "width": "15vw"}
		]
    },

    // DEMANDA
    {
        "nombre":"CARGAS_DERS.csv",
        "editable": false,
        "unidades": true,
        "tagUnidad": "Carga",
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "CARGAS_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "propiedad": { "type": "string", "editable": false, "nullable": false },
                "tipo": { "type": "string",	"editable": false, "nullable": false },
                "numeroNodoAsoc": { "type": "number",	"editable": false, "nullable": false },
                "banderaNodoDis": { "type": "number", "editable": false, "nullable": false },
                "indiceDisCarga": { "type": "number", "editable": false, "nullable": false },
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombre", "title": "Nombre Carga", "sortable": true, "filterable": true, "width": "12vw"},
			{ "field": "propiedad", "title": "Propiedad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "tipo", "title": "Tipo", "sortable": true, "filterable": true, "width": "8vw"},
            { "field": "numeroNodoAsoc", "title": "Número Nodo Asociado", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "banderaNodoDis", "title": "Bandera Nodo Distribuido", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "indiceDisCarga", "title": "Índice de factor de distribución de carga", "sortable": true, "filterable": true, "width": "15vw"},
		]
    },
    {
        "nombre":"NODOSCAR_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"CARGAS_DERS.csv",
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
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "NODO_CARGA_P1", "title": "Nodo Carga P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "NODO_CARGA_P1", "title": "Nodo Carga P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRODEM_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"CARGAS_DERS.csv",
        "modelo": {
            "id": "PRODEM_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "prodemP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "prodemP1", "title": "Pronóstico P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
			{ "field": "prodemP2", "title": "Pronóstico P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "prodemP3", "title": "Pronóstico P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "prodemP4", "title": "Pronóstico P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "prodemP5", "title": "Pronóstico P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "prodemP6", "title": "Pronóstico P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "prodemP7", "title": "Pronóstico P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "prodemP8", "title": "Pronóstico P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
		]
    },

    // RANGO CONTINUO

    {
        "nombre":"UNITRC_DERS.csv",
        "editable": false,
        "unidades": true,
        "tagUnidad": "Unidad",
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "UNITRC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "tipoUnidad": { "type": "string", "editable": false, "nullable": false },
                "propiedad": { "type": "string", "editable": false, "nullable": false },
                "participante": { "type": "string", "editable": false, "nullable": false },
                "nodoAsociado": { "type": "number", "editable": false, "nullable": false },
                "banderaNodoDist": { "type": "number", "editable": false, "nullable": false },
                "IndiceArchivoFDG": { "type": "number", "editable": false, "nullable": false },
                "numComp": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombre", "title": "Nombre Unidad", "sortable": true, "filterable": true, "width": "10vw" },
			{ "field": "tipoUnidad", "title": "Tipo Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "propiedad", "title": "Propiedad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "participante", "title": "Participante", "sortable": true, "filterable": true, "width": "11vw"},
            { "field": "nodoAsociado", "title": "Nodo Asociado", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "banderaNodoDist", "title": "Bandera Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "IndiceArchivoFDG", "title": "Indice FDG", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "numComp", "title": "Número Componente", "sortable": true, "filterable": true, "width": "10vw"}
		]
    },
    {
        "nombre":"OPPARORC_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "OPPARORC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "minPeriodoParo": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "minPeriodoOp": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "maxParos": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "minPeriodoParo", "title": "Mínimo Periodo en Paro", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}" },
			{ "field": "minPeriodoOp", "title": "Mínimo Periodo en Operación", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "maxParos", "title": "Máximo Número de Paros (Planeación)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"}
		]
    },
    {
        "nombre":"ARRARC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "ARRARC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false },
                "potSinc": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "potSincRNR10M": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000}},
                "potSincRNRS": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000}},
                "rampaSubida": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": -100000000, "max": 100000000} },
                "numPeriodos": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 9999} },
                "costoArranque": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 10000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potSinc", "title": "Pot. Sincro (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
			{ "field": "potSincRNR10M", "title": "Pot. Sincro. RNR 10 Min (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "potSincRNRS", "title": "Pot. Sincro. RNRS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "rampaSubida", "title": "Rampa Subida (Mw/Min)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "numPeriodos", "title": "Periodos", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "costoArranque", "title": "Costo Arranque Único ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"}
		]
    },
    {
        "nombre":"UNITRCCI_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "UNITRCCI_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "estado": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 11} },
                "numPeriodosCondIni": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "generacionCondIni": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 10000000} },
                "numParosDia": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "estado", "title": "Estado", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
			{ "field": "numPeriodosCondIni", "title": "Periodos", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n0}"},
            { "field": "generacionCondIni", "title": "Generación (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "numParosDia", "title": "Paros al día", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"}
		]
    },
    {
        "nombre":"CGMRC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "CGMRC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "costoGenMinP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "costoGenMinP1", "title": "Costo Generación Mínimo P1 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 1},
			{ "field": "costoGenMinP2", "title": "Costo Generación Mínimo P2 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 2},
            { "field": "costoGenMinP3", "title": "Costo Generación Mínimo P3 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 3},
            { "field": "costoGenMinP4", "title": "Costo Generación Mínimo P4 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 4},
            { "field": "costoGenMinP5", "title": "Costo Generación Mínimo P5 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 5},
            { "field": "costoGenMinP6", "title": "Costo Generación Mínimo P6 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 6},
            { "field": "costoGenMinP7", "title": "Costo Generación Mínimo P7 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 7},
            { "field": "costoGenMinP8", "title": "Costo Generación Mínimo P8 ($)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 8}
		]
    },
    {
        "nombre":"POTVERC_DERS.csv",
        "editable": true,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "segmentos":11,
        "modelo": {
            "id": "POTVERC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potVentaP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potVentaP1", "title": "Potencia de Venta P1 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 1},
			{ "field": "potVentaP2", "title": "Potencia de Venta P2 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potVentaP3", "title": "Potencia de Venta P3 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potVentaP4", "title": "Potencia de Venta P4 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potVentaP5", "title": "Potencia de Venta P5 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potVentaP6", "title": "Potencia de Venta P6 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potVentaP7", "title": "Potencia de Venta P7 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potVentaP8", "title": "Potencia de Venta P8 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 8}
		]
    },
    {
        "nombre":"PREVERC_DERS.csv",
        "editable": true,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "segmentos":11,
        "modelo": {
            "id": "PREVERC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preVentaP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preVentaP1", "title": "Precio de Venta P1 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1, "format": "{0:c2}"},
			{ "field": "preVentaP2", "title": "Precio de Venta P2 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2, "format": "{0:c2}"},
            { "field": "preVentaP3", "title": "Precio de Venta P3 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3, "format": "{0:c2}"},
            { "field": "preVentaP4", "title": "Precio de Venta P4 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4, "format": "{0:c2}"},
            { "field": "preVentaP5", "title": "Precio de Venta P5 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5, "format": "{0:c2}"},
            { "field": "preVentaP6", "title": "Precio de Venta P6 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6, "format": "{0:c2}"},
            { "field": "preVentaP7", "title": "Precio de Venta P7 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7, "format": "{0:c2}"},
            { "field": "preVentaP8", "title": "Precio de Venta P8 ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8, "format": "{0:c2}"}
		]
    },
    {
        "nombre":"LIUNITRC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "LIUNITRC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "limInfP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limInfP1", "title": "Límite Inferior P1 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
			{ "field": "limInfP2", "title": "Límite Inferior P2 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "limInfP3", "title": "Límite Inferior P3 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "limInfP4", "title": "Límite Inferior P4 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "limInfP5", "title": "Límite Inferior P5 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "limInfP6", "title": "Límite Inferior P6 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "limInfP7", "title": "Límite Inferior P7 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "limInfP8", "title": "Límite Inferior P8 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
		]
    },
    {
        "nombre":"LSUNITRC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "LSUNITRC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "limSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limSupP1", "title": "Límite Superior P1 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
			{ "field": "limSupP2", "title": "Límite Superior P2 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "limSupP3", "title": "Límite Superior P3 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "limSupP4", "title": "Límite Superior P4 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "limSupP5", "title": "Límite Superior P5 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "limSupP6", "title": "Límite Superior P6 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "limSupP7", "title": "Límite Superior P7 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "limSupP8", "title": "Límite Superior P8 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
		]
    },
    {
        "nombre":"DISPORC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "DISPORC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "dispoP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "dispoP1", "title": "Disponibilidad P1", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
            { "field": "dispoP2", "title": "Disponibilidad P2", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "dispoP3", "title": "Disponibilidad P3", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "dispoP4", "title": "Disponibilidad P4", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "dispoP5", "title": "Disponibilidad P5", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "dispoP6", "title": "Disponibilidad P6", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "dispoP7", "title": "Disponibilidad P7", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "dispoP8", "title": "Disponibilidad P8", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
        ]
    },
    {
        "nombre":"ASIGNRC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "ASIGNRC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "asignP1", "title": "Asignabilidad P1", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
            { "field": "asignP2", "title": "Asignabilidad P2", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "asignP3", "title": "Asignabilidad P3", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "asignP4", "title": "Asignabilidad P4", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "asignP5", "title": "Asignabilidad P5", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "asignP6", "title": "Asignabilidad P6", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "asignP7", "title": "Asignabilidad P7", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "asignP8", "title": "Asignabilidad P8", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
        ]
    },
    {
        "nombre":"COORDRC.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "COORDRC",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "coordP1", "title": "Coordinabilidad P1", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
            { "field": "coordP2", "title": "Coordinabilidad P2", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "coordP3", "title": "Coordinabilidad P3", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "coordP4", "title": "Coordinabilidad P4", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "coordP5", "title": "Coordinabilidad P5", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "coordP6", "title": "Coordinabilidad P6", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "coordP7", "title": "Coordinabilidad P7", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "coordP8", "title": "Coordinabilidad P8", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
        ]
    },
    {
        "nombre":"NODOSRC_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "NODOSRC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nodosP1": { "type": "number", "editable": false, "nullable": false },
                "nodosP2": { "type": "number", "editable": false, "nullable": false },
                "nodosP3": { "type": "number", "editable": false, "nullable": false },
                "nodosP4": { "type": "number", "editable": false, "nullable": false },
                "nodosP5": { "type": "number", "editable": false, "nullable": false },
                "nodosP6": { "type": "number", "editable": false, "nullable": false },
                "nodosP7": { "type": "number", "editable": false, "nullable": false },
                "nodosP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nodosP1", "title": "Nodos P1", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
            { "field": "nodosP2", "title": "Nodos P2", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "nodosP3", "title": "Nodos P3", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "nodosP4", "title": "Nodos P4", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "nodosP5", "title": "Nodos P5", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "nodosP6", "title": "Nodos P6", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "nodosP7", "title": "Nodos P7", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "nodosP8", "title": "Nodos P8", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
        ]
    },
    {
        "nombre":"GPORC_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "GPORC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo01": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo02": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo03": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo04": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo05": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo06": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo07": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo08": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo09": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo10": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo11": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo12": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo13": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo14": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo15": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo16": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo17": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo18": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo19": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo20": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo21": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo22": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo23": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo24": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo25": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo26": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo27": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo28": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo29": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo30": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo31": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo32": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo33": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo34": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo35": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo36": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo37": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo38": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo39": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo40": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo41": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo42": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo43": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo44": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo45": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo46": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo47": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo48": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo49": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo50": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo51": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo52": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo53": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo54": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo55": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo56": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo57": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo58": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo59": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo60": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "unidadGpo01", "title": "Grupo 01", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo02", "title": "Grupo 02", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo03", "title": "Grupo 03", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo04", "title": "Grupo 04", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo05", "title": "Grupo 05", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo06", "title": "Grupo 06", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo07", "title": "Grupo 07", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo08", "title": "Grupo 08", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo09", "title": "Grupo 09", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo10", "title": "Grupo 10", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo11", "title": "Grupo 11", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo12", "title": "Grupo 12", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo13", "title": "Grupo 13", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo14", "title": "Grupo 14", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo15", "title": "Grupo 15", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo16", "title": "Grupo 16", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo17", "title": "Grupo 17", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo18", "title": "Grupo 18", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo19", "title": "Grupo 19", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo20", "title": "Grupo 20", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo21", "title": "Grupo 21", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo22", "title": "Grupo 22", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo23", "title": "Grupo 23", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo24", "title": "Grupo 24", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo25", "title": "Grupo 25", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo26", "title": "Grupo 26", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo27", "title": "Grupo 27", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo28", "title": "Grupo 28", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo29", "title": "Grupo 29", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo30", "title": "Grupo 30", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo31", "title": "Grupo 31", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo32", "title": "Grupo 32", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo33", "title": "Grupo 33", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo34", "title": "Grupo 34", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo35", "title": "Grupo 35", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo36", "title": "Grupo 36", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo37", "title": "Grupo 37", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo38", "title": "Grupo 38", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo39", "title": "Grupo 39", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo40", "title": "Grupo 40", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo41", "title": "Grupo 41", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo42", "title": "Grupo 42", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo43", "title": "Grupo 43", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo44", "title": "Grupo 44", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo45", "title": "Grupo 45", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo46", "title": "Grupo 46", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo47", "title": "Grupo 47", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo48", "title": "Grupo 48", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo49", "title": "Grupo 49", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo50", "title": "Grupo 50", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo51", "title": "Grupo 51", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo52", "title": "Grupo 52", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo53", "title": "Grupo 53", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo54", "title": "Grupo 54", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo55", "title": "Grupo 55", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo56", "title": "Grupo 56", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo57", "title": "Grupo 57", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo58", "title": "Grupo 58", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo59", "title": "Grupo 59", "sortable": true, "filterable": true, "width": "10vw"},
			{ "field": "unidadGpo60", "title": "Grupo 60", "sortable": true, "filterable": true, "width": "10vw"}
		]
    },
    {
        "nombre":"RAMPASRC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "RAMPASRC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "rampaSubida": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "rampaBajada": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "rampaEmergencia": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "rampaRegulacion": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMinZonaP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMaxZonaP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMinZonaP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMaxZonaP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMinZonaP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMaxZonaP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMinZonaP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limMaxZonaP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "rampaSubida", "title": "Rampa Subida (Mw/Min)", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "rampaBajada", "title": "Rampa Bajada (Mw/Min)", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "rampaEmergencia", "title": "Rampa Emergencia (Mw/Min)", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "rampaRegulacion", "title": "Rampa Regulación (Mw/Min)", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "limMinZonaP1", "title": "Límite Mínimo Zona P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMaxZonaP1", "title": "Límite Máximo Zona P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMinZonaP2", "title": "Límite Mínimo Zona P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMaxZonaP2", "title": "Límite Máximo Zona P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMinZonaP3", "title": "Límite Mínimo Zona P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMaxZonaP3", "title": "Límite Máximo Zona P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMinZonaP4", "title": "Límite Mínimo Zona P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMaxZonaP4", "title": "Límite Máximo Zona P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw"},
        ]
    },
    {
        "nombre":"ZONASRESURC_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "ZONASRESURC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "unidadZona01": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona02": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona03": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona04": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona05": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona06": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona07": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona08": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona09": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona10": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "unidadZona01", "title": "Zona 01", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona02", "title": "Zona 02", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona03", "title": "Zona 03", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona04", "title": "Zona 04", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona05", "title": "Zona 05", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona06", "title": "Zona 06", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona07", "title": "Zona 07", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona08", "title": "Zona 08", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona09", "title": "Zona 09", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadZona10", "title": "Zona 10", "sortable": true, "filterable": true, "width": "10vw"}
        ]
    },
    {
        "nombre":"POTRESRO10RC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "POTRESRO10RC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000}},
                "potResRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResRodP1", "title": "Potencia Reserva Rodante P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResRodP2", "title": "Potencia Reserva Rodante P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResRodP3", "title": "Potencia Reserva Rodante P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResRodP4", "title": "Potencia Reserva Rodante P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResRodP5", "title": "Potencia Reserva Rodante P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResRodP6", "title": "Potencia Reserva Rodante P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResRodP7", "title": "Potencia Reserva Rodante P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResRodP8", "title": "Potencia Reserva Rodante P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESRO10RC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "PRERESRO10RC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRodP1", "title": "Precio Reserva Rodante P1 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 1},
            { "field": "preResRodP2", "title": "Precio Reserva Rodante P2 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 2},
            { "field": "preResRodP3", "title": "Precio Reserva Rodante P3 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 3},
            { "field": "preResRodP4", "title": "Precio Reserva Rodante P4 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 4},
            { "field": "preResRodP5", "title": "Precio Reserva Rodante P5 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 5},
            { "field": "preResRodP6", "title": "Precio Reserva Rodante P6 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 6},
            { "field": "preResRodP7", "title": "Precio Reserva Rodante P7 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 7},
            { "field": "preResRodP8", "title": "Precio Reserva Rodante P8 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESNR10RC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "POTRESNR10RC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResNRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResNRodP1", "title": "Potencia Reserva No Rodante P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResNRodP2", "title": "Potencia Reserva No Rodante P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResNRodP3", "title": "Potencia Reserva No Rodante P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResNRodP4", "title": "Potencia Reserva No Rodante P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResNRodP5", "title": "Potencia Reserva No Rodante P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResNRodP6", "title": "Potencia Reserva No Rodante P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResNRodP7", "title": "Potencia Reserva No Rodante P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResNRodP8", "title": "Potencia Reserva No Rodante P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESNR10RC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "PRERESNR10RC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResNRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResNRodP1", "title": "Precio Reserva No Rodante P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResNRodP2", "title": "Precio Reserva No Rodante P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResNRodP3", "title": "Precio Reserva No Rodante P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResNRodP4", "title": "Precio Reserva No Rodante P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResNRodP5", "title": "Precio Reserva No Rodante P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResNRodP6", "title": "Precio Reserva No Rodante P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResNRodP7", "title": "Precio Reserva No Rodante P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResNRodP8", "title": "Precio Reserva No Rodante P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESROSURC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "POTRESROSURC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResRodSupP1", "title": "Potencia Reserva Rodante Suplementaria P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResRodSupP2", "title": "Potencia Reserva Rodante Suplementaria P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResRodSupP3", "title": "Potencia Reserva Rodante Suplementaria P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResRodSupP4", "title": "Potencia Reserva Rodante Suplementaria P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResRodSupP5", "title": "Potencia Reserva Rodante Suplementaria P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResRodSupP6", "title": "Potencia Reserva Rodante Suplementaria P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResRodSupP7", "title": "Potencia Reserva Rodante Suplementaria P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResRodSupP8", "title": "Potencia Reserva Rodante Suplementaria P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESROSURC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "PRERESROSURC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRodSupP1", "title": "Precio Reserva Rodante Suplementaria P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResRodSupP2", "title": "Precio Reserva Rodante Suplementaria P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRodSupP3", "title": "Precio Reserva Rodante Suplementaria P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRodSupP4", "title": "Precio Reserva Rodante Suplementaria P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRodSupP5", "title": "Precio Reserva Rodante Suplementaria P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRodSupP6", "title": "Precio Reserva Rodante Suplementaria P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRodSupP7", "title": "Precio Reserva Rodante Suplementaria P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRodSupP8", "title": "Precio Reserva Rodante Suplementaria P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESNRSURC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "POTRESNRSURC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResNRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResNRodSupP1", "title": "Potencia Reserva No Rodante Suplementaria P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResNRodSupP2", "title": "Potencia Reserva No Rodante Suplementaria P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResNRodSupP3", "title": "Potencia Reserva No Rodante Suplementaria P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResNRodSupP4", "title": "Potencia Reserva No Rodante Suplementaria P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResNRodSupP5", "title": "Potencia Reserva No Rodante Suplementaria P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResNRodSupP6", "title": "Potencia Reserva No Rodante Suplementaria P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResNRodSupP7", "title": "Potencia Reserva No Rodante Suplementaria P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResNRodSupP8", "title": "Potencia Reserva No Rodante Suplementaria P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESNRSURC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "PRERESNRSURC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResNRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResNRodSupP1", "title": "Precio Reserva No Rodante Suplementaria P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResNRodSupP2", "title": "Precio Reserva No Rodante Suplementaria P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResNRodSupP3", "title": "Precio Reserva No Rodante Suplementaria P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResNRodSupP4", "title": "Precio Reserva No Rodante Suplementaria P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResNRodSupP5", "title": "Precio Reserva No Rodante Suplementaria P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResNRodSupP6", "title": "Precio Reserva No Rodante Suplementaria P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResNRodSupP7", "title": "Precio Reserva No Rodante Suplementaria P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResNRodSupP8", "title": "Precio Reserva No Rodante Suplementaria P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESRESERC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "POTRESRESERC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResSecP1", "title": "Potencia Reserva Regulación Secundaria P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResSecP2", "title": "Potencia Reserva Regulación Secundaria P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResSecP3", "title": "Potencia Reserva Regulación Secundaria P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResSecP4", "title": "Potencia Reserva Regulación Secundaria P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResSecP5", "title": "Potencia Reserva Regulación Secundaria P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResSecP6", "title": "Potencia Reserva Regulación Secundaria P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResSecP7", "title": "Potencia Reserva Regulación Secundaria P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResSecP8", "title": "Potencia Reserva Regulación Secundaria P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESRESERC_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "PRERESRESERC_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResSecP1", "title": "Precio Reserva Regulación Secundaria P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResSecP2", "title": "Precio Reserva Regulación Secundaria P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResSecP3", "title": "Precio Reserva Regulación Secundaria P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResSecP4", "title": "Precio Reserva Regulación Secundaria P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResSecP5", "title": "Precio Reserva Regulación Secundaria P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResSecP6", "title": "Precio Reserva Regulación Secundaria P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResSecP7", "title": "Precio Reserva Regulación Secundaria P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResSecP8", "title": "Precio Reserva Regulación Secundaria P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"GPOUTER_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRC_DERS.csv",
        "modelo": {
            "id": "GPOUTER_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "numeroGrupo": { "type": "number", "editable": false, "nullable": false },
                "nombreGrupo": { "type": "string", "editable": false, "nullable": false },
                "limInf": { "type": "number", "editable": false, "nullable": false },
                "limSup": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "numeroGrupo", "title": "Número Grupo", "sortable": true, "filterable": true},
            { "field": "nombreGrupo", "title": "Nombre Grupo", "sortable": true, "filterable": true},
            { "field": "limInf", "title": "Límite Inferior (Gwh)", "sortable": true, "filterable": true},
            { "field": "limSup", "title": "Límite Superior (Gwh)", "sortable": true, "filterable": true}
        ]
    },

    // RANGO DISCONTINUO
    {
        "nombre":"UNITRD_DERS.csv",
        "unidades": true,
        "editable": false,
        "tagUnidad": "Unidad",
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "UNITRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "tipo": { "type": "string", "editable": false, "nullable": false },
                "propiedad": { "type": "string", "editable": false, "nullable": false },
                "participante": { "type": "string", "editable": false, "nullable": false },
                "numComponentes": { "type": "number", "editable": false, "nullable": false },
                "numComp1": { "type": "number", "editable": false, "nullable": false },
                "numComp2": { "type": "number", "editable": false, "nullable": false },
                "numComp3": { "type": "number", "editable": false, "nullable": false },
                "numComp4": { "type": "number", "editable": false, "nullable": false },
                "numComp5": { "type": "number", "editable": false, "nullable": false },
                "numComp6": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombre", "title": "Nombre Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "tipo", "title": "Tipo Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "propiedad", "title": "Propiedad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "participante", "title": "Participante", "sortable": true, "filterable": true, "width": "11vw"},
            { "field": "numComponentes", "title": "Número Componentes", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "numComp1", "title": "Componente 01", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "numComp2", "title": "Componente 02", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "numComp3", "title": "Componente 03", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "numComp4", "title": "Componente 04", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "numComp5", "title": "Componente 05", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "numComp6", "title": "Componente 06", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"ARRARD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "ARRARD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potSinc": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 24} },
                "potSincRNRS": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 24} },
                "potSincRNR10M": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 24} },
                "rampaSubSinc": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 24} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potSinc", "title": "Potencia Sinc.", "sortable": true, "filterable": true},
            { "field": "potSincRNRS", "title": "Potencia Sinc. RNRS", "sortable": true, "filterable": true},
            { "field": "potSincRNR10M", "title": "Potencia Sinc. RNR 10Min", "sortable": true, "filterable": true},
            { "field": "rampaSubSinc", "title": "Rampa Subida Sinc.", "sortable": true, "filterable": true}
        ]
    },
    {
        "nombre":"UNITRDCI_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "UNITRDCI_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "estado": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "numPeriodosCI": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 24} },
                "generacionCI": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "estado", "title": "Estado", "sortable": true, "filterable": true},
            { "field": "numPeriodosCI", "title": "Periodos CI", "sortable": true, "filterable": true},
            { "field": "generacionCI", "title": "Generacion CI", "sortable": true, "filterable": true}
        ]
    },
    {
        "nombre":"CGMRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "CGMRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "costoGenMinModP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinModP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinModP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinModP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinModP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinModP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinModP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoGenMinModP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "costoGenMinModP1", "title":"Costo Generación Min. P1", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 1},
            { "field": "costoGenMinModP2", "title":"Costo Generación Min. P2", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 2},
            { "field": "costoGenMinModP3", "title":"Costo Generación Min. P3", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 3},
            { "field": "costoGenMinModP4", "title":"Costo Generación Min. P4", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 4},
            { "field": "costoGenMinModP5", "title":"Costo Generación Min. P5", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 5},
            { "field": "costoGenMinModP6", "title":"Costo Generación Min. P6", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 6},
            { "field": "costoGenMinModP7", "title":"Costo Generación Min. P7", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 7},
            { "field": "costoGenMinModP8", "title":"Costo Generación Min. P8", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}", "periodo": 8}
        ]
    },
    {
        "nombre":"POTVERD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "segmentos": 3,
        "modelo": {
            "id": "POTVERD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potVentaSegModP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaSegModP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaSegModP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaSegModP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaSegModP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaSegModP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaSegModP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaSegModP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potVentaSegModP1", "title":"Potencia Venta P1", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potVentaSegModP2", "title":"Potencia Venta P2", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potVentaSegModP3", "title":"Potencia Venta P3", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potVentaSegModP4", "title":"Potencia Venta P4", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potVentaSegModP5", "title":"Potencia Venta P5", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potVentaSegModP6", "title":"Potencia Venta P6", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potVentaSegModP7", "title":"Potencia Venta P7", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potVentaSegModP8", "title":"Potencia Venta P8", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PREVERD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "segmentos": 3,
        "modelo": {
            "id": "PREVERD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preVentaSegModP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaSegModP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaSegModP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaSegModP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaSegModP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaSegModP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaSegModP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaSegModP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preVentaSegModP1", "title":"Precio Venta P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 1},
            { "field": "preVentaSegModP2", "title":"Precio Venta P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 2},
            { "field": "preVentaSegModP3", "title":"Precio Venta P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 3},
            { "field": "preVentaSegModP4", "title":"Precio Venta P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 4},
            { "field": "preVentaSegModP5", "title":"Precio Venta P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 5},
            { "field": "preVentaSegModP6", "title":"Precio Venta P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 6},
            { "field": "preVentaSegModP7", "title":"Precio Venta P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 7},
            { "field": "preVentaSegModP8", "title":"Precio Venta P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "10vw", "periodo": 8}
        ]
    },
    {
        "nombre":"LIUNITRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "LIUNITRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "limInfGenP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfGenP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfGenP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfGenP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfGenP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfGenP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfGenP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfGenP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limInfGenP1", "title":"Límite Inferior Gen. P1", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
            { "field": "limInfGenP2", "title":"Límite Inferior Gen. P2", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "limInfGenP3", "title":"Límite Inferior Gen. P3", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "limInfGenP4", "title":"Límite Inferior Gen. P4", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "limInfGenP5", "title":"Límite Inferior Gen. P5", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "limInfGenP6", "title":"Límite Inferior Gen. P6", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "limInfGenP7", "title":"Límite Inferior Gen. P7", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "limInfGenP8", "title":"Límite Inferior Gen. P8", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
        ]
    },
    {
        "nombre":"LSUNITRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "LSUNITRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "limSupGenP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupGenP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupGenP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupGenP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupGenP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupGenP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupGenP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupGenP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limSupGenP1", "title":"Límite Superior Gen. P1", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
            { "field": "limSupGenP2", "title":"Límite Superior Gen. P2", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "limSupGenP3", "title":"Límite Superior Gen. P3", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "limSupGenP4", "title":"Límite Superior Gen. P4", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "limSupGenP5", "title":"Límite Superior Gen. P5", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "limSupGenP6", "title":"Límite Superior Gen. P6", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "limSupGenP7", "title":"Límite Superior Gen. P7", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "limSupGenP8", "title":"Límite Superior Gen. P8", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
        ]
    },
    {
        "nombre":"DISPORD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "DISPORD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "disponibilidadP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "disponibilidadP1", "title":"Disponibilidad P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "disponibilidadP2", "title":"Disponibilidad P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "disponibilidadP3", "title":"Disponibilidad P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "disponibilidadP4", "title":"Disponibilidad P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "disponibilidadP5", "title":"Disponibilidad P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "disponibilidadP6", "title":"Disponibilidad P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "disponibilidadP7", "title":"Disponibilidad P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "disponibilidadP8", "title":"Disponibilidad P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"ASIGNRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "ASIGNRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "asignabilidadP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "asignabilidadP1", "title":"Asignabilidad P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "asignabilidadP2", "title":"Asignabilidad P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "asignabilidadP3", "title":"Asignabilidad P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "asignabilidadP4", "title":"Asignabilidad P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "asignabilidadP5", "title":"Asignabilidad P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "asignabilidadP6", "title":"Asignabilidad P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "asignabilidadP7", "title":"Asignabilidad P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "asignabilidadP8", "title":"Asignabilidad P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"COORDRD.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "COORDRD",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "coordinabilidadP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "coordinabilidadP1", "title":"Coordinabilidad P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "coordinabilidadP2", "title":"Coordinabilidad P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "coordinabilidadP3", "title":"Coordinabilidad P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "coordinabilidadP4", "title":"Coordinabilidad P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "coordinabilidadP5", "title":"Coordinabilidad P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "coordinabilidadP6", "title":"Coordinabilidad P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "coordinabilidadP7", "title":"Coordinabilidad P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "coordinabilidadP8", "title":"Coordinabilidad P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"GPORD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "GPORD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo01": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo02": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo03": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo04": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo05": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo06": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo07": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo08": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo09": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo10": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo11": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo12": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo13": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo14": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo15": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo16": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo17": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo18": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo19": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo20": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo21": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo22": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo23": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo24": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo25": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo26": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo27": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo28": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo29": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo30": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo31": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo32": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo33": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo34": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo35": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo36": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo37": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo38": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo39": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo40": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo41": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo42": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo43": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo44": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo45": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo46": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo47": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo48": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo49": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo50": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo51": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo52": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo53": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo54": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo55": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo56": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo57": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo58": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo59": { "type": "number", "editable": false, "nullable": false },
                "unidadGpo60": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "unidadGpo01", "title": "Grupo 01", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo02", "title": "Grupo 02", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo03", "title": "Grupo 03", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo04", "title": "Grupo 04", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo05", "title": "Grupo 05", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo06", "title": "Grupo 06", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo07", "title": "Grupo 07", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo08", "title": "Grupo 08", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo09", "title": "Grupo 09", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo10", "title": "Grupo 10", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo11", "title": "Grupo 11", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo12", "title": "Grupo 12", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo13", "title": "Grupo 13", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo14", "title": "Grupo 14", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo15", "title": "Grupo 15", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo16", "title": "Grupo 16", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo17", "title": "Grupo 17", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo18", "title": "Grupo 18", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo19", "title": "Grupo 19", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo20", "title": "Grupo 20", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo21", "title": "Grupo 21", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo22", "title": "Grupo 22", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo23", "title": "Grupo 23", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo24", "title": "Grupo 24", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo25", "title": "Grupo 25", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo26", "title": "Grupo 26", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo27", "title": "Grupo 27", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo28", "title": "Grupo 28", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo29", "title": "Grupo 29", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo30", "title": "Grupo 30", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo31", "title": "Grupo 31", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo32", "title": "Grupo 32", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo33", "title": "Grupo 33", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo34", "title": "Grupo 34", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo35", "title": "Grupo 35", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo36", "title": "Grupo 36", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo37", "title": "Grupo 37", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo38", "title": "Grupo 38", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo39", "title": "Grupo 39", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo40", "title": "Grupo 40", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo41", "title": "Grupo 41", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo42", "title": "Grupo 42", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo43", "title": "Grupo 43", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo44", "title": "Grupo 44", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo45", "title": "Grupo 45", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo46", "title": "Grupo 46", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo47", "title": "Grupo 47", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo48", "title": "Grupo 48", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo49", "title": "Grupo 49", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo50", "title": "Grupo 50", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo51", "title": "Grupo 51", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo52", "title": "Grupo 52", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo53", "title": "Grupo 53", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo54", "title": "Grupo 54", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo55", "title": "Grupo 55", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo56", "title": "Grupo 56", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo57", "title": "Grupo 57", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo58", "title": "Grupo 58", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo59", "title": "Grupo 59", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "unidadGpo60", "title": "Grupo 60", "sortable": true, "filterable": true, "width": "10vw"}
        ]
    },
    {
        "nombre":"RAMPASRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "RAMPASRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "rampaSubida": { "type": "number", "editable": false, "nullable": false },
                "rampaBajada": { "type": "number", "editable": false, "nullable": false },
                "rampaEmergencia": { "type": "number", "editable": false, "nullable": false },
                "rampaRegulacion": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "rampaSubida", "title":"Rampa Subida", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "rampaBajada", "title":"Rampa Bajada", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "rampaEmergencia", "title":"Rampa Emergencia", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "rampaRegulacion", "title":"Rampa Regulación", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"ZONASRESURD_DERS.csv",
        "editable": false,
        "origen_unidades":"UNITRD_DERS.csv"
        // FALTA TABLA BD
    },
    {
        "nombre":"POTRESRO10RD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "POTRESRO10RD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResRodP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResRodP1", "title": "Potencia Reserva Rodante P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResRodP2", "title": "Potencia Reserva Rodante P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResRodP3", "title": "Potencia Reserva Rodante P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResRodP4", "title": "Potencia Reserva Rodante P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResRodP5", "title": "Potencia Reserva Rodante P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResRodP6", "title": "Potencia Reserva Rodante P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResRodP7", "title": "Potencia Reserva Rodante P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResRodP8", "title": "Potencia Reserva Rodante P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESRO10RD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "PRERESRO10RD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRodP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRodP1", "title": "Precio Reserva Rodante P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResRodP2", "title": "Precio Reserva Rodante P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRodP3", "title": "Precio Reserva Rodante P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRodP4", "title": "Precio Reserva Rodante P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRodP5", "title": "Precio Reserva Rodante P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRodP6", "title": "Precio Reserva Rodante P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRodP7", "title": "Precio Reserva Rodante P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRodP8", "title": "Precio Reserva Rodante P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESNR10RD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "POTRESNR10RD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResNRodP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResNRodP1", "title": "Potencia Reserva No Rodante P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResNRodP2", "title": "Potencia Reserva No Rodante P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResNRodP3", "title": "Potencia Reserva No Rodante P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResNRodP4", "title": "Potencia Reserva No Rodante P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResNRodP5", "title": "Potencia Reserva No Rodante P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResNRodP6", "title": "Potencia Reserva No Rodante P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResNRodP7", "title": "Potencia Reserva No Rodante P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResNRodP8", "title": "Potencia Reserva No Rodante P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESNR10RD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "PRERESNR10RD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResNRodP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResNRodP1", "title": "Precio Reserva No Rodante P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResNRodP2", "title": "Precio Reserva No Rodante P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResNRodP3", "title": "Precio Reserva No Rodante P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResNRodP4", "title": "Precio Reserva No Rodante P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResNRodP5", "title": "Precio Reserva No Rodante P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResNRodP6", "title": "Precio Reserva No Rodante P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResNRodP7", "title": "Precio Reserva No Rodante P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResNRodP8", "title": "Precio Reserva No Rodante P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESROSURD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "POTRESROSURD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResRodSupP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResRodSupP1", "title": "Potencia Reserva Rodante Suplementaria P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResRodSupP2", "title": "Potencia Reserva Rodante Suplementaria P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResRodSupP3", "title": "Potencia Reserva Rodante Suplementaria P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResRodSupP4", "title": "Potencia Reserva Rodante Suplementaria P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResRodSupP5", "title": "Potencia Reserva Rodante Suplementaria P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResRodSupP6", "title": "Potencia Reserva Rodante Suplementaria P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResRodSupP7", "title": "Potencia Reserva Rodante Suplementaria P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResRodSupP8", "title": "Potencia Reserva Rodante Suplementaria P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESROSURD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "PRERESROSURD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRodSupP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRodSupP1", "title": "Precio Reserva Rodante Suplementaria P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResRodSupP2", "title": "Precio Reserva Rodante Suplementaria P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRodSupP3", "title": "Precio Reserva Rodante Suplementaria P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRodSupP4", "title": "Precio Reserva Rodante Suplementaria P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRodSupP5", "title": "Precio Reserva Rodante Suplementaria P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRodSupP6", "title": "Precio Reserva Rodante Suplementaria P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRodSupP7", "title": "Precio Reserva Rodante Suplementaria P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRodSupP8", "title": "Precio Reserva Rodante Suplementaria P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESNRSURD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "POTRESNRSURD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResNRodSupP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResNRodSupP1", "title": "Potencia Reserva No Rodante Suplementaria P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResNRodSupP2", "title": "Potencia Reserva No Rodante Suplementaria P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResNRodSupP3", "title": "Potencia Reserva No Rodante Suplementaria P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResNRodSupP4", "title": "Potencia Reserva No Rodante Suplementaria P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResNRodSupP5", "title": "Potencia Reserva No Rodante Suplementaria P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResNRodSupP6", "title": "Potencia Reserva No Rodante Suplementaria P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResNRodSupP7", "title": "Potencia Reserva No Rodante Suplementaria P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResNRodSupP8", "title": "Potencia Reserva No Rodante Suplementaria P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESNRSURD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "PRERESNRSURD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResNRodSupP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResNRodSupP1", "title": "Precio Reserva No Rodante Suplementaria P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResNRodSupP2", "title": "Precio Reserva No Rodante Suplementaria P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResNRodSupP3", "title": "Precio Reserva No Rodante Suplementaria P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResNRodSupP4", "title": "Precio Reserva No Rodante Suplementaria P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResNRodSupP5", "title": "Precio Reserva No Rodante Suplementaria P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResNRodSupP6", "title": "Precio Reserva No Rodante Suplementaria P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResNRodSupP7", "title": "Precio Reserva No Rodante Suplementaria P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResNRodSupP8", "title": "Precio Reserva No Rodante Suplementaria P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESRESERD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "POTRESRESERD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResSecP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResSecP1", "title": "Potencia Reserva Regulación Secundaria P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResSecP2", "title": "Potencia Reserva Regulación Secundaria P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResSecP3", "title": "Potencia Reserva Regulación Secundaria P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResSecP4", "title": "Potencia Reserva Regulación Secundaria P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResSecP5", "title": "Potencia Reserva Regulación Secundaria P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResSecP6", "title": "Potencia Reserva Regulación Secundaria P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResSecP7", "title": "Potencia Reserva Regulación Secundaria P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResSecP8", "title": "Potencia Reserva Regulación Secundaria P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESRESERD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "PRERESRESERD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResSecP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResSecP1", "title": "Precio Reserva Regulación Secundaria P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResSecP2", "title": "Precio Reserva Regulación Secundaria P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResSecP3", "title": "Precio Reserva Regulación Secundaria P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResSecP4", "title": "Precio Reserva Regulación Secundaria P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResSecP5", "title": "Precio Reserva Regulación Secundaria P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResSecP6", "title": "Precio Reserva Regulación Secundaria P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResSecP7", "title": "Precio Reserva Regulación Secundaria P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResSecP8", "title": "Precio Reserva Regulación Secundaria P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"COSTRANSRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "COSTRANSRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "costoTransModo1": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo1": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo2": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo3": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo4": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo5": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo6": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo7": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo8": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo9": { "type": "number", "editable": false, "nullable": false },
                "costoArranqueModo10": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "costoTransModo1", "title": "Costo Transmisión", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "costoArranqueModo1", "title": "Costo Arranque Modo 01", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo2", "title": "Costo Arranque Modo 02", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo3", "title": "Costo Arranque Modo 03", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo4", "title": "Costo Arranque Modo 04", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo5", "title": "Costo Arranque Modo 05", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo6", "title": "Costo Arranque Modo 06", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo7", "title": "Costo Arranque Modo 07", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo8", "title": "Costo Arranque Modo 08", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo9", "title": "Costo Arranque Modo 09", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "costoArranqueModo10", "title": "Costo Arranque Modo 10", "sortable": true, "filterable": true, "width": "15vw"},
        ]
    },
    {
        "nombre":"TIETRANSRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "TIETRANSRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo1": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo2": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo3": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo4": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo5": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo6": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo7": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo8": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo9": { "type": "number", "editable": false, "nullable": false },
                "tiempoTransModo10": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "tiempoTransModo1", "title": "Costo Transmisión Modo 01", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo2", "title": "Costo Transmisión Modo 02", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo3", "title": "Costo Transmisión Modo 03", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo4", "title": "Costo Transmisión Modo 04", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo5", "title": "Costo Transmisión Modo 05", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo6", "title": "Costo Transmisión Modo 06", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo7", "title": "Costo Transmisión Modo 07", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo8", "title": "Costo Transmisión Modo 08", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo9", "title": "Costo Transmisión Modo 09", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoTransModo10", "title": "Costo Transmisión Modo 10", "sortable": true, "filterable": true, "width": "15vw"},
        ]
    },
    {
        "nombre":"TMINMODRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "TMINMODRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo1": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo2": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo3": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo4": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo5": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo6": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo7": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo8": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo9": { "type": "number", "editable": false, "nullable": false },
                "tiempoMinModo10": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "tiempoMinModo1", "title": "Tiempo Mínimo Modo 01", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo2", "title": "Tiempo Mínimo Modo 02", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo3", "title": "Tiempo Mínimo Modo 03", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo4", "title": "Tiempo Mínimo Modo 04", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo5", "title": "Tiempo Mínimo Modo 05", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo6", "title": "Tiempo Mínimo Modo 06", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo7", "title": "Tiempo Mínimo Modo 07", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo8", "title": "Tiempo Mínimo Modo 08", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo9", "title": "Tiempo Mínimo Modo 09", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "tiempoMinModo10", "title": "Tiempo Mínimo Modo 10", "sortable": true, "filterable": true, "width": "15vw"},
        ]
    },
    {
        "nombre":"TRANSRD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "TRANSRD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "modoOp1": { "type": "number", "editable": false, "nullable": false },
                "modoOp2": { "type": "number", "editable": false, "nullable": false },
                "modoOp3": { "type": "number", "editable": false, "nullable": false },
                "modoOp4": { "type": "number", "editable": false, "nullable": false },
                "modoOp5": { "type": "number", "editable": false, "nullable": false },
                "modoOp6": { "type": "number", "editable": false, "nullable": false },
                "modoOp7": { "type": "number", "editable": false, "nullable": false },
                "modoOp8": { "type": "number", "editable": false, "nullable": false },
                "modoOp9": { "type": "number", "editable": false, "nullable": false },
                "modoOp10": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "modoOp1", "title": "Modo Operación 01", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp2", "title": "Modo Operación 02", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp3", "title": "Modo Operación 03", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp4", "title": "Modo Operación 04", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp5", "title": "Modo Operación 05", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp6", "title": "Modo Operación 06", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp7", "title": "Modo Operación 07", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp8", "title": "Modo Operación 08", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp9", "title": "Modo Operación 09", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "modoOp10", "title": "Modo Operación 10", "sortable": true, "filterable": true, "width": "15vw"},
        ]
    },
    {
        "nombre":"COMPOURD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "COMPOURD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "tipo": { "type": "string", "editable": false, "nullable": false },
                "nodoAsociado": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombre", "title": "Nombre Componente", "sortable": true, "filterable": true},
            { "field": "tipo", "title": "Tipo Componente", "sortable": true, "filterable": true},
            { "field": "nodoAsociado", "title": "Nodo Asociado", "sortable": true, "filterable": true}
        ]
    },
    {
        "nombre":"NODOSCOMPOURD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "NODOSCOMPOURD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP1": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP2": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP3": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP4": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP5": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP6": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP7": { "type": "number", "editable": false, "nullable": false },
                "nodoCompP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nodoCompP1", "title": "Nodo Compuesto P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "nodoCompP2", "title": "Nodo Compuesto P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "nodoCompP3", "title": "Nodo Compuesto P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "nodoCompP4", "title": "Nodo Compuesto P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "nodoCompP5", "title": "Nodo Compuesto P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "nodoCompP6", "title": "Nodo Compuesto P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "nodoCompP7", "title": "Nodo Compuesto P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "nodoCompP8", "title": "Nodo Compuesto P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"COMPXMODO_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "COMPXMODO_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "compModoOp1": { "type": "number", "editable": false, "nullable": false },
                "compModoOp2": { "type": "number", "editable": false, "nullable": false },
                "compModoOp3": { "type": "number", "editable": false, "nullable": false },
                "compModoOp4": { "type": "number", "editable": false, "nullable": false },
                "compModoOp5": { "type": "number", "editable": false, "nullable": false },
                "compModoOp6": { "type": "number", "editable": false, "nullable": false },
                "compModoOp7": { "type": "number", "editable": false, "nullable": false },
                "compModoOp8": { "type": "number", "editable": false, "nullable": false },
                "compModoOp9": { "type": "number", "editable": false, "nullable": false },
                "compModoOp10": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "compModoOp1", "title": "Componente Modo Operación 01", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp2", "title": "Componente Modo Operación 02", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp3", "title": "Componente Modo Operación 03", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp4", "title": "Componente Modo Operación 04", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp5", "title": "Componente Modo Operación 05", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp6", "title": "Componente Modo Operación 06", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp7", "title": "Componente Modo Operación 07", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp8", "title": "Componente Modo Operación 08", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp9", "title": "Componente Modo Operación 09", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "compModoOp10", "title": "Componente Modo Operación 10", "sortable": true, "filterable": true, "width": "15vw"},
        ]
    },
    {
        "nombre":"GECOXMOD_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNITRD_DERS.csv",
        "modelo": {
            "id": "GECOXMOD_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp1": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp2": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp3": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp4": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp5": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp6": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp7": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp8": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp9": { "type": "number", "editable": false, "nullable": false },
                "fracComModOp10": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "fracComModOp1", "title": "Fracción Gen. Componente Modo 01", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp2", "title": "Fracción Gen. Componente Modo 02", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp3", "title": "Fracción Gen. Componente Modo 03", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp4", "title": "Fracción Gen. Componente Modo 04", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp5", "title": "Fracción Gen. Componente Modo 05", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp6", "title": "Fracción Gen. Componente Modo 06", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp7", "title": "Fracción Gen. Componente Modo 07", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp8", "title": "Fracción Gen. Componente Modo 08", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp9", "title": "Fracción Gen. Componente Modo 09", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "fracComModOp10", "title": "Fracción Gen. Componente Modo 10", "sortable": true, "filterable": true, "width": "15vw"},
        ]
    },

    // HIDROELECTRICAS

    {
        "nombre":"EMBALSES_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "EMBALSES_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombreEmbalse": { "type": "string", "editable": false, "nullable": false },
                "nivel": { "type": "string", "editable": false, "nullable": false },
                "namino": { "type": "string", "editable": false, "nullable": false },
                "numViasDivergentes": { "type": "string", "editable": false, "nullable": false },
                "numViasConvergentes": { "type": "string", "editable": false, "nullable": false },
                "volumen": { "type": "string", "editable": false, "nullable": false },
                "elevacion": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombreEmbalse", "title": "Nombre Embalse", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "nivel", "title": "Nivel", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "namino", "title": "Námino", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "numViasDivergentes", "title": "Número Vías Divergentes", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "numViasConvergentes", "title": "Número Vías Convergentes", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "volumen", "title": "Volúmen", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "elevacion", "title": "Elevación", "sortable": true, "filterable": true, "width": "10vw"}
        ]
    },
    {
        "nombre":"LIMENEREMB_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "LIMENEREMB_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "limMinEmbalses": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 10000000} },
                "limMaxEmbalses": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 10000000} },
                "restriccion": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limMinEmbalses", "title": "Límite Mínimo Embalses (Gwh)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "limMaxEmbalses", "title": "Límite Máximo Embalses (Gwh)", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "restriccion", "title": "Restricción", "sortable": true, "filterable": true, "width": "10vw"}
        ]
    },
    {
        "nombre":"PLAHDERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "PLAHDERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombrePlanta": { "type": "string", "editable": false, "nullable": false },
                "numViaAgua": { "type": "string", "editable": false, "nullable": false },
                "numEmbalse": { "type": "number", "editable": false, "nullable": false },
                "numUnidades": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombrePlanta", "title": "Nombre Planta", "sortable": true, "filterable": true},
            { "field": "numViaAgua", "title": "Número Vía Agua", "sortable": true, "filterable": true},
            { "field": "numEmbalse", "title": "Número Embalses", "sortable": true, "filterable": true},
            { "field": "numUnidades", "title": "Número Unidades", "sortable": true, "filterable": true}
        ]
    },
    {
        "nombre":"UNIHDERS.csv",
        "unidades": true,
        "tagUnidad": "Unidad",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "UNIHDERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "tipo": { "type": "string", "editable": false, "nullable": false },
                "propiedad": { "type": "string", "editable": false, "nullable": false },
                "dueno": { "type": "string", "editable": false, "nullable": false },
                "modelo": { "type": "string", "editable": false, "nullable": false },
                "maxNumParos": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombre", "title": "Nombre Unidad", "sortable": true, "filterable": true},
            { "field": "tipo", "title": "Tipo Unidad", "sortable": true, "filterable": true},
            { "field": "propiedad", "title": "Propiedad", "sortable": true, "filterable": true},
            { "field": "dueno", "title": "Dueño", "sortable": true, "filterable": true},
            { "field": "modelo", "title": "Modelo", "sortable": true, "filterable": true},
            { "field": "maxNumParos", "title": "Máximo Número de Paros", "sortable": true, "filterable": true}
        ]
    },
    {
        "nombre":"UNIHCI_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "UNIHCI_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "estado": { "type": "string", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "numPeriodosCI": { "type": "string", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 9999} },
                "generacionCI": { "type": "string", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "numActualParos": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "estado", "title": "Estado", "sortable": true, "filterable": true},
            { "field": "numPeriodosCI", "title": "Periodos Condiciones Iniciales", "sortable": true, "filterable": true},
            { "field": "generacionCI", "title": "Generación Condiciones Iniciales", "sortable": true, "filterable": true},
            { "field": "numActualParos", "title": "Número Actual de Paros", "sortable": true, "filterable": true, "hidden": true}
        ]
    },
    {
        "nombre":"COSTOPHID_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "COSTOPHID_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "costoOpP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoOpP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoOpP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoOpP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoOpP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoOpP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoOpP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "costoOpP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "costoOpP1", "title": "Costo Operación P1 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 1, "format": "{0:c2}"},
            { "field": "costoOpP2", "title": "Costo Operación P2 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 2, "format": "{0:c2}"},
            { "field": "costoOpP3", "title": "Costo Operación P3 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 3, "format": "{0:c2}"},
            { "field": "costoOpP4", "title": "Costo Operación P4 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 4, "format": "{0:c2}"},
            { "field": "costoOpP5", "title": "Costo Operación P5 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 5, "format": "{0:c2}"},
            { "field": "costoOpP6", "title": "Costo Operación P6 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 6, "format": "{0:c2}"},
            { "field": "costoOpP7", "title": "Costo Operación P7 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 7, "format": "{0:c2}"},
            { "field": "costoOpP8", "title": "Costo Operación P8 ($)", "sortable": true, "filterable": true, "width": "12vw", "periodo": 8, "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"LIUNIH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "LIUNIH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limInfP1", "title": "Límite Inferior P1 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 1},
            { "field": "limInfP2", "title": "Límite Inferior P2 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 2},
            { "field": "limInfP3", "title": "Límite Inferior P3 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 3},
            { "field": "limInfP4", "title": "Límite Inferior P4 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 4},
            { "field": "limInfP5", "title": "Límite Inferior P5 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 5},
            { "field": "limInfP6", "title": "Límite Inferior P6 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 6},
            { "field": "limInfP7", "title": "Límite Inferior P7 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 7},
            { "field": "limInfP8", "title": "Límite Inferior P8 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 8}
        ]
    },
    {
        "nombre":"LSUNIH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "LSUNIH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limSupP1", "title": "Límite Superior P1 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 1},
            { "field": "limSupP2", "title": "Límite Superior P2 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 2},
            { "field": "limSupP3", "title": "Límite Superior P3 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 3},
            { "field": "limSupP4", "title": "Límite Superior P4 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 4},
            { "field": "limSupP5", "title": "Límite Superior P5 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 5},
            { "field": "limSupP6", "title": "Límite Superior P6 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 6},
            { "field": "limSupP7", "title": "Límite Superior P7 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 7},
            { "field": "limSupP8", "title": "Límite Superior P8 (Mw)", "sortable": true, "filterable": true, "format": "{0:n3}", "width": "12vw", "periodo": 8}
        ]
    },
    {
        "nombre":"DISPOH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "DISPOH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "disponibilidadP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "disponibilidadP1", "title": "Disponibilidad P1", "sortable": true, "filterable": true, "width": "12vw", "periodo": 1},
            { "field": "disponibilidadP2", "title": "Disponibilidad P2", "sortable": true, "filterable": true, "width": "12vw", "periodo": 2},
            { "field": "disponibilidadP3", "title": "Disponibilidad P3", "sortable": true, "filterable": true, "width": "12vw", "periodo": 3},
            { "field": "disponibilidadP4", "title": "Disponibilidad P4", "sortable": true, "filterable": true, "width": "12vw", "periodo": 4},
            { "field": "disponibilidadP5", "title": "Disponibilidad P5", "sortable": true, "filterable": true, "width": "12vw", "periodo": 5},
            { "field": "disponibilidadP6", "title": "Disponibilidad P6", "sortable": true, "filterable": true, "width": "12vw", "periodo": 6},
            { "field": "disponibilidadP7", "title": "Disponibilidad P7", "sortable": true, "filterable": true, "width": "12vw", "periodo": 7},
            { "field": "disponibilidadP8", "title": "Disponibilidad P8", "sortable": true, "filterable": true, "width": "12vw", "periodo": 8}
        ]
    },
    {
        "nombre":"ASIGNH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "ASIGNH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "asignabilidadP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "asignabilidadP1", "title": "Asignabilidad P1", "sortable": true, "filterable": true, "width": "12vw", "periodo": 1},
            { "field": "asignabilidadP2", "title": "Asignabilidad P2", "sortable": true, "filterable": true, "width": "12vw", "periodo": 2},
            { "field": "asignabilidadP3", "title": "Asignabilidad P3", "sortable": true, "filterable": true, "width": "12vw", "periodo": 3},
            { "field": "asignabilidadP4", "title": "Asignabilidad P4", "sortable": true, "filterable": true, "width": "12vw", "periodo": 4},
            { "field": "asignabilidadP5", "title": "Asignabilidad P5", "sortable": true, "filterable": true, "width": "12vw", "periodo": 5},
            { "field": "asignabilidadP6", "title": "Asignabilidad P6", "sortable": true, "filterable": true, "width": "12vw", "periodo": 6},
            { "field": "asignabilidadP7", "title": "Asignabilidad P7", "sortable": true, "filterable": true, "width": "12vw", "periodo": 7},
            { "field": "asignabilidadP8", "title": "Asignabilidad P8", "sortable": true, "filterable": true, "width": "12vw", "periodo": 8}
        ]
    },
    {
        "nombre":"COORDH.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "COORDH",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "coordinabilidadP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "coordinabilidadP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "coordinabilidadP1", "title": "Coordinabilidad P1", "sortable": true, "filterable": true, "width": "12vw", "periodo": 1},
            { "field": "coordinabilidadP2", "title": "Coordinabilidad P2", "sortable": true, "filterable": true, "width": "12vw", "periodo": 2},
            { "field": "coordinabilidadP3", "title": "Coordinabilidad P3", "sortable": true, "filterable": true, "width": "12vw", "periodo": 3},
            { "field": "coordinabilidadP4", "title": "Coordinabilidad P4", "sortable": true, "filterable": true, "width": "12vw", "periodo": 4},
            { "field": "coordinabilidadP5", "title": "Coordinabilidad P5", "sortable": true, "filterable": true, "width": "12vw", "periodo": 5},
            { "field": "coordinabilidadP6", "title": "Coordinabilidad P6", "sortable": true, "filterable": true, "width": "12vw", "periodo": 6},
            { "field": "coordinabilidadP7", "title": "Coordinabilidad P7", "sortable": true, "filterable": true, "width": "12vw", "periodo": 7},
            { "field": "coordinabilidadP8", "title": "Coordinabilidad P8", "sortable": true, "filterable": true, "width": "12vw", "periodo": 8}
        ]
    },
    {
        "nombre":"NODOSH_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "NODOSH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP1": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP2": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP3": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP4": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP5": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP6": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP7": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nodoUnidadP1", "title": "Nodo Unidad P1", "sortable": true, "filterable": true, "width": "12vw", "periodo": 1},
            { "field": "nodoUnidadP2", "title": "Nodo Unidad P2", "sortable": true, "filterable": true, "width": "12vw", "periodo": 2},
            { "field": "nodoUnidadP3", "title": "Nodo Unidad P3", "sortable": true, "filterable": true, "width": "12vw", "periodo": 3},
            { "field": "nodoUnidadP4", "title": "Nodo Unidad P4", "sortable": true, "filterable": true, "width": "12vw", "periodo": 4},
            { "field": "nodoUnidadP5", "title": "Nodo Unidad P5", "sortable": true, "filterable": true, "width": "12vw", "periodo": 5},
            { "field": "nodoUnidadP6", "title": "Nodo Unidad P6", "sortable": true, "filterable": true, "width": "12vw", "periodo": 6},
            { "field": "nodoUnidadP7", "title": "Nodo Unidad P7", "sortable": true, "filterable": true, "width": "12vw", "periodo": 7},
            { "field": "nodoUnidadP8", "title": "Nodo Unidad P8", "sortable": true, "filterable": true, "width": "12vw", "periodo": 8}
        ]
    },
    {
        "nombre":"COMPSH.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "COMPSH",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "banderaCompSincP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "banderaCompSincP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "banderaCompSincP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "banderaCompSincP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "banderaCompSincP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "banderaCompSincP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "banderaCompSincP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "banderaCompSincP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "banderaCompSincP1", "title": "Bandera Compensador Sinc P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "banderaCompSincP2", "title": "Bandera Compensador Sinc P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "banderaCompSincP3", "title": "Bandera Compensador Sinc P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "banderaCompSincP4", "title": "Bandera Compensador Sinc P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "banderaCompSincP5", "title": "Bandera Compensador Sinc P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "banderaCompSincP6", "title": "Bandera Compensador Sinc P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "banderaCompSincP7", "title": "Bandera Compensador Sinc P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "banderaCompSincP8", "title": "Bandera Compensador Sinc P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"RAMPASH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "RAMPASH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "rampaEmergencia": { "type": "number", "editable": true, "nullable": false },
                "rampaRegulacion": { "type": "number", "editable": true, "nullable": false },
                "limMinZonaProhibida1": { "type": "number", "editable": true, "nullable": false },
                "limMaxZonaProhibida1": { "type": "number", "editable": true, "nullable": false },
                "limMinZonaProhibida2": { "type": "number", "editable": true, "nullable": false },
                "limMaxZonaProhibida2": { "type": "number", "editable": true, "nullable": false },
                "limMinZonaProhibida3": { "type": "number", "editable": true, "nullable": false },
                "limMaxZonaProhibida3": { "type": "number", "editable": true, "nullable": false },
                "limMinZonaProhibida4": { "type": "number", "editable": true, "nullable": false },
                "limMaxZonaProhibida4": { "type": "number", "editable": true, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "rampaEmergencia", "title": "Rampa Emergencia", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "rampaRegulacion", "title": "Rampa Regulación", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "limMinZonaProhibida1", "title": "Límite Min. Zona Prohibida 01", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "limMaxZonaProhibida1", "title": "Límite Max. Zona Prohibida 01", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "limMinZonaProhibida2", "title": "Límite Min. Zona Prohibida 02", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "limMaxZonaProhibida2", "title": "Límite Max. Zona Prohibida 02", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "limMinZonaProhibida3", "title": "Límite Min. Zona Prohibida 03", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "limMaxZonaProhibida3", "title": "Límite Max. Zona Prohibida 03", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "limMinZonaProhibida4", "title": "Límite Min. Zona Prohibida 04", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "limMaxZonaProhibida4", "title": "Límite Max. Zona Prohibida 04", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"ZONASRESUH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "ZONASRESUH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "unidadZona1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona9": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "unidadZona10": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "unidadZona1", "title": "Unidad Zona 01", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona2", "title": "Unidad Zona 02", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona3", "title": "Unidad Zona 03", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona4", "title": "Unidad Zona 04", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona5", "title": "Unidad Zona 05", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona6", "title": "Unidad Zona 06", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona7", "title": "Unidad Zona 07", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona8", "title": "Unidad Zona 08", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona9", "title": "Unidad Zona 09", "sortable": true, "filterable": true, "width": "12vw"},
            { "field": "unidadZona10", "title": "Unidad Zona 10", "sortable": true, "filterable": true, "width": "12vw"}
        ]
    },
    {
        "nombre":"POTRESRO10H_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "POTRESRO10H_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResRodP1", "title": "Potencia Reserva Rodante P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResRodP2", "title": "Potencia Reserva Rodante P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResRodP3", "title": "Potencia Reserva Rodante P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResRodP4", "title": "Potencia Reserva Rodante P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResRodP5", "title": "Potencia Reserva Rodante P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResRodP6", "title": "Potencia Reserva Rodante P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResRodP7", "title": "Potencia Reserva Rodante P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResRodP8", "title": "Potencia Reserva Rodante P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESRO10H_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "PRERESRO10H_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRodP1", "title": "Precio Reserva Rodante P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResRodP2", "title": "Precio Reserva Rodante P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRodP3", "title": "Precio Reserva Rodante P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRodP4", "title": "Precio Reserva Rodante P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRodP5", "title": "Precio Reserva Rodante P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRodP6", "title": "Precio Reserva Rodante P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRodP7", "title": "Precio Reserva Rodante P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRodP8", "title": "Precio Reserva Rodante P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESNR10H_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "POTRESNR10H_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResNRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResNRodP1", "title": "Potencia Reserva No Rodante P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResNRodP2", "title": "Potencia Reserva No Rodante P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResNRodP3", "title": "Potencia Reserva No Rodante P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResNRodP4", "title": "Potencia Reserva No Rodante P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResNRodP5", "title": "Potencia Reserva No Rodante P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResNRodP6", "title": "Potencia Reserva No Rodante P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResNRodP7", "title": "Potencia Reserva No Rodante P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResNRodP8", "title": "Potencia Reserva No Rodante P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESNR10H_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "PRERESNR10H_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResNRodP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResNRodP1", "title": "Precio Reserva No Rodante P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResNRodP2", "title": "Precio Reserva No Rodante P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResNRodP3", "title": "Precio Reserva No Rodante P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResNRodP4", "title": "Precio Reserva No Rodante P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResNRodP5", "title": "Precio Reserva No Rodante P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResNRodP6", "title": "Precio Reserva No Rodante P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResNRodP7", "title": "Precio Reserva No Rodante P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResNRodP8", "title": "Precio Reserva No Rodante P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESROSUH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "POTRESROSUH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResRodSupP1", "title": "Potencia Reserva Rodante Suplementaria P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResRodSupP2", "title": "Potencia Reserva Rodante Suplementaria P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResRodSupP3", "title": "Potencia Reserva Rodante Suplementaria P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResRodSupP4", "title": "Potencia Reserva Rodante Suplementaria P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResRodSupP5", "title": "Potencia Reserva Rodante Suplementaria P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResRodSupP6", "title": "Potencia Reserva Rodante Suplementaria P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResRodSupP7", "title": "Potencia Reserva Rodante Suplementaria P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResRodSupP8", "title": "Potencia Reserva Rodante Suplementaria P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESROSUH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "PRERESROSUH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRodSupP1", "title": "Precio Reserva Rodante Suplementaria P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResRodSupP2", "title": "Precio Reserva Rodante Suplementaria P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRodSupP3", "title": "Precio Reserva Rodante Suplementaria P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRodSupP4", "title": "Precio Reserva Rodante Suplementaria P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRodSupP5", "title": "Precio Reserva Rodante Suplementaria P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRodSupP6", "title": "Precio Reserva Rodante Suplementaria P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRodSupP7", "title": "Precio Reserva Rodante Suplementaria P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRodSupP8", "title": "Precio Reserva Rodante Suplementaria P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESNRSUH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "POTRESNRSUH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResNRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResNRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResNRodSupP1", "title": "Potencia Reserva No Rodante Suplementaria P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResNRodSupP2", "title": "Potencia Reserva No Rodante Suplementaria P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResNRodSupP3", "title": "Potencia Reserva No Rodante Suplementaria P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResNRodSupP4", "title": "Potencia Reserva No Rodante Suplementaria P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResNRodSupP5", "title": "Potencia Reserva No Rodante Suplementaria P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResNRodSupP6", "title": "Potencia Reserva No Rodante Suplementaria P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResNRodSupP7", "title": "Potencia Reserva No Rodante Suplementaria P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResNRodSupP8", "title": "Potencia Reserva No Rodante Suplementaria P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESNRSUH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "PRERESNRSUH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResNRodSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResNRodSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResNRodSupP1", "title": "Precio Reserva No Rodante Suplementaria P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResNRodSupP2", "title": "Precio Reserva No Rodante Suplementaria P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResNRodSupP3", "title": "Precio Reserva No Rodante Suplementaria P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResNRodSupP4", "title": "Precio Reserva No Rodante Suplementaria P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResNRodSupP5", "title": "Precio Reserva No Rodante Suplementaria P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResNRodSupP6", "title": "Precio Reserva No Rodante Suplementaria P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResNRodSupP7", "title": "Precio Reserva No Rodante Suplementaria P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResNRodSupP8", "title": "Precio Reserva No Rodante Suplementaria P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"POTRESRESEH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "POTRESRESEH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potResSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potResSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potResSecP1", "title": "Potencia Reserva Regulación Secundaria P1", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potResSecP2", "title": "Potencia Reserva Regulación Secundaria P2", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potResSecP3", "title": "Potencia Reserva Regulación Secundaria P3", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potResSecP4", "title": "Potencia Reserva Regulación Secundaria P4", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potResSecP5", "title": "Potencia Reserva Regulación Secundaria P5", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potResSecP6", "title": "Potencia Reserva Regulación Secundaria P6", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potResSecP7", "title": "Potencia Reserva Regulación Secundaria P7", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potResSecP8", "title": "Potencia Reserva Regulación Secundaria P8", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PRERESRESEH_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNIHDERS.csv",
        "modelo": {
            "id": "PRERESRESEH_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResSecP1", "title": "Precio Reserva Regulación Secundaria P1", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preResSecP2", "title": "Precio Reserva Regulación Secundaria P2", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResSecP3", "title": "Precio Reserva Regulación Secundaria P3", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResSecP4", "title": "Precio Reserva Regulación Secundaria P4", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResSecP5", "title": "Precio Reserva Regulación Secundaria P5", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResSecP6", "title": "Precio Reserva Regulación Secundaria P6", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResSecP7", "title": "Precio Reserva Regulación Secundaria P7", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResSecP8", "title": "Precio Reserva Regulación Secundaria P8", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },

    // RENOVABLES
    {
        "nombre":"UNITRE_DERS.csv",
        "unidades": true,
        "tagUnidad": "Unidad",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": false,
        "modelo": {
            "id": "UNITRE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "tipo": { "type": "string", "editable": false, "nullable": false },
                "propiedad": { "type": "string", "editable": false, "nullable": false },
                "propietario": { "type": "string", "editable": false, "nullable": false },
                "numNodos": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombre", "title": "Nombre Unidad", "sortable": true, "filterable": true},
            { "field": "tipo", "title": "Tipo Unidad", "sortable": true, "filterable": true},
            { "field": "propiedad", "title": "Propiedad", "sortable": true, "filterable": true},
            { "field": "propietario", "title": "Propietario", "sortable": true, "filterable": true},
            { "field": "numNodos", "title": "Número Nodos", "sortable": true, "filterable": true}
        ]
    },
    {
        "nombre":"POTVERE_DERS.csv",
        "editable": true,
        "segmentos":3,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRE_DERS.csv",
        "modelo": {
            "id": "POTVERE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potVentaP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potVentaP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potVentaP1", "title": "Potencia Venta P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 1},
            { "field": "potVentaP2", "title": "Potencia Venta P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potVentaP3", "title": "Potencia Venta P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potVentaP4", "title": "Potencia Venta P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potVentaP5", "title": "Potencia Venta P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potVentaP6", "title": "Potencia Venta P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potVentaP7", "title": "Potencia Venta P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potVentaP8", "title": "Potencia Venta P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}", "periodo": 8}
        ]
    },
    {
        "nombre":"PREVERE_DERS.csv",
        "editable": true,
        "segmentos":3,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRE_DERS.csv",
        "modelo": {
            "id": "PREVERE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preVentaP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preVentaP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preVentaP1", "title": "Precio Venta P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
            { "field": "preVentaP2", "title": "Precio Venta P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preVentaP3", "title": "Precio Venta P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preVentaP4", "title": "Precio Venta P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preVentaP5", "title": "Precio Venta P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preVentaP6", "title": "Precio Venta P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preVentaP7", "title": "Precio Venta P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preVentaP8", "title": "Precio Venta P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"LIUNITRE_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRE_DERS.csv",
        "modelo": {
            "id": "LIUNITRE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limInfP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limInfP1", "title": "Límite Inferior P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "limInfP2", "title": "Límite Inferior P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "limInfP3", "title": "Límite Inferior P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "limInfP4", "title": "Límite Inferior P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "limInfP5", "title": "Límite Inferior P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "limInfP6", "title": "Límite Inferior P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "limInfP7", "title": "Límite Inferior P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "limInfP8", "title": "Límite Inferior P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"LSUNITRE_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRE_DERS.csv",
        "modelo": {
            "id": "LSUNITRE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "limSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "limSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "limSupP1", "title": "Límite Superior P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "limSupP2", "title": "Límite Superior P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "limSupP3", "title": "Límite Superior P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "limSupP4", "title": "Límite Superior P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "limSupP5", "title": "Límite Superior P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "limSupP6", "title": "Límite Superior P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "limSupP7", "title": "Límite Superior P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "limSupP8", "title": "Límite Superior P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"ASIGNRE_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRE_DERS.csv",
        "modelo": {
            "id": "ASIGNRE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "asignabilidadP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "asignabilidadP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "asignabilidadP1", "title": "Asignabilidad P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "asignabilidadP2", "title": "Asignabilidad P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "asignabilidadP3", "title": "Asignabilidad P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "asignabilidadP4", "title": "Asignabilidad P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "asignabilidadP5", "title": "Asignabilidad P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "asignabilidadP6", "title": "Asignabilidad P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "asignabilidadP7", "title": "Asignabilidad P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "asignabilidadP8", "title": "Asignabilidad P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"NODOSRE_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRE_DERS.csv",
        "modelo": {
            "id": "NODOSRE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nodoUnidadP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "nodoUnidadP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "nodoUnidadP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "nodoUnidadP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "nodoUnidadP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "nodoUnidadP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "nodoUnidadP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} },
                "nodoUnidadP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 100} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nodoUnidadP1", "title": "Nodo Unidad P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "nodoUnidadP2", "title": "Nodo Unidad P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "nodoUnidadP3", "title": "Nodo Unidad P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "nodoUnidadP4", "title": "Nodo Unidad P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "nodoUnidadP5", "title": "Nodo Unidad P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "nodoUnidadP6", "title": "Nodo Unidad P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "nodoUnidadP7", "title": "Nodo Unidad P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "nodoUnidadP8", "title": "Nodo Unidad P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },
    {
        "nombre":"DISPORE_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"UNITRE_DERS.csv",
        "modelo": {
            "id": "DISPORE_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "disponibilidadP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} },
                "disponibilidadP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1} }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "disponibilidadP1", "title": "Disponibilidad P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
            { "field": "disponibilidadP2", "title": "Disponibilidad P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "disponibilidadP3", "title": "Disponibilidad P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "disponibilidadP4", "title": "Disponibilidad P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "disponibilidadP5", "title": "Disponibilidad P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "disponibilidadP6", "title": "Disponibilidad P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "disponibilidadP7", "title": "Disponibilidad P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "disponibilidadP8", "title": "Disponibilidad P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
        ]
    },

    // NO PROGRAMABLES
    {
        "nombre":"PLNOPRDERS.csv",
        "unidades": true,
        "tagUnidad": "Unidad",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "PLNOPRDERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nombre": { "type": "string", "editable": false, "nullable": false },
                "tipoUnidad": { "type": "string", "editable": false, "nullable": false },
                "propiedad": { "type": "string", "editable": false, "nullable": false },
                "participante": { "type": "string", "editable": false, "nullable": false },
                "numeroNodo": { "type": "number", "editable": false, "nullable": false },
                "banderaNodoDist": { "type": "number", "editable": false, "nullable": false },
                "indiceArchivoFDG": { "type": "number", "editable": false, "nullable": false },
                "numComp": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nombre", "title": "Nombre Unidad", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
			{ "field": "tipoUnidad", "title": "Tipo Unidad", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "propiedad", "title": "Propiedad", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "participante", "title": "Participante", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "numeroNodo", "title": "Número Nodo", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "banderaNodoDist", "title": "Bandera Nodo Distribución", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "indiceArchivoFDG", "title": "Índice FDG", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "numComp", "title": "Número Comp", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
		]
    },
    {
        "nombre":"POTPLNOPR_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"PLNOPRDERS.csv",
        "modelo": {
            "id": "POTPLNOPR_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "potP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "potP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "potP1", "title": "Potencia P1", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 1},
			{ "field": "potP2", "title": "Potencia P2", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 2},
            { "field": "potP3", "title": "Potencia P3", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 3},
            { "field": "potP4", "title": "Potencia P4", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 4},
            { "field": "potP5", "title": "Potencia P5", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 5},
            { "field": "potP6", "title": "Potencia P6", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 6},
            { "field": "potP7", "title": "Potencia P7", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 7},
            { "field": "potP8", "title": "Potencia P8", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}", "periodo": 8}
		]
    },
    {
        "nombre":"NODOSPLNOPR_DERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "origen_unidades":"PLNOPRDERS.csv",
        "modelo": {
            "id": "NODOSPLNOPR_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nodoP1": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "nodoP2": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "nodoP3": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "nodoP4": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "nodoP5": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "nodoP6": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "nodoP7": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} },
                "nodoP8": { "type": "number", "editable": false, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 0, "min": 0, "max": 1000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nodoP1", "title": "Nodo P1", "sortable": true, "filterable": true, "periodo": 1},
			{ "field": "nodoP2", "title": "Nodo P2", "sortable": true, "filterable": true, "periodo": 2},
            { "field": "nodoP3", "title": "Nodo P3", "sortable": true, "filterable": true, "periodo": 3},
            { "field": "nodoP4", "title": "Nodo P4", "sortable": true, "filterable": true, "periodo": 4},
            { "field": "nodoP5", "title": "Nodo P5", "sortable": true, "filterable": true, "periodo": 5},
            { "field": "nodoP6", "title": "Nodo P6", "sortable": true, "filterable": true, "periodo": 6},
            { "field": "nodoP7", "title": "Nodo P7", "sortable": true, "filterable": true, "periodo": 7},
            { "field": "nodoP8", "title": "Nodo P8", "sortable": true, "filterable": true, "periodo": 8}
		]
    },

    // REQ. ZONAS RESERVA
    {
        "nombre":"RRERO10Z_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "RRERO10Z_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqResRod10mP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10mP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10mP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10mP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10mP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10mP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10mP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10mP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqResRod10mP1", "title": "Reserva Rodante 10 Min. P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqResRod10mP2", "title": "Reserva Rodante 10 Min. P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqResRod10mP3", "title": "Reserva Rodante 10 Min. P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqResRod10mP4", "title": "Reserva Rodante 10 Min. P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqResRod10mP5", "title": "Reserva Rodante 10 Min. P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqResRod10mP6", "title": "Reserva Rodante 10 Min. P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqResRod10mP7", "title": "Reserva Rodante 10 Min. P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqResRod10mP8", "title": "Reserva Rodante 10 Min. P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRERO10Z_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "PRERO10Z_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRod10mP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10mP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10mP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10mP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10mP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10mP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10mP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10mP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRod10mP1", "title": "Precio Reserva Rodante 10 Min. P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preResRod10mP2", "title": "Precio Reserva Rodante 10 Min. P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRod10mP3", "title": "Precio Reserva Rodante 10 Min. P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRod10mP4", "title": "Precio Reserva Rodante 10 Min. P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRod10mP5", "title": "Precio Reserva Rodante 10 Min. P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRod10mP6", "title": "Precio Reserva Rodante 10 Min. P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRod10mP7", "title": "Precio Reserva Rodante 10 Min. P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRod10mP8", "title": "Precio Reserva Rodante 10 Min. P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"RRE10Z_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "RRE10Z_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqRes10mP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10mP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10mP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10mP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10mP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10mP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10mP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10mP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqRes10mP1", "title": "Reserva 10 Min. P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqRes10mP2", "title": "Reserva 10 Min. P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqRes10mP3", "title": "Reserva 10 Min. P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqRes10mP4", "title": "Reserva 10 Min. P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqRes10mP5", "title": "Reserva 10 Min. P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqRes10mP6", "title": "Reserva 10 Min. P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqRes10mP7", "title": "Reserva 10 Min. P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqRes10mP8", "title": "Reserva 10 Min. P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRE10Z_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "PRE10Z_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preRes10mP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10mP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10mP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10mP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10mP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10mP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10mP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10mP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preRes10mP1", "title": "Precio Reserva 10 Min. P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preRes10mP2", "title": "Precio Reserva 10 Min. P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preRes10mP3", "title": "Precio Reserva 10 Min. P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preRes10mP4", "title": "Precio Reserva 10 Min. P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preRes10mP5", "title": "Precio Reserva 10 Min. P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preRes10mP6", "title": "Precio Reserva 10 Min. P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preRes10mP7", "title": "Precio Reserva 10 Min. P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preRes10mP8", "title": "Precio Reserva 10 Min. P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"RRESUZ_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "RRESUZ_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqResSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqResSupP1", "title": "Reserva Suplementaria P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqResSupP2", "title": "Reserva Suplementaria P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqResSupP3", "title": "Reserva Suplementaria P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqResSupP4", "title": "Reserva Suplementaria P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqResSupP5", "title": "Reserva Suplementaria P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqResSupP6", "title": "Reserva Suplementaria P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqResSupP7", "title": "Reserva Suplementaria P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqResSupP8", "title": "Reserva Suplementaria P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRESUZ_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "PRE10Z_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResSupP1", "title": "Precio Reserva Suplementaria P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preResSupP2", "title": "Precio Reserva Suplementaria P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResSupP3", "title": "Precio Reserva Suplementaria P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResSupP4", "title": "Precio Reserva Suplementaria P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResSupP5", "title": "Precio Reserva Suplementaria P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResSupP6", "title": "Precio Reserva Suplementaria P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResSupP7", "title": "Precio Reserva Suplementaria P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResSupP8", "title": "Precio Reserva Suplementaria P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"RRERESEZ_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "RRERESEZ_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqResRegSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqResRegSecP1", "title": "Reserva Regulación Sec. P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqResRegSecP2", "title": "Reserva Regulación Sec. P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqResRegSecP3", "title": "Reserva Regulación Sec. P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqResRegSecP4", "title": "Reserva Regulación Sec. P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqResRegSecP5", "title": "Reserva Regulación Sec. P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqResRegSecP6", "title": "Reserva Regulación Sec. P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqResRegSecP7", "title": "Reserva Regulación Sec. P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqResRegSecP8", "title": "Reserva Regulación Sec. P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRERESEZ_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "ZONASRES_DERS.csv",
        "modelo": {
            "id": "PRERESEZ_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRegSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRegSecP1", "title": "Precio Reserva Regulación Sec. P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preResRegSecP2", "title": "Precio Reserva Regulación Sec. P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRegSecP3", "title": "Precio Reserva Regulación Sec. P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRegSecP4", "title": "Precio Reserva Regulación Sec. P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRegSecP5", "title": "Precio Reserva Regulación Sec. P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRegSecP6", "title": "Precio Reserva Regulación Sec. P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRegSecP7", "title": "Precio Reserva Regulación Sec. P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRegSecP8", "title": "Precio Reserva Regulación Sec. P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },

    // REQ. SUBSISTEMAS
    {
        "nombre":"RRERO10S_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "RRERO10S_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqResRod10MinP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10MinP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10MinP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10MinP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10MinP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10MinP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10MinP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRod10MinP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqResRod10MinP1", "title": "Reserva Rodante 10 Min. P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqResRod10MinP2", "title": "Reserva Rodante 10 Min. P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqResRod10MinP3", "title": "Reserva Rodante 10 Min. P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqResRod10MinP4", "title": "Reserva Rodante 10 Min. P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqResRod10MinP5", "title": "Reserva Rodante 10 Min. P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqResRod10MinP6", "title": "Reserva Rodante 10 Min. P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqResRod10MinP7", "title": "Reserva Rodante 10 Min. P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqResRod10MinP8", "title": "Reserva Rodante 10 Min. P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRERO10S_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "PRERO10S_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRod10MinP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10MinP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10MinP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10MinP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10MinP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10MinP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10MinP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRod10MinP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRod10MinP1", "title": "Precio Reserva Rodante 10 Min. P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preResRod10MinP2", "title": "Precio Reserva Rodante 10 Min. P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRod10MinP3", "title": "Precio Reserva Rodante 10 Min. P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRod10MinP4", "title": "Precio Reserva Rodante 10 Min. P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRod10MinP5", "title": "Precio Reserva Rodante 10 Min. P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRod10MinP6", "title": "Precio Reserva Rodante 10 Min. P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRod10MinP7", "title": "Precio Reserva Rodante 10 Min. P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRod10MinP8", "title": "Precio Reserva Rodante 10 Min. P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"RRE10S_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "RRE10S_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqRes10MinP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10MinP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10MinP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10MinP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10MinP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10MinP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10MinP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqRes10MinP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqRes10MinP1", "title": "Reserva 10 Min. P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqRes10MinP2", "title": "Reserva 10 Min. P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqRes10MinP3", "title": "Reserva 10 Min. P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqRes10MinP4", "title": "Reserva 10 Min. P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqRes10MinP5", "title": "Reserva 10 Min. P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqRes10MinP6", "title": "Reserva 10 Min. P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqRes10MinP7", "title": "Reserva 10 Min. P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqRes10MinP8", "title": "Reserva 10 Min. P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRE10S_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "PRE10S_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preRes10MinP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10MinP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10MinP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10MinP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10MinP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10MinP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10MinP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preRes10MinP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preRes10MinP1", "title": "Precio Reserva 10 Min. P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preRes10MinP2", "title": "Precio Reserva 10 Min. P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preRes10MinP3", "title": "Precio Reserva 10 Min. P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preRes10MinP4", "title": "Precio Reserva 10 Min. P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preRes10MinP5", "title": "Precio Reserva 10 Min. P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preRes10MinP6", "title": "Precio Reserva 10 Min. P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preRes10MinP7", "title": "Precio Reserva 10 Min. P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preRes10MinP8", "title": "Precio Reserva 10 Min. P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"RRESUS_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "RRESUS_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqResSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqResSupP1", "title": "Reserva Suplementaria P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqResSupP2", "title": "Reserva Suplementaria P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqResSupP3", "title": "Reserva Suplementaria P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqResSupP4", "title": "Reserva Suplementaria P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqResSupP5", "title": "Reserva Suplementaria P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqResSupP6", "title": "Reserva Suplementaria P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqResSupP7", "title": "Reserva Suplementaria P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqResSupP8", "title": "Reserva Suplementaria P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRESUS_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "PRESUS_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResSupP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResSupP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResSupP1", "title": "Precio Reserva Suplementaria P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preResSupP2", "title": "Precio Reserva Suplementaria P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResSupP3", "title": "Precio Reserva Suplementaria P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResSupP4", "title": "Precio Reserva Suplementaria P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResSupP5", "title": "Precio Reserva Suplementaria P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResSupP6", "title": "Precio Reserva Suplementaria P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResSupP7", "title": "Precio Reserva Suplementaria P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResSupP8", "title": "Precio Reserva Suplementaria P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"RRERESES_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "RRERESES_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "reqResRegSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} },
                "reqResRegSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"n", "decimals": 3, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "reqResRegSecP1", "title": "Reserva Regulación Sec. P1 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "reqResRegSecP2", "title": "Reserva Regulación Sec. P2 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "reqResRegSecP3", "title": "Reserva Regulación Sec. P3 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "reqResRegSecP4", "title": "Reserva Regulación Sec. P4 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "reqResRegSecP5", "title": "Reserva Regulación Sec. P5 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "reqResRegSecP6", "title": "Reserva Regulación Sec. P6 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "reqResRegSecP7", "title": "Reserva Regulación Sec. P7 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "reqResRegSecP8", "title": "Reserva Regulación Sec. P8 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"PRERESES_DERS.csv",
        "editable": true,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "segmentos": 3,
        "origen_unidades": "AUSUBSIS_DERS.csv",
        "modelo": {
            "id": "PRERESES_DERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "preResRegSecP1": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP2": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP3": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP4": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP5": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP6": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP7": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} },
                "preResRegSecP8": { "type": "number", "editable": true, "nullable": false, "validation": { "round": false, "format":"c", "decimals": 2, "min": 0, "max": 1000000} }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "preResRegSecP1", "title": "Precio Reserva Regulación Sec. P1 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 1},
			{ "field": "preResRegSecP2", "title": "Precio Reserva Regulación Sec. P2 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 2},
            { "field": "preResRegSecP3", "title": "Precio Reserva Regulación Sec. P3 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 3},
            { "field": "preResRegSecP4", "title": "Precio Reserva Regulación Sec. P4 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 4},
            { "field": "preResRegSecP5", "title": "Precio Reserva Regulación Sec. P5 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 5},
            { "field": "preResRegSecP6", "title": "Precio Reserva Regulación Sec. P6 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 6},
            { "field": "preResRegSecP7", "title": "Precio Reserva Regulación Sec. P7 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 7},
            { "field": "preResRegSecP8", "title": "Precio Reserva Regulación Sec. P8 ($/Mw)", "sortable": true, "filterable": true, "format": "{0:c2}", "width": "15vw", "periodo": 8}
		]
    },

    // OTROS
    {
        "nombre":"FACDISCAR1.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "FACDISCAR1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP1": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP2": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP3": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP4": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP5": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP6": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP7": { "type": "number", "editable": false, "nullable": false },
                "facDisCarP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "facDisCarP1", "title": "Factores Dist. Cargas P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "facDisCarP2", "title": "Factores Dist. Cargas P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "facDisCarP3", "title": "Factores Dist. Cargas P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "facDisCarP4", "title": "Factores Dist. Cargas P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "facDisCarP5", "title": "Factores Dist. Cargas P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "facDisCarP6", "title": "Factores Dist. Cargas P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "facDisCarP7", "title": "Factores Dist. Cargas P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "facDisCarP8", "title": "Factores Dist. Cargas P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"NODDISCAR1.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "NODDISCAR1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP1": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP2": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP3": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP4": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP5": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP6": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP7": { "type": "number", "editable": false, "nullable": false },
                "nodDisCarP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nodDisCarP1", "title": "Nodos Cargas P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "nodDisCarP2", "title": "Nodos Cargas P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "nodDisCarP3", "title": "Nodos Cargas P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "nodDisCarP4", "title": "Nodos Cargas P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "nodDisCarP5", "title": "Nodos Cargas P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "nodDisCarP6", "title": "Nodos Cargas P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "nodDisCarP7", "title": "Nodos Cargas P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "nodDisCarP8", "title": "Nodos Cargas P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"NOINPADERS.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "NOINPADERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "nodoInt": { "type": "number", "editable": false, "nullable": false },
                "potenciaP1": { "type": "number", "editable": false, "nullable": false },
                "potenciaP2": { "type": "number", "editable": false, "nullable": false },
                "potenciaP3": { "type": "number", "editable": false, "nullable": false },
                "potenciaP4": { "type": "number", "editable": false, "nullable": false },
                "potenciaP5": { "type": "number", "editable": false, "nullable": false },
                "potenciaP6": { "type": "number", "editable": false, "nullable": false },
                "potenciaP7": { "type": "number", "editable": false, "nullable": false },
                "potenciaP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "nodoInt", "title": "Nodo Intercambio", "sortable": true, "filterable": false, "width": "12vw"},
            { "field": "potenciaP1", "title": "Potencia P1 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 1},
			{ "field": "potenciaP2", "title": "Potencia P2 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 2},
            { "field": "potenciaP3", "title": "Potencia P3 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 3},
            { "field": "potenciaP4", "title": "Potencia P4 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 4},
            { "field": "potenciaP5", "title": "Potencia P5 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 5},
            { "field": "potenciaP6", "title": "Potencia P6 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 6},
            { "field": "potenciaP7", "title": "Potencia P7 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 7},
            { "field": "potenciaP8", "title": "Potencia P8 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "periodo": 8}
		]
    },
    {
        "nombre":"FACDISGEN.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "FACDISGEN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "indice": { "type": "number", "editable": false, "nullable": false },
                "indiceNum": { "type": "number", "editable": false, "nullable": false },
                "tipoUnidad": { "type": "string", "editable": false, "nullable": false },
                "clvUnidad": { "type": "string", "editable": false, "nullable": false },
                "facDisGenP1": { "type": "number", "editable": false, "nullable": false },
                "facDisGenP2": { "type": "number", "editable": false, "nullable": false },
                "facDisGenP3": { "type": "number", "editable": false, "nullable": false },
                "facDisGenP4": { "type": "number", "editable": false, "nullable": false },
                "facDisGenP5": { "type": "number", "editable": false, "nullable": false },
                "facDisGenP6": { "type": "number", "editable": false, "nullable": false },
                "facDisGenP7": { "type": "number", "editable": false, "nullable": false },
                "facDisGenP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "indice", "title": "Índice", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "indiceNum", "title": "Índice Numerado", "sortable": true, "filterable": false, "width": "12vw"},
            { "field": "tipoUnidad", "title": "Tipo Unidad", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "clvUnidad", "title": "CLV Unidad", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "facDisGenP1", "title": "Factor Dist. Generación P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "facDisGenP2", "title": "Factor Dist. Generación P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "facDisGenP3", "title": "Factor Dist. Generación P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "facDisGenP4", "title": "Factor Dist. Generación P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "facDisGenP5", "title": "Factor Dist. Generación P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "facDisGenP6", "title": "Factor Dist. Generación P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "facDisGenP7", "title": "Factor Dist. Generación P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "facDisGenP8", "title": "Factor Dist. Generación P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },
    {
        "nombre":"NODDISGEN.csv",
        "editable": false,
        "archivoResultados": false,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "algDep": true,
        "modelo": {
            "id": "NODDISGEN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "indice": { "type": "number", "editable": false, "nullable": false },
                "indiceNum": { "type": "number", "editable": false, "nullable": false },
                "tipoUnidad": { "type": "string", "editable": false, "nullable": false },
                "clvUnidad": { "type": "string", "editable": false, "nullable": false },
                "nodDisGenP1": { "type": "number", "editable": false, "nullable": false },
                "nodDisGenP2": { "type": "number", "editable": false, "nullable": false },
                "nodDisGenP3": { "type": "number", "editable": false, "nullable": false },
                "nodDisGenP4": { "type": "number", "editable": false, "nullable": false },
                "nodDisGenP5": { "type": "number", "editable": false, "nullable": false },
                "nodDisGenP6": { "type": "number", "editable": false, "nullable": false },
                "nodDisGenP7": { "type": "number", "editable": false, "nullable": false },
                "nodDisGenP8": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
			{ "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "indice", "title": "Índice", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "indiceNum", "title": "Índice Numerado", "sortable": true, "filterable": false, "width": "12vw"},
            { "field": "tipoUnidad", "title": "Tipo Unidad", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "clvUnidad", "title": "CLV Unidad", "sortable": true, "filterable": false, "width": "10vw"},
            { "field": "nodDisGenP1", "title": "Nodo Generación P1", "sortable": true, "filterable": true, "width": "15vw", "periodo": 1},
			{ "field": "nodDisGenP2", "title": "Nodo Generación P2", "sortable": true, "filterable": true, "width": "15vw", "periodo": 2},
            { "field": "nodDisGenP3", "title": "Nodo Generación P3", "sortable": true, "filterable": true, "width": "15vw", "periodo": 3},
            { "field": "nodDisGenP4", "title": "Nodo Generación P4", "sortable": true, "filterable": true, "width": "15vw", "periodo": 4},
            { "field": "nodDisGenP5", "title": "Nodo Generación P5", "sortable": true, "filterable": true, "width": "15vw", "periodo": 5},
            { "field": "nodDisGenP6", "title": "Nodo Generación P6", "sortable": true, "filterable": true, "width": "15vw", "periodo": 6},
            { "field": "nodDisGenP7", "title": "Nodo Generación P7", "sortable": true, "filterable": true, "width": "15vw", "periodo": 7},
            { "field": "nodDisGenP8", "title": "Nodo Generación P8", "sortable": true, "filterable": true, "width": "15vw", "periodo": 8}
		]
    },

    // RESULTADOS
    {
        "nombre":"DTR_ZONAS_RESERVA_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_RESERVA_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "CLV_ZONA_RESERVA", "title": "Zona Reserva", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": " Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
			{ "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal R10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_ZONAS_RESERVA_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_RESERVA_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "CLV_ZONA_RESERVA", "title": "Zona Reserva", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": " Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
			{ "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal R10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_ZONAS_RESERVA_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_RESERVA_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "CLV_ZONA_RESERVA", "title": "Zona Reserva", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": " Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
			{ "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal R10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_ZONAS_RESERVA_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_RESERVA_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "CLV_ZONA_RESERVA", "title": "Zona Reserva", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": " Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
			{ "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal R10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DERS_I_TOTALES_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DERS_I_TOTALES_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Generacion": { "type": "number", "editable": false, "nullable": false },
                "NoProgramable": { "type": "number", "editable": false, "nullable": false },
                "Intercambio": { "type": "number", "editable": false, "nullable": false },
                "DualBalance": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Perdida": { "type": "number", "editable": false, "nullable": false },
                "ECA": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Demanda", "title": "Demanda", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Generacion", "title": "Generación", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "NoProgramable", "title": "No Programable", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Intercambio", "title": "Intercambio", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "DualBalance", "title": "DualBalance", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "Corte", "title": "Corte (Excedente)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Perdida", "title": "Pérdida", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "ECA", "title": "Error Control Área", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DERS_I_TOTALES_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DERS_I_TOTALES_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Generacion": { "type": "number", "editable": false, "nullable": false },
                "NoProgramable": { "type": "number", "editable": false, "nullable": false },
                "Intercambio": { "type": "number", "editable": false, "nullable": false },
                "DualBalance": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Perdida": { "type": "number", "editable": false, "nullable": false },
                "ECA": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Demanda", "title": "Demanda", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Generacion", "title": "Generación", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "NoProgramable", "title": "No Programable", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Intercambio", "title": "Intercambio", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "DualBalance", "title": "DualBalance", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "Corte", "title": "Corte (Excedente)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Perdida", "title": "Pérdida", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "ECA", "title": "Error Control Área", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DERS_I_TOTALES_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DERS_I_TOTALES_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Generacion": { "type": "number", "editable": false, "nullable": false },
                "NoProgramable": { "type": "number", "editable": false, "nullable": false },
                "Intercambio": { "type": "number", "editable": false, "nullable": false },
                "DualBalance": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Perdida": { "type": "number", "editable": false, "nullable": false },
                "ECA": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Demanda", "title": "Demanda", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Generacion", "title": "Generación", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "NoProgramable", "title": "No Programable", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Intercambio", "title": "Intercambio", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "DualBalance", "title": "DualBalance", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "Corte", "title": "Corte (Excedente)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Perdida", "title": "Pérdida", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "ECA", "title": "Error Control Área", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DERS_I_TOTALES_AREA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DERS_I_TOTALES_AREA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Intervalo": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Generacion": { "type": "number", "editable": false, "nullable": false },
                "NoProgramable": { "type": "number", "editable": false, "nullable": false },
                "Intercambio": { "type": "number", "editable": false, "nullable": false },
                "DualBalance": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Perdida": { "type": "number", "editable": false, "nullable": false },
                "ECA": { "type": "number", "editable": false, "nullable": false },
                "Area": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Intervalo", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "Demanda", "title": "Demanda", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Generacion", "title": "Generación", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "NoProgramable", "title": "No Programable", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Intercambio", "title": "Intercambio", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "DualBalance", "title": "DualBalance", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "Corte", "title": "Corte (Excedente)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Perdida", "title": "Pérdida", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "ECA", "title": "Error de Control de Área", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Area", "title": "Área", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"DERS_MI_TOTALES_AREA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DERS_MI_TOTALES_AREA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Intervalo": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Generacion": { "type": "number", "editable": false, "nullable": false },
                "NoProgramable": { "type": "number", "editable": false, "nullable": false },
                "Intercambio": { "type": "number", "editable": false, "nullable": false },
                "DualBalance": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Perdida": { "type": "number", "editable": false, "nullable": false },
                "Area": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Intervalo", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "Demanda", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Generacion", "title": "Generación (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "NoProgramable", "title": "No Programable (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Intercambio", "title": "Intercambio (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "DualBalance", "title": "Balance de Potencia - Dual ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
			{ "field": "Corte", "title": "Corte o Excedente", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Perdida", "title": "Pérdida (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Area", "title": "Área", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"DTR_ZONAS_CARGA_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_CARGA_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ZONA", "title": "Clave Zona", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_ORI", "title": "PML ORI ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"DTR_ZONAS_CARGA_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_CARGA_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ZONA", "title": "Clave Zona", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_ORI", "title": "PML ORI ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"DTR_ZONAS_CARGA_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_CARGA_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ZONA", "title": "Clave Zona", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_ORI", "title": "PML ORI ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"DTR_ZONAS_CARGA_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ZONAS_CARGA_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ZONA": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "string", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ZONA", "title": "Clave Zona", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_ORI", "title": "PML ORI ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "15vw"}
        ]
    },
    {
        "nombre":"DTR_REGIONES_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_REGIONES_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "PM_PROM": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_ENE": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_PER": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_CNG": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_GEN": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_CRG": { "type": "number", "editable": false, "nullable": false },
                "CORTE_MDO": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE_MDO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PM_PROM", "title": "Precio Marginal Promedio (PMP) ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PM_PROM_ENE", "title": "PMP ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_PER", "title": "PMP PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_CNG", "title": "PMP CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PM_POND_GEN", "title": "PMP Ponderado GEN ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_POND_CRG", "title": "PMP Ponderado CRG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "CORTE_MDO", "title": "Corte de Carga", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE_MDO", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_REGIONES_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_REGIONES_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "PM_PROM": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_ENE": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_PER": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_CNG": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_GEN": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_CRG": { "type": "number", "editable": false, "nullable": false },
                "CORTE_MDO": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE_MDO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PM_PROM", "title": "Precio Marginal Promedio (PMP) ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PM_PROM_ENE", "title": "PMP ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_PER", "title": "PMP PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_CNG", "title": "PMP CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PM_POND_GEN", "title": "PMP Ponderado GEN ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_POND_CRG", "title": "PMP Ponderado CRG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "CORTE_MDO", "title": "Corte de Carga", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE_MDO", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_REGIONES_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_REGIONES_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "PM_PROM": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_ENE": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_PER": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_CNG": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_GEN": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_CRG": { "type": "number", "editable": false, "nullable": false },
                "CORTE_MDO": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE_MDO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PM_PROM", "title": "Precio Marginal Promedio (PMP) ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PM_PROM_ENE", "title": "PMP ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_PER", "title": "PMP PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_CNG", "title": "PMP CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PM_POND_GEN", "title": "PMP Ponderado GEN ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_POND_CRG", "title": "PMP Ponderado CRG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "CORTE_MDO", "title": "Corte de Carga", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE_MDO", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_REGIONES_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_REGIONES_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "PM_PROM": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_ENE": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_PER": { "type": "number", "editable": false, "nullable": false },
                "PM_PROM_CNG": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_GEN": { "type": "number", "editable": false, "nullable": false },
                "PM_POND_CRG": { "type": "number", "editable": false, "nullable": false },
                "CORTE_MDO": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE_MDO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PM_PROM", "title": "Precio Marginal Promedio (PMP) ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "PM_PROM_ENE", "title": "PMP ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_PER", "title": "PMP PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_PROM_CNG", "title": "PMP CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PM_POND_GEN", "title": "PMP Ponderado GEN ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PM_POND_CRG", "title": "PMP Ponderado CRG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "CORTE_MDO", "title": "Corte de Carga", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE_MDO", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_NODOS_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_NODOS_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_NODO": { "type": "string", "editable": false, "nullable": false },
                "TIPO_NODO": { "type": "number", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "number", "editable": false, "nullable": false },
                "CORTE": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_PER_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "B_DIP": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_NODO", "title": "Clave Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO_NODO", "title": "Tipo Nodo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CORTE", "title": "Corte", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE", "title": "Excedente", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ORI", "title": "PML ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER_ORI", "title": "PML PER-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "B_DIP", "title": "Bandera Disponibilidad", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_NODOS_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_NODOS_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_NODO": { "type": "string", "editable": false, "nullable": false },
                "TIPO_NODO": { "type": "number", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "number", "editable": false, "nullable": false },
                "CORTE": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_PER_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "B_DIP": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_NODO", "title": "Clave Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO_NODO", "title": "Tipo Nodo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CORTE", "title": "Corte", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE", "title": "Excedente", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ORI", "title": "PML ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER_ORI", "title": "PML PER-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "B_DIP", "title": "Bandera Disponibilidad", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_NODOS_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_NODOS_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_NODO": { "type": "string", "editable": false, "nullable": false },
                "TIPO_NODO": { "type": "number", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "number", "editable": false, "nullable": false },
                "CORTE": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_PER_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "B_DIP": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_NODO", "title": "Clave Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO_NODO", "title": "Tipo Nodo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CORTE", "title": "Corte", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE", "title": "Excedente", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ORI", "title": "PML ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER_ORI", "title": "PML PER-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "B_DIP", "title": "Bandera Disponibilidad", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_NODOS_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_NODOS_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_NODO": { "type": "string", "editable": false, "nullable": false },
                "TIPO_NODO": { "type": "number", "editable": false, "nullable": false },
                "CLV_AREA": { "type": "string", "editable": false, "nullable": false },
                "CLV_REGION": { "type": "string", "editable": false, "nullable": false },
                "PML": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE": { "type": "number", "editable": false, "nullable": false },
                "PML_PER": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG": { "type": "number", "editable": false, "nullable": false },
                "DEMANDA": { "type": "number", "editable": false, "nullable": false },
                "CORTE": { "type": "number", "editable": false, "nullable": false },
                "EXCEDENTE": { "type": "number", "editable": false, "nullable": false },
                "PML_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_ENE_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_PER_ORI": { "type": "number", "editable": false, "nullable": false },
                "PML_CNG_ORI": { "type": "number", "editable": false, "nullable": false },
                "B_DIP": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_NODO", "title": "Clave Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO_NODO", "title": "Tipo Nodo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_AREA", "title": "Clave Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_REGION", "title": "Clave Región", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "PML", "title": "Precio Marginal Local (PML) ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ENE", "title": "PML ENE ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "PML_PER", "title": "PML PER ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG", "title": "PML CNG ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "DEMANDA", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CORTE", "title": "Corte", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "EXCEDENTE", "title": "Excedente", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_ORI", "title": "PML ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PML_ENE_ORI", "title": "PML ENE-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_PER_ORI", "title": "PML PER-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "PML_CNG_ORI", "title": "PML CNG-ORI", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "B_DIP", "title": "Bandera Disponibilidad", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_UNIDADES_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_UNIDADES_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_UNIDAD": { "type": "string", "editable": false, "nullable": false },
                "CLV_NODO": { "type": "string", "editable": false, "nullable": false },
                "TIPO_OFERTA": { "type": "string", "editable": false, "nullable": false },
                "MODO": { "type": "number", "editable": false, "nullable": false },
                "ESTADO": { "type": "number", "editable": false, "nullable": false },
                "POTENCIA": { "type": "number", "editable": false, "nullable": false },
                "RR10_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RNR10_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RRS_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RNRS_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RREG_ASIGNADA": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_UNIDAD", "title": "Clave Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_NODO", "title": "Clave Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO_OFERTA", "title": "Tipo Oferta", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "MODO", "title": "Modo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "ESTADO", "title": "Estado", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "POTENCIA", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "RR10_ASIGNADA", "title": "Reserva RR10 Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RNR10_ASIGNADA", "title": "Reserva RN10 Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RRS_ASIGNADA", "title": "Reserva RRS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RNRS_ASIGNADA", "title": "Reserva RNRS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RREG_ASIGNADA", "title": "RREG Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_UNIDADES_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_UNIDADES_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_UNIDAD": { "type": "string", "editable": false, "nullable": false },
                "CLV_NODO": { "type": "string", "editable": false, "nullable": false },
                "TIPO_OFERTA": { "type": "string", "editable": false, "nullable": false },
                "MODO": { "type": "number", "editable": false, "nullable": false },
                "ESTADO": { "type": "number", "editable": false, "nullable": false },
                "POTENCIA": { "type": "number", "editable": false, "nullable": false },
                "RR10_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RNR10_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RRS_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RNRS_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RREG_ASIGNADA": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_UNIDAD", "title": "Clave Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_NODO", "title": "Clave Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO_OFERTA", "title": "Tipo Oferta", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "MODO", "title": "Modo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "ESTADO", "title": "Estado", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "POTENCIA", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "RR10_ASIGNADA", "title": "Reserva RR10 Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RNR10_ASIGNADA", "title": "Reserva RN10 Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RRS_ASIGNADA", "title": "Reserva RRS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RNRS_ASIGNADA", "title": "Reserva RNRS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RREG_ASIGNADA", "title": "RREG Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_UNIDADES_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_UNIDADES_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_UNIDAD": { "type": "string", "editable": false, "nullable": false },
                "CLV_NODO": { "type": "string", "editable": false, "nullable": false },
                "TIPO_OFERTA": { "type": "string", "editable": false, "nullable": false },
                "MODO": { "type": "number", "editable": false, "nullable": false },
                "ESTADO": { "type": "number", "editable": false, "nullable": false },
                "POTENCIA": { "type": "number", "editable": false, "nullable": false },
                "RR10_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RNR10_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RRS_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RNRS_ASIGNADA": { "type": "number", "editable": false, "nullable": false },
                "RREG_ASIGNADA": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_UNIDAD", "title": "Clave Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_NODO", "title": "Clave Nodo", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO_OFERTA", "title": "Tipo Oferta", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "MODO", "title": "Modo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "ESTADO", "title": "Estado", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "POTENCIA", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
			{ "field": "RR10_ASIGNADA", "title": "Reserva RR10 Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RNR10_ASIGNADA", "title": "Reserva RN10 Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RRS_ASIGNADA", "title": "Reserva RRS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RNRS_ASIGNADA", "title": "Reserva RNRS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "RREG_ASIGNADA", "title": "RREG Asignada (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"RESUMEN_UNIDADES.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "RESUMEN_UNIDADES",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "UNIDAD": { "type": "string", "editable": false, "nullable": false },
                "TIPO": { "type": "string", "editable": false, "nullable": false },
                "CI": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "POTENCIA": { "type": "number", "editable": false, "nullable": false },
                "LIM_INF": { "type": "number", "editable": false, "nullable": false },
                "LIM_SUP": { "type": "number", "editable": false, "nullable": false },
                "REG": { "type": "number", "editable": false, "nullable": false },
                "RR10": { "type": "number", "editable": false, "nullable": false },
                "RRS": { "type": "number", "editable": false, "nullable": false },
                "RNR10": { "type": "number", "editable": false, "nullable": false },
                "RNRS": { "type": "number", "editable": false, "nullable": false },
                "DISPONIBILIDAD": { "type": "number", "editable": false, "nullable": false },
                "ASIGNABILIDAD": { "type": "number", "editable": false, "nullable": false },
                "COORDINABILIDAD": { "type": "number", "editable": false, "nullable": false },
                "MARGEN_SUBIR": { "type": "number", "editable": false, "nullable": false },
                "MARGEN_BAJAR": { "type": "number", "editable": false, "nullable": false },
                "PRECIO_SEGMENTO": { "type": "number", "editable": false, "nullable": false },
                "SEGMENTO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "UNIDAD", "title": "Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "TIPO", "title": "Tipo Unidad", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CI", "title": "Condicion Inicial (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "POTENCIA", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "LIM_INF", "title": "Límite Inferior (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "LIM_SUP", "title": "Límite Superior (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "REG", "title": "Regulación", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "RR10", "title": "RR10 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "RRS", "title": "RRS (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "RNR10", "title": "RN10 (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "RNRS", "title": "RNRS (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "DISPONIBILIDAD", "title": "Disponibilidad", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "ASIGNABILIDAD", "title": "Asignabilidad", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "COORDINABILIDAD", "title": "Coordinabilidad", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "MARGEN_SUBIR", "title": "Margen para subir (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "MARGEN_BAJAR", "title": "Margen para bajar (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PRECIO_SEGMENTO", "title": "Precio de Segmento ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "SEGMENTO", "title": "Segmento", "sortable": true, "hidden": true, "filterable": true, "width": "10vw", "format": "{0:n2}"}
        ]
    },
    {
        "nombre":"DTR_ENLACES_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ENLACES_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "LIM_DES_ORI": { "type": "number", "editable": false, "nullable": false },
                "LIM_ORI_DES": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "LIM_DES_ORI", "title": "Límite Superior en el FLujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "LIM_ORI_DES", "title": "Límite Inferior el Flujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CST_MARG", "title": "Costo Marginal ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_ENLACES_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ENLACES_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "LIM_DES_ORI": { "type": "number", "editable": false, "nullable": false },
                "LIM_ORI_DES": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "LIM_DES_ORI", "title": "Límite Superior en el FLujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "LIM_ORI_DES", "title": "Límite Inferior el Flujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CST_MARG", "title": "Costo Marginal ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_ENLACES_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ENLACES_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "LIM_DES_ORI": { "type": "number", "editable": false, "nullable": false },
                "LIM_ORI_DES": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "LIM_DES_ORI", "title": "Límite Superior en el FLujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "LIM_ORI_DES", "title": "Límite Inferior el Flujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CST_MARG", "title": "Costo Marginal ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_ENLACES_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_ENLACES_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "LIM_DES_ORI": { "type": "number", "editable": false, "nullable": false },
                "LIM_ORI_DES": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "LIM_DES_ORI", "title": "Límite Superior en el FLujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "LIM_ORI_DES", "title": "Límite Inferior el Flujo (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "CST_MARG", "title": "Costo Marginal ($/Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_RAMAS_ENL_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_RAMAS_ENL_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "CLV_RAMA": { "type": "string", "editable": false, "nullable": false },
                "NODO_ORIGEN": { "type": "string", "editable": false, "nullable": false },
                "NODO_DESTINO": { "type": "string", "editable": false, "nullable": false },
                "SENTIDO": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_RAMA", "title": "Clave Rama", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_ORIGEN", "title": "Nodo Origen", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_DESTINO", "title": "Nodo Destino", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "SENTIDO", "title": "Sentido", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_RAMAS_ENL_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_RAMAS_ENL_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "CLV_RAMA": { "type": "string", "editable": false, "nullable": false },
                "NODO_ORIGEN": { "type": "string", "editable": false, "nullable": false },
                "NODO_DESTINO": { "type": "string", "editable": false, "nullable": false },
                "SENTIDO": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_RAMA", "title": "Clave Rama", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_ORIGEN", "title": "Nodo Origen", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_DESTINO", "title": "Nodo Destino", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "SENTIDO", "title": "Sentido", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_RAMAS_ENL_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_RAMAS_ENL_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "CLV_RAMA": { "type": "string", "editable": false, "nullable": false },
                "NODO_ORIGEN": { "type": "string", "editable": false, "nullable": false },
                "NODO_DESTINO": { "type": "string", "editable": false, "nullable": false },
                "SENTIDO": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_RAMA", "title": "Clave Rama", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_ORIGEN", "title": "Nodo Origen", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_DESTINO", "title": "Nodo Destino", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "SENTIDO", "title": "Sentido", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_RAMAS_ENL_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_RAMAS_ENL_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_ENLACE": { "type": "string", "editable": false, "nullable": false },
                "CLV_RAMA": { "type": "string", "editable": false, "nullable": false },
                "NODO_ORIGEN": { "type": "string", "editable": false, "nullable": false },
                "NODO_DESTINO": { "type": "string", "editable": false, "nullable": false },
                "SENTIDO": { "type": "number", "editable": false, "nullable": false },
                "FLUJO": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_ENLACE", "title": "Clave Enlace", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "CLV_RAMA", "title": "Clave Rama", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_ORIGEN", "title": "Nodo Origen", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "NODO_DESTINO", "title": "Nodo Destino", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "SENTIDO", "title": "Sentido", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "FLUJO", "title": "Flujo (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_EMBALSES.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_EMBALSES",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "EMBALSE": { "type": "string", "editable": false, "nullable": false },
                "COSTO_OPORTUNIDAD": { "type": "number", "editable": false, "nullable": false },
                "LIM_INF_ENERGIA": { "type": "number", "editable": false, "nullable": false },
                "ENERGIA": { "type": "number", "editable": false, "nullable": false },
                "LIM_SUP_ENERGIA": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "EMBALSE", "title": "Clave Embalse", "sortable": true, "filterable": true, "width": "10vw", "filterable": true},
            { "field": "COSTO_OPORTUNIDAD", "title": "Costo Oportunidad ($/Mwh)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:c2}"},
            { "field": "LIM_INF_ENERGIA", "title": "Límite Inferior (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "ENERGIA", "title": "Energía (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "LIM_SUP_ENERGIA", "title": "Límite Superior (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_SISTEMA_RESERVA_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_SISTEMA_RESERVA_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_SIS_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_SIS_RESERVA", "title": "Clave Sistema", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": "Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal Res. 10 Min. ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_SISTEMA_RESERVA_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_SISTEMA_RESERVA_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_SIS_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_SIS_RESERVA", "title": "Clave Sistema", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": "Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal Res. 10 Min. ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_SISTEMA_RESERVA_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_SISTEMA_RESERVA_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_SIS_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_SIS_RESERVA", "title": "Clave Sistema", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": "Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal Res. 10 Min. ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_SISTEMA_RESERVA_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_SISTEMA_RESERVA_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "INTERVALO": { "type": "number", "editable": false, "nullable": false },
                "CLV_SIS_RESERVA": { "type": "string", "editable": false, "nullable": false },
                "REQ_MW_RREG": { "type": "number", "editable": false, "nullable": false },
                "MW_RREG_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RREG": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RR10": { "type": "number", "editable": false, "nullable": false },
                "MW_RR10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RR10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_R10": { "type": "number", "editable": false, "nullable": false },
                "MW_R10_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_R10": { "type": "number", "editable": false, "nullable": false },
                "REQ_MW_RS": { "type": "number", "editable": false, "nullable": false },
                "MW_RS_ASIGNADOS": { "type": "number", "editable": false, "nullable": false },
                "CST_MARG_RS": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "INTERVALO", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "CLV_SIS_RESERVA", "title": "Clave Sistema", "sortable": true, "filterable": true, "width": "15vw"},
            { "field": "REQ_MW_RREG", "title": "Req. RREG (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RREG_ASIGNADOS", "title": "RREG Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RREG", "title": "Costo Marginal RREG ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RR10", "title": "Req. RR10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RR10_ASIGNADOS", "title": "RR10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RR10", "title": "Costo Marginal RR10 ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_R10", "title": "Req. R10 (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_R10_ASIGNADOS", "title": "R10 Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_R10", "title": "Costo Marginal Res. 10 Min. ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"},
            { "field": "REQ_MW_RS", "title": "Req. RS (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "MW_RS_ASIGNADOS", "title": "RS Asignados (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "CST_MARG_RS", "title": "Costo Marginal RS ($/Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:c2}"}
        ]
    },
    {
        "nombre":"DTR_AREAS_1.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_AREAS_1",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Inter": { "type": "number", "editable": false, "nullable": false },
                "Area": { "type": "string", "editable": false, "nullable": false },
                "GenTer": { "type": "number", "editable": false, "nullable": false },
                "GenHid": { "type": "number", "editable": false, "nullable": false },
                "GenRE": { "type": "number", "editable": false, "nullable": false },
                "GenNP": { "type": "number", "editable": false, "nullable": false },
                "GenTot": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Excedente": { "type": "number", "editable": false, "nullable": false },
                "PotInt": { "type": "number", "editable": false, "nullable": false },
                "Perdidas": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Inter", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "Area", "title": "Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "GenTer", "title": "Generación U. Térmicas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenHid", "title": "Generación U. Hidroeléctricas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenRE", "title": "Generación U. Renovables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenNP", "title": "Generación U. No Programables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenTot", "title": "Generación Total (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Demanda", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Corte", "title": "Corte (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Excedente", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PotInt", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Perdidas", "title": "Pérdidas (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_AREAS_SIN.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_AREAS_SIN",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Inter": { "type": "number", "editable": false, "nullable": false },
                "Area": { "type": "string", "editable": false, "nullable": false },
                "GenTer": { "type": "number", "editable": false, "nullable": false },
                "GenHid": { "type": "number", "editable": false, "nullable": false },
                "GenRE": { "type": "number", "editable": false, "nullable": false },
                "GenNP": { "type": "number", "editable": false, "nullable": false },
                "GenTot": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Excedente": { "type": "number", "editable": false, "nullable": false },
                "PotInt": { "type": "number", "editable": false, "nullable": false },
                "Perdidas": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Inter", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "Area", "title": "Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "GenTer", "title": "Generación U. Térmicas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenHid", "title": "Generación U. Hidroeléctricas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenRE", "title": "Generación U. Renovables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenNP", "title": "Generación U. No Programables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenTot", "title": "Generación Total (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Demanda", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Corte", "title": "Corte (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Excedente", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PotInt", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Perdidas", "title": "Pérdidas (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_AREAS_BCA.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_AREAS_BCA",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Inter": { "type": "number", "editable": false, "nullable": false },
                "Area": { "type": "string", "editable": false, "nullable": false },
                "GenTer": { "type": "number", "editable": false, "nullable": false },
                "GenHid": { "type": "number", "editable": false, "nullable": false },
                "GenRE": { "type": "number", "editable": false, "nullable": false },
                "GenNP": { "type": "number", "editable": false, "nullable": false },
                "GenTot": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Excedente": { "type": "number", "editable": false, "nullable": false },
                "PotInt": { "type": "number", "editable": false, "nullable": false },
                "Perdidas": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Inter", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "Area", "title": "Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "GenTer", "title": "Generación U. Térmicas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenHid", "title": "Generación U. Hidroeléctricas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenRE", "title": "Generación U. Renovables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenNP", "title": "Generación U. No Programables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenTot", "title": "Generación Total (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Demanda", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Corte", "title": "Corte (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Excedente", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PotInt", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Perdidas", "title": "Pérdidas (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"DTR_AREAS_BCS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "ignorarCabecera": true,
        "modelo": {
            "id": "DTR_AREAS_BCS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false },
                "Inter": { "type": "number", "editable": false, "nullable": false },
                "Area": { "type": "string", "editable": false, "nullable": false },
                "GenTer": { "type": "number", "editable": false, "nullable": false },
                "GenHid": { "type": "number", "editable": false, "nullable": false },
                "GenRE": { "type": "number", "editable": false, "nullable": false },
                "GenNP": { "type": "number", "editable": false, "nullable": false },
                "GenTot": { "type": "number", "editable": false, "nullable": false },
                "Demanda": { "type": "number", "editable": false, "nullable": false },
                "Corte": { "type": "number", "editable": false, "nullable": false },
                "Excedente": { "type": "number", "editable": false, "nullable": false },
                "PotInt": { "type": "number", "editable": false, "nullable": false },
                "Perdidas": { "type": "number", "editable": false, "nullable": false }
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable": true, "filterable": false, "width": "3vw"},
            { "field": "Inter", "title": "Intervalo", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n0}"},
            { "field": "Area", "title": "Área", "sortable": true, "filterable": true, "width": "10vw"},
            { "field": "GenTer", "title": "Generación U. Térmicas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenHid", "title": "Generación U. Hidroeléctricas (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenRE", "title": "Generación U. Renovables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenNP", "title": "Generación U. No Programables (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "GenTot", "title": "Generación Total (Mw)", "sortable": true, "filterable": true, "width": "15vw", "format": "{0:n3}"},
            { "field": "Demanda", "title": "Demanda (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Corte", "title": "Corte (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Excedente", "title": "Excedente (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "PotInt", "title": "Potencia (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"},
            { "field": "Perdidas", "title": "Pérdidas (Mw)", "sortable": true, "filterable": true, "width": "10vw", "format": "{0:n3}"}
        ]
    },
    {
        "nombre":"SEMAFOROSDERS.csv",
        "editable": false,
        "archivoResultados": true,
        "algoritmos": ["dersi", "dersmi", "autr"],
        "modelo": {
            "id": "SEMAFOROSDERS",
            "fields": {
                "numFila": { "type": "number", "editable": false, "nullable": false},
                "bandera": { "type": "number", "editable": false, "nullable": false},
                "descripcion": { "type": "string", "editable": false, "nullable": false}
            }
        },
        "columnas": [
            { "field": "numFila", "virtual": true, "title": "#", "sortable":true, "filterable":false, "width": "3vw"},
            { "field": "bandera", "title": "Bandera", "sortable":true, "filterable":true },
            { "field": "descripcion", "title": "Descripción", "sortable":true, "filterable":true }
        ]
    }
];
