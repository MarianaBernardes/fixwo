package com.easybpms.integration.grails.controller

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.web.http.HttpHeaders

import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

import com.easybpms.db.Session
import com.easybpms.codegen.AbstractContext

/**
 * Base class that can be extended to get the basic observable CRUD operations needed for a
 * process aware RESTful API.
 *
 * @author Andre Saude
 * @since 3.1.10
 */
//@Artefact("Controller")
@Transactional(readOnly = false)
class ObservableRestfulController<T> extends RestfulController {
	
	def bpmsSession
	
	static AbstractContext context
//	
//	Observable observable = new Observable()
	@PersistenceContext(unitName="com.easybpms.persistence.jpa")
	EntityManager emanager;
	
	ObservableRestfulController(Class<T> resource) {
		this(resource, false)
	}

	ObservableRestfulController(Class<T> resource, boolean readOnly) {
		super(resource,readOnly)
	}

	/**
	 * Saves a resource. Adaption of RestfulController save method.
	 */
	@Transactional(readOnly=false)
	def save() {

		Session.setEntityManager(emanager)
		
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
		notifyObservers(instance)
		
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

	/**
	 * Updates a resource for the given id
	 * @param id
	 */
	@Transactional(readOnly=false)
	def update() {

		Session.setEntityManager(emanager)
		
		if(handleReadOnly()) {
			return
		}

		T instance = queryForResource(params.id)
		if (instance == null) {
			transactionStatus.setRollbackOnly()
			notFound()
			return
		}

		instance.properties = getObjectToBind()

		if (instance.hasErrors()) {
			transactionStatus.setRollbackOnly()
			respond instance.errors, view:'edit' // STATUS CODE 422
			return
		}

		updateResource instance
		notifyObservers(instance)
		
		request.withFormat {
			form multipartForm {
				flash.message = message(code: 'default.updated.message', args: [message(code: "${resourceName}.label".toString(), default: resourceClassName), instance.id])
				redirect instance
			}
			'*'{
				response.addHeader(HttpHeaders.LOCATION,
						grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
											namespace: hasProperty('namespace') ? this.namespace : null ))
				respond instance, [status: OK]
			}
		}
	}

	def notifyObservers(arg) {
		AbstractContext.getContext().notifyObservers(this.resource.getSimpleName(), arg)
	}
}