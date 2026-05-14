import Header from "./Header"
import NavBar from "./MenuPrincipal"
import Footer from "./Footer"

function Layout({ children }) {
  return (
    <>
      <Header />
      <NavBar />

      <main className="main-container">
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout
