const UserModel = require('../model/user.model')

exports.userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
      const createUser = new UserModel({ name, email, password })

      await createUser.save()

      res.json({
        success: true,
        message: 'User created successfully',
        data: null,
        errors: null,
      })
    } else {
      res.json({
        success: false,
        message: 'This user already exists',
        data: null,
        errors: null,
      })
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
      res.json({
        success: true,
        message: 'Logged in!',
        data: { user },
        errors: null,
      })
    } else {
      res.json({
        success: false,
        message: 'User invalid, please try again',
        data: null,
        errors: null,
      })
    }
  } catch (error) {
    console.error(error)
  }
}
