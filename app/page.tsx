import { DocumentUploader } from "@/components/document-uploader"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="mt-12 mb-16">
          <DocumentUploader />
        </main>
        <Footer />
      </div>
    </div>
  )
}
