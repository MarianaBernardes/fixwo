package com.fixwo.domain

//import grails.rest.*
//import com.easybpms.integration.grails.controller.ObservableRestfulController

//@Resource(uri="/ocorrencia", readOnly=false, formats=["json","xml"], superClass=ObservableRestfulController)
class Ocorrencia {

    String titulo
    String descricao
    int categoria
    int status
    Usuario solicitante
    Byte fotos
    String lat
    String lon
    Setor setor
    Local local

	String feedback
	String avaliacao
	String tenancy
	String replica


    static hasMany = [area:Area]
    static belongsTo = [Area]
	
    static constraints = {
        setor (nullable:true, blank:true)
        local (nullable:true, blank:true)
        avaliacao (nullable:true, blank:true)
        feedback (nullable:true, blank:true)
        tenancy(nullable:true, blank:true)
    } 

}
