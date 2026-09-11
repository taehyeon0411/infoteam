import "./header.css";
import { FaSearchLocation } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="head">
      <Link to="/" className="logo">
        <FaSearchLocation className="mainicon" size={32} />
        <h1 className="title">찾쥐</h1>
      </Link>

      <button className="menu-button">
        <IoMenu size={32} />
      </button>
    </header>
  );
}
