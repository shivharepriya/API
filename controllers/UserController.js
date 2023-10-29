const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'desy4zkbm',
    api_key: '112322991571153',
    api_secret: 'y4Lp1Gc6UyOX6At32lUdAisTXiA',
});


class UserController {

    static getAllUser = async (req, res) => {
        try {
            res.send('hello user')
        }
        catch (error) {
            console.log(error)
        }
    }

    static userInsert = async (req, res) => {
        const { name, email, password, confirm_password } = req.body
        const file = req.files.image
        // image upload code 
        const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'profileimageapi'
        })
        const user = await UserModel.findOne({ email: email })
        // console.log(image_upload)
        if (user) {
            res
                .status(401)
                .json({ status: "failed", message: "This email is already exits" });
        } else {
            if (name && email && password && confirm_password) {
                if (password == confirm_password) {
                    try {
                        const hashpassword = await bcrypt.hash(password, 10);
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            confirmpassword: confirm_password,
                            image: {
                                public_id: image_upload.public_id,
                                url: image_upload.secure_url,
                            }
                        })
                        await result.save()
                        res.status(201).json({
                            status: "success",
                            message: "Registration Successfully",
                        })
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    res
                        .status(401)
                        .json({ status: "error", message: "password and confirm password does not match" });
                }
            } else {
                res
                    .status(401)
                    .json({ status: "failed", message: "all fields required" });
            }
        }
    }
}
module.exports = UserController