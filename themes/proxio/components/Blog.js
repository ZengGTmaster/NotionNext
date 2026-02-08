/* eslint-disable @next/next/no-img-element */
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * 博文列表 - 修复 Vercel 编译报错版本
 */
export const Blog = ({ posts }) => {
  const enable = siteConfig('PROXIO_BLOG_ENABLE')
  if (!enable) return null

  // 获取配置中的占位图
  const placeholders = [
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_1'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_2'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_3'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_4'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_1'),
    siteConfig('PROXIO_BLOG_PLACEHOLDER_IMG_URL_2')
  ]

  return (
    <section className='bg-white pt-20 dark:bg-dark lg:pt-[120px]'>
      <div className='container mx-auto px-4'>
        {/* 区块标题 */}
        <div className='flex flex-wrap justify-center'>
          <div className='w-full py-4 text-center space-y-4'>
            <span className='px-3 py-0.5 rounded-2xl mb-2 dark:bg-dark-1 border border-gray-200 dark:border-[#333333] dark:text-white'>
              {siteConfig('PROXIO_BLOG_TITLE')}
            </span>
            <h2 className='text-3xl font-bold text-dark dark:text-white sm:text-4xl'>
              {siteConfig('PROXIO_BLOG_TEXT_1')}
            </h2>
          </div>
        </div>

        {/* 博客列表：一行 3 个 (md:grid-cols-3) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
          {posts?.slice(0, 6).map((item, index) => {
            const finalImg = item.pageCoverThumbnail || item.pageCover || placeholders[index]

            return (
              <div key={index} className='group relative'>
                <div className='relative rounded-xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800'>
                  <SmartLink href={item?.href} className='block relative w-full'>
                    
                    {/* 使用兼容性更好的比例控制：4:3 比例 (75% padding) */}
                    <div className='relative w-full' style={{ paddingBottom: '75%' }}>
                      {finalImg ? (
                        <LazyImage
                          src={finalImg}
                          alt={item.title}
                          className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                        />
                      ) : (
                        <div className='absolute inset-0 flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900'>
                           <p className='text-xs text-body-color dark:text-dark-6 text-center'>{item.summary}</p>
                        </div>
                      )}

                      {/* 遮罩层 */}
                      <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-70 flex items-center justify-center p-6'>
                         <p className='text-white text-xs line-clamp-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center'>
                            {item.summary}
                         </p>
                      </div>
                    </div>

                  </SmartLink>
                </div>

                {/* 标题 */}
                <div className='pt-4 px-1'>
                  <span className='text-[10px] text-gray-500 uppercase tracking-widest'>{item.publishDay}</span>
                  <h3>
                    <SmartLink href={item?.href} className='mt-1 block text-lg font-bold text-dark hover:text-primary dark:text-white transition-colors line-clamp-1'>
                      {item.title}
                    </SmartLink>
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
