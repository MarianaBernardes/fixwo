package com.easybpms.integration.grails.controller

import java.util.ArrayList;
import java.util.Observer

import com.easybpms.codegen.AbstractContext

import grails.web.http.HttpHeaders
import grails.artefact.Artefact;
import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.util.GrailsNameUtils;;
import static org.springframework.http.HttpStatus.*

/**
 * Base class that can be extended to get the basic observable CRUD operations needed for a
 * process aware RESTful API.
 *
 * @author André Saúde
 * @since 3.1.10
 */
@Artefact("Controller")
@Transactional(readOnly = true)
class ObservableRestfulController<T> extends RestfulController {
	
	def bpmsSession
	
	static AbstractContext context
	
	Observable observable = new Observable()
	
	ObservableRestfulController(Class<T> resource) {
		this(resource, false)
	}

	ObservableRestfulController(Class<T> resource, boolean readOnly) {
		super(resource,readOnly)
	}

	/**
	 * Saves a resource. Adaption of RestfulController save method.
	 */
	@Transactional
	def save() {
		if (context == null) {
			context = AbstractContext.getContext()

			ArrayList<Observer> observers =
					(ArrayList<Observer>)context.getObservers("CRUD" + this.resource.getSimpleName());
			for(Observer observer : observers) {
				observable.addObserver(observer)
			}
			context.setBpmsSession(bpmsSession)
		}
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

	def notifyObservers(arg) {
        observable.setChanged();
		observable.notifyObservers(arg);
	}
}