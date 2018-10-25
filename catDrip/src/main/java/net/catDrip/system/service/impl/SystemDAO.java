package net.catDrip.system.service.impl;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import net.catDrip.common.core.auth.Globals;

@Repository("systemDAO")
public class SystemDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public String testDb() {
		//return "dewfew";
		return sqlSession.selectOne("testDb");
	}
	
	
	public Object selectList(String mapperSql, Map<String, Object> systemMap) {
		
		return sqlSession.selectList(mapperSql, systemMap);
	}
	
	public Object selectOne(String mapperSql, Map<String, Object> systemMap) {
		
		return sqlSession.selectOne(mapperSql, systemMap);
	}
	
	public int selectSendCnt(Map<String, Object> systemMap) {
		String mapperSql = systemMap.get("mapperName") + Globals.MAPPER_SEPARATION + "sendCnt";
		
		return sqlSession.selectOne(mapperSql, systemMap);
	}
}
