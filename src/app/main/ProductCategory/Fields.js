import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Formsy from 'formsy-react';

export const DisplayFields = [{
        accessor: "category",
        Header: "Category",
        sortable: true
    }, {
        accessor: "type",
        Header: "Type",
        sortable: true
    }, {
        accessor: "description",
        Header: "Description",
        sortable: true
    }
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
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
  mycolumn: {
    flexBasis: '100%',
  },
  content: {
    flex: '1 0 auto'
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
	const classes = useStyles();

    return <Accordion defaultExpanded>
                <AccordionSummary expandIcon={ <ExpandMoreIcon /> } aria-controls="panel1c-content" id="panel1c-header">
                    <div className={classes.column}>
                        <Typography className={classes.heading}>General information</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <div className={classes.mycolumn}>
                        <div className="flex flex-col justify-center">
                    		<TextFieldFormsy className="mb-16" type="text" name="category" label="Category" 
                    		validations={{
                                minLength: 4,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4',
                            }}
                            required
                        	/>

                        	<TextFieldFormsy className="mb-16" type="text" name="type" label="Type" 
                    		validations={{
                                minLength: 4,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4',
                            }}
                            required
                        	/>

                        	<TextFieldFormsy className="mb-16" type="text" name="description" label="Description" 
                    		validations={{
                                minLength: 4,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4',
                            }}
                            required
                        	/>

                        	<CheckboxFormsy
                                className="my-16"
                                name="active"
                                value={true}
                                label="Active"
                            />
		                </div>
                    </div>
                </AccordionDetails>
            </Accordion>;
}

export default Fields;
