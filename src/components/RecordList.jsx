import classNames from 'classnames'
import { Text } from '@radix-ui/themes'
import { useRef, useState } from 'react'

const Record = ({ record, item, onUpdate }) => {
  const [isPressed, setIsPressed] = useState(false)
  const progressRef = useRef(0)

  const timerRef = useRef(null)

  const handleMouseDown = () => {
    setIsPressed(true)
    timerRef.current = setInterval(() => {
      progressRef.current += 10
      if (progressRef.current >= 100) {
        onUpdate()
        handleFinish()
      }
    }, 100)
  }

  const handleFinish = () => {
    clearInterval(timerRef.current)
    setIsPressed(false)
    progressRef.current = 0
  }

  return (
    <div
      className={classNames(
        'flex items-center w-72 mt-2 px py-1 animate__animated',
        isPressed && 'animate__headShake bg-gray-1 rounded-lg'
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleFinish}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleFinish}
    >
      <Text className="w-28">{record.date}</Text>
      <i className={classNames('text-xl mr-1', item.icon, `c-${item.color}`)} />
      <Text weight="bold">{item.name}</Text>
      <Text className="ml-auto">+{record.value}</Text>
    </div>
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
