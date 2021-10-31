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
import { makeStyles } from '@material-ui/core/styles';
import Editor from 'app/shared-components/editor.component.jsx'
import Fields, { DisplayFields } from './Fields'

const base = '/photos';
const categoryTitle = 'Photos';
const elementTitle = 'Photo';

const breadcrumbs = [{
	to: '/',
	title: 'Home'
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
			path: base + '/create/for-store/:store',
			component: () => {
				const routeParams = useParams();
				const classes = useStyles();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/stores/' + routeParams.store, title: 'Stores'})
				customBreadcrumbs.push({to: '/stores/details/' + routeParams.store, title: 'Edit Store'})
				customBreadcrumbs.push({title: 'Create Photo for Store'})

				return <Create of={base} cancelRef={ '/stores/details/' + routeParams.store } categoryRef={ '/photos/for-store/' + routeParams.store } categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs} edition>
					<TextFieldFormsy className={classes.hidden} type="text" name="StoreId" value={ routeParams.store } label="StoreId" disabled />
					<Fields />
				</Create>
			}
		},
		{
			path: base + '/for-store/:store?/details/:id?',
			component: () => {
				const routeParams = useParams();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/stores/' + routeParams.store, title: 'Stores'})
				customBreadcrumbs.push({to: '/stores/details/' + routeParams.store, title: 'Edit store'})
				customBreadcrumbs.push({title: 'Edit Photo of Store'})

				return <Details title="Edit Store Photo" breadcrumbs={customBreadcrumbs}>
							<Editor of={base} id={ routeParams.id } saveRef={ '/stores/details/' + routeParams.store } >
								<Fields />
							</Editor>
						</Details>;
			}
		},
		{
			path: base + '/create/for-item/:item',
			component: () => {
				const routeParams = useParams();
				const classes = useStyles();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/items/' + routeParams.item, title: 'Items'})
				customBreadcrumbs.push({to: '/items/details/' + routeParams.item, title: 'Edit Item'})
				customBreadcrumbs.push({title: 'Create Photo for Item'})

				return <Create of={base} cancelRef={ '/items/details/' + routeParams.item } categoryRef={ '/photos/for-item/' + routeParams.item } categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs} edition>
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

				customBreadcrumbs.push({to: '/items/' + routeParams.item, title: 'Items'})
				customBreadcrumbs.push({to: '/items/details/' + routeParams.item, title: 'Edit Item'})
				customBreadcrumbs.push({title: 'Edit Photo of Item'})

				return <Details title="Edit Item Photo" breadcrumbs={customBreadcrumbs}>
							<Editor of={base} id={ routeParams.id } saveRef={ '/items/details/' + routeParams.item  } >
								<Fields />
							</Editor>
						</Details>;
			}
		},
		{
			path: base + '/create/for-product/:product',
			component: () => {
				const routeParams = useParams();
				const classes = useStyles();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/products/' + routeParams.product, title: 'Products'})
				customBreadcrumbs.push({to: '/products/details/' + routeParams.product, title: 'Edit Product'})
				customBreadcrumbs.push({title: 'Create Photo for Product'})

				return <Create of={base} cancelRef={ '/products/details/' + routeParams.product } categoryRef={ '/photos/for-product/' + routeParams.product } categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs} edition>
					<TextFieldFormsy className={classes.hidden} type="text" name="ProductId" value={ routeParams.product } label="ProductId" disabled />
					<Fields />
				</Create>
			}
		},
		{
			path: base + '/for-product/:product?/details/:id?',
			component: () => {
				const routeParams = useParams();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: '/products/' + routeParams.product, title: 'Products'})
				customBreadcrumbs.push({to: '/products/details/' + routeParams.product, title: 'Edit Product'})
				customBreadcrumbs.push({title: 'Edit Photo for Product'})

				return <Details title="Edit Product Photo" breadcrumbs={customBreadcrumbs}>
							<Editor of={base} id={ routeParams.id } saveRef={ '/products/details/' + routeParams.product  } >
								<Fields />
							</Editor>
						</Details>;
			}
		}
	]
};

export default Config;
