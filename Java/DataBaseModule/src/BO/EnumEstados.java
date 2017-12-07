/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BO;

/**
 *
 * @author alejandra.moreno
 */
public enum EnumEstados {

    /**
     * V
     */
    registroinicial("1"),
    
    /**
     * V
     */
    actualizaregistro("2"),
    
    /**
     * V
     */
    porfallo("3"),

    /**
     * V
     */
    desdeoriginal("4"),
    
    /**
     * V
     */
    desdemodificado("5")
    ;
    
    private final String estado;
    
    EnumEstados(String estado){
        this.estado = estado;
    }
    
    /**
     * Propiedad que regresa ambiente
     * @return the ambiente
     */
    public String setEstado() {
        return estado;
    }
    
    /**
     * Propiedad que regresa ambiente
     * @return the ambiente
     */
    public String getEstado() {
        return estado;
    }
    

}
