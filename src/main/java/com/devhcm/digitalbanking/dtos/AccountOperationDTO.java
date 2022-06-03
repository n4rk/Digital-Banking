package com.devhcm.digitalbanking.dtos;

import lombok.Data;
import com.devhcm.digitalbanking.enums.OperationType;

import java.util.Date;

@Data

public class AccountOperationDTO {

    private Long id;
    private Date operationDate;
    private double amount;
    private OperationType type;
    private String description;

}