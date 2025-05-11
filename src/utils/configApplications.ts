import { createColumnHelper } from '@tanstack/vue-table'
import { NameHeader } from '@/utils/const/nameHeader'
export interface Applications {
  id?: number
  processed: boolean
  description: string
  name: string
  lastName: string
  mobileNumber: string
  email: string
  createdAt?: Date | string
  deleted: boolean
}

const columnHelper = createColumnHelper<Applications>()

export const columnVisibility = {
  id: false,
  processed: false, 
  description: true,
  name: true,
  lastName: false,
  mobileNumber: false,
  email: false,
  createdAt: false,
  deleted: false,
}

export const configFofTable = [
  columnHelper.accessor('id', {
    header: () => NameHeader.id,
    cell: (info) =>  info.getValue(),
		size: 210,
    meta: {
      editable: false,
    },
  }),
  columnHelper.accessor('processed', {
    header: () => NameHeader.processed,
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('description', {
    header: () => NameHeader.description,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('name', {
    header: () => NameHeader.name,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('lastName', {
    header: () => NameHeader.lastName,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('mobileNumber', {
    header: () => NameHeader.mobileNumber,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('email', {
    header: () => NameHeader.email,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('email', {
    header: () => NameHeader.email,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
  columnHelper.accessor('createdAt', {
    header: () => NameHeader.createdAt,
		size: 300,
    cell: (info) => info.getValue()?.toLocaleString(), 
    meta: {
      editable: false,
    },
  }),
	columnHelper.accessor('deleted', {
    header: () => NameHeader.deleted,
		size: 300,
    cell: (info) => info.getValue(), 
    meta: {
      editable: false,
    },
  }),
  columnHelper.display({
    id: 'actions',
		size: 300,
    cell: ({ row }) => row.original, 
    meta: {
      editable: false,
    },
  }),
]