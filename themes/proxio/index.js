/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

'use client'
import Loading from '@/components/Loading'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { Career } from './components/Career'
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
import replaceSearchResult from '@/components/Mark'
import ShareBar from '@/components/ShareBar'
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
 * 首页布局 - 手动截取 6 篇
 */
const LayoutIndex = props => {
    const { locale } = useGlobal()
    const posts = useMemo(() => (props?.allNavPages ? props.allNavPages.slice(0, 6) : []), [props.allNavPages])

    return (
        <div className="flex flex-col">
            {siteConfig('PROXIO_HERO_ENABLE', true, CONFIG) && <section className="w-full"><Hero {...props} /></section>}
            <section className="container mx-auto px-5 lg:px-10 py-2 flex justify-center">
                <img src="/images/wan.png" alt="decoration" className="w-full max-w-screen-xl h-auto object-contain opacity-90" />
            </section>
            <section className="container mx-auto px-5 lg:px-10 border-none pb-20"> 
                <Blog posts={posts} />
                <div className='flex justify-center mt-12'>
                    <SmartLink href='/archive' className='group flex items-center gap-2 px-10 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-full transition-all'>
                        <span className='text-lg font-medium'>查看更多文章</span>
                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </SmartLink>
                </div>
            </section>
            <div className="container mx-auto px-5 lg:px-10 space-y-8 mb-10">
                <Team /><Features /><FAQ />
            </div>
        </div>
    )
}

/**
 * 归档及分类布局 - 展示全量
 */
const LayoutArchive = props => {
    const displayPosts = props.posts || [] 
    return (
        <div className="container mx-auto px-5 py-20 min-h-screen">
            <h2 className="text-4xl font-bold text-white text-center mb-10">
                {props.category ? `分类: ${props.category}` : (props.tag ? `标签: ${props.tag}` : '全部文章')}
            </h2>
            <div className="flex justify-center mb-10">
                <SmartLink href='/category' className="text-primary hover:underline text-sm">
                   <i className="fas fa-th-large mr-2"></i>返回分类中心
                </SmartLink>
            </div>
            <Blog posts={displayPosts} />
        </div>
    )
}

const LayoutCategoryIndex = props => {
    const { categoryOptions } = props
    return (
        <section className='container mx-auto px-5 py-24 text-center min-h-[70vh]'>
            <h2 className='text-white font-bold text-3xl mb-12 block'>文章分类</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                {categoryOptions?.map(c => (
                    <SmartLink key={c.name} href={`/category/${c.name}`} className="group p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                        <i className='fas fa-folder text-primary text-2xl mb-4 block' />
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{c.name}</h3>
                        <span className="text-gray-500 text-sm mt-2 block">{c.count} 篇文章</span>
                    </SmartLink>
                ))}
            </div>
        </section>
    )
}

const LayoutSlug = props => {
    const { post, lock, validPassword } = props
    if (!post) return <Loading />
    return (
        <article className="w-full">
            <Banner title={post?.title} description={post?.summary} />
            <div className='container mx-auto px-5 py-10 max-w-6xl'>
                {lock ? <ArticleLock validPassword={validPassword} /> : <NotionPage {...props} />}
                <div className="mt-10 border-t border-white/10 pt-10"><Comment frontMatter={post} /></div>
            </div>
        </article>
    )
}

const LayoutSearch = props => (
    <section className='container mx-auto px-5 py-24 min-h-screen'>
        <SearchInput {...props} /><div className="mt-12"><Blog posts={props.posts} /></div>
    </section>
)

const LayoutTagIndex = props => (
    <section className='container mx-auto px-5 py-24 text-center min-h-[70vh]'>
        <div className='flex flex-wrap justify-center gap-4'>{props.tagOptions?.map(t => (
            <SmartLink key={t.name} href={`/tag/${t.name}`} className='px-6 py-2 border border-white/10 text-white rounded-full hover:bg-primary transition-all'>#{t.name}</SmartLink>
        ))}</div>
    </section>
)

const LayoutDashboard = props => <div className='container mx-auto px-5 py-10'><DashboardHeader /><DashboardBody /></div>
const Layout404 = () => <div className='py-20 text-white text-center'>404 - 页面未找到</div>
const LayoutPostList = LayoutArchive
const LayoutSignIn = () => <div className="py-20 text-center text-white font-bold text-2xl">登录功能维护中</div>
const LayoutSignUp = () => <div className="py-20 text-center text-white font-bold text-2xl">注册功能维护中</div>

export {
    Layout404, LayoutArchive, LayoutBase, LayoutCategoryIndex, LayoutDashboard,
    LayoutIndex, LayoutPostList, LayoutSearch, LayoutSignIn,
    LayoutSignUp, LayoutSlug, LayoutTagIndex, CONFIG as THEME_CONFIG
}
