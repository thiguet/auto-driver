import {Env} from "@tsed/core";
import {Configuration, Inject} from "@tsed/di";
import {$log, PlatformApplication} from "@tsed/common";
import "@tsed/platform-express";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/typeorm";
import {IndexCtrl} from "./controllers/pages/IndexCtrl";
import "dotenv/config";

export const rootDir = __dirname;
export const isProduction = process.env.NODE_ENV === Env.PROD;

if (isProduction) {
  $log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "json"
    }
  });

  $log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
      type: "json"
    }
  });
}

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false,
  logger: {
    disableRoutesSummary: isProduction
  },
  mount: {
    "/v1": [`${rootDir}/controllers/**/*.ts`],
    "/": [IndexCtrl]
  },
  swagger: [
    {
      path: "/docs/v3",
      specVersion: "3.0.1"
    }
  ],
  typeorm: [
    {
      host: `${process.env.DB_HOST}`,
      port: parseInt(`${process.env.DB_PORT}`, 10),
      username: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASS}`,
      database: `${process.env.DB_NAME}`,
      synchronize: true,
      name: "default",
      type: "postgres",
      entities: [`${__dirname}/entity/*{.ts,.js}`],
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      subscribers: [`${__dirname}/subscriber/*{.ts,.js}`]
    }
  ],
  views: {
    root: `${rootDir}/../views`,
    viewEngine: "ejs"
  },
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );
  }
}
