import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="grid-item header">
      <div className="header-container">
        <TextField
          id="filled-search"
          label="Company"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Subject"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Cross-Functional Team"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="Location"
          type="search"
          variant="filled"
        />
        <TextField
          id="filled-search"
          label="DFMEA ID. Number"
          type="search"
          variant="filled"
        />
      </div>
    </div>
  );
};

export default Header;
