import React from "react";
import { GoogleLogin } from "react-google-login";

export const GoogleAuth = () => {
  const responseGoogle = (response) => {
    // Handle successful response here
    console.log("Google Login Success:", response);
  };

  const responseError = (error) => {
    // Handle error response here
    // console.log("Google Login Error:", response);
  };

  return (
    <div>
      <div className="App">
        <h1>Google Calendar API</h1>
      </div>
      <div>
        <GoogleLogin
          clientId="442247230110-ajt9dvk370eq3n4a5jt7304u62t8qndl.apps.googleusercontent.com"
          buttonText="Sign in & Authorize Calendar"
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy={"single_host_origin"}
          responseType="token" // Ensure this is the correct response type for your needs
          scope="openid email profile https://www.googleapis.com/auth/calendar"
        />
      </div>
    </div>
  );
};

// export default GoogleAuth;