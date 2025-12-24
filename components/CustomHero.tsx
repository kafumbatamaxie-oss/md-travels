interface CustomHeroProps {
    title: string
    subTitle: string
}
export default function CustomHero({title, subTitle} : CustomHeroProps) {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 z-0   pointer-events-none bg-fixed bg-fill bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/heritage.png')",
          }}
        />

        <div
          className="absolute inset-0 z-1  pointer-events-none opacity-80 bg-sky-950"

        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl text-secondary md:text-5xl font-bold mb-6 text-balance">{title}</h1>
          <p className="text-lg text-secondary/80">
            {subTitle}</p>
        </div>
      </section>
  )
}
