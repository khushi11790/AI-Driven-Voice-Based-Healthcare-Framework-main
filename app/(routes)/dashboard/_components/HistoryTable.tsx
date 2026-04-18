"use client"

import React, { useState } from 'react'
import axios from 'axios';
import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import ViewReportDialog from './ViewReportDialog'

type Props = {
  historyList: SessionDetail[]
}

function HistoryTable({ historyList }: Props) {

  const [list, setList] = useState(historyList);

  const handleDelete = async (sessionId: string) => {
    try {
      const confirmDelete = confirm("Delete this record?");
      if (!confirmDelete) return;

      await axios.post("/api/session-chat/delete", { sessionId });

      setList(prev => prev.filter(item => item.sessionId !== sessionId));

    } catch (error) {
      console.log("Delete failed");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Previous Consultation Report</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>AI Medical Specialist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.map((record: SessionDetail) => (
            <TableRow
              key={record.sessionId} // ✅ fixed
              className="group hover:bg-gray-50 transition"
            >
              <TableCell className="font-medium">
                {record.selectedDoctor?.specialist}
              </TableCell>

              <TableCell>{record.notes}</TableCell>

              <TableCell>
                {moment(new Date(record.createdOn)).fromNow()}
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-end gap-3 group">

                  <ViewReportDialog record={record} />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition"
                    onClick={() => handleDelete(record.sessionId)}
                  >
                    <X size={14} />
                  </Button>

                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default HistoryTable