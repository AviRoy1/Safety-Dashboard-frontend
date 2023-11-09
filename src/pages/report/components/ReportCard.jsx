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
import openIcon from "./images/TagOpen.jpg";
import inprogress from "./images/TagsInProgress.jpg";
import editIcon from "./images/edit.png";
import frame from "./images/frame.jpg";
import messageIcon from "./images/messagesIcon.jpg";
import rightIcon from "./images/rightIcon.jpg";

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
const assign = [
  { label: "User 1", id: 1, mail: "user1@gmail.com" },
  { label: "User 2", id: 2, mail: "user2@gmail.com" },
  { label: "User 3", id: 3, mail: "user3@gmail.com" },
];

const ReportCard = ({ dummyReport }) => {
  const { message, error } = useSelector((state) => state.report);
  const [open, setOpen] = useState(false);
  const [statusCurrent, setStatusCurrent] = useState({
    label: dummyReport.status,
    id: 0,
  });
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
      },
      children: name.includes(" ")
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : `${name[0]}`,
    };
  }

  console.log(dummyReport);
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
  };
  const isLargeScreen = useMediaQuery("(min-width:768px)");

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
    maxWidth: isLargeScreen ? 641 : 320,
    height: isLargeScreen ? "200px" : "380px",
    // marginBottom: "16px",
    // marginRight: "30px",
    border: "1px solid var(--gray-200, #EAECEE)",
    background: "var(--base-background-white, #FFF)",
    borderRadius: "8px",
    // marginTop: "2px",
    margin: "12px",
    padding: "14px",
  };
  const mediaWidth = isLargeScreen ? 290 : 320;

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

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 340,
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
          backgroundColor: "#0D0D4B",
          color: "white",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <Typography
          style={{ marginLeft: "11px", fontSize: "34px", fontWeight: "bold" }}
        >
          Edit
        </Typography>
      </div>
      <Divider />
      <div style={{ marginTop: "20px", marginLeft: "10px" }}>
        <Stack style={{ marginLeft: "10px" }} flexDirection={"row"}>
          <img
            src={dummyReport.imagepath}
            alt="Report Image"
            width="100"
            height="55"
          />
          <div>
            <div style={{ marginLeft: "12px", marginTop: "0px" }}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                #{dummyReport._id.slice(-3)}
              </Typography>
            </div>
            <div style={{ marginLeft: "12px", marginTop: "6px" }}>
              <Typography variant="h9">
                {moment(dummyReport.createdAt).format("DD MMM YYYY hh:mm a")}
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
              style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.5)" }}
            >
              Location
            </Typography>
            <Typography>{dummyReport.location}</Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.5)" }}
            >
              Incident
            </Typography>
            <Typography>Driving</Typography>
          </Stack>
        </Stack>
        <Divider style={{ marginTop: "16px" }} />

        <div style={{ marginTop: "22px" }}>
          <Typography style={{ margin: "10px" }}>Status</Typography>
          <Autocomplete
            style={{ margin: "10px" }}
            disablePortal
            id="status"
            options={status}
            sx={{ width: 250 }}
            onChange={(event, value) => {
              setStatusCurrent(value);
            }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </div>
        <Typography style={{ margin: "10px", marginTop: "6px" }}>
          Tags
        </Typography>
        <Autocomplete
          style={{ margin: "10px" }}
          disablePortal
          id="tags"
          options={tags}
          sx={{ width: 250 }}
          onChange={(event, value) => {
            setTagCurrent(value);
          }}
          renderInput={(params) => <TextField {...params} label="Tag" />}
        />
        <Typography style={{ margin: "10px", marginTop: "6px" }}>
          Assign
        </Typography>
        <Autocomplete
          style={{ margin: "10px" }}
          disablePortal
          id="assign"
          options={assign}
          sx={{ width: 250 }}
          onChange={(event, value) => {
            setAssignCurrent(value);
          }}
          renderInput={(params) => <TextField {...params} label="Assign" />}
        />
      </div>
      <div style={{ marginTop: "100px" }}></div>
      <Divider />
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "15px" }}
      >
        <Button variant="contained" onClick={saveHandler}>
          Save
        </Button>
      </div>
    </Box>
  );

  const comments = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 340,
        position: "relative",
      }}
      role="presentation"
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#0D0D4B",
          color: "white",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <Typography
          style={{ marginLeft: "11px", fontSize: "34px", fontWeight: "bold" }}
        >
          Comments
        </Typography>
      </div>
      <Divider />
      <div style={{ marginTop: "20px", marginLeft: "10px" }}>
        <Stack style={{ marginLeft: "10px" }} flexDirection={"row"}>
          <img
            src={dummyReport.imagepath}
            alt="Report Image"
            width="100"
            height="55"
          />
          <div>
            <div style={{ marginLeft: "12px", marginTop: "0px" }}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                #{dummyReport._id.slice(-3)}
              </Typography>
            </div>
            <div style={{ marginLeft: "12px", marginTop: "6px" }}>
              <Typography variant="h9">
                {moment(dummyReport.createdAt).format("DD MMM YYYY hh:mm a")}
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
              style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.5)" }}
            >
              Location
            </Typography>
            <Typography>{dummyReport.location}</Typography>
          </Stack>
          <Stack direction={"column"}>
            <Typography
              style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.5)" }}
            >
              Incident
            </Typography>
            <Typography>Driving</Typography>
          </Stack>
        </Stack>
        <Divider style={{ marginTop: "16px" }} />

        {/* Display previous comments */}
        {dummyReport.comments &&
          dummyReport.comments.map((comment, index) => (
            <div key={index}>
              <div key={index} style={{ marginTop: 16 }}>
                <Stack flexDirection={"row"}>
                  <Avatar {...stringAvatar(String(comment.user))} />
                  <div style={{ marginLeft: 16 }}>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>
                      {comment.user}
                    </div>
                    <div style={{ fontSize: 12 }}>
                      {moment(comment?.time).format("DD MMM YYYY, hh:mm a")}
                    </div>
                  </div>
                </Stack>
                <div style={{ marginLeft: 56, marginTop: 8 }}>
                  {comment?.message}
                </div>
              </div>
              <Divider />
            </div>
          ))}

        <div style={{ marginTop: "16px" }}>
          <Stack
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
            flexDirection={"row"}
            alignItems="center"
          >
            <Avatar
              {...stringAvatar(String("User"))}
              style={{ marginRight: "3px" }}
            />
            <TextareaAutosize
              value={newComment}
              onChange={handleCommentChange}
              minRows={2}
              maxRows={4}
              placeholder="Add a new comment..."
              style={{ width: "100%", marginRight: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
            >
              Send
            </Button>
          </Stack>
        </div>
      </div>
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
              left: "0",
              position: "fixed",
              top: "0",
              width: "94px",
              position: "absolute",
            }}
          />
          <Typography
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              padding: "5px",
              color: "white",
              // backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          >
            {dummyReport.tags}
          </Typography>
        </div>
        {/* <Chip
          label={`${dummyReport.tags}`}
          color={dummyReport.tags === "Fake alert" ? "success" : "success"}
          // variant="outlined"
          style={{
            marginLeft: "-5px",
            position: "absolute",
            marginTop: 10,
            backgroundColor:
              dummyReport.tags === "Fake alert"
                ? "rgba(255, 106, 106, 0.7)"
                : dummyReport.tags === "Near miss"
                ? "rgba(252, 168, 79, 0.7)"
                : "rgba(132, 73, 250, 0.7)",
          }}
        /> */}

        <div
          className="frame"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginBottom: "10px",
            marginLeft: "2px",
            marginRight: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(28, 28, 28, 0.6)",
            backdropFilter: "none", // Set backdropFilter to 'none'
            borderRadius: "4px",
            gap: "5",
            // margin: "10px",
          }}
        >
          {/* <locationImage className="vuesax-outline" /> */}
          <img src={locationImage} />
          <div
            style={{
              color: "var(--theme-colorswhite)",
              fontFamily: "var(--paragraph-2-medium-font-family)",
              fontSize: "var(--paragraph-2-medium-font-size)",
              fontStyle: "var(--paragraph-2-medium-font-style)",
              fontWeight: "var(--paragraph-2-medium-font-weight)",
              letterSpacing: "var(--paragraph-2-medium-letter-spacing)",
              lineHeight: "var(--paragraph-2-medium-line-height)",
              /* marginTop: '-1px', */
              position: "relative",
              whiteSpace: "nowrap",
              // width: "fit-content",
              // marginLeft: "8px",
            }}
          >
            {dummyReport.location}
          </div>
        </div>

        <Chip
          color="primary"
          disabled={false}
          size="medium"
          variant="outlined"
          icon={<ZoomOutMapIcon />}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            marginTop: "4px",
            marginRight: "4px",
            backgroundColor: "rgba(241, 238, 236, 0.7)",
          }}
        />
      </CardMedia>
      <CardContent>
        <Stack direction="row" style={{ marginLeft: "6px" }}>
          <Box display={"flex"}>
            <Typography
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "32px",
              }}
            >
              #{dummyReport._id.slice(-4)}
            </Typography>
            {/* <Chip
              label={`${dummyReport.status}`}
              color={
                dummyReport.status === "Open"
                  ? "warning"
                  : dummyReport.status === "Resolved"
                  ? "success"
                  : "info"
              }
              variant="filled"
              style={{ marginLeft: "10px" }}
            /> */}

            <div style={{ marginTop: "-9px" }}>
              <img
                src={
                  dummyReport.status === "Resolved"
                    ? resolved
                    : dummyReport.status === "Open"
                    ? openIcon
                    : inprogress
                }
                style={{ margin: "8px" }}
              />
            </div>
            <IconButton
              style={{ marginLeft: "30px" }}
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
              style={{ marginLeft: "1px" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                {" "}
                <ListItemIcon>
                  <MailIcon /> {/* Display the MailIcon */}
                </ListItemIcon>{" "}
                Mail
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
        <Stack style={{ margin: "8px" }}>
          <div style={{ display: "flex", marginLeft: "6px" }}>
            <Typography
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              {moment(dummyReport.createdAt).format("DD MMM, hh:mm:ss")}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "14px",
              marginLeft: "8px",
              marginRight: "10px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CropFreeIcon fontSize="medium" />
              <Typography
                style={{
                  marginLeft: "2px",
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {"Speed limit"}
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
                  marginLeft: "2px",
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {dummyReport.assigned}
              </Typography>
            </div>
          </div>

          <div style={{ display: "flex", margin: "6px", marginTop: "10px" }}>
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
                <img src={rightIcon} />
              }
            >
              <Typography
                style={{
                  marginLeft: "6px",
                  marginTop: "2px",
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {dummyReport.comments && dummyReport.comments.length > 0
                  ? dummyReport.comments.length + "Comments"
                  : "Add Comments"}
              </Typography>
            </Button>
          </div>
        </Stack>
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

      {/* {comment ? (
        <Comments open={comment} closeComment={closeComment} obj={obj} />
      ) : null} */}
      <Toaster />
    </Card>
  );
};

export default ReportCard;
