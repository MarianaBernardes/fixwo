package fixwo

import grails.rest.*

@Resource(uri="/setores", readOnly=false, formats=["json","xml"])
class Setor {

    String nome
    Grupo responsaveisSetor
}
