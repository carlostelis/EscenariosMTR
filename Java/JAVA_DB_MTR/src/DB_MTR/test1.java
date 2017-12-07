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
        BD bd = new BD("//mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_BCA", "eZJtDzeIA9");
        
        bd.bajarEscenarioModificado("201712061811", "ALEJANDRA", "AUTR", "C:\\\\AppAnalizadorEscenarios\\\\BCA\\\\autr\\\\escenario_modificado\\\\2017\\\\12\\\\06\\\\201712060001_-08");
//        bd.bajarEscenarioOriginal("201712060001_-08", "DERS_I", "C:\\AppAnalizadorEscenarios\\BCA\\dersi\\escenario_original\\2017\\12\\06");
    }
    
}
