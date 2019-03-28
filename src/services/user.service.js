import ApiService from './api.service';

export default function UserService() {}

UserService.employerSignUp = function(user) {
  var data = {
    user: user,
    sign_up_type: 'employer'
  }
  return ApiService.post('/users', data);
}

UserService.applicantSignUp = function(user) {
  var data = {
    user: user,
    sign_up_type: 'applicant'
  }
  return ApiService.post('/users', data);
}

UserService.signIn = (email, password) => {
  let url = '/users/sign_in'
  let data = {
    user: {
      email: email,
      password: password
    }
  }
  return ApiService.post(url, data);
}

UserService.signOut = (email, password) => {
  // TODO: FINISH
  // let url = '/users/sign_in'
  // let data = {
  //   user: {
  //     email: email,
  //     password: password
  //   }
  // }
  // return ApiService.post(url, data);
}

UserService.identify = (token) => {
  return ApiService.get(`/users/token/`, {token: token});
}

UserService.refreshUser = (id) => {
  return ApiService.get(`/applicants/${id}`);
}

UserService.removeJobApplication = (user, job) => {
  return ApiService.delete(`/applicants/${user.id}/jobs/${job.id}`);
}

UserService.getUserAlerts = (user) => {
  return ApiService.get(`/applicants/${user.id}/alerts`);
}

UserService.createUserAlert = (user, alert) => {
  return ApiService.post(`/applicants/${user.id}/alerts`, { alert: alert });
}

UserService.updateUserAlert = (user, alert) => {
  return ApiService.put(`/applicants/${user.id}/alerts/${alert.id}`, { alert: alert });
}

UserService.removeUserAlert = (alert) => {
  return ApiService.delete(`/applicants/${alert.user_id}/alerts/${alert.id}`);
}
