import UserModel from './user.model'

class Model {
  constructor() {
    this.user = new UserModel() // 디비 연결해야함
    console.log('Model Readey')
  }

  user() {
    return this.user
  }
}

export default new Model()
