/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DTO;

import BO.util;

/**
 *
 * @author alejandra.moreno
 */
public class ClaseControlEscenarios {

    private String id_registro;
    private String id_escenario;
    private String tipo_escenario;
    private String fk_usuario;
    private String fecha_alta;
    private String folio;
    private int fk_algoritmo;
    private int estado;
    private String comentario;
    util u;
    
    /**
     * @return the id_escenario
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
     * @return the id_escenario
     */
    public String getId_escenario() {
        return id_escenario;
    }

    /**
     * @param id_escenario the id_escenario to set
     */
    public void setId_escenario(String id_escenario) {
        this.id_escenario = id_escenario;
    }

    /**
     * @return the tipo_escenario
     */
    public String getTipo_escenario() {
        return tipo_escenario;
    }

    /**
     * @param tipo_escenario the tipo_escenario to set
     */
    public void setTipo_escenario(String tipo_escenario) {
        this.tipo_escenario = tipo_escenario;
    }

    /**
     * @return the fk_usuario
     */
    public String getFk_usuario() {
        return fk_usuario;
    }

    /**
     * @param fk_usuario the fk_usuario to set
     */
    public void setFk_usuario(String fk_usuario) {
        this.fk_usuario = fk_usuario;
    }

    /**
     * @return the fecha_alta
     */
    public String getFecha_alta() {
        return fecha_alta;
    }

    /**
     * @param fecha_alta 
     */
    public void setFecha_alta(String fecha_alta) {
        this.fecha_alta = fecha_alta;
    }

    /**
     * @return the folio
     */
    public String getFolio() {
        return folio;
    }

    /**
     * @param folio the folio to set
     */
    public void setFolio(String folio) {
        this.folio = folio;
    }

    /**
     * @return the fk_algoritmo
     */
    public int getFk_algoritmo() {
        return fk_algoritmo;
    }

    /**
     * @param fk_algoritmo the fk_algoritmo to set
     */
    public void setFk_algoritmo(int fk_algoritmo) {
        this.fk_algoritmo = fk_algoritmo;
    }

    /**
     * @return the estado
     */
    public int getEstado() {
        return estado;
    }

    /**
     * @param estado the estado to set
     */
    public void setEstado(String estado) {
        this.estado = Integer.parseInt(estado);
    }

    /**
     * @return the comentario
     */
    public String getComentario() {
        return comentario;
    }

    /**
     * @param comentario the comentario to set
     */
    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
    
}
