import HttpService from './httpService'

export const flightService = {
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
  return HttpService.get(`flights${queryStr || ''}`);
}

function getById(flightNum) {
  return HttpService.get(`flights/${flightNum}`)
}

function remove(flightNum) {
  return HttpService.delete(`flights/${flightNum}`)
}

async function save(flight) {
  if (flight.flight_number) {
    return HttpService.put(`flights/${flight.flight_number}`, flight)
  } else {
    return HttpService.post(`flights`, flight);
  }
}