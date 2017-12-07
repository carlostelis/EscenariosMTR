/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;



/**
 *
 * @author alejandra.moreno
 */
public enum EnumZonaHoraria {
    
    /**
     * Valor que contiene un valor String que representa el ID de la Zona Horaria de BCS
     * America/Mazatlan    //Mexico/BajaSur
     */
    bcs("America/Mazatlan"),    

    /**
     * Valor que contiene un valor String que representa el ID de la Zona Horaria de BCA
     * America/Tijuana
     */
    bca("America/Tijuana"),     

    /**
     * Valor que contiene un valor String que representa el ID de la Zona Horaria de SIN
     * America/Mexico_City
     */
    sin("America/Mexico_City"), 

    /**
     * Valor que contiene un valor String que representa el ID de la Zona Horaria de BCS
     * Y el valor UTC correspondiente a la zona.
     * Para el horario de invierno se considera -07:00 y para el horario de verano se considera -06:00
     */
    bcs_utc("America/Mazatlan", bcs.getUTC("America/Mazatlan")),

    /**
     * Valor que contiene un valor String que representa el ID de la Zona Horaria de BCA
     * Y el valor UTC correspondiente a la zona.
     * Para el horario de invierno se considera -08:00 y para el horario de verano se considera -07:00
     */
    bca_utc("America/Tijuana", bca.getUTC("America/Tijuana")),

    /**
     * Valor que contiene un valor String que representa el ID de la Zona Horaria de BCA
     * Y el valor UTC correspondiente a la zona.
     * Para el horario de invierno se considera -06:00 y para el horario de verano se considera -05:00
     */
    sin_utc("America/Mexico_City", sin.getUTC("America/Mexico_City"));
    
    private final String sistema;
    private String sUTC;
    
    EnumZonaHoraria(String sistema){
        this.sistema = sistema;
    }
    
    EnumZonaHoraria (String sistema, String sUTC){
        this.sistema = sistema;
        this.sUTC = sUTC;
    }

    /**
     * Propiedad que regresa el sistema de conexion.
     * @return the sistema
     */
    public String getZona() {
        return sistema;
    }
    
    /**
     * Propiedad que obtiene el UTC de la hora actual del sistema y regresa el valor.
     * @return the UTC
     */
    public String getUTC(String ZONA) {
        
        //DateTimeFormatter dtf = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm:ss ZZ");
        //DateTimeZone zone = DateTimeZone.forID(bca);
        
        String DATEFORMAT = "dd/MM/yyyy HH:mm:00 X";
        SimpleDateFormat sdf = new SimpleDateFormat(DATEFORMAT);
        sdf.setTimeZone(TimeZone.getTimeZone(ZONA));
        String utcTime = sdf.format(new Date());

        String DATEFORMATZONE = "X";
        SimpleDateFormat sdfz = new SimpleDateFormat(DATEFORMATZONE);
        sdfz.setTimeZone(TimeZone.getTimeZone(ZONA));
        sUTC = sdfz.format(new Date());
        //System.out.println("tz:   " + sUTC);
        
        return sUTC;
    }
    
}
