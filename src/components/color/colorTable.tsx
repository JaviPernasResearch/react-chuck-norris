"use client"

import DeleteIcon from "@mui/icons-material/Delete";
import {Box, IconButton} from "@mui/material";
import {MaterialReactTable, MRT_ColumnDef} from "material-react-table";
import {useMemo} from "react";
import {FavoriteColor} from "@/models/randomColor";
import { useFavoriteColors } from "./useFavoriteColors";


export const ColorTable: React.FC = () => {
    
    const {colorsList, handleRemoveColor} = useFavoriteColors();
    
    const columns = useMemo<MRT_ColumnDef<FavoriteColor>[]>(
        () => [
            {
                id: "color",
                accessorKey: "hex",
                header: "Color",
                size: 150,
                Cell: ({cell}) => (
                    <Box
                        key={cell.getValue<string>()}
                        sx={{
                            backgroundColor: cell.getValue<string>(),
                            borderRadius: 2,
                            width: 30,
                            height: 30,
                        }}
                    />
                ),
            },
            {
                id: "hexAsString",
                accessorKey: "hex",
                header: "HEX",
                size: 150,
            },
            {
                id: "remove",
                accessorKey: "hex",
                header: "Remove",
                size: 50,
                Cell: ({row}) => (
                    <IconButton
                        onClick={() => handleRemoveColor(row.original.dataId)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                ),
            },
        ],
        [handleRemoveColor]
    );

    return <MaterialReactTable columns={columns} data={colorsList}/>;
};
