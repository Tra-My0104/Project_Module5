import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminbookingroom.css";
import { Button, notification } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

interface AdminBooking {
  booking_room_id: number;
  check_in_date: string;
  number_night: string;
  total_price: number;
  check_out_date: string;
  UserId: number;
  users: any;
  rooms: any;
  hotels: any;
  rooms_id: number;
  nameRoom: string;
  name_room: string;
  UserName: string;
  status_room: number;
}

function Adminbookingroom() {
  const [booking, setBooking] = useState<AdminBooking[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const loadBooking = async () => {
    try {
      const response = await axios.get("http://localhost:4000/booking-room");
      console.log(response.data.result_data);
      setBooking(response.data.result_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBooking();
  }, []);

  const handleCheck = async (id: number) => {
    try {
      await axios.patch(`http://localhost:4000/rooms/status_room_1/${id}`);
      loadBooking();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancle = async (id: number) => {
    try {
      let text = "Bạn có chắc muốn hủy phòng không";
      if (window.confirm(text)) {
        await axios.patch(`http://localhost:4000/rooms/status_room_3/${id}`);
        loadBooking();
        const key = `change_status_${id}`;
        api.open({
          message: "Xóa phòng thành công",
          description: "Bạn đã Xóa phòng thành công.",
          key,
          duration: 3, // Thời gian hiển thị thông báo (số giây)
        });
      } else {
        text = "You canceled!";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number, room_id: number) => {
    try {
      let text = "Bạn có chắc muốn xóa phòng không";
      if (window.confirm(text)) {
        await axios.delete(`http://localhost:4000/booking-room/${id}`);
        await axios.patch(
          `http://localhost:4000/rooms/status_room_3/${room_id}`
        );
        loadBooking();
        const key = `delete_${id}`;
        api.open({
          message: "Xóa phòng thành công",
          description: "Bạn đã Xóa phòng thành công.",
          key,
          duration: 3, // Thời gian hiển thị thông báo (số giây)
        });
      } else {
        text = "You canceled!";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-adminBookingRoom">
        <Headeradmin></Headeradmin>
        <Table className="table">
          <thead>
            <tr className="tr_header">
              <th>STT</th>
              <th>Tên khách sạn</th>
              <th>Người đặt</th>
              <th>Ngày vào</th>
              <th>Ngày ra</th>
              <th>Tổng tiền</th>
              <th>Tên phòng</th>
              <th>Trạng thái</th>
              <th colSpan={3}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {booking?.map((book, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{book.rooms.hotels.nameRoom}</td>
                <td>{book.users.UserName}</td>
                <td>{book.check_in_date}</td>
                <td>{book.check_out_date}</td>
                <td>{book.total_price.toLocaleString()}</td>
                <td>{book.rooms.name_room}</td>
                <td>
                  {
                    book.rooms.status_room === 0 ? (
                      <>Đã hủy</>
                    ) : book.rooms.status_room === 1 ? (
                      <>Đang chờ xét duyệt</>
                    ) : book.rooms.status_room === 2 ? (
                      <>Đã xét duyệt</>
                    ) : book.rooms.status_room === 3 ? (
                      <>Đã thanh toán</>
                    ) : null /* Add any default case if needed */
                  }
                </td>
                <td>
                  {book.rooms.status_room === 3 ? (
                    <>
                      <Button
                        type="primary"
                        ghost
                       disabled
                      >
                        <i
                          className="fa-solid fa-check"
                          style={{ color: "#37ff00" }}
                        ></i>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => handleCheck(book.rooms.rooms_id)}
                      >
                        <i
                          className="fa-solid fa-check"
                          style={{ color: "#37ff00" }}
                        ></i>
                      </Button>
                    </>
                  )}
                </td>
                <td>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => handleCancle(book.rooms.rooms_id)}
                  >
                    <i
                      className="fa-solid fa-x"
                      style={{ color: "#ff8800" }}
                    ></i>
                  </Button>
                  {contextHolder}
                </td>
                <td>
                  <Button
                    type="primary"
                    danger
                    ghost
                    onClick={() =>
                      handleDelete(book.booking_room_id, book.rooms.rooms_id)
                    }
                  >
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff0000" }}
                    ></i>
                  </Button>
                  {contextHolder}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Adminbookingroom;
