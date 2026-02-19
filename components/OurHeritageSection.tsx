import { AnimatedStats } from "@/components/animated-stats"
import TextComponent from "./Text-Component"

export function OurHeritageSection({ t} : {t: any}) {
  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
        {/* Added GIF background with parallax effect using CSS */}
        <div
          className="absolute inset-0 z-0  opacity-20  pointer-events-none bg-fixed bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/Flag_of_South_Africa.gif')",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 bg-transparent">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 bg-slate-900 rounded-[3rem] p-10">
              <TextComponent title={t.about.title}  desc1={t.about.description2}/>
              {/* Integrated AnimatedStats component for counters */}
              <AnimatedStats experienceLabel={t.about.experience} clientsLabel={t.about.customers} />
            </div>

            <div className="relative rounded-[3rem] overflow-hidden bg-transparent  group ">
              <img
                src="/heritage.png"
                alt="Luxury Vehicle Interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
    </section>
  )
}
