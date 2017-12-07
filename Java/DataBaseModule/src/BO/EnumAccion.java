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
public enum EnumAccion {

    /**
     * V
     */
    porregistro(1),

    /**
     * V
     */
    poreliminacion(2),
    
    /**
     * V
     */
    poractualizacion(3)
    ;
    
    private final int accion;
    
    EnumAccion(int accion){
        this.accion = accion;
    }
    
    /**
     * Propiedad que regresa ambiente
     * @return the ambiente
     */
    public int getAccion() {
        return accion;
    }
    

}
