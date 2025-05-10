import { createColumnHelper } from '@tanstack/vue-table'

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


export const configFofTable = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
		size: 210,
    meta: {
      editable: false,
    },
  }),
  columnHelper.accessor('processed', {
    header: () => 'Статус',
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('description', {
    header: () => 'Описание',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('name', {
    header: () => 'Имя',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('lastName', {
    header: () => 'Фамилия',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('mobileNumber', {
    header: () => 'Номер',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('email', {
    header: () => 'Почта',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('email', {
    header: () => 'Почта',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Дата',
		size: 300,
    cell: (info) => info.getValue()?.toLocaleString(), 
    meta: {
      editable: false,
    },
  }),
	columnHelper.accessor('deleted', {
    header: () => 'Удалено',
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