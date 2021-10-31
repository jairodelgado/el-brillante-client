import { Link, useParams } from 'react-router-dom';
import { addValidationRule } from 'formsy-react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
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
        accessor: "Material.name",
        Header: "Material name",
        sortable: true
    }, { 
        accessor: "compositionPercent",
        Header: "Composition Percent",
        sortable: true
    }, {
        accessor: "weight",
        Header: "Weight",
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

addValidationRule('isPercent', function (values, value) {
  return Number(value) >=0 && Number(value) <= 100;
});


function Fields() {
    const routeParams = useParams();
    const classes = useStyles();

    return ( 
    <>
        <div className="flex flex-col justify-center">
            <Selector of="/materials" accessor="name" label="Material" name="MaterialId" select required />

            <TextFieldFormsy className="mb-16" type="text" name="compositionPercent" label="Composition Percent" 
            validations={{
                isNumeric: true,
                isPercent: true
            }}
            validationErrors={{
                isNumeric: 'You must provide a number.',
                isPercent: 'You must provide a number between 0 and 100 to be considered a valid percent value.'
            }}
            required
            />

            <TextFieldFormsy className="mb-16" type="text" name="weight" label="Weight"
            defaultValue='0'
            InputProps={{
               startAdornment: <InputAdornment position="start">Kg</InputAdornment>
            }}
            validations={{
                isNumeric: true,
            }}
            validationErrors={{
                minLength: 'You must provide a number.',
            }}
            required
            />

        </div>
    </>);
}

export default Fields;
