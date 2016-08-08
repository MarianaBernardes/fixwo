package fixwo

//import grails.rest.*

//@Resource(uri="/ordenservicos", readOnly=false, formats=["json"])
class OrdemServico {

    String titulo
    String descricao
    int categoria
    Cliente cliente
    int status
    Usuario solicitante
    String avaliacao
    String feedback
    Byte fotos
    String lat
    String lon
    Setor setor
    Local local


    static hasMany = [areas:Area]
    static belongsTo = [Area]

    static constraints = {
        setor (nullable:true, blank:true)
        local (nullable:true, blank:true)
        avaliacao (nullable:true, blank:true)
        feedback (nullable:true, blank:true)
        cliente(nullable:true, blank:true)

    } 

}
