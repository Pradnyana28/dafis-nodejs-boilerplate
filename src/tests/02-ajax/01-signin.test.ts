import chai, { expect } from 'chai';

import app from '../../app';
import route from '@routes/route';

describe('signin feature', () => {
    let server;

    before(async () => {
        server = await app;
    });

    it('try signin with empty field and should return false', (done) => {
        const fields = {};
        chai.request(server)
            .post(route.signin)
            .send(fields)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(err).to.be.null;
                expect(res.body).to.be.a('object');
                expect(res.body).have.property('success');
                expect(res.body).have.property('messages');
                expect(res.body.success).to.be.false;
                expect(res.body.messages).to.be.an('array');
                expect(res.body.messages).to.eql([
                    {
                        username:
                            'Field Username &#x2F; Email Address is required',
                    },
                    { password: 'Field Password is required' },
                ]);
                done();
            });
    });
});
