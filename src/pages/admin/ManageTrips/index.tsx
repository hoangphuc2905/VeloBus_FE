import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import AdminLayout from "../AdminLayout";
import "./style.scss";

interface Seat {
  id: string;
  status: string;
}

interface Trip {
  _id: string;
  id: string;
  from: string;
  to: string;
  formTime: string;
  toTime: string;
  duration: string;
  price: string;
  seats: {
    tangDuoi: Seat[];
    tangTren: Seat[];
  };
  busType: string;
}

interface TripData {
  id: string;
  from: string;
  to: string;
  formTime: string;
  toTime: string;
  duration: string;
  price: string;
  seats: {
    tangDuoi: Seat[];
    tangTren: Seat[];
  };
  busType: string;
}

const ManageTrips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<string | null>(null);
  const [tripData, setTripData] = useState<TripData>({
    id: "",
    from: "",
    to: "",
    formTime: "",
    toTime: "",
    duration: "",
    price: "",
    seats: {
      tangDuoi: [],
      tangTren: [],
    },
    busType: "",
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("/trip");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips", error);
      }
    };
    fetchTrips();
  }, []);

  const formatDateTimeForInput = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 16);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleEditClick = (trip: Trip) => {
    setEditingTrip(trip._id);
    setTripData({
      ...trip,
      formTime: formatDateTimeForInput(trip.formTime),
      toTime: formatDateTimeForInput(trip.toTime),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (new Date(tripData.formTime) >= new Date(tripData.toTime)) {
        alert("Thời gian khởi hành phải trước thời gian đến.");
        return;
      }
      await axios.put(`/trip/updatetrips/${editingTrip}`, tripData);
      setEditingTrip(null);
      const response = await axios.get("/trip");
      setTrips(response.data);
    } catch (error) {
      console.error("Error updating trip", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/trip/${id}`);
      const response = await axios.get("/trip");
      setTrips(response.data);
    } catch (error) {
      console.error("Error deleting trip", error);
    }
  };

  const renderSeats = (seats: Seat[]) => {
    return seats.length > 0 ? seats.map(seat => seat.id).join(", ") : "Chưa có ghế";
  };

  return (
    <AdminLayout>
      <div className="all-trips-container">
        <h2>Danh Sách Chuyến Đi</h2>
        {trips.map((trip) => (
          <div key={trip._id} className="trip-item">
            {editingTrip === trip._id ? (
              <form className="edit-trip-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="id">ID:</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={tripData.id}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="from">Từ:</label>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    value={tripData.from}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="to">Đến:</label>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    value={tripData.to}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formTime">Thời gian khởi hành:</label>
                  <input
                    type="datetime-local"
                    id="formTime"
                    name="formTime"
                    value={tripData.formTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="toTime">Thời gian đến:</label>
                  <input
                    type="datetime-local"
                    id="toTime"
                    name="toTime"
                    value={tripData.toTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Thời gian:</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={tripData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Giá:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={tripData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seatsTangDuoi">Ghế Tầng Dưới:</label>
                  <input
                    type="text"
                    id="seatsTangDuoi"
                    name="seatsTangDuoi"
                    value={tripData.seats.tangDuoi
                      .map((seat) => seat.id)
                      .join(", ")}
                    onChange={(e) =>
                      setTripData({
                        ...tripData,
                        seats: {
                          ...tripData.seats,
                          tangDuoi: e.target.value.split(",").map((id) => ({
                            id: id.trim(),
                            status: "available",
                          })),
                        },
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seatsTangTren">Ghế Tầng Trên:</label>
                  <input
                    type="text"
                    id="seatsTangTren"
                    name="seatsTangTren"
                    value={tripData.seats.tangTren
                      .map((seat) => seat.id)
                      .join(", ")}
                    onChange={(e) =>
                      setTripData({
                        ...tripData,
                        seats: {
                          ...tripData.seats,
                          tangTren: e.target.value.split(",").map((id) => ({
                            id: id.trim(),
                            status: "available",
                          })),
                        },
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="busType">Loại xe:</label>
                  <input
                    type="text"
                    id="busType"
                    name="busType"
                    value={tripData.busType}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  Lưu Chỉnh Sửa
                </button>
              </form>
            ) : (
              <div className="trip-details">
                <p>Từ: {trip.from}</p>
                <p>Đến: {trip.to}</p>
                <p>
                  Thời gian khởi hành: {" "}
                  {new Date(trip.formTime).toLocaleString("vi-VN")}
                </p>
                <p>
                  Thời gian đến: {new Date(trip.toTime).toLocaleString("vi-VN")}
                </p>
                <p>Thời gian đi: {trip.duration}</p>
                <p>Giá: {trip.price} VND</p>
                <p>Số ghế tầng dưới: {renderSeats(trip.seats.tangDuoi)}</p>
                <p>Số ghế tầng trên: {renderSeats(trip.seats.tangTren)}</p>
                <p>Loại xe: {trip.busType}</p>

                <button
                  onClick={() => handleEditClick(trip)}
                  className="edit-button"
                >
                  Chỉnh Sửa
                </button>
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="delete-button"
                >
                  Xoá
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageTrips; 