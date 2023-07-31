import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
// components
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'position', label: 'Position', alignRight: false },
  { id: 'isLocated', label: 'Located', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------


export default function UserPage({ socket }) {

  const [selected, setSelected] = useState([]);

  const [users, setUsers] = useState([])

  // SOCKET ----------------------------------------------------------------------
  //  Socket listens for new user response, List all users .

  useEffect(() => {
    socket.on("newUserResponse", data => {
      setUsers(data)
      console.log(data);
    })
    console.log(users);
  }, [socket, users])

  //  ----------------------------------------------------------------------


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  return (
    <>
      <Helmet>
        <title> Statling: User   </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                  {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return ( */}


                  <TableRow hover key={1} tabIndex={-1} role="checkbox" selected={'selectedUser'}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={'selectedUser'} onChange={(event) => handleClick(event, 'name')} />
                    </TableCell>

                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={'name'} src={'avatarUrl'} />
                        <Typography variant="subtitle2" noWrap>
                          {'"name"'}
                          {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{"company"}</TableCell>

                    <TableCell align="left">{"role"}</TableCell>

                    <TableCell align="left">{ 'Yes'}</TableCell>

                    <TableCell align="left">
                      <Label color={(1 === 'banned' && 'error') || 'success'}>{sentenceCase("status")}</Label>
                    </TableCell>

                    <TableCell align="right">
                      {/* <IconButton size="large" color="inherit" onClick={console.log('')}>
                        <Iconify icon={'eva:more-vertical-fill'} />
                      </IconButton> */}
                    </TableCell>
                  </TableRow>
                  {/* );
                  })} */}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>

                {/* {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>


    </>
  );
}

UserPage.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    on: PropTypes.func.isRequired, 
  }).isRequired,
};
