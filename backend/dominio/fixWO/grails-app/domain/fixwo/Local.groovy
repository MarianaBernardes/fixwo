package fixwo

import grails.rest.*

@Resource(uri="/local", readOnly=false, formats=["json","xml"])
class Local {

    String descricao
    Area area
    Cliente cliente
}
