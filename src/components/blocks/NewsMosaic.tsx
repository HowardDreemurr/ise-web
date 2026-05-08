import { NewsCard } from "./NewsCard"
import type { NewsItem } from "@/lib/content"

type NewsMosaicProps = {
  items: NewsItem[]
}

/**
 * Cybergis-style mosaic: 1 large featured card on the left + a stack of 3
 * smaller cards on the right. The right column matches the height of the
 * featured card via grid stretch + min-height.
 */
export function NewsMosaic({ items }: NewsMosaicProps) {
  if (items.length === 0) return null

  const [featured, ...rest] = items
  const side = rest.slice(0, 3)

  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[1.55fr_1fr] lg:gap-6">
      <NewsCard item={featured} size="lg" />
      {side.length > 0 && (
        <div className="grid h-full min-h-[460px] grid-rows-3 gap-4">
          {side.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              size="sm"
              className="h-full min-h-0"
            />
          ))}
        </div>
      )}
    </div>
  )
}
