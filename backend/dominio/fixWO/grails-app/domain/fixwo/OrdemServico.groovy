package fixwo

class OrdemServico {

    String titulo
    String descricao
    int categoria
    int status
    Usuario solicitante
    Byte fotos
    String point
    Setor setor
    Area[] areas
    Local local

    static constraints = {
        setor (nullable:true, blank:true)
        local (nullable:true, blank:true)
    } 

}
