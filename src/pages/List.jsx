import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


function ListPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "http://localhost:3001/tours";

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setTours(res.data);
    } catch (err) {
      setError(err.message);
      toast.error("Lỗi tải dữ liệu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xóa tour này?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API}/${id}`);
      setTours(tours.filter((t) => t.id !== id));
      toast.success("Xóa tour thành công!");
    } catch (err) {
      setError(err.message);
      toast.error("Lỗi xoá tour: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Danh sách Tours</h1>

      {tours.length === 0 ? (
        <p className="text-gray-600 italic">Chưa có tour nào</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Ảnh</th>
                <th className="px-4 py-2 border">Tên tour</th>
                <th className="px-4 py-2 border">Điểm đến</th>
                <th className="px-4 py-2 border">Thời lượng</th>
                <th className="px-4 py-2 border">Giá</th>
                <th className="px-4 py-2 border">Còn lại</th>
                <th className="px-4 py-2 border">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {tours.map((tour, index) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border font-semibold">{tour.name}</td>
                  <td className="px-4 py-2 border">{tour.destination}</td>
                  <td className="px-4 py-2 border">{tour.duration}</td>
                  <td className="px-4 py-2 border text-red-500 font-bold">
                    {tour.price.toLocaleString()}₫
                  </td>
                  <td className="px-4 py-2 border">{tour.available}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                    <a
                      href={`/edit/${tour.id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Sửa
                    </a>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default ListPage