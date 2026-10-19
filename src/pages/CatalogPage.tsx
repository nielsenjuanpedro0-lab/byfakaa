import { LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { CatalogGate, GridSkeleton } from '../features/products/components/CatalogGate'
import { FilterPanel } from '../features/products/components/FilterPanel'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { ProductGrid, ProductRows } from '../features/products/components/ProductList'
import {
  applyQuery,
  facetKeys,
  facetTitle,
  facetValueLabel,
  param,
  readQuery,
  sortLabel,
  type CatalogQuery,
  type SortKey,
} from '../features/products/filters'
import type { Catalog } from '../features/products/types'
import { useCatalog } from '../features/products/useCatalog'
import { useTitle } from '../lib/useTitle'

export function CatalogPage() {
  useTitle('Catálogo')
  const { state, retry } = useCatalog()

  return (
    <div className="page catalog">
      <CatalogGate state={state} retry={retry} loading={<><h1 className="catalog__title">Catálogo</h1><GridSkeleton /></>}>
        {(catalog) => <CatalogView catalog={catalog} />}
      </CatalogGate>
    </div>
  )
}

function CatalogView({ catalog }: { catalog: Catalog }) {
  const [params, setParams] = useSearchParams()
  const query = readQuery(params)
  const results = applyQuery(catalog.products, query)
  const listView = params.get(param.view) === 'lista'
  const searchRef = useRef<HTMLInputElement>(null)
  const sheetRef = useRef<HTMLDialogElement>(null)
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#buscar') searchRef.current?.focus()
  }, [hash])

  // Filters push history entries (Back undoes them) and animate the grid re-flow.
  // Typing replaces the current entry and doesn't animate, so each keystroke stays instant.
  const setParam = (name: string, value: string | null, { replace = false, animate = true } = {}) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(name, value)
        else next.delete(name)
        return next
      },
      // Inside the open mobile sheet the grid is hidden behind it, so there is nothing to animate.
      { replace, preventScrollReset: true, viewTransition: animate && !sheetRef.current?.open },
    )
  }

  const activeCount = Object.keys(query.facets).length + Number(query.onlyAvailable)

  if (catalog.products.length === 0) {
    return (
      <>
        <h1 className="catalog__title">Catálogo</h1>
        <div className="notice">
          <h2>Todavía no hay productos publicados</h2>
          <p>Escribinos y te contamos qué hay disponible en el local.</p>
          <InquiryActions />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="catalog__head">
        <h1 className="catalog__title">Catálogo</h1>
        <p className="catalog__count" aria-live="polite">
          {results.length === 1 ? '1 producto' : `${results.length} productos`}
        </p>
      </div>

      <div className="catalog__toolbar">
        <div className="catalog__search">
          <label htmlFor="buscar" className="visually-hidden">Buscar en el catálogo</label>
          <Search aria-hidden size={18} />
          <input
            ref={searchRef}
            id="buscar"
            type="search"
            placeholder="Modelo, capacidad, color…"
            value={query.q}
            onChange={(e) => setParam(param.q, e.target.value, { replace: true, animate: false })}
            autoComplete="off"
          />
        </div>
        <button type="button" className="button button--quiet catalog__filter-button" onClick={() => sheetRef.current?.showModal()}>
          <SlidersHorizontal aria-hidden size={18} />
          Filtrar{activeCount > 0 && ` (${activeCount})`}
        </button>
        <label className="catalog__sort">
          <span className="visually-hidden">Ordenar por</span>
          <select value={query.sort} onChange={(e) => setParam(param.sort, e.target.value === 'relevance' ? null : e.target.value)}>
            {(Object.keys(sortLabel) as SortKey[]).map((key) => (
              <option key={key} value={key}>{sortLabel[key]}</option>
            ))}
          </select>
        </label>
        <div className="catalog__view" role="group" aria-label="Vista">
          <button type="button" aria-pressed={!listView} aria-label="Grilla" onClick={() => setParam(param.view, null, { replace: true })}>
            <LayoutGrid aria-hidden size={18} />
          </button>
          <button type="button" aria-pressed={listView} aria-label="Lista" onClick={() => setParam(param.view, 'lista', { replace: true })}>
            <List aria-hidden size={18} />
          </button>
        </div>
      </div>

      <ActiveFilters query={query} setParam={setParam} clear={() => setParams(listView ? { [param.view]: 'lista' } : {}, { viewTransition: true })} />

      <div className="catalog__body">
        <aside className="catalog__aside" aria-label="Filtros">
          <FilterPanel products={catalog.products} query={query} setParam={setParam} idPrefix="side" />
        </aside>

        <section aria-label="Resultados" className="catalog__results">
          {results.length === 0 ? (
            <div className="notice notice--inline">
              <h2>Ningún producto coincide con la búsqueda</h2>
              <p>Probá con otras palabras o quitá algún filtro. Si buscás algo puntual, consultanos.</p>
              <button type="button" className="button button--outline" onClick={() => setParams({}, { viewTransition: true })}>Quitar filtros</button>
            </div>
          ) : listView ? (
            <ProductRows products={results} />
          ) : (
            <ProductGrid products={results} priorityCount={4} />
          )}
        </section>
      </div>

      <dialog ref={sheetRef} className="filter-sheet" aria-labelledby="sheet-title" onClick={(e) => e.target === e.currentTarget && sheetRef.current?.close()}>
        <div className="filter-sheet__inner">
          <div className="filter-sheet__head">
            <h2 id="sheet-title">Filtrar</h2>
            <button type="button" className="icon-button" aria-label="Cerrar filtros" onClick={() => sheetRef.current?.close()}>
              <X aria-hidden size={22} />
            </button>
          </div>
          <FilterPanel products={catalog.products} query={query} setParam={setParam} idPrefix="sheet" />
          <button type="button" className="button filter-sheet__done" onClick={() => sheetRef.current?.close()}>
            Ver {results.length === 1 ? '1 producto' : `${results.length} productos`}
          </button>
        </div>
      </dialog>
    </>
  )
}

function ActiveFilters({ query, setParam, clear }: { query: CatalogQuery; setParam: (name: string, value: null) => void; clear: () => void }) {
  const chips: { name: string; label: string }[] = facetKeys.flatMap((key) => {
    const value = query.facets[key]
    return value ? [{ name: param[key], label: `${facetTitle[key]}: ${facetValueLabel(key, value)}` }] : []
  })
  if (query.onlyAvailable) chips.push({ name: param.available, label: 'Solo con stock' })
  if (chips.length === 0) return null

  return (
    <ul className="active-filters" aria-label="Filtros activos">
      {chips.map((chip) => (
        <li key={chip.name}>
          <button type="button" onClick={() => setParam(chip.name, null)} aria-label={`Quitar filtro ${chip.label}`}>
            {chip.label}
            <X aria-hidden size={14} />
          </button>
        </li>
      ))}
      {chips.length > 1 && (
        <li>
          <button type="button" className="active-filters__clear" onClick={clear}>Limpiar todo</button>
        </li>
      )}
    </ul>
  )
}
