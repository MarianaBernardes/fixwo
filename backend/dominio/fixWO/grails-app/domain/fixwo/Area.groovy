package fixwo

import grails.rest.*

@Resource(uri="/area", readOnly=false, formats=["json","xml"])
class Area {

    int idWikiMapia
    Cliente cliente
    static hasMany = [ordensServico:OrdemServico]
    static constraints = {
		cliente (nullable:true, blank:true)
		idWikiMapia(unique:true)
	}
}
