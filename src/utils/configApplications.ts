import { createColumnHelper } from '@tanstack/vue-table'
import { TitleNames } from '@/utils/const/nameHeader'
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

export const keyOrder: (keyof Applications)[] = ['id', 'processed', 'description', 'name', 'lastName', 'mobileNumber', 'email', 'createdAt']
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
    header: () => TitleNames.id,
    cell: (info) =>  info.getValue(),
		size: 210,
    meta: {
      editable: false,
    },
  }),
  columnHelper.accessor('processed', {
    header: () => TitleNames.processed,
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('description', {
    header: () => TitleNames.description,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('name', {
    header: () => TitleNames.name,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('lastName', {
    header: () => TitleNames.lastName,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('mobileNumber', {
    header: () => TitleNames.mobileNumber,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('email', {
    header: () => TitleNames.email,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
  columnHelper.accessor('createdAt', {
    header: () => TitleNames.createdAt,
		size: 300,
    cell: (info) => info.getValue()?.toLocaleString(), 
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