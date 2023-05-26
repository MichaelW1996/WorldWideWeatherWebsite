const singledaytest = {
  dt: 1685124000,
  main: {
    temp: 17.08,
    feels_like: 15.5,
    temp_min: 16.14,
    temp_max: 17.08,
    pressure: 1021,
    sea_level: 1021,
    grnd_level: 1019,
    humidity: 25,
    temp_kf: 0.94,
  },
  weather: [
    {
      id: 802,
      main: "Clouds",
      description: "scattered clouds",
      icon: "03d",
    },
  ],
  clouds: {
    all: 25,
  },
  wind: {
    speed: 3.84,
    deg: 280,
    gust: 6.03,
  },
  visibility: 10000,
  pop: 0,
  sys: {
    pod: "d",
  },
  dt_txt: "2023-05-26 18:00:00",
};

const arrayrep = [
  {
    dt: 1685124000, //unix time of 6pm friday gmt
    main: {
      temp: 17.08,
      feels_like: 15.5,
      temp_min: 16.14,
      temp_max: 17.08,
      pressure: 1021,
      sea_level: 1021,
      grnd_level: 1019,
      humidity: 25,
      temp_kf: 0.94,
    },
    weather: [
      {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d",
      },
    ],
    clouds: {
      all: 25,
    },
    wind: {
      speed: 3.84,
      deg: 280,
      gust: 6.03,
    },
    visibility: 10000,
    pop: 0,
    sys: {
      pod: "d",
    },
    dt_txt: "2023-05-26 18:00:00",
  },
  {
    dt: 1685134800, //9pm gmt
    main: {
      temp: 12.19,
      feels_like: 10.56,
      temp_min: 9.51,
      temp_max: 12.19,
      pressure: 1023,
      sea_level: 1023,
      grnd_level: 1020,
      humidity: 42,
      temp_kf: 2.68,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04n",
      },
    ],
    clouds: {
      all: 60,
    },
    wind: {
      speed: 1.59,
      deg: 316,
      gust: 1.59,
    },
    visibility: 10000,
    pop: 0,
    sys: {
      pod: "n",
    },
    dt_txt: "2023-05-26 21:00:00",
  },
  {
    dt: 1685145600, //sat midnight
    main: {
      temp: 7.38,
      feels_like: 7.38,
      temp_min: 7.38,
      temp_max: 7.38,
      pressure: 1025,
      sea_level: 1025,
      grnd_level: 1021,
      humidity: 58,
      temp_kf: 0,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04n",
      },
    ],
    clouds: {
      all: 79,
    },
    wind: {
      speed: 0.86,
      deg: 308,
      gust: 0.94,
    },
    visibility: 10000,
    pop: 0,
    sys: {
      pod: "n",
    },
    dt_txt: "2023-05-27 00:00:00",
  },
  {
    dt: 1685156400, //sat 3am
    main: {
      temp: 6.83,
      feels_like: 6.83,
      temp_min: 6.83,
      temp_max: 6.83,
      pressure: 1024,
      sea_level: 1024,
      grnd_level: 1021,
      humidity: 62,
      temp_kf: 0,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
    clouds: {
      all: 70,
    },
    wind: {
      speed: 1.11,
      deg: 334,
      gust: 1.09,
    },
    visibility: 10000,
    pop: 0,
    sys: {
      pod: "d",
    },
    dt_txt: "2023-05-27 03:00:00",
  },
];

const testarray = [
  { name: "dave", dt: 1685156000 },
  { name: "steve", dt: 1685156400 },
  { name: "mim", dt: 1685156800 },
  { name: "mimm", dt: 1685156800 },
  { name: "mimmm", dt: 1685156800 },
  { name: "mimmmm", dt: 1685156800 },
  { name: "mimmmmm", dt: 1685156800 },
  { name: "mimmmmmm", dt: 1685156800 },
  { name: "mimmmmmmm", dt: 1685156800 },
  { name: "mimmmmmmmm", dt: 1685156800 },
  { name: "mimmmmmmmmm", dt: 1685156800 },
  { name: "mimmmmmmmmmm", dt: 1685156800 },
];
