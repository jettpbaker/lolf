import { cn } from '@/lib/utils'
import styles from './pixel-bounce-loader.module.css'

export default function PixelBounceLoader({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn(styles.root, className)}>
      <span />
      <span />
      <span />
    </div>
  )
}
