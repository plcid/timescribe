import React from "react";
import { GoogleLogin } from "react-google-login";

export const GoogleAuth = () => {
  const responseGoogle = (response) => {
    // Handle successful response here
    // console.log("Google Login Success:", response);
  };

  const responseError = (error) => {
    // Handle error response here
    // console.log("Google Login Error:", error);
  };

  return (
    <GoogleLogin
      clientId='996450975815-6tgrhpang822ds11ta2gvsf31d2dpsgr.apps.googleusercontent.com' // Use the environment variable
      buttonText="Sign in & Authorize Calendar"
      onSuccess={responseGoogle}
      onFailure={responseError}
      cookiePolicy={"single_host_origin"}
      responseType="token" // Ensure this is the correct response type for your needs
      scope="openid email profile https://www.googleapis.com/auth/calendar"
    />
  );
};
