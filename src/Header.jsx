import "./Header.css";
import icon from "./assets/icon.png";
function Header() {
  return (
    <header>
      <img className="icon" src={icon}></img>
      <h1>Weather</h1>
    </header>
  );
}
export default Header;
