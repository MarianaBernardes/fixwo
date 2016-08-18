package com.fixwo.domain

import grails.rest.Resource

@Resource(uri="/grupo", readOnly=false, formats=["json","xml"])
class Grupo {
//	Cliente cliente
	String name

	static hasMany = [usuario:Usuario]
	
}
