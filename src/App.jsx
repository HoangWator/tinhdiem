import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import tailwindcss from '@tailwindcss/vite'
import './App.css'

function App() {
  const [weightPT2, setWeightPT2] = useState(0.3)
  const [weightPT3, setWeightPT3] = useState(0.3)

  const [tn1, setTn1] = useState(0)
  const [tn2, setTn2] = useState(0)
  const [tn3, setTn3] = useState(0)

  const [hbScores, setHbScores] = useState({
    mon1: { lop10: 0, lop11: 0, lop12: 0 },
    mon2: { lop10: 0, lop11: 0, lop12: 0 },
    mon3: { lop10: 0, lop11: 0, lop12: 0 }
  })

  const handleHbChange = (subject, lop, value) => {
    setHbScores(prev => ({
      ...prev,
      [subject]: { ...prev[subject], [lop]: parseFloat(value) || 0 }
    }))
  }

  const [dgnlTV, setDgnlTV] = useState(0)
  const [dgnlTA, setDgnlTA] = useState(0)
  const [dgnlToan, setDgnlToan] = useState(0)
  const [dgnlTuyKhoaHoc, setDgnlTuyKhoaHoc] = useState(0)

  const [priorityArea, setPriorityArea] = useState('KV3')
  const [priorityPerson, setPriorityPerson] = useState('')

  let pt1score = (tn1 * 2 + tn2 + tn3) * 3 / 4

  let tbHbMon1 = (hbScores.mon1.lop10 + hbScores.mon1.lop11 + hbScores.mon1.lop12) / 3
  let tbHbMon2 = (hbScores.mon2.lop10 + hbScores.mon2.lop11 + hbScores.mon2.lop12) / 3
  let tbHbMon3 = (hbScores.mon3.lop10 + hbScores.mon3.lop11 + hbScores.mon3.lop12) / 3

  let pt2score = (tn1 * 2 + tn2 + tn3) * 3 / 4 * weightPT2 
  + (tbHbMon1*2 + tbHbMon2 + tbHbMon3) * 3 / 4 * (1 - weightPT2)

  let pt3score = (tn1 * 2 + tn2 + tn3) * 3 / 4 * weightPT3 + (dgnlTV + dgnlTA + dgnlToan + dgnlTuyKhoaHoc) / 40 * (1 - weightPT3)

  // Fine largest number among pt1score, pt2score, pt3score
  let hocluc = Math.max(pt1score, pt2score, pt3score)

  let priorityScoreParam = 0
  let priorityAreaScore = 0
  let priorityPersonScore = 0
  let priorityScore = 0

  switch (priorityArea) {
    case 'KV1':
      priorityAreaScore = 0.75
      break
    case 'KV2':
      priorityAreaScore = 0.25
      break
    case 'KV2-NT':
      priorityAreaScore = 0.5
      break
    case 'KV3':
      priorityAreaScore = 0
      break
  }
  switch (priorityPerson) {
    case 'UT1':
      priorityPersonScore = 2
      break
    case 'UT2':
      priorityPersonScore = 1
      break
    default:
      priorityPersonScore = 0
  }
  priorityScoreParam = priorityAreaScore + priorityPersonScore
  if (tn1 + tn2 + tn3 >= 22.5) {
    priorityScore = (30 - hocluc) / 7.5 * priorityScoreParam
  }
  else {
    priorityScore = priorityScoreParam
  }

  let finalScore = hocluc + priorityScore

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900">Tính Điểm HCMUTE 2026</h1>
            <p className="text-gray-600 mt-2">Công cụ tính điểm xét tuyển đại học HCMUTE</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Trọng Số Section */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Trọng Số</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Phương Thức 2 (TN THPT + Học Bạ)</label>
                    <div>
                      <div className="flex justify-between items-center gap-4 mb-2">
                        <h1 className="font-medium text-gray-700">THPT</h1>
                        <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{weightPT2.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={weightPT2}
                        onChange={(e) => setWeightPT2(parseFloat(e.target.value))}
                        className="range-slider w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center gap-4 mb-2">
                        <h1 className="font-medium text-gray-700">Học bạ</h1>
                        <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{(1 - weightPT2).toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={1 - weightPT2}
                        onChange={(e) => setWeightPT2(parseFloat(e.target.value))}
                        className="range-slider w-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Phương Thức 3 (TN THPT + ĐGNL)</label>
                    <div>
                      <div className="flex justify-between items-center gap-4 mb-2">
                        <h1 className="font-medium text-gray-700">THPT</h1>
                        <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{weightPT3.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={weightPT3}
                        onChange={(e) => setWeightPT3(parseFloat(e.target.value))}
                        className="range-slider w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center gap-4 mb-2">
                        <h1 className="font-medium text-gray-700">ĐGNL</h1>
                        <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{(1 - weightPT3).toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={1 - weightPT3}
                        onChange={(e) => setWeightPT3(parseFloat(e.target.value))}
                        className="range-slider w-full"
                      />
                    </div>
                  </div>
                  {/* <div className="space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Phương Thức 3 (TN THPT + ĐGNL)</label>
                      <span className="text-lg font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{weightPT3.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={weightPT3}
                      onChange={(e) => setWeightPT3(parseFloat(e.target.value))}
                      className="range-slider w-full"
                    />
                  </div> */}
                </div>
              </div>

              {/* Điểm Tốt Nghiệp */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Điểm Tốt Nghiệp</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Môn 1 <span className="text-blue-500">(x2)</span></label>
                    <input
                      type="number"
                      placeholder="0.0"
                      step="0.1"
                      max="10"
                      onChange={(e) => setTn1(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Môn 2</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      step="0.1"
                      max="10"
                      onChange={(e) => setTn2(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Môn 3</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      step="0.1"
                      max="10"
                      onChange={(e) => setTn3(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Điểm Học Bạ */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Điểm Học Bạ</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Môn</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lớp 10</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lớp 11</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lớp 12</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">Môn 1</td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon1', 'lop10', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon1', 'lop11', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon1', 'lop12', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">Môn 2</td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon2', 'lop10', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon2', 'lop11', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon2', 'lop12', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">Môn 3</td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon3', 'lop10', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon3', 'lop11', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                        <td className="px-4 py-3"><input type="number" placeholder="0.0" step="0.1" max="10" onChange={(e) => handleHbChange('mon3', 'lop12', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Điểm ĐGNL */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Điểm ĐGNL</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tiếng Việt</label>
                    <input type="number" placeholder="0" step="0.1" max="40" onChange={(e) => setDgnlTV(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tiếng Anh</label>
                    <input type="number" placeholder="0" step="0.1" max="40" onChange={(e) => setDgnlTA(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Toán</label>
                    <input type="number" placeholder="0" step="0.1" max="40" onChange={(e) => setDgnlToan(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tư Duy Khoa Học</label>
                    <input type="number" placeholder="0" step="0.1" max="40" onChange={(e) => setDgnlTuyKhoaHoc(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                </div>
              </div>

              {/* Điểm Ưu Tiên */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Điểm ưu tiên</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Khu Vực Ưu Tiên</label>
                    <select value={priorityArea} onChange={(e) => setPriorityArea(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                      <option value="KV1">Khu Vực 1</option>
                      <option value="KV2">Khu Vực 2</option>
                      <option value="KV2-NT">Khu Vực 2 - NT</option>
                      <option value="KV3">Khu Vực 3</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Đối Tượng Ưu Tiên</label>
                    <select value={priorityPerson} onChange={(e) => setPriorityPerson(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                      <option value="">Không</option>
                      <option value="UT1">UT1</option>
                      <option value="UT2">UT2</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-white sticky top-8">
                <div className="bg-opacity-30 rounded-lg mb-4">
                  <p className="text-yellow-100 text-sm mb-2">Điểm Xét Tuyển</p>
                  <p className="text-4xl font-bold text-yellow-100">{finalScore.toFixed(2)} <span className="text-xl">/ 30</span></p>
                </div>
                <div className="space-y-6">
                  <div className="pb-6 border-b border-blue-400">
                    <p className="text-blue-200 text-sm mb-1">Phương Thức 1</p>
                    <p className="text-2xl font-bold">{pt1score.toFixed(2)}</p>
                    <p className="text-xs text-blue-200 mt-1">TN THPT</p>
                  </div>

                  <div className="pb-6 border-b border-blue-400">
                    <p className="text-blue-200 text-sm mb-1">Phương Thức 2</p>
                    <p className="text-2xl font-bold">{pt2score.toFixed(2)}</p>
                    <p className="text-xs text-blue-200 mt-1">TN THPT + Học Bạ</p>
                  </div>

                  <div className="pb-6 border-b border-blue-400">
                    <p className="text-blue-200 text-sm mb-1">Phương Thức 3</p>
                    <p className="text-2xl font-bold">{pt3score.toFixed(2)}</p>
                    <p className="text-xs text-blue-200 mt-1">TN THPT + ĐGNL</p>
                  </div>

                  <div className="pb-6 border-b border-blue-400">
                    <p className="text-blue-200 text-sm mb-1">Điểm Học Lực (Cao Nhất trong 3 phương thức)</p>
                    <p className="text-2xl font-bold">{hocluc.toFixed(2)}</p>
                  </div>

                  <div className="">
                    <p className="text-blue-200 text-sm mb-2">Điểm Ưu Tiên</p>
                    <p className="text-2xl font-bold">{priorityScore.toFixed(2)}</p>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
