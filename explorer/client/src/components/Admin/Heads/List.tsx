import React from 'react'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import { join } from 'path'
import Table, { ChangePageEvent } from '../../Table'
import { LinkColumn, TextColumn, TimeAgoColumn } from '../../Table/TableCell'
import { Head } from 'explorer/models'

const HEADERS = ['Name', 'URL', 'Created At']
const LOADING_MSG = 'Loading heads...'
const EMPTY_MSG = 'The Explorer has not yet observed any Heads.'

function buildNameCol(head: Head): UrlColumn {
  return {
    type: 'link',
    text: head.name,
    to: join('/', 'admin', 'heads', head.id.toString()),
  }
}

type UrlColumn = LinkColumn | TextColumn

function buildUrlCol(head: Head): UrlColumn {
  if (head.url) {
    return {
      type: 'link',
      text: head.url,
      to: head.url,
    }
  }

  return { type: 'text', text: '-' }
}

function buildCreatedAtCol(head: Head): TimeAgoColumn {
  return {
    type: 'time_ago',
    text: head.createdAt,
  }
}

function rows(
  heads: Head[],
): [UrlColumn, UrlColumn, TimeAgoColumn][] | undefined {
  return heads.map(o => {
    return [buildNameCol(o), buildUrlCol(o), buildCreatedAtCol(o)]
  })
}

interface Props {
  currentPage: number
  onChangePage: (event: ChangePageEvent, page: number) => void
  heads: Head[]
  count?: number
  className?: string
}

const List: React.FC<Props> = ({
  heads,
  count,
  currentPage,
  className,
  onChangePage,
}) => {
  return (
    <Paper className={className}>
      <Hidden xsDown>
        <Table
          headers={HEADERS}
          currentPage={currentPage}
          rows={rows(heads)}
          count={count}
          onChangePage={onChangePage}
          loadingMsg={LOADING_MSG}
          emptyMsg={EMPTY_MSG}
        />
      </Hidden>
    </Paper>
  )
}

export default List
