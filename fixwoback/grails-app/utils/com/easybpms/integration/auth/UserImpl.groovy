package com.easybpms.integration.auth

import com.easybpms.domain.IUser
import com.fixwo.domain.Grupo
import com.fixwo.domain.Usuario

class UserImpl implements IUser {

	Usuario usuario

	public UserImpl(Usuario usuario) {
		this.usuario = usuario;
	}

	@Override
	public String getIdApp() {
		return usuario.id
	}

	@Override
	public String getName() {
		return usuario.nome;
	}

	@Override
	public String getTenancy() {
		return usuario.cliente.id;
	}

	@Override
	public List<String> getUserGroupNames() {
		List grupos = []
		for (Grupo gr : usuario.grupos) {
			grupos.add(gr.name)
		}
		return grupos
	}

}
