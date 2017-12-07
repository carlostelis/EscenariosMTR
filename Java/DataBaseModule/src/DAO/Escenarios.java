package DAO;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.log4j.Logger;

/*
 * http://www.java2s.com/Code/Java/Database-SQL-JDBC/GetcolumnnamesofatableusingResultSetMetaData.htm
 * http://www.javahispano.org/portada/2013/9/6/obtener-metadatos-de-una-base-de-datos-en-java.html
 */

/**
 *
 * @author alejandra.moreno
 */
public class Escenarios {

    private static Logger logger;
    
    private Connection con = null;
    private String sistema;
    ArrayList<String> listaTablas = new ArrayList<String>();
    
    public Escenarios(Connection conlocal, String sis) {
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

    public ArrayList<String> ObtenerTablas() throws SQLException{
        String tabla="";
        ResultSet resultSetTablas;
        DatabaseMetaData metadatos = con.getMetaData();
        
        /* PARA OBTENER LOS CSV DE ARCHIVOS DE ENTRADA*/
        resultSetTablas = metadatos.getTables(null, null, "CSV_%", null);
        while (resultSetTablas.next()) {
            tabla = resultSetTablas.getObject(3).toString();//.getString(3);
            listaTablas.add(tabla);
        }
        
        /* PARA OBTENER LOS CSV DE RESULTADOS*/
        resultSetTablas = metadatos.getTables(null, null, "RESUL_%", null);
        while (resultSetTablas.next()) {
            tabla = resultSetTablas.getObject(3).toString();//.getString(3);
            listaTablas.add(tabla);
        }
        
        return listaTablas;
    }
    

    /*
    * Obtiene un diccionario de datos que contiene el índice(nombre de tabla)
    * y el valor (cadena de campos)
    * 
    */
    public HashMap<String, String> ObtenerColumnasXTablas(ArrayList<String> ObtenerTablas) {
        String campos="";
        Statement statement = null;
        ArrayList<String> listaCampos = new ArrayList<String>();
        HashMap<String, String> hmTablasCampos = new HashMap<String, String>();
        
        try
        {
            statement = con.createStatement();
            
            for(int x = 0; x <ObtenerTablas.size(); x++)
            {
                ResultSet resultSetCampos;
                resultSetCampos = statement.executeQuery("SELECT * FROM "+ ObtenerTablas.get(x));
                ResultSetMetaData metadata = resultSetCampos.getMetaData();
                int columnCount = metadata.getColumnCount();
                
                for (int i = 1; i <= columnCount; i++) {
                  String columnName = metadata.getColumnName(i);
                  campos += columnName + ",";
                }
                campos = campos.substring(0,campos.length() - 1);
                listaCampos.add(campos);

                hmTablasCampos.put(listaTablas.get(x), listaCampos.get(x));
                campos ="";

            }
            //hmSQL.forEach((k,v) -> System.out.println(" Key: " + k + ": Value: " + v));
        }
        catch(SQLException e){
            logger.error("No se pueden leer las tablas de la Base de datos "+ e.getMessage());
        }
        
        return hmTablasCampos;
    }
    

    
}
