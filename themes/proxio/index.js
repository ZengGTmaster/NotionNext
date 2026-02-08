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
import { Pricing } from './components/Pricing'
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
import Announcement from './components/Announcement'
import CursorDot from '@/components/CursorDot'
import LoadingCover from './components/LoadingCover'

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
 * 首页布局 - 在英雄区和博文区之间插入了装饰图 wan.png
 */
const LayoutIndex = props => {
    // 强制设定显示 6 个博文
    const count = 6 
    const posts = useMemo(() => (props?.allNavPages ? props.allNavPages.slice(0, count) : []), [props.allNavPages, count])

    return (
        <div className="flex flex-col">
            
            {/* 1. 英雄区 */}
            {siteConfig('PROXIO_HERO_ENABLE', true, CONFIG) && (
                <section className="w-full">
                    <Hero {...props} />
                </section>
            )}

            {/* 2. 装饰图区域 - wan.png */}
            <section className="w-full flex justify-center py-2">
                <img 
                    src="/wan.png" 
                    alt="decoration" 
                    className="w-full max-w-[400px] h-auto object-contain opacity-80" 
                    // 这里 max-w-[400px] 限制了图片最大宽度，您可以根据喜好修改数字
                />
            </section>

            {/* 3. 博客文章展示区 */}
            {siteConfig('PROXIO_BLOG_ENABLE', true, CONFIG) && (
                <section className="container mx-auto px-5 lg:px-10 border-none"> 
                    <div className="py-2">
                        <Blog posts={posts} />
                    </div>
                </section>
            )}

            {/* 4. 其他业务组件容器 */}
            <div className="container mx-auto px-5 lg:px-10 space-y-8 mb-10 mt-10">
                {siteConfig('PROXIO_ABOUT_ENABLE', true, CONFIG) && <Team />}
                {siteConfig('PROXIO_BRANDS_ENABLE', true, CONFIG) && <Brand />}
                {siteConfig('PROXIO_CAREER_ENABLE', true, CONFIG) && <Career />}
                {siteConfig('PROXIO_FEATURE_ENABLE', true, CONFIG) && <Features />}
                {siteConfig('PROXIO_TESTIMONIALS_ENABLE', true, CONFIG) && <Testimonials />}
                {siteConfig('PROXIO_FAQ_ENABLE', true, CONFIG) && <FAQ />}
                {siteConfig('PROXIO_CTA_ENABLE', true, CONFIG) && <CTA />}
            </div>

            {siteConfig('PROXIO_WELCOME_COVER_ENABLE', false, CONFIG) && <LoadingCover />}
        </div>
    )
}

/**
 * 其余布局保持不变
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
            <div className='container mx-auto px-5 py-10 max-w-5xl'>
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
    useEffect(() => {
        if (isBrowser && keyword) {
            replaceSearchResult({
                doms: document.getElementById('posts-wrapper'),
                search: keyword,
                target: { element: 'span', className: 'text-red-500 border-b border-dashed' }
            })
        }
    }, [keyword])
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

const LayoutArchive = props => <div className="py-10"><Blog {...props} /></div>

const Layout404 = () => (
    <section className='flex items-center justify-center min-h-[70vh] px-5'>
        <div className='container mx-auto flex flex-wrap items-center'>
            <div className='w-full md:w-1/2 p-10'>
                <img src='/images/starter/404.svg' alt='404' className='max-w-full' />
            </div>
            <div className='w-full md:w-1/2 p-10'>
                <SVG404 />
                <h3 className='text-3xl font-bold mt-5 mb-5 dark:text-white'>{siteConfig('PROXIO_404_TITLE')}</h3>
                <p className='text-gray-600 dark:text-gray-400 mb-8'>{siteConfig('PROXIO_404_TEXT')}</p>
                <SmartLink href='/' className='inline-block py-3 px-8 bg-primary text-white rounded-md hover:opacity-90 shadow-lg'>
                    {siteConfig('PROXIO_404_BACK')}
                </SmartLink>
            </div>
        </div>
    </section>
)

const LayoutCategoryIndex = props => {
    const { categoryOptions } = props
    const { locale } = useGlobal()
    return (
        <section className='container mx-auto px-5 py-24 text-center'>
            <span className='text-primary font-bold text-xl mb-10 block'>{locale.COMMON.CATEGORY}</span>
            <div className='flex flex-wrap justify-center gap-6'>
                {categoryOptions?.map(c => (
                    <SmartLink key={c.name} href={`/category/${c.name}`} className="group p-6 border dark:border-gray-800 rounded-xl hover:shadow-xl transition-all hover:-translate-y-1 bg-white dark:bg-dark-2">
                        <h2 className="text-2xl font-bold dark:text-white group-hover:text-primary transition-colors">
                            <i className='mr-3 fas fa-folder text-primary' />{c.name} ({c.count})
                        </h2>
                    </SmartLink>
                ))}
            </div>
        </section>
    )
}

const LayoutTagIndex = props => {
    const { tagOptions } = props
    const { locale } = useGlobal()
    return (
        <section className='container mx-auto px-5 py-24 text-center'>
            <span className='text-primary font-bold text-xl mb-10 block'>{locale.COMMON.TAGS}</span>
            <div className='flex flex-wrap justify-center gap-4'>
                {tagOptions.map(t => (
                    <SmartLink key={t.name} href={`/tag/${encodeURIComponent(t.name)}`} className={`px-5 py-2 rounded-full border dark:border-gray-700 hover:bg-primary hover:text-white transition-all notion-${t.color}_background`}>
                        <i className='mr-2 fas fa-tag' />{t.name} {t.count ? `(${t.count})` : ''}
                    </SmartLink>
                ))}
            </div>
        </section>
    )
}

const AuthWrapper = ({ title, description, children }) => (
    <div className='grow flex flex-col items-center py-20 px-5'>
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">{title}</h1>
            <p className="text-gray-500">{description}</p>
        </div>
        <div className="w-full max-w-md shadow-2xl rounded-2xl overflow-hidden">{children}</div>
    </div>
)

const LayoutSignIn = () => {
    const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return (
        <AuthWrapper title={siteConfig('PROXIO_SIGNIN', '登录')} description={siteConfig('PROXIO_SIGNIN_DESCRITION')}>
            {enableClerk ? <SignIn /> : <SignInForm />}
        </AuthWrapper>
    )
}

const LayoutSignUp = () => {
    const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return (
        <AuthWrapper title={siteConfig('PROXIO_SIGNIN', '注册')} description={siteConfig('PROXIO_SIGNIN_DESCRITION')}>
            {enableClerk ? <SignUp /> : <SignUpForm />}
        </AuthWrapper>
    )
}

const LayoutPostList = LayoutArchive

export {
    Layout404, LayoutArchive, LayoutBase, LayoutCategoryIndex, LayoutDashboard,
    LayoutIndex, LayoutPostList, LayoutSearch, LayoutSignIn,
    LayoutSignUp, LayoutSlug, LayoutTagIndex, CONFIG as THEME_CONFIG
}
