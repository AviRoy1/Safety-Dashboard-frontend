import { server } from "../store";
import axios from "axios";

export const fetchReports = () => async (dispatch) => {
  try {
    dispatch({ type: "reportfetchRequest" });
    const { data } = await axios.get(`${server}/report/allreports`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: "reportfetchSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "reportfetchFailed",
      payload: error.response.data.message,
    });
  }
};
export const editReport =
  (id, statusCurrent, tagCurrent, assignCurrent) => async (dispatch) => {
    try {
      dispatch({ type: "reportfetchRequest" });
      const { data } = await axios.post(
        `${server}/report/editreport`,
        { id, statusCurrent, tagCurrent, assignCurrent },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch({ type: "reportfetchSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "reportfetchFailed",
        payload: error.response.data.message,
      });
    }
  };

export const addNewComment = (id, comment) => async (dispatch) => {
  try {
    dispatch({ type: "addCommentRequest" });
    const { data } = await axios.post(
      `${server}/report/addComment`,
      { id, comment },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: "addCommentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addCommentFailed",
      payload: error.response.data.message,
    });
  }
};

export const findReports =
  (curLocation, curStatus, curTag, curViolation) => async (dispatch) => {
    try {
      dispatch({ type: "reportfetchRequest" });
      const { data } = await axios.post(
        `${server}/report/find-reports `,
        { curLocation, curStatus, curTag, curViolation },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch({ type: "reportfetchSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "reportfetchFailed",
        payload: error.response.data.message,
      });
    }
  };
export const fetchTags = () => async (dispatch) => {
  try {
    dispatch({ type: "tagfetchRequest" });
    const { data } = await axios.get(`${server}/report/tags`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "tagfetchSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "tagfetchFailed",
      payload: error.response.data.message,
    });
  }
};
export const fetchLocations = () => async (dispatch) => {
  try {
    dispatch({ type: "locationfetchRequest" });
    const { data } = await axios.get(`${server}/report/locations`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: "locationfetchSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "locationfetchFailed",
      payload: error.response.data.message,
    });
  }
};
export const fetchStatus = () => async (dispatch) => {
  try {
    dispatch({ type: "statusfetchRequest" });
    const { data } = await axios.get(`${server}/report/status`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: "statusfetchSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "statusfetchFailed",
      payload: error.response.data.message,
    });
  }
};
export const fetchViolationtypes = () => async (dispatch) => {
  try {
    dispatch({ type: "violationTypefetchRequest" });
    const { data } = await axios.get(`${server}/report/violationtypes`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: "violationTypefetchSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "violationTypefetchFailed",
      payload: error.response.data.message,
    });
  }
};
