import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BASEURL, USERS, ANNOTATORS, PROJECTS } from "../Url";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddAnnotator({ getAllAnnotators }) {
  let { projectId } = useParams();
  const allAnnotatorsUrl = `${BASEURL + ANNOTATORS}`;
  const addUserUrl = `${BASEURL + PROJECTS}/${projectId + USERS}`;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    handleDropDown();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [allAnnotators, setAllAnnotators] = useState([]);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleDropDown = async () => {
    await axios({
      method: "get",
      url: allAnnotatorsUrl,
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        setAllAnnotators(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        setError(response.message);
        toast.error(response.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSave = async () => {
    if (userId) {
      await axios({
        method: "post",
        url: addUserUrl,
        data: {
          projectId,
          userId,
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          handleClose();
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          toast.error(response.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          setError(response.response.data.message);
        });
      getAllAnnotators();
    } else {
      toast.error("Please select one option", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          size="large"
          sx={buttonStyle}
        >
          Add Annotator
        </Button>
        <Typography sx={{ color: "red" }}>{error}</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  User Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={userId}
                  onChange={handleChange}
                  autoWidth
                  label="User Id"
                >
                  {allAnnotators ? (
                    allAnnotators.map((annotator, index) => {
                      return (
                        <MenuItem key={index} value={annotator.id}>
                          {annotator.fullName + " (" + annotator.id + ")"}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem onClick={() => handleClose()} value="">
                      <em>None</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                onClick={handleSave}
                variant="contained"
                size="large"
                sx={buttonStyle}
              >
                Save
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                size="large"
                sx={buttonStyle}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

const buttonStyle = {
  background: "#2FC309",
  textTransform: "none",
  fontSize: "1.5rem",
  padding: "0.4rem 2.8rem",
  marginBottom: "0.7rem",
  marginTop: "1rem",
};

export default AddAnnotator;
