/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;


/**
 *
 * @author Carlos
 */
public class test1 {
    
    
    public static void main(String args[]) {
        BD bd = new BD("mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_ACCESO", "X12YlAqEpa");
        
        bd.bajarEscenario("201711191501_-06", "C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06_02.zip");
    }
    
}
