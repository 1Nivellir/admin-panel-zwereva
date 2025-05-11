import { createColumnHelper } from '@tanstack/vue-table'
import { NameHeader } from '@/utils/const/nameHeader'
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
	columnHelper.accessor('jobTitle', {
		header: () => NameHeader.jobTitle,
		size: 300,
		cell: (info) => info.getValue(),
		meta: {
			editable: true,
		},
	}),
	columnHelper.accessor('imageId', {
		header: () => NameHeader.imageId,
		size: 300,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('active', {
		header: () => NameHeader.active,
		size: 300,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('deleted', {
		header: () => NameHeader.deleted,
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
		size: 300,
    cell: ({ row }) => row.original,
  }),
]