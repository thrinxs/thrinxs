export default function HomePage() {
  return (
    <main>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-950 to-brand-700">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">Thrinxs</h1>
          <p className="text-xl text-brand-200 mb-8">Technology and Digital Solutions</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="http://localhost:3001"
               className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-lg hover:bg-brand-50 transition-colors">
              Try Thrinxs CMS
            </a>
            <a href="#contact"
               className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </a>
          </div>
          <p className="mt-12 text-brand-400 text-sm">Full website coming soon...</p>
        </div>
      </section>
    </main>
  )
}
