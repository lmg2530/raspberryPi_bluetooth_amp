class User {
  async login(req, res) {
    console.log(req.query)
    return true
  }
}

export default User
