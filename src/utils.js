'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [arr[i], arr[randomPosition]] = [arr[randomPosition], arr[i]];
  }

  return arr;
};

const getRandomRange = (arr, max = arr.length) => {
  const count = getRandomInt(1, max);
  const pos = getRandomInt(0, arr.length - count);

  return arr.slice(pos, pos + count);
};

module.exports = {getRandomInt, shuffle, getRandomRange};
