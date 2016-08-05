package com.fixwo.domain

import grails.rest.*

@Resource(uri="/clientes", readOnly=false, formats=["json","xml"])
class Cliente {

    String nome
}
