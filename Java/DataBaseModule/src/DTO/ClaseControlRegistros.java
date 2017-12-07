/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DTO;

/**
 *
 * @author alejandra.moreno
 */
public class ClaseControlRegistros {

    private String id_registro;
    private String fk_control_escenario;
    
    
    /**
     * @return the id_registro
     */
    public String getId_registro() {
        return id_registro;
    }

    /**
     * @param id_registro the id_registro to set
     */
    public void setId_registro(String id_registro) {
        this.id_registro = id_registro;
    }

    /**
     * @return the fk_control_escenario
     */
    public String getFk_control_escenario() {
        return fk_control_escenario;
    }

    /**
     * @param fk_control_escenario the fk_control_escenario to set
     */
    public void setFk_control_escenario(String fk_control_escenario) {
        this.fk_control_escenario = fk_control_escenario;
    }
    
    
    
    
}
