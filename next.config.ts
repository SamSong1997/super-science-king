import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 添加空的 turbopack 配置以消除警告
  turbopack: {},
  
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }
    
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }

    // 忽略 pdfjs-dist 的某些模块
    config.externals = config.externals || []
    if (!isServer) {
      config.externals.push({
        'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.entry',
      })
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
