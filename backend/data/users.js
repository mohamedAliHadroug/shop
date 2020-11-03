import bcrypt from 'bcryptjs'


const users=[{
    name : 'Admin Dali',
    email : 'dali@gmail.com',
    password : bcrypt.hashSync('123456', 10),
    isAdmin : true
},
{
    name : 'Fotoun',
    email : 'fotoun@gmail.com',
    password : bcrypt.hashSync('123456', 10)
},
{
    name : 'Eline',
    email : 'eline@gmail.com',
    password : bcrypt.hashSync('123456', 10)
}

]


export default users