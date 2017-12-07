/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DTO;

import java.util.ArrayList;

/**
 *
 * @author alejandra.moreno
 */
public class ClaseInformacionArchivo {

    private String nombreArchivo;
    private String dato;
    private ArrayList<String> listInfoArchivo= new ArrayList<String>();
    
    /**
     * @return the nombreArchivo
     */
    public String getNombreArchivo() {
        return nombreArchivo;
    }

    /**
     * @param nombreArchivo the nombreArchivo to set
     */
    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    /**
     * @return the dato
     */
    public String getDato() {
        return dato;
    }

    /**
     * @param dato the dato to set
     */
    public void setDato(String dato) {
        this.dato = dato;
    }

    /**
     * @return the listInfoArchivo
     */
    public ArrayList<String> getListInfoArchivo() {
        return listInfoArchivo;
    }

    /**
     * @param listInfoArchivo the listInfoArchivo to set
     */
    public void setListInfoArchivo(ArrayList<String> listInfoArchivo) {
        this.listInfoArchivo = listInfoArchivo;
    }

        
    
}
