/* eslint-disable @next/next/no-img-element */
import AnalyticsBusuanzi from '@/components/AnalyticsBusuanzi'
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import CopyRightDate from '@/components/CopyRightDate'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

/**
 * 网页底脚 - 彻底移除多余横线版
 */
export const Footer = ({ title }) => {
  const PROXIO_FOOTER_LINKS = siteConfig('PROXIO_FOOTER_LINKS', [], CONFIG)

  return (
    <footer
      id='footer-bottom'
      className='z-10 justify-center m-auto w-full py-4 px-6 relative container'>
      
      <div className='max-w-6xl w-full mx-auto '>
        
        {/* 信息与链接区块 - 已移除 border-t 横线 */}
        <div className='w-full flex lg:flex-row flex-col justify-between py-6'>
          <div className='gap-y-1 flex flex-col items-start dark:text-gray-200'>
            <div className='flex gap-x-1 items-baseline'>
              <h1 className='text-base font-bold'>{title}</h1>
              <span className='text-xs underline justify-start opacity-70'>
                {siteConfig('AUTHOR')}
              </span>
            </div>
            <div className='px-0 text-sm opacity-60'>{siteConfig('CONTACT_EMAIL')}</div>
          </div>

          {/* 右侧链接区块 */}
          {PROXIO_FOOTER_LINKS?.length > 0 && (
            <div className='flex gap-x-12 mt-6 lg:mt-0'>
                {PROXIO_FOOTER_LINKS?.map((group, index) => {
                return (
                    <div key={index}>
                    <div className='font-bold text-sm dark:text-white pb-2 uppercase tracking-widest'>
                        {group.name}
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        {group?.menus?.map((menu, index) => {
                        return (
                            <div key={index}>
                            <SmartLink href={menu.href} className='text-xs hover:text-primary dark:text-gray-400 transition-colors'>
                                {menu.title}
                            </SmartLink>
                            </div>
                        )
                        })}
                    </div>
                    </div>
                )
                })}
            </div>
          )}
        </div>

        {/* 页脚版权条 - 已移除 border-t 横线，并微调间距 */}
        <div className='dark:text-gray-400 py-4 flex flex-col lg:flex-row justify-between items-center text-[10px]'>
          <div className='flex gap-x-2 flex-wrap justify-between items-center'>
            <CopyRightDate />
          </div>

          <DarkModeButton className='dark:text-white scale-75' />

          <div className='flex justify-between items-center gap-x-2'>
            <div className='flex items-center gap-x-4'>
              <AnalyticsBusuanzi />
              <SocialButton />
            </div>
          </div>
        </div>

        {/* 备案信息 */}
        <div className='dark:text-gray-500 w-full text-center flex flex-wrap items-center justify-center gap-x-2 text-[10px] mt-1'>
          <BeiAnSite />
          <BeiAnGongAn />
        </div>
      </div>
    </footer>
  )
}
