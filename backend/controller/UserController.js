import User from '../model/User.js';

//READ ALL USERS

export const getAllUsers = async (req, res) => {

    try {
        
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

//READ USER BY ID

export const getUserById = async (req, res) => {

    try {

        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

//READ USER BY ROLE

export const getUserByRole = async (req,res)  => {

    try {

        const { role } = req.params;

        const users = await User.find({ role });

        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

//UPDATE USER

export const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const { firstName, lastName, nic, address, email, phone, secondaryPhone , license } = req.body;

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.nic = nic;
        user.address = address;
        user.email = email;
        user.phone = phone;
        user.secondaryPhone = secondaryPhone;
        user.license = license;

        await user.save();

        res.status(200).json(user);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

//USER DELETE

export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id);

        if(!user) {

            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

