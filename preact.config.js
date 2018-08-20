// preact.config.js

export default function (config, env, helpers) {
  const PUBLIC_PATH = env.production ? '/isoinspector/' : '';
  config.output.publicPath = PUBLIC_PATH;
  //config.plugins.push(defineConstants({ PUBLIC_PATH }))
}