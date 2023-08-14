import Modal from "react-bootstrap/Modal";
import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import { Button } from "antd";
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
            <tr>
              <td>1</td>
              <td>Ảnh Hotel</td>
              <td>Tên Hotel</td>
              <td>Giá</td>
              <td>Địa điểm</td>
              <td>Trạng thái</td>
              <td>
                <Button type="primary" ghost>
                  Primary
                </Button>
                <Button type="primary" danger ghost>
                  Danger
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminHotel;
