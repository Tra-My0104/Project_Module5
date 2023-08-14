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
        <div className="ant-modal-wrap">
          <Button type="primary" onClick={showModal}>
            Thêm hotel
          </Button>
          <Modal
            title="Quản lý hotel"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="form-hotel">
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                  <button
                    onClick={() => {
                      uploadFile();
                    }}
                  >
                    Update Ảnh
                  </button>
                  <br></br>
                  <label>Tên</label> <br />
                  <input
                    className="form-control"
                    type="text"
                  />
                  <br />
                  <label>Giá</label> <br />
                  <input
                    className="form-control"
                    type="number"
                  />
                  <br />
                  <label>Số lượng</label> <br />
                  <input
                    className="form-control"
                    type="number"
                    id="sl"
                  />
                  <br />
                  <label>Phân loại</label>
                  <div className="selectOption">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="Optional">Phụ kiện</option>
                      <option value="Dây chuyền">Dây chuyền</option>
                      <option value="Khuyên tai">Khuyên tai</option>
                      <option value="Nhẫn">Nhẫn</option>
                    </select>
                  </div>
            </div>
          </Modal>
        </div>
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
      </div>
    </>
  );
}

export default AdminHotel;
