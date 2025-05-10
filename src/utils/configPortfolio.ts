import { createColumnHelper } from '@tanstack/vue-table'

export interface IPortfolio {
  id: number
  name: string
  description: string
  show: boolean
  imageId: string
  createdAt?: Date | string
}

const columnHelper = createColumnHelper<IPortfolio>()

export const configFofTable = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
		size: 210,
    meta: {
      editable: false,
    },
  }),
  columnHelper.accessor('name', {
    header: () => 'Название',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('description', {
    header: () => 'Описание',
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('show', {
    header: () => 'Видимость',
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('imageId', {
    header: () => 'Изображение',
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('createdAt', {
    header: () => 'Дата',
		size: 300,
    cell: (info) => info.getValue()?.toLocaleString() ?? '',
    meta: {
      editable: false,
    },
  }),
  columnHelper.display({
    id: 'actions',
		size: 100,
    
    
    cell: ({ row }) => row.original,
  }),
]