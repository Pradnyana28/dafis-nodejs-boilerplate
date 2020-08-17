import Mail, { Attachment } from '@app/Mails/Mail';
import IUser from '@app/Models/User/IUser';
import { Transporter } from 'nodemailer';

class RegisterCompleteMail extends Mail {
    private user: IUser;

    constructor(user: IUser) {
        super();
        this.user = user;
    }

    protected view(): string {
        return 'auth/register-complete';
    }

    protected attachments(): Attachment[] {
        return [];
    }

    public async send(customTransport?: Transporter | null): Promise<string> {
        try {
            if (this.user) {
                return await this.sendMail(this.user.email, 'Proses Registrasi Selesai', this.user, customTransport);
            }
            return 'No user provided';
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default RegisterCompleteMail;