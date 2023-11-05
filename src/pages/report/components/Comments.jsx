import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Comments = ({ open, closeComment, obj }) => {
  return (
    <>
      <Dialog
        // aria-labelledby="customized-dialog-title"
        onClose={closeComment}
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: "#0D0D4B", color: "white" }}
          id="customized-dialog-title"
        >
          Comments
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeComment}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <div>
              <img
                src={obj.image}
                alt="Report Image"
                width="180"
                height="100"
              />
            </div>
            <Stack
              style={{ marginLeft: "10px" }}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <div style={{ margin: "8px" }}>
                <Typography variant="h5">#{obj.id}</Typography>
              </div>
              <div style={{ margin: "2px" }}>
                <Typography variant="h8">{obj.date}</Typography>
              </div>
              <div style={{ margin: "2px" }}>
                <Typography variant="h8"> {obj.location}</Typography>
              </div>
            </Stack>
          </Stack>
          <Divider light />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeComment}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Comments;
