import bcryptjs from 'bcryptjs';

import Mail, { Attachment } from '@app/Mails/Mail';
import IUser from '@app/Models/User/IUser';
import UserModel from '@app/Models/User';
import { Transporter } from 'nodemailer';

class ForgotPasswordMail extends Mail {
    private user: IUser;

    constructor(user: IUser) {
        super();
        this.user = user;
    }

    protected view(): string {
        return 'auth/forgot-password';
    }

    protected attachments(): Attachment[] {
        return [];
    }

    public async send(customTransport?: Transporter | null): Promise<string | Error> {
        try {
            if (this.user) {
                let user: IUser = this.user;
                let reset_password_link: string = '';
                if (this.user._id) {
                    const hash = bcryptjs.hashSync(this.user._id.toString(), process.env.SYSTEM_SALT).replace(/\//g, '');
                    let options: Map<any, any> = this.user.options;
                    if (typeof options == 'undefined' || options == null || !options) {
                        options = new Map;
                    }
                    options.set('resetPassword', hash);
                    user = await UserModel.updateOne({ _id: this.user._id }, { options });
                    reset_password_link = `${this.constant.app.url}/auth/resetPassword/${user._id.toString()}/${hash}`;
                }
                return await this.sendMail(this.user.email, 'Permintaan reset password', { user, reset_password_link }, customTransport);
            }
            return 'No user provided';
        } catch (err) {
            return new Error(err);
        }
    }
}

export default ForgotPasswordMail;