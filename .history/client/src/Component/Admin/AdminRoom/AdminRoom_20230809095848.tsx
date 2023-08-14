import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminroom.css";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

interface Room {
  room_id: number;
  direction: string;
  floor_area: string;
  price_room: number;
  status_room: number;
  img_room: string;
  hotel_id: number;
  amenities: string;
  name_room: string;
  capacity : string;
  description : string
}

function AdminRoom() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  const loadRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/rooms`);
      // console.log(response.data.getAll)
      setRooms(response.data.getAll);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRoom();
  }, []);

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
              <label>Hướng phòng</label> <br />
              <input className="form-control" type="text" />
              <br />
              <label>Số người</label> <br />
              <input className="form-control" type="number" />
              <br />
              <label>Giá</label> <br />
              <input className="form-control" type="number" />
              <br />
              <label>Mô tả</label>
              <br />
              <input className="form-control" type="string" />
              <br />
              <label>Tiện nghi</label>
              <br />
              <input className="form-control" type="string" />
              <br />
              <label>Diện tích phòng</label>
              <br />
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
              <th>Ảnh phòng</th>
              <th>Hướng phòng</th>
              <th>Số người</th>
              <th>Mô tả</th>
              <th>Diện tích</th>
              <th>Giá</th>
              <th>Tình trạng phòng</th>
              <th>Tiện nghi</th>
              <th colSpan={2}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room) => (
              <tr key={room.room_id}>
                <td><img src={room.img_room} alt="" /></td>
                <td>{room.direction}</td>
                <td>{room.capacity}</td>
                <td>{room.description}</td>
                <td>{room.floor_area}</td>
                <td>{room.price_room}</td>
                <td>{room.status_room === 0 ? <></>}</td>
                <td>{room.amenities}</td>
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
                    {/* ...Nội dung modal */}
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
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminRoom;
