import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ListPage() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tours')
        setTours(data)
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleDelete = async id => {
    if (!confirm('Bạn muốn xoá tour này?')) return
    try {
      await axios.delete(`http://localhost:3000/tours/${id}`)
      setTours(prev => prev.filter(t => t.id !== id))
      toast.success('Đã xoá')
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Danh sách tour</h1>
          <Link
            to="/add"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Thêm mới
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-slate-600">
                <th className="border-b px-4 py-3">ID</th>
                <th className="border-b px-4 py-3">Name</th>
                <th className="border-b px-4 py-3">Price</th>
                <th className="border-b px-4 py-3">Category</th>
                <th className="border-b px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan={5}>
                    Đang tải...
                  </td>
                </tr>
              ) : tours.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan={5}>
                    Chưa có tour nào.
                  </td>
                </tr>
              ) : (
                tours.map(tour => (
                  <tr key={tour.id} className="hover:bg-slate-50">
                    <td className="border-b px-4 py-3">{tour.id}</td>
                    <td className="border-b px-4 py-3 font-medium">{tour.name}</td>
                    <td className="border-b px-4 py-3">
                      {Number(tour.price || 0).toLocaleString('vi-VN')}₫
                    </td>
                    <td className="border-b px-4 py-3">{tour.category}</td>
                    <td className="border-b px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/edit/${tour.id}`}
                          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-white"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(tour.id)}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}






