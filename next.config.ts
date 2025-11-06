import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 禁用 Turbopack
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: false,
      },
    },
  },
  
  serverExternalPackages: ['canvas'],
  
  webpack: (config, { isServer }) => {
    // 配置 canvas 模块的 fallback
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }

    // 忽略 canvas 模块
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push('canvas')
    }

    // 添加规则处理 .mjs 文件
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
    
    return config
  },
  // 确保静态文件正确提供
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig;
