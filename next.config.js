/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
          test: /\.mdx/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@mdx-js/loader',
              options: pluginOptions.options,
            },
          ],
        })
     
        return config
      },
    images: {
        domains: [
            "res.cloudinary.com",
        ]
    }
}

module.exports = nextConfig
