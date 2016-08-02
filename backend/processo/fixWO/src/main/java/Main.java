import java.util.ArrayList;
import java.util.List;

import com.easybpms.bd.CRUDException;
import com.easybpms.bd.ScriptBd;
import com.easybpms.bd.dao.CRUDUser;
import com.easybpms.bd.dao.CRUDUserGroup;
import com.fixo.DAO.CRUDOcorrencia;
import com.fixwo.domain.Grupo;
import com.fixwo.domain.Ocorrencia;
import com.fixwo.domain.Usuario;

public class Main {

	public static void main(String[] args) {
		
		/*
		 * Lembrar de criar outros grupos
		 */
		/*Grupo grupo = new Grupo();
		grupo.setName("Triador");
		
		try {
			CRUDUserGroup.create(grupo);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Grupo grupo2 = new Grupo();
		grupo2.setName("Usuario");
		
		try {
			CRUDUserGroup.create(grupo2);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Grupo grupo3 = new Grupo();
		grupo3.setName("ResponsavelArea");
		
		try {
			CRUDUserGroup.create(grupo3);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// criação de usuários
		Usuario usu = new Usuario();
		usu.setId("1");
		usu.setName("Jean");
		usu.setTenancy("1"); //id do cliente 1=fixo
		
		List<String> li = new ArrayList();
		li.add("Triador");
		
		usu.setUserGroupNames(li);
		
		try {
			CRUDUser.create(usu);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Usuario usu2 = new Usuario();
		usu2.setId("2");
		usu2.setName("Roger");
		usu2.setTenancy("1"); //id do cliente 1=fixo
		
		List<String> li2 = new ArrayList();
		li2.add("ResponsavelArea");
		
		usu2.setUserGroupNames(li2);
		
		try {
			CRUDUser.create(usu2);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		Usuario usu3 = new Usuario();
		usu3.setId("3");
		usu3.setName("Pedro");
		usu3.setTenancy("1"); //id do cliente 1=fixo
		
		List<String> li3 = new ArrayList();
		li3.add("Usuario");
		
		usu3.setUserGroupNames(li3);
		
		try {
			CRUDUser.create(usu3);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	
		// Cadastro de ocorrência
		Ocorrencia o = new Ocorrencia();
		o.setId(1);
		o.setTenancy("1"); //id do cliente
		CRUDOcorrencia oDAO = new CRUDOcorrencia();
		oDAO.notifyObservers(o);
		
		// PARA EXCLUIR TESTES REALIZADOS DO BANCO
		/*List<Integer> l = new ArrayList<Integer>();
		l.add(1);
		//ScriptBd.deleteProcesses(l); 
		ScriptBd.deleteProcessesInstances(l);*/
	}

}
