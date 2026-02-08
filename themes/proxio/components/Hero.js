/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'
import Announcement from './Announcement' // 修正：去掉大括号，使用默认导入

export const Hero = props => {
  const config = props?.NOTION_CONFIG || CONFIG
  const PROXIO_HERO_BUTTON_1_TEXT = siteConfig('PROXIO_HERO_BUTTON_1_TEXT', null, config)
  const SHOW_ANNOUNCEMENT = siteConfig('PROXIO_ANNOUNCEMENT_ENABLE', false, config)

  return (
    <section className='w-full pt-24 pb-2 dark:text-white'>
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* 核心改动：使用 flex 分栏，消除堆叠产生的空隙 */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>
          
          {/* 左侧栏：大标题与按钮 */}
          <div className='w-full lg:w-1/2 text-center lg:text-left'>
            <h1 className='text-3xl font-black leading-tight sm:text-4xl lg:text-5xl mb-6'>
              {siteConfig('PROXIO_HERO_TITLE_1', null, config)}
            </h1>
            
            {PROXIO_HERO_BUTTON_1_TEXT && (
              <div className='flex justify-center lg:justify-start'>
                <SmartLink
                  href={siteConfig('PROXIO_HERO_BUTTON_1_URL', '')}
                  className='inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-center text-base font-bold text-dark shadow-xl transition-all hover:bg-gray-100'>
                  {PROXIO_HERO_BUTTON_1_TEXT}
                </SmartLink>
              </div>
            )}
          </div>

          {/* 右侧栏：公告组件 */}
          {SHOW_ANNOUNCEMENT && (
            <div className='w-full lg:w-1/2 mt-8 lg:mt-0'>
               {/* 包裹层设置紧凑间距，防止公告组件内部自带的大边距 */}
               <div className='max-h-60 overflow-y-auto custom-scrollbar px-2'>
                  <Announcement {...props} />
               </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}
