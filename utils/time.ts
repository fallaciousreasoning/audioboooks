export const seconds = (num = 1) => num * 1000;
export const minutes = (num = 1) => num * seconds(60);
export const hours = (num = 1) => num * minutes(60);
export const days = (num=1) => num * hours(24);
export const weeks = (num=1) => num * days(7);

const units = {
    week: weeks(),
    day: days(),
    hour: hours(),
    minute: minutes(),
    second: seconds()
}

export const humanTime = (milliseconds: number) => {
    const unitNames = Object.keys(units);

    let remainder = milliseconds;
    let result = '';

    for (const name of unitNames) {
        const unitSize = units[name];
        const unitsRemaining = Math.floor(remainder / unitSize);

        if (unitsRemaining <= 0)
            continue;

        remainder -= unitsRemaining * unitSize;

        if (result.length)
            result += ' ';
        result += `${unitsRemaining}${name[0]}`;
    }

    return result || '0s';
}