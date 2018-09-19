package com.utm.prj.model.friends;

import com.utm.prj.model.responses.PageResponse;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper=false)
public class FriendsResponse extends PageResponse {

    @ApiModelProperty(required = true, value = "")
    private List<Friends> items;

}
