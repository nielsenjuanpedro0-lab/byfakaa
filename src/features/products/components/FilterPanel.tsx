import { facetKeys, facetOptions, facetParamValue, facetTitle, facetValueLabel, param, type CatalogQuery, type FacetKey } from '../filters'
import type { Product } from '../types'

interface Props {
  products: Product[]
  query: CatalogQuery
  setParam: (name: string, value: string | null) => void
  /** Distinguishes input ids when the panel is rendered twice (sidebar and mobile sheet). */
  idPrefix: string
}

/** Facets come from the loaded products; a facet with fewer than two values is not worth showing. */
export function FilterPanel({ products, query, setParam, idPrefix }: Props) {
  const facets = facetKeys
    .map((key) => ({ key, options: facetOptions(products, key) }))
    .filter((facet) => facet.options.length > 1)
  const hasSoldOut = products.some((p) => p.availability === 'out_of_stock')

  return (
    <div className="filters">
      {hasSoldOut && (
        <label className="filters__toggle">
          <input
            type="checkbox"
            checked={query.onlyAvailable}
            onChange={(e) => setParam(param.available, e.target.checked ? '1' : null)}
          />
          Solo con stock
        </label>
      )}
      {facets.map(({ key, options }) => (
        <fieldset key={key} className="filters__group">
          <legend>{facetTitle[key]}</legend>
          <FacetOption idPrefix={idPrefix} facet={key} value={null} label="Todos" checked={!query.facets[key]} setParam={setParam} />
          {options.map((option) => (
            <FacetOption
              key={option.value}
              idPrefix={idPrefix}
              facet={key}
              value={option.value}
              label={facetValueLabel(key, option.value)}
              count={option.count}
              checked={query.facets[key] === option.value}
              setParam={setParam}
            />
          ))}
        </fieldset>
      ))}
    </div>
  )
}

interface OptionProps {
  idPrefix: string
  facet: FacetKey
  value: string | null
  label: string
  count?: number
  checked: boolean
  setParam: Props['setParam']
}

function FacetOption({ idPrefix, facet, value, label, count, checked, setParam }: OptionProps) {
  const id = `${idPrefix}-${facet}-${value ?? 'all'}`
  return (
    <div className="filters__option">
      <input
        type="radio"
        id={id}
        name={`${idPrefix}-${facet}`}
        checked={checked}
        onChange={() => setParam(param[facet], value === null ? null : facetParamValue(facet, value))}
      />
      <label htmlFor={id}>
        {label}
        {count !== undefined && <span className="filters__count">{count}</span>}
      </label>
    </div>
  )
}
