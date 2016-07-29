package com.fixwo.domain;

import com.easybpms.domain.IUserGroup;

public class Grupo implements IUserGroup {

	private String name = "";
	
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return name;
	}

}
