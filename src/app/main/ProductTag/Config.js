import { useParams } from 'react-router-dom';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import List from 'app/shared-components/ListPage';
import Create from 'app/shared-components/CreatePage';
import Details from 'app/shared-components/DetailsPage';
import Editor from 'app/shared-components/editor.component.jsx'
import Fields, {DisplayFields} from './Fields'

const breadcrumbs = [{
	to: '/',
	title: 'Home'
}];

const base = '/product-tags';
const categoryTitle = 'Product Tags';
const elementTitle = 'Tag';

const Config = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin, // ['admin']
	routes: [
		{
			path: base + '/create',
			component: () => {
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: base, title:  categoryTitle });
				customBreadcrumbs.push({title: 'Create Product Tag'});

				return <Create of={base} categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs}><Fields /></Create>;
			}
		},
		{
			path: base + '/details/:id?',
			component: () => {
				const routeParams = useParams();
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({to: base, title: categoryTitle });
				customBreadcrumbs.push({title: 'Edit Product Tag'})

				return <Details title="Edit ProductTag" breadcrumbs={customBreadcrumbs}>
							<Editor of={base} id={ routeParams.id } >
								<Fields />
							</Editor>
						</Details>;
			}
		},
		{
			path: base,
			component: () => {
				const customBreadcrumbs = Array.from(breadcrumbs);

				customBreadcrumbs.push({title: categoryTitle });

				return <List of={base} display={DisplayFields} categoryTitle={categoryTitle} elementTitle={elementTitle} breadcrumbs={customBreadcrumbs}></List>;
			}
		}
	]
};

export default Config;
