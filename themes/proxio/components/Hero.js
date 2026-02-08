/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'
import { Announcement } from './Announcement' // 确保导入了公告组件

/**
 * 英雄大图区块 - 公告移至标题右侧优化版
 */
export const Hero = props => {
  const config = props?.NOTION_CONFIG || CONFIG
  const PROXIO_HERO_BUTTON_1_TEXT = siteConfig('PROXIO_HERO_BUTTON_1_TEXT', null, config)
  const SHOW_ANNOUNCEMENT = siteConfig('PROXIO_ANNOUNCEMENT_ENABLE', false, config)

  return (
    <section className='w-full pt-24 pb-2 dark:text-white'>
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* 使用 Flex 布局：宽屏 lg 为 row(左右)，手机端为 col(上下) */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          
          {/* 左侧栏：标题与按钮 (占据 60% 宽度) */}
          <div className='w-full lg:w-3/5 text-center lg:text-left space-y-6'>
            <h1 className='text-3xl font-black leading-tight sm:text-4xl lg:text-5xl'>
              {siteConfig('PROXIO_HERO_TITLE_1', null, config)}
            </h1>
            <p className='text-lg opacity-80'>
               {siteConfig('PROXIO_HERO_TITLE_2', null, config)}
            </p>
            
            {PROXIO_HERO_BUTTON_1_TEXT && (
              <div className='flex justify-center lg:justify-start'>
                <SmartLink
                  href={siteConfig('PROXIO_HERO_BUTTON_1_URL', '')}
                  className='inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-center text-base font-bold text-dark shadow-xl transition hover:bg-gray-100'>
                  {PROXIO_HERO_BUTTON_1_TEXT}
                </SmartLink>
              </div>
            )}
          </div>

          {/* 右侧栏：公告组件 (占据 40% 宽度) */}
          {SHOW_ANNOUNCEMENT && (
            <div className='w-full lg:w-2/5'>
               {/* 这里直接嵌入公告组件，通过样式控制它的上下空隙 */}
               <div className='hero-announcement-wrapper py-2'>
                  <Announcement {...props} />
               </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}
