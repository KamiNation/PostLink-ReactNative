
# import { DATABASE } from "./config"

# db connection

## mongoose.set("strictQuery", false)

### mongoose

#### .connect(DATABASE)

##### .then(() => console.log("DB connected"))

##### .catch((err) => console.log("DB CONNECTION ERROR: ", err))

#

# A part of SignUp Auth Explanation

1. **`const exist = await User.findOne({ email });`**:

## - This line queries the database (presumably a MongoDB database) to find a user with the specified email address. `User` is likely a model defined somewhere in your codebase that interacts with your database. `findOne` is a MongoDB function used to find a single document that matches the provided query. It's awaiting the result because database operations are asynchronous

2. **`const user = await new User({ name, email, password: hashedPassword }).save();`**:

## - This part creates a new user object with the provided `name`, `email`, and `password`, where the password has already been hashed. The `save()` function is then called on this new user object. This function saves the new user to the database. Since it's an asynchronous operation, it's awaited

3. **`const { password, ...rest } = user._doc;`**:

## - In Mongoose (a MongoDB object modeling tool for Node.js), when you retrieve a document from the database, it's returned as a JavaScript object. `user._doc` contains the actual document data returned from the database. This line is using object destructuring to extract the `password` field from the document and put the rest of the fields (represented by `...rest`) into a new object

4. **`return res.json({ token, user: rest });`**:

## - This part returns a JSON response to the client. It includes a `token`, which is generated using JSON Web Token (JWT) to authenticate the user in subsequent requests. The `user` object contains all the user data except for the password. This prevents the password from being sent to the client, enhancing security

# A part of Reset password Auth

1. **`const hashedPassword = await hashPassword(password);`**:

## - This line calls the `hashPassword` function with the `password` as its argument. This function is assumed to be an asynchronous function that hashes the password. The `await` keyword is used because the hashing operation is asynchronous. The result, `hashedPassword`, is the hashed version of the original password

2. **`user.password = hashedPassword;`**:

## - Here, the `password` property of the `user` object is being updated with the `hashedPassword`. This means the user's password stored in the database will be the hashed version, enhancing security by not storing the plain text password

3. **`user.resetCode = "";`**:

## - This line sets the `resetCode` property of the `user` object to an empty string. It's likely used to handle password reset functionality. By setting it to an empty string, it indicates that the reset code has been used or is no longer valid

4. **`user.save();`**:

## - This line calls the `save` method on the `user` object, which persists the changes made to the user (hashed password and reset code) to the database. This operation is typically asynchronous, but in this context, it seems to be used without `await`, which might imply that it's either synchronous or the code doesn't need to wait for the save operation to complete before proceeding

5. **`return res.json({ ok: true });`**:

## - Finally, this line sends a JSON response back to the client with an object containing a single property `ok` set to `true`. This indicates that the operation (hashing the password, resetting the reset code, and saving the user) was successful

### Summary

The code snippet performs the following actions:

1. Hashes the user's password.
2. Updates the user's password with the hashed password.
3. Resets the user's reset code to an empty string.
4. Saves these changes to the database.
5. Sends a success response back to the client.

# Hashpassword not aync

```Javascript
export const hashPassword = (password) => {

return new Promise((resolve, reject) => {

bcrypt.genSalt(12, (err, salt) => {

if (err) {(err)}

bcrypt.hash(password, salt, (err, hash) => {

if (err) {
reject(err)
}
resolve(hash)
 })
})
})
}
```

# Hash password async

```Javascript
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(err);
  }
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

```

# Validation code before axios post request

 ``` javascript
 if (!name) {
 console.log("Name required =>", name);
 alert("Name is required")
setLoading(false)
 return;
}
if (!email) {
console.log("Email required =>", email);
alert("Email is required")
setLoading(false)
return
}
if (!password || password.length < 6) {
console.log("Password length short or required =>", password);
alert("Passowrd too short or Required")
setLoading(false)
return
}
```

### Salt & Hash

```salt
SALT => $2b$24$0mpEWt.C4DwMVVcpytyECe
SALT => $2b$31$9hBt2cPJbgqgRKnGUhod0u
SALT => $2b$31$bsVqIVnG.m5krvVGoJIWq.
SALT => $2b$31$YmPCDMaq67nh2dZGcPV/He
SALT => $2b$06$IFqjVbNAVrVGB8Y0Y7aR6.
SALT => $2b$12$8if89vKiQjdvTmF2MHSdIO
SALT => $2b$12$onYEIAwy6ZJMr7WS5Bafj.
SALT => $2b$31$jkl3zG1b9AMT3TyBKhe7zO
SALT => $2b$31$gVwLcZHEDqrgV0Xhl8QwjO
SALT => $2b$31$1yiYijUa0AWNdQYHX2S3IO
SALT => $2b$31$ZxJ9GxH5B3TDuCDInhUXM.
SALT => $2b$12$4sy9HSUrIQTZxhcgVcmdyO
SALT => $2b$12$KqdBpzJK7Shcu9LERvuVC.
SALT => $2b$12$pb7SWHzxMaDa/4b5UVrLMO
SALT => $2b$12$NGgtQL.OjBXHEoUM7uYSQe

HASH => $2b$12$cBdOybTprpuZvV.CPRdE9.GSG/9UEj8sMXke0BBBfowN1INWXhA5O
HASH => $2b$12$k8n4QE2jaXXniVWOEJRXf.qU4pIhKR07FuzOF2FiCD5/S16DM9Bca
HASH => $2b$12$4sy9HSUrIQTZxhcgVcmdyOAN6.jHlrhnBeaq5G2zrRZg5Fm1Vg0d2
HASH => $2b$12$KqdBpzJK7Shcu9LERvuVC.5Vn8ZWWNQd6eoeSOab2YThj7cylGUPi
HASH => $2b$12$pb7SWHzxMaDa/4b5UVrLMORyMieZSXbnmDCI.ZnGdchnn.CjtaX4S
HASH => $2b$12$NGgtQL.OjBXHEoUM7uYSQejbm5rdCnq6Z4/0ruW/BZXK6Sj2aN7yO
```
