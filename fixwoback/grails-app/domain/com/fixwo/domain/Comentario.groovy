package com.fixwo.domain
import grails.rest.*

@Resource(uri="/comentario", readOnly=false, formats=["json","xml"])
class Comentario {

    Ocorrencia ocorrencia
    Usuario usuario 
    String conteudo
    Date data

}
