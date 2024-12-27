"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { useEffect, useState } from "react";
import { getAllCategory } from "@/services/category";
import { getAllSponsor } from "@/services/sponsor";

import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryData, sponsorData] = await Promise.all([
          getAllCategory(),
          getAllSponsor(),
        ]);
        setCategories(categoryData);
        setSponsors(sponsorData);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-white">

      <div className="carousel-container pb-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={1}
          className="rounded-lg shadow-lg overflow-hidden"
        >
          {sponsors.map((item) => (
            <SwiperSlide key={item.id} className="bg-white">
              <div className="carousel-item flex flex-col items-center text-center p-6">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-32 w-auto object-contain mb-4"
                />
                <h3 className="text-green-700 text-lg font-semibold">
                  {item.name}
                </h3>
                <p className="text-gray-600">{item.contact}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 underline mt-2"
                >
                  {item.url}
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-green-700 mb-8">
          Categorias
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length > 0 &&
            [...categories].reverse().map((categ) => (
              <li key={categ.id}>
                <Link href={`/pages/categories/CategoryId/${categ.id}`}>
                  <Button
                    variant="outline"
                    className="w-full bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
                  >
                    {categ.name}
                  </Button>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
