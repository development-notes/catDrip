package net.catDrip.system;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.catDrip.system.service.SystemService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class SystemController {
	
	private static final Logger logger = LoggerFactory.getLogger(SystemController.class);
	
	@Resource(name = "systemService")
	private SystemService systemService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		System.out.println("시간1 : " + formattedDate);
		// DB 체크
		formattedDate = systemService.testDb();
		System.out.println("시간2 : " + formattedDate);
		
		model.addAttribute("serverTime", formattedDate );
		
		// 로그인 유저 정보 담을때
		//RequestContextHolder.getRequestAttributes().setAttribute("loginVO", "로그인한 유저의 정보", RequestAttributes.SCOPE_SESSION);
		
		// 로그인 유저 정보 꺼낼때 
		//Map map = (Map)request.getSession().getAttribute("loginVO");
		
		
		return "home";
	}
	
	
	@RequestMapping(value = "/{menu}/{sub}")
	public String menu1(@PathVariable("menu") String menu, @PathVariable("sub") String sub, ModelMap model) {
		model.put("menuName", menu);
		model.put("subName", sub);
		System.out.println("접근 확인[menu] : " + menu);
		System.out.println("접근 확인[sub] : " + sub);
		
		return "/main/main";
	}
	

	@RequestMapping(value = "/catDrip")
	public String catDrip() {
		System.out.println("메인화면");
		
		return "/main/main";
	}
	
	@RequestMapping(value = "/main/menu1/{sub}")
	public String test(@PathVariable("sub") String sub) {
		System.out.println("main -> sub : " + sub);		
		return "/menu1/" + sub;
	}
	
	
	@RequestMapping(value = "/table/{condition}/{mapperName}")
	public @ResponseBody void bootstrapTable(@PathVariable("condition") String condition, @PathVariable("mapperName") String mapperName,
			@RequestParam Map<String, Object> systemMap, HttpServletResponse response) throws Exception{
		response.setContentType("application/json;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		systemMap.put("condition", condition);
		systemMap.put("mapperName", mapperName);
		response.getWriter().write(systemService.bootstrapTable(systemMap).toString());
	}
	/*@RequestMapping(value = "/menu2/{sub}")
	public String menu2(@PathVariable("sub") String sub, ModelMap model, RedirectAttributes redirectAttributes) {
		model.put("menuName", "menu2");
		model.put("subName", sub);
	
		System.out.println("접근 확인2 : " + sub);
		
		redirectAttributes.addAttribute("params", "sub");
		
		return "redirect:/test";
		//return "/main/main";
	}*/
	/*@RequestMapping(value = "/test")
	public String test(HttpServletRequest request) {
		System.out.println("test 메인화면");
		Map<String, ?> map = RequestContextUtils.getInputFlashMap(request);
		if(null != map) {
			System.out.println("테스트 : "+map.get("params"));			
		}else {
			System.out.println("맵이 null");
		}
		
		return "/main/main";
	}*/
}
