import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum loginStatus {
    TRUE = "true",
    FALSE =  "false"
}

@Entity({
    name: "Logins"
})

export class UserLogin {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: loginStatus;

    @OneToOne(() => User, user => user.login)
    @JoinColumn()
    user: User;

}   