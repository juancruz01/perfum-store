import { Benefits } from "@/components/home/Benefits";
import { CategoryBanners } from "@/components/home/CategoryBanners";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroCarousel, type HeroSlide } from "@/components/home/HeroCarousel";
import hero1 from "../../public/images/hero-1.jpg";
import hero2 from "../../public/images/hero-2.jpg";
import bannerFemeninas from "../../public/images/banner-femeninas.jpg";
import bannerMasculinas from "../../public/images/banner-masculinas.jpg";

const slides: HeroSlide[] = [
  {
    image: hero1,
    alt: "Frascos de perfume rodeados de flores de magnolia, lavanda y bergamota",
    eyebrow: "Perfumes 100% originales",
    title: "Tu firma,",
    titleAccent: "en una fragancia",
    text: "Árabes, de diseñador y nicho. Los perfumes más buscados, a un clic.",
    cta: { label: "Descubrir", href: "/fragancias/masculinas" },
  },
  {
    image: hero2,
    alt: "Frascos de perfume árabe con madera de oud, azafrán y pétalos de rosa",
    eyebrow: "Esencias árabes",
    title: "Intensas,",
    titleAccent: "duraderas, únicas",
    text: "Asad, Khamrah, 9PM, Club de Nuit y más: los árabes que son tendencia.",
    cta: { label: "Ver árabes", href: "/fragancias/masculinas/arabes" },
  },
];

export default function Home() {
  return (
    <>
      <HeroCarousel slides={slides} />
      <Benefits />
      <CategoryBanners
        items={[
          {
            href: "/fragancias/masculinas",
            image: bannerMasculinas,
            alt: "Perfumes masculinos sobre madera",
            kicker: "Fragancias",
            title: "Masculinas",
          },
          {
            href: "/fragancias/femeninas",
            image: bannerFemeninas,
            alt: "Perfumes femeninos con flores de jazmín",
            kicker: "Fragancias",
            title: "Femeninas",
          },
        ]}
      />
      <FeaturedProducts />
    </>
  );
}
