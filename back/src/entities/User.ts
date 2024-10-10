import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointments";
import { UserLogin } from "./Login"; 

@Entity({
    name: "Users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 100 })
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    birthdate: string;
    
    @Column("integer")
    nDni: number;

    @OneToOne(() => Credential)
    @JoinColumn()
    credentials: Credential;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @OneToOne(() => UserLogin, login => login.user)
    login: UserLogin;
}