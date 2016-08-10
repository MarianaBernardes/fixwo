package com.fixwo.domain

import grails.rest.Resource

import java.util.List;

import com.easybpms.domain.IUser
import com.easybpms.integration.grails.controller.EasyBpmsUserRestfulController

@Resource(uri="/usuarios", readOnly=false, formats=["json","xml"], superClass=EasyBpmsUserRestfulController)
class Usuario {

    String nome
    String login
    String hashSenha
    String email
	Cliente cliente
    int ativo=0;
    static hasMany = [grupos:Grupo]
    static belongsTo = [Grupo]

    static constraints = {
		nome (nullable:false, blank:false, unique:false)
		email(email:true, nullable:false, blank:false)
		login(nullable:false, blank:false, unique:true)
		hashSenha(nullable:false, blank:false, password:true)
		grupos(nullable:true, blank:true)
    }}
