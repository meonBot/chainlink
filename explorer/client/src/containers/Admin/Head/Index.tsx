import Grid from '@material-ui/core/Grid'
import Title from '../../../components/Title'
import List from '../../../components/Admin/Heads/List'
import { RouteComponentProps } from '@reach/router'

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'

import React, { useEffect, useState } from 'react'
import { ChangePageEvent } from '../../../components/Table'

import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { fetchAdminHeads } from '../../../actions/adminHeads'
import { AppState } from '../../../reducers'
import { DispatchBinding } from '../../../utils/types'

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    container: {
      overflow: 'hidden',
      padding: spacing.unit * 2,
      [breakpoints.up('sm')]: {
        padding: spacing.unit * 3,
      },
    },
  })

interface OwnProps {
  rowsPerPage?: number
}

interface StateProps {
  adminHeads?: AppState['adminHeads']['heads']
  count: 0
}

interface DispatchProps {
  fetchAdminHeads: DispatchBinding<typeof fetchAdminHeads>
}

interface Props
  extends WithStyles<typeof styles>,
    RouteComponentProps,
    StateProps,
    DispatchProps,
    OwnProps {}

export const Index: React.FC<Props> = ({
  adminHeads,
  classes,
  count,
  fetchAdminHeads
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const onChangePage = (_event: ChangePageEvent, page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchAdminHeads()
  }, [fetchAdminHeads])

  return (
    <Grid
      container
      spacing={24}
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={12}>
        <Title>Ethereum Heads</Title>

        <List
          currentPage={currentPage}
          heads={adminHeads}
          count={count}
          onChangePage={onChangePage}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => {
  return {
    adminHeads: state.adminHeads.heads,
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  fetchAdminHeads,
}

export const ConnectedIndex = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index)

export default withStyles(styles)(ConnectedIndex)
