import { User } from "../models/Registration.js";

export const registration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User is alerady exit", success: false });
    }
    // console.log("3  ");
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Details are required" });
    }
    const registrationData = await User.create({
      name,
      email,
      password,
    });

    // console.log("1");
    // console.log(registrationData);
    // const token = registrationData.generateAccessToken();
    // console.log(token, " registration ka hai ji");
    // res.status(201).json(registrationData);
    res.status(201).json({
      message: "Signup Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log("hi");
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Email or Password is wrong", success: false });
    }

    const isMatch = await user.isPasswordCorrect(password);
    const token = await user.generateAccessToken();
    console.log(token, "login");
    // res.status(403).json({ message: "token", token });

    if (!isMatch) {
      return res
        .status(403)
        .json({ message: "Email or Password is wrong", success: false });
    }

    res.status(201).json({
      email,
      token,
      message: "login Successfully",
      name: user.name,

      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
