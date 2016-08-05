package com.easybpms.codegen;

import java.util.ArrayList;
import java.util.List;
import java.util.Observer;
import java.util.Map;
import java.util.HashMap;

import com.easybpms.domain.Process;
import com.easybpms.domain.*;
import com.easybpms.bd.dao.*;
import com.easybpms.event.StartProcessObserver;
import com.easybpms.event.TaskExecutedObserver;
import com.easybpms.bpms.AbstractBpmsInterface;
import com.bpms.jbpm .ConcreteBpmsInterface;

public class Context extends AbstractContext {

	private Map<String, List<Observer>> mapObservers;

	public Context() {

		Process process;
		Property property;
		UserGroup userGroup;
		UserGroup userGroupAux;
		Activity activity;
		Parameter parameter;

		Process aux;
		boolean existProcess;

		AbstractBpmsInterface bpms = new ConcreteBpmsInterface();
		List<String> processPaths = new ArrayList<String>();


		this.mapObservers = new HashMap<String, List<Observer>>();
		ArrayList<Observer> listObservers = new ArrayList<Observer>();


		/*
		 * Cria e mapeia observador de inicio de processo
		 */ 
		StartProcessObserver spo = new StartProcessObserver("com_fixwo_domain_Ocorrencia");
		listObservers.add(spo);
		addMapping("CRUDOcorrencia", listObservers);


		/*
		 * Cria e mapeia observadores de tarefas
		 */ 
		TaskExecutedObserver teo;

		listObservers = new ArrayList<Observer>();
		teo = new TaskExecutedObserver("UserTask_4");
		listObservers.add(teo); 
		addMapping("CRUDOcorrencia", listObservers);           
		listObservers = new ArrayList<Observer>();
		teo = new TaskExecutedObserver("UserTask_3");
		listObservers.add(teo); 
		addMapping("CRUDOcorrencia", listObservers);           
		listObservers = new ArrayList<Observer>();
		teo = new TaskExecutedObserver("UserTask_6");
		listObservers.add(teo); 
		addMapping("CRUDOcorrencia", listObservers);           
		listObservers = new ArrayList<Observer>();
		teo = new TaskExecutedObserver("UserTask_5");
		listObservers.add(teo); 
		addMapping("CRUDOcorrencia", listObservers);           



		/*
		 * Criar definicao do processo
		 */

		//Processo fixwo
		process = new Process();
		process.setName("fixwo");
		process.setIdBpms("com_fixwo_domain_Ocorrencia");
		processPaths.add("C:\\Users\\Andre Saude\\Documents\\GitLocal\\fixwo\\backend\\processo\\fixWO\\src\\main\\resources\\BPMN_Model\\fixwo.bpmn2");

		//Variaveis do Processo fixwo  
		property = new Property();
		property.setName("com_fixwo_domain_Ocorrencia_id");
		process.addVariable(property);	
		property = new Property();
		property.setName("com_fixwo_domain_Ocorrencia_tenancy");
		process.addVariable(property);	
		property = new Property();
		property.setName("com_fixwo_domain_Ocorrencia_status");
		process.addVariable(property);	
		property = new Property();
		property.setName("com_fixwo_domain_Ocorrencia_feedback");
		process.addVariable(property);	
		property = new Property();
		property.setName("com_fixwo_domain_Ocorrencia_avaliacao");
		process.addVariable(property);	
		property = new Property();
		property.setName("com_fixwo_domain_Ocorrencia_replica");
		process.addVariable(property);	

		//Atividades de Usuario do Processo fixwo
		activity = new Activity();
		activity.setName("Feedback ao solicitante");
		activity.setIdBpms("UserTask_4");

		//Parametros de Entrada da Atividade Feedback ao solicitante   
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_id");
		parameter.setType("input");
		activity.addParameter(parameter);	
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_tenancy");
		parameter.setType("input");
		activity.addParameter(parameter);	

		//Parametros de Saida da Atividade Feedback ao solicitante
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_feedback");
		parameter.setType("output");
		activity.addParameter(parameter);

		//Grupos de Usuario da Atividade Feedback ao solicitante
		userGroup = new UserGroup();
		userGroup.setName("ResponsavelArea");
		userGroupAux = new UserGroup();
		try {
			userGroupAux = (UserGroup) CRUDUserGroup.read(userGroup);
			activity.setUserGroup(userGroupAux);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (userGroupAux==null){
			try {
				CRUDUserGroup.create(userGroup);
				activity.setUserGroup(userGroup);
			}catch (Exception e) {
				e.printStackTrace();
			}
		}

		process.addActivity(activity);

		activity = new Activity();
		activity.setName("Classificar e encaminhar WO");
		activity.setIdBpms("UserTask_3");

		//Parametros de Entrada da Atividade Classificar e encaminhar WO   
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_id");
		parameter.setType("input");
		activity.addParameter(parameter);	
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_tenancy");
		parameter.setType("input");
		activity.addParameter(parameter);	

		//Parametros de Saida da Atividade Classificar e encaminhar WO
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_status");
		parameter.setType("output");
		activity.addParameter(parameter);

		//Grupos de Usuario da Atividade Classificar e encaminhar WO
		userGroup = new UserGroup();
		userGroup.setName("Triador");
		userGroupAux = new UserGroup();
		try {
			userGroupAux = (UserGroup) CRUDUserGroup.read(userGroup);
			activity.setUserGroup(userGroupAux);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (userGroupAux==null){
			try {
				CRUDUserGroup.create(userGroup);
				activity.setUserGroup(userGroup);
			}catch (Exception e) {
				e.printStackTrace();
			}
		}

		process.addActivity(activity);

		activity = new Activity();
		activity.setName("Avaliar solu��o");
		activity.setIdBpms("UserTask_6");

		//Parametros de Entrada da Atividade Avaliar solu��o   
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_id");
		parameter.setType("input");
		activity.addParameter(parameter);	
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_tenancy");
		parameter.setType("input");
		activity.addParameter(parameter);	

		//Parametros de Saida da Atividade Avaliar solu��o
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_avaliacao");
		parameter.setType("output");
		activity.addParameter(parameter);

		//Grupos de Usuario da Atividade Avaliar solu��o
		userGroup = new UserGroup();
		userGroup.setName("Usuario");
		userGroupAux = new UserGroup();
		try {
			userGroupAux = (UserGroup) CRUDUserGroup.read(userGroup);
			activity.setUserGroup(userGroupAux);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (userGroupAux==null){
			try {
				CRUDUserGroup.create(userGroup);
				activity.setUserGroup(userGroup);
			}catch (Exception e) {
				e.printStackTrace();
			}
		}

		process.addActivity(activity);

		activity = new Activity();
		activity.setName("Envia r�plica ao respons�vel");
		activity.setIdBpms("UserTask_5");

		//Parametros de Entrada da Atividade Envia r�plica ao respons�vel   
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_id");
		parameter.setType("input");
		activity.addParameter(parameter);	
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_tenancy");
		parameter.setType("input");
		activity.addParameter(parameter);	

		//Parametros de Saida da Atividade Envia r�plica ao respons�vel
		parameter = new Parameter();
		parameter.setName("easybpms_com_fixwo_domain_Ocorrencia_replica");
		parameter.setType("output");
		activity.addParameter(parameter);

		//Grupos de Usuario da Atividade Envia r�plica ao respons�vel
		userGroup = new UserGroup();
		userGroup.setName("Usuario");
		userGroupAux = new UserGroup();
		try {
			userGroupAux = (UserGroup) CRUDUserGroup.read(userGroup);
			activity.setUserGroup(userGroupAux);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (userGroupAux==null){
			try {
				CRUDUserGroup.create(userGroup);
				activity.setUserGroup(userGroup);
			}catch (Exception e) {
				e.printStackTrace();
			}
		}

		process.addActivity(activity);


		aux = new Process();
		aux.setIdBpms(process.getIdBpms());

		existProcess = true;
		try {
			aux = (Process) CRUDEntity.read(aux);
		} catch (Exception e) {
			existProcess = false;
		}

		if(!existProcess){
			try {
				CRUDEntity.create(process);
			}catch (Exception e) {
				e.printStackTrace();
			}
		}

		//Fim do processo fixwo

		bpms.startBPMS(processPaths);

	}

	private void addMapping(String key, List<Observer> observers) {
		if(this.mapObservers.containsKey(key)){
			this.mapObservers.get(key).addAll(observers);
		}else{
			this.mapObservers.put(key, observers);
		}
	}
	public List<Observer> getObservers(String nameClasse){
		return this.mapObservers.get(nameClasse);
	}
}
