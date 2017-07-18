

import com.easybpms.codegen.AbstractContext
import com.easybpms.db.Session
import com.fixwo.domain.Cliente
import com.fixwo.domain.Grupo
import com.fixwo.domain.Usuario
import com.fixwo.auth.SpringUserSpringRole

import grails.transaction.Transactional

class BootStrap {

	def bpmsSession
	
    def init = { servletContext ->
		
		initEasyBpms()
		
		new Cliente(nome:'Fixwo').save() 
		
		def adminGroup = new Grupo(name:'Administrador', authority: 'ROLE_ADMIN').save()
		new Grupo(name:'Solicitante', authority: 'ROLE_SOLICITANTE').save()
		new Grupo(name:'Triador', authority: 'ROLE_TRIADOR').save()
		new Grupo(name:'Responsavel Setor', authority: 'ROLE_RESPONSAVEL_SETOR').save()
		
		def adminUser = new Usuario(
			nome:'admin',
			email:'admin@admin.com',
			cliente:1,
			username:'admin',
			password:'admin',
			accountExpired:false,
			accountLocked:false,
			passwordExpired:false
		).save()
		
		new SpringUserSpringRole(springUser:adminUser, springRole:adminGroup).save()
		
		assert Grupo.count() == 4
		assert Usuario.count() == 1
		assert SpringUserSpringRole.count() == 1
    }
    def destroy = {
    }
	
	@Transactional
	def initEasyBpms() {
		Session.startSession()
		AbstractContext.getContext().setBpmsSession(bpmsSession)
	}
}
