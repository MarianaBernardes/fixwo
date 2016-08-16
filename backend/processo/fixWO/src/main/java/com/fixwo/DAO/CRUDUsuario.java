package com.fixwo.DAO;

import java.util.ArrayList;
import java.util.List;

import com.easybpms.bd.CRUDException;
import com.easybpms.bd.dao.CRUDUser;
import com.fixwo.domain.Usuario;

public class CRUDUsuario {

	public CRUDUsuario(String id, String nome, String tenancy, String grupo) {
		Usuario usu = new Usuario();
		usu.setId(id);
		usu.setName(nome);
		usu.setTenancy(tenancy);

		List<String> li = new ArrayList<String>();
		li.add(grupo);

		usu.setUserGroupNames(li);

		try {
			CRUDUser.create(usu);
		} catch (CRUDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
