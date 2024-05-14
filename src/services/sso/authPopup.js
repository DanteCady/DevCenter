// authPopup.js

import { UserAgentApplication, InteractionRequiredAuthError } from "msal";
import axios from "axios";
import { msalConfig, loginRequest, tokenRequest } from "./authConfig";

// Create the main myMSALObj instance
export const myMSALObj = new UserAgentApplication(msalConfig);

// Function to get an access token using silent request, fallback to popup
export async function getTokenSilent(request) {
  try {
    const tokenResponse = await myMSALObj.acquireTokenSilent(request);
    return tokenResponse;
  } catch (error) {
    console.log("Silent token acquisition failed. Falling back to popup.");
    throw error; // Rethrow the error to be caught by the caller
  }
}

// Function to get an access token using popup
export async function getTokenPopup(request) {
  try {
    const tokenResponse = await myMSALObj.acquireTokenPopup(request);
    return tokenResponse;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to acquire token.");
  }
}

// Function to handle sign-in using silent token acquisition or popup
export async function signIn() {
  try {
    const account = myMSALObj.getAccount();
    if (account) {
      const userName = account.userName;
      const email = account.userName;

      // Perform actions related to authentication, if needed

      // For example, fetch the user's profile photo
      try {
        const accessToken = await getTokenSilent(tokenRequest);
        if (accessToken) {
          const photoData = await fetchProfilePhoto(accessToken);
          if (photoData) {
            // Do something with the profile photo if needed
          }
        }
      } catch (silentError) {
        // Silent token acquisition failed, initiate interactive login
        console.log("Silent token acquisition failed. Initiating interactive login.");
        await myMSALObj.loginRedirect(loginRequest);
      }
    } else {
      console.log("User not signed in. Initiating interactive login.");
      await myMSALObj.loginRedirect(loginRequest);
    }
  } catch (error) {
    console.error(error);
  }

  // Function to fetch the user's profile photo
  async function fetchProfilePhoto(accessToken) {
    try {
      const graphResponse = await fetch(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (graphResponse.ok) {
        const photoData = await graphResponse.arrayBuffer();
        return photoData;
      } else {
        console.error("Failed to fetch profile photo:", graphResponse.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
      return null;
    }
  }
}