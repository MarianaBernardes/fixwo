package fixwo

import grails.rest.*

@Resource(uri="/grupos", readOnly=false, formats=["json","xml"])
class Grupo {
	Cliente cliente;
	String descricao;

	static hasMany = [usuario:Usuario]
	
}
