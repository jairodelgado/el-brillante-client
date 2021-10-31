import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	layoutRoot: {}
});


function SimpleFullWidthSample() {
	const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h1>Dashboard</h1>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<Breadcrumbs aria-label="breadcrumb">
				      <Typography color="text.primary"> Home </Typography>
				    </Breadcrumbs>
				</div>
			}
			content={
				<div className="p-24">
					Hello, welcome to el Brillante Dashboard.
				</div>
			}
		/>
	);
}

export default SimpleFullWidthSample;
