// preact.config.js

export default function (config, env, helpers) {
  if (env.production) {
    config.output.publicPath = '/isoinspector/'
  } 
  //config.plugins.push(defineConstants({ PUBLIC_PATH }))
}