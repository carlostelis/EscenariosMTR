/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.util.concurrent.TimeUnit;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.IllegalInstantException;

/**
 *
 * @author Carlos
 */
public class test {
    public static void main(String args[]) {
//        BD bd = new BD("mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_ACCESO", "X12YlAqEpa");
        
        /*DateTimeZone tz = DateTimeZone.getDefault();
        DateTime fecha = new DateTime(2017, 03, 12, 3, 01);
        Long instant = fecha.getMillis();
        System.out.println(fecha.toString());

        String name = tz.getName(instant);

        long offsetInMilliseconds = tz.getOffset(instant);
        long hours = TimeUnit.MILLISECONDS.toHours( offsetInMilliseconds );
        String offset = Long.toString( hours );*/
        
        /*bcs("America/Mazatlan"),
        bca("America/Tijuana"), 
        sin("America/Mexico_City"), */
        //String zona = "America/Mazatlan";
        String zona = "America/Tijuana";
        //String zona = "America/Mexico_City";
        
        String fecha = "2017-02-26 00:00";
        String utc = getUTC(fecha, zona);
        System.out.println(fecha + " (" + utc + " Hours)");
        
        fecha = "2017-04-26 00:00";
        utc = getUTC(fecha, zona);
        System.out.println(fecha + " (" + utc + " Hours)");
        fecha = "2017-04-02 02:00";
        utc = getUTC(fecha, zona);
        System.out.println(fecha + " (" + utc + " Hours)");
        
        fecha = "2017-03-12 00:00";
        utc = getUTC(fecha, zona);
        System.out.println(fecha + " (" + utc + " Hours)");
        
        fecha = "2017-03-12 03:00";
        utc = getUTC(fecha, zona);
        System.out.println(fecha + " (" + utc + " Hours)");
        
        fecha = "2017-03-12 01:00";
        utc = getUTC(fecha, zona);
        System.out.println(fecha + " (" + (utc.isEmpty() ? "no existe" : utc) + " Hours)");
        
        fecha = "2017-03-12 02:00";
        utc = getUTC(fecha, zona);
        System.out.println(fecha + " (" + (utc.isEmpty() ? "no existe" : utc) + " Hours)");
    }
    
    static String getUTC(String fecha, String zona) {
        String a[] = fecha.split("\\s");
        if (a.length < 2) {
            return "-06";
        }
        
        String f[] = a[0].split("-");
        int anio = Integer.parseInt(f[0]);
        int mes = Integer.parseInt(f[1]);
        int dia = Integer.parseInt(f[2]);
        
        String h[] = a[1].split(":");
        int hora = Integer.parseInt(h[0]);
        int min = Integer.parseInt(h[1]);
        
        DateTimeZone tz = DateTimeZone.forID(zona);
        DateTime dt;

        try {
            dt = new DateTime(anio, mes, dia, hora, dia);
        } catch (IllegalInstantException iie) {
            // La hora no existe por el cambio de horario
            System.out.println(iie);
            return "";
        }
        
        Long instant = dt.getMillis();
        
        long offsetInMilliseconds = tz.getOffset(instant);
        long hours = TimeUnit.MILLISECONDS.toHours( offsetInMilliseconds );
        
        return String.format("%02d", hours);
    }
}
