import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Tour noi dia')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post('http://localhost:3000/tours', {
        name: name.trim(),
        price: Number(price),
        category,
      })
      toast.success('Thêm thành công')
      setName('')
      setPrice('')
      setCategory('Tour noi dia')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-xl font-semibold">Thêm tour</h1>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-blue-100"
            placeholder="Tour Đà Lạt..."
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="price">Price</label>
          <input
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number"
            min={1}
            className="w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-4 focus:ring-blue-100"
            placeholder="1500000"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="category">Category</label>
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
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Đang lưu...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}