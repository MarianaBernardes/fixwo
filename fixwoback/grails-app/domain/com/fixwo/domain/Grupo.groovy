package com.fixwo.domain

import com.fixwo.auth.SpringRole

import grails.rest.Resource

@Resource(uri="/grupo", readOnly=false, formats=["json","xml"])
class Grupo extends SpringRole{
//	Cliente cliente
	String name

	static hasMany = [usuario:Usuario]
	
}
