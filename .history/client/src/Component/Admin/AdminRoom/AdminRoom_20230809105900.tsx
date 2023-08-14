import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminroom.css";
import { Button, Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

interface Room {
  room_id: number;
  direction: string;
  floor_area: string;
  price_room: number;
  status_room: number;
  img_rooms: string;
  hotel_id: number;
  amenities: string;
  name_room: string;
  capacity: string;
  description: string;
}

function AdminRoom() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = rooms.slice(startIndex, startIndex + itemsPerPage);
  const loadRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/rooms`);
      console.log(response.data.getAll);
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
           .description-cell {
  max-height: 80px; /* Chiều cao tối đa của cột */
  overflow: hidden; /* Ẩn nội dung vượt quá chiều cao tối đa */
  position: relative; /* Để dễ dàng thêm nút "Xem thêm" */
}

.description-content {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  padding: 5px;
}

          </Modal>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "0 40px 0 20px",
          }}
        >
          <Table className="table" style={{ width: "100%" }}>
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
              {visibleProducts?.map((room) => (
                <tr key={room.room_id}>
                  <td>
                    <img src={room.img_rooms} width={100} height={100} />
                  </td>
                  <td>{room.direction}</td>
                  <td>{room.capacity}</td>
                  <td className="description-cell">
                    <div>
                      {room.description.split("\n").length > 2 ? (
                        <div>
                          {room.description
                            .split("\n")
                            .slice(0, 2)
                            .map((line, index) => (
                              <p key={index}>{line}</p>
                            ))}
                          <div className="description-content">
                            {room.description
                              .split("\n")
                              .slice(2)
                              .map((line, index) => (
                                <p key={index}>{line}</p>
                              ))}
                            <button>Xem thêm</button>
                          </div>
                        </div>
                      ) : (
                        <div>{room.description}</div>
                      )}
                    </div>
                  </td>

                  <td>{room.floor_area}m2</td>
                  <td>{room.price_room.toLocaleString()}VNĐ</td>
                  <td>
                    {room.status_room === 0 ? (
                      <p style={{ fontWeight: 500 }}>Phòng trống</p>
                    ) : (
                      <p style={{ fontWeight: 500 }}>Đã đặt</p>
                    )}
                  </td>
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
          <div
            style={{ padding: 10, display: "flex", justifyContent: "center" }}
          >
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={rooms.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRoom;
