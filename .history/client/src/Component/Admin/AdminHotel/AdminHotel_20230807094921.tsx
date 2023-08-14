import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./AdminHotel.css";

function AdminHotel() {
  return (
    <>
      <div className="container-adminHotel">
        <Headeradmin></Headeradmin>
        <Table className="table">
          <thead>
            <tr className="tr_header">
              <th>STT</th>
              <th>Ảnh Hotel</th>
              <th>Tên Hotel</th>
              <th>Giá</th>
              <th>Địa điểm</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Hành động</th>
            </tr>
          </thead>
          <tbody>
          <tr className="tr_header">
              <th>STT</th>
              <th>Ảnh Hotel</th>
              <th>Tên Hotel</th>
              <th>Giá</th>
              <th>Địa điểm</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Hành động</th>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminHotel;
