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
public enum EnumDataBase {

    /**
     * Valor que contiene un valor String que representa un usuario de lectura/escritura
     */
    user_write("write"),

    /**
     * Valor que contiene un valor String que representa un usuario de lectura
     */
    user_read("read"),
    
    /**
     * Valor que contiene un valor String que representa el sistema de produccion
     */
    produccion("produccion"),

    /**
     * Valor que contiene un valor String que representa el sistema de entrenamiento
     */
    entrenamiento("entrenamiento"),

    /**
     * Valor que contiene un valor String que representa el sistema de pruebas
     */
    pruebas("pruebas");
    
    private final String ambiente;
    
    EnumDataBase(String ambiente){
        this.ambiente = ambiente;
    }
    
    /**
     * Propiedad que regresa ambiente
     * @return the ambiente
     */
    public String getAmbiente() {
        return ambiente;
    }
    

}
