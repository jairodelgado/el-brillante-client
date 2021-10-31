import { useRef, useState } from 'react';
import {Link} from 'react-router-dom';
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
import Creator from './creator.component.jsx'

const useStyles = makeStyles({
	layoutRoot: {}
});

function Create(props) {
	const classes = useStyles();
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
					<h1>Create New {props.elementTitle ? props.elementTitle : ""}</h1>
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
					<Creator of={props.of} saveRef={ props.categoryRef } cancelRef={props.cancelRef} edition={ props.edition }>
						{props.children}
					</Creator>
				</div>
			}
		/>
	);
}

export default Create;
