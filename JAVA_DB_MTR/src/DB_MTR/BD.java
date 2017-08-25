/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
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

            ResultSet rs = this.stmt.executeQuery("SELECT * FROM SISTEMAS");

            // Construyo objeto JSON
            JSONObject json = new JSONObject();

            while (rs.next()) {
                JSONObject sistema = new JSONObject();
                sistema.put("id", rs.getInt(1));
                sistema.put("nombre", rs.getString(2));
                sistema.put("estado", rs.getInt(3));

                json.append("sistemas", sistema);
            }

            System.out.println(json.toString());
        } catch (SQLException ex) {
            System.out.println("ERROR -> " + ex.getMessage() + "; " + ex.getCause());
        } finally {
            this.desconectar();
        }
    }
}
