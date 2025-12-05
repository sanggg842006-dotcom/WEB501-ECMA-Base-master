import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Tour noi dia')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/tours/${id}`)
        setName(data?.name || '')
        setPrice(String(data?.price ?? ''))
        setCategory(data?.category || 'Tour noi dia')
      } catch (e) {
        toast.error(e?.response?.data?.message || 'Lỗi call API')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setSaving(true)
      await axios.put(`http://localhost:3000/tours/${id}`, {
        name: name.trim(),
        price: Number(price),
        category,
      })
      toast.success('Update thành công')
      navigate('/')
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-slate-50 p-6">Đang tải...</div>

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-xl font-semibold">Cập nhật tour #{id}</h1>

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="price" className="text-sm font-medium">Price</label>
          <input
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number"
            min={1}
            className="w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full rounded-xl border bg-white px-4 py-2.5 outline-none focus:ring-4 focus:ring-blue-100"
          >
            <option value="Tour noi dia">Tour nội địa</option>
            <option value="Tour quoc te">Tour quốc tế</option>
          </select>
        </div>

        <button
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white disabled:opacity-60"
        >
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </form>
    </div>
  )
}