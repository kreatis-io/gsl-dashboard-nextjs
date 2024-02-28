"use client"

import React from "react";
import { DataTableColumnHeader } from "./filteredInvoiceTable";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { details } from "../details";


export const getColumns = (isSupplier: boolean = false, downloadPDF: (i: string) => void, editInvoice?: (i: string) => void, makePayment?: (i: string) => void,) => {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all" />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "amount",
            accessorFn: (row) => row.amount.toString(),
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Amount" />
            ),
            cell: ({ row }) => {
                const amount = row.getValue("amount");
                return <span>{details.currency.prefix}{amount} {details.currency.suffix}</span>;
            }
        }, {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status")
                switch (status.toLowerCase()) {
                    case "paid":
                        return <Badge className="shadow-none" variant="default">{status}</Badge>;
                    case "pending review":
                        return <Badge className="shadow-none" variant="secondary">{status}</Badge>;
                    case "past due":
                        return <Badge className="shadow-none" variant="destructive">{status}</Badge>;
                    default:
                        return <Badge className="shadow-none" variant="outline">{status}</Badge>;
                }
            },
        }, {
            accessorKey: "invoiceNumber",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Invoice Number" />
            ),
        }, {
            accessorKey: "invoiceType",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Invoice Type" />
            ),
        }, {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
        }, {
            accessorKey: "due",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Due" />
            ),
        }, {
            accessorKey: "created",
            filterFn: (row: { getValue: (arg0: string) => string; }, _id: any, value: { from: string | number | Date; to: string | number | Date; }) => {
                const date = new Date(row.getValue("created") as string);
                const startDate = new Date(value.from);
                const endDate = new Date(value.to);
                return date >= startDate && date <= endDate;
            },
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created" />
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={
                            () => downloadPDF(row.getValue("invoiceNumber"))
                        }>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={!isSupplier}
                            onClick={() => makePayment(row.getValue("invoiceNumber"))}
                        >Make Payment</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            disabled={isSupplier}
                            onClick={() => editInvoice(row.getValue("invoiceNumber"))}
                        >Edit Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableHiding: false,
        },
    ]
};