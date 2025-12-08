import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function AddPage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [monHoc, setMonHoc] = useState('')
  const [nganhHoc, setNganhHoc] = useState('FE')

  const handleSubmit = async event => {
    event.preventDefault()

    // VALIDATE
    if (!name.trim() || !age || !monHoc.trim() || !nganhHoc) {
      toast.error('Tất cả các trường là bắt buộc')
      return
    }

    const ageNumber = Number(age)
    if (Number.isNaN(ageNumber) || ageNumber <= 0) {
      toast.error('Tuổi phải là số lớn hơn 0')
      return
    }

    const allowedMajors = ['FE', 'BE', 'Mobile']
    if (!allowedMajors.includes(nganhHoc)) {
      toast.error('Ngành học phải là FE, BE hoặc Mobile')
      return
    }

    try {
      await axios.post('http://localhost:3000/sinh_vien', {
        name: name.trim(),
        age: ageNumber,
        mon_hoc: monHoc.trim(),
        nganh_hoc: nganhHoc,
      })
      toast.success('Thêm sinh viên thành công')

      // reset form
      setName('')
      setAge('')
      setMonHoc('')
      setNganhHoc('FE')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm sinh viên</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Tên sinh viên
          </label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            id="name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block font-medium mb-1">
            Tuổi
          </label>
          <input
            value={age}
            onChange={event => setAge(event.target.value)}
            type="number"
            id="age"
            min={1}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Môn học */}
        <div>
          <label htmlFor="monHoc" className="block font-medium mb-1">
            Môn học
          </label>
          <input
            value={monHoc}
            onChange={event => setMonHoc(event.target.value)}
            type="text"
            id="monHoc"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ngành học */}
        <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Ngành học
          </label>
          <select
            value={nganhHoc}
            onChange={e => setNganhHoc(e.target.value)}
            id="selectOption"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="FE">FE</option>
            <option value="BE">BE</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddPage