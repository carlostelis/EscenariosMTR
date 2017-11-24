/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.json.JSONException;
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
    
    public void bajarEscenario(String id, String rutaArchivo) {
        if (this.con == null) {
            if (!this.conectar()) {
                return;
            }
        }
        
        try {            
            try (Statement sta = con.createStatement()) {
                ResultSet res = sta.executeQuery("SELECT * FROM PRUEBA_BLOB WHERE ID = '" + id + "'");
                
                if (!res.next()) {
                    System.out.println("ERROR -> La consulta no devolvió registros");
                    return;
                }
                
                InputStream in = res.getBinaryStream("DATA");
                int size = res.getInt("TAMANO");
                byte[] buffer = new byte[size];
                int valor;
                
                // Lee los valores
                try {
                    in.read(buffer, 0, size);
                } catch (IOException ex) {}
                
                OutputStream output = null;
                
                // Genera el nuevo archivo
                try {
                    output = new BufferedOutputStream(new FileOutputStream(rutaArchivo));
                    output.write(buffer);
                    System.out.println(rutaArchivo + " generado correctamente");
                } catch (IOException ex) {
                    System.out.println("ERROR -> no se pudo escribir el archivo zip: " + ex);
                } finally {
                    try {
                        output.close();
                    } catch (IOException ex) {}
                }
                res.close();
            }            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            this.desconectar();
        }
        
    }
}
