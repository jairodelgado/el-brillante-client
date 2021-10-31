import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles({
	layoutRoot: {}
});

function Details(props) {
	const classes = useStyles();
	const routeParams = useParams();
	const breadcrumbs = props.breadcrumbs || [];
	const links = breadcrumbs.map(item => {
		if (item.to) {
			return <Link color="inherit" to={item.to}> {item.title} </Link>;
		} else {
			return <Typography color="text.primary"> {item.title} </Typography>;
		}
	});

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h1>{ props.title }</h1>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<Breadcrumbs aria-label="breadcrumb">
				      {links}
				    </Breadcrumbs>
				</div>
			}
			content={
				<div className="p-24">
					{ props.children }
				</div>
			}
		/>
	);
}

export default Details;
