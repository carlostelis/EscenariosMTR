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
public class Util {
    public static String getUTC(String fecha, String zona) {
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
