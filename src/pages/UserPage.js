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
    })
  }, )

  //  ----------------------------------------------------------------------
  if (users.length !== 0) {
    return (
      <>
        <Helmet>
          <title> Statling: User</title>
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
                    {users.map((user) => (
                      <TableRow key={user.socketID} hover tabIndex={-1} role="checkbox" selected={selected.indexOf(user.userName) !== -1}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {user.userName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{"user.company"}</TableCell>

                        <TableCell align="left">{"user.role"}</TableCell>

                        <TableCell align="left">Yes</TableCell>


                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        </Container>
      </>
    );
  } 

}

UserPage.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    // id: PropTypes.string.isRequired,
    on: PropTypes.func.isRequired,
  }).isRequired,
};
