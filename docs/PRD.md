# Smile+ Clinic SaaS Product Requirements

## Milestone 1 Scope

This milestone establishes the typed Next.js application foundation, styling configuration, shadcn/ui conventions, PostgreSQL/Prisma connection layer, code-quality tooling, and the documented architecture. It does not include UI pages, dashboard screens, authentication, patient workflows, appointments, billing, reports, reminders, or voice entry.

## Product Direction

Smile+ is a clinic SaaS platform for dental and skin/hair services. The planned product includes a public website, a staff web application, and a future Android client backed by shared API routes.

## Planned Roles

- Patient: public booking and patient-facing access planned for a later milestone.
- Receptionist: patient, appointment, and billing operations.
- Admin: staff, services, doctors, reporting, and system settings.

## Planned Capabilities

Patient records with unique IDs, appointment management, service pricing, pending payments, monthly reports, SMS reminders, voice-assisted patient entry, and role-based administration.

## Delivery Constraints

Healthcare data requires access control, validation, auditability, soft deletion, and secure file handling. These controls are implementation requirements for later milestones and are documented here before feature work begins.
