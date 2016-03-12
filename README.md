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
		
		
### Grant Type : Resource Owner Password Credentials

The resource owner password credentials (i.e., username and password) can be used directly 
as an authorization grant to obtain an access token.  The credentials should only be used 
when there is a high degree of trust between the resource owner and the client (e.g., the
client is part of the device operating system or a highly privileged application), and 
when other authorization grant types are not available (such as an authorization code).

Even though this grant type requires direct client access to the resource owner credentials, 
the resource owner credentials are used for a single request and are exchanged for an access token.  
This grant type can eliminate the need for the client to store the resource owner credentials 
for future use, by exchanging the credentials with a long-lived access token or refresh token.

     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          v
          |    Resource Owner
         (A) Password Credentials
          |
          v
     +---------+                                  +---------------+
     |         |>--(B)---- Resource Owner ------->|               |
     |         |         Password Credentials     | Authorization |
     | Client  |                                  |     Server    |
     |         |<--(C)---- Access Token ---------<|               |
     |         |    (w/ Optional Refresh Token)   |               |
     +---------+                                  +---------------+
     
     Figure 1: Resource Owner Password Credentials Flow

The following is how the Grant Type works in this application :

* Request access token : 

        curl -X POST -vu clientapp:123456 http://localhost:8080/springmvc-oauth2-example/oauth/token -H "Accept: application/json" -d "client_id=clientapp&grant_type=password&username=admin&password=passw0rd" 

* `auth-server` will give you JSON response with access token :

		{
			"access_token":"9b3456a4-c5db-422e-a422-883a60bf1899",
			"token_type":"bearer",
			"expires_in":43199,
			"scope":"read write"
		}

* Access resource with header parameter : 

        curl -H "Authorization: Bearer 9b3456a4-c5db-422e-a422-883a60bf1899" http://localhost:8080/springmvc-oauth2-example/api/admin

* `resource-server` will give JSON response :

		{
			"success":true,
			"page":"admin",
			"user":"admin"
		}



### Grant Type : Client Credentials

The client can request an access token using only its client credentials (or other supported 
means of authentication) when the client is requesting access to the protected resources 
under its control, or those of another resource owner that have been previously arranged with 
the authorization server (the method of which is beyond the scope of this specification).

The client credentials grant type MUST only be used by confidential clients.

     +---------+                                  +---------------+
     |         |                                  |               |
     |         |>--(A)- Client Authentication --->| Authorization |
     | Client  |                                  |     Server    |
     |         |<--(B)---- Access Token ---------<|               |
     |         |                                  |               |
     +---------+                                  +---------------+

     Figure 2: Client Credentials Flow

The following is how the Grant Type works in this application :

* Request token with header `client_id` and `client_secret` as Basic Authorization and with `client_id` and `grant_type` as parameters.

        curl -X POST -vu clientcred:123456 http://localhost:8080/springmvc-oauth2-example/oauth/token -H "Accept: application/json" -d "client_id=clientcred&grant_type=client_credentials"

* We will get JSON response :

        {
			"access_token":"67f262cb-55f6-4c60-a49e-ae0ab8a8438c",
			"token_type":"bearer",
			"expires_in":43199,
			"scope":"trust"
		}

* Access resource with header parameter :

        curl -H "Authorization: Bearer 67f262cb-55f6-4c60-a49e-ae0ab8a8438c" http://localhost:8080/springmvc-oauth2-example/api/client

* If success, will get JSON response :

        {
            "sukses":true,
            "page":"client",
            "user":"clientcred"
        }        


### References
* [Spring Security Guides] (http://docs.spring.io/spring-security/site/docs/current/guides/html5/)
* [Spring OAuth2 Developer Guide] (http://projects.spring.io/spring-security-oauth/docs/oauth2.html)
* [IETF] (https://tools.ietf.org/html/rfc6749)