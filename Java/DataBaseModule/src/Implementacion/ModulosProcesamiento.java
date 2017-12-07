/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Implementacion;

import DTO.ClaseInformacionArchivo;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import org.apache.log4j.Logger;

/**
 *
 * @author alejandra.moreno
 */
public class ModulosProcesamiento {
    private static Logger logger ;
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
        ModulosProcesamiento.sistema = sistema;
    }
    
    public static ArrayList<String> ObtenerArchivosEnDirdat(String ruta, HashMap<String, String> hmTablasCampos, String fkalgoritmo){
        File carpetaDestino = new File(ruta);
        ArrayList<String> listaArchivos = new ArrayList<String>();
        try{
            for (File archivo : carpetaDestino.listFiles()) {
                String nombrearchivo = archivo.getName();
                String extensionarchivo = nombrearchivo.substring(nombrearchivo.indexOf(".") + 1, archivo.getName().length());
                extensionarchivo = extensionarchivo.toLowerCase();
                if (extensionarchivo.equals("csv") && archivo.length() !=0 &&  !archivo.isDirectory()) {
                    String contenido = new String(Files.readAllBytes(archivo.toPath())).trim();
                    if ( hmTablasCampos.containsKey(obtenerNombreFormado(nombrearchivo, fkalgoritmo))  && !contenido.isEmpty()) { 
                        listaArchivos.add(archivo.getName());
                    }
                }
            }
        }
        catch(Exception e){
            System.out.println("ERROR: No se encontró la ruta: "+ ruta + " ERROR "+ e.getMessage());
            logger.error("ERROR: No se encontró la ruta: "+ ruta + " ERROR "+ e.getMessage());
            return null;
        }
        
        return listaArchivos;
    }
         
    public static ClaseInformacionArchivo LeerArchivo(String ruta, String listaArchivos, HashMap<String, String> hmTablasCampos, String idRegistro, String fkalgoritmo) {        
        String cadena;
        String nombrearchivo;
        String nombretablaenbd;
        int reg=0;
        int linea = 0;
        ClaseInformacionArchivo listinfo = new ClaseInformacionArchivo();

        nombrearchivo = listaArchivos;
        FileReader f;
        try {
            f = new FileReader(ruta + "/" + listaArchivos);
            BufferedReader b = new BufferedReader(f);

            nombretablaenbd = obtenerNombreFormado(nombrearchivo, fkalgoritmo);

            if (hmTablasCampos.containsKey(nombretablaenbd)) {
                while ((cadena = b.readLine()) != null) {

                    if (nombretablaenbd.startsWith("RESUL_") && linea == 0) {
                        linea++;
                    } else {
                        if (nombretablaenbd.equals("CSV_DERSPRMTS")) {
                            cadena = ModulosProcesamiento.ProcesarDERSPRMTS(cadena);
                        } else if ((nombretablaenbd.equals("RESUL_DTR_ENLACES_X") || nombretablaenbd.equals("RESUL_DTR_RAMAS_ENL_X")) && fkalgoritmo.equals("DERSI")) {
                            cadena = "'1'," + ModulosProcesamiento.componerCadena(cadena, nombretablaenbd, hmTablasCampos);
                        } else {
                            cadena = ModulosProcesamiento.componerCadena(cadena, nombretablaenbd, hmTablasCampos);
                        }

                        listinfo.getListInfoArchivo().add(nombretablaenbd);
                        listinfo.getListInfoArchivo().add("'" + idRegistro + "'," + cadena);
                    }

                }
                b.close();
            } else {
                nombretablaenbd = nombrearchivo;
                //System.out.println("No coincide la tabla con el archivo: " + nombretablaenbd);
                //logger.error("No coincide la tabla con el archivo: " + nombretablaenbd);
                return null;
            }
            linea = 0;
        } catch (FileNotFoundException ex) {
            System.out.println("ERROR: Ocurrió un error al leer la ruta de los archivos. "+ ex.getMessage());
            logger.error("ERROR: Ocurrió un error al leer la ruta de los archivos. "+ ex.getMessage());
        } catch (IOException ex) {
            System.out.println("ERROR: Ocurrió un error al leer la información de los archivos. "+ ex.getMessage());
            logger.error("ERROR: Ocurrió un error al leer la información de los archivos. "+ ex.getMessage());
        }
            
        return listinfo;
    }
    
    private static String ProcesarDERSPRMTS(String s){
        String cadena="";
        int i = 0;
        String[] datos = s.split(",");
        
        while(i < datos.length)
        {
            if(i==0)
            {
                cadena += "'" + datos[i].trim() + "',";
            }
            else 
            {
                if(s.contains("\""))
                {
                    String[] aux = s.split("\"");
                    cadena+="'\""+aux[i].trim()+"\"',";
                    break;
                }
                else 
                {
                    cadena += "'"+datos[i].trim()+"',";
                }
            }
            i++;
        }
        cadena = cadena.substring(0,cadena.length() - 1);
        
        return cadena;
    }
        
    

    private static String componerCadena(String s, String nombretablaenbd, HashMap hmTablasCampos){
        String cadena="";
        int i = 0;
        //String hmtabla = ;
        String[] hmcampos = hmTablasCampos.get(nombretablaenbd).toString().split(",");
        String[] datos = s.split(",");
        int camposnull = 0;
        if(nombretablaenbd.equals("RESUL_DTR_ENLACES_X") || nombretablaenbd.equals("RESUL_DTR_RAMAS_ENL_X"))
        {
            camposnull = ((hmcampos.length -1) - (datos.length)) - 1;
        }else{
            camposnull = (hmcampos.length -1) - (datos.length);
        }
        
        if((hmcampos.length -1) == datos.length )
        {
            while(i < datos.length)
            {
                cadena += "'"+datos[i].trim()+"',";
                i++;
            }
            cadena = cadena.substring(0,cadena.length() - 1);
        }
        else if ((hmcampos.length - 1) > datos.length) { //camposnull != 0
            while (i < datos.length) {
                cadena += "'" + datos[i].trim() + "',";
                i++;
            }
            while (i < datos.length + camposnull) {
                cadena += "null,";
                i++;
            }
            cadena = cadena.substring(0, cadena.length() - 1);
        }
        
        
        
        return cadena;
    }
    
    
    private static String obtenerNombreFormado(String nombrearchivo, String fkalgoritmo){
        String nombretablaenbd = "";
        String nombresincsv="";
        
        nombresincsv = nombrearchivo.substring(0, nombrearchivo.length() -4);
        
        if (nombresincsv.startsWith("DTR_") || nombresincsv.startsWith("DERS_") 
                || nombresincsv.contains("RESUMEN_UNIDADES") 
                ) // Para resultados
        {
            if(fkalgoritmo.equals("DERSI") && nombresincsv.equals("DTR_UNIDADES_1"))
            {
                nombretablaenbd = "RESUL_" + nombresincsv;
            }else
            {
                nombretablaenbd = "RESUL_" + nombresincsv.replace("_1", "_X").replace("_SIN", "_X").replace("_BCA", "_X").replace("BCS", "_X");
            }
        } 
        else //if (nombresincsv.startsWith("RESUL_"))
        {
            nombretablaenbd = "CSV_" + nombresincsv;
        }

        return nombretablaenbd;
    }
    
    /*
    private static void muestraContenido(String ruta) throws FileNotFoundException, IOException {
      String cadena;
     
      FileReader f = new FileReader(ruta);
      BufferedReader b = new BufferedReader(f);
      while((cadena = b.readLine())!=null) {
          //System.out.println(cadena);
      }
      b.close();
            
    }
    */
    
}
