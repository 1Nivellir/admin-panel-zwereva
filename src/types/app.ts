import '@tanstack/vue-table' //or vue, svelte, solid, qwik, etc.
import type { RowData } from '@tanstack/vue-table'
declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    editable: boolean
  }
}

export interface ICompany {
  name: string
  description: string
  contacts: IContacts
}

export interface IContacts {
  address: string
  mobilePhone: string
  links?: ILinks
}

export interface ILinks {
  TELEGRAM?: ISocial[]
  WHATSAPP?: ISocial[]
}

export interface ISocial {
  link: string
}