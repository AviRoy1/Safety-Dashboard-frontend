import {
  Autocomplete,
  Avatar,
  Container,
  FormControl,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import avatare from "../../images/avatar.png";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DateRangePicker, Grid } from "rsuite";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReportCard from "./components/ReportCard";
import {
  fetchLocations,
  fetchReports,
  fetchStatus,
  fetchTags,
  fetchViolationtypes,
  findReports,
} from "../../redux/action/report";
import { styled } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { SidebarCloseHover } from "../../components/SideBar";
import download from "../../images/received.png";
import calendar from "../../images/calendar.png";
import notificationIcon from "./components/images/notification.jpg";
import dropdown from "./components/images/dropdown.png";
import userIcon from "./components/images/userIcon.png";
import rightArrow from "./components/images/rightArrow.jpg";
import { server } from "../../redux/store";

const ColoredAutocomplete = styled(Autocomplete)(({ theme }) => ({
  // You can specify your custom styling here
  "& .MuiInputBase-input": {
    color: "blue", // Change the text color to blue
  },
}));

const ReportPage = () => {
  // const { isAuthenticated, user, message, error, loading } = useSelector(
  //   (state) => state.user
  // );
  const {
    allReports,
    allTags,
    allLocations,
    allStatus,
    allViolationType,
    loading,
  } = useSelector((state) => state.report);
  // console.log("allTags- ", allTags);
  const dispatch = useDispatch();
  const isBigScreen = useMediaQuery("(min-width:768px)");
  const [direction, setDirection] = useState("column");
  const [curTag, setCurTag] = useState(null);
  const [curStatus, setCurStatus] = useState(null);
  const [curLocation, setCurLocation] = useState(null);
  const [curViolation, setCurViolation] = useState(null);

  useEffect(() => {
    if (isBigScreen) {
      setDirection("row");
    } else {
      setDirection("column");
    }
  }, [isBigScreen]);
  // const status = [
  //   { label: "Open", id: 1 },
  //   { label: "Resolved", id: 2 },
  //   { label: "In Progress", id: 2 },
  // ];

  // const location = [
  //   { label: "l1", id: 1 },
  //   { label: "l2", id: 2 },
  //   { label: "l3", id: 3 },
  // ];
  const [alignment, setAlignment] = React.useState("web");
  const [bgColor, setBGColor] = useState("#F4F6F8");
  const [color, setColor] = useState("black");
  const [on, setOn] = useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (on === true) {
      setBGColor("#ECECFE");
      setColor("#4040F2");
      setOn(false);
    } else {
      setBGColor("#F4F6F8");
      setColor("black");
      setOn(true);
    }
  };

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchTags());
    dispatch(fetchLocations());
    dispatch(fetchStatus());
    dispatch(fetchViolationtypes());
  }, dispatch);

  // console.log(allReports);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${server}/report/download-pdf?location=${curLocation?.label}&status=${curStatus?.label}&tag=${curTag?.label}&violationType=${curViolation?.label}`
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reports.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    dispatch(findReports(curLocation, curStatus, curTag, curViolation));
  }, [curLocation, curStatus, curTag, curViolation]);

  const tags = allTags?.map((obj) => ({
    label: `${obj.name}`,
    id: `${obj._id}`,
  }));

  const status = allStatus?.map((obj) => ({
    label: `${obj.name}`,
    id: `${obj._id}`,
  }));

  const location = allLocations?.map((obj) => ({
    label: `${obj.name}`,
    id: `${obj._id}`,
  }));
  const violation = allViolationType?.map((obj) => ({
    label: `${obj.name}`,
    id: `${obj._id}`,
  }));

  return loading === true ? null : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#F8F8FF",
      }}
    >
      <SidebarCloseHover />
      <Stack
        id="main-div"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        // margin={"13px"}
        style={{ width: "100%", backgroundColor: "white" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          style={{ width: "100%" }}
        >
          <div>
            <Typography
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "18px",
                fontStyle: "noraml",
                fontWeight: "400px",
                lineHeight: "32px",
                margin: "12px",
              }}
            >{`Hi, User1`}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "20px",
              margin: "8px",
            }}
          >
            <IconButton style={{ marginLeft: "12px", display: "flex" }}>
              <img
                src={notificationIcon}
                alt="notification.jpg"
                style={{ marginTop: "5px" }}
              />
            </IconButton>
            <div>
              <img src={userIcon} style={{ margin: "9px" }} />
            </div>
          </div>
        </Stack>

        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={10}
          style={{
            width: "100%",
            backgroundColor: "#F8F8FF",

            margin: 0,
          }}
        >
          <div style={{ width: "100%", margin: "9px" }}>
            <Typography
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "24px",
                fontStyle: "noraml",
                fontWeight: "600",
                lineHeight: "36px",
                color: "#161C24",
                margin: "10px",
              }}
            >
              Reports
            </Typography>
          </div>

          <div
            style={{
              margin: "15px",
              backgroundColor: "white",
              overflow: "auto",
              height: "100vh",
              overflowX: "hidden",
              // width: "90%",
              width: "calc(100% - 16px)",
            }}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginRigjt: "20px",

                // backgroundColor: "black",
              }}
              spacing={1}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                style={{
                  // marginLeft: "10px",
                  // marginRight: "10px",
                  // backgroundColor: "red",
                  width: "100%",
                }}
                spacing={4}
              >
                <Typography
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "32px",
                    color: "#161C24",
                  }}
                >
                  All Incidents({allReports ? allReports?.length : "0"})
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  style={{ marginTop: "10px", marginRight: "11px" }}
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    style={{
                      color: "#4040F2",
                      borderColor: "#4040F2",
                      borderWidth: "1px",
                      textTransform: "none",
                    }}
                    onClick={handleDownload}
                  >
                    Download
                    <img
                      src={download}
                      alt="Download"
                      style={{
                        marginRight: "8px",
                        borderColor: "#4040F2",
                        borderWidth: "2px",
                        marginLeft: "6px",
                      }}
                    />
                  </Button>
                  {/* <DateRangePicker /> */}
                  <Button
                    variant="outlined"
                    style={{
                      color: "#4040F2",
                      borderColor: "#4040F2",
                      borderWidth: "1px",
                      textTransform: "none",
                    }}
                    // onClick={handleDownload}
                  >
                    Calendar
                    <img
                      src={calendar}
                      alt="Calendar"
                      style={{
                        marginRight: "8px",
                        borderColor: "#4040F2",
                        borderWidth: "2px",
                        marginLeft: "6px",
                      }}
                    />
                  </Button>
                </Stack>
              </Stack>

              <Stack
                direction={direction}
                style={{
                  // marginLeft: "10px",
                  // marginRight: "10px",
                  // backgroundColor: "red",
                  width: "100%",
                }}
                spacing={2}
              >
                <Stack direction="column" spacing={1} width="100px">
                  <FormControl
                    style={{ flex: 1, maxWidth: 100 }}
                    required
                    size="small"
                  >
                    <Autocomplete
                      id="status"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0",
                          padding: "1",
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: "1px solid #eee",
                          },
                      }}
                      forcePopupIcon={false}
                      style={{
                        backgroundColor:
                          curStatus === null ? "#F4F6F8" : "#ECECFE",
                      }}
                      options={status}
                      onChange={(event, value) => {
                        setCurStatus(value);
                      }}
                      // defaultValue="All"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Status"
                          InputLabelProps={{
                            style: {
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                              color: curStatus === null ? "#454F5B" : "#4040F2",
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <span className="contract-search-icon">
                                {curStatus === null ? (
                                  <img
                                    src={dropdown}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                ) : (
                                  <img
                                    src={rightArrow}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                )}
                              </span>
                            ),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <div>
                    <Typography
                      style={{
                        color: "#919EAB",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "24px",
                      }}
                    >
                      {curStatus !== null ? curStatus.label : null}
                    </Typography>
                  </div>
                </Stack>

                <Stack direction="column" spacing={1} width="100px">
                  <FormControl
                    style={{ flex: 1, maxWidth: 110, border: "none" }}
                    required
                    size="small"
                  >
                    <Autocomplete
                      id="tag"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0",
                          padding: "1",
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: "1px solid #eee",
                          },
                      }}
                      forcePopupIcon={false}
                      style={{
                        backgroundColor:
                          curTag === null ? "#F4F6F8" : "#ECECFE",
                      }}
                      options={location}
                      onChange={(event, value) => {
                        setCurTag(value);
                      }}
                      // defaultValue="All"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tags"
                          InputLabelProps={{
                            style: {
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                              color: curTag === null ? "#454F5B" : "#4040F2",
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <span className="contract-search-icon">
                                {curLocation === null ? (
                                  <img
                                    src={dropdown}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                ) : (
                                  <img
                                    src={rightArrow}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                )}
                              </span>
                            ),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <div>
                    <Typography
                      style={{
                        color: "#919EAB",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "24px",
                      }}
                    >
                      {curTag !== null ? curTag.label : null}
                    </Typography>
                  </div>
                </Stack>

                <Stack direction="column" spacing={1} width="100px">
                  <FormControl
                    style={{ flex: 1, maxWidth: 110 }}
                    required
                    size="small"
                  >
                    <Autocomplete
                      id="location"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0",
                          padding: "1",
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: "1px solid #eee",
                          },
                      }}
                      forcePopupIcon={false}
                      style={{
                        backgroundColor:
                          curLocation === null ? "#F4F6F8" : "#ECECFE",
                      }}
                      options={location}
                      onChange={(event, value) => {
                        setCurLocation(value);
                      }}
                      // defaultValue="All"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Location"
                          InputLabelProps={{
                            style: {
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                              color:
                                curLocation === null ? "#454F5B" : "#4040F2",
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <span className="contract-search-icon">
                                {curLocation === null ? (
                                  <img
                                    src={dropdown}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                ) : (
                                  <img
                                    src={rightArrow}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                )}
                              </span>
                            ),
                          }}
                        />
                      )}
                      // style={{ width: "100%", marginRight: "8px" }}
                    />
                  </FormControl>
                  <div>
                    <Typography
                      style={{
                        color: "#919EAB",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "24px",
                      }}
                    >
                      {curLocation !== null ? curLocation.label : null}
                    </Typography>
                  </div>
                </Stack>

                <Stack direction="column" spacing={1} width="100px">
                  <FormControl
                    style={{ flex: 1, maxWidth: 110 }}
                    required
                    size="small"
                  >
                    <Autocomplete
                      id="status"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0",
                          padding: "1",
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: "1px solid #eee",
                          },
                      }}
                      forcePopupIcon={false}
                      size="small"
                      style={{
                        backgroundColor:
                          curViolation === null ? "#F4F6F8" : "#ECECFE",
                      }}
                      options={violation}
                      onChange={(event, value) => {
                        setCurViolation(value);
                      }}
                      // defaultValue="All"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Violation"
                          InputLabelProps={{
                            style: {
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "24px",
                              color:
                                curViolation === null ? "#454F5B" : "#4040F2",
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <span className="contract-search-icon">
                                {curViolation === null ? (
                                  <img
                                    src={dropdown}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                ) : (
                                  <img
                                    src={rightArrow}
                                    alt=""
                                    style={{ marginTop: "8px" }}
                                  />
                                )}
                              </span>
                            ),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <div>
                    <Typography
                      style={{
                        color: "#919EAB",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "24px",
                      }}
                    >
                      {curViolation !== null ? curViolation.label : null}
                    </Typography>
                  </div>
                </Stack>

                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  sx={{
                    backgroundColor: bgColor,
                    height: "40px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0",
                      padding: "1",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "1px solid #eee",
                      },
                  }}
                >
                  <ToggleButton
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0",
                        padding: "1",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "1px solid #eee",
                        },
                    }}
                  >
                    <span
                      style={{
                        textTransform: "none",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "16px",
                        color: "#454F5B",
                        fontWeight: 400,
                        lineHeight: "24px",
                        fontStyle: "normal",
                        border: 0,
                      }}
                    >
                      Unassigned
                    </span>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>

            <div
              style={{
                display: "flex",
                // flexDirection: isBigScreen ? "row" : "column",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                // margin: "0 -8px",
                margin: "10px",
              }}
            >
              {allReports &&
                allReports.length > 0 &&
                allReports.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      // display: "flex",
                      flexBasis: "calc(47.33% )",
                      width: isBigScreen ? "40%" : "100%",
                      // justifyContent: "space-between",
                      boxSizing: "border-box",
                      margin: "14px",
                    }}
                  >
                    <ReportCard dummyReport={item} />
                  </div>
                ))}
            </div>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default ReportPage;
