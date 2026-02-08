/* eslint-disable @next/next/no-img-element */
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * 博文列表 - 修复封面图不显示问题
 */
export const Blog = ({ posts }) => {
  const enable = siteConfig('PROXIO_BLOG_ENABLE')
  if (!enable) return null

  // 获取配置中的占位图
  const placeholders = [
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_1'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_2'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_3'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_4')
  ]

  return (
    <section className='bg-white pt-20 dark:bg-dark lg:pt-[120px]'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap justify-center wow fadeInUp' data-wow-delay='.2s'>
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

        <div className='-mx-4 grid md:grid-cols-2 grid-cols-1'>
          {posts?.map((item, index) => {
            // --- 关键逻辑修复：优先取文章封面，若无封面则取占位配置 ---
            const finalImg = item.pageCoverThumbnail || item.pageCover || placeholders[index]

            return (
              <div key={index} className='w-full px-4'>
                <div className='wow fadeInUp group mb-10 relative overflow-hidden blog' data-wow-delay='.1s'>
                  <div className='relative rounded-xl border overflow-hidden shadow-md dark:border-gray-700 dark:bg-gray-800'>
                    <SmartLink href={item?.href} className='block relative h-80 w-full'>
                      
                      {/* 1. 如果有图（封面或配置图），显示图片 */}
                      {finalImg ? (
                        <LazyImage
                          src={finalImg}
                          alt={item.title}
                          className='w-full h-80 object-cover transition-transform duration-500 rounded-xl group-hover:scale-110'
                        />
                      ) : (
                        /* 2. 如果完全没图，显示摘要文字兜底 */
                        <div className='flex items-center justify-center h-full p-10 bg-gray-100 dark:bg-gray-900'>
                           <p className='text-base text-body-color dark:text-dark-6'>{item.summary}</p>
                        </div>
                      )}

                      {/* 3. 遮罩层：鼠标悬停时才显现摘要 */}
                      <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-60 flex items-center justify-center p-10'>
                         <p className='text-white text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                            {item.summary}
                         </p>
                      </div>
                    </SmartLink>
                  </div>

                  <div className='relative z-10 p-4'>
                    <span className='text-xs font-medium text-gray-500'>{item.publishDay}</span>
                    <h3>
                      <SmartLink href={item?.href} className='mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl'>
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
  )
}
