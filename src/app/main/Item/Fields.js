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
import InputAdornment from '@material-ui/core/InputAdornment';
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
import ItemMaterialFields, { DisplayFields as ItemMaterialDisplayFields } from '../ItemMaterial/Fields'
import PhotoFields, { DisplayFields as PhotoDisplayFields } from '../Photo/Fields'

export const DisplayFields = [{
        accessor: "name",
        Header: "Name",
        sortable: true
    }, {
        accessor: "number",
        Header: "Number",
        sortable: true
    }, {
        accessor: "uom",
        Header: "UOM",
        sortable: true
    }, {
        accessor: "brand",
        Header: "Brand",
        sortable: true
    }, {
        accessor: "defaultCost",
        Header: "Default Cost",
        sortable: true
    },, {
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

function MaterialHeader(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Materials</Typography>
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
                    <Typography className={classes.heading}>Materials</Typography>   
                </div>
            </AccordionSummary>;
}

function MaterialBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <div className={classes.content}>
                    <Archive of={'/item-materials/filter/ItemId/' + routeParams.id } details={'/item-materials/for-item/' + routeParams.id} delete={'/item-materials'} display={ItemMaterialDisplayFields} searchText={props.searchText} />
                </div>;
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the item general information before editing the materials.</div>
}

function MaterialFooter(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Divider />
            <AccordionActions>
                <Button component={Link} to={ '/item-materials/create/for-item/' + routeParams.id } size="small" color="primary" >
                    Add new Material
                </Button>
            </AccordionActions>
        </>
    }

    return <></>;
}

function MaterialInformation() {
    const routeParams = useParams();
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const onSearch = (event) => {
        setSearchText(event.target.value);
    };

    return <Accordion>
                <MaterialHeader onSearch={ onSearch }/>
                <AccordionDetails className={classes.details}>
                    <MaterialBody searchText={searchText} />
                </AccordionDetails>
                <MaterialFooter />
            </Accordion>;
}


function PhotoHeader(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Item Photos</Typography>
                    </div>
                    <div className={classes.column} />
                    <div className={classes.column} />
                </AccordionSummary>;
    }

    return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Item Photos</Typography>   
                </div>
            </AccordionSummary>;
}

function PhotoBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <div className={classes.mycolumn}>
                    <Gallery of={'/photos/filter/ItemId/' + routeParams.id } details={'/photos/for-item/' + routeParams.id} delete={'/photos'} />
                </div>;
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the item general information before editing the photos.</div>
}

function PhotoFooter(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Divider />
            <AccordionActions>
                <Button component={Link} to={ '/photos/create/for-item/' + routeParams.id } size="small" color="primary" >
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
    const [searchText, setSearchText] = useState("");
    const onSearch = (event) => {
        setSearchText(event.target.value);
    };

    return <Accordion>
                <PhotoHeader onSearch={ onSearch }/>
                <AccordionDetails className={classes.details}>
                    <PhotoBody searchText={searchText} />
                </AccordionDetails>
                <PhotoFooter />
            </Accordion>;
}

function GeneralInformation(props) {
    const routeParams = useParams();
    const classes = useStyles();

    return <>
        <Accordion>
            <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>General information</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <div className={classes.mycolumn}>
                    <div className="flex flex-col justify-center">
                        <TextFieldFormsy className="mb-16" type="text" name="number" label="Number" 
                        disabled
                        helperText='The item number will be available after you save it for first time.'
                        />

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

                        <TextFieldFormsy className="mb-16" type="text" name="brand" label="Brand" 
                        validations={{
                            minLength: 1,
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 1',
                        }}
                        required
                        />

                        <TextFieldFormsy className="mb-16" type="text" name="uom" label="UOM" 
                        validations={{
                            minLength: 1,
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 1',
                        }}
                        required
                        />

                        <TextFieldFormsy className="mb-16" type="text" name="originCountry" label="Origin Country" 
                        validations={{
                            minLength: 1,
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 1',
                        }}
                        required
                        />

                        <TextFieldFormsy className="mb-16" type="text" name="webActiveDescription" label="Web Active Description" 
                        validations={{
                            minLength: 1,
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 1',
                        }}
                        required
                        />

                        <TextFieldFormsy className="mb-16" type="date" name="effectiveDate" label="Effective Date" 
                        required
                        />

                        <CheckboxFormsy className="my-16" name="webActive" value={true} label="Web Active" />
                        <CheckboxFormsy className="my-16" name="active" value={true} label="Active" />
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Item price</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <div className={classes.mycolumn}>
                    <div className="flex flex-col justify-center">

                        <TextFieldFormsy className="mb-16" type="text" name="minimumOrderQty" label="Minimum Order Qty" 
                        validations={{
                            isInt: true,
                        }}
                        validationErrors={{
                            isInt: 'You muest provide an integer number',
                        }}
                        required
                        />
                        
                        <TextFieldFormsy className="mb-16" type="text" name="retailPrice" label="Retail Price"
                        defaultValue='0'
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        validations={{
                            isNumeric: true,
                        }}
                        validationErrors={{
                            isNumeric: 'You muest provide a number',
                        }}
                        required
                        />

                        <TextFieldFormsy className="mb-16" type="text" name="salesPrice" label="Sales Price"
                        defaultValue='0'
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        validations={{
                            isNumeric: true,
                        }}
                        validationErrors={{
                            isNumeric: 'You muest provide a number',
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
                            isNumeric: 'You muest provide a number',
                        }}
                        required
                        />

                        
                        <TextFieldFormsy className="mb-16" type="text" name="minimumDiscount" label="Minimum Discount" 
                        defaultValue='0'
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        disabled
                        helperText="You need to assign materials in order to calculate this property."
                        />
                        
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Item additional details</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <div className={classes.mycolumn}>
                    <div className="flex flex-col justify-center">
                        <CheckboxFormsy className="my-16" name="discountable" value={true} label="Discountable" />
                        <CheckboxFormsy className="my-16" name="finalSale" value={true} label="Final Sale" />
                        <CheckboxFormsy className="my-16" name="zeroPrice" value={true} label="Zero Price" />
                        <CheckboxFormsy className="my-16" name="makeBuy" value={true} label="Make / Buy" />
                        <CheckboxFormsy className="my-16" name="isProduct" value={true} label="Is Product" />
                        <CheckboxFormsy className="my-16" name="inventoried" value={true} label="Inventoried" />
                        <CheckboxFormsy className="my-16" name="obsolete" value={true} label="Obsolete" />
                        <CheckboxFormsy className="my-16" name="shipable" value={true} label="Shipable" />
                        
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    </>;
}

function Fields() {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <GeneralInformation />
            <MaterialInformation />
            <PhotoInformation />
		</div>
	);
}

export default Fields;
