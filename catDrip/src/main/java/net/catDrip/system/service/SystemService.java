package net.catDrip.system.service;

import java.util.Map;

public interface SystemService {
	public String testDb();
	
	
	public Object bootstrapTable(Map<String, Object> systemMap);
}
