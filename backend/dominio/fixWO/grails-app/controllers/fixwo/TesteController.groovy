package fixwo

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import groovy.json.JsonSlurper;

@Transactional(readOnly = true)

class TesteController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Teste.list(params), model:[carCount: Teste.count()]
    }

    def show(Teste teste) {
        respond teste
    }

    def show2(Teste teste) {
    	
        respond teste
    }

    def create() {
        respond new Teste(params)
    }

    @Transactional
    def save(Teste teste) {
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

        teste.save flush:true

        String urlWiki="http://api.wikimapia.org/?key=example&function=place.search&format=json"
        String lat="&lat="+params.lat
        String lon="&lon="+params.lon

        urlWiki = urlWiki + lat + lon

        URL apiUrl = new URL(urlWiki)

        def slurper = new JsonSlurper()
        def registros = slurper.parseText(apiUrl.text)
        def places = registros.places
        places.each{
            def area = new Area(idWikiMapia:it."id")
            area.save()
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'teste.label', default: 'Teste'), teste.id])
                redirect teste
            }
            '*' { respond teste, [status: CREATED] }
        }
    }

    def edit(Teste teste) {
        respond teste
    }

    @Transactional
    def update(Teste teste) {
        if (teste == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (teste.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond teste.errors, view:'edit'
            return
        }

        teste.save flush:true


        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'teste.label', default: 'Teste'), teste.id])
                redirect teste
            }
            '*'{ respond teste, [status: OK] }
        }
    }

    @Transactional
    def delete(Teste teste) {

        if (teste == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        teste.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'teste.label', default: 'Teste'), teste.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'teste.label', default: 'Teste'), params.teste])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
