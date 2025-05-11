import { createColumnHelper } from '@tanstack/vue-table'
import { TitleNames } from '@/utils/const/nameHeader'
export interface IEmployee {
  id: number
  name: string
  jobTitle: string
  imageId: string
  active: boolean
  deleted: boolean
  createdAt?: Date | string
}
const columnHelper = createColumnHelper<IEmployee>()

export const columnsVisible = {
  id: false,
  name: true,
	jobTitle: true,
	imageId: false,
  active: false,
  deleted: false,
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
	columnHelper.accessor('jobTitle', {
		header: () => TitleNames.jobTitle,
		size: 300,
		cell: (info) => info.getValue(),
		meta: {
			editable: true,
		},
	}),
	columnHelper.accessor('imageId', {
		header: () => TitleNames.imageId,
		size: 300,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('active', {
		header: () => TitleNames.active,
		size: 300,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('deleted', {
		header: () => TitleNames.deleted,
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
		size: 300,
    cell: ({ row }) => row.original,
  }),
]