package com.fixwo.domain

import grails.rest.*

@Resource(uri="/cliente", readOnly=false, formats=["json","xml"])
class Cliente {

    String nome
}
