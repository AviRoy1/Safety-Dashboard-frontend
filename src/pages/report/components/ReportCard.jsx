import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Modal,
  TextField,
  Typography,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextareaAutosize,
  Avatar,
  Menu,
  MenuItem,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Person2Icon from "@mui/icons-material/Person2";
import AddCommentIcon from "@mui/icons-material/AddComment";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { Image } from "@mui/icons-material";
import Comments from "./Comments";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, editReport } from "../../../redux/action/report";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import MailIcon from "@mui/icons-material/Mail";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ForumIcon from "@mui/icons-material/Forum";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
// import "./location.css";
import locationImage from "./images/location.png";
import rectangleRed from "./images/RectangleRed.jpg";
import rectangleViolate from "./images/RectangleViolate.png";
import rectangleOrange from "./images/RectangleOrange.png";
import "./tags.css";
import resolved from "./images/TagResolved.jpg";
import openIcon from "./images/TagOpen.png";
import inprogress from "./images/TagsInProgress.jpg";
import editIcon from "./images/edit.png";
import frame from "./images/frame.jpg";
import messageIcon from "./images/messagesIcon.jpg";
import rightIcon from "./images/rightIcon.jpg";
import zoomIcon from "./images/zoom.jpg";
import emailIcon from "./images/sms.png";
import mettingIcon from "./images/people.png";
import closeIcon from "./images/closeIcon.png";
import dropDownIcon from "./images/dropdown.png";
import noMessageIcon from "./images/messages2.jpg";
import Column from "antd/es/table/Column";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import maximizeIcon from "./images/maximize.jpg";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const assign = [
  { label: "User 1", id: 1, mail: "user1@gmail.com" },
  { label: "User 2", id: 2, mail: "user2@gmail.com" },
  { label: "User 3", id: 3, mail: "user3@gmail.com" },
];

const ReportCard = ({ dummyReport }) => {
  const {
    message,
    error,
    allReports,
    allTags,
    allLocations,
    allStatus,
    allViolationType,
    loading,
  } = useSelector((state) => state.report);
  const tags = allTags?.map((obj) => ({
    label: `${obj.name}`,
    id: `${obj._id}`,
  }));

  const status = allStatus?.map((obj) => obj.name);

  const location = allLocations?.map((obj) => ({
    label: `${obj.name}`,
    id: `${obj._id}`,
  }));
  const violation = allViolationType?.map((obj) => ({
    label: `${obj.name}`,
    id: `${obj._id}`,
  }));
  const [open, setOpen] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);

  const [tagCurrent, setTagCurrent] = useState({
    label: dummyReport.tags,
    id: 0,
  });
  const [assignCurrent, setAssignCurrent] = useState({
    label: dummyReport.assigned,
    id: 0,
  });
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        // bgcolor: "#ECECFE",
        // color: "#4040F2",
      },
      children: name.includes(" ")
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : `${name[0]}`,
    };
  }

  // console.log(dummyReport);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
    setState({ ...state, [anchor]: open });
    setAssignCurrent(null);
  };
  const isLargeScreen = useMediaQuery("(min-width:768px)");
  const toggleDrawerMeeting = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenMeeting(open);
    setState({ ...state, [anchor]: open });
  };

  const [openComment, setOpenComment] = useState(false);
  const toggleCommentDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenComment(open);
    setState({ ...state, [anchor]: open });
  };

  const cardSx = {
    display: "flex",
    flexDirection: isLargeScreen ? "row" : "column",
    width: isLargeScreen ? "100%" : 320,
    height: isLargeScreen ? "200px" : "380px",
    // marginBottom: "16px",
    // marginRight: "30px",
    border: "1px solid var(--gray-200, #EAECEE)",
    background: "var(--base-background-white, #FFF)",
    borderRadius: "8px",
    // backgroundColor: "yellow",
    // marginTop: "2px",
    // margin: "12px",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
  };
  const mediaWidth = isLargeScreen ? "40%" : 320;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const saveHandler = async () => {
    dispatch(
      editReport(dummyReport._id, statusCurrent, tagCurrent, assignCurrent)
    );
    setOpen(false);
  };

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment !== "") dispatch(addNewComment(dummyReport._id, newComment));
    setNewComment("");
    setOpenComment(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [statusCurrent, setStatusCurrent] = useState([]);
  function getStyles(status, statusCurrent, theme) {
    return {
      fontWeight:
        statusCurrent.indexOf(status) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatusCurrent(value);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 340,
        height: "60px",
        // display: "flex",
        // direction: "column",
        // justifyContent: "space-between",
        // alignItems: "space-between",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#0D0D30",
          color: "white",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          height: "55px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          style={{ width: "100%" }}
        >
          <Typography
            style={{
              marginLeft: "11px",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "19px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px",
              margin: "16px",
            }}
          >
            Edit
          </Typography>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </Stack>
      </div>
      <Divider />
      <div
        style={{
          // marginTop: "20px",
          // marginLeft: "20px",
          margin: "14px",
          backgroundColor: "#F9FAFB",
          height: "140px",
        }}
      >
        <Stack
          style={{ marginLeft: "10px", marginTop: "16px" }}
          flexDirection={"row"}
        >
          <img
            src={dummyReport.imagepath}
            alt="Report Image"
            width="100"
            height="55"
            style={{ marginTop: "4px" }}
          />
          <div>
            <div style={{ marginLeft: "12px", marginTop: "4px" }}>
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                #{dummyReport._id.slice(-4)}
              </Typography>
            </div>
            <div style={{ marginLeft: "12px", marginTop: "6px" }}>
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "16px",
                }}
              >
                {moment(dummyReport.createdAt).format("DD MMM YYYY, hh:mm:ss")}
              </Typography>
            </div>
          </div>
        </Stack>
        <Divider style={{ marginTop: "16px" }} />
        <Stack
          direction={"row"}
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"column"}>
            <Typography
              style={{
                fontSize: "13px",
                color: "#919EAB",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Location
            </Typography>
            <Typography
              style={{
                fontSize: "15px",
                color: "black",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {dummyReport.location}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              style={{
                fontSize: "13px",
                color: "#919EAB",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Incident
            </Typography>
            <Typography
              style={{
                fontSize: "15px",
                color: "black",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              Driving
            </Typography>
          </Stack>
        </Stack>
        {/* <Divider style={{ marginTop: "16px" }} /> */}

        <div
          style={{
            marginTop: "40px",
          }}
        >
          <Typography
            style={{
              margin: "10px",
              marginTop: "12px",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            Status
          </Typography>

          <FormControl sx={{ width: 300, padding: 0, marginLeft: "7px" }}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              value={statusCurrent}
              onChange={handleChange}
              style={{ padding: "0px" }}
              input={<OutlinedInput id="status" label="Chip" />}
              renderValue={(selected) => (
                <div style={{ display: "inline-block", marginLeft: "13px" }}>
                  <Box
                    height={30}
                    padding="4px 8px"
                    borderRadius={4}
                    bgcolor={
                      selected === "Open"
                        ? "#FFF3D6"
                        : selected === "Resolved"
                        ? "#F3FFF6"
                        : "#E0F1F5"
                    }
                    width="auto"
                  >
                    <Typography
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: 14,
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "20px",
                        color:
                          selected === "Open"
                            ? "#694100"
                            : selected === "Resolved"
                            ? "#006100"
                            : "#005278",
                      }}
                    >
                      {selected}
                    </Typography>
                  </Box>
                </div>
              )}
              MenuProps={MenuProps}
            >
              {status.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, statusCurrent, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography
            style={{
              margin: "10px",
              marginTop: "13px",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            Assign
          </Typography>

          <Autocomplete
            style={{
              margin: "10px",
              marginTop: "10px",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
              width: 300,
            }}
            disablePortal
            id="assign"
            options={assign}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => {
              setAssignCurrent(value);
            }}
            renderInput={(params) => <TextField {...params} label="Assign" />}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Avatar
                  {...stringAvatar(`${option.label} ${option.label}`)}
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                {option.label}
              </Box>
            )}
          />
        </div>
        <div>
          <Typography
            style={{
              margin: "10px",
              marginTop: "10px",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            Tags
          </Typography>
          <Autocomplete
            style={{ margin: "10px" }}
            disablePortal
            id="tags"
            options={tags}
            sx={{ width: 300 }}
            onChange={(event, value) => {
              setTagCurrent(value);
            }}
            renderInput={(params) => <TextField {...params} label="Tag" />}
          />
        </div>

        <div style={{ marginTop: "200px" }}>
          <Divider />
          <Button
            variant="contained"
            onClick={saveHandler}
            style={{
              marginLeft: "230px",
              marginTop: "16px",
              backgroundColor: "#4040F2",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            Save
          </Button>
        </div>
      </div>

      {/* <div style={{ marginTop: "100px" }}></div> */}
      {/* <Divider /> */}
    </Box>
  );

  const meetingPopup = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 340,
        height: "60px",
        // display: "flex",
        // direction: "column",
        // justifyContent: "space-between",
        // alignItems: "space-between",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawerMeeting(anchor, false)}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#0D0D30",
          color: "white",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          height: "55px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          style={{ width: "100%" }}
        >
          <Typography
            style={{
              marginLeft: "11px",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "19px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px",
              margin: "16px",
            }}
          >
            Edit
          </Typography>
          <IconButton onClick={toggleDrawerMeeting(anchor, false)}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </Stack>
      </div>
      <Divider />
      <div
        style={{
          // marginTop: "20px",
          // marginLeft: "20px",
          margin: "14px",
          backgroundColor: "#F9FAFB",
          height: "140px",
        }}
      >
        <Stack
          style={{ marginLeft: "10px", marginTop: "16px" }}
          flexDirection={"row"}
        >
          <img
            src={dummyReport.imagepath}
            alt="Report Image"
            width="100"
            height="55"
            style={{ marginTop: "4px" }}
          />
          <div>
            <div style={{ marginLeft: "12px", marginTop: "4px" }}>
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                #{dummyReport._id.slice(-4)}
              </Typography>
            </div>
            <div style={{ marginLeft: "12px", marginTop: "6px" }}>
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "16px",
                }}
              >
                {moment(dummyReport.createdAt).format("DD MMM YYYY, hh:mm:ss")}
              </Typography>
            </div>
          </div>
        </Stack>
        <Divider style={{ marginTop: "16px" }} />
        <Stack
          direction={"row"}
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"column"}>
            <Typography
              style={{
                fontSize: "13px",
                color: "#919EAB",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Location
            </Typography>
            <Typography
              style={{
                fontSize: "15px",
                color: "black",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {dummyReport.location}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              style={{
                fontSize: "13px",
                color: "#919EAB",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Incident
            </Typography>
            <Typography
              style={{
                fontSize: "15px",
                color: "black",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              Driving
            </Typography>
          </Stack>
        </Stack>
        {/* <Divider style={{ marginTop: "16px" }} /> */}
      </div>
    </Box>
  );

  const comments = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 340,
        position: "relative",
        // backgroundColor: "black",
        height: "100%",
      }}
      role="presentation"
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#0D0D30",
          color: "white",
          justifyContent: "center",
          alignContent: "center",
          height: "42px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          style={{ width: "100%" }}
        >
          <Typography
            style={{
              marginLeft: "14px",
              fontFamily: "Plus Jakarta Sans",
              fontSize: "19px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px",
              margin: "16px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Comments
          </Typography>
          <IconButton onClick={toggleCommentDrawer(anchor, false)}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </Stack>
      </div>
      {/* <Divider /> */}
      <div
        style={{ margin: "14px", backgroundColor: "#F9FAFB", height: "140px" }}
      >
        <Stack
          style={{ marginLeft: "10px", marginTop: "16px" }}
          flexDirection={"row"}
        >
          <img
            src={dummyReport.imagepath}
            alt="Report Image"
            width="100"
            height="55"
            style={{ marginTop: "4px" }}
          />
          <div>
            <div style={{ marginLeft: "12px", marginTop: "4px" }}>
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                #{dummyReport._id.slice(-4)}
              </Typography>
            </div>
            <div style={{ marginLeft: "12px", marginTop: "6px" }}>
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "16px",
                }}
              >
                {moment(dummyReport.createdAt).format("DD MMM YYYY hh:mm:ss ")}
              </Typography>
            </div>
          </div>
        </Stack>
        <Divider style={{ marginTop: "16px" }} />
        <Stack
          direction={"row"}
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"column"}>
            <Typography
              style={{
                fontSize: "13px",
                color: "#919EAB",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Location
            </Typography>
            <Typography
              style={{
                fontSize: "15px",
                color: "black",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {dummyReport.location}
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              style={{
                fontSize: "13px",
                color: "#919EAB",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Incident
            </Typography>
            <Typography
              style={{
                fontSize: "15px",
                color: "black",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              Driving
            </Typography>
          </Stack>
        </Stack>
      </div>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
        sx={{
          marginBottom: "34px",
          height: "73%",
          flexBasis: "calc(47.33% )",
        }}
      >
        {!dummyReport.comments || dummyReport.comments.length === 0 ? (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img src={noMessageIcon} alt="message.png" />
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                No comment added yet!
              </Typography>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {dummyReport.comments &&
              dummyReport.comments.map((comment, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <div
                    key={index}
                    style={{
                      marginTop: "20px",
                      margin: "12px",
                    }}
                  >
                    <Stack flexDirection={"row"}>
                      <Avatar {...stringAvatar(String(comment.user))} />
                      <div style={{ marginLeft: 16 }}>
                        <div
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "24px",
                            color: "#212B36",
                          }}
                        >
                          {comment.user}
                        </div>
                        <div
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "16px",
                            color: "#919EAB",
                          }}
                        >
                          {moment(comment?.time).format(
                            "MMM DD, YYYY | hh:mm a"
                          )}
                        </div>
                      </div>
                    </Stack>
                    <div
                      style={{
                        marginLeft: 56,
                        marginTop: 10,
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#454F5B",
                      }}
                    >
                      {comment?.message}
                    </div>
                  </div>
                  <Divider style={{ width: "100%" }} />
                </div>
              ))}
          </div>
        )}

        <div style={{ width: "100%", height: "50px" }}>
          <Stack
            direction="row"
            alignItems="flex-start"
            style={{
              // marginBottom: "10px",
              // marginLeft: "8px",
              width: "100%",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
            }}
            justifyItems="center"
          >
            <Avatar
              {...stringAvatar(String("User"))}
              style={{ marginRight: "3px", margin: "10px" }}
            />
            <input
              type="text"
              style={{
                height: "60px",
                border: "none",
                borderBottom: "0px solid #000",
                fontSize: "16px",
                outline: "none",
                marginLeft: "16px",
              }}
              placeholder="Enter text here"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="text"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "20px",
                color: "#4040F2",
                marginTop: "15px",
                marginRight: "10px",
              }}
              onClick={handleAddComment}
            >
              Post
            </Button>
          </Stack>
        </div>
      </Stack>
    </Box>
  );

  const [comment, setComment] = useState(false);
  const [obj, setObj] = useState(null);
  const addComment = () => {
    setOpenComment(true);
  };
  const closeComment = () => {
    setComment(false);
  };

  return (
    <Card sx={cardSx}>
      <CardMedia
        sx={{
          width: mediaWidth,
          height: 160,
          flex: "none",
          position: "relative",
          margin: "12px",
        }}
        image={dummyReport.imagepath}
        title="green iguana"
      >
        <div
          style={{
            height: "32px",
            width: "94px",
            position: "relative",
            marginTop: "12px",
          }}
        >
          <img
            className="rectangle"
            alt="Rectangle"
            src={
              dummyReport.tags === "Fake alert"
                ? rectangleRed
                : dummyReport.tags === "Accident"
                ? rectangleViolate
                : rectangleOrange
            }
            style={{
              height: "32px",
              left: "-3px",
              position: "fixed",
              top: "0",
              width: "90px",
              position: "absolute",
            }}
          />
          <Typography
            style={{
              position: "absolute",
              bottom: "2",
              // marginBottom: "2px",
              left: "-1",
              padding: "5px 2px 5px 5px",
              fontSize: "16px",
              color: "#FFF",
              fontFamily: "Plus Jakarta Sans",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            {dummyReport.tags}
          </Typography>
        </div>

        <div
          className="frame"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginBottom: "10px",
            // marginLeft: "2px",
            marginRight: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            backgroundColor: "rgba(28, 28, 28, 0.6)",
            // backdropFilter: "none", // Set backdropFilter to 'none'
            borderRadius: "4px",
            // gap: "5",
            margin: "10px",
          }}
        >
          {/* <locationImage className="vuesax-outline" /> */}
          <div style={{ display: "flex", direction: "column" }}>
            <img
              src={locationImage}
              style={{
                marginTop: "4px",
                marginBottom: "4px",
                marginLeft: "4px",
                height: "17px",
                marginTop: "5px",
              }}
            />
            <Typography
              style={{
                color: "white",
                marginLeft: "8px",
                marginTop: "4px",
                marginBottom: "4px",
                marginRight: "5px",
                fontFamily: "Plus Jakarta Sans",
                fontSize: "14px",
              }}
            >
              {dummyReport?.location}
            </Typography>
          </div>
        </div>
        <Chip
          color="primary"
          disabled={false}
          size="small"
          variant="outlined"
          icon={
            <ZoomOutMapIcon style={{ color: "white", marginLeft: "7px" }} />
          }
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            marginTop: "7px",
            marginRight: "7px",
            backgroundColor: "rgba(28, 28, 28, 0.7)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "27px",
            height: "27px",
          }}
        />
      </CardMedia>
      <CardContent style={{ padding: 0, width: "100%", marginTop: "15px" }}>
        <Box>
          <Stack
            direction="row"
            style={{
              marginLeft: "11px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: "32px",
                marginLeft: "2px",
              }}
            >
              #{dummyReport._id.slice(-7)}
            </Typography>

            <div style={{ marginTop: "-9px" }}>
              <img
                src={
                  dummyReport.status === "Resolved"
                    ? resolved
                    : dummyReport.status === "Open"
                    ? openIcon
                    : inprogress
                }
                style={{ marginLeft: "12px", marginTop: "8px" }}
              />
            </div>
            <Stack
              width="100%"
              direction="row"
              justifyContent="flex-end"
              marginTop="-2px"
            >
              <IconButton
                style={{ marginLeft: "0px" }}
                onClick={() => setOpen(true)}
              >
                {/* <EditIcon /> */}
                <img src={editIcon} />
              </IconButton>

              <IconButton
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleOpenMenu}
                style={{ marginLeft: "0px", marginRight: "6px" }}
              >
                <MoreVertIcon style={{ color: "#919EAB" }} />
              </IconButton>
              <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                style={{ width: "200px" }}
              >
                <MenuItem onClick={handleCloseMenu} style={{ width: "200px" }}>
                  <ListItemIcon>
                    <img src={emailIcon} />
                  </ListItemIcon>{" "}
                  Mail
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon onClick={() => setOpenMeeting(true)}>
                    <img src={mettingIcon} />
                  </ListItemIcon>{" "}
                  Metting
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
          <Stack style={{ margin: "8px", marginTop: "4px" }}>
            <div style={{ display: "flex", marginLeft: "6px" }}>
              <Typography
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "#4F5B67",
                  fontStyle: "normal",
                }}
              >
                {moment(dummyReport.createdAt).format("DD MMM, hh:mm:ss")}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                marginLeft: "6px",
                marginRight: "10px",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <CropFreeIcon fontSize="medium" /> */}
                <img src={maximizeIcon} />
                <Typography
                  style={{
                    marginLeft: "8px",
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    fontStyle: "normal",
                    color: "#454F5B",
                  }}
                >
                  {dummyReport.violationType}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                {/* <PermIdentityIcon fontSize="medium" />
                 */}
                <img src={frame} />
                <Typography
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    fontStyle: "normal",
                    color: "#454F5B",
                    marginLeft: "8px",
                  }}
                >
                  {dummyReport.assigned}
                </Typography>
              </div>
            </div>

            <div style={{ display: "flex", margin: "5px", marginTop: "15px" }}>
              <Button
                variant="text"
                // color="primary"
                style={{
                  backgroundColor: "white",
                  color: dummyReport.comments.length === 0 ? "blue" : "black",
                }}
                startIcon={
                  // <ForumIcon fontSize="medium" style={{ marginTop: "2px" }} />
                  <img src={messageIcon} />
                }
                onClick={() => {
                  // addComment();
                  setObj(dummyReport);
                  setOpenComment(true);
                }}
                endIcon={
                  // <ForumIcon fontSize="medium" style={{ marginTop: "2px" }} />
                  dummyReport.comments && dummyReport.comments.length > 0 ? (
                    <img src={rightIcon} />
                  ) : null
                }
              >
                <Typography
                  style={{
                    marginLeft: "6px",
                    marginTop: "2px",
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    color:
                      dummyReport && dummyReport.comments.length > 0
                        ? "#454F5B"
                        : "#4040F2",
                    textTransform: "none",
                  }}
                >
                  {dummyReport.comments && dummyReport.comments.length > 0
                    ? dummyReport.comments.length + " Comments"
                    : "Add Comments"}
                </Typography>
              </Button>
            </div>
          </Stack>
        </Box>
      </CardContent>

      {open === true ? (
        <Drawer
          anchor={"right"}
          open={open}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      ) : null}

      {openComment === true ? (
        <Drawer
          anchor={"right"}
          open={openComment}
          onClose={toggleCommentDrawer("right", false)}
        >
          {comments("right")}
        </Drawer>
      ) : null}

      {openMeeting === true ? (
        <Drawer
          anchor={"right"}
          open={openMeeting}
          onClose={toggleDrawerMeeting("right", false)}
        >
          {meetingPopup("right")}
        </Drawer>
      ) : null}

      {/* {comment ? (
        <Comments open={comment} closeComment={closeComment} obj={obj} />
      ) : null} */}
      <Toaster />
    </Card>
  );
};

export default ReportCard;
