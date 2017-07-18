package com.fixwo.domain

import static org.springframework.http.HttpStatus.*

import com.easybpms.codegen.AbstractContext
import com.easybpms.db.Session
import com.easybpms.integration.grails.controller.ObservableRestfulController

import grails.transaction.Transactional
import groovy.json.JsonSlurper;

class OcorrenciaController extends ObservableRestfulController {

	static responseFormats=["json", "xml"]
	
	OcorrenciaController(){
		super(Ocorrencia)
	}

	def index(){
		render "ocorrencia"
	}
	
	def index2(){
		render "index2"
	}
	
   @Transactional(readOnly=false)
    def save(Ocorrencia ocorrencia) {
			
		Session.setEntityManager(emanager)

		if (ocorrencia == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (ocorrencia.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond ocorrencia.errors, view:'create'
            return
        }

       
        String urlWiki="http://api.wikimapia.org/?key=example&function=place.search&format=json"
        String lat="&lat="+ocorrencia.lat
        String lon="&lon="+ocorrencia.lon

        urlWiki = urlWiki + lat + lon

      
        URL apiUrl = new URL(urlWiki)

       
        def slurper = new JsonSlurper()
        
        def registros = slurper.parseText(apiUrl.text)
        def places = registros.places
        
        places.each{

            if(Area.countByIdWikiMapia(it."id")<=0){
                def area = new Area(idWikiMapia:it."id")
                area.save()
                ocorrencia.addToArea(area)
            }else{
                ocorrencia.addToArea(Area.findByIdWikiMapia(it."id"))
            }

        }

        ocorrencia.save flush:true
       notifyObservers(ocorrencia)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'ocorrencia.label', default: 'ocorrencia'), ocorrencia.id])
                redirect ocorrencia
            }
            '*' { respond ocorrencia, [status: CREATED] }
        }

    }
	
	def notifyObservers(arg) {
		AbstractContext.getContext().notifyObservers(arg.getClass().getSimpleName(), arg)
	}

}
