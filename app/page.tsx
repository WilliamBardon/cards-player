import CardsPlayer from '@/components/cardsplayer'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-[300vh] flex-col items-center justify-around bg-black overflow-x-hidden">
      <div className='w-full text-center flex flex-col gap-8'>
        <h3 className='text-white text-8xl'>Here you can see the Slider</h3>
        <p className='text-white text-2xl'>Scroll Down</p>
        <div className='text-white flex flex-col'>
          <span className='text-2xl'>V</span>
        </div>
      </div>
      <CardsPlayer />
      <div className='w-full text-center flex flex-col gap-8'>
      <div className='text-white flex flex-col'>
          <span className='text-2xl rotate-180'>V</span>
        </div>
        <p className='text-white text-2xl'>Scroll Up</p>
        <h3 className='text-white text-8xl'>Here you can see the Slider</h3>
      </div>
    </main>
  )
}
