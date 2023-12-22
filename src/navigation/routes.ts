/** @format */

import { jwtDecode } from 'jwt-decode';

const token = localStorage.token;
const decoded: any = token && jwtDecode(token);
const url = decoded?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';

const routes = [
  { title: 'rabble', path: url },
  { title: 'catalogue', path: `${url}/catalogue` },
  { title: 'orders', path: `${url}/orders` },
];

export default routes;
