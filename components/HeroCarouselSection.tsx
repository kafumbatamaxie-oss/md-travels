import { translations } from "@/lib/i18n"
import { Carousel } from "./carousel"
import { useLanguage } from "./language-provider"

export const HeroCarouselSection = () => {
     const { language, mounted } = useLanguage()
     const t = translations[language]
    
      if (!mounted) return null
     const carouselSlides = [
      {
      id: 100,
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      cta: t.hero.cta1,
      image: "/images/honda-9-seater.png",
      mobileImage: "/images/honda-9-seater.png",
    },
    {
      id: 1,
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      cta: t.hero.cta1,
      image: "/hero-1.jpg",
      mobileImage: "/hero-mobile-1.jpg",
    },
    {
      id: 2,
      title: t.services.airportTransfers,
      subtitle: "Reliable, on-time airport pickup and drop-off services for business and leisure travelers",
      cta: t.hero.cta1,
      image: "/bg-2.jpeg",
      mobileImage: "/hero-mobile-2.jpg",
    },
    {
      id: 3,
      title: t.services.corporateTravel,
      subtitle: "Professional transportation for your business needs with experienced drivers and luxury vehicles",
      cta: t.hero.cta1,
      image: "/images/toyota36seater_4x.png",
      mobileImage: "/images/toyota36seater.png",
    },
    {
      id: 4,
      title: t.services.events,
      subtitle: "Make your special day memorable with our premium transportation and professional service",
      image: "/hero-9.jpg",
      mobileImage: "/hero-mobile-4.jpg",
      cta: t.hero.cta1,
    },
  ]
  return (
    <>
        <section className="relative h-[75vh] flex flex-col items-center justify-center">
        <Carousel slides={carouselSlides} />
      </section></>
  )
}
