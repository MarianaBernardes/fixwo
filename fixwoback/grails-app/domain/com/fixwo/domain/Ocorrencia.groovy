package com.fixwo.domain

import grails.rest.*
import com.easybpms.integration.grails.controller.ObservableRestfulController

@Resource(uri="/ocorrencia", readOnly=false, formats=["json","xml"], superClass=ObservableRestfulController)
class Ocorrencia {

    String titulo
    String descricao
    int categoria
    int status
    Usuario solicitante
    Byte fotos
    String point
    Setor setor
	String feedback
	String avaliacao
    static hasMany = [areas:Area]
    static belongsTo = [Area]
    Local local

    static constraints = {
        setor (nullable:true, blank:true)
        local (nullable:true, blank:true)
    } 

}
