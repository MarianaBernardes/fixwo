package com.fixwo.domain

import grails.rest.*

@Resource(uri="/setor", readOnly=false, formats=["json","xml"])
class Setor {

    String nome
    Grupo responsavelSetor
}
