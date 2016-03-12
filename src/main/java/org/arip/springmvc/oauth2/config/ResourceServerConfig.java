package org.arip.springmvc.oauth2.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

/**
 * Created by Arip Hidayat on 12/03/2016.
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/api/admin/**").access("hasRole('ROLE_ADMIN')");
        http.authorizeRequests().antMatchers("/api/staff/**").access("hasRole('ROLE_STAFF')");
        http.authorizeRequests().and().formLogin();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.resourceId(AuthorizationServerConfig.RESOURCE_ID);
    }
}