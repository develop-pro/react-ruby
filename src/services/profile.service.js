import ApiService from './api.service';

export default class ProfileService {}

ProfileService.getProfile = (slug) => {
  return ApiService.get(`/profiles/${slug}`)
}

ProfileService.getProfiles = () => {
  return ApiService.get(`/profiles`)
}

ProfileService.searchProfiles = (keywords, location) => {
  return ApiService.get(`/profiles/search?keywords=${keywords}&locations=${location}`)
}

ProfileService.create = (user, profile, resume = null) => {
  const data = { user: user, profile: profile, resume: resume };
  return ApiService.post(`/applicants/${user.id}/profiles`, data, resume);
}

ProfileService.update = (user, profile, resume = null) => {
  const data = { user: user, profile: profile, resume: resume, user_id: user.id };
  return ApiService.put(`/applicants/${user.id}/profiles/${profile.id}`, data, resume);
}

ProfileService.getProfilesByUser = (userId) => {
  return ApiService.get(`/applicants/${userId}/profiles`)
}

ProfileService.deleteSkillSet = (id) => {
  return ApiService.delete(`/skill_sets/${id}`)
}

ProfileService.deleteWorkExperience = (id) => {
  return ApiService.delete(`/work_experiences/${id}`)
}

ProfileService.deleteEducation = (id) => {
  return ApiService.delete(`/educations/${id}`)
}

ProfileService.deleteProfile = (id) => {
  return ApiService.delete(`/profiles/${id}`)
}

ProfileService.uploadResume = (userId, profile, resume) => {
  return ApiService.upload(`/applicants/${userId}/profiles/${profile.id}/resumes`, resume)
}

ProfileService.downloadResume = (url) => {
  return ApiService.download(url)
}
