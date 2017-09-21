/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.IllegalInstantException;


/**
 *
 * @author CarlosTelis
 */
public class main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // Crear mapa de parámetros
        HashMap<String, String> params = new HashMap<>();
        
        for (String arg : args) {
            String argx[] = arg.split("=");
            if (argx.length == 1) {
                params.put(argx[0], "");
            } else {
                params.put(argx[0], argx[1]);
            }
        }
        
        if (params.containsKey("--dev")) {
            params.forEach((k,v) -> System.out.println("Key: " + k + ": Value: " + v));
        }
        
        String url = params.get("--url");
        String esquema = params.get("--esq");
        String password = params.get("--pass");
        String opc = params.get("--opc");
        
        if (opc == null) {
            System.out.println("ERROR -> No se proporcionó una opción de BD válida");
            return;
        }

        //DBMTR bd = new DBMTR("mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_SIN", "wOhm6PzNoq");
        BD bd = new BD(url, esquema, password);
        
        switch (opc) {
            case "sistemas":
                bd.obtenerSistemas();
                break;
            case "usuarios":
                String usuario = params.get("--usr");
                bd.obtenerUsuarios(usuario);
                break;
            case "tar":
                String archivo = params.get("--archivo");
                String escenario = params.get("--escenario");
                String dia = params.get("--dia");
                String carpeta = params.get("--carpeta");
                bd.extractTarGZ(archivo.trim(), dia.trim(), escenario.trim(), carpeta.trim());
                break;
            case "utc":
                String fecha = params.get("--fecha");
                String zona = params.get("--zona");
                System.out.println(getUTC(fecha, zona));
        }
    }
    
    static String getUTC(String fecha, String zona) {
        String a[] = fecha.split("\\s");
        if (a.length < 2) {
            return "ERROR -> Fecha mal formada: " + fecha;
        }
        
        String f[] = a[0].split("-");
        int anio = Integer.parseInt(f[0]);
        int mes = Integer.parseInt(f[1]);
        int dia = Integer.parseInt(f[2]);
        
        String h[] = a[1].split(":");
        int hora = Integer.parseInt(h[0]);
        int min = Integer.parseInt(h[1]);
        
        DateTimeZone tz = DateTimeZone.forID(zona);//.getDefault();
        DateTime dt;

        try {
            dt = new DateTime(anio, mes, dia, hora, min);
        } catch (IllegalInstantException iie) {
            // La hora no existe por el cambio de horario
            return "ERROR -> La fecha no existe debido a cambio de horario";
        }
        
        Long instant = dt.getMillis();
        
        long offsetInMilliseconds = tz.getOffset(instant);
        long hours = TimeUnit.MILLISECONDS.toHours( offsetInMilliseconds );
        
        return String.format("%03d", hours);
    }
}
