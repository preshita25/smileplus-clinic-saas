# Smile+ Clinic SaaS Data Model

The full entity model is approved in the architecture plan and will be implemented during Milestone 2. Milestone 1 configures Prisma for PostgreSQL but intentionally leaves the schema without business models.

Planned core entities are `User`, `Patient`, `Doctor`, `Department`, `Service`, `Appointment`, `Treatment`, `Invoice`, `InvoiceItem`, `Payment`, and `UploadedFile`.

Design constraints:

- Patients use a human-readable display ID such as `SML-000001` alongside an internal identifier.
- Patient records use soft deletion and preserve historical clinical and financial records.
- Invoice due amounts are recomputed whenever payments change.
- Appointment-to-treatment is optional because cancelled appointments do not produce treatments.
