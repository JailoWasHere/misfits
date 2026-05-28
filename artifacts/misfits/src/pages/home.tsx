import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SocialProof } from "@/components/sections/social-proof";
import { CommunityPreview } from "@/components/sections/community-preview";
import { Cta } from "@/components/sections/cta";
import { Pricing } from "@/components/sections/pricing";
import { Mission } from "@/components/sections/mission";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarqueeStrip } from "@/components/marquee-strip";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <Problem />
        <Mission />
        <MarqueeStrip reverse dim />
        <Features />
        <HowItWorks />
        <SocialProof />
        <CommunityPreview />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
