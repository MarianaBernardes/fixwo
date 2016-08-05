package com.fixwo.domain

import grails.rest.*

@Resource(uri="/grupos", readOnly=false, formats=["json","xml"])
class Grupo {
	Cliente cliente;

	static hasMany = [usuarios:Usuario]
	
}
