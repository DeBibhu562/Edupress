import bcryptjs from 'bcryptjs';
const hashedPassword = bcryptjs.hashSync(password, 10);
console.log(hashedPassword)

const valid =bcryptjs.compareSync(hashedPassword, providedPassword)
if (valid) {
    console.log("Password is correct");
} else {
    console.log("Password is incorrect");
}