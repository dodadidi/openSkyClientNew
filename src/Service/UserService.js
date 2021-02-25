import HttpService from './httpService'

export const userService = {
  save
}

async function save(user) {
  if (user.googleId) {
    return HttpService.put(`users/${user.googleId}`, user)
  } else {
    return HttpService.post(`users`, user);
  }
}