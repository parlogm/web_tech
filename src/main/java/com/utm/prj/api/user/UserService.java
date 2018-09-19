package com.utm.prj.api.user;

import com.utm.prj.model.users.User;
import com.utm.prj.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public String getLoggedInUserId(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth==null){
            return "nosession";
        }
        return auth.getName();
    }


    public User getLoggedInUser() {
        String loggedInUserId = this.getLoggedInUserId();
        User user = this.getUserInfoByUserId(loggedInUserId);
        return user;
    }

    public User getUserInfoByUserId(String userId){
        User user = this.userRepo.findOneByUserId(userId).orElseGet( () -> new User());
        return user;
    }

    public boolean insertOrSaveUser(User user) {
        this.userRepo.save(user);
        return true;
    }

    public boolean addNewUser(User user) {
        User newUser = this.getUserInfoByUserId(user.getUserId());
        if (newUser.getUserId().equals("new")){
            // This means the username is not found therfore its is returning a default value of "new"
            return this.insertOrSaveUser(user);
        }
        else{
            return false;
        }
    }

}

