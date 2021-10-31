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

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const base = '/item-balances';
const categoryTitle = 'Item Balances';
const elementTitle = 'Item Balance';

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

				return <Create of={base} categoryRef={ '/stores/details/' + routeParams.store } categoryTitle={categoryTitle} elementTitle={elementTitle}>
					<TextFieldFormsy className={classes.invisible} type="text" name="StoreId" value={ routeParams.store } label="StoreId" disabled />
					<Fields />
				</Create>
			}
		},
		{
			path: base + '/for-store/:store?/details/:id?',
			component: () => {
				const routeParams = useParams();

				return <Details title="Edit Item Balance">
							<Editor of={base} id={ routeParams.id } saveRef={ '/stores/details/' + routeParams.store } >
								<Fields />
							</Editor>
						</Details>;
			}
		}
	]
};

export default Config;
