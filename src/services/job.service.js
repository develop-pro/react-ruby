import ApiService from './api.service';

export default class JobService {}

JobService.getJob = (slug) => {
  return ApiService.get(`/jobs/${slug}`);
}

JobService.getJobs = (user = null) => {
  if (user === null) {
    return ApiService.get(`/jobs`)
  } else {
    return ApiService.get(`/applicants/${user.id}/jobs`);
  }
}

JobService.getEmployerJobs = (user) => {
  return ApiService.get(`/employers/${user.id}/jobs`);
}

JobService.searchJobs = (keywords, location, options = null) => {
  return ApiService.search(`/jobs/search`, {
    q: {
      title_or_description_cont: keywords,
      state_eq: location,
    }
  }, options);
}

JobService.createJob = (job) => {
  return ApiService.post(`/jobs`, {job: job});
}

JobService.updateJob = (job) => {
  return ApiService.put(`/jobs/${job.slug}`, {job: job})
}

JobService.apply = (profileId, slug, userId) => {
  return ApiService.post(`/applicants/${userId}/jobs/${slug}/apply`, {profileId: profileId});
}

JobService.remove = (job) => {
  return ApiService.delete(`/jobs/${job.slug}`);
}

JobService.getApplicants = (job) => {
  return ApiService.get(`/jobs/${job.id}/applicants`);
}
