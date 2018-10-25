package net.catDrip.common.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonUtil {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CommonUtil.class);
	
	// 프로퍼티값 로드시 에러발생하면 반환되는 에러문자열
	public static final String ERR_CODE =" EXCEPTION OCCURRED";
	public static final String RELATIVE_PATH_PREFIX = CommonUtil.class.getResource("").getPath().substring(0, CommonUtil.class.getResource("").getPath().lastIndexOf("net/"));
	public static final String GLOBALS_PROPERTIES_FILE = RELATIVE_PATH_PREFIX + "catDrip" + System.getProperty("file.separator")  + "props" + System.getProperty("file.separator") + "catDrip.properties";
	
	//인자로 주어진 문자열을 Key값으로 하는 상대경로 프로퍼티 값을 절대경로로 반환한다
 	public static String getPathProperty(String keyName){
 		String value = ERR_CODE;
 		
 		FileInputStream fis = null;
 		
 		try{
 			Properties props = new Properties();
 			fis = new FileInputStream(filePathBlackList(GLOBALS_PROPERTIES_FILE));
 			props.load(new java.io.BufferedInputStream(fis));
 			value = props.getProperty(keyName).trim();
 		}catch(FileNotFoundException fne){
 			LOGGER.debug("fne : {}", fne);
 		}catch(IOException ioe){
 			LOGGER.debug("ioe : {}", ioe);
 		}catch(Exception e){
 			LOGGER.debug("e : {}", e);
 		}finally{
 			try {
 				if (fis != null) fis.close();
 			} catch (Exception ex) {
 				LOGGER.debug("IGNORED", ex.getMessage());
 			}

 		}
 		
 		return value;
 	}
 	
 	public static String filePathBlackList(String value) {
		String returnValue = value;
		
		if(returnValue == null || returnValue.trim().equals("")){
			return "";
		}

		returnValue = returnValue.replaceAll("\\.\\./", ""); // ../
		returnValue = returnValue.replaceAll("\\.\\.\\\\", ""); // ..\

		return returnValue;
	}
}
