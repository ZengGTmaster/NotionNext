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
import { Brand } from './components/Brand'
import { FAQ } from './components/FAQ'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Team } from './components/Team'
import { Testimonials } from './components/Testimonials'
import CONFIG from './config'
import { Style } from './style'
import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import ShareBar from '@/components/ShareBar'
import DashboardBody from '@/components/ui/dashboard/DashboardBody'
import DashboardHeader from '@/components/ui/dashboard/DashboardHeader'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { SignIn, SignUp } from '@clerk/nextjs'
import SmartLink from '@/components/SmartLink'
import { ArticleLock } from './components/ArticleLock'
import { Banner } from './components/Banner'
import { CTA } from './components/CTA'
import SearchInput from './components/SearchInput'
import { SignInForm } from './components/SignInForm'
import { SignUpForm } from './components/SignUpForm'
import { SVG404 } from './components/svg/SVG404'
import Lenis from '@/components/Lenis'
import CursorDot from '@/components/CursorDot'

/**
 * 布局框架
 */
const LayoutBase = props => {
    const { children } = props
    useEffect(() => { loadWowJS() }, [])

    return (
        <div id='theme-proxio' className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col dark:bg-dark scroll-smooth overflow-x-hidden`}>
            <Style />
            <Header {...props} />
            <main id='main-wrapper' className='grow w-full'>
                {children}
            </main>
            <Footer {...props} />
            <BackToTopButton />
            <Lenis />
            <CursorDot />
        </div>
    )
}

/**
 * 首页布局
 */
const LayoutIndex = props => {
    const { locale } = useGlobal()
    const count = 6 
    const posts = useMemo(() => (props?.allNavPages ? props.allNavPages.slice(0, count) : []), [props.allNavPages, count])

    return (
        <div className="flex flex-col">
            {siteConfig('PROXIO_HERO_ENABLE', true, CONFIG) && (
                <section className="w-full">
                    <Hero {...props} />
                </section>
            )}

            <section className="container mx-auto px-5 lg:px-10 py-2 flex justify-center">
                <img 
                    src="/images/wan.png" 
                    alt="decoration" 
                    className="w-full max-w-screen-xl h-auto object-contain opacity-90" 
                    onError={(e) => { e.target.style.display = 'none' }} 
                />
            </section>

            {siteConfig('PROXIO_BLOG_ENABLE', true, CONFIG) && (
                <section className="container mx-auto px-5 lg:px-10 border-none"> 
                    <div className="py-8">
                        <Blog posts={posts} />
                        <div className='flex justify-center mt-12'>
                            <SmartLink 
                                href='/archive' 
                                className='group flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-full transition-all duration-300'
                            >
                                <span className='text-lg font-medium'>{locale.COMMON.MORE}</span>
                                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                            </SmartLink>
                        </div>
                    </div>
                </section>
            )}

            <div className="container mx-auto px-5 lg:px-10 space-y-8 mb-10 mt-10">
                {siteConfig('PROXIO_ABOUT_ENABLE', true, CONFIG) && <Team />}
                {siteConfig('PROXIO_FEATURE_ENABLE', true, CONFIG) && <Features />}
                {siteConfig('PROXIO_FAQ_ENABLE', true, CONFIG) && <FAQ />}
            </div>
        </div>
    )
}

/**
 * 归档/列表页布局 - 修复分类点击跳转逻辑
 */
const LayoutArchive = props => {
    const { locale } = useGlobal()
    const { posts, category, tag } = props

    // 如果是具体的分类页或标签页，显示对应的标题
    const pageTitle = category ? `${locale.COMMON.CATEGORY}: ${category}` : (tag ? `${locale.COMMON.TAGS}: ${tag}` : '全部文章')

    return (
        <div className="container mx-auto px-5 py-20 min-h-screen">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">{pageTitle}</h2>
                {!category && !tag && <p className="text-gray-400">在这里可以查看我过去所有的教学记录与记录</p>}
            </div>

            {/* 只有在总归档页才显示分类/标签大按钮 */}
            {!category && !tag && (
                <div className='flex flex-wrap justify-center gap-4 mb-16'>
                    <SmartLink href='/category' className='flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white rounded-full transition-all'>
                        <i className="fas fa-folder text-sm"></i>
                        <span>{locale.COMMON.CATEGORY}</span>
                    </SmartLink>
                    <SmartLink href='/tag' className='flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/20 border border-white/10 text-white rounded-full transition-all'>
                        <i className="fas fa-tag text-sm"></i>
                        <span>{locale.COMMON.TAGS}</span>
                    </SmartLink>
                </div>
            )}

            {posts && posts.length > 0 ? (
                <Blog {...props} posts={posts} />
            ) : (
                <div className="text-center text-gray-500 py-20">暂无文章</div>
            )}
        </div>
    )
}

/**
 * 分类列表索引页
 */
const LayoutCategoryIndex = props => {
    const { categoryOptions } = props
    const { locale } = useGlobal()
    return (
        <section className='container mx-auto px-5 py-24 text-center min-h-[70vh]'>
            <h2 className='text-white font-bold text-3xl mb-12 block'>{locale.COMMON.CATEGORY}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                {categoryOptions?.map(c => (
                    <SmartLink key={c.name} href={`/category/${c.name}`} className="group p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                        <i className='fas fa-folder text-primary text-2xl mb-4 block' />
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {c.name}
                        </h3>
                        <span className="text-gray-500 text-sm mt-2 block">{c.count} 篇文章</span>
                    </SmartLink>
                ))}
            </div>
        </section>
    )
}

/**
 * 标签列表索引页
 */
const LayoutTagIndex = props => {
    const { tagOptions } = props
    const { locale } = useGlobal()
    return (
        <section className='container mx-auto px-5 py-24 text-center min-h-[70vh]'>
            <h2 className='text-white font-bold text-3xl mb-12 block'>{locale.COMMON.TAGS}</h2>
            <div className='flex flex-wrap justify-center gap-4 max-w-4xl mx-auto'>
                {tagOptions.map(t => (
                    <SmartLink key={t.name} href={`/tag/${encodeURIComponent(t.name)}`} className={`px-6 py-2 rounded-full border border-white/10 hover:bg-primary text-white transition-all`}>
                        #{t.name} <span className="text-white/50 ml-1">{t.count}</span>
                    </SmartLink>
                ))}
            </div>
        </section>
    )
}

/**
 * 文章详情页布局
 */
const LayoutSlug = props => {
    const { post, lock, validPassword } = props
    const router = useRouter()
    useEffect(() => {
        if (!post && siteConfig('PROXIO_POST_REDIRECT_ENABLE') && isBrowser && router.route === '/[prefix]/[slug]') {
            const redirectUrl = siteConfig('PROXIO_POST_REDIRECT_URL') + router.asPath.replace('?theme=landing', '')
            router.push(redirectUrl)
        }
    }, [post, router])
    if (!post && siteConfig('PROXIO_POST_REDIRECT_ENABLE')) return <div id='theme-proxio'><Loading /></div>
    return (
        <article className="w-full">
            <Banner title={post?.title} description={post?.summary} />
            <div className='container mx-auto px-5 py-10 max-w-6xl'>
                {lock ? <ArticleLock validPassword={validPassword} /> : (
                    post && (
                        <div id='article-wrapper' className='mx-auto'>
                            <NotionPage {...props} />
                            <div className="mt-10 border-t pt-10">
                                <Comment frontMatter={post} />
                                <ShareBar post={post} />
                            </div>
                        </div>
                    )
                )}
            </div>
        </article>
    )
}

const LayoutSearch = props => {
    const { keyword } = props
    const router = useRouter()
    const currentSearch = keyword || router?.query?.s
    return (
        <section className='container mx-auto px-5 py-24 min-h-screen'>
            <div className="max-w-4xl mx-auto">
                <SearchInput {...props} />
                <div className="mt-12">
                    {currentSearch && <Blog {...props} />}
                </div>
            </div>
        </section>
    )
}

const LayoutDashboard = props => (
    <div className='container mx-auto px-5 py-10'>
        {props.post && <NotionPage {...props} />}
        <DashboardHeader />
        <DashboardBody />
    </div>
)

const Layout404 = () => (
    <section className='flex items-center justify-center min-h-[70vh] px-5'>
        <div className='container mx-auto flex flex-wrap items-center'>
            <div className='w-full md:w-1/2 p-10'>
                <img src='/images/starter/404.svg' alt='404' className='max-w-full' />
            </div>
            <div className='w-full md:w-1/2 p-10 text-white'>
                <SVG404 />
                <h3 className='text-3xl font-bold mt-5 mb-5'>{siteConfig('PROXIO_404_TITLE')}</h3>
                <SmartLink href='/' className='inline-block py-3 px-8 bg-primary text-white rounded-md'>返回首页</SmartLink>
            </div>
        </div>
    </section>
)

const LayoutPostList = LayoutArchive
const LayoutSignIn = () => <div className="py-20 text-center text-white">Sign In Page</div>
const LayoutSignUp = () => <div className="py-20 text-center text-white">Sign Up Page</div>

export {
    Layout404, LayoutArchive, LayoutBase, LayoutCategoryIndex, LayoutDashboard,
    LayoutIndex, LayoutPostList, LayoutSearch, LayoutSignIn,
    LayoutSignUp, LayoutSlug, LayoutTagIndex, CONFIG as THEME_CONFIG
}
