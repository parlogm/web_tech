package com.utm.prj.model.users;

import com.utm.prj.model.responses.OperationResponse;

import java.util.Objects;

public class UserResponse extends OperationResponse {
    private User data = new User();

    public User getData() {
        return data;
    }

    public void setData(User data) {
        this.data = data;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        UserResponse that = (UserResponse) o;
        return Objects.equals(data, that.data);
    }

    public int hashCode() {
        return Objects.hash(super.hashCode(), data);
    }
}
