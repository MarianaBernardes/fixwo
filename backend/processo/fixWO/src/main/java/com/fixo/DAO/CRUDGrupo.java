package com.fixo.DAO;

import com.easybpms.bd.CRUDException;
import com.easybpms.bd.dao.CRUDUserGroup;
import com.fixwo.domain.Grupo;

public class CRUDGrupo {

	public CRUDGrupo(String nome) {
		Grupo gr = new Grupo();
		gr.setName(nome);
		
		try {
			CRUDUserGroup.create(gr);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
