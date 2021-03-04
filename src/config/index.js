export default {
  api: {
    keys: {
      db: process.env.REACT_APP_DB_API_KEY,
    },
    urls: {
      db: process.env.REACT_APP_DB_API_BASE_URL,
      dbImages: process.env.REACT_APP_DB_API_IMAGES_BASE_URL,
    }
  },
  ui: {
    dimensions: {
      headerHeight: 112,
    },
  },
};
