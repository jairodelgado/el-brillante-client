import { useParams } from 'react-router-dom';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import { makeStyles } from '@material-ui/core/styles';
import { TextFieldFormsy } from '@fuse/core/formsy';
import List from 'app/shared-components/ListPage';
import Create from 'app/shared-components/CreatePage';
import Details from 'app/shared-components/DetailsPage';
import Editor from 'app/shared-components/editor.component.jsx'
import Fields, { DisplayFields } from './Fields'

const base = '/addresses';
const categoryTitle = 'Store Addresses';
const elementTitle = 'Address';

const breadcrumbs = [{
	to: '/',
	title: 'Home'
}, {
	to: '/stores',
	title: 'Stores'
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
			path: base + '/create/for-store/:store',
			component: () => {
				const routeParams = useParams();
				const classes = useStyles();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/stores/details/' + routeParams.store, title: 'Edit store'})
				customBreadcrumbs.push({title: 'Create Address for Store'})

				return <Create of={base} categoryRef={ '/stores/details/' + routeParams.store } categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs}>
					<TextFieldFormsy className={classes.invisible} type="text" name="StoreId" value={ routeParams.store } label="StoreId" disabled />
					<Fields />
				</Create>
			}
		},
		{
			path: base + '/for-store/:store?/details/:id?',
			component: () => {
				const routeParams = useParams();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/stores/details/' + routeParams.store, title: 'Edit store'})
				customBreadcrumbs.push({title: 'Edit Address of Store'})

				return <Details title="Edit Address" breadcrumbs={customBreadcrumbs}>
							<Editor of={base} id={ routeParams.id } saveRef={ '/stores/details/' + routeParams.store  } >
								<Fields />
							</Editor>
						</Details>;
			}
		}
	]
};

export default Config;
