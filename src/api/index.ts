const login_url = `${process.env.REACT_APP_BACKEND_URL}auth/login`;
const signup_url = `${process.env.REACT_APP_BACKEND_URL}auth/signup`;
const profile_url = `${process.env.REACT_APP_BACKEND_URL}employee/me`;
const profile_update = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/update/${id}`;
const employee_delete = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/delete/${id}`;
const employeelist_url = `${process.env.REACT_APP_BACKEND_URL}employee/list`;

const create_shift = `${process.env.REACT_APP_BACKEND_URL}shift/create`;
const update_shift = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}shift/update/${id}`;
const delete_shift = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}shift/delete/${id}`;
const shift_list = `${process.env.REACT_APP_BACKEND_URL}shift/all`;
const assign_shift_to_employee = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}shift/assign/${id}`;

export {
  login_url,
  signup_url,
  profile_url,
  profile_update,
  employee_delete,
  employeelist_url,
  create_shift,
  update_shift,
  delete_shift,
  shift_list,
  assign_shift_to_employee,
};
