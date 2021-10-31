import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		translate: 'Dashboard',
		type: 'item',
		icon: 'apps',
		url: '/dashboard',
	},
	{
		id: 'management',
		title: 'Management',
		translate: 'MANAGEMENT',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'sidenav-items',
				title: 'Items',
				translate: 'ITEMS',
				type: 'collapse',
				icon: 'done_all',
				url: '/items',
				children: [
					{
						id: 'sidenav-materials',
						title: 'Materials',
						type: 'item',
						url: '/materials'
					}
				]
			},
			{
				id: 'sidenav-products',
				title: 'Products',
				translate: 'PRODUCTS',
				type: 'collapse',
				icon: 'category',
				url: '/products',
				children: [
					{
						id: 'sidenav-product-types',
						title: 'Types',
						type: 'item',
						url: '/product-types'
					},
					{
						id: 'sidenav-product-categories',
						title: 'Categories',
						type: 'item',
						url: '/product-categories'
					},
					{
						id: 'sidenav-product-tags',
						title: 'Tags',
						type: 'item',
						url: '/product-tags'
					},
					{
						id: 'sidenav-statuses',
						title: 'Statuses',
						type: 'item',
						url: '/statuses'
					}
				]
			},
			{
				id: 'sidenav-stores',
				title: 'Stores',
				translate: 'STORES',
				type: 'item',
				icon: 'storefront',
				url: '/stores'
			}
		]
	},
{
		id: 'security',
		title: 'Security',
		translate: 'SECURITY',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'sidenav-users',
				title: 'Users',
				translate: 'USERS',
				type: 'item',
				icon: 'account_circle',
				url: '/app-users'
			}
		]
	}

];

export default navigationConfig;
