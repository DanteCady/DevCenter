


// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
export const myMSALObj = new Msal.UserAgentApplication(msalConfig); 

let accessToken;

// Register Callbacks for Redirect flow
myMSALObj.handleRedirectCallback(authRedirectCallBack);

export function authRedirectCallBack(error, response) {
  if (error) {
      console.log(error);
  } else {
      if (response.tokenType === "id_token") {
          console.log("id_token acquired at: " + new Date().toString()); 
          
          if (myMSALObj.getAccount()) {
            showWelcomeMessage(myMSALObj.getAccount());
          }

      } else if (response.tokenType === "access_token") {
        console.log("access_token acquired at: " + new Date().toString());
        accessToken = response.accessToken;

        try {
          callMSGraph(graphConfig.graphMailEndpoint, accessToken, updateUI);
        } catch(err) {
          console.log(err)
        }
      } else {
          console.log("token type is:" + response.tokenType);
      }
  }
}

if (myMSALObj.getAccount()) {
  showWelcomeMessage(myMSALObj.getAccount());
}

function signIn() {
  myMSALObj.loginRedirect(loginRequest);
}

function signOut() {
  myMSALObj.logout();
}

