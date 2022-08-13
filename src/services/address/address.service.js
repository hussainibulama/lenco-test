const { hashPassword, comparePassword } = require("../../helpers/password");
const { jwtSign } = require("../../helpers/token");
const Address = require("./address.model");

exports.addAddressService = async (user, data) => {
  let address;
  try {
    address = await Address.create({
      user_id: user._id,
      ...data,
    });

    return {
      error: !address,
      message: !address
        ? "Error while registering creating address"
        : "Address created successfully",
      data: !address ? null : address,
    };
  } catch (err) {
    address && address.deleteOne();
    return {
      error: true,
      message: err?.msg || err?.message || "Error creating address",
      data: err?.response?.data || err,
    };
  }
};

exports.editAddressService = async (user, data) => {
  try {
    let address = await Address.findOneAndUpdate(
      {
        _id: data.id,
        user_id: user._id,
      },
      {
        ...data,
        last_issued_at: new Date(),
      },
      { new: true }
    );

    return {
      error: !address,
      message: !address
        ? "Failed to update address"
        : "Address updated successfully",
      data: !address ? null : address,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while logging user",
      data: err?.response?.data || err,
    };
  }
};
exports.getAllAddressService = async (user) => {
  try {
    let address = await Address.find({
      user_id: user._id,
    });

    return {
      error: !address,
      message: !address
        ? "Failed to get all addresses"
        : "Address retrieved successfully",
      data: !address ? null : address,
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while getting user address",
      data: err?.response?.data || err,
    };
  }
};
