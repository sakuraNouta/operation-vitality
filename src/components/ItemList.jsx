import { Card, Text } from '@radix-ui/themes'
import AddButton from './AddButton'
import classNames from 'classnames'

export default async function ItemList({ items = [], onUpdate }) {
  return (
    <div className="space-y-2">
      {items.map(item => (
        <Card
          className={classNames('!flex items-center w-72 shadow-sm', `shadow-${item.color}`)}
          key={item.id}
          size="2"
        >
          <i className={classNames('text-xl mr-1', item.icon, `c-${item.color}`)} />
          <Text className="flex-1" weight="bold">
            {item.name}
          </Text>
          <div className="flex items-baseline">
            <Text size="4" weight="bold">
              {item.value * item.count}
            </Text>
            <Text size="2" className="px-1">
              分
            </Text>
          </div>
          <AddButton
            color={item.color}
            onUpdate={() => onUpdate({ ...item, count: item.count + 1 })}
          />
        </Card>
      ))}
    </div>
  )
}
