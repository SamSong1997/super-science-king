'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#faf9f5] text-[#141413] py-12 border-t border-[#e8e6dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#141413]">关于我们</h3>
            <p className="text-sm text-[#788c5d] leading-relaxed">
              北京理工大学出版社成立于1985年，是工业和信息化部主管、北京理工大学主办的中央级综合性出版社。
            </p>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#141413]">联系方式</h3>
            <ul className="space-y-2 text-sm text-[#788c5d]">
              <li>地址：北京市丰台区四合庄路6号院</li>
              <li>邮编：100081</li>
              <li>邮箱：edu@bitpress.com.cn</li>
              <li>电话：010-68914026 / 010-82562903</li>
            </ul>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#141413]">快速链接</h3>
            <ul className="space-y-2 text-sm text-[#788c5d]">
              <li>
                <Link href="/ebooks" className="hover:text-[#d97757] transition-colors">
                  电子书阅读器
                </Link>
              </li>
              <li>
                <Link href="/digital-teacher" className="hover:text-[#d97757] transition-colors">
                  数字人微课
                </Link>
              </li>
              <li>
                <Link href="/experiments" className="hover:text-[#d97757] transition-colors">
                  互动实验室
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="hover:text-[#d97757] transition-colors">
                  AI智能助教
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-[#e8e6dc] pt-8 text-center text-sm text-[#b0aea5]">
          <p>© {new Date().getFullYear()} 北京理工大学出版社 版权所有</p>
          <p className="mt-2">超级理科王 - 数字化学习平台</p>
        </div>
      </div>
    </footer>
  )
}
