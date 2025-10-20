import { Skeleton } from "@/components/Skeleton";

interface GridSkeletonsProps {
  numItems?: number;
}

export const GridSkeletons = ({ numItems = 15 }: GridSkeletonsProps) => (
  <section className="o-grid o-grid--products">
    {Array.from({ length: numItems }).map((_, i) => (
      <article key={`skeleton-${i}`} className="o-card">
        <Skeleton className="u-aspect-square u-w-full" />
        <div className="o-card__body">
          <div>
            <Skeleton className="c-product-card__brand c-skeleton__item" />
            <Skeleton className="c-product-card__name c-skeleton__item" />
          </div>
          <div>
            <Skeleton className="c-product-card__price c-skeleton__item" />
          </div>
        </div>
      </article>
    ))}
  </section>
);
