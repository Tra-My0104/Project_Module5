
import "./Header.css";

const Header = () => {
  return (
    <>
    <aside>
    <p className="p"> Menu </p>
    <a href="/adminuser" className="a">
    <i className="fa-solid fa-users fa-lg" style={{color : "white"}} aria-hidden="true"></i>
      Người dùng
    </a>
    <a href="javascript:void(0)" className="a">
    <i className="fa-solid fa-hotel" style={{color : "white"}} aria-hidden="true"></i>
      Quản lý hotel
    </a>
    <a href="javascript:void(0)" className="a">
    <i class="fa-solid fa-person-shelter" style={{color : "white"}}></i>
      Quản lý room
    </a>
    <a href="javascript:void(0)" className="a">
      <i className="fa fa-star-o" aria-hidden="true" />
      Quản lý bookroom
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
