import { cn } from '@/lib/utils'


export type TaskType = {
  number: number;
  prio: boolean;
  className?: string
}

function Task({ number, prio, ...props} : TaskType) {
  return (
    <div className={cn("border p-5 rounded-sm", prio ? "border-red-500" : "border-black", props.className)}>
      {number}
    </div>
  )
}

export default Task