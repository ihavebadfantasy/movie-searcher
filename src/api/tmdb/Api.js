import axios from 'axios';
import config from '../../config';

export class Api {
  static instance = null;

  static get $instance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  client = null;
  apiKey = config.api.keys.db;
  language = config.language.default;

  setLanguage(language) {
    this.language = language;
  }

  async get(url, config) {
    const fullConfig = this.createFullConfig(config);
    this.initClient();

    try {
      const res = await this.client.get(url, fullConfig);

      return res.data;
    } catch (e) {
      return e.response;
    }
  }

  initClient() {
    if (!this.client) {
      this.client = axios.create({
        baseURL: config.api.urls.db
      });
    }

    return this.client;
  }

  createFullConfig(config) {
    const apiKeyParam = {
      'api_key': this.apiKey,
    };

    const language = {
      'language': this.language,
    };

    if (!config) {
      return {
        params: { ...apiKeyParam, ...language },
      }
    }

    config.params = {...config.params, ...apiKeyParam, ...language};

    return config;
  }
}
