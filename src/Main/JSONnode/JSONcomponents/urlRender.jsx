import React, { useEffect } from "react";

const URL = ({ value }) => {
    return (
        <span>
          <span
            style={{
              color: "gray",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => window.open(value, "_blank")}
          >
            {value}
          </span>
          <br />
        </span>
    );
}

export default URL;