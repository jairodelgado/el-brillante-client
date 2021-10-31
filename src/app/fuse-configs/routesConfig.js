import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import ProductTagConfig from 'app/main/ProductTag/Config';
import ProductCateogryConfig from 'app/main/ProductCategory/Config';
import ProductTypeConfig from 'app/main/ProductType/Config';
import ProductStatusConfig from 'app/main/ProductStatus/Config';
import StoreConfig from 'app/main/Store/Config';
import AddressConfig from 'app/main/Address/Config';
import MaterialConfig from 'app/main/Material/Config';
import PriceSettingConfig from 'app/main/PriceSetting/Config';
import ItemBalanceConfig from 'app/main/ItemBalance/Config';
import ItemMaterialConfig from 'app/main/ItemMaterial/Config';
import ItemConfig from 'app/main/Item/Config';
import ProductConfig from 'app/main/Product/Config';
import PhotoConfig from 'app/main/Photo/Config';

const routeConfigs = [DashboardConfig, LoginConfig, 
					  ProductConfig, ProductTagConfig, ProductCateogryConfig, ProductTypeConfig, ProductStatusConfig, 
					  StoreConfig, AddressConfig,
					  MaterialConfig, PriceSettingConfig, 
					  ItemConfig, ItemBalanceConfig, ItemMaterialConfig,
					  PhotoConfig
					  ];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/dashboard" />
	}
];

export default routes;
