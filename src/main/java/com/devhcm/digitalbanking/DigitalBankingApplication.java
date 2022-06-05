package com.devhcm.digitalbanking;

import com.devhcm.digitalbanking.entities.AccountOperation;
import com.devhcm.digitalbanking.entities.CurrentAccount;
import com.devhcm.digitalbanking.entities.Customer;
import com.devhcm.digitalbanking.entities.SavingAccount;
import com.devhcm.digitalbanking.enums.AccountStatus;
import com.devhcm.digitalbanking.enums.OperationType;
import com.devhcm.digitalbanking.repositories.AccountOperationRepository;
import com.devhcm.digitalbanking.repositories.BankAccountRepository;
import com.devhcm.digitalbanking.repositories.CustomerRepository;
import com.devhcm.digitalbanking.security.entities.AppRole;
import com.devhcm.digitalbanking.security.entities.AppUser;
import com.devhcm.digitalbanking.security.service.SecurityService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class DigitalBankingApplication {

    public static void main(String[] args) {
        SpringApplication.run(DigitalBankingApplication.class, args);
    }

    //@Bean
    CommandLineRunner start(CustomerRepository customerRepository,
                            BankAccountRepository bankAccountRepository,
                            AccountOperationRepository accountOperationRepository) {
        return args -> {
            Stream.of("Youssfi", "Rebbani", "Daaif").forEach(name -> {
                Customer customer = new Customer();
                customer.setName(name);
                customer.setEmail(name.toLowerCase() + "@gmail.com");
                customerRepository.save(customer);
            });
            customerRepository.findAll().forEach(c -> {
                CurrentAccount currentAccount = new CurrentAccount();
                currentAccount.setId(UUID.randomUUID().toString());
                currentAccount.setBalance(Math.random() * 8000);
                currentAccount.setCreatedAt(new Date());
                currentAccount.setAccountStatus(AccountStatus.CREATED);
                currentAccount.setCustomer(c);
                currentAccount.setOverDraft(5000);
                bankAccountRepository.save(currentAccount);

                SavingAccount savingAccount = new SavingAccount();
                savingAccount.setId(UUID.randomUUID().toString());
                savingAccount.setBalance(Math.random() * 50000);
                savingAccount.setCreatedAt(new Date());
                savingAccount.setAccountStatus(AccountStatus.CREATED);
                savingAccount.setCustomer(c);
                savingAccount.setInterestRate(3);
                bankAccountRepository.save(savingAccount);

            });

            bankAccountRepository.findAll().forEach(acc -> {
                for (int i = 0; i < 10; i++) {
                    AccountOperation accountOperation = new AccountOperation();
                    accountOperation.setOperationDate(new Date());
                    accountOperation.setAmount(Math.random() * 600);
                    accountOperation.setType(Math.random() > 0.5 ? OperationType.DEBIT : OperationType.CREDIT);
                    accountOperation.setBankAccount(acc);
                    accountOperationRepository.save(accountOperation);
                }
            });
        };
    }

    //@Bean
    CommandLineRunner users(SecurityService securityService) {
        return args -> {
            securityService.addNewRole(new AppRole(null, "USER"));
            securityService.addNewRole(new AppRole(null, "ADMIN"));

            securityService.addNewUser(new AppUser(null, "user", "test", new ArrayList<>()));
            securityService.addNewUser(new AppUser(null, "admin", "test", new ArrayList<>()));

            securityService.addRoleToUser("user", "USER");
            securityService.addRoleToUser("admin", "USER");
            securityService.addRoleToUser("admin", "ADMIN");

        };
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
