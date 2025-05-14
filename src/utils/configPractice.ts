import { createColumnHelper } from '@tanstack/vue-table'
import { TitleNames } from '@/utils/const/nameHeader'
export interface IPractice {
  id: number
  name: string
  description: string
  show: boolean
  createdAt?: Date | string
}

const columnHelper = createColumnHelper<IPractice>()

export const keyOrder: (keyof IPractice)[] = ['id', 'name', 'description', 'createdAt']
export const columnsVisible = {
  id: false,
  name: true,
  description: true,
  show: false,
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
