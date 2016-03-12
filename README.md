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


### Grant Type : Authorization Code

The authorization code is obtained by using an authorization server as an intermediary 
between the client and resource owner.  Instead of requesting authorization directly from 
the resource owner, the client directs the resource owner to an authorization server, 
which in turn directs the resource owner back to the client with the authorization code.

Before directing the resource owner back to the client with the authorization code, 
the authorization server authenticates the resource owner and obtains authorization.  
Because the resource owner only authenticates with the authorization server, the resource 
owner's credentials are never shared with the client.

The authorization code provides a few important security benefits, such as the ability to 
authenticate the client, as well as the transmission of the access token directly to 
the client without passing it through the resource owner's user-agent and potentially 
exposing it to others, including the resource owner.

     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

     Note: The lines illustrating steps (A), (B), and (C) are broken into two parts 
            as they pass through the user-agent.

   Figure 3: Authorization Code Flow

The following is how the Grant Type works in this application :

* Call this URL in browser : 

		http://localhost:8080/springmvc-oauth2-example/oauth/authorize?client_id=clientauthcode&response_type=code&redirect_uri=http://localhost:8080/springmvc-oauth2-example/api/state/new

* You will redirected to login page, login with username=`admin` and password=`passw0rd` and choose approve radio button and click Autorize button.

* You will redirected to redirect uri with parameter code :

        http://localhost:8080/springmvc-oauth2-example/api/state/new?code=CODE

* Exchange authorization code with access token with call request :

        curl -X POST -vu clientauthcode:123456 http://localhost:8080/springmvc-oauth2-example/oauth/token -H "Accept: application/json" -d "grant_type=authorization_code&code=CODE&redirect_uri=http://localhost:8080/springmvc-oauth2-example/api/state/new"

* We will get JSON response :

        {
            "access_token":"08664d93-41e3-473c-b5d2-f2b30afe7053",
            "token_type":"bearer",
            "refresh_token":"436761f1-2f26-412b-ab0f-bbf2cd7459c4",
            "expires_in":43199,
            "scope":"write read"
        }

* Take access token to access protection resource, e.g :

        curl http://localhost:8080/springmvc-oauth2-example/api/admin?access_token=08664d93-41e3-473c-b5d2-f2b30afe7053

* In this case, `resource-server` will validation token to authorization :

        curl -X POST -vu clientauthcode:123456 http://localhost:8080/springmvc-oauth2-example/oauth/check_token?token=08664d93-41e3-473c-b5d2-f2b30afe7053

* You will get JSON response :

        {
            "aud": ["belajar"],
            "exp": 1444158090,
            "user_name": "endy",
            "authorities": ["ROLE_OPERATOR", "ROLE_SUPERVISOR"],
            "client_id": "clientauthcode",
            "scope": ["read", "write"]
        }


* Finaly, you will get resource :

        {
			"success":true,
			"page":"admin",
			"user":"admin"
		}

* If access token expired, you can request refresh token :

        curl -X POST -vu clientauthcode:123456 http://localhost:8080/springmvc-oauth2-example/oauth/token -d "client_id=clientauthcode&grant_type=refresh_token&refresh_token=436761f1-2f26-412b-ab0f-bbf2cd7459c4"

* `auth-server` will give you JSON response and new access token :

        {
            "access_token":"e425cee6-7167-4eea-91c3-2706d01dab7f",
            "token_type":"bearer",
            "refresh_token":"436761f1-2f26-412b-ab0f-bbf2cd7459c4",
            "expires_in":43199,"scope":"write read"
        }


### References
* [Spring Security Guides] (http://docs.spring.io/spring-security/site/docs/current/guides/html5/)
* [Spring OAuth2 Developer Guide] (http://projects.spring.io/spring-security-oauth/docs/oauth2.html)
* [IETF] (https://tools.ietf.org/html/rfc6749)