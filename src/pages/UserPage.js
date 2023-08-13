import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useContext } from 'react';
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
import { Store } from "../components/Frames/Frame editor/css-sprite-animatior-master/src/Store";

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

export default function UserPage() {
  const { state, dispatch } = useContext(Store);
  const { UserList } = state;


  //  ----------------------------------------------------------------------
  if (UserList.length !== 0) {
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
                    {UserList.map((user) => (
                      <TableRow key={user.socketID} hover tabIndex={-1} role="checkbox" >
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
