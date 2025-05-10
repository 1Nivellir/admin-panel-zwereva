import '@tanstack/vue-table' //or vue, svelte, solid, qwik, etc.
import type { RowData } from '@tanstack/vue-table'
declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    editable: boolean
  }
}