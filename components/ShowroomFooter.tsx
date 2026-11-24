import { buildBespokeBookingWhatsAppUrl } from '@/lib/bag';
import BrandEmblem from './BrandEmblem';

export default function ShowroomFooter() {
  return (
    <footer
      id="showroom"
      className="border-t border-[#E2DACB] py-14 px-6 sm:px-12 bg-[#F5F0E6]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
        <div>
          <BrandEmblem variant="footer" />
          <p className="text-xs text-[#5E5B55] mt-4 leading-relaxed max-w-[34ch]">
            Founded by Haleemah Aderonke in Ilorin. Tailored boubous, structured 2-piece sets, and curated luxury fabrics.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#111111]">
            Ilorin Showroom
          </p>
          <p className="text-sm text-[#111111]">
            No. 75 Ibrahim Taiwo Rd, Ilorin, Kwara State
          </p>
          <p className="text-xs text-[#5E5B55]">Mon – Sat: 9:00 AM – 6:30 PM</p>
        </div>

        <div className="lg:text-right space-y-3 md:col-span-2 lg:col-span-1">
          <div>
            <a
              href={buildBespokeBookingWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[#111111] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#111111] transition-colors px-5 py-2.5 text-xs font-medium tracking-wide whitespace-nowrap"
            >
              Book Bespoke Fitting on WhatsApp
            </a>
          </div>
          <p className="text-xs font-medium text-[#111111]">@atinuke_luxury</p>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-[#E2DACB]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#5E5B55]">
        <span>© {new Date().getFullYear()} Atinuke Luxury. All rights reserved.</span>
        <span>Ilorin, Nigeria · Worldwide Delivery</span>
      </div>
    </footer>
  );
}
