import HttpService from './httpService'

export const feedbackService = {
  query,
  getById,
  remove,
  save
}

function query(filterBy = {}) {
  let queryStr = '?';
  for (const key in filterBy) {
    queryStr += `${key}=${filterBy[key]}&`;
  }
  return HttpService.get(`feedbacks${queryStr || ''}`);
}

function getById(feedbackId) {
  return HttpService.get(`feedbacks/${feedbackId}`)
}

function remove(feedbackId) {
  return HttpService.delete(`feedbacks/${feedbackId}`)
}

async function save(feedback) {
  if (feedback.id) {
    return HttpService.put(`feedbacks/${feedback.id}`, feedback)
  } else {
    return HttpService.post(`feedbacks`, feedback);
  }
}