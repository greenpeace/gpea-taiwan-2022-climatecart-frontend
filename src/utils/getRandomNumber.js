export const getRandomNumber = (digits) => {
    return Math.floor(Math.random() * Math.pow(10, digits));
}

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}