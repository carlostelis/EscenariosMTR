/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DB_MTR;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.json.JSONObject;

/**
 *
 * @author Carlos
 */
public class Zipper {
    
    private static final int BUFFER_SIZE = 4096;
    
    public static void zipCarpeta(String sourceFile, String output) throws IOException {
        FileOutputStream fos = new FileOutputStream(output);
        ZipOutputStream zipOut = new ZipOutputStream(fos);
        File fileToZip = new File(sourceFile);
 
        zipFile(fileToZip, fileToZip.getName(), zipOut);
        zipOut.close();
        fos.close();
    }
 
    private static void zipFile(File fileToZip, String fileName, ZipOutputStream zipOut) throws IOException {
        if (fileToZip.isHidden()) {
            return;
        }
        if (fileToZip.isDirectory()) {
            File[] children = fileToZip.listFiles();
            for (File childFile : children) {
                zipFile(childFile, fileName + "/" + childFile.getName(), zipOut);
            }
            return;
        }
        FileInputStream fis = new FileInputStream(fileToZip);
        ZipEntry zipEntry = new ZipEntry(fileName);
        zipOut.putNextEntry(zipEntry);
        byte[] bytes = new byte[1024];
        int length;
        while ((length = fis.read(bytes)) >= 0) {
            zipOut.write(bytes, 0, length);
        }
        fis.close();
    }
    
    public static void unzipCarpeta(String zipFilePath, String destDirectory) throws IOException {
        File destDir = new File(destDirectory);
        if (!destDir.exists()) {
            destDir.mkdir();
        }
        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));

        ZipEntry entry = zipIn.getNextEntry();
        // iterates over entries in the zip file
        while (entry != null) {
            String filePath = destDirectory + File.separator + entry.getName();
            if (!entry.isDirectory()) {
                // if the entry is a file, extracts it
                new File(filePath).getParentFile().mkdirs();
                extractFile(zipIn, filePath);
                System.out.println(filePath);
            } else {
                // if the entry is a directory, make the directory
                File dir = new File(filePath);
                System.out.println(filePath);
                dir.mkdirs();
            }
            zipIn.closeEntry();
            entry = zipIn.getNextEntry();
        }
        zipIn.close();
    }
    
    private static void extractFile (ZipInputStream zipIn, String filePath) throws IOException {
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
        byte[] bytesIn = new byte[BUFFER_SIZE];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
            bos.write(bytesIn, 0, read);
        }
        bos.close();
    }
    
    public static void extractTarGZ(String archivoTar, String dia, String escenario, String carpeta) {
        if (!carpeta.endsWith(File.separator)) {
            carpeta += File.separator;
        }
        
        GzipCompressorInputStream gzipIn;
        try {
            gzipIn = new GzipCompressorInputStream(new FileInputStream(archivoTar));
        } catch (IOException ex) {
            System.out.println("ERROR -> Falla al crear descompresor de archivo tar: " + ex);
            return;
        }
        
        if (!dia.endsWith("/")) {
            dia += "/";
        }
        
        // El compresor maneja rutas tipo linux
        String ruta_escenario = dia + escenario + "/";
        //System.out.println("Ruta: " + ruta_escenario);
        boolean escenario_encontrado = false;
        boolean flag_procesar_dir;
        boolean flag_procesar_file = false;
        
        int cont_archivos = 0;
        int cont_directorios = 0;
        
        
        try (TarArchiveInputStream tarIn = new TarArchiveInputStream(gzipIn)) {
            TarArchiveEntry entry;

            while ((entry = (TarArchiveEntry) tarIn.getNextEntry()) != null) {
                /**
                 * If the entry is a directory, create the directory. *
                 */
                if (entry.isDirectory()) {
                    // Busca escenario
                    flag_procesar_dir = false;
                    //System.out.println("Directorio: " + entry.getName() + " ~ " + ruta_escenario);
                    // Si se encuentra el dia correcto
                    if (entry.getName().equals(dia)) {
                        flag_procesar_dir = true;
                    }
                    
                    if (entry.getName().contains(ruta_escenario)) {
                        //System.out.println("Escenario encontrado");
                        escenario_encontrado = true;
                        flag_procesar_dir = true;
                    }
                    
                    if (flag_procesar_dir) {
                        File f = new File(carpeta + entry.getName());
                        //System.out.println("Creando Directorio: " + entry.getName() + "  " + f.getAbsolutePath());
                        boolean created = f.mkdir();
                        if (created) {
                            cont_directorios++;
                            if (escenario_encontrado) {
                                flag_procesar_file = true;
                            }
                        }
                    } else {
                        flag_procesar_file = false;
                    }
                } else {
                    if (flag_procesar_file) {
                        int count;
                        int BUFFER_SIZE = 1024;
                        byte data[] = new byte[BUFFER_SIZE];
                        FileOutputStream fos = new FileOutputStream(carpeta + entry.getName(), false);
                        try (BufferedOutputStream dest = new BufferedOutputStream(fos, BUFFER_SIZE)) {
                            while ((count = tarIn.read(data, 0, BUFFER_SIZE)) != -1) {
                                dest.write(data, 0, count);
                            }
                            dest.close();
                            cont_archivos++;
                        }
                    }
                }
            }

            tarIn.close();
            
            JSONObject json = new JSONObject();
            json.put("estado", escenario_encontrado);
                
            if (escenario_encontrado) {
                json.put("carpetas", cont_directorios);
                json.put("archivos", cont_archivos);
                json.put("escenario", escenario);
                json.put("dia", dia);
                json.put("rutaLocal", carpeta + ruta_escenario);
            }
            
            System.out.println(json.toString());
        } catch (IOException ex) {
            System.out.println("ERROR -> Falla durante la descompresión del archivo tar.gz " + ex);
        }
    }
}
