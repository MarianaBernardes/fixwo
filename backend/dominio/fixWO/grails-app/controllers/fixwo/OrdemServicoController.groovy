package fixwo

import grails.transaction.Transactional
import groovy.json.JsonSlurper;

class OrdemServicoController {

    static scaffold = OrdemServico

    @Transactional
    def save(OrdemServico teste) {
        if (teste == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (teste.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond teste.errors, view:'create'
            return
        }

        String urlWiki="http://api.wikimapia.org/?key=example&function=place.search&format=json"
        String lat="&lat="+params.lat
        String lon="&lon="+params.lon

        urlWiki = urlWiki + lat + lon

        URL apiUrl = new URL(urlWiki)

        

        def slurper = new JsonSlurper()
        def registros = slurper.parseText(apiUrl.text)
        def places = registros.places
        places.each{
        	if(Area.countByIdWikiMapia(it."id")<=0){
        		def area = new Area(idWikiMapia:it."id")
            	area.save()
            	teste.addToAreas(area)
        	}else{
        		teste.addToAreas(Area.findByIdWikiMapia(it."id"))
        	}

        }

       def area = new Area(idWikiMapia:5556)
        area.save()
        teste.addToAreas(area)

        teste.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'teste.label', default: 'Teste'), teste.id])
                redirect teste
            }
            '*' { respond teste, [status: CREATED] }
        }
    }
}
