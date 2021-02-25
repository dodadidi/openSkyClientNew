import HttpService from './httpService'

export const weatherService = {
  getByCity
}

function getByCity(cityName = '') {
  return HttpService.get(`weather?q=${cityName || ''}`);
}
