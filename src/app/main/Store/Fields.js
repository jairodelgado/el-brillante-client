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
import Gallery from 'app/shared-components/gallery.jsx'
import AddressFields, { DisplayFields as AddressDisplayFields } from '../Address/Fields'
import ItemBalanceFields, { DisplayFields as ItemBalanceDisplayFields } from '../ItemBalance/Fields'
import PhotoFields, { DisplayFields as PhotoDisplayFields } from '../Photo/Fields'

export const DisplayFields = [{
        accessor: "name",
        Header: "Name",
        sortable: true
    }, {
        accessor: "email",
        Header: "Email",
        sortable: true
    }, {
        accessor: "languaje",
        Header: "Languaje",
        sortable: true
    }, {
        accessor: "domain",
        Header: "Domain",
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

function AddressHeader(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Store Addresses</Typography>
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
                    <Typography className={classes.heading}>Store Addresses</Typography>   
                </div>
            </AccordionSummary>;
}

function AddressBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <div className={classes.content}>
                    <Archive of={'/addresses/filter/StoreId/' + routeParams.id } details={'/addresses/for-store/' + routeParams.id} delete={'/addresses'} display={AddressDisplayFields} searchText={props.searchText} />
                </div>;
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the store general information before editing the store addresses.</div>
}

function AddressFooter(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Divider />
            <AccordionActions>
                <Button component={Link} to={ '/addresses/create/for-store/' + routeParams.id } size="small" color="primary" >
                    Add new address
                </Button>
            </AccordionActions>
        </>
    }

    return <></>;
}

function AddressInformation() {
    const routeParams = useParams();
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const onSearch = (event) => {
        setSearchText(event.target.value);
    };

    return <Accordion>
                <AddressHeader onSearch={ onSearch }/>
                <AccordionDetails className={classes.details}>
                    <AddressBody searchText={searchText} />
                </AccordionDetails>
                <AddressFooter />
            </Accordion>;
}

function BalanceHeader(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Store Balance</Typography>
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
                    <Typography className={classes.heading}>Store Balance</Typography>   
                </div>
            </AccordionSummary>;
}


function BalanceBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <div className={classes.content}>
                    <Archive of={'/item-balances/filter/StoreId/' + routeParams.id } details={'/item-balances/for-store/' + routeParams.id} delete={'/item-balances'} display={ItemBalanceDisplayFields} searchText={props.searchText} />
                </div>;
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the store general information before editing the store balances.</div>
}

function BalanceFooter(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Divider />
            <AccordionActions>
                <Button component={Link} to={ '/item-balances/create/for-store/' + routeParams.id } size="small" color="primary" >
                    Add new Item Balance
                </Button>
            </AccordionActions>
        </>
    }

    return <></>;
}

function BalanceInformation() {
    const routeParams = useParams();
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const onSearch = (event) => {
        setSearchText(event.target.value);
    };

    return <Accordion>
                <BalanceHeader onSearch={ onSearch }/>
                <AccordionDetails className={classes.details}>
                    <BalanceBody searchText={searchText} />
                </AccordionDetails>
                <BalanceFooter />
            </Accordion>;
}


function PhotoHeader(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Store Photos</Typography>
                    </div>
                    <div className={classes.column} />
                    <div className={classes.column} />
                </AccordionSummary>;
    }

    return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Store Photos</Typography>   
                </div>
            </AccordionSummary>;
}

function PhotoBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <div className={classes.mycolumn}>
                    <Gallery of={'/photos/filter/StoreId/' + routeParams.id } details={'/photos/for-store/' + routeParams.id} delete={'/photos'} />
                </div>;
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the store general information before editing the store photos.</div>
}

function PhotoFooter(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Divider />
            <AccordionActions>
                <Button component={Link} to={ '/photos/create/for-store/' + routeParams.id } size="small" color="primary" >
                    Add new photo
                </Button>
            </AccordionActions>
        </>
    }

    return <></>;
}

function PhotoInformation() {
    const routeParams = useParams();
    const classes = useStyles();
    return <Accordion>
                <PhotoHeader/>
                <AccordionDetails className={classes.details}>
                    <PhotoBody />
                </AccordionDetails>
                <PhotoFooter />
            </Accordion>;
}


function GeneralInformation(props) {
    const routeParams = useParams();
    const classes = useStyles();

    return <Accordion>
                <AccordionSummary expandIcon={ <ExpandMoreIcon /> } aria-controls="panel1c-content" id="panel1c-header">
                    <div className={classes.column}>
                        <Typography className={classes.heading}>General information</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>

                    <div className={classes.mycolumn}>
                        <div className="flex flex-col justify-center">
                            <TextFieldFormsy className="mb-16" type="text" name="name" label="Name" 
                            validations={{
                                minLength: 4,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 4',
                            }}
                            required
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="email" label="Email" 
                            validations={{
                                isEmail: true
                            }}
                            validationErrors={{
                                isEmail: "This is not a valid email"
                            }}
                            required
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="languaje" label="Languaje" 
                            validations={{
                                minLength: 1,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 1',
                            }}
                            required
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="domain" label="Domain" 
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
            <AddressInformation />
            <BalanceInformation />
            <PhotoInformation />
		</div>
	);
}

export default Fields;
