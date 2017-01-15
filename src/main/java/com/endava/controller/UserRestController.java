package com.endava.controller;

import com.endava.model.User;
import com.endava.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserRestController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/get-user/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getOne(@PathVariable Long id) {
        User user = userService.getOne(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> findAll() {
        List<User> users = userService.findAll();
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-user", method = RequestMethod.POST)
    public ResponseEntity<User> save(@RequestBody User user) {
        if (user == null)
            return new ResponseEntity<User>(user, HttpStatus.UNPROCESSABLE_ENTITY);

        user = userService.save(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-user/{id}", method = RequestMethod.DELETE)
    public  ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
