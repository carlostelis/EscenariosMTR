/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONObject;

/**
 *
 * @author Carlos
 */
public class BD {
    
    private String urlServicio;
    private String esquema;
    private String password;
    private Statement stmt;
    private Connection con;
    private String error;
    
    public BD(String _urlServicio, String _esquema, String _password) {
        this.urlServicio = _urlServicio;
        this.esquema = _esquema;
        this.password = _password;
        this.stmt = null;
        this.con = null;
        this.error = null;
    }
    
    private boolean conectar() {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            con = DriverManager.getConnection("jdbc:oracle:thin:@" + this.urlServicio, this.esquema, this.password);
            this.error = null;
            
            return true;
        } catch (ClassNotFoundException ex) {
            this.con = null;
            this.error = "ERROR -> Driver de conectividad no encontrado";
            System.out.println("ERROR -> Driver de conectividad no encontrado");
        } catch (SQLException ex) {
            this.error = "ERROR -> " + ex.getMessage();
            System.out.println("ERROR -> " + ex.getMessage());
            this.con = null;
        }
        
        return false;
    }
    
    private boolean desconectar() {
        if (this.con != null) {
            try {
                this.con.close();
            } catch (SQLException ex) {
                
            } finally {
                this.con = null;
            }
        }
        
        return true;
    }
    
    public void obtenerSistemas() {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            this.stmt = this.con.createStatement(); 

            // Construyo objeto JSON
            JSONObject json = new JSONObject();
            
            // sistemas
            ResultSet rs = this.stmt.executeQuery("SELECT NOMBRE, ESTADO FROM ESC_SISTEMAS");

            while (rs.next()) {
                JSONObject sistema = new JSONObject();
                sistema.put("nombre", rs.getString("NOMBRE"));
                sistema.put("estado", rs.getInt("ESTADO"));

                json.append("sistemas", sistema);
            }
            
            rs = this.stmt.executeQuery("SELECT NOMBRE, PERIODOS FROM ESC_ALGORITMOS"); 
            
            while (rs.next()) {
                JSONObject sistema = new JSONObject();
                sistema.put("nombre", rs.getString("NOMBRE"));
                sistema.put("periodos", rs.getInt("PERIODOS"));

                json.append("algoritmos", sistema);
            }

            System.out.println(json.toString());
        } catch (SQLException ex) {
            System.out.println("ERROR -> " + ex.getMessage() + "; " + ex.getCause());
        } finally {
            this.desconectar();
        }
    }
    
    public void obtenerUsuarios(String usuario) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            this.stmt = this.con.createStatement(); 

            String query = "SELECT ESC_CTRL_USUARIOS.NOMBRE, ESC_CTRL_USUARIOS.CONTRASENA, ESC_CTRL_USUARIOS.SIS_ACC, ESC_PERFILES.PERFIL, ESC_PERFILES.CARACTERISTICAS "
                    + "FROM ESC_CTRL_USUARIOS INNER JOIN ESC_PERFILES " 
                    + "ON ESC_CTRL_USUARIOS.FK_PERFIL = ESC_PERFILES.ID_PERFIL WHERE ESC_CTRL_USUARIOS.ID_USUARIO = '" + usuario + "'";
            //System.out.println(query);
            ResultSet rs = this.stmt.executeQuery(query);
            // Construyo objeto JSON
            JSONObject json = new JSONObject();

            if (rs.next()) {
                json.put("nombre", rs.getString(1));
                json.put("contrasena", rs.getString(2));
                json.put("sis_acc", rs.getString(3));
                json.put("perfil", rs.getString(4));
                json.put("caracteristicas", rs.getString(5));
            }

            String output = json.toString();
            
            if (output.isEmpty() || output.equals("{}")) {
                System.out.println("ERROR -> El usuario <b>" + usuario + "</b> no se encuentra en la base de datos");
                return;
            }
            
            System.out.println(output);
        } catch (SQLException ex) {
            System.out.println("ERROR -> " + ex.getMessage() + "; " + ex.getCause());
        } finally {
            this.desconectar();
        }
    }
    
    public void obtenerAnios_Folios(String usuario, String algoritmo) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            this.stmt = this.con.createStatement(); 

            /*String query = "SELECT SUBSTR(CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, 1, 4) AS ANIO FROM CONTROL_ESCEN_MODIFICADOS "
                    + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CONTROL_ESCEN_MODIFICADOS.FK_USUARIO = '" + usuario + "' AND CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo + "'";*/
            String query = "SELECT SUBSTR(CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, 1, 4) AS ANIO FROM CONTROL_ESCEN_MODIFICADOS "
                    + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo + "'";
            
//            System.out.println(query);
            ResultSet rs = this.stmt.executeQuery(query);
            // Construyo objeto JSON
            JSONObject json = new JSONObject();
            
            while (rs.next()) {
                json.append("anio", rs.getString(1));
            }
            
            rs.close();

            String output = json.toString();
            
            System.out.println(output);
        } catch (SQLException ex) {
            System.out.println("ERROR -> " + ex.getMessage() + "; " + ex.getCause());
        } finally {
            try {
                this.stmt.close();
            } catch (SQLException ex) {}
            this.desconectar();
        }
    }
    
    public void obtenerMeses_Folios(String usuario, String algoritmo, String anio) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            this.stmt = this.con.createStatement(); 

            /*String query = "SELECT SUBSTR(CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, 5, 2) AS MES FROM CONTROL_ESCEN_MODIFICADOS "
                    + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CONTROL_ESCEN_MODIFICADOS.FK_USUARIO = '" + usuario + "' AND CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo
                    + "' AND CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL LIKE '" + anio + "%'";*/
            String query = "SELECT SUBSTR(CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, 5, 2) AS MES FROM CONTROL_ESCEN_MODIFICADOS "
                    + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo + "' AND CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL LIKE '" + anio + "%'";
            
//            System.out.println(query);
            ResultSet rs = this.stmt.executeQuery(query);
            // Construyo objeto JSON
            JSONObject json = new JSONObject();

            while (rs.next()) {
                json.append("mes", rs.getString(1));
            }
            
            rs.close();

            String output = json.toString();
            
            System.out.println(output);
        } catch (SQLException ex) {
            System.out.println("ERROR -> " + ex.getMessage() + "; " + ex.getCause());
        } finally {
            try {
                this.stmt.close();
            } catch (SQLException ex) {}
            this.desconectar();
        }
    }
    
    public void obtenerDias_Folios(String usuario, String algoritmo, String anio, String mes) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            this.stmt = this.con.createStatement(); 
            
            /*String query = "SELECT SUBSTR(CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, 7, 2) AS DIA FROM CONTROL_ESCEN_MODIFICADOS "
                    + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CONTROL_ESCEN_MODIFICADOS.FK_USUARIO = '" + usuario + "' AND CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo
                    + "' AND CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL LIKE '" + anio + mes + "%'"; */
            String query = "SELECT SUBSTR(CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, 7, 2) AS DIA FROM CONTROL_ESCEN_MODIFICADOS "
                    + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo + "' AND CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL LIKE '" + anio + mes + "%'";
            
//            System.out.println(query);
            ResultSet rs = this.stmt.executeQuery(query);
            // Construyo objeto JSON
            JSONObject json = new JSONObject();

            while (rs.next()) {
                json.append("dia", rs.getString(1));
            }
            
            rs.close();

            String output = json.toString();
            
            System.out.println(output);
        } catch (SQLException ex) {
            System.out.println("ERROR -> " + ex.getMessage() + "; " + ex.getCause());
        } finally {
            try {
                this.stmt.close();
            } catch (SQLException ex) {}
            this.desconectar();
        }
    }
    
    public void obtenerFolios_Folios(String usuario, String algoritmo, String anio, String mes, String dia) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            this.stmt = this.con.createStatement(); 

            /* String query = "SELECT CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL, CONTROL_ESCEN_MODIFICADOS.COMENTARIO, SUBSTR(CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL, 9, 2) AS HORA, SUBSTR(CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL, 11, 2) AS INTERVALO "
                    + "FROM CONTROL_ESCEN_MODIFICADOS INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CONTROL_ESCEN_MODIFICADOS.FK_USUARIO = '" + usuario + "' AND CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo
                    + "' AND CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL LIKE '" + anio + mes + dia + "%'"; */
            String query = "SELECT CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO, CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL, "
                    + "CONTROL_ESCEN_MODIFICADOS.COMENTARIO, SUBSTR(CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL, 9, 2) AS HORA, "
                    + "SUBSTR(CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL, 11, 2) AS INTERVALO, CONTROL_ESCEN_MODIFICADOS.FK_USUARIO "
                    + "FROM CONTROL_ESCEN_MODIFICADOS INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                    + "WHERE CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo + "' AND CONTROL_ESCEN_MODIFICADOS.FOLIO_ORIGINAL LIKE '" + anio + mes + dia + "%'";
            
//            System.out.println(query);
            ResultSet rs = this.stmt.executeQuery(query);
            // Construyo objeto JSON
            JSONObject json = new JSONObject();
            
            while (rs.next()) {
                JSONObject json_obj = new JSONObject();
                json_obj.put("folio", rs.getString(1));
                json_obj.put("id_original", rs.getString(2));
                String comentario = rs.getString(3);
                json_obj.put("comentario", (comentario == null ? "" : comentario));
                json_obj.put("hora", rs.getString(4));
                json_obj.put("intervalo", rs.getString(5));
                json_obj.put("usuario", rs.getString(6));
                
                json.append("escenario", json_obj);
            }
            
            rs.close();

            String output = json.toString();
            
            System.out.println(output);
        } catch (SQLException ex) {
            System.out.println("ERROR -> " + ex.getMessage() + "; " + ex.getCause());
        } finally {
            try {
                this.stmt.close();
            } catch (SQLException ex) {}
            this.desconectar();
        }
    }
    
    public void subirEscenario2(String rutaarchivozip, String folio) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        boolean estatus = false;
        PreparedStatement ps = null;
        try {
//            String query = "INSERT INTO CONTROL_ESCEN_ORIGINALES (FOLIO,BYTES,ZIP) values(?,?,?)";
            String query = "INSERT INTO CONTROL_ESCEN_MODIFICADOS "
                    + "(ID_ESCENARIO,FK_USUARIO,FECHA_ALTA,FOLIO_ORIGINAL,FK_ALGORITMO,ESTADO,ZIP,COMENTARIO, BYTES) values(?,?,to_timestamp_tz(?,'DD/MM/RR HH24:MI:SSXFF TZR'),?,?,?,?,?,?)";
            System.out.println(query);
            ps = con.prepareStatement(query);

            // El objeto archivo ayuda a obtener su tamanio
            File f = new File(rutaarchivozip);
            
            String DATEFORMAT = "dd/MM/yyyy HH:mm:00 X";
            SimpleDateFormat sdf = new SimpleDateFormat(DATEFORMAT);
            sdf.setTimeZone(TimeZone.getTimeZone("America/Tijuana"));
            String utcTime = sdf.format(new Date());
            
            // Agrega los valores: bytes del archivo y tamanio
            try (InputStream in = new FileInputStream(rutaarchivozip)) {
                // Agrega los valores: ID, bytes del archivo y tamanio
                ps.setString(1, "asdasd");
                ps.setString(2, "TEST");
                ps.setString(3, utcTime);
                ps.setString(4, folio);
                ps.setInt(5, 3);
                ps.setInt(6, 1);
                ps.setString(8, "comentario");
                
                if (f.exists()) {
                    ps.setBinaryStream(7, in);
                    ps.setInt(9, (int)f.length());
                } else {
                    ps.setBinaryStream(7, in);
                    ps.setInt(9, -1);
                }
                
                // Ejecuta
                int n = ps.executeUpdate();
                
                if (n > 0) {
                    System.out.println("Registro actualizado correctamente");
                } else {
                    System.out.println("El registro no se actualizó");
                }
                
            }
        } catch (SQLException e) {
            System.out.println("ERROR -> Falla al subir escenario zip a la BD: " + e);
            if(e.getErrorCode() == 1){ // 1 - ORA-00001
                System.err.println("Ya existe el registro ");
            }else{
                System.err.println("Error: " + e.getMessage());
            }
        } catch (IOException e) {
            System.out.println("ERROR -> Falla al subir escenario zip a la BD: " + e);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
                System.err.println("Mensaje de error: "+ ex.getMessage());
            }
            
            this.desconectar();
        }
    }
    
    public void subirEscenario(String archivo) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            PreparedStatement ps = con.prepareStatement("insert into PRUEBA_BLOB values(?,?,?)");

            // El objeto archivo ayuda a obtener su tamanio
            File f = new File(archivo);
            
            if (!f.exists()) {
                System.out.println("ERROR -> no existe el archivo: " + f.getAbsolutePath());
                return;
            }
            
            // Agrega los valores: bytes del archivo y tamanio
            try (InputStream in = new FileInputStream(archivo)) {
                // Agrega los valores: ID, bytes del archivo y tamanio
                ps.setString(1, f.getName().split("\\.")[0]);
                ps.setInt(2, (int)f.length());
                ps.setBinaryStream(3, in);
                
                // Ejecuta
                int n = ps.executeUpdate();
                
                if (n > 0) {
                    System.out.println("Registro actualizado correctamente");
                } else {
                    System.out.println("El registro no se actualizó");
                }
                
            }
        } catch (SQLException | IOException e) {
            System.out.println("ERROR -> Falla al subir escenario zip a la BD: " + e);
        } finally {
            this.desconectar();
        }
        
    }
    
    public void bajarEscenarioModificado(String id, String usuario, String algoritmo, String carpetaDestino) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            try (Statement sta = this.con.createStatement()) {
                String query = "SELECT CONTROL_ESCEN_MODIFICADOS.BYTES, CONTROL_ESCEN_MODIFICADOS.ZIP FROM CONTROL_ESCEN_MODIFICADOS "
                        + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_MODIFICADOS.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                        + "WHERE CONTROL_ESCEN_MODIFICADOS.FK_USUARIO = '" + usuario +"' AND CONTROL_ESCEN_MODIFICADOS.ID_ESCENARIO = '" + id 
                        + "' AND CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo + "'";
//                System.out.println(query);
                ResultSet res = sta.executeQuery(query);
                
                if (!res.next()) {
                    System.out.println("ERROR -> La consulta no devolvió registros");
                    return;
                }
                
                InputStream in = res.getBinaryStream("ZIP");
                int size = res.getInt("BYTES");
                byte[] buffer = new byte[size];
                
                // Lee los valores
                try {
                    in.read(buffer, 0, size);
                } catch (IOException ex) {}
                
                OutputStream output = null;
                
                // Genera el nuevo archivo
                try {
                    // Verifica la carpeta
                    File f = new File(carpetaDestino);
                    
                    if (!f.exists()) {
                        f.mkdirs();
                    }
                    
                    String destinoZip = carpetaDestino + File.separator + id + ".zip";
//                    System.out.println("Destino ZIP: " + destinoZip);
                    output = new BufferedOutputStream(new FileOutputStream(destinoZip));
                    output.write(buffer);
                    
                    // Descomprime
                    Zipper.unzipCarpeta(destinoZip, carpetaDestino);
                    // Espera 1 segundo y Borra el zip
                    
                    File fzip = new File(destinoZip);
                    fzip.setWritable(true);
                    fzip.deleteOnExit();
                    
                    JSONObject json = new JSONObject();
                    json.put("estado", true);
                    System.out.println(json.toString());
                } catch (IOException ex) {
                    System.out.println("ERROR -> no se pudo escribir el archivo zip: " + ex);
                } finally {
                    try {
                        output.close();
                    } catch (IOException | NullPointerException ex) {}
                }
                
                sta.close();
                res.close();
            }            
        } catch (SQLException e) {
            System.out.println("Excepcion " + e);
        } finally {
            this.desconectar();
        }
        
    }
    
    public void bajarEscenarioOriginal(String id_original, String algoritmo, String carpetaDestino) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {
            try (Statement sta = this.con.createStatement()) {
                String query = "SELECT CONTROL_ESCEN_ORIGINALES.ZIP, CONTROL_ESCEN_ORIGINALES.BYTES FROM CONTROL_ESCEN_ORIGINALES "
                        + "INNER JOIN CAT_ALGORITMOS ON CONTROL_ESCEN_ORIGINALES.FK_ALGORITMO = CAT_ALGORITMOS.ID_ALGORITMO "
                        + "WHERE CONTROL_ESCEN_ORIGINALES.FOLIO='" + id_original + "' AND CAT_ALGORITMOS.NOMBRE_ALGORITMO = '" + algoritmo + "'";
//                System.out.println(query);
                ResultSet res = sta.executeQuery(query);
                
                if (!res.next()) {
                    System.out.println("ERROR -> La consulta no devolvió registros");
                    return;
                }
                
                InputStream in = res.getBinaryStream("ZIP");
                int size = res.getInt("BYTES");
                byte[] buffer = new byte[size];
                
                // Lee los valores
                try {
                    in.read(buffer, 0, size);
                } catch (IOException ex) {}
                
                OutputStream output = null;
                
                // Genera el nuevo archivo
                try {
                    // Verifica la carpeta
                    File f = new File(carpetaDestino);
                    
                    if (!f.exists()) {
                        f.mkdirs();
                    }
                    
                    String destinoZip = carpetaDestino + File.separator + id_original + ".zip";
//                    System.out.println("Destino ZIP: " + destinoZip);
                    output = new BufferedOutputStream(new FileOutputStream(destinoZip));
                    output.write(buffer);
                    
                    // Descomprime
                    Zipper.unzipCarpeta(destinoZip, carpetaDestino);
                    // Espera 1 segundo y Borra el zip
                    
                    File fzip = new File(destinoZip);
                    fzip.setWritable(true);
                    fzip.deleteOnExit();
                    
                    JSONObject json = new JSONObject();
                    json.put("estado", true);
                    System.out.println(json.toString());
                } catch (IOException ex) {
                    System.out.println("ERROR -> no se pudo escribir el archivo zip: " + ex);
                } finally {
                    try {
                        output.close();
                    } catch (IOException | NullPointerException ex) {}
                }
                
                sta.close();
                res.close();
            }            
        } catch (SQLException e) {
            System.out.println("Excepcion " + e);
        } finally {
            this.desconectar();
        }
        
    }
}
