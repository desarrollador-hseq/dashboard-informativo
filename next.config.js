/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "utfs.io"
        ]
    },
    webpack: (config, { buildId, def, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encodig = false;
        return config;
      },
}

module.exports = nextConfig
