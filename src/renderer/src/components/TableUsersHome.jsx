import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";

const columns = [
  { name: "USERNAME", uid: "userName" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
];

const users = [
  {
    id: 5,
    userName: "ABDELLAH",
    email: "3322@gmail.com",
    image: null,
    role: "RESPONSABLE",
  },
  {
    id: 4,
    userName: "abdellah",
    email: "abdellah.basketeur2018@gmail.com",
    image: null,
    role: "ADMIN",
  },
  {
    id: 2,
    userName: "abdellah",
    email: "abdellah.basketeur2018@gmail.com",
    image: null,
    role: "ADMIN",
  },
  {
    id: 1,
    userName: "abdellah",
    email: "abdellah.basketeur2018@gmail.com",
    image: null,
    role: "ADMIN",
  },
];

export default function UserTable() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "userName":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.image || undefined }}
            description={user.email}
            name={cellValue}
            className="dark:text-white"
          />
        );
      case "status":
        return <Chip variant="bordered"><span className="capitalize text-success" >online</span></Chip>;
      default:
        return <span className="dark:text-white">{cellValue}</span> ;
    }
  }, []);

  return (
    <Table isHeaderSticky aria-label="User Table" className="border border-gray-500 rounded-lg col-span-1 h-[245px]  lg:max-h-[265px] lg:h-auto sm:col-span-2 overflow-y-auto ">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
