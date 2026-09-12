import {
  AppointmentStatus,
  Gender,
  PrismaClient,
  UserRole,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const clinic = await prisma.clinic.upsert({
    where: { slug: 'smileplus-main' },
    update: {},
    create: {
      name: 'Smile+ Clinic',
      slug: 'smileplus-main',
      email: 'hello@smileplus.example',
      phone: '+91 98765 43210',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560001',
    },
  });

  const departments = await Promise.all(
    [
      ['Dental Care', 'Preventive, restorative, and cosmetic dentistry'],
      ['Skin and Hair', 'Clinical dermatology and aesthetic care'],
    ].map(([name, description]) =>
      prisma.department.upsert({
        where: { clinicId_name: { clinicId: clinic.id, name } },
        update: { description },
        create: { clinicId: clinic.id, name, description },
      }),
    ),
  );

  const doctors = await Promise.all(
    [
      ['Dr. Ananya Rao', 'ananya.rao@smileplus.example', 'Dentistry'],
      ['Dr. Vikram Shah', 'vikram.shah@smileplus.example', 'Orthodontics'],
      ['Dr. Meera Nair', 'meera.nair@smileplus.example', 'Dermatology'],
      ['Dr. Arjun Kapoor', 'arjun.kapoor@smileplus.example', 'Trichology'],
    ].map(([name, email, specialization], index) =>
      prisma.doctor.upsert({
        where: { clinicId_name: { clinicId: clinic.id, name } },
        update: { email, specialization },
        create: {
          clinicId: clinic.id,
          name,
          email,
          specialization,
          departments: { connect: { id: departments[index < 2 ? 0 : 1].id } },
        },
      }),
    ),
  );

  const dentalServices = [
    'Dental Consultation',
    'Teeth Cleaning',
    'Dental X-Ray',
    'Tooth Filling',
    'Root Canal Treatment',
    'Dental Crown',
    'Dental Bridge',
    'Tooth Extraction',
    'Wisdom Tooth Removal',
    'Teeth Whitening',
  ];
  const skinServices = [
    'Skin Consultation',
    'Acne Treatment',
    'Chemical Peel',
    'Hydra Facial',
    'Laser Hair Reduction',
    'Hair Fall Consultation',
    'PRP Hair Therapy',
    'Scalp Treatment',
    'Mole Removal',
    'Skin Tag Removal',
  ];

  const services = await Promise.all(
    [...dentalServices, ...skinServices].map((name, index) =>
      prisma.service.upsert({
        where: { clinicId_name: { clinicId: clinic.id, name } },
        update: {},
        create: {
          clinicId: clinic.id,
          name,
          departmentId: departments[index < 10 ? 0 : 1].id,
          durationMins: index % 3 === 0 ? 60 : 30,
          price: index < 10 ? 1200 + index * 450 : 1500 + index * 350,
        },
      }),
    ),
  );

  const receptionist = await prisma.user.upsert({
    where: { clinicId_email: { clinicId: clinic.id, email: 'reception@smileplus.example' } },
    update: {},
    create: {
      clinicId: clinic.id,
      name: 'Smile+ Reception',
      email: 'reception@smileplus.example',
      passwordHash: 'seed-password-hash',
      role: UserRole.RECEPTIONIST,
    },
  });

  const patientData = [
    ['Aarav', 'Sharma', Gender.MALE, '+91 90000 00001'],
    ['Diya', 'Patel', Gender.FEMALE, '+91 90000 00002'],
    ['Rohan', 'Iyer', Gender.MALE, '+91 90000 00003'],
    ['Ishita', 'Menon', Gender.FEMALE, '+91 90000 00004'],
  ] as const;

  const patients = await Promise.all(
    patientData.map(([firstName, lastName, gender, phone], index) =>
      prisma.patient.upsert({
        where: {
          clinicId_patientCode: {
            clinicId: clinic.id,
            patientCode: `SML-${String(index + 1).padStart(6, '0')}`,
          },
        },
        update: { firstName, lastName, gender, phone },
        create: {
          clinicId: clinic.id,
          patientCode: `SML-${String(index + 1).padStart(6, '0')}`,
          firstName,
          lastName,
          gender,
          phone,
        },
      }),
    ),
  );

  await Promise.all(
    patients.slice(0, 3).map((patient, index) =>
      prisma.appointment.upsert({
        where: { id: `seed-appointment-${index + 1}` },
        update: {},
        create: {
          id: `seed-appointment-${index + 1}`,
          clinicId: clinic.id,
          patientId: patient.id,
          doctorId: doctors[index].id,
          serviceId: services[index].id,
          createdById: receptionist.id,
          scheduledAt: new Date(`2026-10-${String(index + 5).padStart(2, '0')}T10:00:00.000Z`),
          status: index === 0 ? AppointmentStatus.CONFIRMED : AppointmentStatus.SCHEDULED,
          reason: 'Routine follow-up',
        },
      }),
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });