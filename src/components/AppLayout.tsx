import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { Logo } from "./Logo"

export function AppLayout() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isLocator = location.pathname === "/find-bin"

  // Monitor scroll position with a passive listener and requestAnimationFrame throttle
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 48
          setIsScrolled(scrolled)
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile nav when route changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <div className="site-shell">
      <div className={`site-header-wrapper ${isScrolled ? "is-scrolled" : ""}`}>
        <header
          className={`site-header ${isScrolled ? "is-scrolled" : ""}`}
          role="banner"
        >
          <Logo />
          <nav
            className={`site-nav ${open ? "is-open" : ""}`}
            aria-label="Primary navigation"
          >
            <NavLink onClick={() => setOpen(false)} to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/find-bin">
              Find a Bin
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/sorting-guide">
              Sorting Guide
            </NavLink>
          </nav>
          <div className="header-actions">
            {!isLocator && (
              <NavLink
                className="button button-primary header-cta"
                to="/find-bin"
              >
                Find a Bin
              </NavLink>
            )}
            <button
              className="menu-toggle"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </div>
      <Outlet />
      {!isLocator && (
        <footer className="site-footer">
          <div>
            <Logo reversed />
            <p>Smarter Sorting. Better Choices.</p>
          </div>
          <div className="footer-note">
            <strong>Design prototype</strong>
            <span>
              Station locations, distances, and sensor readings are
              illustrative.
            </span>
          </div>
          <div className="footer-links">
            <NavLink to="/find-bin">Find a Bin</NavLink>
            <NavLink to="/sorting-guide">Sorting Guide</NavLink>
          </div>
        </footer>
      )}
    </div>
  )
}
