package fixwo

import grails.rest.*

@Resource(uri="/ordenservicos", readOnly=false, formats=["json","xml"])
class OrdemServico {

    String titulo
    String descricao
    int categoria
    int status
    Usuario solicitante
    Byte fotos
    String point
    Setor setor
    static hasMany = [areas:Area]
    static belongsTo = [Area]
    Local local

    static constraints = {
        setor (nullable:true, blank:true)
        local (nullable:true, blank:true)
    } 

}
