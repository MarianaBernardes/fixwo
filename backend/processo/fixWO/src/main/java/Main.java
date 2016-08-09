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
		
		// Criacao de grupos
		CRUDGrupo grupo1 = new CRUDGrupo("Triador");
		CRUDGrupo grupo2 = new CRUDGrupo("Usuario");
		CRUDGrupo grupo3 = new CRUDGrupo("ResponsavelArea");
		CRUDGrupo grupo4 = new CRUDGrupo("Funcionario");
		
		// Criação de usuarios
		CRUDUsuario usu1 = new CRUDUsuario("1", "Jean", "1", "Triador");
		CRUDUsuario usu2 = new CRUDUsuario("2", "Roger", "1", "ResponsavelArea");
		CRUDUsuario usu3 = new CRUDUsuario("3", "Pedro", "1", "Usuario");
		CRUDUsuario usu4 = new CRUDUsuario("4", "Mariana", "1", "Funcionario");
	
		// Cadastro de ocorrencia
		Ocorrencia o = new Ocorrencia();
		o.setId(1);
		o.setTenancy("1"); //id do cliente
		
		//inicio do processo------------------------
		CRUDOcorrencia oDAO = new CRUDOcorrencia();
		oDAO.notifyObservers(o);
		//classificar e encaminhar------------------
		o.setStatus("encaminhado");
		oDAO.notifyObservers(o);
		//feedaback ao solicitante------------------
		o.setFeedback("problema resolvido!");
		oDAO.notifyObservers(o);
		//avaliar solucao---------------------------
		o.setAvaliacao(true);
		if (o.getAvaliacao()) {
			oDAO.notifyObservers(o);
		} else {
			oDAO.notifyObservers(o); //Avaliar solucao
			o.setReplica("nao gostei da solucao :/");
		}
		
		// PARA EXCLUIR TESTES REALIZADOS DO BANCO
		/*List<Integer> l = new ArrayList<Integer>();
		l.add(1);
		//ScriptBd.deleteProcesses(l); 
		ScriptBd.deleteProcessesInstances(l);*/
	}

}
