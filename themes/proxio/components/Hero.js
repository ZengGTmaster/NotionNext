/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'
import Announcement from './Announcement' // 修正导入：不加 {}，对应 index.js 的导入方式

/**
 * 英雄大图区块 - 标题在左，公告在右
 */
export const Hero = props => {
  const config = props?.NOTION_CONFIG || CONFIG
  const PROXIO_HERO_BUTTON_1_TEXT = siteConfig('PROXIO_HERO_BUTTON_1_TEXT', null, config)
  // 检查是否开启公告
  const SHOW_ANNOUNCEMENT = siteConfig('PROXIO_ANNOUNCEMENT_ENABLE', true, config)

  return (
    <section className='w-full pt-24 pb-2 dark:text-white overflow-hidden'>
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* 使用 Flex 布局实现左右分栏 */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16'>
          
          {/* 左侧栏：大标题与按钮 */}
          <div className='w-full lg:w-1/2 text-center lg:text-left space-y-4'>
            <h1 className='text-3xl font-black leading-tight sm:text-4xl lg:text-5xl'>
              {siteConfig('PROXIO_HERO_TITLE_1', null, config)}
            </h1>
            <p className='text-lg opacity-80'>
               {siteConfig('PROXIO_HERO_TITLE_2', null, config)}
            </p>
            
            {PROXIO_HERO_BUTTON_1_TEXT && (
              <div className='pt-2'>
                <SmartLink
                  href={siteConfig('PROXIO_HERO_BUTTON_1_URL', '')}
                  className='inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-center text-sm font-bold text-dark shadow-xl transition hover:bg-gray-100'>
                  {PROXIO_HERO_BUTTON_1_TEXT}
                </SmartLink>
              </div>
            )}
          </div>

          {/* 右侧栏：公告组件 */}
          {SHOW_ANNOUNCEMENT && (
            <div className='w-full lg:w-1/2 mt-10 lg:mt-0'>
              {/* 这里通过 wrapper 强行压缩公告组件的间距 */}
              <div className='[&_.announncement]:py-0 [&_.announncement]:my-0'>
                <Announcement post={props?.notice} {...props} />
              </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}
