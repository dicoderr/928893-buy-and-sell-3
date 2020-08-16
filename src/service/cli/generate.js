'use strict';

const fs = require(`fs`);
const {ExitCode} = require(`../../constants`);
const {getRandomInt, shuffle, getRandomRange} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_DESC_DESC_LINES = 5;
const MAX_CATEGORIES = 3;
const FILE_NAME = `mocks.json`;

const PRICE = {
  MIN: 1000,
  MAX: 100000,
};

const TYPE = {
  OFFER: `offer`,
  SALE: `sale`,
};

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const DESC_LINES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const PIC_NUMBER = {
  MIN: 1,
  MAX: 16,
};

const getPictureFileName = () => `item${(`0` + getRandomInt(PIC_NUMBER.MIN, PIC_NUMBER.MAX)).slice(-2)}.jpg`;

const getType = () => {
  const types = Object.keys(TYPE);

  return TYPE[types[getRandomInt(0, types.length)]];
};

const generateOffers = (count) => Array(count).fill(1).map(() => ({
  title: TITLES[getRandomInt(0, TITLES.length - 1)],
  picture: getPictureFileName(),
  description: getRandomRange(shuffle(DESC_LINES), MAX_DESC_DESC_LINES).join(` `),
  type: getType(),
  sum: getRandomInt(PRICE.MIN, PRICE.MAX),
  category: getRandomRange(shuffle(CATEGORIES), MAX_CATEGORIES),
}));


module.exports = {
  name: `--generate`,
  run(args) {
    const [countArg] = args;
    const offersCount = Number.parseInt(countArg, 10) || DEFAULT_COUNT;

    if (offersCount > MAX_COUNT) {
      console.info(`Не больше 1000 объявлений`);
      process.exit(ExitCode.success);
    }

    const data = JSON.stringify(generateOffers(offersCount));
    try {
      fs.writeFileSync(FILE_NAME, data);
    } catch (e) {
      console.error(`Не удалось записать данные в файл...`);
      console.error(`Ошибка: ${e.message}`);
      process.exit(ExitCode.error);
    }
  },
};
