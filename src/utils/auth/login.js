import axios from "axios";

const authEndpoint = process.env.REACT_APP_ENDPOINT_AUTH;

export const standardLogin = async (username, password) => {
  try {
    // Make an API call to validate username and password
    console.log("Username:", username); // Added this line for debugging
    console.log("Password:", password); // Added this line for debugging
    const loginResponse = await axios.post(
      `${authEndpoint}/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true, // Include credentials (cookies) in the request
      }
    );

    // If login is successful, set the user type and perform navigation
    console.log("Login Response:", loginResponse.data);

    if (loginResponse.data && loginResponse.data.token) {
      // Store the JWT token securely (e.g., in cookies or local storage)
      localStorage.setItem("token", loginResponse.data.token);

      // Redirect to /home upon successful login
      window.location.href = "/home";
      return true;
    } else {
      // Handle login failure (invalid credentials or other issues)
      return false;
    }
  } catch (error) {
    console.error("Standard login error:", error);
    // Handle any errors (e.g., network issues)
    return false;
  }
};
