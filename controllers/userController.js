const bcrypt = require('bcrypt')
const UserModel = require('../model/user.model')

exports.userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (user) {
      res.json({
        success: false,
        message: 'This user already exists',
        data: null,
        errors: null,
      })
      return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createUser = new UserModel({ name, email, password: hashedPassword })
    await createUser.save()

    res.json({
      success: true,
      message: 'User created successfully',
      data: null,
      errors: null,
    })
  } catch (error) {
    console.error(error)
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
      res.json({
        success: false,
        message: 'User not found, please try again',
        data: null,
        errors: null,
      })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.json({
        success: false,
        message: 'Password is incorrect, please try again',
        data: null,
        errors: null,
      })
      return
    }

    res.json({
      success: true,
      message: 'Logged in!',
      data: { userId: user._id, email: user.email },
      errors: null,
    })
  } catch (error) {
    console.error(error)
  }
}
