package net.catDrip.login;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.catDrip.login.service.LoginService;
import net.catDrip.login.service.LoginVO;

@Controller
public class LoginController {
	
	@Resource
	private LoginService loginService;
	
	@RequestMapping(value = "/login/login")
	public String loginPage() {
		return "/login/login";
	}
	
	@RequestMapping(value = "/login/loginFail")
	public String loginFail() {
		return "/login/loginFail";
	}
	
	@RequestMapping(value = "/login/logout")
	public String logout(HttpSession session) {
		session.invalidate(); // 세션 전체를 날려버림
		//session.removeAttribute("login"); // 하나씩 하려면 이렇게 해도 됨.

		return "/login/logout";
	}
	
	@RequestMapping(value = "/main")
	public String main() {
		return "/main/main";
	}
	
	
	@RequestMapping(value = "/login/loginProcess")
	public String loignProcess(HttpSession session, LoginVO loginVO) {
		String returnURL = "";
		if ( session.getAttribute("login") != null ){
			// 기존에 login이란 세션 값이 존재한다면
			session.removeAttribute("login"); // 기존값을 제거해 준다.
		}
	         
        // 로그인이 성공하면 UserVO 객체를 반환함.
        LoginVO vo = loginService.loginProcess(loginVO);
         
        if ( vo != null ){ // 로그인 성공
            session.setAttribute("login", vo); // 세션에 login인이란 이름으로 UserVO 객체를 저장해 놈.
            returnURL = "/main/main"; // 로그인 성공시 게시글 목록페이지로 바로 이동하도록 하고
        }else { // 로그인에 실패한 경우
            returnURL = "/login/loginFail"; // 로그인 실패화면
        }
	        
		return returnURL;
	}
}
