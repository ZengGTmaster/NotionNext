/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'

/**
 * 英雄大图区块 - 左右分栏精简版
 */
export const Hero = props => {
  const config = props?.NOTION_CONFIG || CONFIG
  const PROXIO_HERO_BUTTON_1_TEXT = siteConfig('PROXIO_HERO_BUTTON_1_TEXT', null, config)
  
  // 这里的 TITLE_2 我们将其视为公告内容，放在右侧
  const announcementText = siteConfig('PROXIO_HERO_TITLE_2', null, config)

  return (
    <section className='w-full pt-24 pb-2 dark:text-white overflow-hidden'>
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* 使用 flex-row 实现左右布局，并设置居中对齐 */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16'>
          
          {/* 左侧栏：主标题与按钮 */}
          <div className='w-full lg:w-1/2 text-center lg:text-left space-y-4'>
            <h1 className='text-3xl font-black leading-tight sm:text-4xl lg:text-5xl'>
              {siteConfig('PROXIO_HERO_TITLE_1', null, config)}
            </h1>
            
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

          {/* 右侧栏：原公告内容 (TITLE_2) */}
          {announcementText && (
            <div className='w-full lg:w-1/2'>
              <div className='p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm'>
                <p className='text-sm sm:text-base leading-relaxed text-gray-300 italic'>
                  “ {announcementText} ”
                </p>
                <div className='mt-3 flex justify-end'>
                   <span className='h-1 w-12 bg-primary/50 rounded-full'></span>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}
