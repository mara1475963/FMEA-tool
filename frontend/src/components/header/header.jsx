import { TextField } from "@mui/material";

import { Box } from "@mui/system";
import React, { useState } from "react";
import "./header.scss";
import { header } from "../../data/dataJS";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderData } from "../../store/fmea/fmea.actions";

const Header = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((state) => state.fmea.header);
  const onChangeHandler = (e) => {
    const element = e.target;

    headerData[element.dataset.prop] = element.value;
    dispatch(setHeaderData(header));
  };

  const [shrink, setShrink] = useState(false);

  return (
    <div className="grid-item header">
      <span>
        <b>Planning and preparation (Step 1)</b>
      </span>
      <form onChange={onChangeHandler}>
        <div className="header-container">
          <TextField
            id="filled-search"
            InputProps={{
              "data-prop": "companyName",
            }}
            label="Company Name"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.companyName}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "location",
            }}
            className="location"
            label="Location"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.location}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "customerName",
            }}
            className="customerName"
            label="Customer Name"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.customerName}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "modelYear",
            }}
            className="modelYear"
            label="Model Year / Program(s)"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.modelYear}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "subject",
            }}
            className="subject"
            label="Subject"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.subject}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "responsibility",
            }}
            className="responsibility"
            label="Responsibility"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.responsibility}
          />

          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "fmeaStartDate",
            }}
            className="fmeaStartDate"
            label={
              header.type.name === "DFMEA"
                ? "DFMEA Start Date"
                : "PFMEA Start Date"
            }
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.fmeaStartDate}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "fmeaRevisionDate",
            }}
            className="fmeaRevisionDate"
            label={
              header.type.name === "DFMEA"
                ? "DFMEA Revision Date"
                : "PFMEA Revision Date"
            }
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.fmeaRevisionDate}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "fmeaIDNumber",
            }}
            className="fmeaIDNumber"
            label={
              header.type.name === "DFMEA"
                ? "DFMEA ID. Number"
                : "PFMEA ID. Number"
            }
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.fmeaIDNumber}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "confidentialityLevel",
            }}
            className="confidentialityLevel"
            label="Confidentiality Level"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.confidentialityLevel}
          />
          <TextField
            id="filled-search"
            inputProps={{
              "data-prop": "crossFunctionalTeam",
            }}
            className="crossFunctionalTeam"
            label="Cross-Functional Team"
            type="search"
            variant="filled"
            size="small"
            onFocus={(e) => {
              setShrink(true);
            }}
            onBlur={(e) => {
              !e.target.value && setShrink(false);
            }}
            InputLabelProps={{ shrink: shrink }}
            placeholder={header.crossfunctionalTeam}
          />
        </div>
      </form>
    </div>
  );
};

export default Header;
