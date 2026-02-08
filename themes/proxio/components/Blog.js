/* eslint-disable @next/next/no-img-element */
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * 博文列表
 * @param {*} param0
 * @returns
 */
export const Blog = ({ posts }) => {
  const enable = siteConfig('PROXIO_BLOG_ENABLE')
  if (!enable) {
    return null
  }

  // 获取配置中的占位图
  const placeholders = [
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_1'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_2'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_3'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_4')
  ]

  return (
    <>
      {/* */}
      <section className='bg-white pt-20 dark:bg-dark lg:pt-[120px]'>
        <div className='container mx-auto'>
          {/* 区块标题文字 */}
          <div
            className='-mx-4 flex flex-wrap justify-center wow fadeInUp'
            data-wow-delay='.2s'>
            <div className='w-full px-4 py-4'>
              <div className='mx-auto max-w-[485px] text-center space-y-4'>
                <span className='px-3 py-0.5 rounded-2xl mb-2 dark:bg-dark-1 border border-gray-200 dark:border-[#333333] dark:text-white'>
                  {siteConfig('PROXIO_BLOG_TITLE')}
                </span>

                <h2 className='text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                  {siteConfig('PROXIO_BLOG_TEXT_1')}
                </h2>
              </div>
            </div>
          </div>
          {/* 博客列表 */}
          <div className='-mx-4 grid md:grid-cols-2 grid-cols-1'>
            {posts?.map((item, index) => {
              // --- 核心逻辑修改：优先使用文章封面，其次是配置的占位图 ---
              const coverImg = item.pageCoverThumbnail || item.pageCover || placeholders[index]
              
              return (
                <div key={index} className='w-full px-4'>
                  <div
                    className='wow fadeInUp group mb-10 relative overflow-hidden blog'
                    data-wow-delay='.1s'>
                    <div className='relative rounded-xl border overflow-hidden shadow-md dark:border-gray-700 dark:bg-gray-800'>
                      <SmartLink href={item?.href} className='block'>
                        <div className='relative h-80 w-full'>
                           {/* 背景层：显示图片或摘要 */}
                          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-hexo-black-gray'>
                            {!coverImg && (
                                <p className='px-10 text-center text-base text-body-color dark:text-dark-6 duration-200 group-hover:text-white'>
                                    {item.summary}
                                </p>
                            )}
                          </div>

                          {/* 图片层 */}
                          {coverImg && (
                            <LazyImage
                              src={coverImg}
                              alt={item.title}
                              className='w-full h-80 object-cover transition-transform duration-500 rounded-xl group-hover:scale-105'
                            />
                          )}

                          {/* 遮罩层 */}
                          <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-40' />
                          
                          {/* 悬停时的摘要文字（可选） */}
                          {coverImg && (
                             <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-10 text-center'>
                                <p className='text-white text-sm line-clamp-3'>
                                    {item.summary}
                                </p>
                             </div>
                          )}
                        </div>
                      </SmartLink>
                    </div>
                    {/* 内容部分 */}
                    <div className='relative z-10 p-4'>
                      <span className='inline-block text-xs font-medium leading-loose text-gray-500 dark:text-gray-400'>
                        {item.publishDay}
                      </span>
                      <h3>
                        <SmartLink
                          href={item?.href}
                          className='mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl'>
                          {item.title}
                        </SmartLink>
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
