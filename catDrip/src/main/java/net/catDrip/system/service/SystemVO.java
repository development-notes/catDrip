package net.catDrip.system.service;

public class SystemVO {
	private String recordCountPerPage;
	private String firstIndex;
	private String mapperName;
	private String condition;
	
	
	public String getRecordCountPerPage() {
		return recordCountPerPage;
	}
	public void setRecordCountPerPage(String recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}
	public String getFirstIndex() {
		return firstIndex;
	}
	public void setFirstIndex(String firstIndex) {
		this.firstIndex = firstIndex;
	}
	public String getMapperName() {
		return mapperName;
	}
	public void setMapperName(String mapperName) {
		this.mapperName = mapperName;
	}
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
}
