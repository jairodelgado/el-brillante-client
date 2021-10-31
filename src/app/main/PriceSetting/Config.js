import { useParams } from 'react-router-dom';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import { TextFieldFormsy } from '@fuse/core/formsy';
import List from 'app/shared-components/ListPage';
import Create from 'app/shared-components/CreatePage';
import Details from 'app/shared-components/DetailsPage';
import Editor from 'app/shared-components/editor.component.jsx'
import { makeStyles } from '@material-ui/core/styles';
import Fields, { DisplayFields } from './Fields'

const base = '/price-settings';
const categoryTitle = 'Price Settings';
const elementTitle = 'Price Setting';

const breadcrumbs = [{
	to: '/',
	title: 'Home'
}, {
	to: '/materials',
	title: 'Materials'
}];

const useStyles = makeStyles((theme) => ({
  invisible: {
    display: 'none',
  },
}));

const Config = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin, // ['admin']
	routes: [
		{
			path: base + '/create/for-material/:material',
			component: () => {
				const routeParams = useParams();
				const classes = useStyles();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/materials/details/' + routeParams.material, title: 'Edit Material'})
				customBreadcrumbs.push({title: 'Create Price Setting of Material'})

				return <Create of={base} categoryRef={ '/materials/details/' + routeParams.material } categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs}>
					<TextFieldFormsy className={classes.invisible} type="text" name="MaterialId" value={ routeParams.material } label="MaterialId" disabled />
					<Fields />
				</Create>
			}
		},
		{
			path: base + '/for-material/:material?/details/:id?',
			component: () => {
				const routeParams = useParams();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/materials/details/' + routeParams.material, title: 'Edit Material'})
				customBreadcrumbs.push({title: 'Edit Price Setting of Material'})

				return <Details title="Edit Price Setting" breadcrumbs={customBreadcrumbs}>
							<Editor of={base} id={ routeParams.id } saveRef={ '/materials/details/' + routeParams.material }>
								<Fields />
							</Editor>
						</Details>;
			}
		}
	]
};

export default Config;
