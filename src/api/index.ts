const login_url = `${process.env.REACT_APP_BACKEND_URL}auth/login`;
const signup_url = `${process.env.REACT_APP_BACKEND_URL}auth/signup`;
const profile_url = `${process.env.REACT_APP_BACKEND_URL}employee/me`;
const profile_update = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/update/${id}`;

export { login_url, signup_url, profile_url, profile_update };
