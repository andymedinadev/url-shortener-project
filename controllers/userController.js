const UserModel = require('../model/user.model')

exports.userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
      const createUser = new UserModel({ name, email, password })

      await createUser.save()

      res.json({ status: true, message: 'User created successfully' })
    } else {
      res.json({ status: false, message: 'This user already exists' })
    }
  } catch (error) {
    console.error(error)
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email, password })

    if (user) {
      res.json({ status: true, message: 'Logged in!', user })
    } else {
      res.json({ status: false, message: 'User invalid, please try again' })
    }
  } catch (error) {
    console.error(error)
  }
}
