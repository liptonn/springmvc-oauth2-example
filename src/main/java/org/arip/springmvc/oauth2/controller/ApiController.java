package org.arip.springmvc.oauth2.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Arip Hidayat on 12/8/2015.
 */
@RestController
@RequestMapping("/api")
public class ApiController {

    @RequestMapping("/hallo")
    public Map<String, Object> hallo() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", Boolean.TRUE);
        result.put("page", "hallo");

        return result;
    }

    @RequestMapping("/admin")
    public Map<String, Object> admin(Principal user) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", Boolean.TRUE);
        result.put("page", "admin");
        result.put("user", user.getName());

        return result;
    }

    @RequestMapping("/staff")
    public Map<String, Object> staff(Principal user) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", Boolean.TRUE);
        result.put("page", "staff");
        result.put("user", user.getName());

        return result;
    }
}