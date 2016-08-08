package com.easybpms.integration.grails.controller

import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.web.http.HttpHeaders
import static org.springframework.http.HttpStatus.*

import com.easybpms.bd.CRUDException
import com.easybpms.bd.dao.CRUDUser
import com.easybpms.integration.auth.UserImpl

/**
 * Base class that can be extended to get the basic observable CRUD operations needed for a
 * process aware RESTful API.
 *
 * @author Andr� Sa�de
 * @since 3.1.10
 */
class EasyBPMSUserRestfulController<T> extends RestfulController {
	
	EasyBPMSUserRestfulController(Class<T> resource) {
		this(resource, false)
	}

	EasyBPMSUserRestfulController(Class<T> resource, boolean readOnly) {
		super(resource,readOnly)
	}

	/**
	 * Saves a resource. Adaption of RestfulController save method.
	 */
	@Transactional
	def save() {
		if(handleReadOnly()) {
			return
		}
		def instance = createResource()

		instance.validate()
		if (instance.hasErrors()) {
			transactionStatus.setRollbackOnly()
			respond instance.errors, view:'create' // STATUS CODE 422
			return
		}

		saveResource instance
		def userImpl = new UserImpl(instance)
		
		try {
			CRUDUser.create(userImpl);
		} catch (CRUDException e) {
			e.printStackTrace();
		}

		request.withFormat {
			form multipartForm {
				flash.message = message(code: 'default.created.message', args: [message(code: "${resourceName}.label".toString(), default: resourceClassName), instance.id])
				redirect instance
			}
			'*' {
				response.addHeader(HttpHeaders.LOCATION,
						grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
											namespace: hasProperty('namespace') ? this.namespace : null ))
				respond instance, [status: CREATED, view:'show']
			}
		}
	}
}