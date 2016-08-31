

import grails.transaction.Transactional

import com.easybpms.db.Session
import com.easybpms.codegen.AbstractContext

class BootStrap {

	def bpmsSession
	
    def init = { servletContext ->
		
		initEasyBpms()
    }
    def destroy = {
    }
	
	@Transactional
	def initEasyBpms() {
		Session.startSession()
		AbstractContext.getContext().setBpmsSession(bpmsSession)
	}
}
