/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import BO.EnumEstados;
import BO.util;
import DTO.ClaseCatalogoConfiguracion;
import DTO.ClaseControlEscenarios;
import DTO.ClaseInformacionArchivo;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import org.apache.log4j.Logger;

/**
 *
 * @author alejandra.moreno
 */
public class ModeloEscenarios {
    
    private static Logger logger ;
    
    private Connection con = null;
    private util u = null;
    private String idEscenarios;
    private String nomUsuario;
    private String estado;
    private String sistema;
    private ClaseControlEscenarios dtoEscen=null;
    
    public ModeloEscenarios(Connection conlocal, String sis) {
        this.con = conlocal;  
        this.sistema = sis;
        if(sistema.equals("BCA"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCA");
        }
        else if(sistema.equals("SIN"))
        {
            logger = Logger.getLogger("rollingFileAppenderSIN");
        }
        else if(sistema.equals("BCS"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCS");
        }
    }
    
    public ModeloEscenarios(Connection conlocal, ClaseControlEscenarios dtoEscen, String sis) {
        this.con = conlocal;  
        this.dtoEscen = dtoEscen;
        this.sistema = sis;
        if(sistema.equals("BCA"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCA");
        }
        else if(sistema.equals("SIN"))
        {
            logger = Logger.getLogger("rollingFileAppenderSIN");
        }
        else if(sistema.equals("BCS"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCS");
        }
    }
    
    public ModeloEscenarios(Connection conlocal, ClaseControlEscenarios dtoEscen, String estado, String sis) {
        this.con = conlocal;  
        this.dtoEscen = dtoEscen;
        this.estado = estado;
        this.sistema = sis;
        if(sistema.equals("BCA"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCA");
        }
        else if(sistema.equals("SIN"))
        {
            logger = Logger.getLogger("rollingFileAppenderSIN");
        }
        else if(sistema.equals("BCS"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCS");
        }
    }
    
    public ModeloEscenarios(Connection conlocal, String fkusuario, String sis) {
        this.con = conlocal;  
        this.nomUsuario = fkusuario;
        this.sistema = sis;
        if(sistema.equals("BCA"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCA");
        }
        else if(sistema.equals("SIN"))
        {
            logger = Logger.getLogger("rollingFileAppenderSIN");
        }
        else if(sistema.equals("BCS"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCS");
        }
    }
    
    
    
    
    
    public boolean InsertarInformacion(HashMap<String, String> hmTablasCampos, ClaseInformacionArchivo archivo) {
        PreparedStatement ps =null;
        int count=0;
        final int batchSize=1000;
        String query = "";
        String tabla ="";
        boolean estatus = false;
        try{
            
            for(int i = 0; i < archivo.getListInfoArchivo().size(); i = i+2)
            {
                count++;
                if( hmTablasCampos.containsKey(archivo.getListInfoArchivo().get(i)) )
                {
                    query = 
                            "INSERT INTO "+ archivo.getListInfoArchivo().get(i) +
                            " ("+ hmTablasCampos.get(archivo.getListInfoArchivo().get(i))  +") "+
                            "VALUES("+ archivo.getListInfoArchivo().get(i+1) +")";
                    tabla = archivo.getListInfoArchivo().get(i);
                    //logger.info(query+";");
                    
                    ps = con.prepareStatement(query);
                    ps.addBatch(); 
                    
                    if(++count % batchSize==0){
                        ps.executeBatch();
                    }
                }
                
                ps.executeBatch();
                ps.close();
                estatus = true;
            }
            count = 0;
        }
        catch (SQLException e) {
            logger.info(query+";");
            System.out.println("ERROR: Error al insertar la información a la Base de Datos.");
            logger.error("ERROR: Error al insertar la información "+ count/2 +" a la tabla: "+tabla+ ". Mensaje de error " + e.getMessage());
            estatus = false;
        }
        finally{
            try{
                if (ps != null) {
                    con.commit();
                    ps.close();
                }
                ps = null;
            }catch (Exception e) {
                logger.error("Ocurrió un error en InsertarInformacion "+ e.getMessage());
             }
        }
        
        return estatus;
    }
    
    
    public boolean RegistrarControlEscenModificados(String rutaarchivozip) {
        Statement statement = null;
        boolean estatus = false;
        PreparedStatement ps = null;

        try {
            String query = "INSERT INTO CONTROL_ESCEN_MODIFICADOS "
                    + "(ID_ESCENARIO,FK_USUARIO,FECHA_ALTA,FOLIO_ORIGINAL,FK_ALGORITMO,ESTADO,ZIP,COMENTARIO, BYTES) "
                    + "values(?,?,to_timestamp_tz(?,'DD/MM/RR HH24:MI:SSXFF TZR'),?,?,?,?,?,?)";
            logger.debug(query+";");
            
            ps = con.prepareStatement(query);
            
            ps.setString(1, dtoEscen.getId_escenario());
            ps.setString(2, dtoEscen.getFk_usuario());
            ps.setString(3, dtoEscen.getFecha_alta());
            ps.setString(4, dtoEscen.getFolio());
            ps.setInt(5, dtoEscen.getFk_algoritmo());
            ps.setInt(6, dtoEscen.getEstado());
            ps.setString(8, dtoEscen.getComentario());

            File f = new File(rutaarchivozip);

            // Agrega los valores: bytes del archivo y tamanio
            try (InputStream in = new FileInputStream(rutaarchivozip)) {
                // Agrega los valores: ID, bytes del archivo y tamanio

                if (f.exists()) {
                    //System.out.println("Archivo existe");
                    ps.setBinaryStream(7, in);
                    ps.setInt(9, (int)f.length());
                } else {
                    //System.out.println("Archivo no existe");
                    ps.setBinaryStream(7, in);
                    ps.setInt(9, -1);
                }

                // Ejecuta
                int n = ps.executeUpdate();

                if (n > 0) {
                    logger.info("¡Registro del escenario modificado insertado!");
                    estatus = true;
                    //System.out.println("Registro actualizado correctamente");
                } else {
                    logger.info("El registro no se actualizó");
                    estatus = false;
                }

            } catch (IOException ex) {
                logger.info("Error en el ZIP: " + ex.getMessage()+" ruta: "+ rutaarchivozip);
                estatus = false;
            }
        }
        catch (SQLException e) {
            if(e.getErrorCode() == 1){ // 1 - ORA-00001
                System.out.println("ERROR: Ya existe el registro del escenario modificado " + dtoEscen.getId_escenario()+ " para el usuario "+dtoEscen.getFk_usuario());
                logger.error("ERROR: Ya existe el registro del escenario modificado " + dtoEscen.getId_escenario()+ " para el usuario "+dtoEscen.getFk_usuario());
            }else{
                logger.error("ERROR: " + e.getMessage());
            }
            estatus = false;
        }
        finally{
            try {
                //con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Error en RegistrarControlEscenarios : " + ex.getMessage());
                estatus = false;
            }
        }

        return estatus;
    }
    
    public boolean RegistrarControlEscenOriginales(String rutaarchivozip)  {
        boolean estatus = false;
        String query ="";
        PreparedStatement ps = null;
        int validarnombreexis=0;
        int cantorigporfolio = ContarEscenOriginalesPorFolio(dtoEscen.getFolio(), dtoEscen.getFk_algoritmo());
        String propietario = "";
        try{
            propietario = ObtenerPropietario(dtoEscen.getFolio());
            validarnombreexis = u.ValidarNombreExistente(propietario, dtoEscen.getFk_usuario());
        }
        catch(NullPointerException e)
        {
            validarnombreexis = 3;
            logger.debug("error " +e.getMessage());
        }
        
        logger.info("ALGORITO " +dtoEscen.getFk_algoritmo());
        
        try {
            if ( cantorigporfolio < 1 && validarnombreexis ==3) { // si el registro no existe y usuario es null, crea el registro
                query = "INSERT INTO CONTROL_ESCEN_ORIGINALES (FOLIO,BYTES,ZIP,FK_ALGORITMO,PROPIETARIO) "
                        + "values(?,?,?,?,?)";
                logger.info("queryyyy " +query);
                ps = con.prepareStatement(query);
                // El objeto archivo ayuda a obtener su tamanio
                File f = new File(rutaarchivozip);

                // Agrega los valores: bytes del archivo y tamanio
                try (InputStream in = new FileInputStream(rutaarchivozip)) {
                    // Agrega los valores: ID, bytes del archivo y tamanio
                    ps.setString(1, dtoEscen.getFolio());

                    if (f.exists()) {
                        logger.debug("Archivo existe");
                        ps.setBinaryStream(3, in);
                        ps.setInt(2, (int) f.length());
                    } else {
                        logger.debug("Archivo no existe");
                        ps.setBinaryStream(3, in);
                        ps.setInt(2, -1);
                    }
                    ps.setInt(4, dtoEscen.getFk_algoritmo());

                    ps.setString(5, dtoEscen.getFk_usuario());

                    // Ejecuta
                    int n = ps.executeUpdate();

                    if (n > 0) {
                        logger.debug("¡Registro del escenario original insertado!");
                        estatus = true;
                        logger.debug("Registro insertado correctamente");
                    } else {
                        logger.debug("El registro no se insertó");
                        estatus = false;
                    }
                }
            } 
            //else if (cantorigporfolio == 1 && (validarnombreexis == 2 || validarnombreexis == 1) ) {
            else if (cantorigporfolio == 1 && validarnombreexis == 2 ) { // Si hay un registro y el nombre existe entre muchos
                logger.debug("Ya existe el usuario registrado. ");
                estatus = true;
            }else if (cantorigporfolio == 1 && validarnombreexis == 3 ) { // Si hay un registro y el nombre no existe, actualiza el registro
                String connombre = propietario.concat("," + dtoEscen.getFk_usuario());
                logger.debug(connombre);
                query = "UPDATE CONTROL_ESCEN_ORIGINALES SET "
                        + "PROPIETARIO = '" + connombre
                        + "' WHERE "
                        + " FOLIO = '" + dtoEscen.getFolio() + "' ";
                logger.info("queryyyy " +query);
                ps = con.prepareStatement(query);

                // Ejecuta
                int n = ps.executeUpdate();

                if (n > 0) {
                    logger.debug("¡Registro del escenario original actualizado!");
                    estatus = true;
                    logger.debug("Registro actualizado correctamente");
                } else {
                    logger.debug("El registro no se actualizó");
                    estatus = false;
                }
            }else if (cantorigporfolio == 1 && validarnombreexis == 1 ) { // Si hay un registro y el nombre no existe, actualiza
                
                String connombre = propietario.concat("," + dtoEscen.getFk_usuario());
                logger.debug(connombre);
                query = "UPDATE CONTROL_ESCEN_ORIGINALES SET "
                        + "PROPIETARIO = '" + connombre
                        + "' WHERE "
                        + " FOLIO = '" + dtoEscen.getFolio() + "' ";

                ps = con.prepareStatement(query);

                // Ejecuta
                int n = ps.executeUpdate();

                if (n > 0) {
                    logger.debug("¡Registro del escenario original actualizado!");
                    estatus = true;
                    logger.debug("Registro actualizado correctamente");
                } else {
                    logger.debug("El registro no se actualizó");
                    estatus = false;
                }
                
            }
            
            logger.debug(query + ";");

        } catch (SQLException e) {
            //logger.error("ERROR -> Falla al subir escenario zip a la BD: " + e.getMessage());
            if (e.getErrorCode() == 1) { // 1 - ORA-00001
                System.out.println("ERROR: Ya existe el registro del escenario original " + dtoEscen.getFolio() + " se procederá a registrar el escenario modificado. ");
                logger.error("ERROR: Ya existe el registro del escenario original " + dtoEscen.getFolio() + " se procederá a registrar el escenario modificado. ");
            } else {
                logger.error("Ocurrió un error en RegistrarControlEscenOriginales " + e.getMessage());
            }
            estatus = false;
        } catch (IOException e) {
            //logger.error("ERROR -> Falla al subir escenario zip a la BD: " + e.getMessage());
            estatus = false;
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
                logger.error("Error en RegistrarControlEscenarios : " + ex.getMessage());
                estatus = false;
            }
        }

        return estatus;
    }

    public boolean RegistrarControlRegistros() throws SQLException {
        Statement statement = null;
        boolean estatus;
        
        String query = "INSERT INTO CONTROL_REGISTROS "
                + "(ID_REGISTRO,FK_CONTROL_ESCENARIO,FK_USUARIO) "
                + "values ("
                + "'" + dtoEscen.getId_registro() + "',"
                + "'" + dtoEscen.getId_escenario() + "',"
                + "'" + dtoEscen.getFk_usuario() + "')";
        logger.debug(query+";");
            
        try {
            statement = con.createStatement();
            statement.executeUpdate(query);
            
            logger.info("Registro insertado!");
            estatus = true;
        }
        catch (SQLException e) {
            System.out.println("ERROR: Ya existe un registro o ocurrió un error  "+ e.getMessage());
            logger.error("ERROR: Ya existe un registro o ocurrió un error en RegistrarControlRegistros() "+ e.getMessage());
            estatus = false;
        }
        finally{
            try {
                //con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Error en RegistrarControlRegistros : " + ex.getMessage());
                estatus = false;
            }
        }
        return estatus;
        
    }
    
    public boolean EliminarRegistro(){
        Statement statement = null;
        boolean estatus;
        String deletereg="";
        
        if(estado.equals(EnumEstados.desdeoriginal.getEstado()))
        {
            deletereg = "DELETE FROM CONTROL_REGISTROS WHERE FK_USUARIO = '"+dtoEscen.getFk_usuario()+"'";
        }
        else{
            deletereg = "DELETE FROM CONTROL_REGISTROS WHERE FK_CONTROL_ESCENARIO = '" + dtoEscen.getId_escenario() +"' AND FK_USUARIO = '"+dtoEscen.getFk_usuario()+"'";
        }
        logger.debug(deletereg+";");
        
        try {
            statement = con.createStatement();
            statement.executeQuery(deletereg);         
            
            logger.info("¡Registro eliminado!");   
            System.out.println("¡Registro eliminado!");
            estatus = true;
        }
        catch (SQLException e) {
            logger.error("No se pudo eliminar el registro con escenario: " + dtoEscen.getId_escenario());
            estatus = false;
        }
        finally{            
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error en EliminarRegistro " + ex.getMessage());
                estatus = false;
            }
            
        }
        return estatus;
    }   
    
    public boolean EliminarEscenarioModif(){
        Statement statement = null;
        boolean estatus;
        String deletereg ="";
        
        if(estado.equals(EnumEstados.desdeoriginal.getEstado()))
        {
            deletereg = "DELETE FROM CONTROL_ESCEN_MODIFICADOS WHERE "
                +" FK_USUARIO = '"+ dtoEscen.getFk_usuario() +"'";
            
        }else{
            deletereg = "DELETE FROM CONTROL_ESCEN_MODIFICADOS WHERE "
                + "ID_ESCENARIO = '" + dtoEscen.getId_escenario()
                +"' AND FK_USUARIO = '"+ dtoEscen.getFk_usuario() +"'";
        }
        logger.debug(deletereg+";");
        
        try {
            statement = con.createStatement();
            statement.executeQuery(deletereg);
                        
            logger.info("¡Registro de escenario modificado eliminado!");
            System.out.println("¡Registro de escenario modificado eliminado!");
            estatus = true;
        }
        catch (SQLException e) {
            logger.error("No se pudo eliminar el registro. " + dtoEscen.getId_escenario());
            estatus = false;
        }
        finally{            
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error en EliminarEscenarioModif " + ex.getMessage());
                estatus = false;
            }
            
        }
        return estatus;
    }
    
    public boolean EliminarEscenarioOrig(){
        Statement statement = null;
        boolean estatus;
        String deletereg = "";
        String propietario = ObtenerPropietario(dtoEscen.getFolio());
        int validarnombreexis = u.ValidarNombreExistenteParaEliminar(propietario, dtoEscen.getFk_usuario());
        
        logger.debug("=> "+ propietario+" "+dtoEscen.getId_escenario()+" "+dtoEscen.getFk_usuario());
        logger.debug("validarnombreexis " +validarnombreexis);
        
        if( validarnombreexis == 2) // si existe un nomre y son más de 1, se quita de propietario y se actualiza el campo
        {
            String sinnombre = propietario.replace(dtoEscen.getFk_usuario(), "").replace(",,", ",");
            sinnombre = u.QuitarComaFinal(sinnombre);
            logger.debug(sinnombre);
            deletereg = "UPDATE CONTROL_ESCEN_ORIGINALES SET "
                + "PROPIETARIO = '" + sinnombre
                + "' WHERE "
                + " FOLIO = '" + dtoEscen.getFolio() +"' ";
        }
        else if( validarnombreexis == 1 ) // si existe el folio y existe sólo un registro perteneciente al usuario, se elimina
        {
            deletereg = "DELETE FROM CONTROL_ESCEN_ORIGINALES WHERE "
                + "FOLIO = '" + dtoEscen.getFolio() 
                + "' ";
        }
        
        logger.debug(deletereg+";");
        
        try {
            statement = con.createStatement();
            statement.executeQuery(deletereg);
                        
            logger.info("¡Registro de escenario original eliminado!");
            System.out.println("¡Registro de escenario original eliminado!");
            estatus = true;
        }
        catch (SQLException e) {
            logger.error("No se pudo eliminar el registro " + dtoEscen.getId_escenario());
            estatus = false;
        }
        finally{            
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error en EliminarEscenarioOrig " + ex.getMessage());
                estatus = false;
            }
            
        }
        return estatus;
    }
    
    private String ObtenerPropietario(String foliooriginal){
        Statement statement = null;
        ResultSet  rs  = null;
        String propietario = null;
        
        String prop = "SELECT PROPIETARIO FROM CONTROL_ESCEN_ORIGINALES WHERE FOLIO = '"+ foliooriginal +"' ";
        logger.debug(prop+";");
        
        try {
            statement = con.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
            con.setReadOnly(true);
            rs = statement.executeQuery(prop);
            
            while (rs.next()) {
                propietario = rs.getString("PROPIETARIO");
            }
            
        }
        catch (SQLException e) {
            logger.error("Ocurrió un error en ObtenerPropietario. " + e.getMessage());
        }
        finally{            
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrión un error en ObtenerPropietario. " + ex.getMessage());
            }
            
        }
        return propietario;
    }
    
   
    
    
    public boolean ActualizarEstado(){
        Statement st = null;
        boolean estatus;
        
        String actestado = "UPDATE CONTROL_ESCEN_MODIFICADOS SET "
                + "ESTADO = '"+ estado +"' WHERE "
                + "ID_ESCENARIO = '" + idEscenarios + "' AND "
                + "FK_USUARIO = '" + nomUsuario + "'";
        logger.debug(actestado+";");
        
        try {
            st = con.createStatement();
            st.executeQuery(actestado);
                        
            logger.info("¡Registro actualizado!");
            estatus = true;
        }
        catch (SQLException e) {
            System.out.println("ERROR: No se pudo actualizar el registro " + idEscenarios);
            logger.error("ERROR: No se pudo actualizar el registro " + idEscenarios);
            estatus = false;
        }
        finally{            
            try {
                con.commit();
                if (st != null) {
                    st.close();
                }
                st = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error:¿ en ActualizarEstado " + ex.getMessage());
                estatus = false;
            }
            
        }
        return estatus;
    }
    
    public boolean ActualizarRegistros(){
        Statement st = null;
        boolean estatus;
        
        String actestado = "UPDATE CONTROL_ESCEN_MODIFICADOS SET "
                + "ESTADO = '"+ estado +"' WHERE "
                + "ID_ESCENARIO = '" + idEscenarios + "' AND "
                + "FK_USUARIO = '" + nomUsuario + "'";
        
        logger.debug(actestado+";");
        
        try {
            st = con.createStatement();
            st.executeQuery(actestado);
                        
            logger.info("¡Registro actualizado!");
            estatus = true;
        }
        catch (SQLException e) {
            System.out.println("ERROR: No se pudo actualizar el registro " + idEscenarios);
            logger.error("ERROR: No se pudo actualizar el registro " + idEscenarios);
            estatus = false;
        }
        finally{            
            try {
                con.commit();
                if (st != null) {
                    st.close();
                }
                st = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error en ActualizarRegistros " + ex.getMessage());
                estatus = false;
            }
            
        }
        return estatus;
    }
    
    private int ContarEscenOriginalesPorFolio(String idEscen, int fkalgoritmo) {
        Statement statement = null;
        ResultSet rs = null;
        int cantidad = 0;
        logger.info("FOLIO " +idEscen);
        logger.info("ALGORITO " +fkalgoritmo);
        
        String contarorig = "SELECT COUNT(*) AS CANTIDAD FROM CONTROL_ESCEN_ORIGINALES WHERE FOLIO = '"+idEscen+"' AND FK_ALGORITMO = '"+fkalgoritmo+"' ";
        logger.debug(contarorig+";");

        try {
            statement = con.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
            con.setReadOnly(true);
            rs = statement.executeQuery(contarorig);

            while (rs.next()) {
                cantidad = rs.getInt("CANTIDAD");
            }  //end while
        } catch (SQLException e) {
            logger.error("Ocurrió un error en ContarEscenOriginales: " + e.getMessage());
            cantidad = -1;
        } finally {
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error en ContarEscenOriginales: " + ex.getMessage());
                cantidad = -1;
            }

        }
        return cantidad;
    }
    
    public int ContarEscenModificados(){
        Statement statement = null;
        ResultSet rs  = null;
        int cantidad = 0;
        String contarmodif = "SELECT COUNT(*) AS CANTIDAD FROM CONTROL_ESCEN_MODIFICADOS WHERE FK_USUARIO = '" + nomUsuario + "' ";
        logger.debug(contarmodif+";");
        
        try {
            statement = con.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
            con.setReadOnly(true);
            rs = statement.executeQuery(contarmodif);

            while (rs.next()) {
                cantidad = rs.getInt("CANTIDAD");
            }  //end while
        }
        catch (SQLException e) {
            logger.error("Ocurrió un error: " + e.getMessage());
            cantidad = -1;
        }
        finally{            
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error en ContarEscenModificados " + ex.getMessage());
                cantidad = -1;
            }
            
        }
        return cantidad;
    }
    
    public int ContarEscenOriginales() {
        Statement statement = null;
        ResultSet rs = null;
        int cantidad = 0;
        
        String contarorig = "SELECT COUNT(*) AS CANTIDAD FROM CONTROL_ESCEN_ORIGINALES ";
        logger.debug(contarorig+";");

        try {
            statement = con.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
            con.setReadOnly(true);
            rs = statement.executeQuery(contarorig);

            while (rs.next()) {
                cantidad = rs.getInt("CANTIDAD");
            }  //end while
        } catch (SQLException e) {
            logger.error("Ocurrió un rror en ContarEscenOriginales: " + e.getMessage());
            cantidad = -1;
        } finally {
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrió un error en ContarEscenOriginales: " + ex.getMessage());
                cantidad = -1;
            }

        }
        return cantidad;
    }
    
    
    public ClaseCatalogoConfiguracion ObtenerParametros(){
        Statement statement = null;
        ResultSet  rs  = null;
        ClaseCatalogoConfiguracion par = new ClaseCatalogoConfiguracion();
        
        String configuraciones = "SELECT LIMITE_REG_ORIGINAL, LIMITE_REG_MODIFICADOS FROM CAT_CONFIGURACION WHERE ID_CONFIG = '1' ";
        logger.debug(configuraciones+";");
        
        try {
            statement = con.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
            con.setReadOnly(true);
            rs = statement.executeQuery(configuraciones);
            
            while (rs.next()) {
                par.setLIMITE_REG_ORIGINAL(rs.getInt("LIMITE_REG_ORIGINAL"));
                par.setLIMITE_REG_MODIFICADOS(rs.getInt("LIMITE_REG_MODIFICADOS"));
            }
             
        }
        catch (SQLException e) {
            logger.error("Ocurrió un error en ObtenerParametros. " + e.getMessage());
        }
        finally{            
            try {
                con.commit();
                if (statement != null) {
                    statement.close();
                }
                statement = null;
            } catch (SQLException ex) {
                logger.error("Ocurrión un error en ObtenerParametros. " + ex.getMessage());
            }
            
        }
        return par;
    }
    
    
    public void Rollback() {
        try {
            con.rollback();
        } catch (SQLException ex) {
            logger.error("Realizando Rollback de la información. " + ex.getMessage());
        }
    }
}



/*
    public ModeloEscenarios(Connection condelete, String idRegistros, String idEscenario, String fkUsuario, String sis) {
        this.con = condelete;
        this.idRegistros = idRegistros;
        this.idEscenarios = idEscenario;
        this.nomUsuario = fkUsuario;
        this.sistema = sis;
        if(sistema.equals("BCA"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCA");
        }
        else if(sistema.equals("SIN"))
        {
            logger = Logger.getLogger("rollingFileAppenderSIN");
        }
        else if(sistema.equals("BCS"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCS");
        }
    }
    
    */
    /*
    public ModeloEscenarios(Connection condelete, String idRegistros, String idEscenario, String foliooriginal, String fkUsuario, String estado, String sis) {
        this.con = condelete;
        this.idRegistros = idRegistros;
        this.idEscenarios = idEscenario;
        this.foliooriginal = foliooriginal;
        this.nomUsuario = fkUsuario;
        this.estado = estado;
        this.sistema = sis;
        if(sistema.equals("BCA"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCA");
        }
        else if(sistema.equals("SIN"))
        {
            logger = Logger.getLogger("rollingFileAppenderSIN");
        }
        else if(sistema.equals("BCS"))
        {
            logger = Logger.getLogger("rollingFileAppenderBCS");
        }
    }
    */