/**
 * Interface Time Convertion
 * -----------------------------------------
 */
export interface ITimeConvertion {
    (n: number, i: string)
    toMs(): number
    toSecond(): number
    toMinute(): number
    toHour(): number
}

/**
 * @method timeConvertion
 * -----------------------------------------
 * A time convertion helper
 * From millisecond to second, second to minute, etc.
 * -----------------------------------------
 * @param n number
 * @param i string
 */
const timeConvertion = (n: number, i: string): any => {
    let convertion: number = 0;

    return {
        toMs: (): number => {
            if (n == null) return 0;
            if (i == 's') convertion = n * 1000;
            if (i == 'ms') convertion = n * 1;
            if (i == 'm') convertion = timeConvertion(n, i).toSecond(n) * 1000;
            if (i == 'h') convertion = timeConvertion(n, i).toSecond(n) * 1000;
            return convertion;
        },
        toSecond: (): number => {
            if (n == null) return 0;
            if (i == 's') convertion = n * 1;
            if (i == 'ms') convertion = n / 1000;
            if (i == 'm') convertion = n * 60;
            if (i == 'h') convertion = n * 60 * 60;
            return convertion;
        },
        toMinute: (): number => {
            if (n == null) return 0;
            if (i == 's') convertion = n / 60;
            if (i == 'ms') convertion = (n / 1000) / 60;
            if (i == 'm') convertion = n * 1;
            if (i == 'h') convertion = n * 60;
            return convertion;
        },
        toHour: (): number => {
            if (n == null) return 0;
            if (i == 's') convertion = timeConvertion(n, i).toMinute() / 60;
            if (i == 'ms') convertion = timeConvertion(n, i).toMinute() / 60;
            if (i == 'm') convertion = n / 60;
            if (i == 'h') convertion = n * 1;
            return convertion;
        }
    }
}

export default timeConvertion;