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
		Grupo grupo = new Grupo();
		grupo.setName("ResponsavelArea");
		
		try {
			CRUDUserGroup.create(grupo);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// criação de usuários
		Usuario usu = new Usuario();
		usu.setId("5");
		usu.setName("Pedro");
		usu.setTenancy("1"); //id do cliente 1=fixo
		
		List<String> li = new ArrayList();
		li.add("ResponsavelArea");
		
		usu.setUserGroupNames(li);
		
		try {
			CRUDUser.create(usu);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
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
