package com.devhcm.digitalbanking.web;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.devhcm.digitalbanking.dtos.AccountHistoryDTO;
import com.devhcm.digitalbanking.dtos.AccountOperationDTO;
import com.devhcm.digitalbanking.dtos.BankAccountDTO;
import com.devhcm.digitalbanking.exceptions.BankAccountNotFoundException;
import com.devhcm.digitalbanking.services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/v1")
@CrossOrigin("*")
@SecurityRequirement(name = "digitalBankApi")
public class BankAccountRestController {
    private BankAccountService bankAccountService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/accounts/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/account/{customerId}")
    public List<BankAccountDTO> getBankAccountByCustomer(@PathVariable Long customerId) {
        return bankAccountService.getBankAccountByCustomerId(customerId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/accounts")
    public List<BankAccountDTO> getBankAccount() {
        return bankAccountService.bankAccountList();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/accounts/{accountId}/operations")
    public List<AccountOperationDTO> getHistory(@PathVariable String accountId) {
        return bankAccountService.accountHistory(accountId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/accounts/{accountId}/pageOperations")
    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5")int size) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(accountId,page,size);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/accountInfo/{accountId}")
    public BankAccountDTO getAccountInfo(@PathVariable String accountId) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }

}