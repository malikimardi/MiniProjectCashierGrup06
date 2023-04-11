import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function Verification() {
  let { token } = useParams();

  const tokenVerification = async () => {
    console.log(token)
    if (token) {
      const response = await Axios.post(
        "http://localhost:8001/auth/verification",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <p>Your account is being verified</p>
      <p>{token}</p>
    </div>
  );
}

export default Verification;
