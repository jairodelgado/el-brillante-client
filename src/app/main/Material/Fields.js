import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
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
import PriceSettingFields, { DisplayFields as PriceSettingDisplayFields } from '../PriceSetting/Fields'

export const DisplayFields = [{
        accessor: "name",
        Header: "Name",
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

function PriceSettingHeader(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Material Price Settings</Typography>
                    </div>
                    <div className={classes.column} />
                    <div className={classes.column}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                              <SearchIcon />
                            </div>
                            <InputBase
                              placeholder="Search..."
                              classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                              }}
                              inputProps={{ 'aria-label': 'search' }}
                              value={props.searchText}
                              onClick={(event) => {
                                event.stopPropagation();
                              }}
                              onChange={(event) => {
                                event.stopPropagation();
                                props.onSearch(event);
                              }}
                            />
                        </div>
                    </div>
                </AccordionSummary>;
    }

    return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Price Settings</Typography>   
                </div>
            </AccordionSummary>;
}

function PriceSettingBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <div className={classes.content}>
                    <Archive of={'/price-settings/filter/MaterialId/' + routeParams.id } details={'/price-settings/for-material/' + routeParams.id} delete={'/price-settings'} display={PriceSettingDisplayFields} searchText={props.searchText} />
                </div>;
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the material general information before editing the material price settings.</div>
}

function PriceSettingFooter(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Divider />
            <AccordionActions>
                <Button component={Link} to={ '/price-settings/create/for-material/' + routeParams.id } size="small" color="primary" >
                    Add new Price Setting
                </Button>
            </AccordionActions>
        </>
    }

    return <></>;
}

function PriceSettingInformation() {
    const routeParams = useParams();
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const onSearch = (event) => {
        setSearchText(event.target.value);
    };

    return <Accordion defaultExpanded={ routeParams.id ? true : false }>
                <PriceSettingHeader onSearch={ onSearch }/>
                <AccordionDetails className={classes.details}>
                    <PriceSettingBody searchText={searchText} />
                </AccordionDetails>
                <PriceSettingFooter />
            </Accordion>;
}

function GeneralInformation(props) {
    const routeParams = useParams();
    const classes = useStyles();

    return <Accordion defaultExpanded>
                <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>General information</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <div className={classes.mycolumn}>
                        <div className="flex flex-col justify-center">
                            <TextFieldFormsy className="mb-16" type="text" name="name" label="Name" 
                            validations={{
                                minLength: 1,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 1',
                            }}
                            required
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="description" label="Description" 
                            validations={{
                                minLength: 1,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 1',
                            }}
                            required
                            />
                            <CheckboxFormsy className="my-16" name="active" value={true} label="Active" />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>;
}

function Fields() {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <GeneralInformation />
            <PriceSettingInformation />
		</div>
	);
}

export default Fields;
