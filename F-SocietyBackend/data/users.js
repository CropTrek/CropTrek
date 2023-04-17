import bcrypt from 'bcryptjs'
const users=
[
{
    name:"Admin",
    email:"admin@email.com",
    password:bcrypt.hashSync("123456",10)
    ,
    isAdmin:true,
},
{
    name:"user",
    email:"user@email.com",
    password:bcrypt.hashSync("123456",10)

},
{
    name:"user2",
    email:"user@email.com",
    password:bcrypt.hashSync("123456",10)

},
{
    name:"user3",
    email:"user@email.com",
    password:bcrypt.hashSync("123456",10)

}

]
export default users;