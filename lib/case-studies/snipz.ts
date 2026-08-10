import type { CaseStudy } from '@/lib/data'

export const snipzCaseStudy: CaseStudy = {
  tagline:
    'A lightweight Chrome extension for capturing, marking up, and copying screenshots without ever leaving the tab.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'Snipz is a Manifest V3 Chrome extension for capturing a screenshot and marking it up immediately, in the same browser tab — no external screenshot tool, no window-switching. Capture, annotate, and copy the result back to the clipboard in one flow.',
      ],
    },
    {
      heading: 'Editor & Browser Integration',
      body: [
        'The annotation surface is a Canvas-based editor with freehand drawing, arrow annotations, and cropping, backed by a full undo/redo history so a mis-click never means starting the capture over.',
      ],
      bullets: [
        'Freehand drawing and arrow annotations on the captured image',
        'Cropping directly in the editor',
        'Full undo/redo history',
        "Chrome's scripting API for in-page capture",
        'Clipboard API for one-click copy of the annotated result',
      ],
    },
  ],
}
