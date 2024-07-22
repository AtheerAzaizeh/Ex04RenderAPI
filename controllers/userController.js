
import { accessToApp } from "../server.js";
import { connection } from "../server.js";

export async function registerUser(req, res) {
  try {
    const { username, password, accessCode } = req.body;

    // Check if username already exists (using prepared statement recommended)
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    const [existingUser] = await connection.promise().query(checkQuery, [username]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Hash password before inserting (replace with your hashing logic)
    const hashedPassword = hashPassword(password); // Replace with actual hashing function

    // Insert new user using prepared statement
    const insertQuery = "INSERT INTO users (username, password, accessCode) VALUES (?, ?, ?)";
    await connection.query(insertQuery, [username, hashedPassword, accessCode]);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user!" });
  }
}


export async function loginUser(req, res) {
  try {
    const { username, password, accessCode } = req.body;

    // Login logic using prepared statement
    const loginQuery = "SELECT * FROM users WHERE username = ? AND password = ? AND accessCode = ?";
    const [user] = await connection.promise().query(loginQuery, [username, password, accessCode]);

    if (user.length > 0) {
      res.status(200).json({ message: "Login successful", user: user[0] }); // Return only the first user object
      accessToApp.isLogin = true;
      accessToApp.accsessCode = accessCode; 
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in!" });
  }
}
