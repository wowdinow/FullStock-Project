const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, MyStock } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
require("dotenv").config();

class Controller {
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;

      let user = await User.create({
        email,
        password,
      });
      res.status(201).json({ id: user.id, email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EmailPasswordRequired" };
      }

      let user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "InvalidEmailPassword" };
      }

      if (!comparePass(password, user.password)) {
        throw { name: "InvalidEmailPassword" };
      }

      let access_token = createToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let token = req.headers.access_token;
      const tiket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.G_Oauth_ID,
      });
      const { email, name } = tiket.getPayload();
      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create(
          {
            userName: name,
            email,
            password: "google user",
            role: "Staff",
          },
          { hooks: false }
        );
      }

      let access_token = createToken({ id: user.id });
      console.log(access_token);
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err, "ini di server");
      next(err);
    }
  }

  static async getData(req, res, next) {
    try {
      console.log("masuk gan");
      let { page } = req.query;
      let symbols = "";

      if(!page){
        page = 1
      }

        switch (+page) {
          case 1:
            symbols = "AXP,AMGN,AAPL";
            break;
          case 2:
            symbols = "BA,CAT,CSCO";
            break;
          case 3:
            symbols = "CVX,GS,HD";
            break;
          case 4:
            symbols = "HON,IBM,INTC";
            break;
          case 5:
            symbols = "JNJ,KO,JPM";
            break;
          case 6:
            symbols = "MCD,MMM,MRK";
            break;
          case 7:
            symbols = "MSFT,NKE,PG";
            break;
          case 8:
            symbols = "TRV,UNH,CRM";
            break;
          case 9:
            symbols = "VZ,V,WBA";
            break;
          case 10:
            symbols = "WMT,DIS,DOW";
            break;
          default:
            symbols = "AXP,AMGN,AAPL";
            break;
        }

        console.log(symbols, "< symbols");
      let { data: stocks } = await axios({
        url: `https://api.stockdata.org/v1/data/quote?symbols=${symbols}&api_token=${process.env.stock_api}`,
        method: "GET",
      });

      let { data: news } = await axios({
        url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.news_api}`,
        method: "GET",
      });

      res.status(200).json({ stocks: stocks.data, news: news.articles });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }

  static async stockDetail(req, res, next) {
    try {
      let { ticker } = req.params;
      let { data } = await axios({
        url: `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${process.env.stock_api}`,
        method: "GET",
      });

      res.status(200).json(data.data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async generateInvoice(req, res, next) {
    try {
      const { ticker, amount } = req.body;
        console.log(req.body);
      let { data } = await axios({
        url: `https://api.xendit.co/v2/invoices`,
        method: "POST",
        auth: {
          username: `xnd_development_${process.env.xendit_api}`,
          password: "",
        },
        data: {
          external_id: `invoice-ticket-${req.user.id}-${new Date()}`,
          amount: amount,
          payer_email: req.user.email,
          description: `Invoice for buying ${ticker}`,
          success_redirect_url: "http://localhost:5173/mystocks",
        },
      });

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addMyStock(req, res, next) {
    try {
      let { ticker, name, buyPrice, currentPrice, amount } = req.body;
      console.log(req.body);
      buyPrice = +buyPrice
      currentPrice = +currentPrice
      amount = +amount
      let share = amount / (buyPrice * 15500)
      await MyStock.create({
        ticker,
        name,
        buyPrice,
        currentPrice,
        share,
        amount,
        roe:
          ((share * currentPrice * 15500 - share * buyPrice * 15500) / amount) *
          100,
      });
      res.status(201).json({ message: "Success" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getMyStock(req, res, next) {
    try {
      let data = await MyStock.findAll({ where: { UserId: req.user.id } });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteMyStock(req, res, next) {
    try {
      let myStock = await MyStock.findOne({ where: { id: req.params.id } });

      if (!myStock) {
        throw { name: "NotFound" };
      }

      await MyStock.destroy({
        where: { id: req.params.id },
      });

      res.status(200).json({ message: "Successfully sold" });
    } catch (err) {
        console.log(err);
    }
  }
}

module.exports = Controller;
