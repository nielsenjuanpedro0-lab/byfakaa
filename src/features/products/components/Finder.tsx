import { ChevronRight } from 'lucide-react'
import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router'
import { conditionSlug, facetOptions, param } from '../filters'
import { conditionLabel, formatPrice, variantSummary } from '../format'
import type { Condition, Product } from '../types'

const PREVIEW = 3
const STEP = 50

interface Props {
  products: Product[]
}

/**
 * Three questions, live answer: state, capacity and budget narrow the stock as you tap.
 * Budget only applies to dollar prices, since pesos and dollars can't be compared.
 */
export function Finder({ products }: Props) {
  const [condition, setCondition] = useState<Condition | null>(null)
  const [storage, setStorage] = useState<string | null>(null)
  const usdAmounts = products.flatMap((p) => (p.price?.currency === 'USD' ? [p.price.amount] : []))
  const maxBudget = usdAmounts.length > 1 ? Math.ceil(Math.max(...usdAmounts) / STEP) * STEP : 0
  const minBudget = usdAmounts.length > 1 ? Math.floor(Math.min(...usdAmounts) / STEP) * STEP : 0
  const [budget, setBudget] = useState(maxBudget)
  const limited = maxBudget > 0 && budget < maxBudget
  const sliderId = useId()

  const conditions = facetOptions(products, 'condition').map((o) => o.value as Condition)
  const storages = facetOptions(products, 'storage').map((o) => o.value)

  const matches = products
    .filter((p) => !condition || p.condition === condition)
    .filter((p) => !storage || p.storage === storage)
    .filter((p) => !limited || (p.price?.currency === 'USD' && p.price.amount <= budget))
    // dollar prices first, highest first: what fits the budget best leads
    .sort((a, b) => Number(b.price?.currency === 'USD') - Number(a.price?.currency === 'USD') || (b.price?.amount ?? 0) - (a.price?.amount ?? 0))

  const catalogLink = `/catalogo?${new URLSearchParams({
    [param.available]: '1',
    ...(condition && { [param.condition]: conditionSlug[condition] }),
    ...(storage && { [param.storage]: storage }),
  })}`

  return (
    <div className="finder">
      <div className="finder__questions">
        {conditions.length > 1 && (
          <Question label="Estado">
            <Choice active={!condition} onClick={() => setCondition(null)}>Todos</Choice>
            {conditions.map((c) => (
              <Choice key={c} active={condition === c} onClick={() => setCondition(c)}>
                {conditionLabel[c]}
              </Choice>
            ))}
          </Question>
        )}

        {storages.length > 1 && (
          <Question label="Capacidad">
            <Choice active={!storage} onClick={() => setStorage(null)}>Todos</Choice>
            {storages.map((s) => (
              <Choice key={s} active={storage === s} onClick={() => setStorage(s)}>
                {s}
              </Choice>
            ))}
          </Question>
        )}

        {maxBudget > minBudget && (
          <div className="finder__q">
            <label className="finder__label" htmlFor={sliderId}>
              Presupuesto
            </label>
            <p className="finder__budget" aria-live="polite">
              {limited ? `Hasta ${formatPrice({ amount: budget, currency: 'USD' })}` : 'Sin límite'}
            </p>
            <input
              id={sliderId}
              className="finder__range"
              type="range"
              min={minBudget}
              max={maxBudget}
              step={STEP}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ '--fill': `${((budget - minBudget) / (maxBudget - minBudget)) * 100}%` } as CSSProperties}
            />
            {limited && <p className="finder__note">Solo equipos con precio en dólares.</p>}
          </div>
        )}
      </div>

      <div className="finder__answer" aria-live="polite">
        <p className="finder__count">
          <span>{matches.length}</span> {matches.length === 1 ? 'resultado' : 'resultados'}
        </p>
        {matches.length === 0 ? (
          <p className="finder__empty">No hay equipos con esa combinación. Probá con otro filtro o escribinos.</p>
        ) : (
          <ul className="finder__list">
            {matches.slice(0, PREVIEW).map((p) => (
              <li key={p.id}>
                <Link to={`/producto/${encodeURIComponent(p.id)}`} viewTransition>
                  <span className="finder__name">{p.name}</span>
                  <span className="finder__meta">
                    {[variantSummary(p), p.condition && conditionLabel[p.condition]].filter(Boolean).join(' · ')}
                  </span>
                  <span className="finder__price">{p.price ? formatPrice(p.price) : 'Consultar'}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {matches.length > PREVIEW && (
          <Link className="text-link" to={catalogLink} viewTransition>
            Ver todos en el catálogo
            <ChevronRight aria-hidden size={18} />
          </Link>
        )}
      </div>
    </div>
  )
}

function Question({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="finder__q">
      <legend className="finder__label">{label}</legend>
      <div className="finder__choices">{children}</div>
    </fieldset>
  )
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className="finder__choice" aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  )
}
