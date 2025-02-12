import { IconButton } from '@radix-ui/themes'
import classNames from 'classnames'
import { useTransition, useRef, useState } from 'react'

export default function AddButton({ onUpdate, color }) {
  const [isPending, startTransition] = useTransition()
  const [isPressed, setIsPressed] = useState(false)
  const progressRef = useRef(0)

  const timerRef = useRef(null)

  const handleUpdate = () => {
    startTransition(async () => {
      await onUpdate()
    })
  }

  const handleMouseDown = () => {
    setIsPressed(true)
    timerRef.current = setInterval(() => {
      progressRef.current += 10
      console.log('progress: ', progressRef.current)
      if (progressRef.current >= 100) {
        handleUpdate()
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
    <IconButton
      className={classNames(
        'ml-2! active:outline-0 animate__animated animate__slow',
        isPressed && 'animate__tada'
      )}
      radius="full"
      variant="soft"
      size="3"
      color={color}
      loading={isPending}
      onMouseDown={handleMouseDown}
      onMouseUp={handleFinish}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleFinish}
    >
      <i className="i-mdi-paw text-xl" />
    </IconButton>
  )
}
