import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import { Button, Modal } from "antd";
import "./AdminHotel.css";
import { useState } from "react";

function AdminHotel() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default AdminHotel;
