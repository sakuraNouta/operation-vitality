import classNames from 'classnames'
import { Spinner, Text } from '@radix-ui/themes'
import { useState } from 'react'

const Record = ({ record, item, onUpdate }) => {
  const screenWidth = window.innerWidth
  const [isPressed, setIsPressed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleStart = () => {
    setIsPressed(true)
  }

  const handleEnd = async e => {
    const clientX = e.clientX || e.changedTouches[0].clientX
    console.log('screenWidth, clientX', screenWidth, clientX)
    setIsPressed(false)
    if (clientX > screenWidth * 0.9) {
      setLoading(true)
      await onUpdate()
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          draggable
          className={classNames(
            'flex items-center w-72 mt-2 px py-1 animate__animated animate__infinite',
            isPressed && 'animate__headShake bg-gray-1 rounded-lg'
          )}
          onDragStart={handleStart}
          onDragEnd={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
        >
          <Text className="w-28">{record.date}</Text>
          <i className={classNames('text-xl mr-1', item.icon, `c-${item.color}`)} />
          <Text weight="bold">{item.name}</Text>
          <Text className="ml-auto">+{record.value * item.value}</Text>
        </div>
      )}
      {isPressed && (
        <div
          className="absolute right-0 h-full w-1/10 bg-gradient-to-r from-white to-red-4"
          style={{
            backgroundImage: 'linear-gradient(to right, white, rgb(248 113 113))',
          }}
        />
      )}
    </>
  )
}

export const RecordList = ({ data, onUpdate }) => {
  return [...(data.records || [])]
    .sort((x, y) => y.date.localeCompare(x.date))
    ?.map(record => {
      const item = data.items.find(it => it.id === record.item_id) || {}
      return (
        <Record
          key={`${record.item_id}_${record.date}`}
          item={item}
          record={record}
          onUpdate={() => onUpdate(record)}
        />
      )
    })
}
