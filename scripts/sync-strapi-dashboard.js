const config = require("../config/webpack.common");
const packages = require("../package.json");

const REACT_APP_STRAPI_URL = process.env.REACT_APP_STRAPI_URL;
const TOKEN = process.env.REACT_APP_STRAPI_TOKEN;
const ENVIRONMENT = process.env.ENVIRONMENT;

const plugin = config.plugins.find((p) => p.constructor.name === "ModuleFederationPlugin");
const exposes = plugin?._options.exposes;

const modules = exposes ? Object.keys(exposes) : [];

const update = (module) =>
  fetch(`${REACT_APP_STRAPI_URL}/api/stands/data`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    method: "POST",
    body: {
      module,
      version: packages.version,
      environment: ENVIRONMENT,
    },
  })
    .then(() => console.log(`Version of ${module} synced with strapi-dashboard`))
    .catch(() => console.log(`Failed to sync ${module} with strapi-dashboard`));

modules.forEach((module) => update(module));
