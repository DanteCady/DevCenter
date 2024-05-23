 
import { UserAgentApplication } from "msal";
// const clientID = process.env.REACT_APP_Azure_ClientID;
// const tenantID = process.env.REACT_APP_Azure_TenantID;
// const redirectUri = process.env.REACT_APP_Azure_RedirectURI;

// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 export const msalConfig = {
   auth: {
     clientId: "",
     authority:
       "",
     redirectUri: "http://localhost:3000/auth/redirect",
   },
   cache: {
     cacheLocation: "sessionStorage", // This configures where your cache will be stored
     storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
   },
 };
// Add here the scopes to request when obtaining an access token for MS Graph API
// for more, visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/scopes.md
export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"]
};

// Add here scopes for access token to be used at MS Graph API endpoints.
export const tokenRequest = {
  scopes: ["openid", "profile", "user.read"], // Add the necessary scopes here
};


// Create the MSAL user agent application
export const myMSALObj = new UserAgentApplication(msalConfig);

