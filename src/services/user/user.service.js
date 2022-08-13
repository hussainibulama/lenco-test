const { hashPassword, comparePassword } = require("../../helpers/password");
const { jwtSign } = require("../../helpers/token");
const User = require("./user.model");

exports.registerUser = async (res, data) => {
  let user;
  try {
    const password = hashPassword(data.password);
    const email = data.email && data.email.toLowerCase();

    user = await User.create({
      password,
      email,
    });
    return {
      error: !user,
      message: !user
        ? "Error while registering user"
        : "User registered successfully",
      data: !user ? null : user,
    };
  } catch (err) {
    user && user.deleteOne();
    return {
      error: true,
      message: err?.msg || err?.message || "Error registering user",
      data: err?.response?.data || err,
    };
  }
};

exports.loginUser = async (user, data) => {
  try {
    const passwordMatch = await comparePassword(user.password, data.password);
    if (!passwordMatch) {
      return {
        error: true,
        message: "Incorrect password.",
      };
    }

    const accessToken = jwtSign(user._id);
    await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        last_issued_at: new Date(),
      }
    );

    return {
      error: !user,
      message: !user ? "Failed to login user" : "Login successful",
      data: !user ? null : { accessToken },
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while logging user",
      data: err?.response?.data || err,
    };
  }
};
exports.UserPhoneService = async (user, data) => {
  try {
    let phone = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        phone: data.phone,
        last_issued_at: new Date(),
      },
      { new: true }
    );

    return {
      error: !phone,
      message: !phone ? "Failed to update phone" : "Phone updated successfully",
      data: !phone ? null : phone,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating user phone",
      data: err?.response?.data || err,
    };
  }
};
exports.UserDetailsService = async (user, data) => {
  try {
    let Details = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        first_name: data.first_name,
        last_name: data.last_name,
        last_issued_at: new Date(),
      },
      { new: true }
    );
    return {
      error: !Details,
      message: !Details
        ? "Failed to update details"
        : "User details updated successfully",
      data: !Details ? null : Details,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating user details",
      data: err?.response?.data || err,
    };
  }
};
exports.UserPasswordService = async (user, data) => {
  try {
    let users = await User.findOne({
      _id: user._id,
    }).select("+password");
    const passwordMatch = await comparePassword(users.password, data.password);
    if (!passwordMatch) {
      return {
        error: true,
        message: " Old password doesn`t match",
      };
    }
    const password = hashPassword(data.new_password);

    let Change = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        password: password,
        last_issued_at: new Date(),
      },
      { new: true }
    );
    return {
      error: !Change,
      message: !Change
        ? "Failed to change password"
        : "Password Change successfully",
      data: !Change ? null : Change,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating password",
      data: err?.response?.data || err,
    };
  }
};
exports.UpdateEmailServices = async (user, data) => {
  try {
    let users = await User.findOne({
      _id: user._id,
    }).select("+password");
    const passwordMatch = await comparePassword(users.password, data.password);
    if (!passwordMatch) {
      return {
        error: true,
        message: "Password incorrect",
      };
    }

    let Email = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        email: data.email,
        last_issued_at: new Date(),
      },
      { new: true }
    );
    return {
      error: !Email,
      message: !Email ? "Failed to update email" : "Email updated successfully",
      data: !Email ? null : Email,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating password",
      data: err?.response?.data || err,
    };
  }
};
exports.UserNotificationService = async (user, data) => {
  try {
    let noti = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        notification: {
          push_notification: data.push_notification,
          sms: data.sms,
          email_notification: data.email_notification,
        },
        last_issued_at: new Date(),
      },
      { new: true }
    );
    return {
      error: !noti,
      message: !noti
        ? "Failed to update details"
        : "User details updated successfully",
      data: !noti ? null : noti,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating user details",
      data: err?.response?.data || err,
    };
  }
};
