package com.fixwo.process

import java.util.List;

import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.manager.RuntimeManager
import org.kie.api.runtime.manager.RuntimeManagerFactory
import org.kie.api.runtime.process.ProcessInstance;
import org.kie.api.task.TaskService;
import org.kie.api.task.model.TaskSummary;

class JBPMHelloController {

	// inject jbpmBean from Spring configuration
	def bpmsSession
	
	// count hello executions
	static execution = 1
	
    def index() {
		String feedback = beanTestProcess()
		render feedback
	}
	
	def beanTestProcess() {
		String feedback = "HELLO Grails 3 + jBPM! <p> Process test (execution=" + execution++ + ":\n\n"

		KieSession ksession = bpmsSession.getKieSession()
		TaskService taskService = bpmsSession.getTaskService()
		
		ProcessInstance processInstance = ksession.startProcess("com.sample.bpmn.hello")

		// let john execute Task 1
		List list = taskService.getTasksAssignedAsPotentialOwner("john", "en-UK")
		TaskSummary task = list[0]
		feedback += "John is executing task " + task.getName() + "\n"
		taskService.start(task.getId(), "john")
		taskService.complete(task.getId(), "john", null)

		// let mary execute Task 2
		list = taskService.getTasksAssignedAsPotentialOwner("mary", "en-UK")
		task = list[0]
		feedback += "Mary is executing task " + task.getName() + "\n"
		taskService.start(task.getId(), "mary")
		taskService.complete(task.getId(), "mary", null)

		return feedback;
	}
}
