package com.fixwo.process

import grails.dev.commands.*
import grails.rest.*
import grails.transaction.Transactional
import groovy.sql.*

import javax.persistence.EntityManager
import javax.persistence.PersistenceContext
import javax.sql.*

import com.easybpms.db.Session
import com.easybpms.db.dao.CRUDActivityInstance

class TarefaController {

	@PersistenceContext(unitName="com.easybpms.persistence.jpa")
	EntityManager emanager;

	static responseFormats=["json", "xml"]

	TarefaController(){
		//System.out.println("criei o controller TarefaController")
	}

	@Transactional(readOnly=false)
	def index() {
		//Exemplo de passagem de parâmetro por GET na URL: http://localhost:8080/fixwo/tarefa?tenancy=1&usuario=1
		System.out.println("parametros: tenancy ==> " + params.tenancy + ", usuario ==> " + params.usuario)

		Session.setEntityManager(emanager)

		//aqui será alterado para a função com restrições de busca pelo modelo de domínio (Ocorrencia), id do usuário e id do tenancy
		//params = tenancy , usuario
		try {
			respond CRUDActivityInstance.readActivityInstances(params.tenancy, params.usuario)
		} catch (Exception e) {
			render "Nenhuma atividade encontrada!"
		}
		return
	}
}
