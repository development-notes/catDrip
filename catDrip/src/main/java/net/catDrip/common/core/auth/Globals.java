package net.catDrip.common.core.auth;

import net.catDrip.common.util.CommonUtil;

/**
 * Globals
 * @author 조재훈
 * @mail rlago@onestx.com
 * @since 2018. 09.11
 * @version 1.0
 * 
 */
public class Globals extends CommonUtil {

	public static final String WEB_ROOT_PATH = getPathProperty("Globals.webRootPath"); 
	
	public static final String ATTACH_ROOT_PATH = getPathProperty("Globals.attachRootPath");

	public static final String MAPPER_SEPARATION = "_";
	
	/** 결과 : 실패 */
	public static final String RESULT_FAIL = "fail";
	/** 결과 : 성공 */
	public static final String RESULT_SUCCESS = "success";
	
}
