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
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
    
    public void extractTarGZ(String archivoTar, String dia, String escenario, String carpeta) {
        if (!carpeta.endsWith(File.separator)) {
            carpeta += File.separator;
        }
        
        GzipCompressorInputStream gzipIn;
        try {
            gzipIn = new GzipCompressorInputStream(new FileInputStream(archivoTar));
        } catch (IOException ex) {
            System.out.println("ERROR -> Falla al crear descompresor de archivo tar: " + ex);
            return;
        }
        
        if (!dia.endsWith("/")) {
            dia += "/";
        }
        
        // El compresor maneja rutas tipo linux
        String ruta_escenario = dia + escenario + "/";
        //System.out.println("Ruta: " + ruta_escenario);
        boolean escenario_encontrado = false;
        boolean flag_procesar_dir;
        boolean flag_procesar_file = false;
        
        int cont_archivos = 0;
        int cont_directorios = 0;
        
        
        try (TarArchiveInputStream tarIn = new TarArchiveInputStream(gzipIn)) {
            TarArchiveEntry entry;

            while ((entry = (TarArchiveEntry) tarIn.getNextEntry()) != null) {
                /**
                 * If the entry is a directory, create the directory. *
                 */
                if (entry.isDirectory()) {
                    // Busca escenario
                    flag_procesar_dir = false;
                    //System.out.println("Directorio: " + entry.getName() + " ~ " + ruta_escenario);
                    // Si se encuentra el dia correcto
                    if (entry.getName().equals(dia)) {
                        flag_procesar_dir = true;
                    }
                    
                    if (entry.getName().contains(ruta_escenario)) {
                        //System.out.println("Escenario encontrado");
                        escenario_encontrado = true;
                        flag_procesar_dir = true;
                    }
                    
                    if (flag_procesar_dir) {
                        File f = new File(carpeta + entry.getName());
                        //System.out.println("Creando Directorio: " + entry.getName() + "  " + f.getAbsolutePath());
                        boolean created = f.mkdir();
                        if (created) {
                            cont_directorios++;
                            if (escenario_encontrado) {
                                flag_procesar_file = true;
                            }
                        }
                    } else {
                        flag_procesar_file = false;
                    }
                } else {
                    if (flag_procesar_file) {
                        int count;
                        int BUFFER_SIZE = 1024;
                        byte data[] = new byte[BUFFER_SIZE];
                        FileOutputStream fos = new FileOutputStream(carpeta + entry.getName(), false);
                        try (BufferedOutputStream dest = new BufferedOutputStream(fos, BUFFER_SIZE)) {
                            while ((count = tarIn.read(data, 0, BUFFER_SIZE)) != -1) {
                                dest.write(data, 0, count);
                            }
                            dest.close();
                            cont_archivos++;
                        }
                    }
                }
            }

            tarIn.close();
            
            JSONObject json = new JSONObject();
            json.put("carpetas", cont_directorios);
            json.put("archivos", cont_archivos);
            json.put("escenario", escenario);
            json.put("dia", dia);
            json.put("rutaLocal", carpeta + ruta_escenario);
            System.out.println(json.toString());
        } catch (IOException ex) {
            System.out.println("ERROR -> Falla durante la descompresión del archivo tar.gz " + ex);
        }
    }
}
