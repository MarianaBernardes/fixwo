package com.fixwo.domain

import grails.transaction.Transactional
import groovy.json.JsonSlurper;
import com.easybpms.integration.grails.controller.ObservableRestfulController

class OrdemServicoController extends ObservableRestfulController{

    @Transactional(readOnly=false)
    def save(Ocorrencia ocorrencia) {

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

        /*
            Linhas acima dessa são padrão do Grails. O método save() é um método padrão de todos os controllers,
            ao criar um novo, esse novo sobreescreve o antigo.

            Foi criado para adicionar a integração com o WikiMapia

        */

        /*
        UrlWiki: URL da api Wikimapi que retorna todos os locais de um certo ponto parametros: 
        format=json -> formato do retorno
        lat-> latitude
        Lon-> Longitude

        Os parametros params.lat e params.lon são do dominio e são passados por POST quando se chama o método save().
        */
        String urlWiki="http://api.wikimapia.org/?key=example&function=place.search&format=json"
        String lat="&lat="+params.lat
        String lon="&lon="+params.lon

        urlWiki = urlWiki + lat + lon

        /*
            Converti a String em uma URL
        */
        URL apiUrl = new URL(urlWiki)

        
        /*
            JsonSlurper: Biblioteca para ler Json para Groovy
        */
        def slurper = new JsonSlurper()
        //Peguei o conteudo do JSON
        def registros = slurper.parseText(apiUrl.text)//api.Url.text->peguei o conteudo da url e converti em texto
        def places = registros.places
        //places.each é tipo um foreach
        places.each{

            if(Area.countByIdWikiMapia(it."id")<=0){//Se aquela area idWikiMapia não estiver cadastrado
                def area = new Area(idWikiMapia:it."id")//cria um objeto Area com o idWikiMapia pego do JSON
                area.save()//Persiste o objedo no bd
                ocorrencia.addToAreas(area)//adiciona o objeto ao objeto OrdemServico
            }else{//Se a area já esta cadastrada
                ocorrencia.addToAreas(Area.findByIdWikiMapia(it."id"))//busca ela no bd e adiciona ao objeto
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
}
