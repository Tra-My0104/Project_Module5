import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminroom.css";
import { Button, Modal, Pagination, notification, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

interface Room {
  rooms_id: number;
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
  nameRoom: any;
  hotels: any;
}

function AdminRoom() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [preview, setPreviewSrc] = useState("");
  const { Search } = Input;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionLength: number = 20;
  const [showFullAmenities, setShowFullAmenities] = useState(false);
  const amenitiesLength: number = 20;
  const [hotelName, setHotelName] = useState("");

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
      setRooms(response.data.getAll);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async () => {
    try {
      const response = await axios.get(
        ` http://localhost:4000/rooms/searchByHotel?name=${hotelName}`
      );
      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  useEffect(() => {
    loadRoom();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [editRoomData, setEditRoomData] = useState<Room>({
    rooms_id: 0,
    direction: "",
    floor_area: "",
    price_room: 0,
    status_room: 0,
    img_rooms: "",
    hotel_id: 0,
    amenities: "",
    name_room: "",
    capacity: "",
    description: "",
    nameRoom: "",
    hotels: "",
  });

  const showEditModal = (id: number) => {
    const roomToEdit = rooms.find((room: Room) => room.rooms_id === id);
    if (roomToEdit) {
      setEditRoomData(roomToEdit);
      setIsEditModalOpen(true);
    }
  };

  const [direction, setDirection] = useState<string>("");
  const [imgRoom, setImgRoom] = useState<string>("");
  const [nameRoom, setNameRoom] = useState<string>("");
  const [priceRoom, setPriceRoom] = useState<number>(0);
  const [amenities, setAmenities] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [floorArea, setFloorArea] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [statusRoom, setStatusRoom] = useState<number>(0);
  const [hotel, setHotel] = useState<number>(0);

  const inforRoom = {
    description: description,
    name_room: nameRoom,
    price_room: priceRoom,
    amenities: amenities,
    floor_area: floorArea,
    capacity: capacity,
    status_room: statusRoom,
    direction: direction,
    img_rooms: imgRoom,
    hotels: hotel,
  };

  const handleOk = async () => {
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
      const newRoom = { ...inforRoom, img_rooms: media };
      console.log(media);
      console.log(newRoom);
      const response = await axios.post(`http://localhost:4000/rooms`, newRoom);
      console.log(response);
      if (response.status === 200) {
        notification.success({
          message: "Thành công",
          description: "Thêm khách sạn thành công",
        });
      }
      setAmenities("");
      setCapacity("");
      setDescription("");
      setFloorArea("");
      setHotel(0);
      setDirection("");
      setNameRoom("");
      setStatusRoom(0);
      setPriceRoom(0);
      setImgRoom("");
      setPreviewSrc("");
      setIsModalOpen(false);
      loadRoom();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditOk = async () => {
    try {
      let media = editRoomData.img_rooms; // Giữ nguyên ảnh cũ
      if (selectedMedia) {
        // Nếu có ảnh mới được chọn
        const formData = new FormData();
        formData.append("file", selectedMedia);
        formData.append("upload_preset", "Project_module 5");
        const [uploadMedia] = await Promise.all([
          axios.post(
            "https://api.cloudinary.com/v1_1/dkwxilkxq/image/upload",
            formData
          ),
        ]);
        media = uploadMedia.data.secure_url; // Lấy đường dẫn ảnh mới
      }
  
      const {
        direction,
        name_room,
        amenities,
        description,
        floor_area,
        capacity,
        price_room,
      } = editRoomData;
  
      if (
        !direction ||
        !name_room ||
        !amenities ||
        !description ||
        !floor_area ||
        !capacity ||
        !price_room
      ) {
        notification.error({
          message: "Thất bại",
          description: "Bạn chưa điền đủ thông tin",
        });
        return;
      }
  
      const updatedRoom = {
        direction,
        img_rooms: media, // Sử dụng ảnh mới hoặc ảnh cũ
        name_room,
        amenities,
        description,
        floor_area,
        capacity,
        price_room,
      };
  
      const response = await axios.patch(
        `http://localhost:4000/rooms/${editRoomData.rooms_id}`,
        updatedRoom
      );
      if (response.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công",
        });
      }
      setIsEditModalOpen(false);
      loadRoom();
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/rooms/${id}`);
      notification.success({
        message: "Thành công",
        description: "Xóa phòng thành công",
      });
      loadRoom();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-adminRoom">
        <Headeradmin></Headeradmin>
        <div className="ant-modal-wrap">
          <div className="search">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              onChange={(e) => setHotelName(e.target.value)}
              value={hotelName}
              enterButton
            />
          </div>
          <Button type="primary" onClick={showModal}>
            Thêm phòng
          </Button>
          <Modal
            title="Quản lý hotel"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
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
                <input
                  className="form-control"
                  type="text"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  required
                />
                <br />
                <label>Tên phòng</label> <br />
                <input
                  className="form-control"
                  type="text"
                  value={nameRoom}
                  onChange={(e) => setNameRoom(e.target.value)}
                  required
                />
                <br />
                <label>Số người</label> <br />
                <input
                  className="form-control"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
                <br />
                <label>Giá</label> <br />
                <input
                  className="form-control"
                  type="number"
                  value={priceRoom}
                  onChange={(e) => setPriceRoom(parseFloat(e.target.value))}
                  required
                />
                <br />
                <label>Mô tả</label>
                <br />
                <input
                  className="form-control"
                  type="string"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <br />
                <label>Tiện nghi</label>
                <br />
                <input
                  className="form-control"
                  type="string"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  required
                />
                <br />
                <label>Diện tích phòng</label>
                <br />
                <input
                  className="form-control"
                  type="string"
                  value={floorArea}
                  onChange={(e) => setFloorArea(e.target.value)}
                  required
                />
                <br />
                <label>Trạng thái</label>
                <div className="selectOption">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={statusRoom}
                    onChange={(e) => setStatusRoom(parseInt(e.target.value))}
                    required
                  >
                    <option value="">Lựa chọn</option>
                    <option value="0">Trống</option>
                  </select>
                </div>
                <label>Khách sạn</label>
                <div className="selectOption">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={hotel}
                    onChange={(e) => setHotel(parseInt(e.target.value))}
                    required
                  >
                    <option value="">Lựa chọn</option>
                    <option value="1">Holi Panorama Nha Trang</option>
                    <option value="2">Erica Hotel Nha Trang</option>
                    <option value="5">Masova Hotel</option>
                    <option value="7">Adela Botique Hotel</option>
                    <option value="9">Prince Palace Hotel</option>
                    <option value="12">Alibaba Hotel Da Nang</option>
                    <option value="16">Miracle Grand Convention Hotel</option>
                    <option value="25">Royal Plaza on Scrotts</option>
                    <option value="43">
                      Cross Vibe Bangkok Sukhumvit (formerly X2 Vibe Bangkok
                      Sukhumvit)
                    </option>
                    <option value="42">
                      Four Seasons Hotel Bangkok at Chao Phraya River
                    </option>
                    <option value="50">
                      J&B Hotel and Apartments - The Water Front
                    </option>
                    <option value="52">Le House Boutique Hotel</option>
                    <option value="8">Millennium Hilton Bangkok</option>
                    <option value="6">Davua Đà Nẵng</option>
                    <option value="4">Virgo Hotel Nha Trang</option>
                    <option value="21">Ana Mandara Cam Ranh</option>
                  </select>
                </div>
              </div>
            </form>
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
          {rooms.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontSize: "larger",
                fontWeight: "500",
                color: "red",
                position: "absolute",
                left: "50%",
                top: "50%",
              }}
            >
              Không có phòng khách sạn
            </p>
          ) : (
            <Table className="table" style={{ width: "100%" }}>
              <thead>
                <tr className="tr_header">
                  <th>Ảnh phòng</th>
                  <th>Tên khách sạn </th>
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
                  <tr key={room.rooms_id}>
                    <td>
                      <img src={room.img_rooms} width={100} height={100} />
                    </td>
                    <td>{room.hotels?.nameRoom}</td>
                    <td>{room.direction}</td>
                    <td>{room.capacity}</td>
                    <td>
                      {showFullDescription
                        ? room.description
                        : room.description.slice(0, descriptionLength)}
                      <a
                        onClick={() => {
                          setShowFullDescription(!showFullDescription);
                        }}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {showFullDescription ? "...thu gọn" : "...xem thêm"}
                      </a>
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
                    <td>
                      {showFullAmenities
                        ? room.amenities
                        : room.amenities.slice(0, amenitiesLength)}
                      <a
                        onClick={() => {
                          setShowFullAmenities(!showFullAmenities);
                        }}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {showFullAmenities ? "...thu gọn" : "...xem thêm"}
                      </a>
                    </td>
                    <td>{room.name_room}</td>
                    <td>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => showEditModal(room.rooms_id)}
                      >
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
                          {editRoomData.img_rooms ? (
                            <div>
                              <img src={editRoomData.img_rooms} width={100} />
                            </div>
                          ) : (
                            ""
                          )}
                          <br />
                          <label>Hướng phòng</label> <br />
                          <input
                            className="form-control"
                            type="text"
                            value={editRoomData.direction}
                            onChange={(e) =>
                              setEditRoomData({
                                ...editRoomData,
                                direction: e.target.value,
                              })
                            }
                          />
                          <br />
                          <label>Số người</label> <br />
                          <input
                            className="form-control"
                            type="number"
                            value={editRoomData.capacity}
                            onChange={(e) =>
                              setEditRoomData({
                                ...editRoomData,
                                capacity: e.target.value,
                              })
                            }
                          />
                          <br />
                          <label>Giá</label> <br />
                          <input
                            className="form-control"
                            type="number"
                            value={editRoomData.price_room}
                            onChange={(e) =>
                              setEditRoomData({
                                ...editRoomData,
                                price_room: parseFloat(e.target.value),
                              })
                            }
                          />
                          <br />
                          <label>Tên phòng</label> <br />
                          <input
                            className="form-control"
                            type="text"
                            value={editRoomData.name_room}
                            onChange={(e) =>
                              setEditRoomData({
                                ...editRoomData,
                                name_room: e.target.value,
                              })
                            }
                            required
                          />
                          <br />
                          <label>Mô tả</label>
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            value={editRoomData.description}
                            onChange={(e) =>
                              setEditRoomData({
                                ...editRoomData,
                                description: e.target.value,
                              })
                            }
                          />
                          <br />
                          <label>Tiện nghi</label>
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            value={editRoomData.amenities}
                            onChange={(e) =>
                              setEditRoomData({
                                ...editRoomData,
                                amenities: e.target.value,
                              })
                            }
                          />
                          <br />
                          <label>Diện tích phòng</label>
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            value={editRoomData.floor_area}
                            onChange={(e) =>
                              setEditRoomData({
                                ...editRoomData,
                                floor_area: e.target.value,
                              })
                            }
                          />
                          <br />
                        </div>
                      </Modal>
                    </td>
                    <td>
                      <Button
                        type="primary"
                        danger
                        ghost
                        onClick={() => handleDelete(room.rooms_id)}
                      >
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
          )}
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
