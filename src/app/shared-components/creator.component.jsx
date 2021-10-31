import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';
import Formsy from 'formsy-react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService/jwtService.js'
import { checkResponse } from './Utils'
import ErrorPage from './error.component.jsx';

function Creator (props) {
  const token = "Bearer " + jwtService.getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const disableButton = () => {
      setIsFormValid(false);
  };

  const enableButton = () => {
      setIsFormValid(true);
  };

  const handleSubmit = (item) => {
    setLoading(true);

    fetch('/api' + props.of, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(item)
    })
    .then((response) => {
      return checkResponse(response);
    })
    .then((json) => {
      dispatch(showMessage({
          message: 'Item successfully created.',
          autoHideDuration: 6000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }
        })
      );

      props.history.push((props.saveRef || props.of) + (props.edition ? `/details/${json.id}` : ''));
    })
    .catch((exception) => {
      setLoading(false);
      setError(exception.message);
    });
  }

  if(loading) {
    return <div className="progress"><div className="indeterminate"></div></div>;
  }

  if(error) {
    return <ErrorPage>{error}</ErrorPage>;
  }

  return (
      <Formsy 
        ref={formRef}
        onValidSubmit={handleSubmit} 
        onValid={enableButton}
        onInvalid={disableButton}
        className="flex flex-col justify-center">

        {props.children}

        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mx-auto mt-32 mb-80"
            disabled={!isFormValid}>
            Save
          </Button>
          <Button component={Link} to={ props.cancelRef || props.saveRef || props.of } className="mx-auto mt-32 mb-80">Cancel</Button>
        </div>
      </Formsy>
  );
}

export default withRouter(Creator);
