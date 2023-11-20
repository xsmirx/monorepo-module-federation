import webpack, {web} from 'webpack'
import path from 'path'
import {BuildMode, BuildPlatform, buildWebpack} from '@packages/build-config'
import packageJson from './package.json'

interface EnvVariables {
  mode?: BuildMode
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
      output: path.resolve(__dirname, 'build'),
    },
    mode: env.mode,
    port: env.port ?? 3001,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  })

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/Router.tsx',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    })
  )

  return config
}
