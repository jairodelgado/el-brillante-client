import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Archive from './archive.component.jsx'

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  root: {
    flexGrow: 1,
  },
  toolbarButtons: {
    flexGrow: 1,
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
  column: {
    flexBasis: '33.33%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
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
}));

function Header(props) {
    const classes = useStyles();
    const breadcrumbs = props.breadcrumbs || [];
    const links = breadcrumbs.map(item => {
			if (item.to) {
				return <Link color="inherit" to={item.to}> {item.title} </Link>;
			} else {
				return <Typography color="text.primary"> {item.title} </Typography>;
			}
		});


    return <div className="px-24">
      <Breadcrumbs aria-label="breadcrumb">
	      {links}
	    </Breadcrumbs>
    </div>;

}

function Body(props) {
    const classes = useStyles();

    return <div className={classes.root}>
                <Archive of={props.of} display={props.display} searchText={props.searchText} />
            </div>;
}

function Footer(props) {
    const classes = useStyles();

    return <>
        <Divider />
        <AccordionActions>
            <Button component={Link} to={props.of + "/create"} variant="contained" color="primary" startIcon={<Icon>add_circle</Icon>}>Create new</Button>
        </AccordionActions>
    </>
}

function List(props) {
	const [searchText, setSearchText] = useState("");
	const classes = useStyles();
	const onSearch = (event) => {
		setSearchText(event.target.value);
	};

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h1>{ props.categoryTitle ? props.categoryTitle + " List" : "List" }</h1>
				</div>
			}
			contentToolbar=<Header onSearch={ onSearch } breadcrumbs={props.breadcrumbs}/>
			content={
				<>
					<Accordion expanded={true}>
	            <AccordionDetails className={classes.details}>
	                <Body of={props.of} searchText={searchText} display={props.display} />
	            </AccordionDetails>
	            <Footer of={props.of} />
	        </Accordion>
        </>
			}
		/>
	);
}

export default List;
