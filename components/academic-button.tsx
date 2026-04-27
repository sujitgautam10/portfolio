'use client'

import { useState } from 'react'
import { Modal } from '@/components/modal'

export function AcademicButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all"
      >
        View Detailed Information
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Academic Background">
        <div className="space-y-6">
          {/* PCPS College */}
          <div className="border-b border-border pb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">PCPS College (Currently Pursuing)</h3>
            <p className="text-muted-foreground mb-2">BSc (Hons) Software Engineering</p>
            <p className="text-sm text-muted-foreground mb-3">Patan College for Professional Studies, Kupandole, Lalitpur, Nepal</p>
            <p className="text-xs text-muted-foreground mb-3">Duration: 2025 - Present</p>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground"><strong>Focus Areas:</strong></p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Software Development</li>
                <li>Web Technologies</li>
                <li>Database Management</li>
                <li>Practical Programming Knowledge</li>
              </ul>
            </div>
          </div>

          {/* Mohanmaya School */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Mohanmaya Secondary School (Completed)</h3>
            <p className="text-muted-foreground mb-2">+2 Management</p>
            <p className="text-sm text-muted-foreground mb-3">Mohanmaya Secondary School, Birtamode, Jhapa, Nepal</p>
            <p className="text-xs text-muted-foreground mb-3">Duration: 2023 - 2025</p>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground"><strong>Subjects:</strong></p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Accounts</li>
                <li>Economics</li>
                <li>Business Studies</li>
                <li>English & Nepali</li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
