import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Archive from 'app/shared-components/archive.component.jsx'
import Selector from 'app/shared-components/selector.component.jsx'

export const DisplayFields = [{
        accessor: "Item.name",
        Header: "Item Name",
        sortable: true
    },{
        accessor: "Item.number",
        Header: "Item Number",
        sortable: true
    }, {
        accessor: "allocated",
        Header: "Allocated",
        sortable: true
    }, {
        accessor: "damaged",
        Header: "Damaged",
        sortable: true
    }, {
        accessor: "inventoryBalance",
        Header: "Inventory Balance",
        sortable: true
    }, {
        accessor: "inventoryLocation",
        Header: "Inventory Location",
        sortable: true
    }, {
        accessor: "onOrder",
        Header: "On Order",
        sortable: true
    }
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));


function Fields() {
    const routeParams = useParams();
    const classes = useStyles();

    return ( 
    <>
        <div className="flex flex-col justify-center">
            <Selector of="/items" accessor="name" label="Item" name="ItemId" select />

            <TextFieldFormsy className="mb-16" type="text" name="allocated" label="Allocated" 
            validations={{
                isNumeric: true
            }}
            validationErrors={{
                isNumeric: 'Please, choose a number.',
            }}
            required
            />

            <TextFieldFormsy className="mb-16" type="text" name="damaged" label="Damaged" 
            validations={{
                isNumeric: true
            }}
            validationErrors={{
                isNumeric: 'Please, choose a number.',
            }}
            required
            />

            <TextFieldFormsy className="mb-16" type="text" name="inventoryBalance" label="Inventory Balance" 
            validations={{
                isNumeric: true
            }}
            validationErrors={{
                isNumeric: 'Please, choose a number.',
            }}
            required
            />

            <TextFieldFormsy className="mb-16" type="text" name="inventoryLocation" label="Inventory Location" 
            validations={{
                minLength: 1,
            }}
            validationErrors={{
                minLength: 'Min character length is 1',
            }}
            required
            />

            <TextFieldFormsy className="mb-16" type="text" name="commited" label="Commited" 
            disabled
            />

            <TextFieldFormsy className="mb-16" type="text" name="onOrder" label="On Order" 
            disabled
            />

            <TextFieldFormsy className="mb-16" type="text" name="unitCost" label="Unit Cost" 
            disabled
            />

            <CheckboxFormsy className="my-16" name="active" value={true} label="Active" />
        </div>
    </>);
}

export default Fields;
