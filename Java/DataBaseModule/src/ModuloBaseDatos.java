import BO.util;
import DAO.Conn_BD_ESCEN_SIS;
import DAO.Escenarios;
import DAO.ModeloEscenarios;
import DTO.ClaseControlEscenarios;
import DTO.ClaseInformacionArchivo;
import BO.EnumDataBase;
import BO.EnumEstados;
import BO.EnumZonaHoraria;
import DTO.ClaseCatalogoConfiguracion;
import Implementacion.ModulosProcesamiento;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.log4j.Logger;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author alejandra.moreno
 */
public class ModuloBaseDatos implements Runnable {

    private static Logger logger;
    private static EnumDataBase sBD_write = EnumDataBase.user_write;
    private final String nombrehilo;
    private Connection conexionhilos = null;
    private final int indice;
    private final String rutaa;
    private static String idRegistro;
    private final Thread me;
    private static ClaseInformacionArchivo archivo = null;
    private static HashMap<String, String> hmSQLocal = new HashMap<String, String>();
    private static ArrayList<String> listaArchivos= new ArrayList<String>();
    private static String idEscenario;
    private static String fkUsuario;
    private static String estado;
    private static boolean estatushilo;
    private static boolean estatusfinal = true;
    private ModeloEscenarios mo;
    private static String rutacondirdat;
    private static String rutasindirdat;
    private static String foliooriginal;
    private static String fk_algoritmo;
    private static String sistema;
    private static String fecha;

    /* PARAMETROS CONFIGURABLES: CAMBIAR DE ACUERDO AL SISTEMA BCA/BCS/SIN */
    private static String IDzonahoraria =null;
    private static String ambiente = null;   ///////// PRUEBAS!!!!!!!!!!!!!!


    public ModuloBaseDatos(String nombreh, Connection conexionh, int i, String rutaa, String idReg){
        this.nombrehilo = nombreh;
        this.conexionhilos = conexionh;
        this.indice = i;
        this.rutaa = rutaa;
        this.idRegistro = idReg;
        me = new Thread(this, nombrehilo);
    }

    @Override
    public void run(){
        ModeloEscenarios inserthilos = new ModeloEscenarios(conexionhilos, sistema);
        archivo = ModulosProcesamiento.LeerArchivo(rutaa, listaArchivos.get(indice), hmSQLocal, idRegistro, fk_algoritmo);
        if (archivo != null) {
            estatushilo = inserthilos.InsertarInformacion(hmSQLocal, archivo);
            if(estatushilo == false)
            {
                estatusfinal = false;
            }
        }

    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException, Exception{
        /* PARA PROBAR
        int accion = 2; // 1-REGISTRAR, 2-ACTUALIZAR, 3 - ELIMINAR
        //idEscenario = "201712052104";
        idEscenario = "201712052005";
        fkUsuario= "ALEJANDRA";
        estado= "2"; //"0" eliminar registro y actualizar CONTROL_ESCEN_MODIFICADOS, "2" eliminación completa
        sistema = "BCA";
        //foliooriginal = "201712050010_-08";
        foliooriginal = "201712050011_-08";
        fk_algoritmo = "DERSI";
        String rutaraiz = "\\AppAnalizadorEscenarios\\"+sistema+"\\"+fk_algoritmo.toLowerCase()+"\\escenario_modificado\\2017\\12\\05\\"+foliooriginal+"\\"+idEscenario+"\\";
         FIN PARA PROBAR */

        long tInicio, tFin, tDiferencia;
        tInicio = System.currentTimeMillis();
        int cantmodificados = 0;
        int cantoriginales = 0;
        int accion = Integer.parseInt(args[0]); // REGISTRAR, ACTUALIZAR, ELIMINAR

            idEscenario = String.format(args[1]);
            fkUsuario = String.format(args[2]);
            foliooriginal = String.format(args[3]);
            fk_algoritmo = String.format(args[4]);
            estado = String.format(args[5]);

        String rutaraiz= String.format(args[6]);
        sistema = args[7];
        ModulosProcesamiento.setSistema(sistema);
        util.setSistema(sistema);

        /* PARAMETROS CONFIGURABLES: CAMBIAR DE ACUERDO AL SISTEMA BCA/BCS/SIN */
        if(sistema.equals("BCA"))
        {
            logger = Logger.getLogger ("rollingFileAppenderBCA");
            IDzonahoraria = EnumZonaHoraria.bca_utc.getZona();
            ambiente = EnumDataBase.pruebas.getAmbiente();
        }
        else if(sistema.equals("SIN"))
        {
            logger = Logger.getLogger("rollingFileAppenderSIN");
            IDzonahoraria = EnumZonaHoraria.sin_utc.getZona();
            ambiente = EnumDataBase.pruebas.getAmbiente();
        }
        else if(sistema.equals("BCS"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCS");
            IDzonahoraria = EnumZonaHoraria.bcs_utc.getZona();
            ambiente = EnumDataBase.pruebas.getAmbiente();
        }
        /* FIN PARAMETROS CONFIGURABLES: CAMBIAR DE ACUERDO AL SISTEMA BCA/BCS/SIN */

        fecha = util.ObtenerFechaZonaHoraria(IDzonahoraria);
        System.out.println("Inicio de ejecucion:    "+ fecha);
        logger.info("Inicio de ejecucion:    "+ fecha);
        String dirdat = "dirdat";
        rutacondirdat = rutaraiz+dirdat;
        rutasindirdat = rutaraiz;
        idRegistro = util.getUUID();

            ClaseControlEscenarios dtoEscen = new ClaseControlEscenarios();
            dtoEscen.setId_registro(idRegistro);
            dtoEscen.setId_escenario(idEscenario);
            dtoEscen.setFk_usuario(fkUsuario);
            dtoEscen.setFecha_alta(fecha);
            dtoEscen.setFolio(foliooriginal);
            dtoEscen.setFk_algoritmo(util.getIdAlgoritmo(fk_algoritmo));
            dtoEscen.setEstado(estado);
            dtoEscen.setComentario(util.ObtenerComentario(rutasindirdat));

        switch (accion) {
            case 1 : //REGISTRAR ESCENARIOS POR PRIMERA VEZ
                System.out.println("********* Se inicia el registro de la información de los archivos CSV en la Base de Datos de " + sistema + " ********* ");
                System.out.println("Identificador de registro = " + idRegistro + ". Identificador de escenario ="+idEscenario+". Usuario = "+fkUsuario);

                logger.info("********* Se inicia el registro de la información de los archivos CSV en la Base de Datos de " + sistema + " ********* ");
                logger.info("Identificador de registro = " + idRegistro + ". Identificador de escenario ="+idEscenario+". Usuario = "+fkUsuario);

                Conn_BD_ESCEN_SIS poolconwrite = new Conn_BD_ESCEN_SIS();
                Connection conlocal = null;

                /* Obtener tablas y campos de tablas */
                try {
                    poolconwrite.createPoolConnection(sBD_write, IDzonahoraria, ambiente);
                    conlocal = poolconwrite.getConnectionTransactional(sBD_write, IDzonahoraria);
                    ModeloEscenarios obj = new ModeloEscenarios(conlocal, dtoEscen, sistema);
                    cantmodificados = obj.ContarEscenModificados();
                    cantoriginales = obj.ContarEscenOriginales();
                    ClaseCatalogoConfiguracion par = obj.ObtenerParametros();
                    
                    if(cantoriginales < par.getLIMITE_REG_ORIGINAL())
                    {
                        if(cantmodificados < par.getLIMITE_REG_MODIFICADOS())
                        {
                            IniciarProceso(dtoEscen, rutacondirdat, idRegistro);
                        }
                        else
                        {
                            System.out.println("ERROR: Se ha excedido el límite de registros de los escenarios modificados.");
                            logger.error("ERROR: Se ha excedido el límite de registros de los escenarios modificados. ");
                        }
                    }
                    else
                    {
                        System.out.println("ERROR: Se ha excedido el límite de registros de los escenarios originales.");
                        logger.error("ERROR: Se ha excedido el límite de registros de los escenarios originales. ");
                    }

                } catch (SQLException ex) {
                    System.out.println("ERROR: Error de conexión. No se pueden leer las tablas y campos de la Base de datos. "+ ex.getMessage());
                    logger.error("ERROR: Error de conexión. No se pueden leer las tablas y campos de la Base de datos. "+ ex.getMessage());
                } catch (Exception e) {
                    System.out.println("ERROR*: "+e.getMessage());
                    logger.error("ERROR*: "+e.getMessage());
                }
                try {
                    /* CERRANDO CONEXIÓN */
                    conlocal.commit();
                    conlocal.close();
                    conlocal = null;
                } catch (SQLException ex) {
                    logger.debug("Error al cerrar la conexión. " + ex.getMessage());
                }


                break;
            case 2: // ACTUALIZACION DE REGISTROS    P E N D I E N T E
                System.out.println("********* Se inicia la actualización de la información. ********* ");
                System.out.println("Identificador de registro = " + idRegistro + ". Identificador de escenario ="+idEscenario+". Usuario = "+fkUsuario);

                logger.info("********* Se inicia la actualización de la información. ********* ");
                logger.info("Identificador de registro = " + idRegistro + ". Identificador de escenario ="+idEscenario+". Usuario = "+fkUsuario);


                ActualizarRegistros(dtoEscen);

                break;
            case 3: // ELIMINA REGISTROS (3-POR FALLO, 4-DESDE ORIGINAL, 5-DESDE MODIFICADO)
                System.out.println("********* Se inicia la eliminación de registros en la Base de Datos. ********* ");
                System.out.println("Identificador de registro = " + idRegistro + ". Identificador de escenario ="+idEscenario+". Usuario = "+fkUsuario);

                logger.info("********* Se inicia la eliminación de registros en la Base de Datos. ********* ");
                logger.info("Identificador de registro = " + idRegistro + ". Identificador de escenario ="+idEscenario+". Usuario = "+fkUsuario);

                EliminarRegistros(dtoEscen, estado);

                break;
            default:
                break;
        }


        tFin = System.currentTimeMillis();
        System.out.println("Fin de ejecucion:    "+ fecha);
        logger.info("Fin de ejecucion:    "+ fecha);

        tDiferencia = tFin - tInicio;
        System.out.println("Tiempo total en seg: " + (tDiferencia / 1000));
        logger.info("Tiempo total en seg: " + (tDiferencia / 1000));

    }

    private static void IniciarProceso(ClaseControlEscenarios dtoEscen, String ruta, String clavealeatoria) {
        boolean estatusmod = false ;
        boolean estatusorig = false ;
        Conn_BD_ESCEN_SIS poolconwrite = new Conn_BD_ESCEN_SIS();
        Connection conlocal = null;

        /* Obtener tablas y campos de tablas */
        try {
            poolconwrite.createPoolConnection(sBD_write, IDzonahoraria, ambiente);
            conlocal = poolconwrite.getConnectionTransactional(sBD_write, IDzonahoraria);
            Escenarios obj = new Escenarios(conlocal, sistema);
            hmSQLocal = obj.ObtenerColumnasXTablas(obj.ObtenerTablas());
        } catch (SQLException ex) {
            System.out.println("ERROR: Error de conexión. "+ ex.getMessage());
            logger.error("ERROR: Error de conexión. "+ ex.getMessage());
        } catch (Exception e) {
            System.out.println("ERROR: "+e.getMessage());
            logger.error("ERROR: "+e.getMessage());
        }

        listaArchivos = ModulosProcesamiento.ObtenerArchivosEnDirdat(ruta, hmSQLocal, fk_algoritmo);
        if(listaArchivos != null)
        {
            /* Enviar registro a control_escenarios */
            ModeloEscenarios query = new ModeloEscenarios(conlocal, dtoEscen, sistema);

            estatusorig = query.RegistrarControlEscenOriginales(rutasindirdat.replace("escenario_modificado", "escenario_original").replace(idEscenario + "\\", "") + dtoEscen.getFolio() + ".zip");
            estatusmod = query.RegistrarControlEscenModificados(rutasindirdat + dtoEscen.getId_escenario()+ ".zip");

            if ( (estatusmod != false) ) {
                try {
                    /* Enviar registro a control_registro */
                    query.RegistrarControlRegistros();
                } catch (SQLException ex) {
                    System.out.println("ERROR: Error al insertar el registro del escenario. " + ex.getMessage());
                    logger.error("Error al insertar el registro del escenario. " + ex.getMessage());
                } finally {

                    try {
                        /* CERRANDO CONEXIÓN */
                        conlocal.commit();
                        conlocal.close();
                        conlocal = null;
                    } catch (SQLException ex) {
                        logger.error("Error al cerrar la conexión. " + ex.getMessage());
                    }

                }

                /* HILOS */
                int num_puntos_total = 0;
                num_puntos_total = listaArchivos.size();
                ModuloBaseDatos hilos[] = new ModuloBaseDatos[num_puntos_total];
                int hilosejecutados = 0;
                int hilosparalelos = 10; //numero MAXIMO de hilos que se ejecutaran a la vez

                //numero MAXIMO de hilos que se ejecutaran a la vez
                if (num_puntos_total < hilosparalelos) {
                    hilosparalelos = num_puntos_total;
                }

                int estadohilos[][] = new int[hilosparalelos][2];
                Connection conhilos[] = new Connection[num_puntos_total];

                //Control de Pool
                //Crea los  hilos paralelos INICIALES
                for (int i = 0; i < hilosparalelos; i++) {
                    try {
                        conhilos[i] = poolconwrite.getConnectionTransactional(sBD_write, IDzonahoraria);
                        hilos[i] = new ModuloBaseDatos("hilo_" + listaArchivos.get(hilosejecutados), conhilos[i], hilosejecutados, ruta, clavealeatoria);
                    } catch (Exception ex) {
                        logger.error("Error +++" + ex.getMessage());
                    }
                    // iniciar estados de hilo i: 1=activo, 0=disponible
                    if (estatusfinal == false) {
                        hilos[i].me.interrupt();
                        estatushilo = false;
                    }else{
                        hilos[i].me.run();
                        System.out.println("Registro "+ (hilosejecutados+1) +" de " + num_puntos_total +" del archivo "+listaArchivos.get(hilosejecutados));
                        logger.debug("Registro "+ (hilosejecutados+1) +" de " + num_puntos_total +" del archivo "+listaArchivos.get(hilosejecutados));
                    }
                    estadohilos[i][0] = i;
                    estadohilos[i][1] = 1;
                    hilosejecutados++;
                }//Fin de for

                //CONTROL DE HILOS DE hilosparalelos
                while (hilosejecutados < num_puntos_total) {
                    for (int i = 0; i < hilosparalelos && (hilosejecutados < num_puntos_total); i++) {

                        if ((estadohilos[i][1] == 0)) {
                            try {
                                hilos[hilosejecutados] = new ModuloBaseDatos("hilo_" + listaArchivos.get(hilosejecutados), conhilos[i], hilosejecutados, ruta, clavealeatoria);
                            } catch (Exception ex) {
                                logger.error("Error ***" + ex.getMessage());
                            }
                            //hilos[hilosejecutados].me.run();
                            if (estatusfinal == false) {
                                hilos[hilosejecutados].me.interrupt();
                                estatushilo = false;
                            }else{
                                hilos[hilosejecutados].me.run();
                                System.out.println("Registro "+ (hilosejecutados+1) +" de " + num_puntos_total +" del archivo "+listaArchivos.get(hilosejecutados));
                                logger.debug("Registro "+ (hilosejecutados+1) +" de " + num_puntos_total +" del archivo "+listaArchivos.get(hilosejecutados));
                            }
                            estadohilos[i][0] = hilosejecutados;
                            estadohilos[i][1] = 1;  //hilo ocupado o en proceso
                            hilosejecutados++;
                        } else if (hilos[estadohilos[i][0]].me.isAlive() == false) { //true if this thread is alive; false otherwise. Tests if this thread is alive. A thread is alive if it has been started and has not yet died.
                            estadohilos[i][1] = 0;
                            //System.out.println(listaArchivos.get(estadohilos[i][0]) + " ***> " + hilos[estadohilos[i][0]].me.getName() + " ---> estado: terminado");
                            //logger.info(listaArchivos.get(estadohilos[i][0]) + " ***> " + hilos[estadohilos[i][0]].me.getName() + " ---> estado: terminado");
                        }
                    }//for hilos paralelos
                }//Fin de while

                // VERIFICA TERMINACION DE LOS ULTIMOS N HILOS EJECUTADOS E INSETAR A LA BD
                while (hilosejecutados < num_puntos_total + hilosparalelos) {
                    for (int i = 0; i < hilosparalelos; i++) {
                        if ((estadohilos[i][1] == 0)) {
                            hilosparalelos--;
                        } else if (hilos[estadohilos[i][0]].me.isAlive() == false) { //verdadero si esta vivo, falso si terminó
                            estadohilos[i][1] = 0;
                            hilosejecutados++;
                            try {
                                /* CERRANDO CONEXIÓN */
                                //conhilos[i].commit();
                                conhilos[i].close();
                                conhilos[i] = null;
                            } catch (SQLException ex) {
                                logger.error(ex.getMessage());
                                try {
                                    conhilos[i].rollback();
                                } catch (SQLException e) {
                                    logger.error("Se realiza un Rollback en la información. Error " + e.getMessage());
                                }
                            }
                            //System.out.println(listaArchivos.get(estadohilos[i][0]) + " --->" + hilos[estadohilos[i][0]].me.getName() + "---> estado:terminado");
                            //logger.info(listaArchivos.get(estadohilos[i][0]) + " --->" + hilos[estadohilos[i][0]].me.getName() + "---> estado:terminado");
                        }
                        else{
                            logger.error("Registro ++"+ (hilosejecutados+1) +" de " + num_puntos_total);
                        }
                    }//for hilos paralelos
                }//Fin de while


                logger.info("hilosejecutados " + hilosejecutados+"    "+ (num_puntos_total + hilosparalelos));

                /* FIN HILOS */

            } else {
                logger.error("ERROR: No se guardó el registro del escenario.");
            }

        }
        else
        {
            System.out.println("ERROR: No hay información para proceder a la ejecución.");
            logger.error("ERROR: No hay información para proceder a la ejecución.");
        }

        if (estatusfinal == false) {
            EliminarRegistros(dtoEscen, EnumEstados.porfallo.getEstado());
        }
        else{
            System.out.println("********* EXITO: Ejecución terminada con éxito. *********");
            logger.info("********* EXITO: Ejecución terminada con éxito. *********");
        }
    }


    private static void EliminarRegistros(ClaseControlEscenarios dtoEscen, String estado){

        Conn_BD_ESCEN_SIS poolconwrite = new Conn_BD_ESCEN_SIS();
        Connection condelete =null;
        boolean estatusescenm;
        boolean estatusesceno;
        //boolean estatusreg;

        try {
            poolconwrite.createPoolConnection(sBD_write, IDzonahoraria, ambiente);
            condelete = poolconwrite.getConnectionTransactional(sBD_write, IDzonahoraria);

            ModeloEscenarios delete = new ModeloEscenarios(condelete, dtoEscen, estado, sistema);
            if(estado.equals(EnumEstados.porfallo.getEstado())) // ESTADO 3, POR FALLO
            {
                //estatusreg = delete.EliminarRegistro();
                estatusesceno = delete.EliminarEscenarioOrig();
                estatusescenm = delete.EliminarEscenarioModif();
                logger.debug("ELIMINAR POR ESTADO 3-FALLO + estatusescenm "+estatusescenm+" estatusesceno "+estatusesceno);
            }
            else if(estado.equals(EnumEstados.desdeoriginal.getEstado())) // ESTADO 4, DESDE ORIGINAL
            {
                estatusesceno = delete.EliminarEscenarioOrig();
                estatusescenm = delete.EliminarEscenarioModif();
                //estatusreg = delete.EliminarRegistro();
                logger.debug("ELIMINAR POR ESTADO 4-ORIGINAL + estatusescenm "+estatusescenm+" estatusesceno "+estatusesceno);
            }
            else if(estado.equals(EnumEstados.desdemodificado.getEstado())) // ESTADO 5, DESDE MODIFICADO
            {
                estatusescenm = delete.EliminarEscenarioModif();
                //estatusreg = delete.EliminarRegistro();
                logger.debug("ELIMINAR POR ESTADO 5-MODIFICADO + estatusescenm "+estatusescenm);
            }

        } catch (SQLException ex) {
            logger.error("Ocurrió un error");
        } catch (Exception e) {
            logger.error("Ocurrió un error");
        }
        finally{
            try {
                condelete.close();
                condelete = null;
            } catch (SQLException ex) {
                logger.error("No se pudo cerrar la conexión");
            }
        }

    }

    private static void ActualizarRegistros(ClaseControlEscenarios dtoEscen) {
        Conn_BD_ESCEN_SIS poolconwrite = new Conn_BD_ESCEN_SIS();
        Connection conupdate =null;
        //boolean estatusregm = false;
        //boolean estatusrego = false;
        boolean estatuselimm = false;
        //boolean estatuselimo = false;

        try {
            poolconwrite.createPoolConnection(sBD_write, IDzonahoraria, ambiente);
            conupdate = poolconwrite.getConnectionTransactional(sBD_write, IDzonahoraria);

            ModeloEscenarios update = new ModeloEscenarios(conupdate, dtoEscen, estado, sistema);
            estatuselimm = update.EliminarEscenarioModif();
            //estatuselimo = update.EliminarRegistro();

            //if(estatuselimm = true && estatuselimo == true){
            if(estatuselimm = true){
                //estatusregm = update.RegistrarControlEscenModificados(rutasindirdat + dtoEscen.getId_escenario()+ ".zip");
                //estatusrego = update.RegistrarControlRegistros();
                IniciarProceso(dtoEscen, rutacondirdat, idRegistro);
            }else{
                System.out.println("ERROR: No se pudo eliminar el registro.");
            logger.error("ERROR: No se pudo eliminar el registro.");
            }

            //estatus = update.ActualizarEstado();

        } catch (SQLException ex) {
            logger.error("Ocurrió un error");
        } catch (Exception e) {
            logger.error("Ocurrió un error");
        }
        finally{
            try {
                conupdate.close();
                conupdate = null;
            } catch (SQLException ex) {
                logger.error("No se pudo cerrar la conexión");
            }
        }

    }


}
