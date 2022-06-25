import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./workshop.css";
import { Paper, TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Skype from "../shared/icons/Skype";
import Duo from "../shared/icons/Duo";
import Meet from "../shared/icons/Meet";
// import { useNavigate } from "react-router-dom"
import axios from 'axios';


const Input = styled("input")({
  display: "none",
});


const myData = [
  { id: 1, value: '1' },
  { id: 2, value: '2' },
];

const myData2 = [
  { id: 1, value: 'online' },
  { id: 2, value: 'offline' },
];

const iniUserData = {
  uploadImage: null,
  eventTitle: "",
  eventCategory: "",
  eventSubCategory: "",
  eventPlatform: "",
  eventName: "",
  eventDuration: "",
  language: "",
  eventUrl: "",
  eventText: "",
  eventWorkshop: ""
}

function Workshop() {
  const [formValues, setFormValues] = useState(iniUserData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const navigate = useNavigate()

  const { Option } = Select;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };


  const validate = (values) => {
    let errors = {};
    const regex = /^[a-zA-Z]/;
    const emailRegx = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    const dobRegx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    const passRegx = /^[#\w@_-]{8,20}$/;
    const Numeric = /^\d+$/;
    const phone = /^[0-9]{10}$/;



    if (!values.eventTitle) {
      errors.eventTitle = "Cannot be blank";
    } else if (!regex.test(values.eventTitle)) {
      errors.eventTitle = "Invalid eventTitle format";
    }

    if (!values.eventCategory) {
      errors.eventCategory = "Cannot be blank";
    }

    if (!values.eventSubCategory) {
      errors.eventSubCategory = "Cannot be blank";
    } else if (!Numeric.test(values.eventSubCategory)) {
      errors.eventSubCategory = "Must Be Numeric"
    }

    if (!values.eventPlatform) {
      errors.eventPlatform = "Cannot be blank";
    }


    if (!values.eventName) {
      errors.eventName = "Cannot be blank";
    } else if (!regex.test(values.eventName)) {
      errors.eventName = "Invalid eventName format";
    }


    if (!values.eventDuration) {
      errors.eventDuration = "Cannot be blank";
    }


    if (!values.language) {
      errors.language = "Cannot be blank";
    } else if (!regex.test(values.language)) {
      errors.language = "Invalid language format";
    }


    if (!values.eventUrl) {
      errors.eventUrl = "Cannot be blank";
    }

    if (!values.eventText) {
      errors.eventText = "Cannot be blank";
    } else if (!regex.test(values.eventText)) {
      errors.eventText = "Invalid eventText format";
    }

    if (!values.eventWorkshop) {
      errors.eventWorkshop = "Cannot be blank";
    } else if (!regex.test(values.eventWorkshop)) {
      errors.eventWorkshop = "Invalid eventWorkshop format";
    }

    return errors;
  };


  function handleChangeUpload(e) {
    console.log(e.target.files);
    // setFormValues(URL.createObjectURL(e.target.files[0]));
    setFormValues({
      ...formValues,
      uploadImage: (URL.createObjectURL(e.target.files[0]))

    })
    console.log(formValues.uploadImage)
  }




  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      createWorkShop();
    }
  }, [formErrors]);


  const createWorkShop = async () => {

    let create = await axios.post(`https://api.eduglade.com/api/AddEditDeleteEvent`, formValues)
    if (create && create.status === true) {
      // navigate.push("/");
    } else {
      console.log("somthing Wrong")
    }
    // .then((res) => {
    //   console.log(res)
    // })

    return create
  }

  return (
    <div>
      <span className="Workshop__Title">Add New Workshop</span>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Paper>
          <div style={{ padding: 10 }}>
            <form name="myform" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p className="Image__Title">Upload Image*</p>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    className="Upload__btn"
                  >
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleChangeUpload}

                      />
                      <Button
                        variant="contained"
                        component="span"
                        className="buttonStyle"
                      >
                        Select File
                      </Button>
                    </label>

                    <div className="preview">
                      <img src={formValues.uploadImage} className="preview" />
                    </div>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="eventTitle"
                    label="Event Title"
                    name="eventTitle"
                    error={formErrors.eventTitle && true}
                    value={formValues.eventTitle}
                    onChange={handleChange}
                    className={formErrors.eventTitle && "input-error"}
                    variant="standard"
                    placeholder="Enter Event Title"
                    fullWidth
                  // 
                  />
                  {formErrors.eventTitle && (
                    <span className="error">{formErrors.eventTitle}</span>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Event Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="eventCategory"
                      error={formErrors.eventCategory && true}
                      value={formValues.eventCategory}
                      onChange={handleChange}
                      className={formErrors.eventCategory && "input-error"}
                      label="Event Category"
                    >

                      {myData.map((ele) => (
                        <MenuItem key={ele.id} value={ele.value}>{ele.value}</MenuItem>
                      ))}

                      {/* <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem> */}
                    </Select>
                  </FormControl>
                  {formErrors.eventCategory && (
                    <span className="error">{formErrors.eventCategory}</span>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="standard-basic"
                    label="Event Sub Category"
                    name="eventSubCategory"
                    error={formErrors.eventSubCategory && true}
                    value={formValues.eventSubCategory}
                    onChange={handleChange}
                    className={formErrors.eventSubCategory && "input-error"}
                    placeholder="IT Certifications"
                    variant="standard"
                    fullWidth

                  />
                  {formErrors.eventSubCategory && (
                    <span className="error">{formErrors.eventSubCategory}</span>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <div className="Tiket__Title">Ticket Manager :</div>

              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl
                    variant="standard"
                    sx={{ minWidth: "100%" }}
                    style={{ height: "48px" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label" >
                      Event Platform
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="eventPlatform"
                      error={formErrors.eventPlatform && true}
                      value={formValues.eventPlatform}
                      onChange={handleChange}
                      className={formErrors.eventPlatform && "input-error"}
                      label="Event Platform"

                    >
                      {myData2.map((item) => (
                        <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>
                      ))}

                      {/* <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem> */}
                    </Select>
                  </FormControl>
                  {formErrors.eventPlatform && (
                    <span className="error">{formErrors.eventPlatform}</span>
                  )}
                </Grid>

                <Grid item xs={4}>
                  <span className="Event__Platform">Event Platform*</span>
                  <div style={{ margin: "5px", display: "flex" }}>
                    <button className="Skype__icon">
                      <Skype />
                    </button>

                    <button className="Duo__Icon">
                      <Duo />
                    </button>

                    <button className="Meet__Icon">
                      <Meet />
                    </button>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <TextField
                    id="standard-basic"
                    label="Artist Name"
                    variant="standard"
                    name="eventName"
                    error={formErrors.eventName && true}
                    value={formValues.eventName}
                    onChange={handleChange}
                    className={formErrors.eventName && "input-error"}
                    placeholder="Enter"
                    fullWidth

                  />
                  {formErrors.eventName && (
                    <span className="error">{formErrors.eventName}</span>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="standard-basic"
                    label="Event Duration"
                    variant="standard"
                    name="eventDuration"
                    error={formErrors.eventDuration && true}
                    value={formValues.eventDuration}
                    onChange={handleChange}
                    className={formErrors.eventDuration && "input-error"}
                    placeholder="Enter"
                    fullWidth

                  />
                  {formErrors.eventDuration && (
                    <span className="error">{formErrors.eventDuration}</span>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="standard-basic"
                    label="Language"
                    variant="standard"
                    name="language"
                    error={formErrors.language && true}
                    value={formValues.language}
                    onChange={handleChange}
                    className={formErrors.language && "input-error"}
                    placeholder="Enter Event Title"
                    fullWidth

                  />
                  {formErrors.language && (
                    <span className="error">{formErrors.language}</span>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <TextField
                    id="standard-basic"
                    label="Enter Video URL"
                    variant="standard"
                    placeholder="Enter"
                    name="eventUrl"
                    error={formErrors.eventUrl && true}
                    value={formValues.eventUrl}
                    onChange={handleChange}
                    className={formErrors.eventUrl && "input-error"}
                    fullWidth

                  />
                  {formErrors.eventUrl && (
                    <span className="error">{formErrors.eventUrl}</span>
                  )}
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <span>Disclaimer Text</span>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    name="eventText"
                    style={{ width: 480 }}
                    error={formErrors.eventText && true}
                    value={formValues.eventText}
                    onChange={handleChange}
                    className={(formErrors.eventText && "input-error", "Text")}
                  />
                  {formErrors.eventText && (
                    <span className="error">{formErrors.eventText}</span>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <span>About Workshop</span>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    style={{ width: 480 }}
                    name="eventWorkshop"
                    error={formErrors.eventWorkshop && true}
                    value={formValues.eventWorkshop}
                    onChange={handleChange}
                    className={(formErrors.eventWorkshop && "input-error", "Text")}
                  />
                  {formErrors.eventText && (
                    <span className="error">{formErrors.eventWorkshop}</span>
                  )}
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>

              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={4}>
                  <Button type="submit" variant="contained" className="buttonStyle">Save Workshop</Button>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
              </Grid>


            </form>
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default Workshop;
