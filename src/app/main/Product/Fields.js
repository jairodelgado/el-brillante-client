import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
import Linker from 'app/shared-components/linker.component.jsx'
import Selector from 'app/shared-components/selector.component.jsx'
import Gallery from 'app/shared-components/gallery.jsx'
import ItemMaterialFields, { DisplayFields as ItemMaterialDisplayFields } from '../ItemMaterial/Fields'
import PhotoFields, { DisplayFields as PhotoDisplayFields } from '../Photo/Fields'

export const DisplayFields = [{
        accessor: "code",
        Header: "Code",
        sortable: true
    }, , {
        accessor: "description",
        Header: "Description",
        sortable: true
    }, {
        accessor: "salesPrice",
        Header: "Sales Price",
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
  column: {
    flexBasis: '33.33%',
  },
  mycolumn: {
    flexBasis: '100%',
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

function ItemCategoriesTagsBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Linker of="/items"
                    connection="/product-items"
                    source="ProductId"
                    id={ routeParams.id } 
                    target="ItemId"
                    connectionAccessor="Item"
                    targetAccessor="id" 
                    targetTitle="name"
                    placeholder="Select Item"
                    className="mb-16"
                    label="Items">
            </Linker>
            <Linker of="/product-categories"
                    connection="/product-category-product"
                    source="ProductId"
                    id={ routeParams.id } 
                    target="ProductCategoryId"
                    connectionAccessor="ProductCategory"
                    targetAccessor="id" 
                    targetTitle="category"
                    placeholder="Select Categories"
                    className="mb-16"
                    label="Categories">
            </Linker>
            <Linker of="/product-tags"
                    connection="/product-tag-product"
                    source="ProductId"
                    id={ routeParams.id } 
                    target="ProductTagId"
                    connectionAccessor="ProductTag"
                    targetAccessor="id" 
                    targetTitle="tag"
                    placeholder="Select Tags"
                    className="mb-16"
                    label="Tags">
            </Linker>
        </>
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the product information before editing.</div>
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

                            <TextFieldFormsy className="mb-16" type="text" name="code" label="Code" 
                            disabled
                            helperText='The product code will be available after you save it for first time.'
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

                            <TextFieldFormsy className="mb-16" type="text" name="webDescription" label="Web Description" 
                            validations={{
                                minLength: 1,
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 1',
                            }}
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
                    <Typography className={classes.heading}>Product status & type</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                    <div className={classes.mycolumn}>
                        <div className="flex flex-col justify-center">
                            <Selector className="mb-16" of="/statuses" accessor="status" label="Status" name="StatusId" select />
                            <Selector className="mb-16" of="/product-types" accessor="type" label="Type" name="ProductTypeId" select />
                        </div>
                    </div>
            </AccordionDetails>
        </Accordion>


        <Accordion>
            <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Product details & prices</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                    <div className={classes.mycolumn}>
                        <div className="flex flex-col justify-center">
                            <TextFieldFormsy className="mb-16" type="text" name="warrantyDays" label="Warranty Days" 
                            validations={{
                                isNumeric: true,
                            }}
                            validationErrors={{
                                isNumeric: 'You must provide a number',
                            }}
                            required
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="weight" label="Weight"
                            defaultValue='0'
                            disabled
                            helperText="You need to assign items in order to calculate this property."
                            InputProps={{
                               startAdornment: <InputAdornment position="start">Kg</InputAdornment>
                            }}
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="retailPrice" label="Retail Price"
                            defaultValue='0'
                            disabled
                            helperText="You need to assign items in order to calculate this property."
                            InputProps={{
                               startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="salesPrice" label="Sales Price" 
                            defaultValue='0'
                            disabled
                            helperText="You need to assign items in order to calculate this property."
                            InputProps={{
                               startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            />

                            <TextFieldFormsy className="mb-16" type="text" name="minimumDiscount" label="Minimum Discount" 
                            defaultValue='0'
                            disabled
                            helperText="You need to assign items in order to calculate this property."
                            InputProps={{
                               startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            />
                        </div>
                    </div>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Items, categories & tags</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <div className={classes.mycolumn}>
                    <div className="flex flex-col justify-center">
                        <ItemCategoriesTagsBody/>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    </>
}

function PhotoHeader(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Product Photos</Typography>
                    </div>
                    <div className={classes.column} />
                    <div className={classes.column} />
                </AccordionSummary>;
    }

    return <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                <div className={classes.column}>
                    <Typography className={classes.heading}>Product Photos</Typography>   
                </div>
            </AccordionSummary>;
}

function PhotoBody(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <div className={classes.mycolumn}>
                    <Gallery of={'/photos/filter/ProductId/' + routeParams.id } details={'/photos/for-product/' + routeParams.id} delete={'/photos'} />
                </div>;
    }

    return <div className="flex flex-1 items-center justify-center h-full">Please, complete and save the product general information before editing the photos.</div>
}

function PhotoFooter(props) {
    const routeParams = useParams();
    const classes = useStyles();

    if (routeParams.id) {
        return <>
            <Divider />
            <AccordionActions>
                <Button component={Link} to={ '/photos/create/for-product/' + routeParams.id } size="small" color="primary" >
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

function Fields() {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <GeneralInformation />
            <PhotoInformation />
		</div>
	);
}

export default Fields;
