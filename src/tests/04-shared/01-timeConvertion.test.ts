import { expect } from 'chai';

import timeConvertion, { ITimeConvertion } from '@utils/timeConvertion';

/**
 * Utility -> Time Convertion Testing
 * 
 * @step should successfully convert from millisecond to second
 * @step should successfully convert from second to minute
 * @step should successfully convert from minute to hour
 */

describe('Utility -> Time Convertion', () => {
    describe('convertion: assign undefined expected a default value', () => {
        const toConvert: ITimeConvertion = timeConvertion(undefined, 'ms');
        it('param undefined convert to millisecond should return 0 (zero)', () => {
            expect(toConvert.toMs()).equal(0);
        });
        it('param undefined convert to second should return 0 (zero)', () => {
            expect(toConvert.toSecond()).equal(0);
        });
        it('param undefined convert to minute should return 0 (zero)', () => {
            expect(toConvert.toMinute()).equal(0);
        });
        it('param undefined convert to hour should return 0 (zero)', () => {
            expect(toConvert.toHour()).equal(0);
        });
    });

    describe('convertion: assign null expected a default value', () => {
        const toConvert: ITimeConvertion = timeConvertion(null, 'ms');
        it('param null convert to millisecond should return 0 (zero)', () => {
            expect(toConvert.toMs()).equal(0);
        });
        it('param null convert to second should return 0 (zero)', () => {
            expect(toConvert.toSecond()).equal(0);
        });
        it('param null convert to minute should return 0 (zero)', () => {
            expect(toConvert.toMinute()).equal(0);
        });
        it('param null convert to hour should return 0 (zero)', () => {
            expect(toConvert.toHour()).equal(0);
        });
    });

    describe('convertion: unknown convertion string', () => {
        const toConvert: ITimeConvertion = timeConvertion(60000, 'mss');
        it('unknown convertion param convert to millisecond should return 0 (zero)', () => {
            expect(toConvert.toMs()).equal(0);
        });
        it('unknown convertion param convert to millisecond should return 0 (zero)', () => {
            expect(toConvert.toSecond()).equal(0);
        });
        it('unknown convertion param convert to millisecond should return 0 (zero)', () => {
            expect(toConvert.toMinute()).equal(0);
        });
        it('unknown convertion param convert to millisecond should return 0 (zero)', () => {
            expect(toConvert.toHour()).equal(0);
        });
    });

    describe('convertion: millisecond', () => {
        const toConvert: ITimeConvertion = timeConvertion(60000, 'ms');
        it('convert 60000ms to 60000ms, return the same', () => {
            expect(toConvert.toMs()).equal(60000);
        });
        it('convert 60000ms to 60s', () => {
            expect(toConvert.toSecond()).equal(60);
        });
        it('convert 60000ms to 1 minute', () => {
            expect(toConvert.toMinute()).equal(1);
        });
        it('convert 60000ms to 0.016666666666666666 hour', () => {
            expect(toConvert.toHour()).equal(0.016666666666666666);
        })
    });

    describe('convertion: second', () => {
        const toConvert: ITimeConvertion = timeConvertion(60, 's');
        it('convert 60s to 6000ms', () => {
            expect(toConvert.toMs()).equal(60000);
        });
        it('convert 60s to 60s, return the same', () => {
            expect(toConvert.toSecond()).equal(60);
        });
        it('convert 60s to 1 minute', () => {
            expect(toConvert.toMinute()).equal(1);
        });
        it('convert 60s to 0.016666666666666666 hour', () => {
            expect(toConvert.toHour()).equal(0.016666666666666666);
        })
    });

    describe('convertion: minute', () => {
        const toConvert: ITimeConvertion = timeConvertion(1, 'm');
        it('convert 1 minute to 60000ms', () => {
            expect(toConvert.toMs()).equal(60000);
        });
        it('convert 1 minute to 60s', () => {
            expect(toConvert.toSecond()).equal(60);
        });
        it('convert 1 minute to 1 minute, return the same', () => {
            expect(toConvert.toMinute()).equal(1);
        });
        it('convert 1 minute to 0.016666666666666666 hour', () => {
            expect(toConvert.toHour()).equal(0.016666666666666666);
        })
    });

    describe('convertion: hour', () => {
        const toConvert: ITimeConvertion = timeConvertion(0.016666666666666666, 'h');
        it('convert 0.016666666666666666 hour to 60000ms', () => {
            expect(toConvert.toMs()).equal(60000);
        });
        it('convert 0.016666666666666666 hour to 60s', () => {
            expect(toConvert.toSecond()).equal(60);
        });
        it('convert 0.016666666666666666 hour to 1 minute', () => {
            expect(toConvert.toMinute()).equal(1);
        });
        it('convert 0.016666666666666666 hour to 0.016666666666666666 hour, return the same', () => {
            expect(toConvert.toHour()).equal(0.016666666666666666);
        })
    });
});
