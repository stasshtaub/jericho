export default {
  outlets: [
    {
      id: 1,
      name: "Телефон"
    },
    {
      id: 2,
      name: "e-mail"
    },
    {
      id: 3,
      name: "Сайт-визитка"
    },
    {
      id: 4,
      name: "Личное обращение"
    },
    {
      id: 5,
      name: "Обращение в точку продажи"
    },
    {
      id: 6,
      name: "Продажи с портала оборудования"
    }
  ],
  targets: [
    {
      id: 1,
      name: "Физическое лицо"
    },
    {
      id: 2,
      name: "Юридическое лицо"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Утюги"
    },
    {
      id: 2,
      name: "Холодильники"
    },
    {
      id: 3,
      name: "Плиты"
    }
  ],
  brands: [
    {
      id: 1,
      name: "LG",
      categories: [1, 3]
    },
    {
      id: 2,
      name: "Tefal",
      categories: [2, 3]
    },
    {
      id: 3,
      name: "Braun",
      categories: [1]
    },
    {
      id: 4,
      name: "Rowenta",
      categories: [1]
    },
    {
      id: 5,
      name: "Philips",
      categories: [3]
    },
    {
      id: 6,
      name: "VITEK",
      categories: [1, 2, 3]
    },
    {
      id: 7,
      name: "CANDY",
      categories: [1, 2]
    }
  ]
};
