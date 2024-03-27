import { onRequestGet as __api_capitals_ts_onRequestGet } from "/Users/nilemiller/Documents/code/pages-functions-countries-demo/functions/api/capitals.ts"
import { onRequestGet as __api_populations_ts_onRequestGet } from "/Users/nilemiller/Documents/code/pages-functions-countries-demo/functions/api/populations.ts"

export const routes = [
    {
      routePath: "/api/capitals",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_capitals_ts_onRequestGet],
    },
  {
      routePath: "/api/populations",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_populations_ts_onRequestGet],
    },
  ]