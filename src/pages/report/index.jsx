import {
  Autocomplete,
  Avatar,
  Container,
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

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
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
        margin: "8px",
        width: "100%",
        minHeight: "100vh",
        // display: "flex",
        // backgroundColor: "#E3E4FF",
      }}
    >
      <Header />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        margin={"11px"}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          style={{ width: "100%" }}
        >
          <div>
            <Typography variant="h6">{`Hi, User1`}</Typography>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", margin: "10px" }}
          >
            <IconButton>
              <NotificationsNoneIcon
                fontSize="large"
                // style={{ fontSize: "24px" }}
              />
            </IconButton>
            <Avatar alt="User1" src={avatare} style={{ marginLeft: "10px" }} />
          </div>
        </Stack>

        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={10}
          style={{ width: "100%", backgroundColor: "#EFEFFC" }}
        >
          <div style={{ width: "100%", margin: "9px" }}>
            <Typography variant="h4">Reports</Typography>
          </div>

          <div
            style={{
              margin: "8px",
              backgroundColor: "white",
              width: "calc(100% - 16px)",
            }}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                margin: "10px",
                // backgroundColor: "black",
              }}
              spacing={4}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  // backgroundColor: "red",
                  width: "calc(100% - 20px)",
                }}
                spacing={4}
              >
                <Typography variant="h6">
                  All Incidents({allReports ? allReports?.length : "0"})
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  style={{ margin: "10px" }}
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<CloudDownloadIcon sx={{ fontSize: 24 }} />}
                    // onClick={handleDownload}
                  >
                    Download
                  </Button>
                  {/* <DateRangePicker /> */}
                </Stack>
              </Stack>

              <Stack
                direction={direction}
                justifyContent="space-evenly"
                alignItems="center"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  // backgroundColor: "red",
                  width: "calc(100% - 20px)",
                }}
                spacing={4}
              >
                <Autocomplete
                  disablePortal
                  id="status"
                  options={status}
                  sx={{ width: 150 }}
                  onChange={(event, value) => {
                    setCurStatus(value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="tags"
                  options={tags}
                  sx={{ width: 150 }}
                  onChange={(event, value) => {
                    setCurTag(value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Tag" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="Location"
                  options={location}
                  onChange={(event, value) => {
                    setCurLocation(value);
                  }}
                  sx={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="Violation"
                  options={location}
                  onChange={(event, value) => {
                    setCurLocation(value);
                  }}
                  sx={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Violation" />
                  )}
                />
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="web">Unassigned</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>
            {/* <div style={{ marginLeft: "15px", marginTop: "35px" }}> */}
            {/* {allReports &&
              allReports.length > 0 &&
              allReports.map((item, index) => (
                <div style={{ display: "flex" }}>
                  {" "}
                  <ReportCard dummyReport={item} />
                </div>
              ))} */}
            {/* </div> */}

            {allReports && allReports.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: isBigScreen ? "row" : "column",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  // margin: "0 -8px",
                  margin: "20px",
                }}
              >
                {allReports.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: isBigScreen ? "40%" : "100%",
                      padding: "8px",
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
