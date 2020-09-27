import nodemail, { Transporter, SendMailOptions } from 'nodemailer';
import Logger, { ILogger } from '@utils/logger';
import Email from 'email-templates';

import path from 'path';
import constant, { IConstant } from '@utils/constant';
import { i18nConfig } from '@utils/i18n';

export interface Attachment {
    filename: string;
    content: string | Buffer;
}

class Mail {
    protected logger: ILogger;
    protected language: string = 'id';
    protected constant: IConstant;
    protected customTransport: any;

    private transporter: Transporter;
    private localizationConfig: any;

    /**
     * Mail
     *
     * @param customTransport use the transport on your own
     */
    constructor(customTransport?: any) {
        this.logger = new Logger();
        this.constant = constant(process.env);
        this.localizationConfig = {
            ...i18nConfig,
            defaultLocale: this.language,
        };
        this.init(customTransport);
    }

    /**
     * @method init
     * -------------------------------------------
     * initiate the transport confir for mail driver
     * -------------------------------------------
     * @param customTransport use the transport on your own
     */
    private init(customTransport?: any) {
        let transportConfig: any = customTransport || {
            host: this.constant.mail.host,
            port: this.constant.mail.port,
            secure: this.constant.mail.secure,
            auth: {
                user: this.constant.mail.username,
                pass: this.constant.mail.password,
            },
        };
        this.transporter = nodemail.createTransport(transportConfig);
    }

    /**
     * @method sendMail
     * -------------------------------------------
     * Use to send html email
     * -------------------------------------------
     * @param to email recipient
     * @param subject email subject
     * @param locals data to send to email template view
     * @param customTransport use custom transport to send the mail
     */
    protected async sendMail(
        to: string | string[],
        subject: string,
        locals: any,
        customTransport?: any
    ): Promise<any> {
        try {
            const email: Email = new Email({
                message: {},
                i18n: this.localizationConfig,
            });
            const templatePath = path.join(
                __dirname,
                '../../resources/views/emails/' + this.view()
            );
            const template: string = await email.render(templatePath, {
                data: locals,
                app: this.constant.app,
            });
            const emailOptions: SendMailOptions = {
                from: this.constant.mail.from,
                to: typeof to == 'string' ? to : to.join(', '),
                subject: subject,
                html: template,
            };

            if (this.attachments().length) {
                emailOptions.attachments = this.attachments();
            }

            if (customTransport) {
                await this.init(customTransport);
            }

            const info = await this.transporter.sendMail(emailOptions);
            return info.messageId;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * @method view
     * -------------------------------------------
     * Declare the view path
     * -------------------------------------------
     */
    protected view(): string {
        return path.join(__dirname, '../../resources/views/emails/index');
    }

    /**
     * @method attachments
     * -------------------------------------------
     * Collect email attachment and append it
     * to the email options
     * -------------------------------------------
     */
    protected attachments(): Attachment[] {
        return [];
    }
}

export default Mail;
