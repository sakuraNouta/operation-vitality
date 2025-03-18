import { useEffect, useState, Suspense, useRef } from 'react'
import * as api from './services'
import { Progress, Spinner, Separator, Heading } from '@radix-ui/themes'
import ItemList from './components/ItemList'
import { RecordList } from './components/RecordList'

export default function App() {
  const [data, setData] = useState({})

  const isMountedRef = useRef(false)

  const score = data.items?.reduce((acc, item) => acc + item.value * item.count, 0) ?? 0

  const updateItems = async item => {
    const today = new Date().toISOString().slice(0, 10)

    const existRecord = data.records.find(
      record => record.item_id === item.id && record.date === today
    )

    const updatedRecords = existRecord
      ? data.records.map(record =>
          record.item_id === existRecord.item_id && record.date === existRecord.date
            ? { ...record, value: record.value + 1 }
            : record
        )
      : [{ date: today, item_id: item.id, value: 1 }, ...data.records]

    const updatedData = {
      items: data.items.map(it => (it.id === item.id ? { ...item } : it)),
      records: updatedRecords,
    }
    const _data = await api.updateGist(updatedData)
    setData(_data)
  }

  const deleteRecord = async record => {
    const updatedData = {
      items: data.items.map(item =>
        item.id === record.item_id ? { ...item, count: item.count - record.value } : item
      ),
      records: data.records.filter(it => it.item_id !== record.item_id || it.date !== record.date),
    }
    const _data = await api.updateGist(updatedData)
    setData(_data)
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      api.getGist().then(_data => {
        isMountedRef.current = false
        setData(_data)
      })
    }
  }, [])

  return (
    <main className="w-screen relative flex min-h-screen flex-col items-center">
      {/* total score */}
      <div className="py-4">
        <div className="flex items-center justify-center my-2">
          <div className="text-6 i-simple-icons-happycow c-gray-500 mx-3" />
          <Heading size="4">牛牛积分: {score}</Heading>
        </div>
        <div className="flex px-1">
          {Array.from({ length: 10 }, (_, i) =>
            Math.min(100, Math.max(0, score - i * 10) * 10)
          ).map((s, i) => (
            <Progress className="w-8 mt-2 ml-1" key={i} value={s} variant="soft" radius="small" />
          ))}
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <ItemList items={data.items} onUpdate={updateItems} />
      </Suspense>
      <Separator className="w-72! mt-xl mb-xs" />
      <Suspense fallback={<Spinner />}>
        <RecordList data={data} onUpdate={deleteRecord} />
      </Suspense>
    </main>
  )
}
