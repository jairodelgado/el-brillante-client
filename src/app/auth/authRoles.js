/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['Admin'],
	salesman: ['Admin', 'Salesman'],
	customer: ['Admin', 'Salesman', 'Customer'],
	onlyGuest: []
};

export default authRoles;
