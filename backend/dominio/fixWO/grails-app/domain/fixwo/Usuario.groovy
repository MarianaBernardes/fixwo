package fixwo

import grails.rest.*

@Resource(uri="/usuarios", readOnly=false, formats=["json","xml"])
class Usuario {

    String nome
    String login
    String hashSenha
    String email
    int ativo=0;
    static hasMany = [grupo:Grupo]
    static belongsTo = [Grupo]

    static constraints = {
		nome (nullable:false, blank:false, unique:false)
		email(email:true, nullable:false, blank:false)
		login(nullable:false, blank:false, unique:true)
		hashSenha(nullable:false, blank:false, password:true)
		grupo(nullable:true, blank:true)
    }

}
