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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Number of items to display per page
  const { Search } = Input;
  const [searchResults, setSearchResults] = useState<any>([]);
  const onSearch = async (value: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/hotels/search?name=${value}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allHotel.slice(startIndex, endIndex);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
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

  const newHotel = {
    imgRoom: imgHotel,
    nameRoom: nameHotel,
    price: priceHotel,
    location: location,
    availability: availability,
  };

  const handleOk = async () => {
    try {
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

      const postHotel = await axios.post(
        `http://localhost:4000/hotels`,
        newHotel
      );
      console.log(postHotel);

      setNameHotel("");
      setLocation("");
      setAvailability("");
      setPriceHotel(0);
      setIsModalOpen(false);
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
              onSearch={onSearch}
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
              <input
                className="form-control"
                type="file"
                value={imgHotel}
                onChange={(e) => setImgHotel(e.target.value)}
              />
              <br />
              <button className="uploadImg">Upload ảnh</button>
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
              {searchResults.length === 0 ? (
                <p style={{textAlign : "center" , fontSize : "larger" , fontW}}>Không tìm thấy khách sạn phù hợp</p>
              ) : (
                searchResults.map((hotel: any, index: number) => (
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
                      <Button type="primary" ghost onClick={showEditModal}>
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
                        {/* Form chỉnh sửa hotel */}
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
              )}
            </tbody>
          </Table>
          <div
            style={{ padding: 10, display: "flex", justifyContent: "center" }}
          >
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={searchResults.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHotel;
