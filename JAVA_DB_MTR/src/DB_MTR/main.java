/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.util.HashMap;


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
        }
    }
    
}
