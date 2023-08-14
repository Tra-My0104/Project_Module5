import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminbookingroom.css";
import { Button, Modal } from "antd";
import { useState } from "react";

function Adminbookingroom() {

  return (
    <>
      <div className="container-adminBookingRoom">
        <Headeradmin></Headeradmin>
        <Table className="table">
          <thead>
            <tr className="tr_header">
              <th>STT</th>
              <th>Ảnh phòng</th>
              <th>Hướng phòng</th>
              <th>Số người</th>
              <th>Mô tả</th>
              <th>Diện tích</th>
              <th>Giá</th>
              <th>Tình trạng phòng</th>
              <th>Tiện nghi</th>
              <th colSpan={3}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ảnh Hotel</td>
              <td>Hướng phòng</td>
              <td>Số người</td>
              <td>Mô tả</td>
              <td>Diện tích</td>
              <td>Giá</td>
              <td>Tình trạng phòng</td>
              <td>Tiện nghi</td>
              <td>
                <Button type="primary" ghost >
                <i className="fa-solid fa-check" style={{color: "#37ff00"}}></i>
                </Button>
              </td>
              <td>
              <Button type="primary" ghost >
                  <i
                    className="fa-solid fa-pen-nib"
                    style={{ color: "#1f93ff" }}
                  ></i>
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
