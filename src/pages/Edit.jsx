import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    description: "",
    available: "",
    image: "",
    category: "tour nội địa",
    active: true,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tours/${id}`)
      .then((res) => setTour(res.data))
      .catch(() => toast.error("Lỗi tải dữ liệu!"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTour({
      ...tour,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/tours/${id}`, tour);
      toast.success("Cập nhật thành công!");
      navigate("/list");
    } catch {
      toast.error("Lỗi cập nhật!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sửa Tour</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Tên tour"
          value={tour.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="destination"
          placeholder="Điểm đến"
          value={tour.destination}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="duration"
          placeholder="Thời lượng"
          value={tour.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={tour.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="available"
          placeholder="Số lượng còn lại"
          value={tour.available}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Ảnh URL"
          value={tour.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Mô tả"
          value={tour.description}
          onChange={handleChange}
          className="w-full border p-2 rounded h-28"
        ></textarea>

        <select
          name="category"
          value={tour.category}
onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="tour nội địa">Tour nội địa</option>
          <option value="tour quốc tế">Tour quốc tế</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={tour.active}
            onChange={handleChange}
          />
          Hoạt động (Active)
        </label>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default EditPage;