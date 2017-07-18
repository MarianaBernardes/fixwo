package com.fixwo.domain

import grails.rest.Resource

import java.util.List;

import com.easybpms.domain.IUser
import com.easybpms.integration.grails.controller.EasyBpmsUserRestfulController
import com.fixwo.auth.SpringUser

@Resource(uri="/api/guest/usuario", readOnly=false, formats=["json","xml"], superClass=EasyBpmsUserRestfulController)
class Usuario extends SpringUser{
	
    String nome
    //String login
    //String hashSenha
    String email
	Cliente cliente
    //int ativo=0;
    static hasMany = [grupo:Grupo]
    static belongsTo = Grupo

    static constraints = {
		nome (nullable:false, blank:false, unique:false)
		email(email:true, nullable:false, blank:false)
		//login(nullable:false, blank:false, unique:true)
		//hashSenha(nullable:false, blank:false, password:true)
		grupo(nullable:true, blank:true)
    }
}
