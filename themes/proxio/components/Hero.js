/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'

/**
 * 英雄大图区块 - 已移除背景图，保留文字并优化间距
 */
export const Hero = props => {
  const config = props?.NOTION_CONFIG || CONFIG
  const PROXIO_HERO_BUTTON_1_TEXT = siteConfig(
    'PROXIO_HERO_BUTTON_1_TEXT',
    null,
    config
  )
  const PROXIO_HERO_BUTTON_2_TEXT = siteConfig(
    'PROXIO_HERO_BUTTON_2_TEXT',
    null,
    config
  )
  const PROXIO_HERO_BUTTON_2_ICON = siteConfig(
    'PROXIO_HERO_BUTTON_2_ICON',
    null,
    config
  )

  return (
    <>
      {/* 文字标题区：通过 pt-40 确保不在导航栏下方被遮挡 */}
      <div className='w-full pt-40 pb-15 dark:text-white'>
        <div className='container -mx-4 flex flex-wrap items-center'>
          <div className='w-full px-4'>
            <div
              className='hero-content wow fadeInUp mx-auto max-w-[780px] text-center'
              data-wow-delay='0.5s'>
              {/* 主标题 */}
              <h1 className='mb-6 text-3xl font-bold leading-snug sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]'>
                {siteConfig('PROXIO_HERO_TITLE_1', null, config)}
              </h1>
              {/* 次标题 */}
              <p className='mx-auto mb-9 max-w-[600px] text-base font-medium  sm:text-lg sm:leading-[1.44]'>
                {siteConfig('PROXIO_HERO_TITLE_2', null, config)}
              </p>
              {/* 按钮组 */}
              <ul className='mb-10 flex flex-wrap items-center justify-center gap-5'>
                {PROXIO_HERO_BUTTON_1_TEXT && (
                  <li>
                    <SmartLink
                      href={siteConfig('PROXIO_HERO_BUTTON_1_URL', '')}
                      className='inline-flex items-center justify-center rounded-2xl bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2'>
                      {PROXIO_HERO_BUTTON_1_TEXT}
                    </SmartLink>
                  </li>
                )}
                {PROXIO_HERO_BUTTON_2_TEXT && (
                  <li>
                    <SmartLink
                      href={siteConfig('PROXIO_HERO_BUTTON_2_URL', '')}
                      className='inline-flex items-center justify-center rounded-2xl bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2'>
                      {PROXIO_HERO_BUTTON_2_ICON && (
                        <img className='mr-4 w-5' src={PROXIO_HERO_BUTTON_2_ICON} />
                      )}
                      {PROXIO_HERO_BUTTON_2_TEXT}
                    </SmartLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
