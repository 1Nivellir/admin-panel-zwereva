import type { TableFeature, } from '@tanstack/vue-table'

interface EditableTableState {
  editable: boolean
}

export const DensityFeature: TableFeature<any> = { //Use the TableFeature type!!
  // define the new feature's initial state
  getInitialState: (state): EditableTableState => {
    return {
      density: 'md',
      ...state,
    }
  },

  // define the new feature's default options
  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): EditableTableState => {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater('density', table),
    } as EditableTableState
  },
  // if you need to add a default column definition...
  // getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
  //   return { meta: {} } //use meta instead of directly adding to the columnDef to avoid typescript stuff that's hard to workaround
  // },

  // define the new feature's table instance methods
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setDensity = updater => {
      const safeUpdater: Updater<EditableTableState> = old => {
        let newState = functionalUpdate(updater, old)
        return newState
      }
      return table.options.onDensityChange?.(safeUpdater)
    }
    table.toggleDensity = value => {
      table.setDensity(old => {
        if (value) return value
        return old === 'lg' ? 'md' : old === 'md' ? 'sm' : 'lg' //cycle through the 3 options
      })
    }
  },

  // if you need to add row instance APIs...
  // createRow: <TData extends RowData>(row, table): void => {},
  // if you need to add cell instance APIs...
  // createCell: <TData extends RowData>(cell, column, row, table): void => {},
  // if you need to add column instance APIs...
  // createColumn: <TData extends RowData>(column, table): void => {},
  // if you need to add header instance APIs...
  // createHeader: <TData extends RowData>(header, table): void => {},
}