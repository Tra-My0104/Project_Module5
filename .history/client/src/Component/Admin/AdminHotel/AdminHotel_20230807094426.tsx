import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./AdminHotel.css";

function AdminHotel() {
  return (
    <>
      <div className="container-adminUser">
        <Headeradmin></Headeradmin>
        <Table className="table">
          <thead>
            <tr className="tr_header">
              <th>STT</th>
              <th>Tên người dùng</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Quyền</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Hành động</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminHotel;
