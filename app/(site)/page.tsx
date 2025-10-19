import HeaderHUD from '@/components/HeaderHUD';
import HeroCinematic from '@/components/HeroCinematic';
import FeatureRail from '@/components/FeatureRail';
import ArsenalPreview from '@/components/ArsenalPreview';
import LeaderboardSnapshot from '@/components/LeaderboardSnapshot';
import EventsStrip from '@/components/EventsStrip';
import CommunityFooter from '@/components/CommunityFooter';
import InstallPwaModal from '@/components/InstallPwaModal';

export default function HomePage() {
  return (
    <>
      <HeaderHUD />
      <main>
        <HeroCinematic />
        <InstallPwaModal />
        <FeatureRail />
        <ArsenalPreview />
        <LeaderboardSnapshot />
        <EventsStrip />
      </main>
      <CommunityFooter />
    </>
  );
}
