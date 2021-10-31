import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import jwtService from 'app/services/jwtService/jwtService.js'
import ErrorPage from './error.component.jsx';
import { checkResponse } from './Utils'

function Picture(props) {
  const token = "Bearer " + jwtService.getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(true);  
  const [URL, setURL] = useState("");

  const loadPicture = () => {
    setLoading(true);

    fetch('/api/photos/details/' + props.of, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      }
    })
    .then((response) => {
      return checkResponse(response);
    })
    .then((json) => {
      setURL(json.url);
      setLoading(false);
    })
    .catch((exception) => {
      setLoading(false);
      setError(exception.message);
    });
  };

  const fileChange = (event) => {
    if (event.target.files.length === 1) {
      var data = new FormData();
      
      setSaved(false)
      data.append('photo', event.target.files[0])

      fetch('/api/picture/' + props.of, {
        method: 'POST',
        body: data,
        'Content-Type': 'multipart/form-data',
      }).then((response) =>{
        setSaved(true)
      })
    }
  }

  if(!props.of) {
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="caption">
          Select photo: (Please, complete and save the picture information before uploading.)
        </Typography>
      </Grid>
    </Grid>
  }

  if(loading) {
    return <div className="progress"><div className="indeterminate"></div></div>;
  }

  return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="caption">
          Select photo: {saved ? "" : "(Saving the file, please wait)"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <input type='file' onChange={fileChange} />
      </Grid>
      <Grid item xs={12}>
        {error}
      </Grid>
    </Grid>
}

export default Picture