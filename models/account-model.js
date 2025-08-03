
const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* ***************************
 *  Get Account By ID
 * ************************** */
async function getAccountById(account_id) {
  try {
      const sql = "SELECT * FROM account WHERE account_id = $1";
      const result = await pool.query(sql, [account_id]);
      return result.rows[0];
  } catch (error) {
      console.error("Error retrieving account by ID:", error);
      return null;
  }
}

/* ***************************
*  Update Account Information
* ************************** */
async function updateAccountInfo(account_id, account_firstname, account_lastname, account_email) {
  try {
      const sql = `
          UPDATE account 
          SET account_firstname = $1, account_lastname = $2, account_email = $3 
          WHERE account_id = $4 RETURNING *`;
      const data = await pool.query(sql, [account_firstname, account_lastname, account_email, account_id]);
      return data.rows[0];
  } catch (error) {
      console.error("Error updating account:", error);
      return null;
  }
}

/* ***************************
*  Update Password
* ************************** */
async function updatePassword(account_id, hashedPassword) {
  try {
      const sql = `UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *`;
      const result = await pool.query(sql, [hashedPassword, account_id]);
      return result.rowCount;
  } catch (error) {
      console.error("Password update error:", error);
      return null;
  }
}


/* *****************************
 *  Add Item to Wishlist
 * ***************************** */
async function addToWishlist(account_id, inv_id) {
  try {
    const sql = `
      INSERT INTO wishlist (account_id, inv_id) 
      VALUES ($1, $2) 
      ON CONFLICT (account_id, inv_id) 
      DO NOTHING RETURNING *`;
    const result = await pool.query(sql, [account_id, inv_id]);
    return result.rowCount;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return null;
  }
}

/* *****************************
 *  Remove Item from Wishlist
 * ***************************** */
async function removeFromWishlist(account_id, inv_id) {
  try {
    const sql = `DELETE FROM wishlist WHERE account_id = $1 AND inv_id = $2 RETURNING *`;
    const result = await pool.query(sql, [account_id, inv_id]);
    return result.rowCount; 
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return null;
  }
}

/* *****************************
 *  Get Wishlist Items for User
 * ***************************** */
async function getWishlist(account_id) {
  try {
    const sql = `
      SELECT i.inv_id, i.inv_make, i.inv_model, i.inv_price, i.inv_thumbnail 
      FROM wishlist w 
      JOIN inventory i ON w.inv_id = i.inv_id
      WHERE w.account_id = $1`;
    const result = await pool.query(sql, [account_id]);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    return [];
  }
}

module.exports = { registerAccount, getAccountByEmail, getAccountById, updateAccountInfo, updatePassword, addToWishlist, removeFromWishlist, getWishlist}
