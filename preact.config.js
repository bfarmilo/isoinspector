// preact.config.js

export default function (config, env, helpers) {
  config.node.process=true;
  config.node.Buffer=true;
  if (env.production) {
    config.output.publicPath = '/isoinspector/';
  } 
  //config.plugins.push(defineConstants({ PUBLIC_PATH }))
}