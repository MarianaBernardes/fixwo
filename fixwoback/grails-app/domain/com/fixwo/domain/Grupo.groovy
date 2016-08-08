package com.fixwo.domain

import grails.rest.Resource

@Resource(uri="/grupos", readOnly=false, formats=["json","xml"])
class Grupo {
//	Cliente cliente
	String name

	static hasMany = [usuarios:Usuario]
	
}
