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
        "nombre":"NODOSDERS.csv",
        "editable": false,
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
        "nombre":"POTVERC_DERS.csv",
        "editable": true,
        "campos":[
            {"nombre":"POT_VENTA_P1", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv",
         "segmentos_unidades":11
    },
    {
        "nombre":"PREVERC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_VENTA_P1", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv",
         "segmentos_unidades":11
    },
    {
        "nombre":"LIUNITRC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_INFERIOR_P1", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"LSUNITRC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_SUPERIOR_P1", "tipo":"REAL"}
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
            { "nombre":"POTENCIA_P1", "tipo":"TEXT"}
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
        "nombre":"ASIGNRC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIG_UNIDAD_P1", "tipo":"REAL"}
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
        "nombre":"NOINPADERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NOD_INTERCAMBIO", "tipo":"REAL"},
            { "nombre":"POT_ACT_P1", "tipo":"REAL"}
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
            { "nombre":"LIM_INF_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"LSUNIH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIM_SUP_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"ASIGNH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIG_UNIDAD_P1", "tipo":"REAL"}
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
            { "nombre":"POT_RES_ROD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESRO10H_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_ROD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESROSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_RODSUP_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESROSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_RODSUP_P1", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESRESEH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_REGSEC_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESRESEH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_REGSEC_P1", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESNR10H_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NROD_P1", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESNR10H_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NROD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"POTRESNRSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_RES_NRODSUP_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"PRERESNRSUH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_RES_NRODSUP_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
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
        //
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
        "nombre":"CGMRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"COSTO_GENMINMOD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"POTVERD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"POT_VENTASEGMOD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv",
        "segmentos_unidades": 3
    },
    {
        "nombre":"PREVERD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_VENTASEGMOD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv",
        "segmentos_unidades": 3
    },
    {
        "nombre":"LIUNITRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_INFGENMOD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"LSUNITRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_SUPGENMOD_P1", "tipo":"REAL"}
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
        //
    },
    {
        "nombre":"TRANSRD_DERS.csv",
        "editable": true,
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
        "nombre":"ASIGNRD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIGMOD_UNIDAD_P1", "tipo":"REAL"}
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
        //
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
        //
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
            { "nombre":"POT_VENTA_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv",
        "segmentos_unidades":3
    },
    {
        "nombre":"PREVERE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRECIO_VENTA_P1", "tipo":"TEXT"}
        ],
        "origen_unidades":"UNITRE_DERS.csv",
        "segmentos_unidades":3
    },
    {
        "nombre":"LIUNITRE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"LIMITE_INFERIOR_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
    },
    {
        "nombre":"LSUNITRE_DERS.csv",
        "editable": true,
        "origen_unidades":"UNITRE_DERS.csv"
        // FALTA BD
    },
    {
        "nombre":"ASIGNRE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"ASIG_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
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
            { "nombre":"FLUJO_MAX_GPO_INT1", "tipo":"REAL"}
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
        // FALTA BD
    },
    {
        "nombre":"LMPGEN_DERS_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"LMPPER_DERS_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"LMPCON_DERS_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"PMR_DERS_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"PMRGEN_DERS_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"PMRPER_DERS_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"PMRCON_DERS_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"GRUPOSRAMASRES_DERS_1.csv",
        "editable": true
        // FALTA BD
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
        "nombre":"RESREROSUU_DERS_1.csv",
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
            { "nombre":"NODO_UNIDAD_P1", "tipo":"TEXT"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"NODOSCAR_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_CARGA_P1", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"NODOSPLNOPR_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_UNP_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"PLNOPRDERS.csv"
    },
    {
        "nombre":"NODOSINPA_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_INT1", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"NODOSH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"NODO_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"NODOSCOMPOURD_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_COMP_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"NODOSRE_DERS.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODO_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
    },
    {
        "nombre":"SEMAFOROSDERSI.csv",
        "editable": false
        // FALTA BD
    },
    {
        "nombre":"NODDISGEN.csv",
        "editable": false,
        "campos":[
            { "nombre":"INDICE", "tipo":"REAL"},
            { "nombre":"INDICE_NUMERADO", "tipo":"REAL"},
            { "nombre":"TIPO_UNIDAD", "tipo":"TEXT"},
            { "nombre":"CLV_UNIDAD", "tipo":"TEXT"},
            { "nombre":"NODDISGEN_P1", "tipo":"REAL"}
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
            { "nombre":"NODDISGEN_P1", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"NODDISCAR1.csv",
        "editable": false,
        "campos":[
            { "nombre":"NODDISCAR_P1", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"FACDISCAR1.csv",
        "editable": false,
        "campos":[
            { "nombre":"FACDISCAR_P1", "tipo":"REAL"}
        ]
    },
    {
        "nombre":"PRODEM_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"PRODEM_P1", "tipo":"REAL"}
        ]
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
        "nombre":"DERS_I_TOTALES_1.csv",
        "editable": true
        // FALTA BD
    },
    {
        "nombre":"DTR_ENLACES_SIN.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"DTR_RAMAS_ENL_SIN.csv",
        "editable": true
        // FALTA TABLA BD
    },
    {
        "nombre":"COORDRC.csv",
        "editable": true,
        "campos":[
            { "nombre":"COORD_UNIDAD_P1", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"COORDRD.csv",
        "editable": true,
        "campos":[
            { "nombre":"COORD_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"COORDH.csv",
        "editable": true,
        "campos":[
            { "nombre":"COORD_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"DISPORC_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"}
        ],
         "origen_unidades":"UNITRC_DERS.csv"
    },
    {
        "nombre":"DISPOH_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNIHDERS.csv"
    },
    {
        "nombre":"DISPORD_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRD_DERS.csv"
    },
    {
        "nombre":"DISPORE_DERS.csv",
        "editable": true,
        "campos":[
            { "nombre":"DISP_UNIDAD_P1", "tipo":"REAL"}
        ],
        "origen_unidades":"UNITRE_DERS.csv"
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
        "editable": false
        // FALTA TABLA BD
    }
];
