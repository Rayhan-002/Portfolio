import type { CaseStudy } from '@/lib/data'

export const tasklensCaseStudy: CaseStudy = {
  tagline:
    'A task management platform that pairs Kanban workflows with in-browser image annotation, so teams stop switching between a board and a separate markup tool.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'TaskLens is a full-stack task management platform built around a simple observation: teams that work with visual assets — screenshots, design mockups, QA captures — end up juggling a task board in one tab and an image markup tool in another. TaskLens puts both in the same workflow, so a task card can carry an annotated image directly, with the discussion and the visual reference in one place.',
        'The system is split into two independently deployable services — a Next.js frontend and a Django REST Framework backend — communicating over a versioned REST API and sharing nothing but the contract between them.',
      ],
    },
    {
      heading: 'The Problem',
      body: [
        'Kanban tools are good at tracking state; they are not built for visual feedback. Image annotation tools are good at visual feedback; they have no concept of a task, an owner, or a status. Teams end up stitching the two together by hand — pasting screenshots into cards, or linking out to a separate annotation tool and hoping the context does not get lost between them.',
        'TaskLens treats image annotation as a first-class part of a task, not an attachment bolted on afterward: uploading an image and marking it up happens in the same view as moving the card through the workflow.',
      ],
    },
    {
      heading: 'Architecture',
      body: [
        'The frontend is a Next.js/React/TypeScript application responsible for the Kanban board, the drag-and-drop interactions, and the canvas-based annotation editor. It talks to a Django REST Framework backend that owns authentication, task and board persistence, and image storage, backed by PostgreSQL.',
        'Splitting the codebase into separate frontend and backend repositories keeps the two deployable and scalable independently — the frontend can ship a UI change without a backend release, and the API can evolve its own versioning without being coupled to a specific frontend build.',
      ],
      bullets: [
        'JWT-based authentication between frontend and API',
        'RESTful API surface (Django REST Framework) for tasks, boards, and image assets',
        'PostgreSQL for relational data — boards, tasks, users, annotation metadata',
        'Reusable React component library shared across the board and annotation views',
      ],
    },
    {
      heading: 'Kanban & Annotation',
      body: [
        'The board supports drag-and-drop task management across customizable columns, the core interaction most Kanban tools are judged on. Image annotation is built on a canvas editor supporting polygon shapes, so feedback can point at an exact region of an image rather than a vague comment referencing "the button in the corner."',
      ],
    },
    {
      heading: 'State Management',
      body: [
        'Board state, task state, and the in-progress annotation canvas all need to stay in sync without prop-drilling through deeply nested components. TaskLens uses Zustand for this: a lighter footprint than Redux, with far less boilerplate, while still giving a single centralized store that both the board and the annotation editor can read and write to consistently.',
      ],
    },
  ],
}
