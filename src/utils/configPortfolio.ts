import { createColumnHelper } from '@tanstack/vue-table'
import { TitleNames } from '@/utils/const/nameHeader' 
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
    header: () => TitleNames.id,
    cell: (info) => info.getValue(),
		size: 210,
    meta: {
      editable: false,
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
	columnHelper.accessor('description', {
    header: () => TitleNames.description,
		size: 300,
    cell: (info) => info.getValue(),
    meta: {
      editable: true,
    },
  }),
	columnHelper.accessor('show', {
    header: () => TitleNames.show,
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('imageId', {
    header: () => TitleNames.imageId,
		size: 300,
    cell: (info) => info.getValue(),
  }),
	columnHelper.accessor('createdAt', {
    header: () => TitleNames.createdAt,
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