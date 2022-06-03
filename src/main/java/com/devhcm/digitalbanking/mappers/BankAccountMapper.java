package com.devhcm.digitalbanking.mappers;

import com.devhcm.digitalbanking.dtos.AccountOperationDTO;
import com.devhcm.digitalbanking.dtos.CurrentBankAccountDTO;
import com.devhcm.digitalbanking.dtos.CustomerDTO;
import com.devhcm.digitalbanking.dtos.SavingBankAccountDTO;
import com.devhcm.digitalbanking.entities.AccountOperation;
import com.devhcm.digitalbanking.entities.CurrentAccount;
import com.devhcm.digitalbanking.entities.Customer;
import com.devhcm.digitalbanking.entities.SavingAccount;

public interface BankAccountMapper {
    CustomerDTO fromCustomer(Customer customer);

    SavingBankAccountDTO fromSavingBankAccount(SavingAccount savingAccount);

    SavingAccount fromSavingBankAccountDTO(SavingBankAccountDTO savingBankAccountDTO);

    CurrentBankAccountDTO fromCurrentBankAccount(CurrentAccount currentAccount);

    CurrentAccount fromCurrentBankAccountDTO(CurrentBankAccountDTO currentBankAccountDTO);

    Customer fromCustomerDTO(CustomerDTO customerDTO);

    AccountOperationDTO fromAccountOperation(AccountOperation accountOperation);

    AccountOperation fromAccountOperationDTO(AccountOperationDTO accountOperationDTO);
}
