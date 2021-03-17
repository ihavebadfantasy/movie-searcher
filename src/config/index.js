export default {
  api: {
    keys: {
      db: process.env.REACT_APP_DB_API_KEY,
    },
    urls: {
      db: process.env.REACT_APP_DB_API_BASE_URL,
      dbImages: process.env.REACT_APP_DB_API_IMAGES_BASE_URL,
    },
  },
  ui: {
    dimensions: {
      headerHeight: 112,
    },
  },
  email: {
    developer: process.env.REACT_APP_DEVELOPER_EMAIL,
  },
  language: {
    default: 'ru',
  },
  themes: {
    basic: 'basic',
    nes: '8bit',
    basicUrl: process.env.REACT_APP_BASIC_THEME_CDN,
    nesUrl: process.env.REACT_APP_NES_THEME_CDN,
  }
};
