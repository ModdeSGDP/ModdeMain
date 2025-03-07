export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// POST API Endpoints
export const API_POST_USER_REGISTER = `${baseUrl}/user/register`;
export const API_POST_INVITE_ADMIN = `${baseUrl}/api/user/invite-admin`;
export const API_POST_VERIFY_PASSWORD = `${baseUrl}/api/user/verify-password`;
export const API_POST_RETAILER_REGISTER = `${baseUrl}/retailers/register`;
export const API_POST_AUTH_LOGIN = `${baseUrl}/auth/login`;
export const API_POST_ADD_PRODUCTS = `${baseUrl}/product/add`;
export const API_POST_STOCKS_ADD = `${baseUrl}/api/stocks/add`;

// GET API Endpoints
export const API_GET_EMAIL = (email: string) => `${baseUrl}/api/user/email/${email}`;
export const API_GET_AUTHENTICATION = `${baseUrl}/api/retailers`;
export const API_GET_RETAILER_BY_ID = (id: string | number) => `${baseUrl}/api/retailers/${id}`;
export const API_GET_PRODUCT = `${baseUrl}/api/product`;
export const API_GET_PRODUCT_ID = (id: string | number) => `${baseUrl}/api/product/${id}`;
export const API_GET_RETAILER_ID_PRODUCT = (retailerId: string | number) => `${baseUrl}/api/product/retailer/${retailerId}/products`;
export const API_GET_PRODUCT_FILTER = `${baseUrl}/api/product/filter`;
export const API_GET_STOCKS = `${baseUrl}/api/stocks`;
export const API_GET_STOCKS_ID = (id: string | number) => `${baseUrl}/api/stocks/${id}`;
export const API_GET_STOCKS_PRODUCT_ID = (productId: string | number) => `${baseUrl}/api/stocks/product/${productId}`;

// PATCH API Endpoints
export const API_PATCH_UPDATE_RETAILER = (id: string | number) => `${baseUrl}/api/retailers/${id}`;
export const API_PATCH_UPDATE_PRODUCT = (id: string | number) => `${baseUrl}/api/product/${id}`;
export const API_PATCH_UPDATE_STOCKS = (id: string | number) => `${baseUrl}/api/stocks/${id}`;

// PUT API Endpoints
export const API_UPDATE_USER_DETAILS = (id: string | number) => `${baseUrl}/api/user/update/${id}`;

// DELETE API Endpoints
export const API_DELETE_STOCKS = (id: string | number) => `${baseUrl}/api/stocks/${id}`