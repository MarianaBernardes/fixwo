package com.jbpm.bd;

import com.bpms.jbpm.AbstractConnection;

import bitronix.tm.resource.jdbc.PoolingDataSource;

public class Connection extends AbstractConnection {

	public Connection() {
		//MYSQL
		PoolingDataSource ds = new PoolingDataSource();
		ds.setUniqueName("jdbc/jbpm-ds");
		ds.setClassName("bitronix.tm.resource.jdbc.lrc.LrcXADataSource");
		ds.setMaxPoolSize(5); 
		ds.setAllowLocalTransactions(true);
		ds.getDriverProperties().put("user", "root");
		ds.getDriverProperties().put("password", "root");
		ds.getDriverProperties().put("url", "jdbc:mysql://localhost/jbpm");
		ds.getDriverProperties().put("driverClassName", "com.mysql.jdbc.Driver");
		ds.init();
		
		//POSTGRES
		/*PoolingDataSource ds = new PoolingDataSource();
		ds.setUniqueName("jdbc/jbpm-ds");
		ds.setClassName("bitronix.tm.resource.jdbc.lrc.LrcXADataSource");
		ds.setMaxPoolSize(5);
		ds.setAllowLocalTransactions(true);
		ds.getDriverProperties().put("user", "postgres");
		ds.getDriverProperties().put("password", "root");
		ds.getDriverProperties().put("url", "jdbc:postgresql://localhost:5432/jbpm");
		ds.getDriverProperties().put("driverClassName", "org.postgresql.Driver");
		ds.init();*/

	}

}
