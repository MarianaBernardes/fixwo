package com.sample;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.jbpm.test.JBPMHelper;
import org.kie.api.KieBase;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.manager.RuntimeEngine;
import org.kie.api.runtime.manager.RuntimeEnvironmentBuilder;
import org.kie.api.runtime.manager.RuntimeManager;
import org.kie.api.runtime.manager.RuntimeManagerFactory;
import org.kie.api.task.TaskService;
import org.kie.api.task.model.TaskSummary;

import bitronix.tm.resource.jdbc.PoolingDataSource;

public class ProcessMain {

	public static void main(String[] args) {
		// Inicia motor do jBPM
		KieServices ks = KieServices.Factory.get();
		KieContainer kContainer = ks.getKieClasspathContainer();
		KieBase kbase = kContainer.getKieBase("kbase");

		// Inicia o gerenciador em tempo de execução do motor do jBPM
		RuntimeManager manager = createRuntimeManager(kbase);
		RuntimeEngine engine = manager.getRuntimeEngine(null);
		KieSession ksession = engine.getKieSession();
		TaskService taskService = engine.getTaskService(); // objeto a ser manipulado a cada tarefa do modelo

		ksession.startProcess("com.sample.bpmn.hello");

		// let john execute Task 1
		List<TaskSummary> list = taskService.getTasksAssignedAsPotentialOwner("john", "en-UK");
		TaskSummary task = list.get(0);
		System.out.println("John is executing task " + task.getName());
		taskService.start(task.getId(), "john");
		taskService.complete(task.getId(), "john", null); //nul é a variável de saída

		// let mary execute Task 2
		list = taskService.getTasksAssignedAsPotentialOwner("mary", "en-UK");
		task = list.get(0);
		System.out.println("Mary is executing task " + task.getName());
		taskService.start(task.getId(), "mary");
		taskService.complete(task.getId(), "mary", null);

		manager.disposeRuntimeEngine(engine);	// libera o motor de o ki 
		System.exit(0);
	}

	private static RuntimeManager createRuntimeManager(KieBase kbase) {
		// JBPMHelper.startH2Server();
		// JBPMHelper.setupDataSource();

		PoolingDataSource ds = new PoolingDataSource();

		ds.setUniqueName("jdbc/jbpm-ds");
		ds.setClassName("bitronix.tm.resource.jdbc.lrc.LrcXADataSource");
		ds.setMaxPoolSize(3);
		ds.setAllowLocalTransactions(true);
		ds.getDriverProperties().put("user", "postgres");
		ds.getDriverProperties().put("password", "root");
		ds.getDriverProperties().put("url", "jdbc:postgresql://localhost:5432/jBPM");
		ds.getDriverProperties().put("driverClassName", "org.postgresql.Driver");
		ds.init();

		// retorna um objeto Singleton único do gerenciador de transações
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("org.jbpm.persistencedojean.jpa");
		RuntimeEnvironmentBuilder builder = RuntimeEnvironmentBuilder.Factory.get().newDefaultBuilder()
				.entityManagerFactory(emf).knowledgeBase(kbase);
		return RuntimeManagerFactory.Factory.get().newSingletonRuntimeManager(builder.get(), "com.sample:example:1.0");
	}

}