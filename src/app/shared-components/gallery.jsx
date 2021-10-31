import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import FuseUtils from '@fuse/utils';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService/jwtService.js'
import { checkResponse } from './Utils'
import ErrorPage from './error.component.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function MyCard(props) {
  return <Card>
    <CardMedia
      component="img"
      height="4"
      image={props.url}
      alt={props.alt}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.title}
      </Typography>
      <Typography variant="body2">
        {props.description}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton component={Link} to={( props.details || props.of ) + "/details/" + props.itemId}><Icon>tune</Icon></IconButton> 
      <IconButton onClick={ev => props.onRemove(props.itemId)}> <Icon>delete</Icon></IconButton> 
    </CardActions>
  </Card>;
}

function Gallery (props) {
  const token = "Bearer " + jwtService.getAccessToken();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = () => {
    setLoading(true);
    fetch('/api' + props.of, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      }
    }) 
    .then(response => {
      return checkResponse(response);
    })
    .then(json => {
      setItems(json);
      setLoading(false);
    })
    .catch(exception => {
      setLoading(false)
      setError(exception.message);
    })
  };

  const deleteItem = (id) => {
    setLoading(true);
    fetch('/api' + (props.delete || props.of) + '/details/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      },
    })
    .then((response) => {
      return checkResponse(response);
    })
    .then((json) => {
      dispatch(showMessage({
          message: 'Item successfully deleted.',
          autoHideDuration: 6000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }
        })
      );

      getItems();
    })
    .catch((exception) => {
      setLoading(false);
      setError(exception.message);
    });
  };

  useEffect(getItems, []);

  
  if(loading) {
    return (
      <FuseAnimate animation={{ translateX: [0, '100%'], opacity   : [1, 0] }} duration={200} delay={100}>
        <div className={classes.root}>
          <LinearProgress />
        </div>
      </FuseAnimate>);
  }

  if(error) {
    return <ErrorPage>{error}</ErrorPage>;
  }

  if(items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
         There is nothing to show here.
      </div>
    );
  }

  var cards = items.map(item => {
    return <Grid key={item.id}  item xs={3}><MyCard onRemove={deleteItem} itemId={item.id} url={item.url} details={props.details} of={props.of} title={item.title} description={item.description}/></Grid>;
  });


  return <Grid container spacing={2}>{cards}</Grid>;
}

export default Gallery;
