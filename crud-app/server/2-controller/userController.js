import User from "../1-model/userModel.js";


export const creat = async (req, res) => {
    try {

        const newUser = new User(req.body);
        const { email } = newUser;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "user alredy existe." })

        }

        const savedUser = await newUser.save();
        res.status(200).json({ message: "User created successfully", user: savedUser });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const getAllusers = async (req, res) => {
    try {

        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "no user has been found !!" })
        }

        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const getUserbyId = async (req, res) => {
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ message: "no user has been found !!" })
        }

        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}


export const updateUserbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ message: "no user has been found !!" })
        }

        const updateData = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json({ message: "user updated succssefuly" });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const delateUserbyId = async (req, res) => {
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ message: "no user has been found !!" })
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "user deleted succssefuly" });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

