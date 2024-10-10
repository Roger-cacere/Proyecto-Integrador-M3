import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity({
    name:"Credentials"
})
export class Credential {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
    @OneToOne(() => User, user => user.credentials)
    user: User; // Asegúrate de definir esta relación
}

