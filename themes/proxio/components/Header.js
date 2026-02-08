/* eslint-disable no-unreachable */
import DashboardButton from '@/components/ui/dashboard/DashboardButton'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import throttle from 'lodash.throttle'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { DarkModeButton } from './DarkModeButton'
import { MenuList } from './MenuList'

/**
 * 顶部导航栏 - 紧凑优化版
 */
export const Header = props => {
    const router = useRouter()
    const { isDarkMode } = useGlobal()
    const [buttonTextColor, setColor] = useState(
        router.route === '/' ? 'text-white' : ''
    )

    useEffect(() => {
        if (isDarkMode || router.route === '/') {
            setColor('text-white')
        } else {
            setColor('')
        }
    }, [isDarkMode, router.route])

    return (
        <>
            {/* */}
            {/* 1. 移除多余的 flex 默认高度，通过 py-2 (8px) 严格控制上下内边距 */}
            <div className='ud-header absolute left-0 top-0 z-40 flex w-full items-center bg-transparent py-2'>
                {/* 2. 使用 max-w-6xl 保持与 Footer 和 Blog 一致的宽度，视觉更统一 */}
                <div className='container max-w-6xl mx-auto'>
                    <div className='relative flex items-center justify-between'>
                        {/* Logo 预留位 */}
                        <div className='px-4 flex items-center'>
                           {/* 如果后续要加 Logo 可以放在这里 */}
                        </div>

                        {/* 右侧菜单 */}
                        {/* 3. 移除 pr-16 这种大边距，改为标准的 px-4，让菜单分布更自然 */}
                        <div className='flex items-center gap-4 justify-end px-4 lg:pr-0'>
                            <MenuList {...props} />
                            {/* 可以在这里直接插入深色模式按钮，如果需要的话 */}
                        </div>
                    </div>
                </div>
            </div>
            {/* */}
        </>
    )
}
