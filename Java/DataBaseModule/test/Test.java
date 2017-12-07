
import BO.util;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author alejandra.moreno
 */
public class Test {
    private static util u = new util();
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        boolean encontrado = false;
        String usuario = "ALEJANDRA";
        //String propietario = "CARLOS, TELIS, ALEJANDRA, XX";
        String propietario = "ALEJANDRA";
        String[] prop = propietario.split(",");
        String cadena="";
        
        
        
        for (String nombre : prop) {
            if (usuario.trim().contains(nombre.trim())) {
                System.out.println("Encontrado");
                encontrado = true;
                if(encontrado = true && prop.length > 1)
                {
                    cadena = propietario.replace(usuario+",", "");
                }
                else if(encontrado = true && prop.length == 1)
                {
                    cadena ="";
                }
                break;
                //aquí tu lógica en caso que se haya encontrado...
            }
            
        }
        
      
        
        System.out.println("cadenapropietario "+cadena);
    }
    
}
