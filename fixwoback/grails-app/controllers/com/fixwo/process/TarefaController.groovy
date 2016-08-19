package com.fixwo.process

import grails.dev.commands.*
import grails.rest.*
import grails.transaction.Transactional
import groovy.sql.*

import javax.persistence.EntityManager
import javax.persistence.PersistenceContext
import javax.sql.*

import com.easybpms.bd.Session
import com.easybpms.bd.dao.CRUDActivity

class TarefaController {

	@PersistenceContext(unitName="com.easybpms.persistence.jpa")
	EntityManager emanager;

	static responseFormats=["json", "xml"]

	TarefaController(){
		//System.out.println("criei o controller TarefaController")
	}

	@Transactional(readOnly=false)
	def index() {
		//System.out.println("entrei no index")
		//Exemplo de passagem de parâmetro por GET na URL.
		System.out.println("parametro: " + params.roger )
		
		Session.setEntityManager(emanager)
		
		//aqui será alterado para a função com restrições de busca pelo modelo de domínio (Ocorrencia), id do usuário e id do tenancy
		respond CRUDActivity.readAll()
		return
	}

}
