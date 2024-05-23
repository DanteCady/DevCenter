import axios from "axios";
import { myMSALObj, loginRequest } from "./authConfig"; // Import the MSAL instance and loginRequest


const endpointUsers = process.env.REACT_APP_ENDPOINT_USERS;

// Helper function to send user data to the backend
async function sendUserDataToBackend(account) {
  try {
    // Extract additional user details from the Azure AD response
    const userData = {
      userName: account.username,
      email: account.username, 
      firstName: account.name.split(" ")[0], // Extracting first name from the name
      lastName: account.name.split(" ").slice(1).join(" "), // Extracting last name
      userType: "Standard",
      ssoEnabled: true,
    };

    // Send user data to the backend
    const response = await axios.post(`${endpointUsers}/create`, userData);

    if (
      response.data &&
      response.data.message === "User created successfully."
    ) {
      // Redirect to /home upon successful SSO login
      window.location.href = "/home";
    } else {
      throw new Error("Backend did not confirm user creation.");
    }
  } catch (error) {
    console.error("SSO login error:", error);
  }
}

// SSO login handler
export const handleSSOLogin = async () => {
  try {
    console.log("Before MSAL loginPopup()");

    // Attempt to login using MSAL's loginPopup method
    myMSALObj
      .loginPopup(loginRequest)
      .then(async (loginResponse) => {
        console.log("id_token acquired at: " + new Date().toString());
        console.log(loginResponse);

        if (myMSALObj.getAccount()) {
          // If a user is authenticated, send user data to the backend
          sendUserDataToBackend(myMSALObj.getAccount());
        }
      })
      .catch((error) => {
        console.error("SSO login error:", error);
      });

    console.log("After MSAL loginPopup()");
  } catch (error) {
    console.error("SSO login error:", error);
  }
};
