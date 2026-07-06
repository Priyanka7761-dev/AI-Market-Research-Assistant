import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">

        📊 MarketMind AI

      </div>

      <div className="nav-links">

        <a href="#">Dashboard</a>

        <a href="#">Reports</a>

        <a href="#">Analytics</a>

        <a href="#">About</a>

      </div>

    </nav>
  );
}

export default Navbar;