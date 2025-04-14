'use client'

import DeleteIcon from "@mui/icons-material/Delete";
import {Box, IconButton} from "@mui/material";
import {CreateFavoriteCatPic, FavoriteCatPic } from "@/models/catPic";
import {useMemo} from "react";
import {MaterialReactTable, MRT_ColumnDef} from "material-react-table";
import {useFavoriteCats} from "@/components/cats/useFavoriteCats";



export const CatPicTable: React.FC = () => {

    const {catPicsList, handleRemoveCatPic} = useFavoriteCats();

    const columns = useMemo<MRT_ColumnDef<FavoriteCatPic>[]>(
        () => [
            {
                id: "Picture",
                accessorKey: "url",
                header: "Picture",
                size: 300,
                Cell: ({cell}) => (
                    <Box
                        component ="img"
                        src={cell.getValue<string>()}
                        sx={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 1,
                        }}
                    />
                ),
            },
            {
                accessorKey: "dataId",
                header: "Remove",
                size: 50,
                Cell: ({row}) => (
                    <IconButton
                        onClick={() => handleRemoveCatPic(row.original.dataId)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                ),
            },
        ],
        []
    );

    return (
        <MaterialReactTable 
            columns={columns} 
            data={catPicsList}
            enablePagination={true}
            enableBottomToolbar={true}
            muiTableContainerProps={{
                sx: {
                    maxHeight: '500px', // Set maximum height
                    overflowY: 'auto',  // Enable vertical scrolling
                }
            }}
            initialState={{
                pagination: {
                    pageSize: 5,        // Show 5 items per page
                    pageIndex: 0
                }
            }}
            muiPaginationProps={{
                rowsPerPageOptions: [5, 10, 20, 50], // Rows per page options
                showFirstButton: true,
                showLastButton: true,
            }}
        />
    );
}