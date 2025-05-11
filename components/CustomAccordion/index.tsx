import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ReactNode } from 'react'

export default function CustomAccordion({ title = 'Danh sách phòng', children, defaultExpanded = true }: { title?: string, children: ReactNode, defaultExpanded?: boolean }) {
    return (
        <Accordion defaultExpanded={defaultExpanded} disableGutters elevation={0} className="shadow-none font-work">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-black" />}
                className="px-0"
            >
                <div className="text-base font-medium text-black">{title}</div>
            </AccordionSummary>
            <AccordionDetails className="px-2 bg-white">
                {children}
            </AccordionDetails>
        </Accordion>
    )
}
