/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BO;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;
import org.apache.log4j.Logger;

/**
 *
 * @author alejandra.moreno
 */
public class util {
    private static Logger logger;
    private static String sistema;

    public static String getSistema() {
        return sistema;
    }

    public static void setSistema(String sistema) {
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
        util.sistema = sistema;
    }
    
    
    /**
     * 
     *
     */
    public static String ObtenerComentario(String ruta) {
        String comentario = "";
        String cadena;
        String nombrearchivo = "";
        File carpetaDestino = new File(ruta+"/comentarios.txt");
        
        try{
            if (carpetaDestino.exists()) {
                FileReader f = new FileReader(carpetaDestino);
                BufferedReader b = new BufferedReader(f);
                while ((cadena = b.readLine()) != null) {
                    comentario = cadena;
                }
                b.close();
            }
            else{
                logger.error("No se encontró el archivo \"comentarios.txt\" en la ruta: "+ ruta);
            }
        }
        catch(Exception e){
            logger.error("Ocurrió un error: "+ e.getMessage());
            return null;
        }
        
        return comentario;
    }
    
    
    /**
     * 
     *
     */
    public static String ObtenerFechaZonaHoraria(String zonaHoraria) {
        String DATEFORMAT = "dd/MM/yyyy HH:mm:00 X";
        SimpleDateFormat sdf = new SimpleDateFormat(DATEFORMAT);
        sdf.setTimeZone(TimeZone.getTimeZone(zonaHoraria));
        String utcTime = sdf.format(new Date());
        
        return utcTime;
    }
    
    public static int ValidarNombreExistente(String propietario, String usuario){
        
        int encontrado =0;
        String[] prop = propietario.split(",");
        int cant=0;
        
        for (String nombre : prop) {
            if(usuario.trim().contains(nombre.trim())) // Si usuario existe
            {
                if (prop.length > 0) {
                    logger.debug("Encontrado 2");
                    encontrado = 2;
                    break;
                } 
            }else{
                encontrado = 3;
            }
        }
             
        System.out.println("encontrado "+encontrado);
        return encontrado;
    }
    
    public static int ValidarNombreExistenteParaEliminar(String propietario, String usuario){
        
        int encontrado =0;
        String[] prop = propietario.split(",");
        
        for (String nombre : prop) {
            if(usuario.trim().contains(nombre.trim()))
            {
                if (prop.length > 1) {
                    logger.debug("Encontrado 2");
                    encontrado = 2;         
                    break;
                }
                else if (prop.length == 1) {
                    logger.debug("Encontrado 1");
                    encontrado = 1;                    
                    break;
                }
            }
        }
                
        return encontrado;
    }
    
    
    public static String QuitarComaFinal(String cadena){
        String nombresincoma = "";
        String nombrelimpio = "";

        if (cadena.substring(cadena.length() - 1, cadena.length()).indexOf(",") != -1) {
            nombresincoma = cadena.substring(0, cadena.length() - 1);
            //System.out.println("nombresincoma " + nombresincoma);
        } else {
            nombresincoma = cadena;
        }

        if (nombresincoma.substring(0, 1).indexOf(",") != -1) {
            nombrelimpio = nombresincoma.substring(cadena.length() + 1, nombresincoma.length());
        } else {
            nombrelimpio = nombresincoma;
        }
        
        return nombresincoma;
    }
    
    
    
    
    /**
     * 
     *
     */
    public static int getIdSistema(String sistema) {
        int idSistema = 0;
        if(sistema.equals("BCA"))
        {
            idSistema = 1;
        }
        else if(sistema.equals("BCS") )
        {
            idSistema = 2;
        }
        else if(sistema.equals("SIN") )
        {
            idSistema = 3;
        }
        
        return idSistema;
    }
    
    /**
     * 
     *
     */
    public static int getIdAlgoritmo(String sistema) {
        int idSistema = 0;
        if(sistema.equals("DERSI"))
        {
            idSistema = 1;
        }
        else if(sistema.equals("DERSMI") )
        {
            idSistema = 2;
        }
        else if(sistema.equals("AUTR") )
        {
            idSistema = 3;
        }
        
        return idSistema;
    }
    
    
    
    public static String getUUID() {
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString().replace("-", "").substring(0,18);
        
        return randomUUIDString;
    }
    
    
}
