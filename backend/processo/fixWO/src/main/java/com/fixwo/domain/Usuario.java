package com.fixwo.domain;

import java.util.List;

import com.easybpms.domain.IUser;

public class Usuario implements IUser{

	private String id;
	private String name = "";
	private String tenancy = "";
	private List<String> userGroupNames;
	
	@Override
	public String getIdApp() {
		// TODO Auto-generated method stub
		return id;
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return name;
	}

	@Override
	public String getTenancy() {
		// TODO Auto-generated method stub
		return tenancy;
	}

	@Override
	public List<String> getUserGroupNames() {
		// TODO Auto-generated method stub
		return userGroupNames;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setTenancy(String tenancy) {
		this.tenancy = tenancy;
	}

	public void setUserGroupNames(List<String> userGroupNames) {
		this.userGroupNames = userGroupNames;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
}
