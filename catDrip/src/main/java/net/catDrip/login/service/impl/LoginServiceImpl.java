package net.catDrip.login.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.catDrip.login.service.LoginService;
import net.catDrip.login.service.LoginVO;

@Service("loginService")
public class LoginServiceImpl implements LoginService {
	
	@Resource(name = "loginDAO")
	private LoginDAO loginDAO;
	
	public LoginVO loginProcess(LoginVO loginVO) {
		String id = loginVO.getId();
		String pw = loginVO.getPw();
		String name = loginVO.getName();
		System.out.println("아이디 : " + id);
		System.out.println("비밀번호 : " + pw);
		System.out.println("이름 : " + name);
		LoginVO vo = null;
		if(null == id) {
			System.out.println("if");
		}else if("".equals(id)) {
			System.out.println("else if");
		}else {
			System.out.println("else");
			vo = new LoginVO();
			vo.setId(id);
			vo.setPw(pw);
			vo.setName(name);
		}
		System.out.println("확인 : " + vo);
		System.out.println("DAO 가서 인증 생략.");
		
		return vo;
	}
}
