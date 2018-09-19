package com.utm.prj.model.session;

import com.utm.prj.model.responses.OperationResponse;
import io.swagger.annotations.ApiModelProperty;

import java.util.Objects;

public class SessionResponse extends OperationResponse {
    @ApiModelProperty(required = true, value = "")
    private SessionItem item;

    public SessionItem getItem() {
        return item;
    }

    public void setItem(SessionItem item) {
        this.item = item;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SessionResponse that = (SessionResponse) o;
        return Objects.equals(item, that.item);
    }

    @Override
    public int hashCode() {

        return Objects.hash(item);
    }
}
