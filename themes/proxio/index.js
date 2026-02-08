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

    useEffect(() => {
        loadWowJS()
    }, [])

    return (
        <div
            id='theme-proxio'
            className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col dark:bg-dark scroll-smooth`}>
            <Style />
            <Header {...props} />

            <main id='main-wrapper' className='grow'>
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
    const count = siteConfig('PROXIO_BLOG_COUNT', 4, CONFIG)
    const { locale } = useGlobal()
    const posts = useMemo(() => (props?.allNavPages ? props.allNavPages.slice(0, count) : []), [props.allNavPages, count])

    return (
        <>
            {siteConfig('PROXIO_HERO_ENABLE', true, CONFIG) && <Hero {...props} />}
            
            {siteConfig('PROXIO_BLOG_ENABLE', true, CONFIG) && (
                <>
                    <Blog posts={posts} />
                    <div className='container mx-auto flex justify-end mb-8'>
                        <SmartLink className='text-lg underline flex items-center group' href='/archive'>
                            {locale.COMMON.MORE}
                            <i className='ml-2 fas fa-arrow-right transition-transform group-hover:translate-x-1' />
                        </SmartLink>
                    </div>
                </>
            )}

            {siteConfig('PROXIO_ANNOUNCEMENT_ENABLE', true, CONFIG) && (
                <Announcement post={props?.notice} className='announcement text-center py-16' />
            )}

            {siteConfig('PROXIO_ABOUT_ENABLE', true, CONFIG) && <Team />}
            {siteConfig('PROXIO_BRANDS_ENABLE', true, CONFIG) && <Brand />}
            {siteConfig('PROXIO_CAREER_ENABLE', true, CONFIG) && <Career />}
            {siteConfig('PROXIO_FEATURE_ENABLE', true, CONFIG) && <Features />}
            {siteConfig('PROXIO_TESTIMONIALS_ENABLE', true, CONFIG) && <Testimonials />}
            {siteConfig('PROXIO_FAQ_ENABLE', true, CONFIG) && <FAQ />}
            {siteConfig('PROXIO_CTA_ENABLE', true, CONFIG) && <CTA />}
            {siteConfig('PROXIO_WELCOME_COVER_ENABLE', false, CONFIG) && <LoadingCover />}
        </>
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

    if (!post && siteConfig('PROXIO_POST_REDIRECT_ENABLE')) {
        return <div id='theme-proxio'><Loading /></div>
    }

    return (
        <>
            <Banner title={post?.title} description={post?.summary} />
            <div className='container grow mx-auto'>
                <div className='flex flex-wrap justify-center -mx-4'>
                    <div id='container-inner' className='w-full p-4'>
                        {lock ? (
                            <ArticleLock validPassword={validPassword} />
                        ) : (
                            post && (
                                <article id='article-wrapper' className='mx-auto'>
                                    <NotionPage {...props} />
                                    <Comment frontMatter={post} />
                                    <ShareBar post={post} />
                                </article>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

/**
 * 仪表盘
 */
const LayoutDashboard = props => {
    const { post } = props
    return (
        <div className='container grow mx-auto'>
            <div className='flex flex-wrap justify-center -mx-4'>
                <div id='container-inner' className='w-full p-4'>
                    {post && (
                        <div id='article-wrapper' className='mx-auto'>
                            <NotionPage {...props} />
                        </div>
                    )}
                </div>
            </div>
            <DashboardHeader />
            <DashboardBody />
        </div>
    )
}

/**
 * 搜索
 */
const LayoutSearch = props => {
    const { keyword } = props
    const router = useRouter()
    const currentSearch = keyword || router?.query?.s

    useEffect(() => {
        if (isBrowser && keyword) {
            replaceSearchResult({
                doms: document.getElementById('posts-wrapper'),
                search: keyword,
                target: {
                    element: 'span',
                    className: 'text-red-500 border-b border-dashed'
                }
            })
        }
    }, [keyword])

    return (
        <section className='max-w-7xl mx-auto bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
            <SearchInput {...props} />
            {currentSearch && <Blog {...props} />}
        </section>
    )
}

/**
 * 文章归档
 */
const LayoutArchive = props => <Blog {...props} />

/**
 * 404页面
 */
const Layout404 = () => {
    return (
        <section className='bg-white py-20 dark:bg-dark-2 lg:py-[110px]'>
            <div className='container mx-auto'>
                <div className='flex flex-wrap items-center -mx-4'>
                    <div className='w-full px-4 md:w-5/12 lg:w-6/12'>
                        <div className='text-center'>
                            <img src='/images/starter/404.svg' alt='404' className='max-w-full mx-auto' />
                        </div>
                    </div>
                    <div className='w-full px-4 md:w-7/12 lg:w-6/12 xl:w-5/12'>
                        <div>
                            <div className='mb-8'><SVG404 /></div>
                            <h3 className='mb-5 text-2xl font-semibold text-dark dark:text-white'>
                                {siteConfig('PROXIO_404_TITLE')}
                            </h3>
                            <p className='mb-8 text-base text-body-color dark:text-dark-6'>
                                {siteConfig('PROXIO_404_TEXT')}
                            </p>
                            <SmartLink
                                href='/'
                                className='py-3 text-base font-medium text-white transition rounded-md bg-dark px-7 hover:bg-primary'>
                                {siteConfig('PROXIO_404_BACK')}
                            </SmartLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/**
 * 博客列表页 (分类/标签筛选后的列表)
 */
const LayoutPostList = props => {
    const { posts, category, tag } = props
    const slotTitle = category || tag

    return (
        <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
            <div className='container mx-auto'>
                <div className='-mx-4 flex flex-wrap justify-center'>
                    <div className='w-full px-4 text-center mb-[60px] max-w-[485px] mx-auto'>
                        {slotTitle ? (
                            <h2 className='mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]'>
                                {slotTitle}
                            </h2>
                        ) : (
                            <>
                                <span className='mb-2 block text-lg font-semibold text-primary'>
                                    {siteConfig('PROXIO_BLOG_TITLE')}
                                </span>
                                <h2 className='mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]'>
                                    {siteConfig('PROXIO_BLOG_TEXT_1')}
                                </h2>
                            </>
                        )}
                    </div>
                </div>
                <div className='-mx-4 flex flex-wrap'>
                    {posts?.map((item, index) => (
                        <div key={item.id || index} className='w-full px-4 md:w-1/2 lg:w-1/3'>
                            <div className='wow fadeInUp group mb-10' data-wow-delay='.1s'>
                                <div className='mb-8 overflow-hidden rounded-[5px]'>
                                    <SmartLink href={item?.href} className='block'>
                                        <img
                                            src={item.pageCoverThumbnail}
                                            alt={item.title}
                                            className='w-full transition group-hover:rotate-6 group-hover:scale-125'
                                        />
                                    </SmartLink>
                                </div>
                                <div>
                                    <span className='mb-6 inline-block rounded-[5px] bg-primary px-4 py-0.5 text-xs font-medium text-white'>
                                        {item.publishDay}
                                    </span>
                                    <h3>
                                        <SmartLink
                                            href={item?.href}
                                            className='mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl'>
                                            {item.title}
                                        </SmartLink>
                                    </h3>
                                    <p className='text-base text-body-color dark:text-dark-6 line-clamp-3'>
                                        {item.summary}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
    const { categoryOptions } = props
    const { locale } = useGlobal()
    return (
        <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
            <div className='container mx-auto min-h-96 text-center'>
                <span className='mb-2 text-lg font-semibold text-primary block'>
                    {locale.COMMON.CATEGORY}
                </span>
                <div id='category-list' className='flex flex-wrap justify-center gap-4 mt-8'>
                    {categoryOptions?.map(category => (
                        <SmartLink key={category.name} href={`/category/${category.name}`}>
                            <div className='hover:text-black text-2xl font-semibold text-dark dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600 px-5 py-2 hover:bg-gray-100 transition-all cursor-pointer rounded-lg border dark:border-gray-700'>
                                <i className='mr-4 fas fa-folder text-primary' />
                                {category.name} ({category.count})
                            </div>
                        </SmartLink>
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
    const { tagOptions } = props
    const { locale } = useGlobal()
    return (
        <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
            <div className='container mx-auto min-h-96 text-center'>
                <span className='mb-2 text-lg font-semibold text-primary block'>
                    {locale.COMMON.TAGS}
                </span>
                <div id='tags-list' className='flex flex-wrap justify-center gap-3 mt-8'>
                    {tagOptions.map(tag => (
                        <SmartLink key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`}>
                            <div className={`cursor-pointer inline-block rounded-full px-4 py-2 text-sm transition-all hover:shadow-lg dark:bg-gray-800 border dark:border-gray-700 notion-${tag.color}_background`}>
                                <i className='mr-1 fas fa-tag' />
                                {tag.name} {tag.count ? `(${tag.count})` : ''}
                            </div>
                        </SmartLink>
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * 登录/注册共用 Banner 辅助组件
 */
const AuthWrapper = ({ title, description, children }) => (
    <div className='grow mt-20'>
        <Banner title={title} description={description} />
        <div className='flex justify-center py-12'>
            {children}
        </div>
    </div>
)

const LayoutSignIn = () => {
    const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return (
        <AuthWrapper 
            title={siteConfig('PROXIO_SIGNIN', '登录')} 
            description={siteConfig('PROXIO_SIGNIN_DESCRITION', '演示页面，目前不提供会员功能')}>
            {enableClerk ? <SignIn /> : <SignInForm />}
        </AuthWrapper>
    )
}

const LayoutSignUp = () => {
    const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return (
        <AuthWrapper 
            title={siteConfig('PROXIO_SIGNIN', '注册')} 
            description={siteConfig('PROXIO_SIGNIN_DESCRITION', '演示页面，目前不提供会员功能')}>
            {enableClerk ? <SignUp /> : <SignUpForm />}
        </AuthWrapper>
    )
}

export {
    Layout404,
    LayoutArchive,
    LayoutBase,
    LayoutCategoryIndex,
    LayoutDashboard,
    LayoutIndex,
    LayoutPostList,
    LayoutSearch,
    LayoutSignIn,
    LayoutSignUp,
    LayoutSlug,
    LayoutTagIndex,
    CONFIG as THEME_CONFIG
}
