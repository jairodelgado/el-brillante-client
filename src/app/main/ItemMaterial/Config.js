import { useParams } from 'react-router-dom';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { makeStyles } from '@material-ui/core/styles';
import List from 'app/shared-components/ListPage';
import Create from 'app/shared-components/CreatePage';
import Details from 'app/shared-components/DetailsPage';
import Editor from 'app/shared-components/editor.component.jsx'
import Fields, { DisplayFields } from './Fields'

const base = '/item-materials';
const categoryTitle = 'Item Materials';
const elementTitle = 'Item Material';

const breadcrumbs = [{
	to: '/',
	title: 'Home',
}, {
	to: '/items',
	title: 'Items'
}];

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none'
  }
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
			path: base + '/create/for-item/:item',
			component: () => {
				const routeParams = useParams();
				const classes = useStyles();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/items/details/' + routeParams.item, title: 'Edit Item'})
				customBreadcrumbs.push({title: 'Add Material to Item'})

				return <Create of={base} categoryRef={ '/items/details/' + routeParams.item } categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs}>
					<TextFieldFormsy className={classes.hidden} type="text" name="ItemId" value={ routeParams.item } label="ItemId" disabled />
					<Fields />
				</Create>
			}
		},
		{
			path: base + '/for-item/:item?/details/:id?',
			component: () => {
				const routeParams = useParams();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/items/details/' + routeParams.item, title: 'Edit Item'})
				customBreadcrumbs.push({title: 'Edit Material of Item'})

				return <Details title="Edit Items' Material" breadcrumbs={customBreadcrumbs}>
							<Editor of={base} id={ routeParams.id } saveRef={  '/items/details/' + routeParams.item } >
								<Fields />
							</Editor>
						</Details>;
			}
		}
	]
};

export default Config;