/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

'use client'
import Loading from '@/components/Loading'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { BackToTopButton } from './components/BackToTopButton'
import { Blog } from './components/Blog'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Team } from './components/Team'
import { FAQ } from './components/FAQ'
import CONFIG from './config'
import { Style } from './style'
import Comment from '@/components/Comment'
import DashboardBody from '@/components/ui/dashboard/DashboardBody'
import DashboardHeader from '@/components/ui/dashboard/DashboardHeader'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import SmartLink from '@/components/SmartLink'
import { ArticleLock } from './components/ArticleLock'
import { Banner } from './components/Banner'
import SearchInput from './components/SearchInput'
import Lenis from '@/components/Lenis'
import CursorDot from '@/components/CursorDot'

const LayoutBase = props => {
    const { children } = props
    useEffect(() => { loadWowJS() }, [])
    return (
        <div id='theme-proxio' className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col dark:bg-dark scroll-smooth overflow-x-hidden`}>
            <Style /><Header {...props} /><main id='main-wrapper' className='grow w-full'>{children}</main>
            <Footer {...props} /><BackToTopButton /><Lenis /><CursorDot />
        </div>
    )
}

/**
 * 首页布局 - 包含排序逻辑修复与组件开关
 */
const LayoutIndex = props => {
    const { locale } = useGlobal()
    
    // 关键：根据 Notion 里的排序字段(如 01, 02)进行主动排序
    const posts = useMemo(() => {
        if (!props?.allNavPages) return []
        return [...props.allNavPages].sort((a, b) => {
            // 尝试读取排序属性，支持数字或字符串形式的 01, 02
            const sortA = parseInt(a?.properties?.order || a?.properties?.排序 || 999)
            const sortB = parseInt(b?.properties?.order || b?.properties?.排序 || 999)
            return sortA - sortB
        }).slice(0, 6)
    }, [props.allNavPages])

    return (
        <div className="flex flex-col">
            {/* Hero 模块 */}
            {siteConfig('PROXIO_HERO_ENABLE', true, CONFIG) && <section className="w-full"><Hero {...props} /></section>}
            
            {/* 装饰图片 */}
            <section className="container mx-auto px-5 lg:px-10 py-2 flex justify-center">
                <img src="/images/wan.png" alt="decoration" className="w-full max-w-screen-xl h-auto object-contain opacity-90" />
            </section>

            {/* 博客列表模块 */}
            <section className="container mx-auto px-5 lg:px-10 border-none pb-20 text-center"> 
                <Blog posts={posts} />
                <div className='flex justify-center mt-12'>
                    <SmartLink href='/archive' className='group flex items-center gap-2 px-10 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-full transition-all'>
                        <span className='text-lg font-medium'>查看更多文章</span>
                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </SmartLink>
                </div>
            </section>

            {/* 底部功能区块开关 */}
            <div className="container mx-auto px-5 lg:px-10 space-y-8 mb-10">
                {siteConfig('PROXIO_ABOUT_ENABLE', true, CONFIG) && <Team />}
                {siteConfig('PROXIO_FEATURE_ENABLE', true, CONFIG) && <Features />}
                {siteConfig('PROXIO_FAQ_ENABLE', true, CONFIG) && <FAQ />}
            </div>
        </div>
    )
}

/**
 * 归档/列表页布局
 */
const LayoutArchive = props => {
    const { posts, category, tag } = props
    const displayPosts = posts || []

    return (
        <div className="container mx-auto px-5 py-20 min-h-screen text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
                {category ? `分类: ${category}` : (tag ? `标签: ${tag}` : '全部文章')}
            </h2>

            {!category && !tag ? (
                <div className='flex flex-wrap justify-center gap-6 mb-16'>
                    <SmartLink href='/category' className='flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-primary border border-white/20 text-white rounded-xl transition-all shadow-lg'>
                        <i className="fas fa-folder text-lg"></i>
                        <span className="font-bold">按分类查看</span>
                    </SmartLink>
                    <SmartLink href='/tag' className='flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all'>
                        <i className="fas fa-tags text-lg"></i>
                        <span className="font-bold">按标签查看</span>
                    </SmartLink>
                </div>
            ) : (
                <div className="flex justify-center mb-12">
                    <SmartLink href='/archive' className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                        <i className="fas fa-chevron-left text-sm"></i>
                        <span>返回全部文章</span>
                    </SmartLink>
                </div>
            )}

            <Blog posts={displayPosts} />
        </div>
    )
}

/**
 * 分类索引中心
 */
const LayoutCategoryIndex = props => {
    const { categoryOptions } = props
    return (
        <section className='container mx-auto px-5 py-24 text-center min-h-[70vh]'>
            <h2 className='text-white font-bold text-3xl mb-12 block'>文章分类中心</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                {categoryOptions?.map(c => (
                    <SmartLink key={c.name} href={`/category/${c.name}`} className="group p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-center">
                        <i className='fas fa-folder text-primary text-3xl mb-4 block' />
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{c.name}</h3>
                        <span className="text-gray-500 text-sm mt-2 block">{c.count} 篇文章</span>
                    </SmartLink>
                ))}
            </div>
            <div className="mt-16">
                <SmartLink href='/archive' className="text-gray-500 hover:text-white transition-colors">← 返回归档列表</SmartLink>
            </div>
        </section>
    )
}

/**
 * 文章详情页 - 确保画廊组件加载
 */
const LayoutSlug = props => {
    const { post, lock, validPassword } = props
    if (!post) return <Loading />
    return (
        <article className="w-full">
            <Banner title={post?.title} description={post?.summary} />
            <div className='container mx-auto px-5 py-10 max-w-6xl'>
                {/* 使用 NotionPage 渲染，确保其能够正常解析 Notion 内置的画廊模块 */}
                {lock ? <ArticleLock validPassword={validPassword} /> : <NotionPage {...props} />}
                <div className="mt-10 border-t border-white/10 pt-10"><Comment frontMatter={post} /></div>
            </div>
        </article>
    )
}

const LayoutSearch = props => (
    <section className='container mx-auto px-5 py-24 min-h-screen text-center'>
        <SearchInput {...props} /><div className="mt-12"><Blog posts={props.posts} /></div>
    </section>
)

const LayoutTagIndex = props => (
    <section className='container mx-auto px-5 py-24 text-center min-h-[70vh]'>
        <h2 className='text-white font-bold text-3xl mb-12 block'>热门标签</h2>
        <div className='flex flex-wrap justify-center gap-4 max-w-4xl mx-auto'>
            {props.tagOptions?.map(t => (
                <SmartLink key={t.name} href={`/tag/${t.name}`} className='px-6 py-2 border border-white/10 text-white rounded-full hover:bg-primary transition-all'>#{t.name}</SmartLink>
            ))}
        </div>
    </section>
)

const LayoutDashboard = props => <div className='container mx-auto px-5 py-10'><DashboardHeader /><DashboardBody /></div>
const Layout404 = () => <div className='py-20 text-white text-center font-bold text-2xl'>404 - 页面已飞往火星</div>
const LayoutPostList = LayoutArchive
const LayoutSignIn = () => <div className="py-20 text-center text-white font-bold text-2xl">登录功能维护中</div>
const LayoutSignUp = () => <div className="py-20 text-center text-white font-bold text-2xl">注册功能维护中</div>

export {
    Layout404, LayoutArchive, LayoutBase, LayoutCategoryIndex, LayoutDashboard,
    LayoutIndex, LayoutPostList, LayoutSearch, LayoutSignIn,
    LayoutSignUp, LayoutSlug, LayoutTagIndex, CONFIG as THEME_CONFIG
}
