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
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import avatare from "../../images/avatar.png";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DateRangePicker, Grid } from "rsuite";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReportCard from "./components/ReportCard";
import { fetchReports, findReports } from "../../redux/action/report";
import { styled } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { SidebarCloseHover } from "../../components/SideBar";
import download from "../../images/received.png";
import calendar from "../../images/calendar.png";
import notificationIcon from "./components/images/notification.jpg";
import dropdown from "./components/images/dropdown.png";
import userIcon from "./components/images/userIcon.png";

const ColoredAutocomplete = styled(Autocomplete)(({ theme }) => ({
  // You can specify your custom styling here
  "& .MuiInputBase-input": {
    color: "blue", // Change the text color to blue
  },
}));

// const allReports = [
//   {
//     image:
//       "https://www.pyrotechworkspace.com/wp-content/uploads/2022/01/01-4.jpg",
//     tag: "accident",
//     date: "20th May, 10:15:50",
//     assign: "User 1",
//     location: "Control Room",
//     id: "999",
//     violationType: "none",
//     status: "Open",
//   },
//   {
//     image:
//       "https://www.thechemicalengineer.com/media/16250/emerson2.jpg?&maxwidth=980&center=0.5,0.5&mode=crop&scale=both",
//     tag: "accident",
//     date: "20th May, 01:00:50",
//     assign: "User 22",
//     location: "Loading Dock",
//     id: "133",
//     violationType: "D2",
//     status: "Resolved",
//   },
//   {
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Control_room_-_Lucens_reactor_-_1968_-_L17-0251-0105.jpg/1200px-Control_room_-_Lucens_reactor_-_1968_-_L17-0251-0105.jpg",
//     tag: "accident",
//     date: "20th May, 16:09:50",
//     assign: "User 11",
//     location: "Park",
//     id: "432",
//     violationType: "none",
//     status: "In Progress",
//   },
//   {
//     image: "https://www.ceeco.in/img/gallery/control-room1.jpg",
//     tag: "accident",
//     date: "20th May, 23:35:50",
//     assign: "User 16",
//     location: "Road",
//     id: "567",
//     violationType: "D3",
//     status: "Open",
//   },
// ];

const ReportPage = () => {
  // const { isAuthenticated, user, message, error, loading } = useSelector(
  //   (state) => state.user
  // );
  const { allReports } = useSelector((state) => state.report);
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
  const status = [
    { label: "Open", id: 1 },
    { label: "Resolved", id: 2 },
    { label: "In Progress", id: 2 },
  ];
  const tags = [
    { label: "Fake alert", id: 1 },
    { label: "Near miss", id: 2 },
    { label: "Accident", id: 3 },
  ];
  const location = [
    { label: "l1", id: 1 },
    { label: "l2", id: 2 },
    { label: "l3", id: 3 },
  ];
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
  }, dispatch);

  // console.log(allReports);

  useEffect(() => {
    dispatch(findReports(curLocation, curStatus, curTag, curViolation));
  }, [curLocation, curStatus, curTag, curViolation]);

  return (
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
              {/* <NotificationsNoneIcon
                style={{
                  width: "24px",
                  height: "24px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              /> */}
              <img
                src={notificationIcon}
                alt="notification.jpg"
                style={{ marginTop: "5px" }}
              />
            </IconButton>
            <div>
              {/* <Avatar
                alt="User1"
                src={avatare}
                style={{
                  display: "flex",
                  width: "32px",
                  height: "32px",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "3.561px 3.2px 0px 3.2px",
                  marginLeft: "11px",
                  marginTop: "7px",
                }}
              /> */}
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
              // width: "calc(100% - 16px)",
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
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "32px",
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
                    // onClick={handleDownload}
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
                <FormControl
                  style={{ flex: 1, maxWidth: 100 }}
                  required
                  size="small"
                >
                  <Autocomplete
                    id="status"
                    size="small"
                    style={{ backgroundColor: "#F4F6F8" }}
                    options={status}
                    onChange={(event, value) => {
                      setCurStatus(value);
                    }}
                    // defaultValue="All"
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                    // style={{ width: "100%", marginRight: "8px" }}
                  />
                </FormControl>

                <FormControl
                  style={{ flex: 1, maxWidth: 100 }}
                  required
                  size="small"
                >
                  <Autocomplete
                    id="tag"
                    size="small"
                    style={{ backgroundColor: "#F4F6F8" }}
                    options={tags}
                    onChange={(event, value) => {
                      setCurTag(value);
                    }}
                    // defaultValue="All"
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" />
                    )}
                    // style={{ width: "100%", marginRight: "8px" }}
                  />
                </FormControl>
                <FormControl
                  style={{ flex: 1, maxWidth: 110 }}
                  required
                  size="small"
                >
                  <Autocomplete
                    id="location"
                    size="small"
                    style={{ backgroundColor: "#F4F6F8" }}
                    options={location}
                    onChange={(event, value) => {
                      setCurLocation(value);
                    }}
                    // defaultValue="All"
                    renderInput={(params) => (
                      <TextField {...params} label="Location" />
                    )}
                    // style={{ width: "100%", marginRight: "8px" }}
                  />
                </FormControl>

                <FormControl
                  style={{ flex: 1, maxWidth: 110 }}
                  required
                  size="small"
                >
                  <Autocomplete
                    id="status"
                    size="small"
                    style={{ backgroundColor: "#F4F6F8" }}
                    options={location}
                    onChange={(event, value) => {
                      setCurTag(value);
                    }}
                    // defaultValue="All"
                    renderInput={(params) => (
                      <TextField {...params} label="Violation" />
                    )}
                    // style={{ width: "100%", marginRight: "8px" }}
                  />
                </FormControl>

                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  sx={{
                    backgroundColor: bgColor,
                    height: "40px",
                  }}
                >
                  <ToggleButton>
                    <span
                      style={{
                        textTransform: "none",
                        fontStyle: "Plus Jakarta Sans",
                        fontSize: "16px",
                        color: color,
                      }}
                    >
                      Unassigned
                    </span>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>

            {allReports && allReports.length > 0 && (
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
                {allReports.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      // width: isBigScreen ? "40%" : "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <ReportCard dummyReport={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default ReportPage;
