package com.utm.prj.api.friends;

import com.utm.prj.model.data.SingleSerise;
import com.utm.prj.model.friends.Friends;
import com.utm.prj.model.friends.FriendsResponse;
import com.utm.prj.model.responses.OperationResponse;
import com.utm.prj.model.responses.SingleDataSeriseResponse;
import com.utm.prj.repo.FriendsRepo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
@Api(tags = {"Friends"})
public class FriendsController {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired private FriendsRepo friendsRepo;

    @ApiOperation(value = "List of friends", response = FriendsResponse.class)
    @RequestMapping(value = "/friends", method = RequestMethod.GET)
    public FriendsResponse getFriendsByPage(
            @ApiParam(value = ""    )               @RequestParam(value = "page"  ,  defaultValue="0"   ,  required = false) Integer page,
            @ApiParam(value = "between 1 to 1000" ) @RequestParam(value = "size"  ,  defaultValue="20"  ,  required = false) Integer size,
            @RequestParam(value = "id"  , required = false) Integer id,
            @RequestParam(value = "age"   , required = false) String  age,
            Pageable pageable
    ) {
        FriendsResponse resp = new FriendsResponse();
        Friends qry = new Friends();
        if (id != null)  { qry.setId(id); }
        if (age  != null)  { qry.setAge(age); }

        Page<Friends> friendsPage = friendsRepo.findAll(org.springframework.data.domain.Example.of(qry), pageable);
        resp.setPageStats(friendsPage, true);
        resp.setItems(friendsPage.getContent());
        return resp;
    }

    @ApiOperation(value = "Add a friend", response = OperationResponse.class)
    @RequestMapping(value = "/friends/create", method = RequestMethod.POST, produces = {"application/json"})
    public OperationResponse addNewFriend(@RequestBody Friends friends, HttpServletRequest req) {

        OperationResponse resp = new OperationResponse();

        if (friendsRepo.existsByName(friends.getName()) ){
            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.ERROR);
            resp.setOperationMessage("Unable to add Friend - Friend already exists ");
        }
        else{
            this.friendsRepo.save(friends);
            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.SUCCESS);
            resp.setOperationMessage("Friend added");
        }
        return resp;
    }

    @ApiOperation(value = "Update friend", response = OperationResponse.class)
    @RequestMapping(value = "/friends/update", method = RequestMethod.POST, produces = {"application/json"})
    public OperationResponse updateFriend(@RequestBody Friends friends, HttpServletRequest req) {

        OperationResponse resp = new OperationResponse();

        friendsRepo.save(friends);
        resp.setOperationStatus(OperationResponse.ResponseStatusEnum.SUCCESS);
        resp.setOperationMessage("Friend updated");

        return resp;
    }

    @ApiOperation(value = "Delete a Friend", response = OperationResponse.class)
    @RequestMapping(value = "/friends/{friendId}", method = RequestMethod.DELETE, produces = {"application/json"})
    public OperationResponse deleteFriend(@PathVariable("friendId") Integer friendId, HttpServletRequest req) {
        OperationResponse resp = new OperationResponse();
        if (friendsRepo.existsById(friendId) ){
            friendsRepo.deleteById(friendId);
            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.SUCCESS);
            resp.setOperationMessage("Friend deleted");
        }
        else{
            resp.setOperationStatus(OperationResponse.ResponseStatusEnum.ERROR);
            resp.setOperationMessage("No friend exists");
        }
        return resp;
    }

    @ApiOperation(value = "Friend Stats", response = SingleDataSeriseResponse.class)
    @RequestMapping(value = "/friends-stats/{type}", method = RequestMethod.GET)
    public SingleDataSeriseResponse getFriendsStats(@PathVariable("type") String type) {
        String fieldName = "";
        if (type.equalsIgnoreCase("age") || type.equalsIgnoreCase("age")) {
            fieldName = " age ";
        } else if (type.equalsIgnoreCase("address") || type.equalsIgnoreCase("address")) {
            fieldName = " address ";
        } else {
            fieldName = " age ";
        }

        String sql = "select count(*) as value, " + fieldName + " as name from friends group by " + fieldName;
        String countType = new String();
        long count;
        SingleSerise singleSerise;
        SingleDataSeriseResponse resp = new SingleDataSeriseResponse();
        ArrayList<SingleSerise> dataItemList = new ArrayList<SingleSerise>();

        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);

        for (Map<String, Object> row : list) {
            singleSerise = new SingleSerise(row.get("name").toString().equalsIgnoreCase("1") ? "Available" :
                    row.get("name").toString().equalsIgnoreCase("0") ? "Not available" : row.get("name").toString(), new BigDecimal((long) row.get("value")));
            dataItemList.add(singleSerise);
        }

        resp.setItems(dataItemList);
        resp.setOperationStatus(OperationResponse.ResponseStatusEnum.SUCCESS);
        resp.setOperationMessage("Friends by " + fieldName);
        //resp.setItems(singleSerise);
        return resp;
    }

}
