import { TextField } from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./header.scss";
import { header } from "../../data/dataJS";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderData, updateNodeData } from "../../store/fmea/fmea.actions";
import { selectFMEAData } from "../../store/fmea/fmea.selectors";

const Header = () => {
  const dispatch = useDispatch();
  const mainData = useSelector(selectFMEAData);
  const currentUser = useSelector((state) => state.user.currentUser);

  // console.log(mainData);
  const onChangeHandler = (e) => {
    const element = e.target;

    //console.log(element.dataset);
    data.header[element.dataset.prop] = element.value;
    dispatch(updateNodeData(data, { ...data }));
    //dispatch(setHeaderData(header));
  };

  useEffect(() => {
    setData(mainData);
    setHeaderData(mainData?.header);
  }, [mainData]);

  const [shrink, setShrink] = useState(false);
  const [headerData, setHeaderData] = useState(null);
  const [data, setData] = useState(null);

  return (
    data &&
    headerData && (
      <div className="grid-item header">
        <span>
          <b>Planning and preparation (Step 1)</b>
        </span>
        <form onChange={onChangeHandler}>
          <div className="header-container">
            <TextField
              id="filled-search"
              inputProps={{
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
              placeholder={headerData.companyName}
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
              placeholder={headerData.location}
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
              placeholder={headerData.customerName}
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
              placeholder={headerData.modelYear}
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
              placeholder={headerData.subject}
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
              disabled={currentUser ? true : false}
              placeholder={
                currentUser
                  ? currentUser.displayName
                  : headerData.responsibility
              }
            />

            <TextField
              id="filled-search"
              inputProps={{
                "data-prop": "fmeaStartDate",
              }}
              className="fmeaStartDate"
              label={
                headerData.type.name === "DFMEA"
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
              placeholder={headerData.fmeaStartDate}
            />
            <TextField
              id="filled-search"
              inputProps={{
                "data-prop": "fmeaRevisionDate",
              }}
              className="fmeaRevisionDate"
              label={
                headerData.type.name === "DFMEA"
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
              placeholder={headerData.fmeaRevisionDate}
            />
            <TextField
              id="filled-search"
              inputProps={{
                "data-prop": "fmeaIDNumber",
              }}
              className="fmeaIDNumber"
              label={
                headerData.type.name === "DFMEA"
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
              placeholder={headerData.fmeaIDNumber}
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
              placeholder={headerData.confidentialityLevel}
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
              placeholder={headerData.crossfunctionalTeam}
            />
          </div>
        </form>
      </div>
    )
  );
};

export default Header;
