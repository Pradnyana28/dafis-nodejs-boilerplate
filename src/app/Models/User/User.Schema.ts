import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export const schemaName = 'User';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: Object, default: {} },
    address: String,
    address2: String,
    city: Map,
    province: Map,
    avatar: String,
    options: Map,
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

UserSchema.methods.generatePassword = function(password: string): string {
    return bcrypt.hashSync(password, process.env.SYSTEM_SALT);
}

UserSchema.methods.verifyPassword = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('cityId').get(function() {
    return this.city ? this.city.get('id') : '';
});

UserSchema.virtual('cityName').get(function() {
    return this.city ? this.city.get('name') : '';
});

UserSchema.virtual('provinceId').get(function() {
    return this.province ? this.province.get('id') : '';
});

UserSchema.virtual('provinceName').get(function() {
    return this.province ? this.province.get('name') : '';
});

UserSchema.virtual('emailConfirmation').get(function() {
    return this.options && this.options.has('confirmation') ? this.options.get('confirmation') : null;
});

UserSchema.virtual('resetPassword').get(function() {
    return this.options && this.options.has('resetPassword') ? this.options.get('resetPassword') : null;
});

export default model(schemaName, UserSchema);