module.exports = [
    {
        "nombre":"HORIZODERS.csv",
        "editable": false,
        "campos": [
            {"nombre": "NUM_PERIODOS", "tipo":"REAL"},
            {"nombre":"DURACION_MINUTO", "tipo":"REAL"},
            {"nombre":"TIPO_EJECUCION", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"AUSUBSIS_DERS.csv",
        "editable": false,
        "campos": [
            {"nombre":"NUMERO", "tipo":"REAL"},
            {"nombre":"NOMBRE", "tipo":"TEXT"},
            {"nombre":"ESTADO", "tipo":"REAL"},
            {"nombre":"NODO_REFERENCIA", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"UNITRC_DERS.csv",
        "editable": true,
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
        "nombre":"NODOSDERS.csv",
        "editable": true,
        "campos":[
            {"nombre":"NUM_BUS", "tipo":"REAL"},
        	{"nombre":"NOMBRE_BUS", "tipo":"TEXT"},
        	{"nombre":"NOMBRE_BUS_ABREV", "tipo":"TEXT"},
        	{"nombre":"NUM_AREA", "tipo":"REAL"},
        	{"nombre":"NOMBRE_AREA", "tipo":"TEXT"},
        	{"nombre":"NOMBRE_AREA_ABREV", "tipo":"TEXT"},
        	{"nombre":"TENSION_NOMINAL", "tipo":"REAL"},
        	{"nombre":"SUBSISTEMA_ELECTRICO", "tipo":"TEXT"},
        	{"nombre":"NOMBRE_REGION_PRECIOS", "tipo":"TEXT"},
        	{"nombre":"REGION_PRECIOS_ABREV", "tipo":"TEXT"},
        	{"nombre":"NUM_REG_PRECIOS", "tipo":"REAL"},
        	{"nombre":"DISPONIBILIDAD_INI_NODO", "tipo":"TEXT"},
        	{"nombre":"ZONA_CARGA", "tipo":"TEXT"},
        	{"nombre":"NODO_P", "tipo":"TEXT"}
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
         "segmentos_unidades":true
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
         "segmentos_unidades":true
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
        "nombre":"CARGAS_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"NOMBRE_CP", "tipo":"REAL"},
            { "nombre":"PROPIEDAD", "tipo":"REAL"},
            { "nombre":"TIPO", "tipo":"REAL"},
            { "nombre":"NUMERO_NODO_ASOC", "tipo":"REAL"},
            { "nombre":"BANDERA_NODO_DIS", "tipo":"REAL"},
            { "nombre":"INDICE_DIS_CARGA", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PLNOPRDERS.csv",
        "editable": true,
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
        ]
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
        "origen_unidades": "UNITRC_DERS.csv"
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
        "nombre":"ZONASRES_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NUMERO_ZR", "tipo":"REAL"},
            { "nombre":"NOMBRE_ZR", "tipo":"REAL"},
            { "nombre":"NOMBRE_SUBS_ZR", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"ZONASRESURC_DERS.csv",
        "editable": true,
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
        ]
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
        ]
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
        ]
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
        ]
    },
    {
        "nombre":"UNIHCI_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ESTADO", "tipo":"REAL"},
            { "nombre":"NUM_PERIODOS_CONDINI", "tipo":"REAL"},
            { "nombre":"GENERACION_CONDINI", "tipo":"REAL"},
            { "nombre":"X", "tipo":"REAL"}
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        "editable": true,
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
        ]
    },
    {
        "nombre":"UNITRD_DERS.csv",
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    },
    {
        "nombre":"ARRARD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_SINC_MW", "tipo":"REAL"},
            { "nombre":"POT_SINC_RNRS_MW", "tipo":"REAL"},
            { "nombre":"POT_SINC_RNR10M_MW", "tipo":"REAL"},
            { "nombre":"RAMPA_SUB_SINC", "tipo":"REAL"}
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    },
    {
        "nombre":"RAMPASRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"RAMPA_SUBIDA_OP", "tipo":"REAL"},
            { "nombre":"RAMPA_BAJADA_OP", "tipo":"REAL"},
            { "nombre":"RAMPA_EMERGENCIA", "tipo":"REAL"},
            { "nombre":"RAMPA_REGULACION", "tipo":"REAL"}
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    },
    {
        "nombre":"ZONASRESURD_DERS.csv",
        "editable": true
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
        ]
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
        ]
    },
    {
        "nombre":"UNITRE_DERS.csv",
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
        ]
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
        ]
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
        ]
    },
    {
        "nombre":"LSUNITRE_DERS.csv",
        "editable": true
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
        ]
    },
    {
        "nombre":"GPOUTER_DERS.csv",
        "editable": true,
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
        "editable": true,
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
        "editable": true,
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
        ]
    },
    {
        "nombre":"NODOSDERSD.csv",
        "editable": false,
        "campos":[
            { "nombre":"NUM_BUS", "tipo":"REAL"},
            { "nombre":"NOMBRE_BUS", "tipo":"TEXT"},
            { "nombre":"NOMBRE_BUS_ABREV", "tipo":"TEXT"},
            { "nombre":"NUM_AREA", "tipo":"REAL"},
            { "nombre":"NOMBRE_AREA", "tipo":"TEXT"},
            { "nombre":"NOMBRE_AREA_ABREV", "tipo":"TEXT"},
            { "nombre":"TENSION_NOMINAL", "tipo":"REAL"},
            { "nombre":"SUBSISTEMA_ELECTRICO", "tipo":"TEXT"},
            { "nombre":"NOMBRE_REGION_PRECIOS", "tipo":"TEXT"},
            { "nombre":"REGION_PRECIOS_ABREV", "tipo":"TEXT"},
            { "nombre":"NUM_REG_PRECIOS", "tipo":"REAL"},
            { "nombre":"DISPONIBILIDAD_INI_NODO", "tipo":"TEXT"},
            { "nombre":"ZONA_CARGA", "tipo":"TEXT"},
            { "nombre":"NODO_P", "tipo":"TEXT"}
        ]
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
        "nombre":"RAMASD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"NUM_RAMA", "tipo":"REAL"},
            { "nombre":"NOMBRE_RAMA", "tipo":"TEXT"},
            { "nombre":"INTERVALO_CAMBIO_DISP", "tipo":"REAL"},
            { "nombre":"DISP_RAMA", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"GRUPOSRAMAS_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NUMERO_GPO_RAMAS", "tipo":"REAL"},
            { "nombre":"NOMBRE_GPO_RAMAS", "tipo":"TEXT"},
            { "nombre":"BANDERA", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"GRUPOSRAMASLIM_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"FLUJO_MIN_GPO_INT1", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT1", "tipo":"REAL"},
            { "nombre":"FLUJO_MIN_GPO_INT2", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT2", "tipo":"REAL"},
            { "nombre":"FLUJO_MIN_GPO_INT3", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT3", "tipo":"REAL"},
            { "nombre":"FLUJO_MIN_GPO_INT4", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT4", "tipo":"REAL"},
            { "nombre":"FLUJO_MIN_GPO_INT5", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT5", "tipo":"REAL"},
            { "nombre":"FLUJO_MIN_GPO_INT6", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT6", "tipo":"REAL"},
            { "nombre":"FLUJO_MIN_GPO_INT7", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT7", "tipo":"REAL"},
            { "nombre":"FLUJO_MIN_GPO_INT8", "tipo":"REAL"},
            { "nombre":"FLUJO_MAX_GPO_INT8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"ELEGRURAM_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NOMBRE_ELEM", "tipo":"TEXT"},
            { "nombre":"INDICE_RAMA", "tipo":"REAL"},
            { "nombre":"NOMBRE_NODO_ORIG_RAMA", "tipo":"TEXT"},
            { "nombre":"INDICE_NODO_ORIG_RAMA", "tipo":"REAL"},
            { "nombre":"NOMBRE_NODO_DEST_RAMA", "tipo":"TEXT"},
            { "nombre":"INDICE_NODO_DESTO_RAMA", "tipo":"REAL"},
            { "nombre":"NOMBRE_GRPO_RAMA_REST", "tipo":"TEXT"},
            { "nombre":"INDICE_GPO_RAMA_REST", "tipo":"REAL"},
            { "nombre":"SENTIDO_APORTACION", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"LMP_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"LMPGEN_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"LMPPER_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"LMPCON_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"PMR_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"PMRGEN_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"PMRPER_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"PMRCON_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"GRUPOSRAMASRES_DERS_1.csv",
        "editable": true
        // FALTA BD TABLA
    },
    {
        "nombre":"RESRERO10Z_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRE10Z_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRESUZ_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRERESEZ_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRESSIS_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESGEN_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESMODO_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESCSTOPARR_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRERO10U_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRENRO10U_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESREROSUU_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRENROSUU_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESRERESEU_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"RESCARGAS_DERS_1.csv",
        "editable": true
    },
    {
        "nombre":"DERSPRMTS.csv",
        "editable": true,
        "campos":[
            { "nombre":"BANDERA_PARAM", "tipo":"REAL"},
            { "nombre":"DESCRIPCION", "tipo":"TEXT"}
        ]
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
        "nombre":"NODOSCAR_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_CARGA_P1", "tipo":"REAL"},
            { "nombre":"NODO_CARGA_P2", "tipo":"REAL"},
            { "nombre":"NODO_CARGA_P3", "tipo":"REAL"},
            { "nombre":"NODO_CARGA_P4", "tipo":"REAL"},
            { "nombre":"NODO_CARGA_P5", "tipo":"REAL"},
            { "nombre":"NODO_CARGA_P6", "tipo":"REAL"},
            { "nombre":"NODO_CARGA_P7", "tipo":"REAL"},
            { "nombre":"NODO_CARGA_P8", "tipo":"REAL"}
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    },
    {
        "nombre":"SEMAFOROSDERS.csv",
        "editable": true
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
        "nombre":"PRODEM_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRODEM_P1", "tipo":"REAL"},
            { "nombre":"PRODEM_P2", "tipo":"REAL"},
            { "nombre":"PRODEM_P3", "tipo":"REAL"},
            { "nombre":"PRODEM_P4", "tipo":"REAL"},
            { "nombre":"PRODEM_P5", "tipo":"REAL"},
            { "nombre":"PRODEM_P6", "tipo":"REAL"},
            { "nombre":"PRODEM_P7", "tipo":"REAL"},
            { "nombre":"PRODEM_P8", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"UNIMARG_1.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"REGIONPRECIOS_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"INDICE_REGION", "tipo":"REAL"},
            { "nombre":"NOMBRE_LARGO", "tipo":"TEXT"},
            { "nombre":"NOMBRE_CORTO", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"DERS_MI_TOTALES_1.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_ZONAS_RESERVA_SIN.csv",
        "editable": true
    },
    {
        "nombre":"DTR_SISTEMA_RESERVA_SIN.csv",
        "editable": true
    },
    {
        "nombre":"DTR_ENLACES_SIN.csv",
        "editable": true
    },
    {
        "nombre":"DTR_RAMAS_ENL_SIN.csv",
        "editable": true
    },
    {
        "nombre":"DTR_UNIDADES_SIN.csv",
        "editable": true
    },
    {
        "nombre":"DTR_REGIONES_SIN.csv",
        "editable": true
    },
    {
        "nombre":"DTR_NODOS_SIN.csv",
        "editable": true
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    },
    {
        "nombre":"NODOSP.csv",
        "editable": false,
        "campos":[
            { "nombre":"NUM_NODOS", "tipo":"REAL"},
            { "nombre":"NUM_NODOS_EMS", "tipo":"REAL"},
            { "nombre":"NOMBRE_NODO", "tipo":"TEXT"}
        ]
    },
    {
        "nombre":"PRETOPEPISO.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_MAXIMO", "tipo":"REAL"},
            { "nombre":"PRECIO_MINIMO", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"ZONAS_CARGA.csv",
        "editable": false,
        "campos":[
            { "nombre":"INDICE_ZONA_CARGA", "tipo":"REAL"},
            { "nombre":"SUBSISTEMA", "tipo":"TEXT"},
            { "nombre":"NOMBRE_ZC", "tipo":"TEXT"},
            { "nombre":"INDICE_EMS_ZC", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"RESUMEN_EJECUCION.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"RESUMEN_UNIDADES.csv",
        "editable": true
        // FALTA TABLA BD
    }
];
