package com.fixwo.domain;

import com.easybpms.domain.IDomainEntity;

public class Ocorrencia implements IDomainEntity {

	private int id;
	private String tenancy = "";
	private String status = "";
	private String feedback = "";
	private String avaliacao = "";
	private String replica = "";

	@Override
	public int getId() {
		// TODO Auto-generated method stub
		return this.id;
	}

	@Override
	public String getTenancy() {
		// TODO Auto-generated method stub
		return this.tenancy;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setTenancy(String tenancy) {
		this.tenancy = tenancy;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(String avaliacao) {
		this.avaliacao = avaliacao;
	}

	public String getReplica() {
		return replica;
	}

	public void setReplica(String replica) {
		this.replica = replica;
	}

}
