package com.utm.prj.model.data;

import java.math.BigDecimal;

public class SingleSerise  {
    private String name;
    private BigDecimal value;

    public SingleSerise( String name, BigDecimal value){
        this.name  = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}
