import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import { Button, Modal, Pagination, Input } from "antd";
import "./AdminHotel.css";
import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

// Assuming that the CreateHotelDto type looks like this
interface Hotel {
  hotel_Id: number;
  imgRoom: string;
  nameRoom: string;
  price: number;
  location: string;
  availability: string;
}

function AdminHotel() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState("");
  const { Search } = Input;
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [editHotelData, setEditHotelData] = useState<Hotel>({
    hotel_Id: 0,
    imgRoom: "",
    nameRoom: "",
    price: 0,
    location: "",
    availability: "",
  });

  const showEditModal = (id: number) => {
   
  };

  const handleEditOk = async () => {
    try {
      const { imgRoom, nameRoom, availability, location, price } =
        editHotelData;
      if (!imgRoom || !nameRoom || !availability || !location || !price) {
        notification.error({
          message: "Thất bại",
          description: "Bạn chưa điền đủ thông tin",
        });
        return;
      }

      const updateHotel = {
        nameRoom,
        imgRoom,
        price,
        location,
        availability,
      };

      const response = await axios.patch(
        `http://localhost:4000/hotels/${editHotelData.hotel_Id}`,
        updateHotel
      );

      // Hiển thị thông báo thành công và đóng modal
      if (response.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công",
        });
      }

      setIsEditModalOpen(false);
      loadHotel();
    } catch (error) {}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };
  const [allHotel, setAllHotel] = useState<Hotel[]>([]);
  const [imgHotel, setImgHotel] = useState<string>("");
  const [nameHotel, setNameHotel] = useState<string>("");
  const [priceHotel, setPriceHotel] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");

  const loadHotel = async () => {
    try {
      const response = await axios.get("http://localhost:4000/hotels");
      setAllHotel(response.data.hotels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadHotel();
  }, []);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const onSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/hotels/location/search?search=${valueSearch}&location=${location}`
      );
      setAllHotel(response.data.data);
    } catch (error: any) {
      if (error.response.status === 400) {
        setAllHotel([]);
      }
    }
  };

  useEffect(() => {
    onSearch();
  }, [valueSearch]);
  const visibleProducts = allHotel.slice(startIndex, startIndex + itemsPerPage);

  const infoHotel = {
    imgRoom: imgHotel,
    nameRoom: nameHotel,
    price: priceHotel,
    location: location,
    availability: availability,
  };

  const handleOk = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "thegioididong");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dgbl6qitv/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      
      if (
        nameHotel === "" ||
        priceHotel === 0 ||
        location === "" ||
        availability === ""
      ) {
        notification.error({
          message: "Thất bại",
          description: "Bạn chưa điền đủ thông tin",
        });
        return;
      }
      const newHotel = {...infoHotel,imgRoom: media}

      const postHotel = await axios.post(
        `http://localhost:4000/hotels`,
        newHotel
      );
      
      console.log(postHotel.status);
      if (postHotel.status === 200) {
        notification.success({
          message: "Thành công",
          description: "Thêm khách sạn thành công",
        });
      }
      setNameHotel("");
      setLocation("");
      setAvailability("");
      setPriceHotel(0);
      setIsModalOpen(false);
      loadHotel();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHotel = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/hotels/${id}`);
      notification.success({
        message: "Thành công",
        description: "Xóa khách sạn thành công",
      });
      loadHotel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-adminHotel">
        <Headeradmin></Headeradmin>
        <div className="ant-modal-wrap">
          <div className="search">
            <Search
              placeholder="input search text"
              // onSearch={onSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              value={valueSearch}
              enterButton
            />
          </div>
          <Button type="primary" onClick={showModal}>
            Thêm hotel
          </Button>
          <Modal
            title="Quản lý hotel"
            visible={isModalOpen}
            onOk={() => handleOk()}
            onCancel={handleCancel}
            okButtonProps={{ onClick: handleOk }}
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
              <label>Tên</label> <br />
              <input
                className="form-control"
                type="text"
                value={nameHotel}
                onChange={(e) => setNameHotel(e.target.value)}
              />
              <br />
              <label>Giá</label> <br />
              <input
                className="form-control"
                type="number"
                value={priceHotel}
                onChange={(e) => setPriceHotel(parseFloat(e.target.value))}
              />
              <br />
              <label>Địa điểm</label> <br />
              <div className="selectOption">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Optional">Lựa chọn</option>
                  <option value="Nha Trang">Nha Trang</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Bangkok">Bangkok</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
              <br />
              <label>Trạng thái</label>
              <div className="selectOption">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="Optional">Lựa chọn</option>
                  <option value="Trống">Trống</option>
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
                <th>Ảnh Hotel</th>
                <th>Tên Hotel</th>
                <th>Giá</th>
                <th>Địa điểm</th>
                <th>Trạng thái</th>
                <th colSpan={2}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts?.length > 0 ? (
                visibleProducts.map((hotel: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={hotel.imgRoom}
                        style={{ width: "70px", height: "70px" }}
                      />
                    </td>
                    <td>{hotel.nameRoom}</td>
                    <td>{hotel.price.toLocaleString()}VNĐ</td>
                    <td>{hotel.location}</td>
                    <td>{hotel.availability}</td>
                    <td>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => showEditModal(hotel.hotel_Id)}
                      >
                        <i
                          className="fa-solid fa-pen-nib"
                          style={{ color: "#1f93ff" }}
                        ></i>
                      </Button>
                      <Modal
                        title="Chỉnh sửa hotel"
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
                          <input
                            className="form-control"
                            type="text"
                            value={editHotelData.nameRoom}
                            onChange={(e) =>
                              setEditHotelData({
                                ...editHotelData,
                                nameRoom: e.target.value,
                              })
                            }
                          />
                          <br />
                          <label>Giá</label> <br />
                          <input
                            className="form-control"
                            type="number"
                            value={editHotelData.price}
                            onChange={(e) =>
                              setEditHotelData({
                                ...editHotelData,
                                price: parseFloat(e.target.value),
                              })
                            }
                          />
                          <br />
                          <label>Địa điểm</label> <br />
                          <div className="selectOption">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={editHotelData.location}
                              onChange={(e) =>
                                setEditHotelData({
                                  ...editHotelData,
                                  location: e.target.value,
                                })
                              }
                            >
                              <option value="Optional">Lựa chọn</option>
                              <option value="Nha Trang">Nha Trang</option>
                              <option value="Đà Nẵng">Đà Nẵng</option>
                              <option value="Bangkok">Bangkok</option>
                              <option value="Singapore">Singapore</option>
                            </select>
                          </div>
                          <br />
                          <label>Trạng thái</label>
                          <div className="selectOption">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={editHotelData.availability}
                              onChange={(e) =>
                                setEditHotelData({
                                  ...editHotelData,
                                  availability: e.target.value,
                                })
                              }
                            >
                              <option value="Optional">Lựa chọn</option>
                              <option value="Trống">Trống</option>
                            </select>
                          </div>
                        </div>
                      </Modal>
                    </td>
                    <td>
                      <Button
                        type="primary"
                        danger
                        ghost
                        onClick={() => handleDeleteHotel(hotel.hotel_Id)}
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "#ff0000" }}
                        ></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
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
                  Không tìm thấy khách sạn phù hợp
                </p>
              )}
            </tbody>
          </Table>
          <div
            style={{ padding: 10, display: "flex", justifyContent: "center" }}
          >
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={allHotel.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHotel;
