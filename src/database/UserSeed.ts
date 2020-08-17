import bcrypt from 'bcryptjs';
import faker from 'faker';

import UserSchema from '../app/Models/User/User.Schema';

export default async () => {
    try {
        let users = [];
        for (let i = 0; i < 10; i += 1) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email(firstName, lastName);
            let newUser = {
                email: email,
                username: email,
                firstName,
                lastName,
                password: bcrypt.hashSync('Password', process.env.SYSTEM_SALT),
                emailVerified: true,
                address: faker.address.streetName(),
                address2: faker.address.secondaryAddress(),
                city: { id: 'ighIGs6desgdAsdskdads', name: faker.address.city() },
                province: { id: 'ighIGs6desgdAsdskdads', name: faker.address.state() },
            };
            users.push(newUser);
        
            // visual feedback always feels nice!
            console.log(newUser.email);
        }
        await UserSchema.insertMany(users);
        console.log('Users seeded!');
    } catch (err) {
        console.error(err);
    }
}