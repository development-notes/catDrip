package net.catDrip.system.service.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.catDrip.common.core.auth.Globals;
import net.catDrip.common.util.CommonUtil;
import net.catDrip.system.service.SystemService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("systemService")
public class SystemServiceImpl extends CommonUtil implements SystemService{
	
	@Resource(name= "systemDAO")
	private SystemDAO systemDAO;
	
	@Override
	public String testDb() {
		
		return systemDAO.testDb();
	}
	
	
	// bootstrap table data
	@SuppressWarnings("unchecked")
	public Object bootstrapTable(Map<String, Object> systemMap) {
		String mapperSql = systemMap.get("mapperName") + Globals.MAPPER_SEPARATION
				+ systemMap.get("condition");
		
		JSONArray list = new JSONArray();
		JSONObject info = new JSONObject();
		Map<String, Object> map = null;
		
		List<LinkedHashMap<String, Object>> call_list = (List<LinkedHashMap<String, Object>>) systemDAO.selectList(mapperSql, systemMap);
		int cnt = systemDAO.selectSendCnt(systemMap);	
		
		for (int i = 0; i < call_list.size(); i++) {
			map = call_list.get(i);
			list.add(map);
		}
		
		info.put("total", cnt);
		info.put("rows", list);

		return info;
	}
}
