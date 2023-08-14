import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminbookingroom.css";
import { Button } from "antd";


function Adminbookingroom() {

  return (
    <>
      <div className="container-adminBookingRoom">
        <Headeradmin></Headeradmin>
        <Table className="table">
          <thead>
            <tr className="tr_header">
              <th>STT</th>
              <th>Tên khách sạn</th>
              <th>Người đặt</th>
              <th>Ngày vào</th>
              <th>Ngày ra</th>
              <th>Tổng tiền</th>
              <th>Tên phòng</th>
              <th colSpan={3}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Tên khách sạn</td>
              <td>Người đặt</td>
              <td>Số người</td>
              <td>Mô tả</td>
              <td>Diện tích</td>
              <td>Giá</td>
              <td>Tổng tiền</td>
              <td>
                <Button type="primary" ghost >
                <i className="fa-solid fa-check" style={{color: "#37ff00"}}></i>
                </Button>
              </td>
              <td>
              <Button type="primary" ghost > 
              <i className="fa-solid fa-x" style={{color: "#ff8800"}}></i>
                </Button>
              </td>
              <td>
                <Button type="primary" danger ghost>
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#ff0000" }}
                  ></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Adminbookingroom;
