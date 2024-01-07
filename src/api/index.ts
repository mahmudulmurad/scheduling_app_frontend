const login_url = `${process.env.REACT_APP_BACKEND_URL}auth/login`;
const signup_url = `${process.env.REACT_APP_BACKEND_URL}auth/signup`;
const profile_url = `${process.env.REACT_APP_BACKEND_URL}employee/me`;

const profile_update = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/update/${id}`;

const employee_role_change = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/role-change/${id}`;

const employee_delete = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/delete/${id}`;

const employeelist_url = `${process.env.REACT_APP_BACKEND_URL}employee/list`;

const tag_employee_to_supervisor = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/tag-employee-to-supervisor/${id}`;

const untag_employee_from_supervisor = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}employee/remove-employee-from-supervisor/${id}`;

const create_shift = `${process.env.REACT_APP_BACKEND_URL}shift/create`;

const update_shift = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}shift/update/${id}`;

const delete_shift = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}shift/delete/${id}`;

const shift_list = `${process.env.REACT_APP_BACKEND_URL}shift/all`;

const assign_shift_to_employee = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}shift/assign/${id}`;

const remove_shift_from_employee = (id: string) =>
  `${process.env.REACT_APP_BACKEND_URL}shift/remove/${id}`;

const my_shift = `${process.env.REACT_APP_BACKEND_URL}shift/my-shift`;

export {
  login_url,
  signup_url,
  profile_url,
  profile_update,
  employee_role_change,
  employee_delete,
  employeelist_url,
  tag_employee_to_supervisor,
  untag_employee_from_supervisor,
  create_shift,
  update_shift,
  delete_shift,
  shift_list,
  assign_shift_to_employee,
  remove_shift_from_employee,
  my_shift,
};
