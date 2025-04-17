'use client'

import DeleteIcon from "@mui/icons-material/Delete";
import {Box, IconButton} from "@mui/material";
import {FavoriteChuckNorrisGif } from "@/models/chuckNorrisGif";
import {useMemo} from "react";
import {MaterialReactTable, MRT_ColumnDef} from "material-react-table";
import {useFavoriteGifs} from "@/components/gifs/useFavoriteGifs";

export const ChuckNorrisGifsTable: React.FC = () => {

    const {chuckNorrisGifsList, handleRemoveChuckNorrisGif} = useFavoriteGifs();

    const columns = useMemo<MRT_ColumnDef<FavoriteChuckNorrisGif>[]>(
        () => [
            {
                id: "gif",
                accessorKey: "gifUrl",
                header: "GIF",
                size: 300,
                Cell: ({cell}) => (
                    <Box
                        component ="img"
                        src={cell.getValue<string>()}
                        sx={{
                            width: 100,
                            height: 100,
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
                        onClick={() => handleRemoveChuckNorrisGif(row.original.dataId)}
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
            data={chuckNorrisGifsList}
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