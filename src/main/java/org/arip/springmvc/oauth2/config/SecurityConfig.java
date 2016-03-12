package org.arip.springmvc.oauth2.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by Arip Hidayat on 12/10/2015.
 */
@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("admin").password("passw0rd").roles("ADMIN");
        auth.inMemoryAuthentication().withUser("staff").password("passw0rd").roles("STAFF");
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/api/admin/**").access("hasRole('ROLE_ADMIN')");
        http.authorizeRequests().antMatchers("/api/staff/**").access("hasRole('ROLE_STAFF')");
        http.authorizeRequests().and().formLogin();
    }

}
