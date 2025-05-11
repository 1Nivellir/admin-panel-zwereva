import { createColumnHelper } from '@tanstack/vue-table'
import { NameHeader } from '@/utils/const/nameHeader' 
export interface IPortfolio {
  id: number
  name: string
  description: string
  show: boolean
  imageId: string
  createdAt?: Date | string
}

const columnHelper = createColumnHelper<IPortfolio>()

export const columnsVisible = {
  id: false,
  name: true,
  description: true,
  show: false,
  imageId: false,
  createdAt: false,
}

export const configFofTable = [
  columnHelper.accessor('id', {
    header: () => NameHeader.id,
    cell: (info) => info.getValue(),
		size: 210,
    meta: {
      editable: false,
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
	columnHelper.accessor('description', {
    header: () => NameHeader.description,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('show', {
    header: () => NameHeader.show,
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('imageId', {
    header: () => NameHeader.imageId,
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('createdAt', {
    header: () => NameHeader.createdAt,
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