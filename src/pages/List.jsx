import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


function ListPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/tours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tours:", err);
        setLoading(false);
        setError(err.message)
      });
  }, []);

  const handleDelete = async(id) => {
    if(!confirm("Bạn chắc chắn muốn xóa tour này ?")) return;
    setLoading(false);  
    try{
      await axios.delete(`http://localhost:3001/tours/${id}`);
      setTours(tours.filter((t) => t.id !== id));
      toast.success("Xóa thành công")
    } catch(err){
      setError(err.message);
      toast.error(error)
    } finally{
      setLoading(false)
    }
  };

  if (loading) {
    return <p className="p-6">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách tours</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">#</th>
              <th className="px-4 py-2 border border-gray-300">Tên tour</th>
              <th className="px-4 py-2 border border-gray-300">Điểm đến</th>
              <th className="px-4 py-2 border border-gray-300">Thời gian</th>
              <th className="px-4 py-2 border border-gray-300">Giá</th>
              <th className="px-4 py-2 border border-gray-300">Còn lại</th>
              <th className="px-4 py-2 border border-gray-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.price.toLocaleString()} VND
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.available}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={()=> handleDelete(tour.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;