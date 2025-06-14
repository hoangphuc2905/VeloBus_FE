import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./style.scss";
import AdminLayout from "../AdminLayout";

interface TripData {
  id: string;
  from: string;
  to: string;
  formTime: string;
  toTime: string;
  duration: string;
  price: string;
  busType: string;
}

const AddTrip: React.FC = () => {
  const [tripData, setTripData] = useState<TripData>({
    id: "",
    from: "",
    to: "",
    formTime: "",
    toTime: "",
    duration: "",
    price: "",
    busType: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/trip/create", tripData);
      console.log("Chuyến đi đã được thêm:", response.data);
      setTripData({
        id: "",
        from: "",
        to: "",
        formTime: "",
        toTime: "",
        duration: "",
        price: "",
        busType: "",
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Lỗi khi thêm chuyến đi:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="add-trip-container">
        <h2>Thêm Chuyến Đi</h2>
        <form className="add-trip-form" onSubmit={handleSubmit}>
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
            Thêm Chuyến Đi
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddTrip;  