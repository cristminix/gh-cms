import { useEffect, useState, createElement } from "react"
export async function loader({ params }) {
  const { template } = params
  return { template }
}
import { useLoaderData } from "react-router-dom"
import Homepage from "@templates/homepage.twig"
import Profile from "@templates/profile.twig"
import Lembaga from "@templates/lembaga.twig"
import Kegiatan from "@templates/kegiatan.twig"
import Pendaftaran from "@templates/pendaftaran.twig"
import Galeri from "@templates/galeri.twig"
import Berita from "@templates/berita.twig"
import Kontak from "@templates/kontak.twig"
// import SearchResult from "@templates/search-result.twig"
// import Search from "@templates/search.twig"
// import BeritaDetail from "@templates/berita-detail.twig"
const CMSApp = () => {
  let { template } = useLoaderData()
  const [page, setPage] = useState(null)
  const templates = {
    homepage: <Homepage />,
    profile: <Profile />,
    lembaga: <Lembaga />,
    kegiatan: <Kegiatan />,
    pendaftaran: <Pendaftaran />,
    galeri: <Galeri />,
    berita: <Berita />,
    kontak: <Kontak />,
    // search: <Search />,
  }
  if (!template) {
    template = "homepage"
  }

  return templates[template]
}

export default CMSApp
