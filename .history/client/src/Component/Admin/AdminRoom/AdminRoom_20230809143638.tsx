import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminroom.css";
import { Button, Modal, Pagination, notification } from "antd";
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
  const [selectedMedia, setSelectedMedia] = useState("");
  const [preview, setPreviewSrc] = useState("");

  const handleAddMedia = (event: any) => {
    setSelectedMedia(event.target.files[0]);
    // xem trước media
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event: any) {
      setPreviewSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

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

  const [direction , setDirection] = useState<string>("");
  const [imgRoom , setImgRoom] = useState<string>("");
  const [nameRoom , setNameRoom] = useState<string>("");
  const [priceRoom , setPriceRoom] = useState<number>(0);
  const [amenities, setAmenities] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  const [floorArea , setFloorArea] = useState<string>("");
  const [capacity , setCapacity] = useState<string>("");
  const [statusRoom , setStatusRoom] = useState<number>(0)

  const inforRoom = {
    description : description,
    name_room : nameRoom,
    price_room : priceRoom,
    amenities : amenities,
    floor_area : floorArea,
    capacity : capacity,
    status_room : statusRoom,
    direction : direction,
    img_rooms : imgRoom 
  }

  const handleOk = async() => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "Project_module 5");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dkwxilkxq/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      if (
        nameRoom === "" ||
        priceRoom === 0 ||
        imgRoom === "" ||
        description === "" ||
        direction === "" ||
        amenities === "" ||
        statusRoom === 0 ||
        floorArea === "" ||
        capacity === "" 
      ) {
        notification.error({
          message: "Thất bại",
          description: "Bạn chưa điền đủ thông tin",
        });
        return;
      }
      const newRoom = {...inforRoom , imgRoom : media}
      const response = axios.post(`http://localhost:4000/rooms/$`)

      if (postHotel.status === 200) {
        notification.success({
          message: "Thành công",
          description: "Thêm khách sạn thành công",
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      
    }
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

  const handleDelete = async(id : number) => {
    try {
      await axios.delete(`http://localhost:4000/rooms/${id}`)
      notification.success({
        message: "Thành công",
        description: "Xóa phòng thành công",
      });
      loadRoom();
    } catch (error) {
      console.log(error)
    }
  }

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
            <label htmlFor="uploadMedia">
                <p>+</p>
                <p>Add Photo/Video</p>
              </label>
              <input
                type="file"
                name="uploadMedia"
                id="uploadMedia"
                style={{ display: "none" }}
                onChange={handleAddMedia}
              />
              {preview ? (
                <div>
                  <img src={preview} width={100} />
                </div>
              ) : (
                ""
              )}
              <br />
              <label>Hướng phòng</label> <br />
              <input className="form-control" type="text" value={direction} onChange={(e) => setDirection(e.target.value)}/>
              <br />
              <br />
              <label>Tên phòng</label> <br />
              <input className="form-control" type="text" value={nameRoom} onChange={(e) => setNameRoom(e.target.value)}/>
              <br />
              <label>Số người</label> <br />
              <input className="form-control" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)}/>
              <br />
              <label>Giá</label> <br />
              <input className="form-control" type="number" value={priceRoom} onChange={(e) => setPriceRoom(parseFloat(e.target.value))}/>
              <br />
              <label>Mô tả</label>
              <br />
              <input className="form-control" type="string" value={description} onChange={(e) => setDescription(e.target.value)}/>
              <br />
              <label>Tiện nghi</label>
              <br />
              <input className="form-control" type="string" value={amenities} onChange={(e) => setAmenities(e.target.value)}/>
              <br />
              <label>Diện tích phòng</label>
              <br />
              <input className="form-control" type="string" value={floorArea} onChange={(e)=>setFloorArea(e.target.value)}/>
              <br />
              <label>Trạng thái</label>
              <div className="selectOption">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={statusRoom}
                  onChange={(e) => setStatusRoom(parseInt(e.target.value))}
                >
                  <option value="">Lựa chọn</option>
                  <option value="0">Trống</option>
                </select>
              </div>
            </div>
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
                <th>Tên phòng</th>
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
                  <td>{room.description}</td>
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
                  <td>{room.name_room}</td>
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
                  </td>
                  <td>
                    <Button type="primary" danger ghost onClick={() => handleDelete(room.room_id)}>
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
