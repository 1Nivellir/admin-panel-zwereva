import { createColumnHelper } from '@tanstack/vue-table'

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
	columnHelper.accessor('jobTitle', {
		header: () => 'Должность',
		size: 300,
		cell: (info) => info.getValue(),
		meta: {
			editable: true,
		},
	}),
	columnHelper.accessor('imageId', {
		header: () => 'Фото',
		size: 300,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('active', {
		header: () => 'Работает',
		size: 300,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('deleted', {
		header: () => 'Уволен',
		size: 300,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('createdAt', {
		header: () => 'Дата создания',
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