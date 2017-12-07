/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import BO.EnumDataBase;
import BO.EnumZonaHoraria;
import java.sql.Connection;
import java.sql.SQLException;
import oracle.ucp.jdbc.PoolDataSource;
import oracle.ucp.jdbc.PoolDataSourceFactory;

/**
 *
 * @author alejandra.moreno
 */
public class Conn_BD_ESCEN_SIS {
    
    private Connection con = null;
    private PoolDataSource pds = PoolDataSourceFactory.getPoolDataSource();
    
    
    public void createPoolConnection(EnumDataBase esquemaBD, String IDzonahoraria, String ambiente) throws SQLException{
        
        if(esquemaBD == EnumDataBase.user_write){
            
            if (IDzonahoraria.equals(EnumZonaHoraria.sin_utc.getZona())) {

                if (ambiente.equals(EnumDataBase.pruebas.getAmbiente())) {
                    
                    pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
                    pds.setURL("jdbc:oracle:thin:@("
                        + "DESCRIPTION = "
                        + "(LOAD_BALANCE = on)"
                        + "(FAILOVER = on)"
                        + "(ADDRESS = (PROTOCOL = TCP)(HOST = mer-scan.cenace.com)(PORT = 1521))"
                        + "(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = PRUEBAS)(FAILOVER_MODE = (TYPE = SELECT)(METHOD = BASIC)))"
                        + "(sessionTimeZone = 'America/Mexico_City')"
                        + ")");
                    pds.setUser("BD_ESCEN_SIN");
                    pds.setPassword("wOhm6PzNoq");
                    pds.setInitialPoolSize(16);
                    
                }
                
                
            }// FIN DE BD_PRON_MTR_SIN
            else if (IDzonahoraria.equals(EnumZonaHoraria.bca_utc.getZona())) {

                if (ambiente.equals(EnumDataBase.pruebas.getAmbiente())) {
                    
                    pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
                    pds.setURL("jdbc:oracle:thin:@("
                        + "DESCRIPTION = "
                        + "(LOAD_BALANCE = on)"
                        + "(FAILOVER = on)"
                        + "(ADDRESS = (PROTOCOL = TCP)(HOST = mer-scan.cenace.com)(PORT = 1521))"
                        + "(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = PRUEBAS)(FAILOVER_MODE = (TYPE = SELECT)(METHOD = BASIC)))"
                        + "(sessionTimeZone = 'America/Tijuana')"
                        + ")");
                    pds.setUser("BD_ESCEN_BCA");
                    pds.setPassword("eZJtDzeIA9");
                    pds.setInitialPoolSize(16);
                    
                }
            } // FIN DE BD_PRON_MTR_BCA
            else if (IDzonahoraria.equals(EnumZonaHoraria.bcs_utc.getZona())) {

                if (ambiente.equals(EnumDataBase.pruebas.getAmbiente())) {
                    
                    pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
                    pds.setURL("jdbc:oracle:thin:@("
                        + "DESCRIPTION = "
                        + "(LOAD_BALANCE = on)"
                        + "(FAILOVER = on)"
                        + "(ADDRESS = (PROTOCOL = TCP)(HOST = mer-scan.cenace.com)(PORT = 1521))"
                        + "(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = PRUEBAS)(FAILOVER_MODE = (TYPE = SELECT)(METHOD = BASIC)))"
                        + "(sessionTimeZone = 'America/Mazatlan')"
                        + ")");
                    pds.setUser("BD_ESCEN_BCS");
                    pds.setPassword("JwISjEOkKG");
                    pds.setInitialPoolSize(16);
                    
                }
                
            } // FIN DE BD_PRON_MTR_BCS
        } // FIN de user_write
        
        
    }
    
    public void releasePoolConnection() { 
        pds = null;
    }
    
    public Connection getConnectionTransactional(EnumDataBase esquemaBD, String IDzonahoraria) throws Exception {
        try {
            //Class.forName("oracle.jdbc.driver.OracleDriver");
            
            if (IDzonahoraria.equals(EnumZonaHoraria.bca_utc.getZona())) { //CONEXION PARA BD DE PRUEBA EN BCA - EN USO
                
                con = pds.getConnection();
                con.createStatement().execute("alter session set time_zone = '"+IDzonahoraria+"'");
                if (con != null)
                    con.createStatement().execute("alter session set current_schema=BD_ESCEN_BCA");
            }
            else if (IDzonahoraria.equals(EnumZonaHoraria.bcs_utc.getZona())) {
                con = pds.getConnection();
                con.createStatement().execute("alter session set time_zone = '"+IDzonahoraria+"'");
                if (con != null)
                    con.createStatement().execute("alter session set current_schema=BD_ESCEN_BCS");
            }
            else if (IDzonahoraria.equals(EnumZonaHoraria.sin_utc.getZona())) {
                con = pds.getConnection();
                con.createStatement().execute("alter session set time_zone = '"+IDzonahoraria+"'");
                if (con != null)
                    con.createStatement().execute("alter session set current_schema=BD_ESCEN_SIN");
            }
            
            if (con != null) {
                con.setAutoCommit(false);
            } else {
                //oBita.GuardarBitacoraEnLista("Conexion nula", EnumBitacora.BD);
            }
        } catch (SQLException e) {
            System.out.println("getConnectionTransactional() " + e.getMessage());
            //oBita.GuardarBitacoraEnLista(e.getMessage() + " , ConnectionFactory en getConnectionTransactional()", EnumBitacora.BD);
            //closeConnectionTransactional(con, true);
            //System.out.println(e.getMessage() + " , ConnectionFactory en getConnectionTransactional()");   
        }

        return con;
        
    }
    
    public void closeConnectionTransactional(Connection con, boolean commit) 
    {
        try {
            if (commit) {
                con.commit();
            } else {
                con.rollback();
            }
            if (con != null && !con.isClosed()) {
                con.close();
            }
        } catch (SQLException e) {
            //oBita.GuardarBitacoraEnLista(e.getMessage() + " , ConnectionFactory en closeConnectionTransactional()", EnumBitacora.BD); 
            System.out.println(e.getMessage() + " , ConnectionFactory en closeConnectionTransactional()");

        }
    }
    
    
}
