import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminroom.css";
import { Button, Modal } from "antd";
import { useState } from "react";

function AdminRoom() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
    // Xử lý logic khi nhấn nút OK trong modal chỉnh sửa sản phẩm
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="container-adminRoom">
        <Headeradmin></Headeradmin>
        <div className="ant-modal-wrap">
          <Button type="primary" onClick={showModal}>
            Thêm phòng
          </Button>
          <Modal
            title="Quản lý hotel"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="form-hotel">
              <input className="form-control" type="file" />
              <br />
              <button className="uploadImg">Upload ảnh</button>
              <br />
              <label>Tên</label> <br />
              <input className="form-control" type="text" />
              <br />
              <label>Giá</label> <br />
              <input className="form-control" type="number" />
              <br />
              <label>Địa điểm</label> <br />
              <input className="form-control" type="string" />
              <br />
              <label>Trạng thái</label>
              <div className="selectOption">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Optional">Lựa chọn</option>
                  <option value="Dây chuyền">Trống</option>
                </select>
              </div>
            </div>
          </Modal>
        </div>
        <Table className="table">
          <thead>
            <tr className="tr_header">
              <th>STT</th>
              <th>Hướng phòng</th>
              <th>Số người</th>
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
                <Button type="primary" ghost onClick={showEditModal}>
                  <i
                    className="fa-solid fa-pen-nib"
                    style={{ color: "#1f93ff" }}
                  ></i>
                </Button>
                <Modal
                  title="Chỉnh sửa phòng"
                  visible={isEditModalOpen}
                  onOk={handleEditOk}
                  onCancel={handleEditCancel}
                >
                  <div className="form-hotel">
                    <input className="form-control" type="file" />
                    <br />
                    <button className="uploadImg">Upload ảnh</button>
                    <br />
                    <label>Tên</label> <br />
                    <input className="form-control" type="text" />
                    <br />
                    <label>Giá</label> <br />
                    <input className="form-control" type="number" />
                    <br />
                    <label>Địa điểm</label> <br />
                    <input className="form-control" type="string" />
                    <br />
                    <label>Trạng thái</label>
                    <div className="selectOption">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="Optional">Lựa chọn</option>
                        <option value="Dây chuyền">Trống</option>
                      </select>
                    </div>
                  </div>
                </Modal>
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

export default AdminRoom;