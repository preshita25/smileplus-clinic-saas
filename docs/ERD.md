# Smile Plus Dental Clinic Data Model

All models use a `cuid()` internal primary key. Records are tenant-scoped through `Clinic` and use timestamps for auditability. Patient records support soft deletion through `isActive` and `deletedAt` while preserving historical appointments, treatments, and invoices.

```mermaid
erDiagram
	Clinic ||--o{ User : has
	Clinic ||--o{ Doctor : employs
	Clinic ||--o{ Department : contains
	Clinic ||--o{ Patient : registers
	Clinic ||--o{ Service : offers
	Clinic ||--o{ Appointment : schedules
	Clinic ||--o{ Treatment : records
	Clinic ||--o{ Invoice : issues
	Clinic ||--o{ UploadedFile : stores
	User ||--o| Doctor : may_be
	Department }o--o{ Doctor : serves
	Department ||--o{ Service : groups
	Patient ||--o{ Appointment : books
	Doctor ||--o{ Appointment : attends
	Service ||--o{ Appointment : requested_for
	User ||--o{ Appointment : creates
	Appointment ||--o| Treatment : produces
	Patient ||--o{ Treatment : receives
	Doctor ||--o{ Treatment : performs
	Service ||--o{ Treatment : describes
	Patient ||--o{ Invoice : billed
	Appointment ||--o| Invoice : generates
	Invoice ||--|{ InvoiceItem : contains
	Service ||--o{ InvoiceItem : references
	Invoice ||--o{ Payment : receives
	User ||--o{ Payment : records
	Patient ||--o{ UploadedFile : owns
	Appointment ||--o{ UploadedFile : attaches
	Treatment ||--o{ UploadedFile : documents
	User ||--o{ UploadedFile : uploads
```

## Model Notes

- `Patient.patientCode` is unique within a clinic and uses the `SML-000001` display format.
- `Appointment`, `Treatment`, `Invoice`, and `UploadedFile` keep optional links where a record may exist without the related workflow event.
- `Invoice.dueAmount` is stored for fast reads and must be recalculated when invoice items or payments change.
- `UserRole`, `AppointmentStatus`, `PaymentMethod`, and `Gender` constrain the corresponding operational values.
- Indexes cover clinic tenancy, patient lookup, appointment scheduling, invoice status, and common foreign-key access paths.
