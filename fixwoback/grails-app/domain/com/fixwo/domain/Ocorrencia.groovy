package com.fixwo.domain

//import grails.rest.*
//import com.easybpms.integration.grails.controller.ObservableRestfulController

//@Resource(uri="/ocorrencia", readOnly=false, formats=["json","xml"], superClass=ObservableRestfulController)
class Ocorrencia {

    String titulo
    String descricao
    int categoria
    Usuario solicitante
    Byte fotos
    String lat
    String lon
    Local local

	
	boolean avaliacao
	boolean existeArea
	String tenancy = ""
	String setor = ""
	String status = ""
	String feedback = ""


    static hasMany = [area:Area]
    static belongsTo = [Area]
	
    static constraints = {
        local (nullable:true, blank:true)
		lon (nullable:true, blank:true)
		lat(nullable:true, blank:true)
		setor (nullable:true, blank:true)
        status (nullable:true, blank:true)
        feedback (nullable:true, blank:true)
        tenancy(nullable:true, blank:true)
		avaliacao(nullable:true, blank:true)
		existeArea(nullable:true, blank:true)
    } 

}
