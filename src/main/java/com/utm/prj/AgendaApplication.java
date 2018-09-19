package com.utm.prj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.transaction.annotation.*;

@SpringBootApplication
@EnableJpaRepositories(basePackages ={ "com.utm.prj.repo"})
@EntityScan(basePackages ={ "com.utm.prj.model"})
@EnableTransactionManagement
public class AgendaApplication {

	public static void main(String[] args) throws Exception {

		new SpringApplication(AgendaApplication.class).run(args);

	}

}