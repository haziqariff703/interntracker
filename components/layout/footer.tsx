export function Footer() {
  return (
    <footer className="border-t-[3px] border-white px-6 lg:px-12 py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Block: Content & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          {/* Left: Product Statement */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              INTERNSHIP TRACKER
            </h3>
            <p className="text-white/60 font-mono text-sm uppercase tracking-widest max-w-sm leading-relaxed">
              Track internships.
              <br />
              Organize outcomes.
              <br />
              Get hired.
            </p>
            <div className="mt-4 font-mono text-sm uppercase tracking-widest text-white border-[3px] border-white inline-block px-4 py-2 bg-black hover:bg-white hover:text-black transition-none w-fit">
              CONTACT: hello@yourdomain.com
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col gap-3 font-mono text-sm uppercase tracking-widest text-right w-full md:w-auto">
            <a
              href="#"
              className="hover:bg-white hover:text-black hover:px-2 transition-all block border-b-[3px] border-transparent hover:border-black"
            >
              [ LINKEDIN ]
            </a>
            <a
              href="#"
              className="hover:bg-white hover:text-black hover:px-2 transition-all block border-b-[3px] border-transparent hover:border-black"
            >
              [ GITHUB ]
            </a>
            <a
              href="#"
              className="hover:bg-white hover:text-black hover:px-2 transition-all block border-b-[3px] border-transparent hover:border-black"
            >
              [ THREADS ]
            </a>
          </div>
        </div>

        {/* Bottom: Legal Bar */}
        <div className="border-t-[3px] border-white pt-8 flex justify-between items-center font-mono text-xs uppercase tracking-widest text-white/40">
          <span>© 2026 INTERNSHIP TRACKER</span>
          <span>PROTOCOL v1.0</span>
        </div>
      </div>
    </footer>
  );
}
