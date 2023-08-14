
import "./Header.css";

const Header = () => {
  return (
    <>
    <aside>
    <p className="p"> Menu </p>
    <a href="/adminuser" className="a">
    <i className="fa-solid fa-users fa-lg" style={{color : "white"}}></i>
      Người dùng
    </a>
    <a href="javascript:void(0)" className="a">
      <i className="fa fa-laptop" aria-hidden="true" />
      Quản lý hotel
    </a>
    <a href="javascript:void(0)" className="a">
      <i className="fa fa-clone" aria-hidden="true" />
      Quản lý hotel
    </a>
    <a href="javascript:void(0)" className="a">
      <i className="fa fa-star-o" aria-hidden="true" />
      Starred
    </a>
    <a href="javascript:void(0)" className="a">
      <i className="fa fa-trash-o" aria-hidden="true" />
      Trash
    </a>
  </aside>
  <div className="social">
    <a
      href="https://www.linkedin.com/in/florin-cornea-b5118057/"
      target="_blank"
      className="a"
    >
      <i className="fa fa-linkedin" />
    </a>
  </div>
    </>
  );
};

export default Header;
