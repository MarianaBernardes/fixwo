package com.fixwo.domain

import grails.rest.*

@Resource(uri="/teste", readOnly=false, formats=["json","xml"])
class Teste {

    def grailsApplication // gets injected automatically

    def test = {
        grailsApplication.controllerClasses.each { controllerArtefact ->
            def controllerClass = controllerArtefact.getClazz()
            println "$controllerArtefact, $controllerClass"
        }
    }
}
