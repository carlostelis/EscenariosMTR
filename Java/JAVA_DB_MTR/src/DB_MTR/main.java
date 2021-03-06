/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.io.IOException;
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
            params.forEach((k,v) -> System.out.println("DEV> Key: " + k + ": Value: " + v));
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
                Zipper.extractTarGZ(archivo.trim(), dia.trim(), escenario.trim(), carpeta.trim());
                break;
            case "zip":
                try {
                    Zipper.zipCarpeta(params.get("--zipSource"), params.get("--zipDestino"));
                } catch (IOException ex) {
                    System.out.println("ERROR -> No fue posible generar ZIP: " + ex);
                }
                
                break;
            case "unzip":
                try {
                    Zipper.unzipCarpeta(params.get("--zipSource"), params.get("--zipDestino"));
                } catch (IOException ex) {
                    System.out.println("ERROR -> No fue posible extraer ZIP: " + ex);
                }
                
                break;
            case "bajarBD_Mod_Zip":
                bd.bajarEscenarioModificado(params.get("--folio"), params.get("--usr"), params.get("--algoritmo"), params.get("--carpeta"));
                break;
            case "bajarBD_Ori_Zip":
                bd.bajarEscenarioOriginal(params.get("--folio"), params.get("--algoritmo"), params.get("--carpeta"));
                break;
            case "folios_anios":
                if (params.get("--tipo").equals("ORI")) {
                    bd.obtenerAnios_Folios_Ori(params.get("--usr"), params.get("--algoritmo"));
                } else {
                    bd.obtenerAnios_Folios_Mod(params.get("--usr"), params.get("--algoritmo"));
                }
                
                break;
            case "folios_meses":
                if (params.get("--tipo").equals("ORI")) {
                    bd.obtenerMeses_Folios_Ori(params.get("--usr"), params.get("--algoritmo"), params.get("--anio"));
                } else {
                    bd.obtenerMeses_Folios_Mod(params.get("--usr"), params.get("--algoritmo"), params.get("--anio"));
                }
                
                break;
            case "folios_dias":
                if (params.get("--tipo").equals("ORI")) {
                    bd.obtenerDias_Folios_Ori(params.get("--usr"), params.get("--algoritmo"), params.get("--anio"), params.get("--mes"));
                } else {
                    bd.obtenerDias_Folios_Mod(params.get("--usr"), params.get("--algoritmo"), params.get("--anio"), params.get("--mes"));
                }
                
                break;
            case "folios_folios":
                if (params.get("--tipo").equals("ORI")) {
                    bd.obtenerFolios_Folios_Ori(params.get("--usr"), params.get("--algoritmo"), params.get("--anio"), params.get("--mes"), params.get("--dia"));
                } else {
                    bd.obtenerFolios_Folios_Mod(params.get("--usr"), params.get("--algoritmo"), params.get("--anio"), params.get("--mes"), params.get("--dia"));
                }
                
                break;
            case "folios_algoritmos":
                bd.obtenerAlgoritmos_Folios_Ori(params.get("--usr"));
                
                break;
            case "foliosMod_ID":
                bd.obtenerFolios_FoliosPorID(params.get("--usr"), params.get("--algoritmo"), params.get("--id"));
                
                break;
            case "utc":
                String fecha = params.get("--fecha");
                String zona = params.get("--zona");
                System.out.println(Util.getUTC(fecha, zona));
        }
    }
}
