/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.json;

import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

/**
 *
 * @author Efren Ruben Coronel Flores
 */
public class pruebaJSON {
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        
        String xmlString = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><root><ATIP><estados><maquina valor=\"A\" ><channel valor=\"3\" /><tip_position valor=\"IN SHIELD\" /><direction valor=\"STOPPED\" /><self_test valor=\"OKAY\" /><ATCU_mode valor=\"OPERATE\" /><scan_permissive valor=\"NO - NOT IN PARK\" /><data_available valor=\"NOT READY\" /><status_bytes b1=\"0x41\" b2=\"0x14\" cadena=\"101(41h)- 24(14h)\" /></maquina><maquina valor=\"B\"><channel valor=\"8\" /><tip_position valor=\"IN SHIELD\" /><direction valor=\"STOPPED\" /><self_test valor=\"OKAY\" /><ATCU_mode valor=\"OPERATE\" /><scan_permissive valor=\"NO - NOT IN PARK\" /><data_available valor=\"NOT READY\" /><status_bytes b1=\"0x41\" b2=\"0x14\" cadena=\"101(41h)- 24(14h)\" /></maquina></estados></ATIP></root>";
        
        xmlString = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><conexiones>\n" +
"	<conexion>\n" +
"		<nombre>CPU2B Simulador</nombre>\n" +
"		<unidad>2</unidad>\n" +
"		<hostPrincipal>10.5.9.10</hostPrincipal>\n" +
"		<hostRespaldo>0.0.0.0</hostRespaldo>\n" +
"		<timeout>5</timeout>\n" +
"		<nombreUsuario>oogie</nombreUsuario>\n" +
"	</conexion>\n" +
"	<conexion>\n" +
"		<nombre>CPU1B Planta</nombre>\n" +
"		<unidad>1</unidad>\n" +
"		<hostPrincipal>10.5.9.16</hostPrincipal>\n" +
"		<hostRespaldo>0.0.0.0</hostRespaldo>\n" +
"		<timeout>4</timeout>\n" +
"		<nombreUsuario>oogie</nombreUsuario>\n" +
"	</conexion>\n" +
"	<conexion>\n" +
"		<nombre>VMWare Player</nombre>\n" +
"		<unidad>1</unidad>\n" +
"		<hostPrincipal>192.168.47.128</hostPrincipal>\n" +
"		<hostRespaldo>0.0.0.0</hostRespaldo>\n" +
"		<timeout>15</timeout>\n" +
"		<nombreUsuario>oogie</nombreUsuario>\n" +
"	</conexion>\n" +
"	<conexion>\n" +
"		<nombre>CPU1A Planta</nombre>\n" +
"		<unidad>1</unidad>\n" +
"		<hostPrincipal>10.5.9.11</hostPrincipal>\n" +
"		<hostRespaldo>0.0.0.0</hostRespaldo>\n" +
"		<timeout>5</timeout>\n" +
"		<nombreUsuario>oogie</nombreUsuario>\n" +
"	</conexion>\n" +
"</conexiones>";
        
        JSONObject json = XML.toJSONObject(xmlString);
//        
//        JSONObject conexiones = json.getJSONObject("conexiones");
//        
//        JSONArray arr = conexiones.getJSONArray("conexion");
//        System.out.println(">>>> Arr: " + arr.length());
//        for (int i = 0; i < arr.length(); i++) {
//            System.out.println(arr.get(i));
//        }
//        
//        xmlString = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><conexiones>\n" +
//"	<conexion>\n" +
//"		<nombre>CPU2B Simulador</nombre>\n" +
//"		<unidad>2</unidad>\n" +
//"		<hostPrincipal>10.5.9.10</hostPrincipal>\n" +
//"		<hostRespaldo>0.0.0.0</hostRespaldo>\n" +
//"		<timeout>5</timeout>\n" +
//"		<nombreUsuario>oogie</nombreUsuario>\n" +
//"	</conexion>\n" +
//"	<conexion2>\n" +
//"		<nombre>CPU2B Simulador</nombre>\n" +
//"		<unidad>2</unidad>\n" +
//"		<hostPrincipal>10.5.9.10</hostPrincipal>\n" +
//"		<hostRespaldo>0.0.0.0</hostRespaldo>\n" +
//"		<timeout>5</timeout>\n" +
//"		<nombreUsuario>oogie</nombreUsuario>\n" +
//"	</conexion2>\n" +
//"</conexiones>";
//        
//        json = XML.toJSONObject(xmlString);
//        
//        conexiones = json.getJSONObject("conexiones");
//        
//        Iterator i = conexiones.keySet().iterator();
//        
//        System.out.println(">>>> i: " );
//        while (i.hasNext()) {
//            System.out.println(i.next().toString());
//        }
//         System.out.println(">>>> n: " );
//        JSONArray ja = conexiones.names();
//        
//        for (int j = 0; j < ja.length(); j++) {
//            System.out.println(ja.get(j));
//        }
        
//        JSONObject config = json.getJSONObject("config");
        
        JSONObject conexiones = json.getJSONObject("conexiones");
        
        JSONArray lista = conexiones.getJSONArray("conexion");

        for (Object o : lista) {
            JSONObject jo = (JSONObject)o;
            JSONArray ja = jo.names();
            System.out.println(" >>>> " + ja);
            
            for (int i = 0; i < ja.length(); i++) {
                System.out.println(" >>>>>>>> " + ja.getString(i) + " : " + jo.get(ja.getString(i)));
            }
        }
        
//        System.out.println("JSON: " + json.toString());
    }
    
}
