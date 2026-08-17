"use client";

import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedGallery } from "@/components/home/FeaturedGallery";
import { Hero } from "@/components/home/Hero";
import { HomeCTA, RecentlyViewed } from "@/components/home/RecentlyViewed";
import { RecentlyAdded, TrendingGallery } from "@/components/home/TrendingGallery";

export function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedGallery />
      <TrendingGallery />
      <CategoryShowcase />
      <RecentlyAdded />
      <RecentlyViewed />
      <HomeCTA />
    </div>
  );
}
