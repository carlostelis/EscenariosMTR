/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 *
 * @author Carlos
 */
public class test {
    
    
    public static void main(String args[]) {
        try {
            BD bd = new BD("//mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_BCA", "eZJtDzeIA9");
//            BD bd = new BD("//mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_SIN", "wOhm6PzNoq");
//            bd.obtenerUsuarios("TEST");
//            bd.obtenerAnios_Folios("TEST", "DERS_I");
//            bd.obtenerMeses_Folios("TEST", "DERS_I", "2017");
//            bd.obtenerDias_Folios("TEST", "DERS_I", "2017", "12");
//            bd.obtenerFolios_Folios("TEST", "DERS_I", "2017", "12", "05");
//            test.zip("C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06", "C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06.zip");
//            Zipper.unzipCarpeta("C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\201711191501_-06.zip", "C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_original\\2017\\11\\19\\");
            Zipper.zipCarpeta("C:\\AppAnalizadorEscenarios\\BCA\\dersi\\escenario_modificado\\2017\\12\\05\\201712050001_-08\\201712061815", "C:\\AppAnalizadorEscenarios\\BCA\\dersi\\escenario_modificado\\2017\\12\\05\\201712050001_-08\\201712061815.zip");
        } catch (Exception ex) {
            System.out.println("Excepcion: " + ex);
        }


//        BD bd = new BD("mer-scan.cenace.com:1521/PRUEBAS", "BD_ESCEN_BCA", "eZJtDzeIA9");
//        
//        bd.subirEscenario2("C:\\AppAnalizadorEscenarios\\BCA\\autr\\escenario_original\\2017\\11\\30\\201711301601_-08\\201711301601_-08.zip", "201711301601_-08");
        
//        String asd = "C:\\AppAnalizadorEscenarios\\SIN\\autr\\escenario_modificado\\2017\\11\\30\\201711300001_-06\\201711302138\\";
//        System.out.println(asd.replace("escenario_modificado", "escenario_original").replace("201711302138\\", ""));
    }
    
}
