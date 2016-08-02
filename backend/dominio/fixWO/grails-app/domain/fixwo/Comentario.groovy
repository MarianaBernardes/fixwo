package fixwo
import grails.rest.*

@Resource(uri="/comentarios", readOnly=false, formats=["json","xml"])
class Comentario {

    OrdemServico ordemServico
    Usuario usuario 
    String conteudo
    Date data

}
