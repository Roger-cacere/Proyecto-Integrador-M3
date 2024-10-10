import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum AppointmentsStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled'
}

@Entity({
    name: "Appointments"
})
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "date"
    })
    date: Date;

    @Column()
    time: string;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;

    @Column({
        type: "enum",
        enum: AppointmentsStatus,
        default: AppointmentsStatus.ACTIVE
    })
    status: AppointmentsStatus;
}
