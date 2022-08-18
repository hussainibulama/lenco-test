const { hashPassword, comparePassword } = require("../../helpers/password");
const { jwtSign } = require("../../helpers/token");
const knex = require("../../../knex.js");
const moment = require("moment");
const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
exports.registerUser = async (res, data) => {
  let user;
  try {
    const password = hashPassword(data.password);
    const email = data.email && data.email.toLowerCase();

    console.log(date);
    user = await knex("users").insert(
      {
        name: data.name,
        email: email,
        password: password,
        wallet: 0,
        created_at: date,
        updated_at: date,
      },
      {
        includeTriggerModifications: true,
      }
    );

    return {
      error: !user,
      message: !user
        ? "Error while registering user"
        : "User registered successfully",
      data: !user
        ? null
        : {
            email: data.email,
            name: data.name,
          },
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

    const accessToken = jwtSign(user.id);
    await knex("users").where("id", user.id).update({
      updated_at: date,
    });

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
exports.UserUpdateBalanceService = async (user, data) => {
  try {
    console.log("hey", user);
    let wal = await knex("users")
      .where("id", user.id)
      .update({
        wallet: Number(user.wallet + data.amount),
        updated_at: date,
      });

    return {
      error: !wal,
      message: !wal ? "Failed to update phone" : "Phone updated successfully",
      data: !wal
        ? null
        : {
            oldBal: user.wallet,
            newBal: Number(user.wallet + data.amount),
          },
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating user phone",
      data: err?.response?.data || err,
    };
  }
};
exports.UserWithdrawService = async (user, data) => {
  try {
    if (user.wallet < data.amount) {
      return {
        error: true,
        message: "Insufficient amount",
        data: null,
      };
    }
    let wal = await knex("users")
      .where("id", user.id)
      .update({
        wallet: Number(user.wallet - data.amount),
        updated_at: date,
      });
    return {
      error: !wal,
      message: !wal ? "Failed to withdraw " : "User withdraw successfully",
      data: {
        oldBal: user.wallet,
        newBal: Number(user.wallet - data.amount),
      },
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating user details",
      data: err?.response?.data || err,
    };
  }
};
exports.UserTransferService = async (user, data) => {
  try {
    if (user.wallet < data.amount) {
      return {
        error: true,
        message: "Insufficient amount",
        data: null,
      };
    }
    let usr = await knex("users").where("email", data.email);
    if (usr.length <= 0) {
      return {
        error: true,
        message: "user doesn`t exist in our system",
        data: null,
      };
    }
    let uEmail = usr[0].email;
    let uWal = usr[0].wallet;
    console.log("hehe", uEmail, uWal, data.amount);
    let tuser = await knex("users")
      .where("email", uEmail)
      .update({
        wallet: Number(uWal + data.amount),
        updated_at: date,
      });
    let wal;
    if (tuser) {
      wal = await knex("users")
        .where("id", user.id)
        .update({
          wallet: Number(user.wallet - data.amount),
          updated_at: date,
        });
    }
    return {
      error: !tuser && !wal,
      message: !tuser && !wal ? "transfer fail" : "transfer successful",
      data:
        !tuser && !wal
          ? null
          : {
              oldBal: user.wallet,
              newBal: Number(user.wallet - data.amount),
            },
    };
  } catch (err) {
    return {
      error: true,
      message: err?.msg || err?.message || "Error while updating password",
      data: err?.response?.data || err,
    };
  }
};
