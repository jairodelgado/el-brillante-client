import React, { useState, useEffect, useMemo } from 'react';
import { SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import jwtService from 'app/services/jwtService/jwtService.js'
import { checkResponse } from './Utils'

function Selector(props) {
  const token = "Bearer " + jwtService.getAccessToken();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = () => {
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
      setError(exception.message);
      setLoading(false)
    })
  };

  useEffect(getItems, []);
  const menuItems = useMemo(() => {
    return items.map(item => <MenuItem key={ item.id } value={ item.id }>{ item[props.accessor] }</MenuItem>)
  }, [items]);

  if (loading || error) {
    return <SelectFormsy
            className="mb-16"
            name={props.name} 
            label={props.label} 
            value="none" 
            disabled>
            { error ? <MenuItem>Error fetching the items : { error }</MenuItem> : <MenuItem>Loading...</MenuItem>   }
           </SelectFormsy>;
  }

  return  <SelectFormsy
            className="mb-16"
            name={props.name} 
            label={props.label} 
            value="none"
            required >
            { menuItems }
         </SelectFormsy>;
}

export default Selector;
