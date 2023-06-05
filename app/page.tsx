import Image from 'next/image'

export default function Home() {
  return (
    <div className='max-w-[343px] sm:max-w-[840px] sm:space-y-0 space-y-8 p-8 bg-white rounded-3xl rounded-ee-[100px]'>
      <form className='flex gap-4 sm:gap-8 sm:w-9/12'>
        <div className='flex flex-col gap-1'>
          <label className='block font-bold text-neutral-smokey-grey' htmlFor="date">DAY</label>
          <input className='caret-primary-purple font-bold px-4 py-3 bg-transparent border rounded-lg outline-primary-purple sm:text-[32px] w-full' id='date' type="text" placeholder='DD' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='block font-bold text-neutral-smokey-grey' htmlFor="dat">DAY</label>
          <input className='caret-primary-purple font-bold px-4 py-3 bg-transparent border rounded-lg outline-primary-purple sm:text-[32px] w-full' id='date' type="text" placeholder='MM' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='block font-bold text-neutral-smokey-grey' htmlFor="da">DAY</label>
          <input className='caret-primary-purple font-bold px-4 py-3 bg-transparent border rounded-lg outline-primary-purple sm:text-[32px] w-full'
            id='date'
            type="text"
            placeholder='YYYY' />
        </div>
      </form>

      <div className='relative flex items-center justify-center h-16'>
        <div className='relative w-full border border-neutral-light-grey-grey'></div>
        <button className='absolute flex items-center justify-center w-16 h-16 rounded-full sm:right-0 bg-primary-purple hover:bg-neutral-off-black' aria-label="Calculate">
          <Image
            className=""
            src="/images/icon-arrow.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className='italic font-extrabold text-[48px] sm:text-[104px]'>
        <ul className='leading-[1em]'>
          <li><span className='text-primary-purple'>--</span> years</li>
          <li><span className='text-primary-purple'>--</span> months</li>
          <li><span className='text-primary-purple'>--</span> days</li>
        </ul>
      </div>

    </div>
  )
}
