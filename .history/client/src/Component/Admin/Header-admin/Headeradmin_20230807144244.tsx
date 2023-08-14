
import "./Header.css";

const Header = () => {
  return (
    <>
    <aside>
    <p className="p"> Menu </p>
    <a href="/adminuser" className="a">
    <i className="fa fa-solid fa-users fa-lg" style={{color : "white"}} aria-hidden="true"></i>
      Người dùng
    </a>
    <a href="/adminhotel" className="a">
    <i className="fa fa-solid fa-hotel" style={{color : "white"}} aria-hidden="true"></i>
      Quản lý khách sạn
    </a>
    <a href="/adminroom" className="a">
    <i className="fa fa-solid fa-person-shelter" style={{color : "white"}} aria-hidden="true"></i>
      Quản lý phòng
    </a>
    <a href="/admin" className="a">
    <i className="fa fa-solid fa-check" style={{color : "white"}}></i>
      Quản lý đặt phòng
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
