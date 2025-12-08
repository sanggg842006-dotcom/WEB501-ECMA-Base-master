import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function ListPage() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/sinh_vien')
        setStudents(data || [])
      } catch (error) {
        console.log(error)
        toast.error('Lỗi tải danh sách sinh viên')
      }
    }
    getStudents()
  }, [])

  const handleDelete = async id => {
    if (!window.confirm('Bạn có chắc muốn xóa sinh viên này?')) return

    try {
      await axios.delete('http://localhost:3000/sinh_vien/' + id)
      setStudents(prev => prev.filter(sv => sv.id !== id))
      toast.success('Xóa thành công')
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Lỗi xóa sinh viên')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Danh sách sinh viên</h1>
        <Link
          to="/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Thêm
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tên
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tuổi
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Môn học
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Ngành học
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-3 border border-gray-300 text-center"
                >
                  Chưa có sinh viên nào
                </td>
              </tr>
            ) : (
              students.map((sv, index) => (
                <tr key={sv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {sv.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {sv.age}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {sv.mon_hoc}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {sv.nganh_hoc}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex gap-2">
                      <Link to={`/edit/${sv.id}`}>
                        <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(sv.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
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
  )
}

export default ListPage