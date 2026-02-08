// ... 前面定义的变量保持不变

return (
  <section className='bg-white pt-20 dark:bg-dark lg:pt-[120px]'>
    <div className='container mx-auto px-4'>
      {/* 区块标题 */}
      <div className='flex flex-wrap justify-center wow fadeInUp' data-wow-delay='.2s'>
        <div className='w-full py-4 text-center space-y-4'>
          <span className='px-3 py-0.5 rounded-2xl mb-2 dark:bg-dark-1 border border-gray-200 dark:border-[#333333] dark:text-white'>
            {siteConfig('PROXIO_BLOG_TITLE')}
          </span>
          <h2 className='text-3xl font-bold text-dark dark:text-white sm:text-4xl'>
            {siteConfig('PROXIO_BLOG_TEXT_1')}
          </h2>
        </div>
      </div>

      {/* 博客列表：调整为一行 3 列 (md:grid-cols-3) */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
        {posts?.slice(0, 6).map((item, index) => { // slice(0, 6) 确保只显示 6 篇文章
          const finalImg = item.pageCoverThumbnail || item.pageCover || placeholders[index]

          return (
            <div key={index} className='wow fadeInUp group relative' data-wow-delay='.1s'>
              <div className='relative rounded-xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800'>
                <SmartLink href={item?.href} className='block relative aspect-[4/3] w-full'>
                  {/* 使用 aspect-[4/3] 锁定图片比例，比之前的 h-80 更协调 */}
                  
                  {finalImg ? (
                    <LazyImage
                      src={finalImg}
                      alt={item.title}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                  ) : (
                    <div className='flex items-center justify-center h-full p-6 bg-gray-100 dark:bg-gray-900 text-center'>
                       <p className='text-sm text-body-color dark:text-dark-6'>{item.summary}</p>
                    </div>
                  )}

                  {/* 悬停遮罩 */}
                  <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-70 flex items-center justify-center p-6'>
                     <p className='text-white text-xs line-clamp-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center'>
                        {item.summary}
                     </p>
                  </div>
                </SmartLink>
              </div>

              {/* 标题部分 */}
              <div className='pt-4 px-1'>
                <span className='text-[10px] text-gray-400 uppercase tracking-wider'>{item.publishDay}</span>
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
