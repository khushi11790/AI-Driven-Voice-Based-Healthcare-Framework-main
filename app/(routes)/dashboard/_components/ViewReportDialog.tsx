"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

type Props = {
  record: SessionDetail;
}

function ViewReportDialog({ record }: Props) {

  const report =
    typeof record.report === "string"
      ? JSON.parse(record.report)
      : record.report;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'link'} size={'sm'}>
            View Report
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">

          {/* TITLE */}
          <DialogTitle asChild>
            <h2 className="text-center text-xl font-bold text-blue-600 flex items-center justify-center gap-2">
              🩺 Medical AI Voice Agent Report
            </h2>
          </DialogTitle>

          <div className="mt-6 space-y-5 text-sm">

            {/* SESSION INFO */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 border-b pb-2">
                Session Info
              </h3>

              <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
                <p><b>Doctor:</b> {record.selectedDoctor?.specialist}</p>
                <p><b>User:</b> Anonymous</p>
                <p>
                  <b>Consulted On:</b>{" "}
                  {moment(record.createdOn).format("LLL")}
                </p>
                <p><b>Agent:</b> AI Medical Assistant</p>
              </div>
            </div>

            {/* CHIEF COMPLAINT */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 border-b pb-2">
                Chief Complaint
              </h3>
              <p className="mt-2 text-gray-700">
                {report?.chiefComplaint || "Not available"}
              </p>
            </div>

            {/* SUMMARY */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 border-b pb-2">
                Summary
              </h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {report?.summary || "Not available"}
              </p>
            </div>

            {/* SYMPTOMS */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 border-b pb-2">
                Symptoms
              </h3>

              {report?.symptoms?.length > 0 ? (
                <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                  {report.symptoms.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-500">Not available</p>
              )}
            </div>

            {/* DURATION & SEVERITY */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 border-b pb-2">
                Duration & Severity
              </h3>

              <div className="flex justify-between mt-2 text-gray-700">
                <p>
                  <b>Duration:</b> {report?.duration || "Not specified"}
                </p>

                <p>
                  <b>Severity:</b>{" "}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report?.severity === "mild"
                      ? "bg-green-100 text-green-600"
                      : report?.severity === "moderate"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {report?.severity || "Unknown"}
                  </span>
                </p>
              </div>
            </div>

            {/* MEDICATIONS */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 border-b pb-2">
                Medications Mentioned
              </h3>

              {report?.medicationsMentioned?.length > 0 ? (
                <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                  {report.medicationsMentioned.map((m: string, i: number) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-500">Not available</p>
              )}
            </div>

            {/* RECOMMENDATIONS */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 border-b pb-2">
                Recommendations
              </h3>

              {report?.recommendations?.length > 0 ? (
                <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                  {report.recommendations.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-500">Not available</p>
              )}
            </div>

            {/* FOOTER */}
            <p className="text-xs text-gray-400 mt-4 text-center">
              This report was generated by an AI Medical Assistant.
            </p>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewReportDialog