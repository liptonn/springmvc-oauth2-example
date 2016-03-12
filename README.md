## Spring MVC Security OAuth2 Example
The OAuth 2.0 provider mechanism is responsible for exposing OAuth 2.0 protected resources. 
The configuration involves establishing the OAuth 2.0 clients that can access its protected 
resources independently or on behalf of a user. The provider does this by managing and 
verifying the OAuth 2.0 tokens used to access the protected resources. Where applicable, 
the provider must also supply an interface for the user to confirm that a client can 
be granted access to the protected resources (i.e. a confirmation page).

The provider role in OAuth 2.0 is actually split between Authorization Service and 
Resource Service, and while these sometimes reside in the same application, 
with Spring Security OAuth you have the option to split them across two applications, 
and also to have multiple Resource Services that share an Authorization Service. 
The requests for the tokens are handled by Spring MVC controller endpoints, and access to 
protected resources is handled by standard Spring Security request filters. 

### Prerequisite :
* Installed Maven Project environment

### Build and Run :

* Run application :

    	mvn clean tomcat7:run

* Call URL :

		http://localhost:8080/springmvc-oauth2-example/

### References
* [Spring Security Guides] (http://docs.spring.io/spring-security/site/docs/current/guides/html5/)
* [Spring OAuth2 Developer Guide] (http://projects.spring.io/spring-security-oauth/docs/oauth2.html)