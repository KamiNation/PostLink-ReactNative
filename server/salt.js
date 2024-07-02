// import bcrypt from "bcrypt";


// const password = " "
// "$2b$12$4sy9HSUrIQTZ xhcgVcmdy OAN6.jHlrhnBeaq5G2zrRZg5Fm1Vg0d2"
// "$2b$24$0mpEWt.C4DwMVVcpytyECe";
// const hashed = ""
// "$2b$12$cBdOybTprpuZvV.CPRdE9.GSG/9UEj8sMXke0BBBfowN1INWXhA5O"
// "$2b$12$k8n4QE2jaXXniVWOEJRXf.qU4pIhKR07FuzOF2FiCD5/S16DM9Bca"


// async function hashPassword(password) {
//   try {
//     const salt = await bcrypt.genSalt(12);
//     console.log("SALT =>", salt);
//     const hash = await bcrypt.hash(password, salt);
//     console.log("HASH =>", hash);
//     return hash;
//   } catch (err) {
//     throw new Error(err);
//   }
// }


// hashPassword(password)



// const comparePassword = (password, hashed) => {
//   return  bcrypt.compare(password, hashed);
// };

// async function checkingCompared() {
//   const compared = await comparePassword(password, hashed)
//   console.log(compared);
// }

// checkingCompared()