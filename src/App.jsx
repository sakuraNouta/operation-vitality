import { useEffect, useState, Suspense } from 'react'
import * as api from './services'
import { Text, Progress, Spinner } from '@radix-ui/themes'
import ItemList from './components/ItemList'

export default function App() {
  const [items, setItems] = useState([])

  const score = items?.reduce((acc, item) => acc + item.value * item.count, 0)

  const updateItems = async item => {
    const updatedTodos = items.map(it => (it.id === item.id ? { ...item } : it))
    const _items = await api.updateGist(updatedTodos)
    setItems(_items)
  }

  useEffect(() => {
    api.getGist().then(_items => {
      setItems(_items)
    })
  }, [])

  return (
    <main className="w-screen relative flex min-h-screen flex-col items-center justify-center">
      {/* total score */}
      <div className="py-4 text-center">
        <Text className="my-1" weight="bold">
          总分: {score}
        </Text>
        <div className="flex">
          {Array.from({ length: 10 }, (_, i) =>
            Math.min(100, Math.max(0, score - i * 10) * 10)
          ).map((s, i) => (
            <Progress className="w-8 mt-2 ml-1" key={i} value={s} variant="soft" radius="small" />
          ))}
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <ItemList items={items} onUpdate={updateItems} />
      </Suspense>
      {/* action */}
      {/* <AddButton /> */}
    </main>
  )
}
