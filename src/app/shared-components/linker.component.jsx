import React, { useState, useEffect, useMemo, useRef } from 'react';
import Formsy from 'formsy-react';
import Select from 'react-select';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import MenuItem from '@material-ui/core/MenuItem';
import jwtService from 'app/services/jwtService/jwtService.js'
import { checkResponse } from './Utils'

function Linker(props) {
  const token = "Bearer " + jwtService.getAccessToken();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const formRef = useRef(null);

  const getItems = () => {
    const allItemsQuery = fetch('/api' + props.of, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      }
    });

    const selectedItemsQuery = fetch('/api' + props.connection + '/filter/ProductId/' + props.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      }
    });

    Promise.all([allItemsQuery, selectedItemsQuery])
    .then(responses => {
      return Promise.all(responses.map(response => checkResponse(response)));
    })
    .then(items => {
      const [allItems, selectedItems] = items
      setItems(allItems);
      setSelectedItems(selectedItems);
      setLoading(false);
    })
    .catch(exception => {
      setLoading(false)
      setError(exception.message);
    })
  };

  const handleChange = (value, { action, removedValue, option }) => {
    if (action == 'remove-value') {
      fetch('/api' + props.connection + '/details/' + removedValue.refId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then((response) => {
        return checkResponse(response);
      })
      .then((json) => {

        getItems();
      })
      .catch((exception) => {
        // notification
      });
    } else if (action === 'select-option'){
      let body = {};

      body[props.source] = props.id;
      body[props.target] = option.refId;

      fetch('/api' + props.connection, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(body)
      })
      .then((response) => {
        return checkResponse(response);
      })
      .then((json) => {
        getItems();
      })
      .catch((exception) => {
        // notification
      });
    }

  };

  useEffect(getItems, []);

  const allItemsShip = useMemo(() => {
    return items.map(item => ({
      value: item[props.targetAccessor],
      label: item[props.targetTitle],
      refId: item.id
    }));
  }, [items])

  const selectedItemsShip = useMemo(() => {
    return selectedItems.map(item => ({
      value: item[props.connectionAccessor][props.targetAccessor],
      label: item[props.connectionAccessor][props.targetTitle],
      refId: item.id
    }));
  }, [selectedItems])



  return  <FuseChipSelect
              name="items"
              className="mb-16"
              placeholder={props.placeholder}
              value={selectedItemsShip}
              options={allItemsShip}
              isMulti
              isClearable={false}
              onChange={handleChange}
              variant='fixed'
              textFieldProps={{
                  label: props.label,
                  InputLabelProps: {
                      shrink: true
                  },
                  variant        : 'filled'
              }}
          />
}

export default Linker;
