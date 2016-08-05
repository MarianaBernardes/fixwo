package com.fixwo.domain

import grails.rest.*

@Resource(uri="/locais", readOnly=false, formats=["json","xml"])
class Local {

    String descricao
    Area area
    Cliente cliente
}
