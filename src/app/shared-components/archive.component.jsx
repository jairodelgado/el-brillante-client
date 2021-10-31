import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import FuseUtils from '@fuse/utils';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService/jwtService.js'
import { checkResponse } from './Utils'
import Table from './table.jsx'
import ErrorPage from './error.component.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Archive (props) {
  const token = "Bearer " + jwtService.getAccessToken();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);

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

  const columns = useMemo(() => {
    const cols = props.display;

    if (props.display[props.display.length - 1].id !== 'control-buttons') {
      cols.push({
        id: 'control-buttons',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <Box className="flex" justifyContent="flex-end">
            <IconButton component={Link} to={( props.details || props.of ) + "/details/" + row.original.id}><Icon>tune</Icon></IconButton> 
            <IconButton onClick={ev => deleteItem(row.original.id)}> <Icon>delete</Icon></IconButton> 
          </Box>
        )
      });
    }

    return cols;
  }, [props.display]);


  useEffect(() => {
    function getFilteredArray(array, text) {
      if (!text || text.length === 0) {
        return array;
      }
      return FuseUtils.filterArrayByString(array, text);
    }

    if (items) {
      setFilteredItems(getFilteredArray(items, props.searchText));
    }
  }, [items, props.searchText]);
  
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

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
         There is nothing to show here.
      </div>
    );
  }

  return <Table columns={columns} data={filteredItems} onRowClick={(ev, row) => {
            // redirect if necessary to update item
          }}/>;
}

export default Archive;
