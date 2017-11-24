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
public class test {
    
    
    public static void main(String args[]) {
/*        try {
            //        BD bd = new BD("mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_ACCESO", "X12YlAqEpa");
            //test.zip("C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06", "C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06.zip");
            Zipper.unzipCarpeta("C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06.zip", "C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\");
        } catch (IOException ex) {
            System.out.println("Excepcion: " + ex);
        }

*/
        BD bd = new BD("mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_ACCESO", "X12YlAqEpa");
        
        bd.subirEscenario("C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06.zip");
    }
    
}
