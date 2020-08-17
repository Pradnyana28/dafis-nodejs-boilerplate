import bcryptjs from 'bcryptjs';

import Mail, { Attachment } from '@app/Mails/Mail';
import IUser from '@app/Models/User/IUser';
import UserModel from '@app/Models/User';
import { Transporter } from 'nodemailer';

class RegisterConfirmationMail extends Mail {
    private user: IUser;

    constructor(user: IUser) {
        super();
        this.user = user;
    }

    protected view(): string {
        return 'auth/register-confirmation';
    }

    protected attachments(): Attachment[] {
        return [];
    }

    public async send(customTransport?: Transporter | null): Promise<any> {
        try {
            if (this.user) {
                let user: any = this.user;
                let confirmation_link: string = '';
                if (this.user._id) {
                    const hash = bcryptjs.hashSync(this.user._id.toString(), process.env.SYSTEM_SALT).replace(/\//g, '');
                    let options: Map<any, any> = this.user.options;
                    if (typeof options == 'undefined' || options == null || !options) {
                        options = new Map;
                    }
                    options.set('confirmation', hash);
                    user = await UserModel.updateOne({ _id: this.user._id }, { options });
                    confirmation_link = `${this.constant.app.url}/confirmation/${hash}`;
                }
                return await this.sendMail(this.user.email, 'Satu langkah lagi dengan konfirmasi email', { user, confirmation_link }, customTransport);
            }
            return 'No user provided';
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default RegisterConfirmationMail;