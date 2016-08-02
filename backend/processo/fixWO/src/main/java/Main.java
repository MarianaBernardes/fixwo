import java.util.ArrayList;
import java.util.List;

import com.easybpms.bd.CRUDException;
import com.easybpms.bd.ScriptBd;
import com.easybpms.bd.dao.CRUDUser;
import com.fixo.DAO.CRUDGrupo;
import com.fixo.DAO.CRUDOcorrencia;
import com.fixo.DAO.CRUDUsuario;
import com.fixwo.domain.Ocorrencia;
import com.fixwo.domain.Usuario;

public class Main {

	public static void main(String[] args) {
		
		// Criação de grupos
		CRUDGrupo grupo1 = new CRUDGrupo("Triador");
		CRUDGrupo grupo2 = new CRUDGrupo("Usuario");
		CRUDGrupo grupo3 = new CRUDGrupo("ResponsavelArea");
		CRUDGrupo grupo4 = new CRUDGrupo("Funcionario");
		
		// Criação de usuários
		CRUDUsuario usu1 = new CRUDUsuario("1", "Jean", "1", "Triador");
		CRUDUsuario usu2 = new CRUDUsuario("2", "Roger", "1", "ResponsavelArea");
		CRUDUsuario usu3 = new CRUDUsuario("3", "Pedro", "1", "Usuario");
		CRUDUsuario usu4 = new CRUDUsuario("4", "Mariana", "1", "Funcionario");
	
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
