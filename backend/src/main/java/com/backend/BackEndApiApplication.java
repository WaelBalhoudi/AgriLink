package com.backend;

import com.backend.usersTables.user.Role;
import com.backend.usersTables.user.User;
import com.backend.usersTables.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableScheduling
@AllArgsConstructor
public class BackEndApiApplication {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;



	public static void main(String[] args) {
		SpringApplication.run(BackEndApiApplication.class, args);
	}
	@Bean
	public CommandLineRunner runner(){

		 return  args -> {
			  boolean adminExists=userRepository.existsByRole(Role.ADMIN);
			 if (!adminExists) {
				 User admin= User.builder()
						 .email("waelbalhoudi@gmail.com")
						 .password(passwordEncoder.encode("admin@123"))
						 .fullName("admin")
						 .enabled(true)
						 .role(Role.ADMIN)
						 .createdDate(LocalDate.now())
						 .createdBy("developer")

						 .build();
				 userRepository.save(admin);
			 }
		 };
	}
}
