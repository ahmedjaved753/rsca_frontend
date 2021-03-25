export const BASE = "http://localhost:8000/api/";
//export const BASE = "https://rcsa-api-main.herokuapp.com/api/";
export const REGISTER = BASE + "users/register/";
export const GET_TOKEN = BASE + "token/";
export const REFRESH_TOKEN = BASE + "token/refresh/";
export const USER_INFO = BASE + "users/detail/me/";
export const USERS = BASE + "users/";
export const USER_DETAILS = BASE + "users/detail/";
export const REGISTER_BY_ADMIN = BASE + "users/register-by-admin/";
export const UPLOAD_FILE = BASE + "posts/upload/";
export const GET_NUMBER_OF_POSTS_OF_A_MONTH = BASE + "posts/post-count/";
export const GET_POSTS_BY_DATE_RANGE = BASE + "posts/";
export const GET_POST_MARKERS_BY_POST_ID = BASE + "posts/post-markers/";
export const GET_POSTS_BY_ROI = BASE + "posts/roi/";
export const POST_PASSWORD_RESET_EMAIL = BASE + "users/password-reset-send/";
export const RESET_PASSWORD = BASE + "users/password-reset-verify/";
export const GET_POSTS = BASE + "posts/all/";
export const DELETE_POST_BY_ID = id => `${BASE}posts/${id}/`