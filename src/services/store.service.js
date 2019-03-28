import ApiService from './api.service';

export default function StoreService() {}

StoreService.processTransaction = function(user, company, order, job, token) {
  var data = {
    user: user,
    company: company,
    order: order,
    job: job,
    stripe_token: token
  }
  return ApiService.post('/store/checkout', data);
}
